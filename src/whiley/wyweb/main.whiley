package wyweb

import std::array
import std::collections::vector with Vector
import to_string from std::ascii
import uint from std::integer
import string from js::core
import js::JSON
import w3c::dom with Element,Document,TextArea,Event,alert

import ace::ace
import Editor from ace::editor
import ace::session with EditSession, Annotation
import ace::range with Range
import wyweb::compiler
import wyweb::msgbox with MessageBox
import get,post from wyweb::io

type State is &{
    // Handle for editor
    Editor editor,
    // Active editor markers
    Vector<uint> markers,    
    // Handle for MessageBox
    MessageBox msgbox,
    //
    ...
}
    
method print(Document doc, string s):
    // Extract content pane
    Element content = doc->getElementById("content")
    // Print text
    content->appendChild(doc->createTextNode(s))

/**
 * Clear all the compilation errors.
 *
 * Clear all markers (including those in the gutter) from the editor.
 * This is to prevent markers from a previous compilation from hanging
 * around.
 */
method clearAnnotationsAndMarkers(State state):
    EditSession session = state->editor->getSession()
    Vector<uint> markers = state->markers
    // Clear existing annotations
    session->clearAnnotations()
    // Remove them all
    for i in 0..markers.length:
        session->removeMarker(vector::get(markers,i))
    // Remove all existing markers
    state->markers = Vector()

// Process a compilation failure returned by server
method processCompilationFailure(compiler::Failure response, State state):
    EditSession session = state->editor->getSession()
    Vector<uint> markers = state->markers    
    Vector<Annotation> annotations = Vector()    
    // Iterate indivdual errors
    for i in 0..|response->errors|:
        // Extract ith error
        compiler::Error error = response->errors[i]
        // Construct gutter annotation
        Annotation ann = session::error(error.text,error.line-1,error.start)
        // Append it
        annotations = vector::push(annotations,ann)
        // Construct range
        Range range = Range(error.line-1, error.start, error.line-1, error.end+1)
        // Add underlining
        uint marker = session->addMarker(range,"error-message","error",true)
        // Save the marker ID
        markers = vector::push(markers,marker)
    // Set new annotations
    session->setAnnotations(vector::to_array(annotations))
    // Save active markers
    state->markers = markers
    
// Process a server response to a compilation request
method processCompilationResponse(string response, State state):
    // NOTE: this is currently UNSAFE
    compiler::Response cr = JSON::parse(response)
    // Remove all existing markers
    clearAnnotationsAndMarkers(state)
    // Decide what's going on
    if cr->result == "success":
        // Report success
        msgbox::add(state->msgbox,"success","Compiled successfully!")
    else:
        assert cr is compiler::Failure
        // Convert errors into annotations       
        processCompilationFailure(cr, state)
        // Report failure
        msgbox::add(state->msgbox,"error","Compilation failed:")
        
// Request compilation from server
method requestCompilation(Event e, State state):
    compiler::Request cr = compiler::Request(state->editor->getValue())
    // Turn into JSON string
    string r = JSON::stringify(cr)
    // Post request
    post("/compile",r,&(string s -> processCompilationResponse(s,state)), &(int i -> alert("ERROR")))

public export method run(Document doc):
    // Extract content pane
    Element content = doc->getElementById("content")
    // Create editor div
    Element editorDiv = doc->createElement("div")
    editorDiv->id = "code"
    // Create compile button
    Element compileButton = doc->createElement("button")
    compileButton->appendChild(doc->createTextNode("Compile"))
    content->appendChild(editorDiv)
    content->appendChild(compileButton)
    // Configure ACE editor
    Editor aceEditor = ace::edit(editorDiv)
    aceEditor->setTheme("ace/theme/eclipse")
    aceEditor->getSession()->setMode("ace/mode/whiley")
    // Configure MessageBox
    MessageBox msgbox = msgbox::create(doc)
    content->appendChild(msgbox.element)
    // Create empty state
    State state = new {
        editor: aceEditor,
        // empty set of markers
        markers: Vector(),
        // Empty message box
        msgbox: msgbox
    }
    // Configure compile event
    compileButton->addEventListener("click",&(Event e -> requestCompilation(e,state)))
    

