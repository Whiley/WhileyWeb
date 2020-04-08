package wyweb

import to_string from std::ascii
import string from js::core
import js::JSON
import w3c::dom with Element,Document,TextArea,Event,alert
import get,post from wyweb::io

type CompileRequest is {
    // Code to be compiled
    string code,
    // Enable verification
    bool verify,
    // Enable counterexample generation
    bool counterexamples,
    // Enable QuickCheck
    bool quickcheck,
    // Build dependencies
    string[] dependencies
}

function CompileRequest(string code) -> CompileRequest:
    return {
        code: code,
        verify: false,
        counterexamples: false,
        quickcheck: false,
        dependencies: []
    }

method print(Document doc, string s):
    // Extract content pane
    Element content = doc->getElementById("content")
    // Print text
    content->appendChild(doc->createTextNode(s))

method compile(Event e, TextArea editor):
    CompileRequest cr = CompileRequest(editor->value)
    // Turn into JSON string
    string r = JSON::stringify(cr)
    // Post request
    post("/compile",r,&(string s -> alert(s)), &(int i -> alert("ERROR")))

type meth_t is method(Event)

public export method run(Document doc):
    // Extract content pane
    Element content = doc->getElementById("content")
    // Create editor area
    Element editor = doc->createElement("textarea")
    // Force unsafe coercion
    assert editor is TextArea
    // Create compile button
    Element but = doc->createElement("button")
    but->appendChild(doc->createTextNode("Compile"))
    meth_t mth = &(Event e -> compile(e,editor))
    but->addEventListener("click",mth)
    //
    content->appendChild(editor)
    content->appendChild(but)
