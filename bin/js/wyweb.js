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
      Wy.assert(is$Q8compiler8Responser2Q6string6resultaQ5Error6errors(cr));
      wyweb$main$processCompilationFailure$Q8compiler7FailureQ5State$V(Wy.copy(cr), state);
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
const wyweb$nmain$READY$static = 0;
const wyweb$nmain$COMPILING$static = 1;
const wyweb$nmain$SUCCESS$static = 2;
const wyweb$nmain$ERROR$static = 3;
function wyweb$nmain$toggle_verification$Q5State$Q5State(s) {
   let sp;
    {
      const $13 = !s.verification;
      s.verification = $13;
   }
   return Wy.copy(s);
}
function wyweb$nmain$toggle_console$Q5State$Q5State(s) {
   let sp;
    {
      const $14 = !s.console;
      s.console = $14;
   }
   return Wy.copy(s);
}
function wyweb$nmain$toggle_counterexamples$Q5State$Q5State(s) {
   let sp;
    {
      const $15 = !s.counterexamples;
      s.counterexamples = $15;
   }
   return Wy.copy(s);
}
function wyweb$nmain$toggle_javascript$Q5State$Q5State(s) {
   let sp;
    {
      const $16 = !s.javascript;
      s.javascript = $16;
   }
   return Wy.copy(s);
}
function wyweb$nmain$compile_clicked$Q10MouseEventQ5State$Q5StateaQ6Action(e, s) {
   let as;
   let sp;
   s.state = wyweb$nmain$COMPILING$static;
   return [Wy.copy(s), [web$io$query$Q5queryQ8consumer$Q6Action(wyweb$nmain$get_editor_text$Q3dom6Window$Q6string, wyweb$nmain$compile_begin$Q5StateQ6string$Q5StateaQ6Action)]];
}
function wyweb$nmain$compile_begin$Q5StateQ6string$Q5StateaQ6Action(s, text) {
   let as;
   let sp;
   let cr = wyweb$compiler$Request$BBQ6string$Q7Request(s.verification, s.counterexamples, Wy.copy(text));
   let r = js$JSON$stringify(Wy.copy(cr));
   return [Wy.copy(s), [web$io$post$Q6stringQ6stringQ8consumerQ7handler$Q6Action("/compile", Wy.copy(r), wyweb$nmain$compile_success$Q5StateQ6string$Q5StateaQ6Action, wyweb$nmain$compile_error$Q5State$Q5StateaQ6Action)]];
}
function wyweb$nmain$compile_success$Q5StateQ6string$Q5StateaQ6Action(s, response) {
   let as;
   let sp;
   let cr = js$JSON$parse(Wy.copy(response));
   if(Wy.equals(cr.result, Wy.toString("success")))  {
      Wy.assert(is$Q8compiler8Responser2Q6string6resultQ6string2js(cr));
      s.state = wyweb$nmain$SUCCESS$static;
      s.binary = Wy.copy(cr.js);
   } else  {
      Wy.assert(is$Q8compiler8Responser2Q6string6resultaQ5Error6errors(cr));
      s.state = wyweb$nmain$ERROR$static;
   }
   return [Wy.copy(s), [web$io$timeout$Q4uintQ7handler$Q6Action(1000, wyweb$nmain$compile_ready$Q5State$Q5StateaQ6Action)]];
}
function wyweb$nmain$compile_error$Q5State$Q5StateaQ6Action(s) {
   let as;
   let sp;
   s.state = wyweb$nmain$ERROR$static;
   return [Wy.copy(s), [web$io$timeout$Q4uintQ7handler$Q6Action(1000, wyweb$nmain$compile_ready$Q5State$Q5StateaQ6Action)]];
}
function wyweb$nmain$compile_ready$Q5State$Q5StateaQ6Action(s) {
   let as;
   let sp;
   s.state = wyweb$nmain$READY$static;
   return [Wy.copy(s), []];
}
function wyweb$nmain$view$Q5State$Q4Node(s) {
   let editor = wyweb$nmain$create_editor$Q5State$Q4Node(Wy.copy(s));
   let toolbar = wyweb$nmain$create_toolbar$Q5State$Q4Node(Wy.copy(s));
   let msgbox = wyweb$nmain$create_msgbox$Q5State$Q4Node(Wy.copy(s));
   let console = wyweb$nmain$create_console$Q5State$Q4Node(Wy.copy(s));
   let js = wyweb$nmain$create_javascript$Q5State$Q4Node(Wy.copy(s));
   return web$html$div$aQ4Node$Q4Node([Wy.copy(editor), Wy.copy(toolbar), Wy.copy(msgbox), Wy.copy(console), Wy.copy(js)]);
}
function wyweb$nmain$create_editor$Q5State$Q4Node(s) {
   return web$html$div$aQ9AttributeQ4Node$Q4Node([web$html$id$Q6string$Q9Attribute("code")], "");
}
const wyweb$nmain$LOADING$static = web$html$img$aQ9AttributeaQ4Node$Q4Node([new Wy.Record({key: "src", value: "images/loading.gif"})], [""]);
function wyweb$nmain$create_toolbar$Q5State$Q4Node(s) {
   let cb;
   if((s.state === wyweb$nmain$READY$static) || ((s.state === wyweb$nmain$SUCCESS$static) || (s.state === wyweb$nmain$ERROR$static)))  {
      cb = web$html$button$aQ9AttributeQ4Node$Q4Node([web$html$click$Q7handler$Q9Attribute(wyweb$nmain$compile_clicked$Q10MouseEventQ5State$Q5StateaQ6Action)], "Compile");
   } else  {
      cb = web$html$button$aQ9AttributeQ4Node$Q4Node([web$html$click$Q7handler$Q9Attribute(wyweb$nmain$compile_clicked$Q10MouseEventQ5State$Q5StateaQ6Action)], Wy.copy(wyweb$nmain$LOADING$static));
   }
   let rb = web$html$button$aQ9AttributeQ4Node$Q4Node([web$html$disabled$V$Q9Attribute()], "Run");
   let vt = wyweb$nmain$toggle$Q6stringQ6Toggle$Q4Node("Verification", wyweb$nmain$toggle_verification$Q5State$Q5State);
   let ct = wyweb$nmain$toggle$Q6stringQ6Toggle$Q4Node("Console", wyweb$nmain$toggle_console$Q5State$Q5State);
   let et = wyweb$nmain$toggle$Q6stringQ6Toggle$Q4Node("Counterexamples", wyweb$nmain$toggle_counterexamples$Q5State$Q5State);
   let jt = wyweb$nmain$toggle$Q6stringQ6Toggle$Q4Node("JavaScript", wyweb$nmain$toggle_javascript$Q5State$Q5State);
   return web$html$div$aQ9AttributeaQ4Node$Q4Node([web$html$id$Q6string$Q9Attribute("cmdbar")], [Wy.copy(cb), Wy.copy(rb), Wy.copy(vt), Wy.copy(ct), Wy.copy(et), Wy.copy(jt)]);
}
function wyweb$nmain$toggle$Q6stringQ6Toggle$Q4Node(lab, onclick) {
   let t = web$html$input$aQ9AttributeaQ4Node$Q4Node([new Wy.Record({key: "type", value: "checkbox"}), web$html$click$Q7handler$Q9Attribute(function(onclick) {
      return function(e, s) {
         return [onclick(Wy.copy(s)), []];
      };
   }(onclick))], [""]);
   let l = web$html$label$Q4Node$Q4Node(Wy.copy(lab));
   return web$html$div$aQ9AttributeaQ4Node$Q4Node([web$html$style$Q6string$Q9Attribute("display: inline;")], [Wy.copy(t), Wy.copy(l)]);
}
function wyweb$nmain$create_msgbox$Q5State$Q4Node(s) {
   let contents = "";
   switch(s.state) {
      case wyweb$nmain$SUCCESS$static: {
         contents = web$html$div$aQ9AttributeQ4Node$Q4Node([web$html$class$Q6string$Q9Attribute("message success")], "Success!");
         break;
      }
      case wyweb$nmain$ERROR$static: {
         contents = web$html$div$aQ9AttributeQ4Node$Q4Node([web$html$class$Q6string$Q9Attribute("message error")], "Error!");
         break;
      }
   }
   return web$html$div$aQ9AttributeaQ4Node$Q4Node([web$html$id$Q6string$Q9Attribute("messages")], [Wy.copy(contents)]);
}
function wyweb$nmain$create_console$Q5State$Q4Node(s) {
   if(s.console)  {
      return web$html$div$aQ9AttributeQ4Node$Q4Node([web$html$id$Q6string$Q9Attribute("console")], Wy.copy(s.output));
   } else  {
      return web$html$div$Q4Node$Q4Node("");
   }
}
function wyweb$nmain$create_javascript$Q5State$Q4Node(s) {
   if(s.javascript)  {
      return web$html$div$aQ9AttributeQ4Node$Q4Node([web$html$id$Q6string$Q9Attribute("bin")], Wy.copy(s.binary));
   } else  {
      return web$html$div$Q4Node$Q4Node("");
   }
}
function wyweb$nmain$run(root, window) {
   let state = new Wy.Record({state: wyweb$nmain$READY$static, verification: false, console: false, counterexamples: false, javascript: false, binary: "binary", output: "output"});
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
function is$Q8compiler8Responser2Q6string6resultaQ5Error6errors(v) {
   if(Object.keys(v).length !== 2)  {
      return false;
   } else if(((typeof v.result) === "undefined") || ((typeof v.result) !== "string"))  {
      return false;
   } else if(((typeof v.errors) === "undefined") || (!is$aQ5Error(v.errors)))  {
      return false;
   }
   return true;
}
function is$Q8compiler8Responser2Q6string6resultQ6string2js(v) {
   if(Object.keys(v).length !== 2)  {
      return false;
   } else if(((typeof v.result) === "undefined") || ((typeof v.result) !== "string"))  {
      return false;
   } else if(((typeof v.js) === "undefined") || ((typeof v.js) !== "string"))  {
      return false;
   }
   return true;
}
function is$aQ5Error(v) {
   if((v !== null) && (v.constructor === Array))  {
      for(let i = 0;i < v.length;i = i + 1) {
         if(!is$r5Q6string4textQ4uint5startQ4uint3endQ4uint4lineu2Q6stringN14counterExample(v[i]))  {
            return false;
         }
      }
      return true;
   }
   return false;
}
function is$r5Q6string4textQ4uint5startQ4uint3endQ4uint4lineu2Q6stringN14counterExample(v) {
   if((v === null) || ((v.constructor !== Wy.Record) && (v.constructor !== Object)))  {
      return false;
   } else if(((typeof v.text) === "undefined") || ((typeof v.text) !== "string"))  {
      return false;
   } else if(((typeof v.start) === "undefined") || (!is$Q4uint(v.start)))  {
      return false;
   } else if(((typeof v.end) === "undefined") || (!is$Q4uint(v.end)))  {
      return false;
   } else if(((typeof v.line) === "undefined") || (!is$Q4uint(v.line)))  {
      return false;
   } else if(((typeof v.counterExample) === "undefined") || (!is$u2Q6stringN(v.counterExample)))  {
      return false;
   }
   return true;
}
function is$u2Q6stringN(v) {
   return ((typeof v) === "string") || (v === null);
}
function is$Q4uint(v) {
   return ((typeof v) === "number") && std$integer$uint$type(v);
}
