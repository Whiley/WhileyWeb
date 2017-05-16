// Global reference to the code editor.
var editor;

/**
 * Add a new message to the message list above the console.
 */
function addMessage(message_class, message_text, callback) {
    var message = $("<div></div>");
    message.text(message_text);
    message.addClass("message");
    message.addClass(message_class);
    message.appendTo("#messages");
    message.fadeIn(200).delay(2000).slideUp(200, function() {
        message.remove();
        if (callback !== undefined) {
            callback();
        }
    });
}

/**
 * Remove all messages from the message list above the console.
 */
function clearMessages() {
    $("#messages").children().remove();
}

/**
 * Display all the compilation errors.
 */
function showErrors(errors) {
    clearErrors();
    for(var i=0;i!=errors.length;++i) {
		var error = errors[i];
        markError(error);
    }
}

/**
 * Add an appropriate marker for a given JSON error object, as
 * returned from the server.
 */
function markError(error) {
    var errorText = error.text.replace("\\n","\n");
    if(error.counterexample) {
	errorText = errorText + "\n\ncounterexample: " + error.counterexample;
    }
    //
    if(error.start !== "" && error.end !== "" && error.line !== "") {
	// First, add error markers
        editor.getSession().setAnnotations([{
            row: error.line - 1,
            column: error.start,
            text: errorText,
            type: "error"
        }]);
	underScoreError(error,"error-message","error");
	// Second, add context markers (if any)
	for (var i = 0; i < error.context.length; i++) {
	    underScoreError(error.context[i],"context-message","error");
	}
    } else {
        addMessage("error", errorText);
    }
}

function underScoreError(error,kind,message) {
    var range = new ace.Range(error.line-1, error.start, error.line-1, error.end+1);
    editor.markers.push(editor.getSession().addMarker(range, kind, message, false));
}

/**
 * Clear all the compilation errors.
 *
 * Clear all markers (including those in the gutter) from the editor.
 * This is to prevent markers from a previous compilation from hanging
 * around.
 */
function clearErrors() {
    editor.getSession().clearAnnotations();
    for (var i = 0; i < editor.markers.length; i++) {
        editor.getSession().removeMarker(editor.markers[i]);
    }
    editor.markers = [];
}

/**
 * Compile a given snippet of Whiley code.
 */
function compile() {
    var output = document.getElementById("output");
    var console = document.getElementById("console");
    var verify = document.getElementById("verification");
    var counterexamples = document.getElementById("counterexamples");
    var request = {
	code: editor.getValue(),
	verify: verify.checked,
	counterexamples: counterexamples.checked
    };
    // Attempt to stash the current state
    store(request);
    //
    $.post(root_url + "/compile", request, function(response) {
        clearMessages();
        console.value = "";
        $("#spinner").hide();
        var response = $.parseJSON(response);
        if(response.result == "success") {
            clearErrors(true);
            addMessage("success", "Compiled successfully.");
	    output.value = response.js;
        } else if(response.result == "errors") {
            var errors = response.errors;
            showErrors(errors);
            addMessage("error", "Compilation failed: " + errors.length + " error" + (errors.length > 1 ? "s." : "."));
        } else if(response.result == "error") {
            clearErrors(true);
            addMessage("error", response.error);
        }
    });
    $("#spinner").show();
}

/**
 * Compile and run a given snippet of Whiley code.
 */
function run() {
    var console = document.getElementById("console");
    var request = { code: editor.getValue() };
    // Attempt to stash the current state
    store(request);
    //
    $.post(root_url + "/run", request, function(response) {
        clearMessages();
        console.value = "";
        $("#spinner").hide();
        var response = $.parseJSON(response);
        if(response.result == "success") {
            clearErrors(true);
            addMessage("success", "Compiled successfully. Running...");
            setTimeout(function() {console.value = response.output;}, 500);
        } else if(response.result == "errors") {
            var errors = response.errors;
            showErrors(errors);
            addMessage("error", "Compilation failed: " + errors.length + " error" + (errors.length > 1 ? "s." : "."));
        } else if(response.result == "error") {
            clearErrors(true);
            addMessage("error", response.error);
        }
    });
    $("#spinner").show();
}

/**
 * Save a given snippet of Whiley code.
 */
function save() {
    var request = { code: editor.getValue() };
    $.post(root_url + "/save", request, function(response) {
        clearMessages();
        var response = $.parseJSON(response);
        $("#spinner").hide();
        addMessage("success", "Saved program as " + response.id + ".", function() {
            window.location.replace("?id=" + response.id);
        });
    });
    $("#spinner").show();
}

/**
 * Attempt to store from local storage
 */
function restore(defaultCode) {
    if (typeof(localStorage) !== "undefined" && localStorage.getItem("whileylabs")) {
	// Code for localStorage/sessionStorage.
	return JSON.parse(localStorage.getItem("whileylabs"));
    } else {
	// No Storage support..
	return {code: defaultCode, verify: false};
    }
}

/**
 * Save the current state in localstorage
 */
function store(request) {
    if (typeof(localStorage) !== "undefined") {
	// Code for localStorage/sessionStorage.
	localStorage.setItem("whileylabs",JSON.stringify(request));
    } else {
	// No Storage support..
    }
}

// Run this code when the page has loaded.
$(document).ready(function() {
    ace.Range = require('ace/range').Range;
    // Enable the editor with Whiley syntax.
    editor = ace.edit("code");
    var WhileyMode = require("ace/mode/whiley").Mode;
    editor.getSession().setMode(new WhileyMode());
    editor.setTheme("ace/theme/eclipse");
    editor.setFontSize("10pt");
    editor.setBehavioursEnabled(false);
    editor.setHighlightActiveLine(false);
    editor.setShowFoldWidgets(false);
    editor.setShowPrintMargin(false);
    editor.getSession().setUseSoftTabs(true);
    editor.getSession().setTabSize(4);
    editor.markers = [];

    $("#code").resizable({
        resize: function() {
            editor.resize();
        },
        handles: "s",
        cursor: "default",
        minHeight: $("#code").height()
    });
    // Attempt to restore from previous state
    var previousState = restore("Write code here...");
    var verifyCheckBox = document.getElementById("verification");
    editor.setValue(previousState.code);
    verifyCheckBox.checked = previousState.verify;
});
