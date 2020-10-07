package wyweb

import uint from std::integer
import string from js::core

// Request type accepted by server.  This forces a compilation.
public type Request is {
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

// Response returned from request.
public type Response is {
    string result,
    ...
}

// Represents a successful response
public type Success is {
    string result,
    // Generated JavaScript
    string js,
    ...
}

// Represents an unsuccessful response
public type Failure is {
    string result,
    // Resulting errors
    Error[] errors,
    ...
}

// Represents a single compiler error associated with a syntactic
// element.
public type Error is {
    // Error Message
    string text,
    // Start column
    uint start,
    // End column
    uint end,
    // Line number of error
    uint line,
    // Counterexample (if found)
    string|null counterExample    
}

// Construct a simple request
function Request(bool verify, bool check, bool counterexamples, string code, string[] deps) -> Request:
    return {
        code: code,
        verify: verify,
        counterexamples: counterexamples,
        quickcheck: check,
        dependencies: deps
    }