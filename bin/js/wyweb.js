'use strict';
function main$view$Q5State$Q4Node(s) {
   let b = web$html$button$aQ9AttributeQ4Node$Q4Node([], "OK");
   return web$html$div$aQ4Node$Q4Node([Wy.copy(b), "Hello World"]);
}
function main$main() {
   let state = new Wy.Record({counter: 0});
   return new Wy.Record({model: Wy.copy(state), view: main$view$Q5State$Q4Node});
}
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
   let w = state.msgbox.window;
   let cr = wyweb$compiler$Request$BBQ6string$Q7Request(state.verify, state.counterexamples, state.editor.getValue());
   let r = js$JSON$stringify(Wy.copy(cr));
   wyweb$io$post$Q6stringQ6stringmQ6stringVmIV$V("/compile", Wy.copy(r), function(state) {
      return function(s) {
         return wyweb$main$processCompilationResponse$Q6stringQ5State$V(Wy.copy(s), state);
      };
   }(state), function(w) {
      return function(i) {
         return w.alert("ERROR");
      };
   }(w));
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
function wyweb$main$run(win) {
   let doc = win.document;
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
   let msgbox = wyweb$msgbox$create$Q6Window$Q10MessageBox(win);
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
function wyweb$msgbox$create$Q6Window$Q10MessageBox(win) {
   let div = win.document.createElement("div");
    {
      const $12 = "messages";
      div.id = $12;
   }
   return new Wy.Record({window: win, element: div});
}
function wyweb$msgbox$add$Q10MessageBoxQ6stringQ6string$V(box, clazz, text) {
   let doc = box.window.document;
   let div = doc.createElement("div");
   div.appendChild(doc.createTextNode(Wy.copy(text)));
   div.classList.add("message");
   div.classList.add(Wy.copy(clazz));
   box.element.appendChild(div);
   box.window.setTimeout(function(box, div) {
      return function() {
         return box.element.removeChild(div);
      };
   }(box, div), 1000);
}
function wyweb$nmain$compile_clicked$Q5State$Q5StateaQ6Action(s) {
   let as;
   let sp;
   return [Wy.copy(s), [web$io$query$Q5queryQ8consumer$Q6Action(wyweb$nmain$get_editor_text$Q3dom6Window$Q6string, wyweb$nmain$compile_ready$Q5StateQ6string$Q5StateaQ6Action)]];
}
function wyweb$nmain$compile_ready$Q5StateQ6string$Q5StateaQ6Action(s, text) {
   let as;
   let sp;
   let cr = wyweb$compiler$Request$BBQ6string$Q7Request(false, false, Wy.copy(text));
   let r = js$JSON$stringify(Wy.copy(cr));
   return [Wy.copy(s), [web$io$post$Q6stringQ6stringQ8consumerQ7handler$Q6Action("/compile", Wy.copy(r), wyweb$nmain$compile_success$Q5StateQ6string$Q5StateaQ6Action, wyweb$nmain$compile_error$Q5State$Q5StateaQ6Action)]];
}
function wyweb$nmain$compile_success$Q5StateQ6string$Q5StateaQ6Action(s, response) {
   let as;
   let sp;
   return [Wy.copy(s), [web$io$alert$Q6string$Q6Action("compilation success")]];
}
function wyweb$nmain$compile_error$Q5State$Q5StateaQ6Action(s) {
   let as;
   let sp;
   return [Wy.copy(s), [web$io$alert$Q6string$Q6Action("compilation error")]];
}
function wyweb$nmain$view$Q5State$Q4Node(s) {
   let editor = wyweb$nmain$create_editor$Q5State$Q4Node(Wy.copy(s));
   let toolbar = wyweb$nmain$create_toolbar$Q5State$Q4Node(Wy.copy(s));
   return web$html$div$aQ4Node$Q4Node([Wy.copy(editor), Wy.copy(toolbar)]);
}
function wyweb$nmain$create_editor$Q5State$Q4Node(s) {
   return web$html$div$aQ9AttributeQ4Node$Q4Node([web$html$id$Q6string$Q9Attribute("code")], "");
}
function wyweb$nmain$create_toolbar$Q5State$Q4Node(s) {
   let cb = web$html$button$aQ9AttributeQ4Node$Q4Node([web$html$click$Q7handler$Q9Attribute(function() {
      return function(e, st) {
         return wyweb$nmain$compile_clicked$Q5State$Q5StateaQ6Action(Wy.copy(st));
      };
   }())], "Compile");
   return web$html$div$aQ9AttributeaQ4Node$Q4Node([web$html$id$Q6string$Q9Attribute("cmdbar")], [Wy.copy(cb)]);
}
function wyweb$nmain$run(root, window) {
   let state = new Wy.Record({counter: 0});
   let app = new Wy.Record({model: Wy.copy(state), view: wyweb$nmain$view$Q5State$Q4Node});
   web$app$run(Wy.copy(app), root, window);
   wyweb$nmain$configure_editor$Q3dom6Window$V(window);
}
function wyweb$nmain$configure_editor$Q3dom6Window$V(w) {
   let div = w.document.getElementById("code");
   let aceEditor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(div);
   aceEditor.setTheme("ace/theme/eclipse");
   aceEditor.getSession().setMode("ace/mode/whiley");
}
function wyweb$nmain$get_editor_text$Q3dom6Window$Q6string(w) {
   let div = w.document.getElementById("code");
   let aceEditor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(div);
   return aceEditor.getValue();
}
function is$Q8compiler8Responseqr2Q6string6resultaQ5Error6errors(v) {
   return true;
}
