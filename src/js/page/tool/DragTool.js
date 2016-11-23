/**
 * Created by chenjianhui on 16/11/22.
 */

let DragTool = {
    dragTarget: null,
    drag: function (event) {
        DragTool.dragTarget = event.currentTarget;
        console.log(DragTool.dragTarget);
    },
    drop: function (event) {
        event.preventDefault();
        event.target.appendChild(DragTool.dragTarget);
    },
    allowDrop: function (event) {
        event.preventDefault();
    }
}

class DragTool_new {
    constructor(options) {
        let {copy} = options;
        this.copy = copy;
        this.dragTarget = null;
        this.drag.bind(this);
        this.drop.bind(this);
        this.allowDrop.bind(this);
    }
    drag(event) {
        this.dragTarget = event.currentTarget;
    }
    drop(event,cb) {
        event.preventDefault();
        if(cb && (typeof cb == "function") && !cb(this.dragTarget)){
            return false;
        }
        let children = event.target.children,isNewTo = true,theNode = null;

        for(let i = 0;i < children.length;i++){
            console.log(children[i]);
            if('wrap_'+this.dragTarget.id == children[i].wrapkey){
                theNode = children[i];
                isNewTo = false;
            }
        }

        if(isNewTo){
            let wrap = window.document.createElement("span")
                ,p = window.document.createElement("p");
            wrap.className = 'select-area';
            wrap.wrapkey = 'wrap_'+ this.dragTarget.id;
            wrap.appendChild(this.copy?this.dragTarget.cloneNode(true):this.dragTarget);
            p.innerHTML = "1";
            wrap.appendChild(p);
            event.target.appendChild(wrap);
        }else{
            let oldNum = theNode.children[1].innerText;
            theNode.children[1].innerHTML = ++oldNum;
        }
    }
    allowDrop(event) {
        event.preventDefault();
    }
}

export default function(options){
    if(global.drag){
        return global.drag;
    }else{
        global.drag = new DragTool_new(options)
    }
    return global.drag;
}