'use strict';
function wyweb$compiler$Request$BBQ6string$Q7Request(verify, counterexamples, code) {
   return new Wy.Record({code: Wy.copy(code), verify: verify, counterexamples: counterexamples, quickcheck: false, dependencies: []});
}
const wyweb$io$HTTP_OK$static = 200;
function wyweb$io$responseHandler$Q14XMLHttpRequestmQ6stringVmIV$V(xhttp, success, error) {
   if(xhttp.readyState === w3c$ajax$DONE$static)  {
      let status = xhttp.status;
      if(status === wyweb$io$HTTP_OK$static)  {
         success(xhttp.responseText);
      } else  {
         error(status);
      }
   }
}
function wyweb$io$get$Q6stringmQ6stringVmIV$V(url, success, error) {
   let xhttp = w3c$ajax$newXMLHttpRequest();
   xhttp.open("GET", Wy.copy(url), true);
    {
      const $0 = function(error, xhttp, success) {
         return function() {
            return wyweb$io$responseHandler$Q14XMLHttpRequestmQ6stringVmIV$V(xhttp, success, error);
         };
      }(error, xhttp, success);
      xhttp.onreadystatechange = $0;
   }
   xhttp.send("");
}
function wyweb$io$post$Q6stringQ6stringmQ6stringVmIV$V(url, data, success, error) {
   let xhttp = w3c$ajax$newXMLHttpRequest();
   xhttp.open("POST", Wy.copy(url), true);
   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    {
      const $1 = function(error, xhttp, success) {
         return function() {
            return wyweb$io$responseHandler$Q14XMLHttpRequestmQ6stringVmIV$V(xhttp, success, error);
         };
      }(error, xhttp, success);
      xhttp.onreadystatechange = $1;
   }
   xhttp.send(Wy.copy(data));
}
function wyweb$main$toggleVerification$Q5State$V(s) {
    {
      const $2 = !s.verify;
      s.verify = $2;
   }
}
function wyweb$main$toggleCounterExamples$Q5State$V(s) {
    {
      const $3 = !s.counterexamples;
      s.counterexamples = $3;
   }
}
function wyweb$main$print$Q8DocumentQ6string$V(doc, s) {
   let content = doc.getElementById("content");
   content.appendChild(doc.createTextNode(Wy.copy(s)));
}
function wyweb$main$clearAnnotationsAndMarkers$Q5State$V(state) {
   let session = state.editor.getSession();
   let markers = state.markers;
   session.clearAnnotations();
   for(let i = 0;i < markers.length;i = i + 1) {
      session.removeMarker(std$collections$vector$get$Q6VectorI$v1T(Wy.copy(markers), i));
   }
    {
      const $4 = std$collections$vector$Vector$V$Q6Vector();
      state.markers = $4;
   }
}
function wyweb$main$processCompilationFailure$Q8compiler7FailureQ5State$V(response, state) {
   let session = state.editor.getSession();
   let markers = state.markers;
   let annotations = std$collections$vector$Vector$V$Q6Vector();
   for(let i = 0;i < response.errors.length;i = i + 1) {
      let error = Wy.copy(response.errors[i]);
      let ann = ace$session$error$Q6stringQ4uintQ4uint$Q10Annotation(Wy.copy(error.text), error.line - 1, error.start);
       {
         const $5 = std$collections$vector$push$Q6Vectorv1T$Q6Vector(Wy.copy(annotations), Wy.copy(ann));
         annotations = $5;
      }
      let range = ace$range$Range$IIII$Q5Range(error.line - 1, error.start, error.line - 1, error.end + 1);
      let marker = session.addMarker(Wy.copy(range), "error-message", "error", true);
       {
         const $6 = std$collections$vector$push$Q6Vectorv1T$Q6Vector(Wy.copy(markers), marker);
         markers = $6;
      }
   }
   session.setAnnotations(std$collections$vector$to_array$Q6Vector$av1T(Wy.copy(annotations)));
    {
      const $7 = Wy.copy(markers);
      state.markers = $7;
   }
}
function wyweb$main$processCompilationResponse$Q6stringQ5State$V(response, state) {
   let cr = js$JSON$parse(Wy.copy(response));
   wyweb$main$clearAnnotationsAndMarkers$Q5State$V(state);
   if(Wy.equals(cr.result, Wy.toString("success")))  {
      wyweb$msgbox$add$Q10MessageBoxQ6stringQ6string$V(state.msgbox, "success", "Compiled successfully!");
   } else  {
      Wy.assert(is$Q8compiler8Responseqr2Q6string6resultaQ5Error6errors(cr));
      wyweb$main$processCompilationFailure$Q8compiler7FailureQ5State$V(cr, state);
      wyweb$msgbox$add$Q10MessageBoxQ6stringQ6string$V(state.msgbox, "error", "Compilation failed:");
   }
}
function wyweb$main$requestCompilation$Q5EventQ5State$V(e, state) {
   let cr = wyweb$compiler$Request$BBQ6string$Q7Request(state.verify, state.counterexamples, state.editor.getValue());
   let r = js$JSON$stringify(Wy.copy(cr));
   wyweb$io$post$Q6stringQ6stringmQ6stringVmIV$V("/compile", Wy.copy(r), function(state) {
      return function(s) {
         return wyweb$main$processCompilationResponse$Q6stringQ5State$V(Wy.copy(s), state);
      };
   }(state), function() {
      return function(i) {
         return w3c$dom$alert("ERROR");
      };
   }());
}
function wyweb$main$appendToggle$Q8DocumentQ7ElementQ6stringQ6stringQ6stringB$Q7Element(doc, parent, id, label, title, checked) {
   let tog = doc.createElement("input");
    {
      const $8 = Wy.copy(id);
      tog.id = $8;
   }
   tog.setAttribute("type", "checkbox");
   if(checked)  {
      tog.setAttribute("checked", "checked");
   }
   tog.setAttribute("title", Wy.copy(title));
   let l = doc.createElement("label");
   l.setAttribute("for", Wy.copy(id));
   l.appendChild(doc.createTextNode(Wy.copy(label)));
   parent.appendChild(tog);
   parent.appendChild(l);
   return tog;
}
function wyweb$main$run(doc) {
   let content = doc.getElementById("content");
   let editorDiv = doc.createElement("div");
    {
      const $9 = "code";
      editorDiv.id = $9;
   }
   content.appendChild(editorDiv);
   let cmdBar = doc.createElement("div");
    {
      const $10 = "cmdbar";
      cmdBar.id = $10;
   }
   let compileButton = doc.createElement("button");
   compileButton.appendChild(doc.createTextNode("Compile"));
   cmdBar.appendChild(compileButton);
   content.appendChild(cmdBar);
   let configBar = doc.createElement("div");
    {
      const $11 = "configbar";
      configBar.id = $11;
   }
   let verify = wyweb$main$appendToggle$Q8DocumentQ7ElementQ6stringQ6stringQ6stringB$Q7Element(doc, configBar, "verification", "Verification", "Enable of disable compile-tile verification", true);
   let counterexamples = wyweb$main$appendToggle$Q8DocumentQ7ElementQ6stringQ6stringQ6stringB$Q7Element(doc, configBar, "counterexamples", "Counterexamples", "Enable or disable counterexample generation", false);
   content.appendChild(configBar);
   let aceEditor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(editorDiv);
   aceEditor.setTheme("ace/theme/eclipse");
   aceEditor.getSession().setMode("ace/mode/whiley");
   let msgbox = wyweb$msgbox$create$Q8Document$Q10MessageBox(doc);
   content.appendChild(msgbox.element);
   let state = new Wy.Record({editor: aceEditor, markers: std$collections$vector$Vector$V$Q6Vector(), msgbox: Wy.copy(msgbox), verify: true, counterexamples: false});
   compileButton.addEventListener("click", function(state) {
      return function(e) {
         return wyweb$main$requestCompilation$Q5EventQ5State$V(e, state);
      };
   }(state));
   verify.addEventListener("change", function(state) {
      return function(s) {
         return wyweb$main$toggleVerification$Q5State$V(state);
      };
   }(state));
   counterexamples.addEventListener("change", function(state) {
      return function(s) {
         return wyweb$main$toggleCounterExamples$Q5State$V(state);
      };
   }(state));
}
function wyweb$msgbox$create$Q8Document$Q10MessageBox(doc) {
   let div = doc.createElement("div");
    {
      const $12 = "messages";
      div.id = $12;
   }
   return new Wy.Record({document: doc, element: div});
}
function wyweb$msgbox$add$Q10MessageBoxQ6stringQ6string$V(box, clazz, text) {
   let doc = box.document;
   let div = doc.createElement("div");
   div.appendChild(doc.createTextNode(Wy.copy(text)));
   div.classList.add("message");
   div.classList.add(Wy.copy(clazz));
   box.element.appendChild(div);
   w3c$dom$setTimeout(function(box, div) {
      return function() {
         return box.element.removeChild(div);
      };
   }(box, div), 1000);
}
function is$Q8compiler8Responseqr2Q6string6resultaQ5Error6errors(v) {
   return true;
}
