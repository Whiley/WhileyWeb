'use strict';
function web$app$run(app, root, win) {
   let state = new Wy.Ref(new Wy.Record({app: Wy.copy(app), root: root, rendering: null, window: win}));
   web$app$refresh$qQ5Statetv1S$V(state);
}
function web$app$refresh$qQ5Statetv1S$V(st) {
   let current = st.$ref.rendering;
   let m = st.$ref.app.view(Wy.copy(st.$ref.app.model));
   let t;
   if(current === null)  {
      t = web$app$to_dom$Q4html4Nodetv1SqQ5Statetv1S$Q3dom4Node(Wy.copy(m), st);
      st.$ref.root.appendChild(t);
   } else  {
      let update = web$diff$create$Q4html4Nodetv1SQ4html4Nodetv1S$Q13NodeOperationtv1S(Wy.copy(current.model), Wy.copy(m));
      t = web$app$update_dom$Q3dom4NodeQ4diff13NodeOperationtv1SqQ5Statetv1S$Q3dom4Node(current.view, Wy.copy(update), st);
      web$app$replace_child$Q3dom4NodeQ3dom4NodeQ3dom4Node$V(st.$ref.root, current.view, t);
   }
    {
      const $0 = new Wy.Record({model: Wy.copy(m), view: t});
      st.$ref.rendering = $0;
   }
}
function web$app$to_dom$Q4html4Nodetv1SqQ5Statetv1S$Q3dom4Node(node, st) {
   if((typeof node) === "string")  {
      return st.$ref.window.document.createTextNode(Wy.copy(node));
   } else  {
      let element = st.$ref.window.document.createElement(Wy.copy(node.name));
      web$app$initEventListeners(element);
      for(let i = 0;i < node.children.length;i = i + 1) {
         let child = web$app$to_dom$Q4html4Nodetv1SqQ5Statetv1S$Q3dom4Node(Wy.copy(node.children[i]), st);
         element.appendChild(child);
      }
      for(let j = 0;j < node.attributes.length;j = j + 1) {
         let attr = Wy.copy(node.attributes[j]);
         web$app$set_attribute$Q3dom7ElementQ4html9Attributetv1SqQ5Statetv1S$V(element, Wy.copy(attr), st);
      }
      return element;
   }
}
function web$app$update_dom$Q3dom4NodeQ4diff13NodeOperationtv1SqQ5Statetv1S$Q3dom4Node(tree, op, st) {
   if(op === null)  {
      return tree;
   } else  {
      if(is$u2r2aQ18AttributeOperationtv1S10attributesaQ13NodeOperationtv1S8childrenr1Q4html4Nodetv1S4noder1Q4html4Nodetv1S4node(op))  {
         return web$app$to_dom$Q4html4Nodetv1SqQ5Statetv1S$Q3dom4Node(Wy.copy(op.node), st);
      } else  {
         if(tree.hasChildNodes())  {
            web$app$update_children$Q3dom4NodeaQ4diff13NodeOperationtv1SqQ5Statetv1S$V(tree, Wy.copy(op.children), st);
         }
      }
   }
   web$app$resize_children$Q3dom4NodeaQ4diff13NodeOperationtv1SqQ5Statetv1S$V(tree, Wy.copy(op.children), st);
   web$app$update_attributes$Q3dom4NodeaQ4diff18AttributeOperationtv1SqQ5Statetv1S$V(tree, Wy.copy(op.attributes), st);
   return tree;
}
function web$app$update_children$Q3dom4NodeaQ4diff13NodeOperationtv1SqQ5Statetv1S$V(tree, operations, st) {
   let children = tree.childNodes;
   let size = std$math$min$II$I(children.length, operations.length);
   for(let i = 0;i < size;i = i + 1) {
      let ithChild = children[i];
      let ithOp = Wy.copy(operations[i]);
      if(ithOp !== null)  {
         let t = web$app$update_dom$Q3dom4NodeQ4diff13NodeOperationtv1SqQ5Statetv1S$Q3dom4Node(ithChild, Wy.copy(ithOp), st);
         web$app$replace_child$Q3dom4NodeQ3dom4NodeQ3dom4Node$V(tree, ithChild, t);
      }
   }
}
function web$app$resize_children$Q3dom4NodeaQ4diff13NodeOperationtv1SqQ5Statetv1S$V(tree, operations, st) {
   let size;
   if(tree.hasChildNodes())  {
      size = tree.childNodes.length;
   } else  {
      size = 0;
   }
   if(size <= operations.length)  {
      for(let i = size;i < operations.length;i = i + 1) {
         let ith = Wy.copy(operations[i]);
         if(is$Q4diff13NodeOperationtv1Sr1Q4html4Nodetv1S4node(ith))  {
            let t = web$app$to_dom$Q4html4Nodetv1SqQ5Statetv1S$Q3dom4Node(Wy.copy(ith.node), st);
            tree.appendChild(t);
         }
      }
   } else  {
      while(size > operations.length)  {
         tree.removeChild(tree.lastChild);
          {
            const $1 = size - 1;
            size = $1;
         }
      }
   }
}
function web$app$replace_child$Q3dom4NodeQ3dom4NodeQ3dom4Node$V(tree, oldChild, newChild) {
   if(oldChild !== newChild)  {
      tree.replaceChild(newChild, oldChild);
   }
}
function web$app$update_attributes$Q3dom4NodeaQ4diff18AttributeOperationtv1SqQ5Statetv1S$V(tree, operations, st) {
   if(tree.nodeType === w3c$dom$ELEMENT_NODE$static)  {
      Wy.assert(is$Q3dom4Nodeqr27m2Q6stringQ13EventListenerV16addEventListenerm2Q6stringQ13EventListenerV19removeEventListenerI8nodeTypeQ6string8nodeNameu2NQ7Element6parentaQ4Node10childNodesQ4Node10firstChildQ4Node9lastChildQ4Node11nextSiblingQ4Node15previousSiblingB11isConnectedfVB13hasChildNodesQ6string9nodeValueu2NQ6string11textContentmQ4NodeV11appendChildmQ4NodeV11removeChildm2Q4NodeQ4NodeV12replaceChildQ19CssStyleDeclaration5styleaQ7Element8childrenQ6string9classNameQ4ListtQ6string9classListQ6string2idQ6string9innerTextmVV6removem2Q6stringQ6stringV12setAttributemQ6stringV12getAttributemQ6stringV15removeAttribute(tree));
      for(let i = 0;i < operations.length;i = i + 1) {
         let ith = Wy.copy(operations[i]);
         if((ith === null) || (ith.before === null))  {
             {
            }
         } else  {
            web$app$clear_attribute$Q3dom7ElementQ4html9Attributetv1SqQ5Statetv1S$V(tree, Wy.copy(ith.before), st);
         }
      }
      for(let i = 0;i < operations.length;i = i + 1) {
         let ith = Wy.copy(operations[i]);
         if((ith === null) || (ith.after === null))  {
             {
            }
         } else  {
            web$app$set_attribute$Q3dom7ElementQ4html9Attributetv1SqQ5Statetv1S$V(tree, Wy.copy(ith.after), st);
         }
      }
   }
}
function web$app$set_attribute$Q3dom7ElementQ4html9Attributetv1SqQ5Statetv1S$V(element, attr, st) {
   if(is$Q4html9Attributetv1Sr2Q6string3keyQ6string5value(attr))  {
      element.setAttribute(Wy.copy(attr.key), Wy.copy(attr.value));
   } else  {
      if(is$u3r2Q6string5eventQ7handlertQ5Eventv1S7handlerr2Q6string10mouseEventQ7handlertQ10MouseEventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handlerr2Q6string10mouseEventQ7handlertQ10MouseEventv1S7handler(attr))  {
         let handler = attr.handler;
         let listener = function(handler, st) {
            return function(e) {
               return web$app$process_mouse_event$Q3dom10MouseEventQ4html7handlertQ4html10MouseEventv1SqQ5Statetv1S$V(e, handler, st);
            };
         }(handler, st);
         web$app$setEventListener(element, Wy.copy(attr.mouseEvent), listener);
      } else  {
         if(is$u2r2Q6string5eventQ7handlertQ5Eventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handler(attr))  {
            let handler = attr.handler;
            let listener = function(st, handler) {
               return function(e) {
                  return web$app$process_keyboard_event$Q3dom13KeyboardEventQ4html7handlertQ4html13KeyboardEventv1SqQ5Statetv1S$V(e, handler, st);
               };
            }(st, handler);
            web$app$setEventListener(element, Wy.copy(attr.keyEvent), listener);
         } else  {
            let handler = attr.handler;
            let listener = function(st, handler) {
               return function(e) {
                  return web$app$process_other_event$Q3dom5EventQ4html7handlertQ4html5Eventv1SqQ5Statetv1S$V(e, handler, st);
               };
            }(st, handler);
            web$app$setEventListener(element, Wy.copy(attr.event), listener);
         }
      }
   }
}
function web$app$clear_attribute$Q3dom7ElementQ4html9Attributetv1SqQ5Statetv1S$V(element, attr, st) {
   if(is$Q4html9Attributetv1Sr2Q6string3keyQ6string5value(attr))  {
      element.removeAttribute(Wy.copy(attr.key));
   } else  {
      if(is$u3r2Q6string5eventQ7handlertQ5Eventv1S7handlerr2Q6string10mouseEventQ7handlertQ10MouseEventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handlerr2Q6string10mouseEventQ7handlertQ10MouseEventv1S7handler(attr))  {
         web$app$clearEventListener(element, Wy.copy(attr.mouseEvent));
      } else  {
         if(is$u2r2Q6string5eventQ7handlertQ5Eventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handler(attr))  {
            web$app$clearEventListener(element, Wy.copy(attr.keyEvent));
         } else  {
            web$app$clearEventListener(element, Wy.copy(attr.event));
         }
      }
   }
}
function web$app$process_mouse_event$Q3dom10MouseEventQ4html7handlertQ4html10MouseEventv1SqQ5Statetv1S$V(e, h, st) {
   web$app$process_event$v1EQ4html7handlertv1Ev1SqQ5Statetv1S$V(web$html$to_mouse_event$Q3dom10MouseEvent$Q10MouseEvent(e), h, st);
}
function web$app$process_keyboard_event$Q3dom13KeyboardEventQ4html7handlertQ4html13KeyboardEventv1SqQ5Statetv1S$V(e, h, st) {
   web$app$process_event$v1EQ4html7handlertv1Ev1SqQ5Statetv1S$V(web$html$to_key_event$Q3dom13KeyboardEvent$Q13KeyboardEvent(e), h, st);
}
function web$app$process_other_event$Q3dom5EventQ4html7handlertQ4html5Eventv1SqQ5Statetv1S$V(e, h, st) {
   web$app$process_event$v1EQ4html7handlertv1Ev1SqQ5Statetv1S$V(web$html$to_event$Q3dom5Event$Q4html5Event(e), h, st);
}
function web$app$process_event$v1EQ4html7handlertv1Ev1SqQ5Statetv1S$V(e, h, st) {
   let [model, actions] = h(Wy.copy(e), Wy.copy(st.$ref.app.model));
    {
      const $2 = Wy.copy(model);
      st.$ref.app.model = $2;
   }
   for(let i = 0;i < actions.length;i = i + 1) {
      web$io$processor$qQ5Statetv1SQ6Actiontv1S$V(st, Wy.copy(actions[i]));
   }
   web$app$refresh$qQ5Statetv1S$V(st);
}
function web$diff$create$Q4html4Nodetv1SQ4html4Nodetv1S$Q13NodeOperationtv1S(before, after) {
   if(Wy.equals(before, after))  {
      return null;
   } else  {
      if(((typeof before) === "string") || (((typeof after) === "string") || (!Wy.equals(before.name, after.name))))  {
         return new Wy.Record({node: Wy.copy(after)});
      } else  {
         let childOps = web$diff$diff_children$aQ4html4Nodetv1SaQ4html4Nodetv1S$aQ13NodeOperationtv1S(Wy.copy(before.children), Wy.copy(after.children));
         let attrOps = web$diff$diff_attributes$aQ4html9Attributetv1SaQ4html9Attributetv1S$aQ18AttributeOperationtv1S(Wy.copy(before.attributes), Wy.copy(after.attributes));
         return new Wy.Record({attributes: Wy.copy(attrOps), children: Wy.copy(childOps)});
      }
   }
}
function web$diff$diff_children$aQ4html4Nodetv1SaQ4html4Nodetv1S$aQ13NodeOperationtv1S(bChildren, aChildren) {
   let rs;
   let operations = Wy.array(null, aChildren.length);
   if(bChildren.length < aChildren.length)  {
      for(let i = 0;i < bChildren.length;i = i + 1) {
         operations[i] = web$diff$create$Q4html4Nodetv1SQ4html4Nodetv1S$Q13NodeOperationtv1S(Wy.copy(bChildren[i]), Wy.copy(aChildren[i]));
      }
      for(let i = bChildren.length;i < aChildren.length;i = i + 1) {
         operations[i] = new Wy.Record({node: Wy.copy(aChildren[i])});
      }
   } else  {
      for(let i = 0;i < aChildren.length;i = i + 1) {
         operations[i] = web$diff$create$Q4html4Nodetv1SQ4html4Nodetv1S$Q13NodeOperationtv1S(Wy.copy(bChildren[i]), Wy.copy(aChildren[i]));
      }
   }
   return Wy.copy(operations);
}
function web$diff$diff_attributes$aQ4html9Attributetv1SaQ4html9Attributetv1S$aQ18AttributeOperationtv1S(bAttributes, aAttributes) {
   let rs;
   let m = std$math$min$II$I(bAttributes.length, aAttributes.length);
   let n = bAttributes.length;
    {
      const $3 = n + (aAttributes.length - m);
      n = $3;
   }
   let ops = Wy.array(new Wy.Record({before: null, after: null}), n);
   for(let i = 0;i < m;i = i + 1) {
      let b = Wy.copy(bAttributes[i]);
      let a = Wy.copy(aAttributes[i]);
      if(!Wy.equals(b, a))  {
         ops[i] = new Wy.Record({before: Wy.copy(b), after: Wy.copy(a)});
      } else  {
         ops[i] = null;
      }
   }
   for(let i = m;i < bAttributes.length;i = i + 1) {
      let b = Wy.copy(bAttributes[i]);
      ops[i + m] = new Wy.Record({before: Wy.copy(b), after: null});
   }
   for(let i = m;i < aAttributes.length;i = i + 1) {
      let a = Wy.copy(aAttributes[i]);
      ops[i + bAttributes.length] = new Wy.Record({before: null, after: Wy.copy(a)});
   }
   return Wy.copy(ops);
}
function web$html$class$Q6string$Q9Attributetv1S(text) {
   return new Wy.Record({key: "class", value: Wy.copy(text)});
}
function web$html$disabled$V$Q9Attributetv1S() {
   return new Wy.Record({key: "disabled", value: ""});
}
function web$html$sfor$Q6string$Q9Attributetv1S(text) {
   return new Wy.Record({key: "for", value: Wy.copy(text)});
}
function web$html$id$Q6string$Q9Attributetv1S(text) {
   return new Wy.Record({key: "id", value: Wy.copy(text)});
}
function web$html$name$Q6string$Q9Attributetv1S(text) {
   return new Wy.Record({key: "name", value: Wy.copy(text)});
}
function web$html$style$Q6string$Q9Attributetv1S(text) {
   return new Wy.Record({key: "style", value: Wy.copy(text)});
}
function web$html$tYpe$Q6string$Q9Attributetv1S(text) {
   return new Wy.Record({key: "type", value: Wy.copy(text)});
}
function web$html$tabindex$I$Q9Attributetv1S(index) {
   return new Wy.Record({key: "tabindex", value: Wy.fromString(std$ascii$to_string$I$Q6string(index))});
}
function web$html$change$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({mouseEvent: "change", handler: handler});
}
function web$html$click$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({mouseEvent: "click", handler: handler});
}
function web$html$dblclick$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({mouseEvent: "dblclick", handler: handler});
}
function web$html$focus$Q7handlertQ5Eventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({event: "focus", handler: handler});
}
function web$html$keydown$Q7handlertQ13KeyboardEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({keyEvent: "keydown", handler: handler});
}
function web$html$keypress$Q7handlertQ13KeyboardEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({keyEvent: "keypress", handler: handler});
}
function web$html$keyup$Q7handlertQ13KeyboardEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({keyEvent: "keyup", handler: handler});
}
function web$html$mousedown$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({mouseEvent: "mousedown", handler: handler});
}
function web$html$mousemove$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({mouseEvent: "mousemove", handler: handler});
}
function web$html$mouseover$Q7handlertQ10MouseEventv1S$Q9Attributetv1S(handler) {
   return new Wy.Record({mouseEvent: "mouseover", handler: handler});
}
function web$html$element$Q6stringQ4Nodetv1S$Q4Nodetv1S(tag, child) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(tag), Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$element$Q6stringaQ4Nodetv1S$Q4Nodetv1S(tag, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(tag), Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$element$Q6stringaQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(tag, attributes, child) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(tag), Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(tag, attributes, children) {
   return new Wy.Record({name: Wy.copy(tag), attributes: Wy.copy(attributes), children: Wy.copy(children)});
}
function web$html$h1$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$h1$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$h1$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$h1$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$h1$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$h1$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h1$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("h1", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h2$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$h2$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$h2$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$h2$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$h2$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$h2$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h2$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("h2", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h3$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$h3$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$h3$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$h3$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$h3$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$h3$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h3$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("h3", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h4$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$h4$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$h4$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$h4$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$h4$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$h4$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h4$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("h4", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h5$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$h5$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$h5$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$h5$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$h5$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$h5$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h5$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("h5", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h6$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$h6$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$h6$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$h6$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$h6$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$h6$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h6$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("h6", Wy.copy(attributes), Wy.copy(children));
}
function web$html$p$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$p$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$p$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$p$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$p$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$p$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$p$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("p", Wy.copy(attributes), Wy.copy(children));
}
function web$html$br$V$Q4Nodetv1S() {
   return web$html$br$aQ9Attributetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0));
}
function web$html$br$aQ9Attributetv1S$Q4Nodetv1S(attributes) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("br", Wy.copy(attributes), Wy.array("", 0));
}
function web$html$hr$V$Q4Nodetv1S() {
   return web$html$hr$aQ9Attributetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0));
}
function web$html$hr$aQ9Attributetv1S$Q4Nodetv1S(attributes) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("hr", Wy.copy(attributes), Wy.array("", 0));
}
function web$html$abbr$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$abbr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$abbr$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$abbr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$abbr$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$abbr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$abbr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("abbr", Wy.copy(attributes), Wy.copy(children));
}
function web$html$address$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$address$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$address$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$address$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$address$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$address$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$address$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("address", Wy.copy(attributes), Wy.copy(children));
}
function web$html$b$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$b$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$b$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$b$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$b$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$b$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$b$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("b", Wy.copy(attributes), Wy.copy(children));
}
function web$html$blockquote$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$blockquote$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$blockquote$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$blockquote$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$blockquote$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$blockquote$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$blockquote$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("blockquote", Wy.copy(attributes), Wy.copy(children));
}
function web$html$center$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$center$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$center$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$center$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$center$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$center$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$center$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("center", Wy.copy(attributes), Wy.copy(children));
}
function web$html$cite$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$cite$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$cite$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$cite$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$cite$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$cite$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$cite$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("cite", Wy.copy(attributes), Wy.copy(children));
}
function web$html$code$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$code$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$code$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$code$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$code$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$code$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$code$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("code", Wy.copy(attributes), Wy.copy(children));
}
function web$html$em$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$em$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$em$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$em$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$em$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$em$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$em$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("em", Wy.copy(attributes), Wy.copy(children));
}
function web$html$font$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$font$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$font$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$font$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$font$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$font$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$font$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("font", Wy.copy(attributes), Wy.copy(children));
}
function web$html$i$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$i$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$i$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$i$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$i$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$i$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$i$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("i", Wy.copy(attributes), Wy.copy(children));
}
function web$html$pre$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$pre$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$pre$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$pre$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$pre$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$pre$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$pre$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("pre", Wy.copy(attributes), Wy.copy(children));
}
function web$html$q$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$q$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$q$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$q$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$q$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$q$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$q$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("q", Wy.copy(attributes), Wy.copy(children));
}
function web$html$s$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$s$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$s$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$s$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$s$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$s$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$s$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("s", Wy.copy(attributes), Wy.copy(children));
}
function web$html$small$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$small$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$small$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$small$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$small$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$small$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$small$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("small", Wy.copy(attributes), Wy.copy(children));
}
function web$html$strike$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$strike$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$strike$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$strike$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$strike$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$strike$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$strike$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("strike", Wy.copy(attributes), Wy.copy(children));
}
function web$html$strong$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$strong$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$strong$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$strong$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$strong$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$strong$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$strong$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("strong", Wy.copy(attributes), Wy.copy(children));
}
function web$html$sub$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$sub$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$sub$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$sub$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$sub$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$sub$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$sub$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("sub", Wy.copy(attributes), Wy.copy(children));
}
function web$html$sup$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$sup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$sup$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$sup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$sup$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$sup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$sup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("sup", Wy.copy(attributes), Wy.copy(children));
}
function web$html$u$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$u$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$u$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$u$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$u$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$u$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$u$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("u", Wy.copy(attributes), Wy.copy(children));
}
function web$html$form$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$form$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$form$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$form$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$form$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$form$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$form$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("form", Wy.copy(attributes), Wy.copy(children));
}
function web$html$input$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$input$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$input$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$input$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$input$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$input$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$input$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("input", Wy.copy(attributes), Wy.copy(children));
}
function web$html$textarea$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$textarea$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$textarea$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$textarea$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$textarea$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$textarea$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$textarea$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("textarea", Wy.copy(attributes), Wy.copy(children));
}
function web$html$button$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$button$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$button$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$button$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$button$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$button$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$button$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("button", Wy.copy(attributes), Wy.copy(children));
}
function web$html$select$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$select$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$select$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$select$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$select$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$select$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$select$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("select", Wy.copy(attributes), Wy.copy(children));
}
function web$html$optgroup$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$optgroup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$optgroup$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$optgroup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$optgroup$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$optgroup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$optgroup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("optgroup", Wy.copy(attributes), Wy.copy(children));
}
function web$html$option$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$option$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$option$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$option$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$option$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$option$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$option$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("option", Wy.copy(attributes), Wy.copy(children));
}
function web$html$label$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$label$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$label$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$label$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$label$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$label$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$label$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("label", Wy.copy(attributes), Wy.copy(children));
}
function web$html$fieldset$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$fieldset$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$fieldset$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$fieldset$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$fieldset$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$fieldset$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$fieldset$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("fieldset", Wy.copy(attributes), Wy.copy(children));
}
function web$html$legend$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$legend$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$legend$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$legend$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$legend$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$legend$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$legend$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("legend", Wy.copy(attributes), Wy.copy(children));
}
function web$html$datalist$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$datalist$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$datalist$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$datalist$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$datalist$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$datalist$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$datalist$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("datalist", Wy.copy(attributes), Wy.copy(children));
}
function web$html$output$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$output$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$output$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$output$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$output$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$output$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$output$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("output", Wy.copy(attributes), Wy.copy(children));
}
function web$html$iframe$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$iframe$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$iframe$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$iframe$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$iframe$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$iframe$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$iframe$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("iframe", Wy.copy(attributes), Wy.copy(children));
}
function web$html$img$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$img$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$img$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$img$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$img$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$img$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$img$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("img", Wy.copy(attributes), Wy.copy(children));
}
function web$html$map$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$map$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$map$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$map$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$map$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$map$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$map$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("map", Wy.copy(attributes), Wy.copy(children));
}
function web$html$area$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$area$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$area$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$area$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$area$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$area$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$area$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("area", Wy.copy(attributes), Wy.copy(children));
}
function web$html$canvas$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$canvas$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$canvas$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$canvas$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$canvas$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$canvas$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$canvas$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("canvas", Wy.copy(attributes), Wy.copy(children));
}
function web$html$figcaption$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$figcaption$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$figcaption$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$figcaption$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$figcaption$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$figcaption$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$figcaption$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("figcaption", Wy.copy(attributes), Wy.copy(children));
}
function web$html$figure$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$figure$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$figure$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$figure$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$figure$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$figure$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$figure$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("figure", Wy.copy(attributes), Wy.copy(children));
}
function web$html$picture$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$picture$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$picture$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$picture$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$picture$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$picture$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$picture$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("picture", Wy.copy(attributes), Wy.copy(children));
}
function web$html$svg$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$svg$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$svg$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$svg$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$svg$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$svg$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$svg$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("svg", Wy.copy(attributes), Wy.copy(children));
}
function web$html$a$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$a$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$a$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$a$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$a$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$a$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$a$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("a", Wy.copy(attributes), Wy.copy(children));
}
function web$html$link$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$link$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$link$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$link$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$link$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$link$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$link$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("link", Wy.copy(attributes), Wy.copy(children));
}
function web$html$nav$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$nav$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$nav$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$nav$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$nav$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$nav$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$nav$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("nav", Wy.copy(attributes), Wy.copy(children));
}
function web$html$ul$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$ul$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$ul$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$ul$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$ul$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$ul$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$ul$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("ul", Wy.copy(attributes), Wy.copy(children));
}
function web$html$ol$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$ol$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$ol$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$ol$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$ol$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$ol$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$ol$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("ol", Wy.copy(attributes), Wy.copy(children));
}
function web$html$li$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$li$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$li$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$li$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$li$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$li$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$li$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("li", Wy.copy(attributes), Wy.copy(children));
}
function web$html$dl$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$dl$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$dl$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$dl$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$dl$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$dl$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$dl$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("dl", Wy.copy(attributes), Wy.copy(children));
}
function web$html$dtr$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$dtr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$dtr$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$dtr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$dtr$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$dtr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$dtr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("dtr", Wy.copy(attributes), Wy.copy(children));
}
function web$html$dd$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$dd$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$dd$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$dd$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$dd$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$dd$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$dd$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("dd", Wy.copy(attributes), Wy.copy(children));
}
function web$html$table$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$table$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$table$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$table$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$table$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$table$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$table$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("table", Wy.copy(attributes), Wy.copy(children));
}
function web$html$caption$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$caption$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$caption$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$caption$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$caption$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$caption$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$caption$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("caption", Wy.copy(attributes), Wy.copy(children));
}
function web$html$th$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$th$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$th$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$th$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$th$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$th$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$th$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("th", Wy.copy(attributes), Wy.copy(children));
}
function web$html$tr$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$tr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$tr$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$tr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$tr$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$tr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$tr$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("tr", Wy.copy(attributes), Wy.copy(children));
}
function web$html$td$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$td$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$td$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$td$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$td$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$td$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$td$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("td", Wy.copy(attributes), Wy.copy(children));
}
function web$html$thead$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$thead$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$thead$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$thead$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$thead$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$thead$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$thead$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("thead", Wy.copy(attributes), Wy.copy(children));
}
function web$html$tbody$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$tbody$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$tbody$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$tbody$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$tbody$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$tbody$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$tbody$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("tbody", Wy.copy(attributes), Wy.copy(children));
}
function web$html$tfoot$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$tfoot$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$tfoot$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$tfoot$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$tfoot$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$tfoot$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$tfoot$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("tfoot", Wy.copy(attributes), Wy.copy(children));
}
function web$html$col$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$col$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$col$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$col$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$col$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$col$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$col$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("col", Wy.copy(attributes), Wy.copy(children));
}
function web$html$colgroup$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$colgroup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$colgroup$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$colgroup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$colgroup$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$colgroup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$colgroup$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("colgroup", Wy.copy(attributes), Wy.copy(children));
}
function web$html$div$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$div$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$div$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$div$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("div", Wy.copy(attributes), Wy.copy(children));
}
function web$html$span$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$span$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$span$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$span$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$span$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$span$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$span$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("span", Wy.copy(attributes), Wy.copy(children));
}
function web$html$header$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$header$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$header$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$header$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$header$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$header$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$header$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("header", Wy.copy(attributes), Wy.copy(children));
}
function web$html$footer$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$footer$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$footer$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$footer$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$footer$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$footer$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$footer$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("footer", Wy.copy(attributes), Wy.copy(children));
}
function web$html$main$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$main$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$main$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$main$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$main$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$main$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$main$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("main", Wy.copy(attributes), Wy.copy(children));
}
function web$html$section$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$section$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$section$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$section$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$section$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$section$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$section$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("section", Wy.copy(attributes), Wy.copy(children));
}
function web$html$article$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$article$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$article$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$article$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$article$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$article$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$article$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("article", Wy.copy(attributes), Wy.copy(children));
}
function web$html$aside$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$aside$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$aside$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$aside$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$aside$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$aside$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$aside$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("aside", Wy.copy(attributes), Wy.copy(children));
}
function web$html$details$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$details$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$details$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$details$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$details$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$details$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$details$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("details", Wy.copy(attributes), Wy.copy(children));
}
function web$html$dialog$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$dialog$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$dialog$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$dialog$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$dialog$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$dialog$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$dialog$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("dialog", Wy.copy(attributes), Wy.copy(children));
}
function web$html$summary$Q4Nodetv1S$Q4Nodetv1S(child) {
   return web$html$summary$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), [Wy.copy(child)]);
}
function web$html$summary$aQ4Nodetv1S$Q4Nodetv1S(children) {
   return web$html$summary$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.array(web$html$id$Q6string$Q9Attributetv1S(""), 0), Wy.copy(children));
}
function web$html$summary$aQ9Attributetv1SQ4Nodetv1S$Q4Nodetv1S(attributes, child) {
   return web$html$summary$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$summary$aQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S(attributes, children) {
   return web$html$element$Q6stringaQ9Attributetv1SaQ4Nodetv1S$Q4Nodetv1S("summary", Wy.copy(attributes), Wy.copy(children));
}
function web$html$to_event$Q3dom5Event$Q4html5Event(event) {
   return new Wy.Record({timeStamp: event.timeStamp});
}
function web$html$to_mouse_event$Q3dom10MouseEvent$Q10MouseEvent(event) {
   return new Wy.Record({altKey: event.altKey, button: event.button, buttons: event.buttons, clientX: event.clientX, clientY: event.clientY, ctrlKey: event.ctrlKey, metaKey: event.metaKey, movementX: event.movementX, movementY: event.movementY, offsetX: event.offsetX, offsetY: event.offsetY, pageX: event.pageX, pageY: event.pageY, region: event.region, screenX: event.screenX, screenY: event.screenY, shiftKey: event.shiftKey});
}
function web$html$to_key_event$Q3dom13KeyboardEvent$Q13KeyboardEvent(event) {
   return new Wy.Record({altKey: event.altKey, code: event.code, ctrlKey: event.ctrlKey, isComposing: event.isComposing, key: event.key, keyCode: event.keyCode, location: event.location, metaKey: event.metaKey, repeat: event.repeat, shiftKey: event.shiftKey});
}
function web$io$processor$qQ5Statetv1SQ6Actiontv1S$V(st, action) {
   let actions = action.apply(st);
   for(let i = 0;i < actions.length;i = i + 1) {
      web$io$processor$qQ5Statetv1SQ6Actiontv1S$V(st, Wy.copy(actions[i]));
   }
}
function web$io$alert$Q6string$Q6Actiontv1S(message) {
   return new Wy.Record({apply: function(message) {
      return function(st) {
         return web$io$apply_alert$Q3dom6WindowQ6string$aQ6Actiontv1S(st.$ref.window, Wy.copy(message));
      };
   }(message)});
}
function web$io$call$mQ3dom6WindowV$Q6Actiontv1S(call) {
   return new Wy.Record({apply: function(call) {
      return function(st) {
         return web$io$apply_call$qQ5Statetv1SmQ3dom6WindowV$aQ6Actiontv1S(st, call);
      };
   }(call)});
}
function web$io$get$Q6stringQ8consumertv1SQ6stringQ7handlertv1S$Q6Actiontv1S(url, ok, error) {
   return new Wy.Record({apply: function(ok, url, error) {
      return function(st) {
         return web$io$apply_get$qQ5Statetv1SQ6stringQ8consumertv1SQ6stringQ7handlertv1S$aQ6Actiontv1S(st, Wy.copy(url), ok, error);
      };
   }(ok, url, error)});
}
function web$io$interval$Q4uintQ7handlertv1S$Q6Actiontv1S(timeout, handler) {
   return new Wy.Record({apply: function(timeout, handler) {
      return function(st) {
         return web$io$apply_interval$qQ5Statetv1SQ4uintQ7handlertv1S$aQ6Actiontv1S(st, timeout, handler);
      };
   }(timeout, handler)});
}
function web$io$post$Q6stringQ6stringQ8consumertv1SQ6stringQ7handlertv1S$Q6Actiontv1S(url, payload, ok, error) {
   return new Wy.Record({apply: function(ok, url, error, payload) {
      return function(st) {
         return web$io$apply_post$qQ5Statetv1SQ6stringQ6stringQ8consumertv1SQ6stringQ7handlertv1S$aQ6Actiontv1S(st, Wy.copy(url), Wy.copy(payload), ok, error);
      };
   }(ok, url, error, payload)});
}
function web$io$timeout$Q4uintQ7handlertv1S$Q6Actiontv1S(timeout, handler) {
   return new Wy.Record({apply: function(timeout, handler) {
      return function(st) {
         return web$io$apply_timeout$qQ5Statetv1SQ4uintQ7handlertv1S$aQ6Actiontv1S(st, timeout, handler);
      };
   }(timeout, handler)});
}
function web$io$query$Q6stringQ5querytQ3dom7Elementv1TQ8consumertv1Sv1T$Q6Actiontv1S(id, query, consumer) {
   return new Wy.Record({apply: function(id, query, consumer) {
      return function(st) {
         return web$io$apply_query$qQ5Statetv1SQ6stringQ5querytQ3dom7Elementv1TQ8consumertv1Sv1T$aQ6Actiontv1S(st, Wy.copy(id), query, consumer);
      };
   }(id, query, consumer)});
}
function web$io$query$Q5querytQ3dom6Windowv1TQ8consumertv1Sv1T$Q6Actiontv1S(query, consumer) {
   return new Wy.Record({apply: function(query, consumer) {
      return function(st) {
         return web$io$apply_query$qQ5Statetv1SQ5querytQ3dom6Windowv1TQ8consumertv1Sv1T$aQ6Actiontv1S(st, query, consumer);
      };
   }(query, consumer)});
}
function web$io$apply_alert$Q3dom6WindowQ6string$aQ6Actiontv1S(window, message) {
   window.alert(Wy.copy(message));
   return [];
}
function web$io$apply_call$qQ5Statetv1SmQ3dom6WindowV$aQ6Actiontv1S(st, call) {
   call(st.$ref.window);
   return [];
}
function web$io$apply_get$qQ5Statetv1SQ6stringQ8consumertv1SQ6stringQ7handlertv1S$aQ6Actiontv1S(st, url, ok, error) {
   let mok = function(st, ok) {
      return function(s) {
         return web$io$consume_event$v1TqQ5Statetv1SQ8consumertv1Sv1T$V(Wy.copy(s), st, ok);
      };
   }(st, ok);
   let merr = function(st, error) {
      return function(i) {
         return web$io$process_event$qQ5Statetv1SQ7handlertv1S$V(st, error);
      };
   }(st, error);
   web$io$begin_get$Q6stringmQ6stringVmIV$V(Wy.copy(url), mok, merr);
   return [];
}
function web$io$apply_interval$qQ5Statetv1SQ4uintQ7handlertv1S$aQ6Actiontv1S(st, interval, handler) {
   let m = function(st, handler) {
      return function() {
         return web$io$process_event$qQ5Statetv1SQ7handlertv1S$V(st, handler);
      };
   }(st, handler);
   st.$ref.window.setInterval(m, interval);
   return [];
}
function web$io$apply_post$qQ5Statetv1SQ6stringQ6stringQ8consumertv1SQ6stringQ7handlertv1S$aQ6Actiontv1S(st, url, payload, ok, error) {
   let mok = function(st, ok) {
      return function(s) {
         return web$io$consume_event$v1TqQ5Statetv1SQ8consumertv1Sv1T$V(Wy.copy(s), st, ok);
      };
   }(st, ok);
   let merr = function(st, error) {
      return function(i) {
         return web$io$process_event$qQ5Statetv1SQ7handlertv1S$V(st, error);
      };
   }(st, error);
   web$io$begin_post$Q6stringQ6stringmQ6stringVmIV$V(Wy.copy(url), Wy.copy(payload), mok, merr);
   return [];
}
function web$io$apply_timeout$qQ5Statetv1SQ4uintQ7handlertv1S$aQ6Actiontv1S(st, timeout, handler) {
   let m = function(st, handler) {
      return function() {
         return web$io$process_event$qQ5Statetv1SQ7handlertv1S$V(st, handler);
      };
   }(st, handler);
   st.$ref.window.setTimeout(m, timeout);
   return [];
}
function web$io$apply_query$qQ5Statetv1SQ6stringQ5querytQ3dom7Elementv1TQ8consumertv1Sv1T$aQ6Actiontv1S(st, id, query, consumer) {
   let e = st.$ref.window.document.getElementById(Wy.copy(id));
   let response = query(e);
   let [m, as] = consumer(Wy.copy(st.$ref.app.model), Wy.copy(response));
    {
      const $4 = Wy.copy(m);
      st.$ref.app.model = $4;
   }
   return Wy.copy(as);
}
function web$io$apply_query$qQ5Statetv1SQ5querytQ3dom6Windowv1TQ8consumertv1Sv1T$aQ6Actiontv1S(st, query, consumer) {
   let response = query(st.$ref.window);
   let [m, as] = consumer(Wy.copy(st.$ref.app.model), Wy.copy(response));
    {
      const $5 = Wy.copy(m);
      st.$ref.app.model = $5;
   }
   return Wy.copy(as);
}
function web$io$process_event$qQ5Statetv1SQ7handlertv1S$V(st, fn) {
   let [m, as] = fn(Wy.copy(st.$ref.app.model));
    {
      const $6 = Wy.copy(m);
      st.$ref.app.model = $6;
   }
   for(let i = 0;i < as.length;i = i + 1) {
      web$io$processor$qQ5Statetv1SQ6Actiontv1S$V(st, Wy.copy(as[i]));
   }
   web$app$refresh$qQ5Statetv1S$V(st);
}
function web$io$consume_event$v1TqQ5Statetv1SQ8consumertv1Sv1T$V(response, st, fn) {
   let [m, as] = fn(Wy.copy(st.$ref.app.model), Wy.copy(response));
    {
      const $7 = Wy.copy(m);
      st.$ref.app.model = $7;
   }
   for(let i = 0;i < as.length;i = i + 1) {
      web$io$processor$qQ5Statetv1SQ6Actiontv1S$V(st, Wy.copy(as[i]));
   }
   web$app$refresh$qQ5Statetv1S$V(st);
}
const web$io$HTTP_OK$static = 200;
function web$io$begin_get$Q6stringmQ6stringVmIV$V(url, success, error) {
   let xhttp = w3c$ajax$newXMLHttpRequest();
   xhttp.open("GET", Wy.copy(url), true);
    {
      const $8 = function(error, xhttp, success) {
         return function() {
            return web$io$response_handler$Q14XMLHttpRequestmQ6stringVmIV$V(xhttp, success, error);
         };
      }(error, xhttp, success);
      xhttp.onreadystatechange = $8;
   }
   xhttp.send("");
}
function web$io$begin_post$Q6stringQ6stringmQ6stringVmIV$V(url, data, success, error) {
   let xhttp = w3c$ajax$newXMLHttpRequest();
   xhttp.open("POST", Wy.copy(url), true);
   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    {
      const $9 = function(error, xhttp, success) {
         return function() {
            return web$io$response_handler$Q14XMLHttpRequestmQ6stringVmIV$V(xhttp, success, error);
         };
      }(error, xhttp, success);
      xhttp.onreadystatechange = $9;
   }
   xhttp.send(Wy.copy(data));
}
function web$io$response_handler$Q14XMLHttpRequestmQ6stringVmIV$V(xhttp, success, error) {
   if(xhttp.readyState === w3c$ajax$DONE$static)  {
      let status = xhttp.status;
      if(status === web$io$HTTP_OK$static)  {
         success(xhttp.responseText);
      } else  {
         error(status);
      }
   }
}
function is$u2r2aQ18AttributeOperationtv1S10attributesaQ13NodeOperationtv1S8childrenr1Q4html4Nodetv1S4noder1Q4html4Nodetv1S4node(v) {
   return Object.keys(v).length === 1;
}
function is$u3r2Q6string5eventQ7handlertQ5Eventv1S7handlerr2Q6string10mouseEventQ7handlertQ10MouseEventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handlerr2Q6string10mouseEventQ7handlertQ10MouseEventv1S7handler(v) {
   if(((typeof v.mouseEvent) === "undefined") || ((typeof v.mouseEvent) !== "string"))  {
      return false;
   } else if(((typeof v.handler) === "undefined") || (!is$u3Q7handlertQ5Eventv1SQ7handlertQ10MouseEventv1SQ7handlertQ13KeyboardEventv1Sf2Q10MouseEventv1S2v1SaQ6Actiontv1S(v.handler)))  {
      return false;
   }
   return true;
}
function is$Q4diff13NodeOperationtv1Sr1Q4html4Nodetv1S4node(v) {
   return (v !== null) && (Object.keys(v).length === 1);
}
function is$Q4html9Attributetv1Sr2Q6string3keyQ6string5value(v) {
   if(((typeof v.key) === "undefined") || ((typeof v.key) !== "string"))  {
      return false;
   } else if(((typeof v.value) === "undefined") || ((typeof v.value) !== "string"))  {
      return false;
   }
   return true;
}
function is$u2r2Q6string5eventQ7handlertQ5Eventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handlerr2Q6string8keyEventQ7handlertQ13KeyboardEventv1S7handler(v) {
   if(((typeof v.keyEvent) === "undefined") || ((typeof v.keyEvent) !== "string"))  {
      return false;
   } else if(((typeof v.handler) === "undefined") || (!is$u2Q7handlertQ5Eventv1SQ7handlertQ13KeyboardEventv1Sf2Q13KeyboardEventv1S2v1SaQ6Actiontv1S(v.handler)))  {
      return false;
   }
   return true;
}
function is$Q3dom4Nodeqr27m2Q6stringQ13EventListenerV16addEventListenerm2Q6stringQ13EventListenerV19removeEventListenerI8nodeTypeQ6string8nodeNameu2NQ7Element6parentaQ4Node10childNodesQ4Node10firstChildQ4Node9lastChildQ4Node11nextSiblingQ4Node15previousSiblingB11isConnectedfVB13hasChildNodesQ6string9nodeValueu2NQ6string11textContentmQ4NodeV11appendChildmQ4NodeV11removeChildm2Q4NodeQ4NodeV12replaceChildQ19CssStyleDeclaration5styleaQ7Element8childrenQ6string9classNameQ4ListtQ6string9classListQ6string2idQ6string9innerTextmVV6removem2Q6stringQ6stringV12setAttributemQ6stringV12getAttributemQ6stringV15removeAttribute(v) {
   return true;
}
function is$u2Q7handlertQ5Eventv1SQ7handlertQ13KeyboardEventv1Sf2Q13KeyboardEventv1S2v1SaQ6Actiontv1S(v) {
   return true;
}
function is$u3Q7handlertQ5Eventv1SQ7handlertQ10MouseEventv1SQ7handlertQ13KeyboardEventv1Sf2Q10MouseEventv1S2v1SaQ6Actiontv1S(v) {
   return true;
}
/**
 * Initial a dom element with the necessary dictionary for event
 * listeners.  This essentially guarantees that every time we
 * encounter a DOM element created from this library it will have this
 * dictionary available.  The purpose of the dictionary is to record
 * listeners that have been set so that they can be cleared again in
 * the future.
 */
function web$app$initEventListeners(element) {
    element.wy$events = {};
}

/**
 * Set the listener for a given event on a DOM element such that it
 * can be subsequently cleared.  If a listener for that event already
 * exists, then it is removed.  Thus, at most one listener for any
 * event can exist.  
 */
function web$app$setEventListener(element,event,listener) {
    // Extract old listener
    var old = element.wy$events[event];
    // Remove old listener (if applicable)    
    if(old) {
	// Remove listener from DOM element
	element.removeEventListener(event,old);
    }
    // Record new listener for future reference
    element.wy$events[event] = listener;
    // Add new listener to DOM element
    element.addEventListener(event,listener);
}

/**
 * Clear the listener for a given event on a DOM element.  A listener
 * must have been previously added, otherwise this will be stuck.
 */
function web$app$clearEventListener(element,event) {
    // Extract old listener
    var old = element.wy$events[event];
    // Remove old listener (if applicable)
    if(old) {
	// Remove listener from DOM element
	element.removeEventListener(event,old);
	element.wy$events[event] = null;	
    }    
}
