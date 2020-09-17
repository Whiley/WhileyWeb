package wyweb

import w3c::dom with Window, Document, Element
import string from js::core

/**
 * Encoding of a message box
 */
public type MessageBox is {
    Window window,
    Element element
}

/**
 * Construcgt a new message box
 */
method create(Window win) -> MessageBox:
    // Create box div
    Element div = win->document->createElement("div")
    div->id = "messages"
    return {
        window: win,
        element: div
    }
    
/**
 * Add a new message to the message list above the console.
 */
method add(MessageBox box, string clazz, string text):
    Document doc = box.window->document
    Element div = doc->createElement("div")
    div->appendChild(doc->createTextNode(text))
    div->classList->add("message")
    div->classList->add(clazz)
    box.element->appendChild(div)
    // Set timer to remove message
    box.window->setTimeout(&( -> box.element->removeChild(div)),1000)
    