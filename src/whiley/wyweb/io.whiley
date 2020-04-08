package wyweb

import u16 from std::integer
import string from js::core
import w3c::ajax with XMLHttpRequest, newXMLHttpRequest, DONE

final int HTTP_OK = 200

method responseHandler(XMLHttpRequest xhttp, method(string) success, method(int) error):
    if xhttp->readyState == DONE:
        // Extract status code
        u16 status = xhttp->status
        // Check whether success or failure
        if status == HTTP_OK:
            // success
            success(xhttp->responseText)
        else:
            // Failure
            error(status)

method get(string url, method(string) success, method(int) error):
    // Construct a new request
    XMLHttpRequest xhttp = newXMLHttpRequest()
    // Configure an async get request
    xhttp->open("GET",url,true)
    // Configure receipt handler
    xhttp->onreadystatechange = &( -> responseHandler(xhttp,success,error))
    // Send the request!
    xhttp->send("")

method post(string url, string data, method(string) success, method(int) error):
    // Construct a new request
    XMLHttpRequest xhttp = newXMLHttpRequest()
    // Configure an async get request
    xhttp->open("POST",url,true)
    // Set content type as JSON
    xhttp->setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    // Configure receipt handler
    xhttp->onreadystatechange = &( -> responseHandler(xhttp,success,error))
    // Send the request!
    xhttp->send(data)
