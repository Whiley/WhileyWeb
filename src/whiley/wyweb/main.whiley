package wyweb

import uint from std::integer
import std::ascii
import std::array
import std::collections::vector with Vector
import js::core with string
import js::JSON
import w3c::dom
// Import elements
import button,div,img,i,input,label,option,select from web::html
// Import attributes
import class,click,change,disabled,id,style,tYpe from web::html
// Import events
import MouseEvent from web::html
import web::io

import ace::ace
import Editor from ace::editor
import ace::session with EditSession, Annotation
import ace::range with Range

import wyweb::compiler

type Node is web::html::Node<State>
type Action is web::io::Action<State>
type Toggle is function(MouseEvent,State)->(State,Action[])

// =========================================
// Model
// =========================================

final string[] EG_NAMES = ["","Hello World","Absolute","IndexOf"]

final string[] EG_TEXT = [
    // blank
    "",
    // Hello World
    "import std::io\nimport std::ascii\n\nmethod main():\n    io::println(\"hello world\")",
    // Absolute Function
    "function abs(int x) -> (int r)\nensures r >= 0\nensures (r == x) || (r == -x):\n    //\n    if x >= 0:\n        return x\n    else:\n        return -x",
    // IndexOf Function
    "type nat is (int x) where x >= 0\n\nfunction indexOf(int[] items, int item) -> (int r)\n// If valid index returned, element matches item\nensures r >= 0 ==> items[r] == item\n// If invalid index return, no element matches item\nensures r <  0 ==> all { i in 0..|items| | items[i] != item }\n// Return value is between -1 and size of items\nensures r >= -1 && r < |items|:\n    //\n    nat i = 0\n    while i < |items|\n        where all { k in 0 .. i | items[k] != item }:\n        //    \n        if items[i] == item:\n            return i\n        i = i + 1\n    //\n    return -1"
    ]

final uint READY = 0
final uint READY_RUN = 1
final uint COMPILING = 2
final uint SUCCESS = 3
final uint ERROR = 4
final uint FAILURE = 5

public type State is {
    uint state,
    string output,
    string binary,
    string error,
    bool verification,
    bool check,
    bool counterexamples,
    bool javascript,
    string[] dependencies,
    uint[] markers
}

function toggle_verification(MouseEvent e, State s) -> (State sp, Action[] as):
    s.verification = !s.verification
    return s,[]

function toggle_check(MouseEvent e, State s) -> (State sp, Action[] as):
    s.check = !s.check
    return s,[]

function toggle_counterexamples(MouseEvent e, State s) -> (State sp, Action[] as):
    s.counterexamples = !s.counterexamples
    return s,[]

function toggle_javascript(MouseEvent e, State s) -> (State sp, Action[] as):
    s.javascript = !s.javascript
    return s,[]

function load_example(MouseEvent e, State s) -> (State sp, Action[] as):
    return s,[io::call(&(dom::Window w -> set_editor_text(w)))]

/**
 * The compile button has been clicked.  The next step is to extract
 * the current text from the ACE editor.
 */
function compile_clicked(MouseEvent e, State s) -> (State sp, Action[] as):
    // Update state
    s.state = COMPILING
    // Extract text from ACE editor, and save current state
    return s,[io::query(&get_editor_text,&compile_begin),io::call(&save_current_state)]

/**
 * The ACE editor has provided text for compilation.  Therefore, we
 * need to perform an AJAX request.
 */
function compile_begin(State s, string text) ->  (State sp, Action[] as):
    // Construct appropriate request
    compiler::Request cr = compiler::Request(s.verification,s.check,s.counterexamples,text,s.dependencies)
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
    else if cr.result == "errors":
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
    else:
        assert cr is compiler::Exception // unsafe    
        s.state = FAILURE
        s.error = cr.text
        // Done
        return s,[
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
    Node cmdbar = create_cmdbar(s)
    Node msgbox = create_msgbox(s)
    Node js = create_javascript(s)
    // Content represents the internal window
    Node content = div([id("content")],[editor,cmdbar,msgbox,js])
    // Container is outermost
    Node window = div([id("window")],content)
    Node toolbar = create_toolbar(s)
    //
    return div([id("container")],[toolbar,window])

function create_editor(State s) -> Node:
    return div([id("editor")],div([id("code")],""))

final Node LOADING = img([{key:"src",value:"images/loading.gif"}],[""])

function create_toolbar(State s) -> Node:
    Node login = create_icon("fa fa-sign-in")
    Node settings = create_icon("fa fa-cog")
    Node files = create_icon("fa fa-files-o")
    Node terminal = create_icon("fa fa-terminal")
    //
    return div([id("toolbar")],[login,settings,files,terminal])

function create_icon(string cl) -> Node:
    return div([class("icon")],i([class(cl)],""))

/**
 * The cmdbar holds the various controls (e.g. for compiling)
 */
function create_cmdbar(State s) -> Node:
    Node l
    Node cb    
    // Construct compile button
    switch s.state:
        case READY,READY_RUN,SUCCESS,ERROR:
          cb = button([click(&compile_clicked)],"Compile")
          l = ""
        default:
          cb = button([click(&compile_clicked),disabled()],"Compile")
          l = LOADING
    // Construct toggles
    Node vt = toggle("Verification", &toggle_verification)
    Node qt = toggle("Check", &toggle_check)
    Node et = toggle("Counterexamples", &toggle_counterexamples)
    Node jt = toggle("JavaScript", &toggle_javascript)
    Node cf = div([id("configbar")],[vt,qt,et,jt])
    // Construct elastic
    Node el = div([id("elastic")],"")
    // Construct examples selection
    Node egs = create_examples(EG_NAMES,&load_example)
    //
    return div([id("cmdbar")],[cb,cf,l,el,egs])

function toggle(string lab, Toggle onclick) -> Node:
    Node t = input([{key:"type",value:"checkbox"},click(onclick)],[""])
    Node l = label(lab)
    // Done
    return div([style("display: inline;")],[t,l])

function create_examples(string[] labels, Toggle onchange) -> Node:
    Node[] children = ["";|labels|]
    // Setup labels
    for i in 0..|labels|:
        children[i] = option(labels[i])
    // Done
    return div([id("egbar")],["Examples: ",select([id("egselect"),change(onchange)],children)])

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
        case FAILURE:
            contents = div([class("message error")],s.error)
    //
    return div([id("messages")],[contents])

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

public export method run(dom::Node root, dom::Window window, string[] deps):
    // Construct initial model
    State state = {
        state: READY,
        verification: false,
        check: false,
        counterexamples: false,
        javascript: false,
        binary: "binary",
        output: "output",
        error: "",
        dependencies: deps,
        markers: []
    }
    // Create the "web app"
    io::App<State> app = { model: state, view: &view }
    // Run the app
    web::app::run(app,root,window)
    // Configure ACE editor
    configure_editor(window)
    // Load previous state (if applicable)
    load_saved_state(window)

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
 * Set the current text stored in the ACE Editor.
 */
public method set_editor_text(dom::Window w):
    // Determine example to load
    dom::Node sel = w->document->getElementById("egselect")
    // Following is a hack.  Basicaly pretend its a text area so have
    // access to value field.
    assert sel is dom::TextArea
    // Extract label
    string label = sel->value
    string text = ""
    //
    for i in 0..|EG_NAMES|:
        if label == EG_NAMES[i]:
            text = EG_TEXT[i]
            break
    // Find code div
    dom::Element div = w->document->getElementById("code")
    // Extract editor instance from div
    Editor aceEditor = ace::edit(div)
    // Set current text
    aceEditor->setValue(text,0)

method load_saved_state(dom::Window w):
    // Access local storage
    dom::Storage db = w->localStorage
    // Attempt to read it
    string|null st = db->getItem("whileyweb$saved")
    // Update editor if exits
    if st is string:
        // Find code div
        dom::Element div = w->document->getElementById("code")
        // Extract editor instance from div
        Editor aceEditor = ace::edit(div)
        // Set current text
        aceEditor->setValue(st,0)

method save_current_state(dom::Window w):
    // Access local storage
    dom::Storage db = w->localStorage
    // Extract state from ACE
    string st = get_editor_text(w)
    // Write to local storage
    db->setItem("whileyweb$saved",st)

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
