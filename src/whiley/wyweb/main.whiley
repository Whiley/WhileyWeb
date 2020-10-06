package wyweb

import uint from std::integer
import std::ascii
import std::array
import std::collections::vector with Vector
import js::core with string
import js::JSON
import w3c::dom
import web::html with button,class,click,disabled,div,id,img,input,label,MouseEvent,style,tYpe
import web::io

import ace::ace
import Editor from ace::editor
import ace::session with EditSession, Annotation
import ace::range with Range

import wyweb::compiler

type Node is html::Node<State>
type Action is io::Action<State>
type Toggle is function(MouseEvent,State)->(State,Action[])

// =========================================
// Model
// =========================================

final uint READY = 0
final uint READY_RUN = 1
final uint COMPILING = 2
final uint SUCCESS = 3
final uint ERROR = 4

public type State is {
    uint state,
    string output,
    string binary,
    bool verification,
    bool check,
    bool console,
    bool counterexamples,
    bool javascript,
    uint[] markers
}

function toggle_verification(MouseEvent e, State s) -> (State sp, Action[] as):
    s.verification = !s.verification
    return s,[]

function toggle_check(MouseEvent e, State s) -> (State sp, Action[] as):
    s.check = !s.check
    return s,[]

function toggle_console(MouseEvent e, State s) -> (State sp, Action[] as):
    s.console = !s.console
    return s,[]

function toggle_counterexamples(MouseEvent e, State s) -> (State sp, Action[] as):
    s.counterexamples = !s.counterexamples
    return s,[]

function toggle_javascript(MouseEvent e, State s) -> (State sp, Action[] as):
    s.javascript = !s.javascript
    return s,[]

/**
 * The compile button has been clicked.  The next step is to extract
 * the current text from the ACE editor.
 */
function compile_clicked(MouseEvent e, State s) -> (State sp, Action[] as):
    // Update state
    s.state = COMPILING
    // Extract text from ACE editor
    return s,[io::query(&get_editor_text,&compile_begin)]

/**
 * The ACE editor has provided text for compilation.  Therefore, we
 * need to perform an AJAX request.
 */
function compile_begin(State s, string text) ->  (State sp, Action[] as):
    // Construct appropriate request
    compiler::Request cr = compiler::Request(s.verification,s.check,s.counterexamples,text)
    // Turn into JSON string
    string r = JSON::stringify(cr)
    // Post request
    return s,[io::post("/compile",r,&compile_success,&compile_error)]

/**
 * Server has returned a response regarding the compilation request.
 */
function compile_success(State s, string response) ->  (State sp, Action[] as):
    // NOTE: this is currently UNSAFE
    compiler::Response cr = JSON::parse(response)
    // Decide what's going on
    if cr.result == "success":
        assert cr is compiler::Success // unsafe
        s.state = SUCCESS
        s.binary = cr.js
        return s,[
            // Clear ACE editor markers
            io::call(&(dom::Window w -> clear_editor_markers(w,s.markers))),
            // Timeout for success message
            io::timeout(1000,&compile_readyrun)]
    else:
        assert cr is compiler::Failure // unsafe    
        s.state = ERROR
        // Done
        return s,[
            // Clear ACE editor markers
            io::call(&(dom::Window w -> clear_editor_markers(w,s.markers))),
            // Add ACE editor markers
            io::query(&(dom::Window w -> set_editor_markers(w,cr.errors)),&compile_failure),
            // Timeout for error message
            io::timeout(1000,&compile_ready)]

function compile_failure(State s, uint[] markers) ->  (State sp, Action[] as):
    // Update markers
    s.markers = markers
    // Done
    return s,[]

/**
 * Server has has some kind of error.
 */
function compile_error(State s) ->  (State sp, Action[] as):
    // Update state
    s.state = ERROR
    // Configure timeout for message
    return s,[io::timeout(1000,&compile_ready)]    

/**
 * Reset compile functionality to ready
 */
function compile_readyrun(State s) -> (State sp, Action[] as):
    s.state = READY_RUN
    return s,[]

/**
 * Reset compile functionality to ready
 */
function compile_ready(State s) -> (State sp, Action[] as):
    s.state = READY
    return s,[]

// =========================================
// View
// =========================================

function view(State s) -> Node:
    Node editor = create_editor(s)
    Node toolbar = create_toolbar(s)
    Node msgbox = create_msgbox(s)
    Node console = create_console(s)
    Node js = create_javascript(s)
    //
    return div([editor,toolbar,msgbox,console,js])

function create_editor(State s) -> Node:
    return div([id("code")],"")

final Node LOADING = img([{key:"src",value:"images/loading.gif"}],[""])

/**
 * The toolbar holds the various controls (e.g. for compiling)
 */
function create_toolbar(State s) -> Node:
    Node l
    Node cb    
    // Construct compile button
    switch s.state:
        case READY,READY_RUN,SUCCESS,ERROR:
          cb = button([click(&compile_clicked)],"Compile")
          l = div("")
        default:
          cb = button([click(&compile_clicked),disabled()],"Compile")
          l = LOADING
    // Construct run button
    Node rb
    if s.state == READY_RUN:
        rb = button("Run")
    else:
        rb = button([disabled()],"Run")        
    // Construct toggles
    Node vt = toggle("Verification", &toggle_verification)
    Node qt = toggle("Check", &toggle_check)
    Node ct = toggle("Console", &toggle_console)
    Node et = toggle("Counterexamples", &toggle_counterexamples)
    Node jt = toggle("JavaScript", &toggle_javascript)
    //
    return div([id("cmdbar")],[cb,rb,vt,qt,ct,et,jt,l])

function toggle(string lab, Toggle onclick) -> Node:
    Node t = input([{key:"type",value:"checkbox"},click(onclick)],[""])
    Node l = label(lab)
    // Done
    return div([style("display: inline;")],[t,l])

/**
 * The msgbox reports results back from compilation
 */
function create_msgbox(State s) -> Node:
    Node contents = ""
    //
    switch s.state:
        case SUCCESS:
            contents = div([class("message success")],"Success!")
        case ERROR:
            contents = div([class("message error")],"Error!")
    //
    return div([id("messages")],[contents])

/**
 * The console reports output from running the code.
 */
function create_console(State s) -> Node:
    if s.console:
        return div([id("console")],s.output)
    else:
        return div("")

/**
 * Provides the generated JavaScript
 */
function create_javascript(State s) -> Node:
    if s.javascript:
        return div([id("bin")],s.binary)
    else:
        return div("")

// =========================================
// Controller
// =========================================

public export method run(dom::Node root, dom::Window window):
    // Construct initial model
    State state = {
        state: READY,
        verification: false,
        check: false,
        console: false,
        counterexamples: false,
        javascript: false,
        binary: "binary",
        output: "output",
        markers: []
    }
    // Create the "web app"
    io::App<State> app = { model: state, view: &view }
    // Run the app
    web::app::run(app,root,window)
    // Configure ACE editor
    configure_editor(window)

// =========================================
// External Actions
// =========================================

/**
 * Configure the ACE editor.  This must be done externally since ACE
 * is not part of the functional model.
 */
public method configure_editor(dom::Window w):
    // Find code div
    dom::Element div = w->document->getElementById("code")
    // Instantiation editor
    Editor aceEditor = ace::edit(div)
    // Configure editor
    aceEditor->setTheme("ace/theme/eclipse")
    aceEditor->getSession()->setMode("ace/mode/whiley")
    // Done

/**
 * Get the current text stored in the ACE Editor.
 */
public method get_editor_text(dom::Window w) -> string:
    // Find code div
    dom::Element div = w->document->getElementById("code")
    // Extract editor instance from div
    Editor aceEditor = ace::edit(div)
    // Extract current text
    return aceEditor->getValue()

/**
 * Clear existing markers using the saved identifiers from before.
 */
method clear_editor_markers(dom::Window w, uint[] markers):
    // Find code div
    dom::Element div = w->document->getElementById("code")
    // Extract editor instance from div
    Editor editor = ace::edit(div)
    // Get editor session
    EditSession session = editor->getSession()    
    // Clear existing annotations
    session->clearAnnotations()
    // Remove them all
    for i in 0..|markers|:
        session->removeMarker(markers[i])
    // Done

/**
 * Apply a given set of error messages to the ACE editor.  This must
 * save the identifiers of all new markers created.
 */
method set_editor_markers(dom::Window w, compiler::Error[] errors) -> (uint[] ms):
    // Find code div
    dom::Element div = w->document->getElementById("code")
    // Extract editor instance from div
    Editor editor = ace::edit(div)
    // Get editor session
    EditSession session = editor->getSession()    
    // Empty markers
    uint[] markers = [0;|errors|]
    Vector<Annotation> annotations = Vector()
    // Iterate indivdual errors
    for i in 0..|errors|:
        // Extract ith error
        compiler::Error error = errors[i]
        // Construct gutter annotation
        Annotation ann = session::error(error.text,error.line-1,error.start)
        // Append it
        annotations = vector::push(annotations,ann)
        // Construct range
        Range range = Range(error.line-1, error.start, error.line-1, error.end+1)
        // Add underlining and save marker ID
        markers[i] = session->addMarker(range,"error-message","error",true)
    // Set new annotations
    session->setAnnotations(vector::to_array(annotations))
    // Done
    return markers
