'use strict';
const w3c$ajax$UNSENT$static = 0;
const w3c$ajax$OPENED$static = 1;
const w3c$ajax$HEADERS_RECEIVED$static = 2;
const w3c$ajax$LOADING$static = 3;
const w3c$ajax$DONE$static = 4;
const w3c$dom$ELEMENT_NODE$static = 1;
const w3c$dom$TEXT_NODE$static = 3;
const w3c$dom$CDATA_SECTION_NODE$static = 4;
const w3c$dom$PROCESSING_INSTRUCTION_NODE$static = 7;
const w3c$dom$COMMENT_NODE$static = 8;
const w3c$dom$DOCUMENT_NODE$static = 9;
const w3c$dom$DOCUMENT_TYPE_NODE$static = 10;
const w3c$dom$DOCUMENT_FRAGMENT_NODE$static = 11;
function w3c$dom$Document$type(n) {
   return n.nodeType === w3c$dom$DOCUMENT_NODE$static;
}
function w3c$dom$Text$type(n) {
   return n.nodeType === w3c$dom$TEXT_NODE$static;
}
function w3c$ajax$newXMLHttpRequest() {
    return new XMLHttpRequest();
}
function w3c$dom$alert(message) {
    alert(message);
}

function w3c$dom$setTimeout(callback,ms){
    setTimeout(callback,ms);
}

function w3c$dom$setInterval(callback, ms) {
    setInterval(callback,ms);
}

function w3c$dom$clearTimeout() {
    clearTimeout();
}

function w3c$dom$clearInterval() {
    clearInterval();
}

function w3c$dom$open(URL, name, specs, replace) {
    open(URL,name,specs,replace)
}

function w3c$dom$prompt(text, defaultText) {
    prompt(text,defaultText);
}

function w3c$dom$confirm(text) {
    confirm(text);
}

function w3c$dom$close() {
    close();
}
