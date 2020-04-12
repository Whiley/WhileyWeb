package wyweb

import w3c::dom with setTimeout, Document, Element
import string from js::core

/**
 * Encoding of a message box
 */
public type MessageBox is {
    Document document,
    Element element
}

/**
 * Construcgt a new message box
 */
method create(Document doc) -> MessageBox:
    // Create box div
    Element div = doc->createElement("div")
    div->id = "messages"
    return {
        document: doc,
        element: div
    }
    
/**
 * Add a new message to the message list above the console.
 */
method add(MessageBox box, string clazz, string text):
    Document doc = box.document
    Element div = doc->createElement("div")
    div->appendChild(doc->createTextNode(text))
    div->classList->add("message")
    div->classList->add(clazz)
    box.element->appendChild(div)
    // Set timer to remove message
    setTimeout(&( -> box.element->removeChild(div)),1000)
    