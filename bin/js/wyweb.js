'use strict';
function wyweb$compiler$Request$BBBQ6stringaQ6string$Q7Request(verify, check, counterexamples, code, deps) {
   return new Wy.Record({code: Wy.copy(code), verify: verify, counterexamples: counterexamples, quickcheck: check, dependencies: Wy.copy(deps)});
}
const wyweb$main$EG_NAMES$static = ["", "Hello World", "Absolute", "IndexOf"];
const wyweb$main$EG_TEXT$static = ["", "import std::io\nimport std::ascii\n\nmethod main():\n    io::println(\"hello world\")", "function abs(int x) -> (int r)\nensures r >= 0\nensures (r == x) || (r == -x):\n    //\n    if x >= 0:\n        return x\n    else:\n        return -x", "type nat is (int x) where x >= 0\n\nfunction indexOf(int[] items, int item) -> (int r)\n// If valid index returned, element matches item\nensures r >= 0 ==> items[r] == item\n// If invalid index return, no element matches item\nensures r <  0 ==> all { i in 0..|items| | items[i] != item }\n// Return value is between -1 and size of items\nensures r >= -1 && r < |items|:\n    //\n    nat i = 0\n    while i < |items|\n        where all { k in 0 .. i | items[k] != item }:\n        //    \n        if items[i] == item:\n            return i\n        i = i + 1\n    //\n    return -1"];
const wyweb$main$READY$static = 0;
const wyweb$main$READY_RUN$static = 1;
const wyweb$main$COMPILING$static = 2;
const wyweb$main$SUCCESS$static = 3;
const wyweb$main$ERROR$static = 4;
const wyweb$main$FAILURE$static = 5;
function wyweb$main$toggle_verification$Q10MouseEventQ5State$Q5StateaQ6Action(e, s) {
   let as;
   let sp;
    {
      const $0 = !s.verification;
      s.verification = $0;
   }
   return [Wy.copy(s), []];
}
function wyweb$main$toggle_check$Q10MouseEventQ5State$Q5StateaQ6Action(e, s) {
   let as;
   let sp;
    {
      const $1 = !s.check;
      s.check = $1;
   }
   return [Wy.copy(s), []];
}
function wyweb$main$toggle_counterexamples$Q10MouseEventQ5State$Q5StateaQ6Action(e, s) {
   let as;
   let sp;
    {
      const $2 = !s.counterexamples;
      s.counterexamples = $2;
   }
   return [Wy.copy(s), []];
}
function wyweb$main$toggle_settings$Q10MouseEventQ5State$Q5StateaQ6Action(e, s) {
   let as;
   let sp;
    {
      const $3 = !s.settings;
      s.settings = $3;
   }
   return [Wy.copy(s), []];
}
function wyweb$main$load_example$Q10MouseEventQ5State$Q5StateaQ6Action(e, s) {
   let as;
   let sp;
   return [Wy.copy(s), [web$io$call$mQ3dom6WindowV$Q6Actiontv1S(function() {
      return function(w) {
         return wyweb$main$set_editor_text$Q3dom6Window$V(w);
      };
   }())]];
}
function wyweb$main$compile_clicked$Q10MouseEventQ5State$Q5StateaQ6Action(e, s) {
   let as;
   let sp;
   s.state = wyweb$main$COMPILING$static;
   return [Wy.copy(s), [web$io$query$Q5querytQ3dom6Windowv1TQ8consumertv1Sv1T$Q6Actiontv1S(wyweb$main$get_editor_text$Q3dom6Window$Q6string, wyweb$main$compile_begin$Q5StateQ6string$Q5StateaQ6Action), web$io$call$mQ3dom6WindowV$Q6Actiontv1S(wyweb$main$save_current_state$Q3dom6Window$V)]];
}
function wyweb$main$compile_begin$Q5StateQ6string$Q5StateaQ6Action(s, text) {
   let as;
   let sp;
   let cr = wyweb$compiler$Request$BBBQ6stringaQ6string$Q7Request(s.verification, s.check, s.counterexamples, Wy.copy(text), Wy.copy(s.dependencies));
   let r = js$JSON$stringify(Wy.copy(cr));
   return [Wy.copy(s), [web$io$post$Q6stringQ6stringQ8consumertv1SQ6stringQ7handlertv1S$Q6Actiontv1S("/compile", Wy.copy(r), wyweb$main$compile_success$Q5StateQ6string$Q5StateaQ6Action, wyweb$main$compile_error$Q5State$Q5StateaQ6Action)]];
}
function wyweb$main$compile_success$Q5StateQ6string$Q5StateaQ6Action(s, response) {
   let as;
   let sp;
   let cr = js$JSON$parse(Wy.copy(response));
   if(Wy.equals(cr.result, Wy.toString("success")))  {
      Wy.assert(is$Q8compiler8Responser2Q6string6resultQ6string2js(cr));
      s.state = wyweb$main$SUCCESS$static;
      s.binary = Wy.copy(cr.js);
      return [Wy.copy(s), [web$io$call$mQ3dom6WindowV$Q6Actiontv1S(function(s) {
         return function(w) {
            return wyweb$main$clear_editor_markers$Q3dom6WindowaQ4uint$V(w, Wy.copy(s.markers));
         };
      }(s)), web$io$timeout$Q4uintQ7handlertv1S$Q6Actiontv1S(1000, wyweb$main$compile_readyrun$Q5State$Q5StateaQ6Action)]];
   } else  {
      if(Wy.equals(cr.result, Wy.toString("errors")))  {
         Wy.assert(is$Q8compiler8Responser2Q6string6resultaQ5Error6errors(cr));
         s.state = wyweb$main$ERROR$static;
         return [Wy.copy(s), [web$io$call$mQ3dom6WindowV$Q6Actiontv1S(function(s) {
            return function(w) {
               return wyweb$main$clear_editor_markers$Q3dom6WindowaQ4uint$V(w, Wy.copy(s.markers));
            };
         }(s)), web$io$query$Q5querytQ3dom6Windowv1TQ8consumertv1Sv1T$Q6Actiontv1S(function(cr) {
            return function(w) {
               return wyweb$main$set_editor_markers$Q3dom6WindowaQ8compiler5Error$aQ4uint(w, Wy.copy(cr.errors));
            };
         }(cr), wyweb$main$compile_failure$Q5StateaQ4uint$Q5StateaQ6Action), web$io$timeout$Q4uintQ7handlertv1S$Q6Actiontv1S(1000, wyweb$main$compile_ready$Q5State$Q5StateaQ6Action)]];
      } else  {
         Wy.assert(is$Q8compiler8Responser2Q6string6resultQ6string4text(cr));
         s.state = wyweb$main$FAILURE$static;
         s.error = Wy.copy(cr.text);
         return [Wy.copy(s), [web$io$timeout$Q4uintQ7handlertv1S$Q6Actiontv1S(1000, wyweb$main$compile_ready$Q5State$Q5StateaQ6Action)]];
      }
   }
}
function wyweb$main$compile_failure$Q5StateaQ4uint$Q5StateaQ6Action(s, markers) {
   let as;
   let sp;
   s.markers = Wy.copy(markers);
   return [Wy.copy(s), []];
}
function wyweb$main$compile_error$Q5State$Q5StateaQ6Action(s) {
   let as;
   let sp;
   s.state = wyweb$main$ERROR$static;
   return [Wy.copy(s), [web$io$timeout$Q4uintQ7handlertv1S$Q6Actiontv1S(1000, wyweb$main$compile_ready$Q5State$Q5StateaQ6Action)]];
}
function wyweb$main$compile_readyrun$Q5State$Q5StateaQ6Action(s) {
   let as;
   let sp;
   s.state = wyweb$main$READY_RUN$static;
   return [Wy.copy(s), []];
}
function wyweb$main$compile_ready$Q5State$Q5StateaQ6Action(s) {
   let as;
   let sp;
   s.state = wyweb$main$READY$static;
   return [Wy.copy(s), []];
}
function wyweb$main$view$Q5State$Q4Node(s) {
   let editor = wyweb$main$create_editor$Q5State$Q4Node(Wy.copy(s));
   let cmdbar = wyweb$main$create_cmdbar$Q5State$Q4Node(Wy.copy(s));
   let content = web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("content")], [Wy.copy(editor), Wy.copy(cmdbar)]);
   let window = web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("window")], Wy.copy(content));
   let toolbar = wyweb$main$create_toolbar$Q5State$Q4Node(Wy.copy(s));
   let toolbar_options = wyweb$main$create_toolbar_options$Q5State$Q4Node(Wy.copy(s));
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("container")], [Wy.copy(toolbar), Wy.copy(toolbar_options), Wy.copy(window)]);
}
function wyweb$main$create_editor$Q5State$Q4Node(s) {
   return web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("editor")], web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("code")], ""));
}
const wyweb$main$LOADING$static = web$html$img$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([new Wy.Record({key: "src", value: "images/loading.gif"})], [""]);
function wyweb$main$create_toolbar$Q5State$Q4Node(s) {
   let login = wyweb$main$create_icon$Q6string$Q4Node("fa fa-sign-in");
   let settings = wyweb$main$create_icon$Q6stringQ6Toggle$Q4Node("fa fa-cog", wyweb$main$toggle_settings$Q10MouseEventQ5State$Q5StateaQ6Action);
   let files = wyweb$main$create_icon$Q6string$Q4Node("fa fa-files-o");
   let terminal = wyweb$main$create_icon$Q6string$Q4Node("fa fa-terminal");
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("toolbar")], [Wy.copy(login), Wy.copy(settings), Wy.copy(files), Wy.copy(terminal)]);
}
function wyweb$main$create_toolbar_options$Q5State$Q4Node(s) {
   if(s.settings)  {
      let vt = wyweb$main$toggle$Q6stringQ6Toggle$Q4Node("Verification", wyweb$main$toggle_verification$Q10MouseEventQ5State$Q5StateaQ6Action);
      let qt = wyweb$main$toggle$Q6stringQ6Toggle$Q4Node("Check", wyweb$main$toggle_check$Q10MouseEventQ5State$Q5StateaQ6Action);
      let et = wyweb$main$toggle$Q6stringQ6Toggle$Q4Node("Counterexamples", wyweb$main$toggle_counterexamples$Q10MouseEventQ5State$Q5StateaQ6Action);
      return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("toolbar-options")], [web$html$h2$Q4Nodetv1S$Q4Nodetv1S("Verification"), Wy.copy(vt), Wy.copy(qt), Wy.copy(et), web$html$hr$V$Q4Nodetv1S(), web$html$h2$Q4Nodetv1S$Q4Nodetv1S("Packages"), web$html$hr$V$Q4Nodetv1S()]);
   } else  {
      return "";
   }
}
function wyweb$main$create_icon$Q6string$Q4Node(cl) {
   return web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$class$Q6string$Q9Attributetv1S("icon")], web$html$i$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$class$Q6string$Q9Attributetv1S(Wy.copy(cl))], ""));
}
function wyweb$main$create_icon$Q6stringQ6Toggle$Q4Node(cl, handler) {
   return web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$class$Q6string$Q9Attributetv1S("icon"), web$html$click$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(handler)], web$html$i$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$class$Q6string$Q9Attributetv1S(Wy.copy(cl))], ""));
}
function wyweb$main$create_cmdbar$Q5State$Q4Node(s) {
   let l;
   let cb;
   switch(s.state) {
      case wyweb$main$READY$static:
      case wyweb$main$READY_RUN$static:
      case wyweb$main$SUCCESS$static:
      case wyweb$main$ERROR$static: {
         cb = web$html$button$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$click$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(wyweb$main$compile_clicked$Q10MouseEventQ5State$Q5StateaQ6Action)], "Compile");
         l = "";
         break;
      }
      default: {
         cb = web$html$button$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$click$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(wyweb$main$compile_clicked$Q10MouseEventQ5State$Q5StateaQ6Action), web$html$disabled$V$Q9Attributetv1S()], "Compile");
         l = Wy.copy(wyweb$main$LOADING$static);
         break;
      }
   }
   let msgbox = wyweb$main$create_msgbox$Q5State$Q4Node(Wy.copy(s));
   let egs = wyweb$main$create_examples$aQ6stringQ6Toggle$Q4Node(Wy.copy(wyweb$main$EG_NAMES$static), wyweb$main$load_example$Q10MouseEventQ5State$Q5StateaQ6Action);
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("cmdbar")], [Wy.copy(cb), Wy.copy(l), Wy.copy(msgbox), Wy.copy(egs)]);
}
function wyweb$main$toggle$Q6stringQ6Toggle$Q4Node(lab, onclick) {
   let t = web$html$input$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([new Wy.Record({key: "type", value: "checkbox"}), web$html$click$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(onclick)], [""]);
   let l = web$html$label$Q4Nodetv1S$Q4Nodetv1S(Wy.copy(lab));
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$class$Q6string$Q9Attributetv1S("toolbar-options-toggle")], [Wy.copy(t), Wy.copy(l)]);
}
function wyweb$main$create_examples$aQ6stringQ6Toggle$Q4Node(labels, onchange) {
   let children = Wy.array("", labels.length);
   for(let i = 0;i < labels.length;i = i + 1) {
      children[i] = web$html$option$Q4Nodetv1S$Q4Nodetv1S(Wy.copy(labels[i]));
   }
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("egbar")], ["Examples: ", web$html$select$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("egselect"), web$html$change$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(onchange)], Wy.copy(children))]);
}
function wyweb$main$create_msgbox$Q5State$Q4Node(s) {
   let contents = "";
   switch(s.state) {
      case wyweb$main$SUCCESS$static: {
         contents = web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$class$Q6string$Q9Attributetv1S("message success")], "Success!");
         break;
      }
      case wyweb$main$ERROR$static: {
         contents = web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$class$Q6string$Q9Attributetv1S("message error")], "Error!");
         break;
      }
      case wyweb$main$FAILURE$static: {
         contents = web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S([web$html$class$Q6string$Q9Attributetv1S("message error")], Wy.copy(s.error));
         break;
      }
   }
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S([web$html$id$Q6string$Q9Attributetv1S("messages")], [Wy.copy(contents)]);
}
function wyweb$main$run(root, window, deps) {
   let state = new Wy.Record({state: wyweb$main$READY$static, verification: false, check: false, counterexamples: false, settings: false, binary: "binary", output: "output", error: "", dependencies: Wy.copy(deps), markers: []});
   let app = new Wy.Record({model: Wy.copy(state), view: wyweb$main$view$Q5State$Q4Node});
   web$app$run(Wy.copy(app), root, window);
   wyweb$main$configure_editor$Q3dom6Window$V(window);
   wyweb$main$load_saved_state$Q3dom6Window$V(window);
}
function wyweb$main$configure_editor$Q3dom6Window$V(w) {
   let div = w.document.getElementById("code");
   let aceEditor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(Wy.copy(div));
   aceEditor.setTheme("ace/theme/eclipse");
   aceEditor.getSession().setMode("ace/mode/whiley");
}
function wyweb$main$get_editor_text$Q3dom6Window$Q6string(w) {
   let div = w.document.getElementById("code");
   let aceEditor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(Wy.copy(div));
   return aceEditor.getValue();
}
function wyweb$main$set_editor_text$Q3dom6Window$V(w) {
   let sel = w.document.getElementById("egselect");
   Wy.assert(is$Q3dom4Nodeqr31m2Q6stringQ13EventListenerV16addEventListenerm2Q6stringQ13EventListenerV19removeEventListenerI8nodeTypeQ6string8nodeNameu2NQ7Element6parentaQ4Node10childNodesQ4Node10firstChildQ4Node9lastChildQ4Node11nextSiblingQ4Node15previousSiblingB11isConnectedfVB13hasChildNodesQ6string9nodeValueu2NQ6string11textContentmQ4NodeV11appendChildmQ4NodeV11removeChildm2Q4NodeQ4NodeV12replaceChildQ19CssStyleDeclaration5styleaQ7Element8childrenQ6string9innerTextm2Q6stringQ6stringV12setAttributeI4colsQ6string12defaultValueB8disabledI9maxLengthQ6string4nameB8readOnlyB8requiredI4rowsQ6string5valueB4wrap(sel));
   let label = sel.value;
   let text = "";
   for(let i = 0;i < Wy.copy(wyweb$main$EG_NAMES$static).length;i = i + 1) {
      if(Wy.equals(label, Wy.copy(wyweb$main$EG_NAMES$static)[i]))  {
         text = Wy.copy(Wy.copy(wyweb$main$EG_TEXT$static)[i]);
         break;
      }
   }
   let div = w.document.getElementById("code");
   let aceEditor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(Wy.copy(div));
   aceEditor.setValue(Wy.copy(text), 0);
}
function wyweb$main$load_saved_state$Q3dom6Window$V(w) {
   let db = w.localStorage;
   let st = db.getItem("whileyweb$saved");
   if((typeof st) === "string")  {
      let div = w.document.getElementById("code");
      let aceEditor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(Wy.copy(div));
      aceEditor.setValue(Wy.copy(st), 0);
   }
}
function wyweb$main$save_current_state$Q3dom6Window$V(w) {
   let db = w.localStorage;
   let st = wyweb$main$get_editor_text$Q3dom6Window$Q6string(w);
   db.setItem("whileyweb$saved", Wy.copy(st));
}
function wyweb$main$clear_editor_markers$Q3dom6WindowaQ4uint$V(w, markers) {
   let div = w.document.getElementById("code");
   let editor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(Wy.copy(div));
   let session = editor.getSession();
   session.clearAnnotations();
   for(let i = 0;i < markers.length;i = i + 1) {
      session.removeMarker(markers[i]);
   }
}
function wyweb$main$set_editor_markers$Q3dom6WindowaQ8compiler5Error$aQ4uint(w, errors) {
   let div = w.document.getElementById("code");
   let editor = ace$ace$edit$u2Q6stringQ7Element$Q6Editor(Wy.copy(div));
   let session = editor.getSession();
   let markers = Wy.array(0, errors.length);
   let annotations = std$collections$vector$Vector$V$Q6Vectortv1T();
   for(let i = 0;i < errors.length;i = i + 1) {
      let error = Wy.copy(errors[i]);
      let ann = ace$session$error$Q6stringQ4uintQ4uint$Q10Annotation(Wy.copy(error.text), error.line - 1, error.start);
       {
         const $4 = std$collections$vector$push$Q6Vectortv1Tv1T$Q6Vectortv1T(Wy.copy(annotations), Wy.copy(ann));
         annotations = $4;
      }
      let range = ace$range$Range$IIII$Q5Range(error.line - 1, error.start, error.line - 1, error.end + 1);
      markers[i] = session.addMarker(Wy.copy(range), "error-message", "error", true);
   }
   session.setAnnotations(std$collections$vector$to_array$Q6Vectortv1T$av1T(Wy.copy(annotations)));
   return Wy.copy(markers);
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
function is$Q3dom4Nodeqr31m2Q6stringQ13EventListenerV16addEventListenerm2Q6stringQ13EventListenerV19removeEventListenerI8nodeTypeQ6string8nodeNameu2NQ7Element6parentaQ4Node10childNodesQ4Node10firstChildQ4Node9lastChildQ4Node11nextSiblingQ4Node15previousSiblingB11isConnectedfVB13hasChildNodesQ6string9nodeValueu2NQ6string11textContentmQ4NodeV11appendChildmQ4NodeV11removeChildm2Q4NodeQ4NodeV12replaceChildQ19CssStyleDeclaration5styleaQ7Element8childrenQ6string9innerTextm2Q6stringQ6stringV12setAttributeI4colsQ6string12defaultValueB8disabledI9maxLengthQ6string4nameB8readOnlyB8requiredI4rowsQ6string5valueB4wrap(v) {
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
function is$Q8compiler8Responser2Q6string6resultQ6string4text(v) {
   if(Object.keys(v).length !== 2)  {
      return false;
   } else if(((typeof v.result) === "undefined") || ((typeof v.result) !== "string"))  {
      return false;
   } else if(((typeof v.text) === "undefined") || ((typeof v.text) !== "string"))  {
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
