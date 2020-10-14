'use strict';
function web$app$run(app, root, win) {
   let state = new Wy.Ref(new Wy.Record({app: Wy.copy(app), root: root, rendering: null, window: win}));
   web$app$refresh$qQ5State$V(state);
}
function web$app$refresh$qQ5State$V(st) {
   let current = st.$ref.rendering;
   let m = st.$ref.app.view(Wy.copy(st.$ref.app.model));
   let t;
   if(current === null)  {
      t = web$app$to_dom$Q4html4NodeqQ5State$Q3dom4Node(Wy.copy(m), st);
      st.$ref.root.appendChild(t);
   } else  {
      let update = web$diff$create$Q4html4NodeQ4html4Node$Q13NodeOperation(Wy.copy(current.model), Wy.copy(m));
      t = web$app$update_dom$Q3dom4NodeQ4diff13NodeOperationqQ5State$Q3dom4Node(current.view, Wy.copy(update), st);
      web$app$replace_child$Q3dom4NodeQ3dom4NodeQ3dom4Node$V(st.$ref.root, current.view, t);
   }
    {
      const $0 = new Wy.Record({model: Wy.copy(m), view: t});
      st.$ref.rendering = $0;
   }
}
function web$app$to_dom$Q4html4NodeqQ5State$Q3dom4Node(node, st) {
   if((typeof node) === "string")  {
      return st.$ref.window.document.createTextNode(Wy.copy(node));
   } else  {
      let element = st.$ref.window.document.createElement(Wy.copy(node.name));
      web$app$initEventListeners(element);
      for(let i = 0;i < node.children.length;i = i + 1) {
         let child = web$app$to_dom$Q4html4NodeqQ5State$Q3dom4Node(Wy.copy(node.children[i]), st);
         element.appendChild(child);
      }
      for(let j = 0;j < node.attributes.length;j = j + 1) {
         let attr = Wy.copy(node.attributes[j]);
         web$app$set_attribute$Q3dom7ElementQ4html9AttributeqQ5State$V(element, Wy.copy(attr), st);
      }
      return element;
   }
}
function web$app$update_dom$Q3dom4NodeQ4diff13NodeOperationqQ5State$Q3dom4Node(tree, op, st) {
   if(op === null)  {
      return tree;
   } else  {
      if(is$u2r2aQ18AttributeOperation10attributesaQ13NodeOperation8childrenr1Q4html4Node4noder1Q4html4Node4node(op))  {
         return web$app$to_dom$Q4html4NodeqQ5State$Q3dom4Node(Wy.copy(op.node), st);
      } else  {
         if(tree.hasChildNodes())  {
            web$app$update_children$Q3dom4NodeaQ4diff13NodeOperationqQ5State$V(tree, Wy.copy(op.children), st);
         }
      }
   }
   web$app$resize_children$Q3dom4NodeaQ4diff13NodeOperationqQ5State$V(tree, Wy.copy(op.children), st);
   web$app$update_attributes$Q3dom4NodeaQ4diff18AttributeOperationqQ5State$V(tree, Wy.copy(op.attributes), st);
   return tree;
}
function web$app$update_children$Q3dom4NodeaQ4diff13NodeOperationqQ5State$V(tree, operations, st) {
   let children = tree.childNodes;
   let size = std$math$min$II$I(children.length, operations.length);
   for(let i = 0;i < size;i = i + 1) {
      let ithChild = children[i];
      let ithOp = Wy.copy(operations[i]);
      if(ithOp !== null)  {
         let t = web$app$update_dom$Q3dom4NodeQ4diff13NodeOperationqQ5State$Q3dom4Node(ithChild, Wy.copy(ithOp), st);
         web$app$replace_child$Q3dom4NodeQ3dom4NodeQ3dom4Node$V(tree, ithChild, t);
      }
   }
}
function web$app$resize_children$Q3dom4NodeaQ4diff13NodeOperationqQ5State$V(tree, operations, st) {
   let size;
   if(tree.hasChildNodes())  {
      size = tree.childNodes.length;
   } else  {
      size = 0;
   }
   if(size <= operations.length)  {
      for(let i = size;i < operations.length;i = i + 1) {
         let ith = Wy.copy(operations[i]);
         if(is$Q4diff13NodeOperationr1Q4html4Node4node(ith))  {
            let t = web$app$to_dom$Q4html4NodeqQ5State$Q3dom4Node(Wy.copy(ith.node), st);
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
function web$app$update_attributes$Q3dom4NodeaQ4diff18AttributeOperationqQ5State$V(tree, operations, st) {
   if(tree.nodeType === w3c$dom$ELEMENT_NODE$static)  {
      Wy.assert(is$Q3dom4Nodeqr27m2Q6stringQ13EventListenerV16addEventListenerm2Q6stringQ13EventListenerV19removeEventListenerI8nodeTypeQ6string8nodeNameu2NQ7Element6parentaQ4Node10childNodesQ4Node10firstChildQ4Node9lastChildQ4Node11nextSiblingQ4Node15previousSiblingB11isConnectedfVB13hasChildNodesQ6string9nodeValueu2NQ6string11textContentmQ4NodeV11appendChildmQ4NodeV11removeChildm2Q4NodeQ4NodeV12replaceChildQ19CssStyleDeclaration5styleaQ7Element8childrenQ6string9classNameQ4List9classListQ6string2idQ6string9innerTextmVV6removem2Q6stringQ6stringV12setAttributemQ6stringV12getAttributemQ6stringV15removeAttribute(tree));
      for(let i = 0;i < operations.length;i = i + 1) {
         let ith = Wy.copy(operations[i]);
         if((ith === null) || (ith.before === null))  {
             {
            }
         } else  {
            web$app$clear_attribute$Q3dom7ElementQ4html9AttributeqQ5State$V(tree, Wy.copy(ith.before), st);
         }
      }
      for(let i = 0;i < operations.length;i = i + 1) {
         let ith = Wy.copy(operations[i]);
         if((ith === null) || (ith.after === null))  {
             {
            }
         } else  {
            web$app$set_attribute$Q3dom7ElementQ4html9AttributeqQ5State$V(tree, Wy.copy(ith.after), st);
         }
      }
   }
}
function web$app$set_attribute$Q3dom7ElementQ4html9AttributeqQ5State$V(element, attr, st) {
   if(is$Q4html9Attributer2Q6string3keyQ6string5value(attr))  {
      element.setAttribute(Wy.copy(attr.key), Wy.copy(attr.value));
   } else  {
      if(is$u3r2Q6string5eventQ7handler7handlerr2Q6string10mouseEventQ7handler7handlerr2Q6string8keyEventQ7handler7handlerr2Q6string10mouseEventQ7handler7handler(attr))  {
         let handler = attr.handler;
         let listener = function(handler, st) {
            return function(e) {
               return web$app$process_mouse_event$Q3dom10MouseEventQ4html7handlerqQ5State$V(e, handler, st);
            };
         }(handler, st);
         web$app$setEventListener(element, Wy.copy(attr.mouseEvent), listener);
      } else  {
         if(is$u2r2Q6string5eventQ7handler7handlerr2Q6string8keyEventQ7handler7handlerr2Q6string8keyEventQ7handler7handler(attr))  {
            let handler = attr.handler;
            let listener = function(st, handler) {
               return function(e) {
                  return web$app$process_keyboard_event$Q3dom13KeyboardEventQ4html7handlerqQ5State$V(e, handler, st);
               };
            }(st, handler);
            web$app$setEventListener(element, Wy.copy(attr.keyEvent), listener);
         } else  {
            let handler = attr.handler;
            let listener = function(st, handler) {
               return function(e) {
                  return web$app$process_other_event$Q3dom5EventQ4html7handlerqQ5State$V(e, handler, st);
               };
            }(st, handler);
            web$app$setEventListener(element, Wy.copy(attr.event), listener);
         }
      }
   }
}
function web$app$clear_attribute$Q3dom7ElementQ4html9AttributeqQ5State$V(element, attr, st) {
   if(is$Q4html9Attributer2Q6string3keyQ6string5value(attr))  {
      element.removeAttribute(Wy.copy(attr.key));
   } else  {
      if(is$u3r2Q6string5eventQ7handler7handlerr2Q6string10mouseEventQ7handler7handlerr2Q6string8keyEventQ7handler7handlerr2Q6string10mouseEventQ7handler7handler(attr))  {
         web$app$clearEventListener(element, Wy.copy(attr.mouseEvent));
      } else  {
         if(is$u2r2Q6string5eventQ7handler7handlerr2Q6string8keyEventQ7handler7handlerr2Q6string8keyEventQ7handler7handler(attr))  {
            web$app$clearEventListener(element, Wy.copy(attr.keyEvent));
         } else  {
            web$app$clearEventListener(element, Wy.copy(attr.event));
         }
      }
   }
}
function web$app$process_mouse_event$Q3dom10MouseEventQ4html7handlerqQ5State$V(e, h, st) {
   web$app$process_event$v1EQ4html7handlerqQ5State$V(web$html$to_mouse_event$Q3dom10MouseEvent$Q10MouseEvent(e), h, st);
}
function web$app$process_keyboard_event$Q3dom13KeyboardEventQ4html7handlerqQ5State$V(e, h, st) {
   web$app$process_event$v1EQ4html7handlerqQ5State$V(web$html$to_key_event$Q3dom13KeyboardEvent$Q13KeyboardEvent(e), h, st);
}
function web$app$process_other_event$Q3dom5EventQ4html7handlerqQ5State$V(e, h, st) {
   web$app$process_event$v1EQ4html7handlerqQ5State$V(web$html$to_event$Q3dom5Event$Q4html5Event(e), h, st);
}
function web$app$process_event$v1EQ4html7handlerqQ5State$V(e, h, st) {
   let [model, actions] = h(Wy.copy(e), Wy.copy(st.$ref.app.model));
    {
      const $2 = Wy.copy(model);
      st.$ref.app.model = $2;
   }
   for(let i = 0;i < actions.length;i = i + 1) {
      web$io$processor$qQ5StateQ6Action$V(st, Wy.copy(actions[i]));
   }
   web$app$refresh$qQ5State$V(st);
}
function web$diff$create$Q4html4NodeQ4html4Node$Q13NodeOperation(before, after) {
   if(Wy.equals(before, after))  {
      return null;
   } else  {
      if(((typeof before) === "string") || (((typeof after) === "string") || (!Wy.equals(before.name, after.name))))  {
         return new Wy.Record({node: Wy.copy(after)});
      } else  {
         let childOps = web$diff$diff_children$aQ4html4NodeaQ4html4Node$aQ13NodeOperation(Wy.copy(before.children), Wy.copy(after.children));
         let attrOps = web$diff$diff_attributes$aQ4html9AttributeaQ4html9Attribute$aQ18AttributeOperation(Wy.copy(before.attributes), Wy.copy(after.attributes));
         return new Wy.Record({attributes: Wy.copy(attrOps), children: Wy.copy(childOps)});
      }
   }
}
function web$diff$diff_children$aQ4html4NodeaQ4html4Node$aQ13NodeOperation(bChildren, aChildren) {
   let rs;
   let operations = Wy.array(null, aChildren.length);
   if(bChildren.length < aChildren.length)  {
      for(let i = 0;i < bChildren.length;i = i + 1) {
         operations[i] = web$diff$create$Q4html4NodeQ4html4Node$Q13NodeOperation(Wy.copy(bChildren[i]), Wy.copy(aChildren[i]));
      }
      for(let i = bChildren.length;i < aChildren.length;i = i + 1) {
         operations[i] = new Wy.Record({node: Wy.copy(aChildren[i])});
      }
   } else  {
      for(let i = 0;i < aChildren.length;i = i + 1) {
         operations[i] = web$diff$create$Q4html4NodeQ4html4Node$Q13NodeOperation(Wy.copy(bChildren[i]), Wy.copy(aChildren[i]));
      }
   }
   return Wy.copy(operations);
}
function web$diff$diff_attributes$aQ4html9AttributeaQ4html9Attribute$aQ18AttributeOperation(bAttributes, aAttributes) {
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
function web$html$class$Q6string$Q9Attribute(text) {
   return new Wy.Record({key: "class", value: Wy.copy(text)});
}
function web$html$disabled$V$Q9Attribute() {
   return new Wy.Record({key: "disabled", value: ""});
}
function web$html$sfor$Q6string$Q9Attribute(text) {
   return new Wy.Record({key: "for", value: Wy.copy(text)});
}
function web$html$id$Q6string$Q9Attribute(text) {
   return new Wy.Record({key: "id", value: Wy.copy(text)});
}
function web$html$name$Q6string$Q9Attribute(text) {
   return new Wy.Record({key: "name", value: Wy.copy(text)});
}
function web$html$style$Q6string$Q9Attribute(text) {
   return new Wy.Record({key: "style", value: Wy.copy(text)});
}
function web$html$tYpe$Q6string$Q9Attribute(text) {
   return new Wy.Record({key: "type", value: Wy.copy(text)});
}
function web$html$tabindex$I$Q9Attribute(index) {
   return new Wy.Record({key: "tabindex", value: Wy.fromString(std$ascii$to_string$I$Q6string(index))});
}
function web$html$change$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({mouseEvent: "change", handler: handler});
}
function web$html$click$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({mouseEvent: "click", handler: handler});
}
function web$html$dblclick$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({mouseEvent: "dblclick", handler: handler});
}
function web$html$focus$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({event: "focus", handler: handler});
}
function web$html$keydown$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({keyEvent: "keydown", handler: handler});
}
function web$html$keypress$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({keyEvent: "keypress", handler: handler});
}
function web$html$keyup$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({keyEvent: "keyup", handler: handler});
}
function web$html$mousedown$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({mouseEvent: "mousedown", handler: handler});
}
function web$html$mousemove$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({mouseEvent: "mousemove", handler: handler});
}
function web$html$mouseover$Q7handler$Q9Attribute(handler) {
   return new Wy.Record({mouseEvent: "mouseover", handler: handler});
}
function web$html$element$Q6stringQ4Node$Q4Node(tag, child) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node(Wy.copy(tag), Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$element$Q6stringaQ4Node$Q4Node(tag, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node(Wy.copy(tag), Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$element$Q6stringaQ9AttributeQ4Node$Q4Node(tag, attributes, child) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node(Wy.copy(tag), Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node(tag, attributes, children) {
   return new Wy.Record({name: Wy.copy(tag), attributes: Wy.copy(attributes), children: Wy.copy(children)});
}
function web$html$h1$Q4Node$Q4Node(child) {
   return web$html$h1$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$h1$aQ4Node$Q4Node(children) {
   return web$html$h1$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$h1$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$h1$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h1$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("h1", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h2$Q4Node$Q4Node(child) {
   return web$html$h2$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$h2$aQ4Node$Q4Node(children) {
   return web$html$h2$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$h2$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$h2$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h2$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("h2", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h3$Q4Node$Q4Node(child) {
   return web$html$h3$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$h3$aQ4Node$Q4Node(children) {
   return web$html$h3$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$h3$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$h3$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h3$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("h3", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h4$Q4Node$Q4Node(child) {
   return web$html$h4$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$h4$aQ4Node$Q4Node(children) {
   return web$html$h4$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$h4$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$h4$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h4$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("h4", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h5$Q4Node$Q4Node(child) {
   return web$html$h5$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$h5$aQ4Node$Q4Node(children) {
   return web$html$h5$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$h5$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$h5$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h5$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("h5", Wy.copy(attributes), Wy.copy(children));
}
function web$html$h6$Q4Node$Q4Node(child) {
   return web$html$h6$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$h6$aQ4Node$Q4Node(children) {
   return web$html$h6$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$h6$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$h6$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$h6$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("h6", Wy.copy(attributes), Wy.copy(children));
}
function web$html$p$Q4Node$Q4Node(child) {
   return web$html$p$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$p$aQ4Node$Q4Node(children) {
   return web$html$p$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$p$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$p$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$p$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("p", Wy.copy(attributes), Wy.copy(children));
}
function web$html$br$V$Q4Node() {
   return web$html$br$aQ9Attribute$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0));
}
function web$html$br$aQ9Attribute$Q4Node(attributes) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("br", Wy.copy(attributes), Wy.array("", 0));
}
function web$html$hr$V$Q4Node() {
   return web$html$hr$aQ9Attribute$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0));
}
function web$html$hr$aQ9Attribute$Q4Node(attributes) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("hr", Wy.copy(attributes), Wy.array("", 0));
}
function web$html$abbr$Q4Node$Q4Node(child) {
   return web$html$abbr$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$abbr$aQ4Node$Q4Node(children) {
   return web$html$abbr$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$abbr$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$abbr$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$abbr$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("abbr", Wy.copy(attributes), Wy.copy(children));
}
function web$html$address$Q4Node$Q4Node(child) {
   return web$html$address$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$address$aQ4Node$Q4Node(children) {
   return web$html$address$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$address$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$address$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$address$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("address", Wy.copy(attributes), Wy.copy(children));
}
function web$html$b$Q4Node$Q4Node(child) {
   return web$html$b$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$b$aQ4Node$Q4Node(children) {
   return web$html$b$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$b$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$b$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$b$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("b", Wy.copy(attributes), Wy.copy(children));
}
function web$html$blockquote$Q4Node$Q4Node(child) {
   return web$html$blockquote$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$blockquote$aQ4Node$Q4Node(children) {
   return web$html$blockquote$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$blockquote$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$blockquote$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$blockquote$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("blockquote", Wy.copy(attributes), Wy.copy(children));
}
function web$html$center$Q4Node$Q4Node(child) {
   return web$html$center$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$center$aQ4Node$Q4Node(children) {
   return web$html$center$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$center$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$center$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$center$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("center", Wy.copy(attributes), Wy.copy(children));
}
function web$html$cite$Q4Node$Q4Node(child) {
   return web$html$cite$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$cite$aQ4Node$Q4Node(children) {
   return web$html$cite$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$cite$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$cite$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$cite$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("cite", Wy.copy(attributes), Wy.copy(children));
}
function web$html$code$Q4Node$Q4Node(child) {
   return web$html$code$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$code$aQ4Node$Q4Node(children) {
   return web$html$code$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$code$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$code$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$code$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("code", Wy.copy(attributes), Wy.copy(children));
}
function web$html$em$Q4Node$Q4Node(child) {
   return web$html$em$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$em$aQ4Node$Q4Node(children) {
   return web$html$em$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$em$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$em$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$em$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("em", Wy.copy(attributes), Wy.copy(children));
}
function web$html$font$Q4Node$Q4Node(child) {
   return web$html$font$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$font$aQ4Node$Q4Node(children) {
   return web$html$font$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$font$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$font$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$font$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("font", Wy.copy(attributes), Wy.copy(children));
}
function web$html$i$Q4Node$Q4Node(child) {
   return web$html$i$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$i$aQ4Node$Q4Node(children) {
   return web$html$i$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$i$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$i$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$i$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("i", Wy.copy(attributes), Wy.copy(children));
}
function web$html$pre$Q4Node$Q4Node(child) {
   return web$html$pre$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$pre$aQ4Node$Q4Node(children) {
   return web$html$pre$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$pre$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$pre$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$pre$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("pre", Wy.copy(attributes), Wy.copy(children));
}
function web$html$q$Q4Node$Q4Node(child) {
   return web$html$q$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$q$aQ4Node$Q4Node(children) {
   return web$html$q$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$q$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$q$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$q$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("q", Wy.copy(attributes), Wy.copy(children));
}
function web$html$s$Q4Node$Q4Node(child) {
   return web$html$s$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$s$aQ4Node$Q4Node(children) {
   return web$html$s$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$s$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$s$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$s$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("s", Wy.copy(attributes), Wy.copy(children));
}
function web$html$small$Q4Node$Q4Node(child) {
   return web$html$small$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$small$aQ4Node$Q4Node(children) {
   return web$html$small$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$small$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$small$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$small$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("small", Wy.copy(attributes), Wy.copy(children));
}
function web$html$strike$Q4Node$Q4Node(child) {
   return web$html$strike$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$strike$aQ4Node$Q4Node(children) {
   return web$html$strike$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$strike$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$strike$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$strike$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("strike", Wy.copy(attributes), Wy.copy(children));
}
function web$html$strong$Q4Node$Q4Node(child) {
   return web$html$strong$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$strong$aQ4Node$Q4Node(children) {
   return web$html$strong$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$strong$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$strong$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$strong$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("strong", Wy.copy(attributes), Wy.copy(children));
}
function web$html$sub$Q4Node$Q4Node(child) {
   return web$html$sub$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$sub$aQ4Node$Q4Node(children) {
   return web$html$sub$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$sub$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$sub$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$sub$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("sub", Wy.copy(attributes), Wy.copy(children));
}
function web$html$sup$Q4Node$Q4Node(child) {
   return web$html$sup$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$sup$aQ4Node$Q4Node(children) {
   return web$html$sup$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$sup$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$sup$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$sup$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("sup", Wy.copy(attributes), Wy.copy(children));
}
function web$html$u$Q4Node$Q4Node(child) {
   return web$html$u$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$u$aQ4Node$Q4Node(children) {
   return web$html$u$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$u$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$u$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$u$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("u", Wy.copy(attributes), Wy.copy(children));
}
function web$html$form$Q4Node$Q4Node(child) {
   return web$html$form$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$form$aQ4Node$Q4Node(children) {
   return web$html$form$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$form$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$form$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$form$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("form", Wy.copy(attributes), Wy.copy(children));
}
function web$html$input$Q4Node$Q4Node(child) {
   return web$html$input$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$input$aQ4Node$Q4Node(children) {
   return web$html$input$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$input$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$input$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$input$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("input", Wy.copy(attributes), Wy.copy(children));
}
function web$html$textarea$Q4Node$Q4Node(child) {
   return web$html$textarea$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$textarea$aQ4Node$Q4Node(children) {
   return web$html$textarea$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$textarea$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$textarea$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$textarea$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("textarea", Wy.copy(attributes), Wy.copy(children));
}
function web$html$button$Q4Node$Q4Node(child) {
   return web$html$button$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$button$aQ4Node$Q4Node(children) {
   return web$html$button$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$button$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$button$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$button$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("button", Wy.copy(attributes), Wy.copy(children));
}
function web$html$select$Q4Node$Q4Node(child) {
   return web$html$select$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$select$aQ4Node$Q4Node(children) {
   return web$html$select$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$select$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$select$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$select$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("select", Wy.copy(attributes), Wy.copy(children));
}
function web$html$optgroup$Q4Node$Q4Node(child) {
   return web$html$optgroup$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$optgroup$aQ4Node$Q4Node(children) {
   return web$html$optgroup$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$optgroup$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$optgroup$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$optgroup$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("optgroup", Wy.copy(attributes), Wy.copy(children));
}
function web$html$option$Q4Node$Q4Node(child) {
   return web$html$option$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$option$aQ4Node$Q4Node(children) {
   return web$html$option$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$option$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$option$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$option$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("option", Wy.copy(attributes), Wy.copy(children));
}
function web$html$label$Q4Node$Q4Node(child) {
   return web$html$label$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$label$aQ4Node$Q4Node(children) {
   return web$html$label$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$label$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$label$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$label$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("label", Wy.copy(attributes), Wy.copy(children));
}
function web$html$fieldset$Q4Node$Q4Node(child) {
   return web$html$fieldset$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$fieldset$aQ4Node$Q4Node(children) {
   return web$html$fieldset$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$fieldset$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$fieldset$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$fieldset$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("fieldset", Wy.copy(attributes), Wy.copy(children));
}
function web$html$legend$Q4Node$Q4Node(child) {
   return web$html$legend$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$legend$aQ4Node$Q4Node(children) {
   return web$html$legend$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$legend$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$legend$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$legend$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("legend", Wy.copy(attributes), Wy.copy(children));
}
function web$html$datalist$Q4Node$Q4Node(child) {
   return web$html$datalist$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$datalist$aQ4Node$Q4Node(children) {
   return web$html$datalist$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$datalist$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$datalist$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$datalist$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("datalist", Wy.copy(attributes), Wy.copy(children));
}
function web$html$output$Q4Node$Q4Node(child) {
   return web$html$output$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$output$aQ4Node$Q4Node(children) {
   return web$html$output$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$output$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$output$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$output$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("output", Wy.copy(attributes), Wy.copy(children));
}
function web$html$iframe$Q4Node$Q4Node(child) {
   return web$html$iframe$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$iframe$aQ4Node$Q4Node(children) {
   return web$html$iframe$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$iframe$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$iframe$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$iframe$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("iframe", Wy.copy(attributes), Wy.copy(children));
}
function web$html$img$Q4Node$Q4Node(child) {
   return web$html$img$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$img$aQ4Node$Q4Node(children) {
   return web$html$img$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$img$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$img$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$img$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("img", Wy.copy(attributes), Wy.copy(children));
}
function web$html$map$Q4Node$Q4Node(child) {
   return web$html$map$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$map$aQ4Node$Q4Node(children) {
   return web$html$map$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$map$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$map$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$map$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("map", Wy.copy(attributes), Wy.copy(children));
}
function web$html$area$Q4Node$Q4Node(child) {
   return web$html$area$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$area$aQ4Node$Q4Node(children) {
   return web$html$area$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$area$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$area$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$area$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("area", Wy.copy(attributes), Wy.copy(children));
}
function web$html$canvas$Q4Node$Q4Node(child) {
   return web$html$canvas$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$canvas$aQ4Node$Q4Node(children) {
   return web$html$canvas$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$canvas$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$canvas$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$canvas$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("canvas", Wy.copy(attributes), Wy.copy(children));
}
function web$html$figcaption$Q4Node$Q4Node(child) {
   return web$html$figcaption$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$figcaption$aQ4Node$Q4Node(children) {
   return web$html$figcaption$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$figcaption$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$figcaption$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$figcaption$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("figcaption", Wy.copy(attributes), Wy.copy(children));
}
function web$html$figure$Q4Node$Q4Node(child) {
   return web$html$figure$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$figure$aQ4Node$Q4Node(children) {
   return web$html$figure$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$figure$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$figure$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$figure$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("figure", Wy.copy(attributes), Wy.copy(children));
}
function web$html$picture$Q4Node$Q4Node(child) {
   return web$html$picture$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$picture$aQ4Node$Q4Node(children) {
   return web$html$picture$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$picture$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$picture$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$picture$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("picture", Wy.copy(attributes), Wy.copy(children));
}
function web$html$svg$Q4Node$Q4Node(child) {
   return web$html$svg$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$svg$aQ4Node$Q4Node(children) {
   return web$html$svg$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$svg$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$svg$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$svg$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("svg", Wy.copy(attributes), Wy.copy(children));
}
function web$html$a$Q4Node$Q4Node(child) {
   return web$html$a$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$a$aQ4Node$Q4Node(children) {
   return web$html$a$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$a$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$a$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$a$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("a", Wy.copy(attributes), Wy.copy(children));
}
function web$html$link$Q4Node$Q4Node(child) {
   return web$html$link$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$link$aQ4Node$Q4Node(children) {
   return web$html$link$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$link$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$link$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$link$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("link", Wy.copy(attributes), Wy.copy(children));
}
function web$html$nav$Q4Node$Q4Node(child) {
   return web$html$nav$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$nav$aQ4Node$Q4Node(children) {
   return web$html$nav$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$nav$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$nav$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$nav$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("nav", Wy.copy(attributes), Wy.copy(children));
}
function web$html$ul$Q4Node$Q4Node(child) {
   return web$html$ul$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$ul$aQ4Node$Q4Node(children) {
   return web$html$ul$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$ul$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$ul$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$ul$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("ul", Wy.copy(attributes), Wy.copy(children));
}
function web$html$ol$Q4Node$Q4Node(child) {
   return web$html$ol$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$ol$aQ4Node$Q4Node(children) {
   return web$html$ol$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$ol$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$ol$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$ol$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("ol", Wy.copy(attributes), Wy.copy(children));
}
function web$html$li$Q4Node$Q4Node(child) {
   return web$html$li$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$li$aQ4Node$Q4Node(children) {
   return web$html$li$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$li$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$li$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$li$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("li", Wy.copy(attributes), Wy.copy(children));
}
function web$html$dl$Q4Node$Q4Node(child) {
   return web$html$dl$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$dl$aQ4Node$Q4Node(children) {
   return web$html$dl$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$dl$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$dl$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$dl$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("dl", Wy.copy(attributes), Wy.copy(children));
}
function web$html$dtr$Q4Node$Q4Node(child) {
   return web$html$dtr$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$dtr$aQ4Node$Q4Node(children) {
   return web$html$dtr$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$dtr$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$dtr$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$dtr$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("dtr", Wy.copy(attributes), Wy.copy(children));
}
function web$html$dd$Q4Node$Q4Node(child) {
   return web$html$dd$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$dd$aQ4Node$Q4Node(children) {
   return web$html$dd$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$dd$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$dd$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$dd$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("dd", Wy.copy(attributes), Wy.copy(children));
}
function web$html$table$Q4Node$Q4Node(child) {
   return web$html$table$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$table$aQ4Node$Q4Node(children) {
   return web$html$table$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$table$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$table$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$table$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("table", Wy.copy(attributes), Wy.copy(children));
}
function web$html$caption$Q4Node$Q4Node(child) {
   return web$html$caption$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$caption$aQ4Node$Q4Node(children) {
   return web$html$caption$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$caption$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$caption$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$caption$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("caption", Wy.copy(attributes), Wy.copy(children));
}
function web$html$th$Q4Node$Q4Node(child) {
   return web$html$th$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$th$aQ4Node$Q4Node(children) {
   return web$html$th$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$th$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$th$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$th$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("th", Wy.copy(attributes), Wy.copy(children));
}
function web$html$tr$Q4Node$Q4Node(child) {
   return web$html$tr$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$tr$aQ4Node$Q4Node(children) {
   return web$html$tr$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$tr$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$tr$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$tr$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("tr", Wy.copy(attributes), Wy.copy(children));
}
function web$html$td$Q4Node$Q4Node(child) {
   return web$html$td$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$td$aQ4Node$Q4Node(children) {
   return web$html$td$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$td$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$td$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$td$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("td", Wy.copy(attributes), Wy.copy(children));
}
function web$html$thead$Q4Node$Q4Node(child) {
   return web$html$thead$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$thead$aQ4Node$Q4Node(children) {
   return web$html$thead$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$thead$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$thead$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$thead$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("thead", Wy.copy(attributes), Wy.copy(children));
}
function web$html$tbody$Q4Node$Q4Node(child) {
   return web$html$tbody$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$tbody$aQ4Node$Q4Node(children) {
   return web$html$tbody$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$tbody$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$tbody$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$tbody$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("tbody", Wy.copy(attributes), Wy.copy(children));
}
function web$html$tfoot$Q4Node$Q4Node(child) {
   return web$html$tfoot$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$tfoot$aQ4Node$Q4Node(children) {
   return web$html$tfoot$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$tfoot$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$tfoot$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$tfoot$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("tfoot", Wy.copy(attributes), Wy.copy(children));
}
function web$html$col$Q4Node$Q4Node(child) {
   return web$html$col$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$col$aQ4Node$Q4Node(children) {
   return web$html$col$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$col$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$col$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$col$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("col", Wy.copy(attributes), Wy.copy(children));
}
function web$html$colgroup$Q4Node$Q4Node(child) {
   return web$html$colgroup$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$colgroup$aQ4Node$Q4Node(children) {
   return web$html$colgroup$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$colgroup$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$colgroup$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$colgroup$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("colgroup", Wy.copy(attributes), Wy.copy(children));
}
function web$html$div$Q4Node$Q4Node(child) {
   return web$html$div$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$div$aQ4Node$Q4Node(children) {
   return web$html$div$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$div$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$div$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$div$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("div", Wy.copy(attributes), Wy.copy(children));
}
function web$html$span$Q4Node$Q4Node(child) {
   return web$html$span$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$span$aQ4Node$Q4Node(children) {
   return web$html$span$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$span$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$span$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$span$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("span", Wy.copy(attributes), Wy.copy(children));
}
function web$html$header$Q4Node$Q4Node(child) {
   return web$html$header$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$header$aQ4Node$Q4Node(children) {
   return web$html$header$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$header$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$header$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$header$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("header", Wy.copy(attributes), Wy.copy(children));
}
function web$html$footer$Q4Node$Q4Node(child) {
   return web$html$footer$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$footer$aQ4Node$Q4Node(children) {
   return web$html$footer$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$footer$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$footer$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$footer$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("footer", Wy.copy(attributes), Wy.copy(children));
}
function web$html$main$Q4Node$Q4Node(child) {
   return web$html$main$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$main$aQ4Node$Q4Node(children) {
   return web$html$main$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$main$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$main$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$main$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("main", Wy.copy(attributes), Wy.copy(children));
}
function web$html$section$Q4Node$Q4Node(child) {
   return web$html$section$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$section$aQ4Node$Q4Node(children) {
   return web$html$section$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$section$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$section$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$section$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("section", Wy.copy(attributes), Wy.copy(children));
}
function web$html$article$Q4Node$Q4Node(child) {
   return web$html$article$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$article$aQ4Node$Q4Node(children) {
   return web$html$article$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$article$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$article$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$article$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("article", Wy.copy(attributes), Wy.copy(children));
}
function web$html$aside$Q4Node$Q4Node(child) {
   return web$html$aside$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$aside$aQ4Node$Q4Node(children) {
   return web$html$aside$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$aside$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$aside$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$aside$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("aside", Wy.copy(attributes), Wy.copy(children));
}
function web$html$details$Q4Node$Q4Node(child) {
   return web$html$details$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$details$aQ4Node$Q4Node(children) {
   return web$html$details$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$details$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$details$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$details$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("details", Wy.copy(attributes), Wy.copy(children));
}
function web$html$dialog$Q4Node$Q4Node(child) {
   return web$html$dialog$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$dialog$aQ4Node$Q4Node(children) {
   return web$html$dialog$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$dialog$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$dialog$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$dialog$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("dialog", Wy.copy(attributes), Wy.copy(children));
}
function web$html$summary$Q4Node$Q4Node(child) {
   return web$html$summary$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), [Wy.copy(child)]);
}
function web$html$summary$aQ4Node$Q4Node(children) {
   return web$html$summary$aQ9AttributeaQ4Node$Q4Node(Wy.array(web$html$id$Q6string$Q9Attribute(""), 0), Wy.copy(children));
}
function web$html$summary$aQ9AttributeQ4Node$Q4Node(attributes, child) {
   return web$html$summary$aQ9AttributeaQ4Node$Q4Node(Wy.copy(attributes), [Wy.copy(child)]);
}
function web$html$summary$aQ9AttributeaQ4Node$Q4Node(attributes, children) {
   return web$html$element$Q6stringaQ9AttributeaQ4Node$Q4Node("summary", Wy.copy(attributes), Wy.copy(children));
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
function web$io$processor$qQ5StateQ6Action$V(st, action) {
   let actions = action.apply(st);
   for(let i = 0;i < actions.length;i = i + 1) {
      web$io$processor$qQ5StateQ6Action$V(st, Wy.copy(actions[i]));
   }
}
function web$io$alert$Q6string$Q6Action(message) {
   return new Wy.Record({apply: function(message) {
      return function(st) {
         return web$io$apply_alert$Q3dom6WindowQ6string$aQ6Action(st.$ref.window, Wy.copy(message));
      };
   }(message)});
}
function web$io$call$mQ3dom6WindowV$Q6Action(call) {
   return new Wy.Record({apply: function(call) {
      return function(st) {
         return web$io$apply_call$qQ5StatemQ3dom6WindowV$aQ6Action(st, call);
      };
   }(call)});
}
function web$io$get$Q6stringQ8consumerQ7handler$Q6Action(url, ok, error) {
   return new Wy.Record({apply: function(ok, url, error) {
      return function(st) {
         return web$io$apply_get$qQ5StateQ6stringQ8consumerQ7handler$aQ6Action(st, Wy.copy(url), ok, error);
      };
   }(ok, url, error)});
}
function web$io$interval$Q4uintQ7handler$Q6Action(timeout, handler) {
   return new Wy.Record({apply: function(timeout, handler) {
      return function(st) {
         return web$io$apply_interval$qQ5StateQ4uintQ7handler$aQ6Action(st, timeout, handler);
      };
   }(timeout, handler)});
}
function web$io$post$Q6stringQ6stringQ8consumerQ7handler$Q6Action(url, payload, ok, error) {
   return new Wy.Record({apply: function(ok, url, error, payload) {
      return function(st) {
         return web$io$apply_post$qQ5StateQ6stringQ6stringQ8consumerQ7handler$aQ6Action(st, Wy.copy(url), Wy.copy(payload), ok, error);
      };
   }(ok, url, error, payload)});
}
function web$io$timeout$Q4uintQ7handler$Q6Action(timeout, handler) {
   return new Wy.Record({apply: function(timeout, handler) {
      return function(st) {
         return web$io$apply_timeout$qQ5StateQ4uintQ7handler$aQ6Action(st, timeout, handler);
      };
   }(timeout, handler)});
}
function web$io$query$Q6stringQ5queryQ8consumer$Q6Action(id, query, consumer) {
   return new Wy.Record({apply: function(id, query, consumer) {
      return function(st) {
         return web$io$apply_query$qQ5StateQ6stringQ5queryQ8consumer$aQ6Action(st, Wy.copy(id), query, consumer);
      };
   }(id, query, consumer)});
}
function web$io$query$Q5queryQ8consumer$Q6Action(query, consumer) {
   return new Wy.Record({apply: function(query, consumer) {
      return function(st) {
         return web$io$apply_query$qQ5StateQ5queryQ8consumer$aQ6Action(st, query, consumer);
      };
   }(query, consumer)});
}
function web$io$apply_alert$Q3dom6WindowQ6string$aQ6Action(window, message) {
   window.alert(Wy.copy(message));
   return [];
}
function web$io$apply_call$qQ5StatemQ3dom6WindowV$aQ6Action(st, call) {
   call(st.$ref.window);
   return [];
}
function web$io$apply_get$qQ5StateQ6stringQ8consumerQ7handler$aQ6Action(st, url, ok, error) {
   let mok = function(st, ok) {
      return function(s) {
         return web$io$consume_event$v1TqQ5StateQ8consumer$V(Wy.copy(s), st, ok);
      };
   }(st, ok);
   let merr = function(st, error) {
      return function(i) {
         return web$io$process_event$qQ5StateQ7handler$V(st, error);
      };
   }(st, error);
   web$io$begin_get$Q6stringmQ6stringVmIV$V(Wy.copy(url), mok, merr);
   return [];
}
function web$io$apply_interval$qQ5StateQ4uintQ7handler$aQ6Action(st, interval, handler) {
   let m = function(st, handler) {
      return function() {
         return web$io$process_event$qQ5StateQ7handler$V(st, handler);
      };
   }(st, handler);
   st.$ref.window.setInterval(m, interval);
   return [];
}
function web$io$apply_post$qQ5StateQ6stringQ6stringQ8consumerQ7handler$aQ6Action(st, url, payload, ok, error) {
   let mok = function(st, ok) {
      return function(s) {
         return web$io$consume_event$v1TqQ5StateQ8consumer$V(Wy.copy(s), st, ok);
      };
   }(st, ok);
   let merr = function(st, error) {
      return function(i) {
         return web$io$process_event$qQ5StateQ7handler$V(st, error);
      };
   }(st, error);
   web$io$begin_post$Q6stringQ6stringmQ6stringVmIV$V(Wy.copy(url), Wy.copy(payload), mok, merr);
   return [];
}
function web$io$apply_timeout$qQ5StateQ4uintQ7handler$aQ6Action(st, timeout, handler) {
   let m = function(st, handler) {
      return function() {
         return web$io$process_event$qQ5StateQ7handler$V(st, handler);
      };
   }(st, handler);
   st.$ref.window.setTimeout(m, timeout);
   return [];
}
function web$io$apply_query$qQ5StateQ6stringQ5queryQ8consumer$aQ6Action(st, id, query, consumer) {
   let e = st.$ref.window.document.getElementById(Wy.copy(id));
   let response = query(e);
   let [m, as] = consumer(Wy.copy(st.$ref.app.model), Wy.copy(response));
    {
      const $4 = Wy.copy(m);
      st.$ref.app.model = $4;
   }
   return Wy.copy(as);
}
function web$io$apply_query$qQ5StateQ5queryQ8consumer$aQ6Action(st, query, consumer) {
   let response = query(st.$ref.window);
   let [m, as] = consumer(Wy.copy(st.$ref.app.model), Wy.copy(response));
    {
      const $5 = Wy.copy(m);
      st.$ref.app.model = $5;
   }
   return Wy.copy(as);
}
function web$io$process_event$qQ5StateQ7handler$V(st, fn) {
   let [m, as] = fn(Wy.copy(st.$ref.app.model));
    {
      const $6 = Wy.copy(m);
      st.$ref.app.model = $6;
   }
   for(let i = 0;i < as.length;i = i + 1) {
      web$io$processor$qQ5StateQ6Action$V(st, Wy.copy(as[i]));
   }
   web$app$refresh$qQ5State$V(st);
}
function web$io$consume_event$v1TqQ5StateQ8consumer$V(response, st, fn) {
   let [m, as] = fn(Wy.copy(st.$ref.app.model), Wy.copy(response));
    {
      const $7 = Wy.copy(m);
      st.$ref.app.model = $7;
   }
   for(let i = 0;i < as.length;i = i + 1) {
      web$io$processor$qQ5StateQ6Action$V(st, Wy.copy(as[i]));
   }
   web$app$refresh$qQ5State$V(st);
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
function is$u2r2aQ18AttributeOperation10attributesaQ13NodeOperation8childrenr1Q4html4Node4noder1Q4html4Node4node(v) {
   return Object.keys(v).length === 1;
}
function is$u3r2Q6string5eventQ7handler7handlerr2Q6string10mouseEventQ7handler7handlerr2Q6string8keyEventQ7handler7handlerr2Q6string10mouseEventQ7handler7handler(v) {
   if(((typeof v.mouseEvent) === "undefined") || ((typeof v.mouseEvent) !== "string"))  {
      return false;
   } else if(((typeof v.handler) === "undefined") || (!is$u3Q7handlerQ7handlerQ7handlerf2Q10MouseEventv1S2v1SaQ6Action(v.handler)))  {
      return false;
   }
   return true;
}
function is$Q4diff13NodeOperationr1Q4html4Node4node(v) {
   return (v !== null) && (Object.keys(v).length === 1);
}
function is$Q4html9Attributer2Q6string3keyQ6string5value(v) {
   if(((typeof v.key) === "undefined") || ((typeof v.key) !== "string"))  {
      return false;
   } else if(((typeof v.value) === "undefined") || ((typeof v.value) !== "string"))  {
      return false;
   }
   return true;
}
function is$u2r2Q6string5eventQ7handler7handlerr2Q6string8keyEventQ7handler7handlerr2Q6string8keyEventQ7handler7handler(v) {
   if(((typeof v.keyEvent) === "undefined") || ((typeof v.keyEvent) !== "string"))  {
      return false;
   } else if(((typeof v.handler) === "undefined") || (!is$u2Q7handlerQ7handlerf2Q13KeyboardEventv1S2v1SaQ6Action(v.handler)))  {
      return false;
   }
   return true;
}
function is$Q3dom4Nodeqr27m2Q6stringQ13EventListenerV16addEventListenerm2Q6stringQ13EventListenerV19removeEventListenerI8nodeTypeQ6string8nodeNameu2NQ7Element6parentaQ4Node10childNodesQ4Node10firstChildQ4Node9lastChildQ4Node11nextSiblingQ4Node15previousSiblingB11isConnectedfVB13hasChildNodesQ6string9nodeValueu2NQ6string11textContentmQ4NodeV11appendChildmQ4NodeV11removeChildm2Q4NodeQ4NodeV12replaceChildQ19CssStyleDeclaration5styleaQ7Element8childrenQ6string9classNameQ4List9classListQ6string2idQ6string9innerTextmVV6removem2Q6stringQ6stringV12setAttributemQ6stringV12getAttributemQ6stringV15removeAttribute(v) {
   return true;
}
function is$u2Q7handlerQ7handlerf2Q13KeyboardEventv1S2v1SaQ6Action(v) {
   return true;
}
function is$u3Q7handlerQ7handlerQ7handlerf2Q10MouseEventv1S2v1SaQ6Action(v) {
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
