import React, {Component} from "react"
import LRUItems from "./lrucacheitems.js"

class Node {
    constructor(data,next=null,prev=null){
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

class LRU extends Component{
    constructor(props){
        super(props);
        this.limit = 3;
        this.head = null;
        this.tail = null;
        this.state = {
            items:[]
        };
        this.count = 1;
        this.items = [];
        this.tmp = [];
    
        this.writeElement=this.writeElement.bind(this)
    }


    removeElement(p)
    {
        if(this.head.data !== p.data) {
            if(p.next != null) {
                p.next.prev=p.prev;
            } else {
                this.tail = p.prev;
            }
            if(p.prev != null) {
                p.prev.next = p.next;
            } else {
                this.head = p.next;
            }
        }
    }

    addAtTop(p)
    {
        p.next = this.head;
        p.prev = null
        if(this.head !== null) this.head.prev=p;
        this.head=p;
        if(this.tail === null) this.tail=this.head;
    }

    writeElement(e)
    {
        if(this._inputElement !== "") {
            const node = new Node (this._inputElement.value,this.head);
            if(this.state.items.length > this.limit-1) {
                let p = this.head;
                let elementFound = 0;
                while(p != null) {
                    if(p.data === this._inputElement.value) {
                        elementFound = 1;
                        break;
                    }
                    p = p.next;
                }

                if(elementFound === 1) {
                    this.removeElement(p);
                    this.addAtTop(p);
                } else {
                    this.addAtTop(node);
                    this.removeElement(this.tail);
                }
            } else {
                if(!this.head) {
                    this.head = this.tail = new Node(this._inputElement.value)
                } else {
                    let p = this.head;
                    let elementFound = 0;
                    while(p != null){
                        if(p.data === this._inputElement.value){
                            elementFound = 1
                            break;
                        }
                        p = p.next;
                    }
                    if(elementFound === 1 ) {
                        this.removeElement(p);
                        this.addAtTop(p);
                    } else {
                        this.addAtTop(node)
                    }
                }
            }
        }
        
        
        let p = this.head;
        while(p!=null){
            this.items=this.items.concat(p.data);
            p=p.next;
        }
        var tmp=this.items
        this.setState({
            items:tmp
        })
        this.tmp=tmp;
        this.items=[];
        
        this._inputElement.value="";
        e.preventDefault();
    }

    render(){
        return (
            <div className="lruMain">
                <div className="header">
                    <form onSubmit={this.writeElement}>
                        <input ref={(a)=>this._inputElement = a}
                            placeholder="Enter Element">

                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>
                <LRUItems entries={this.state.items}></LRUItems>
            </div>
        )
    }
}

export default LRU;