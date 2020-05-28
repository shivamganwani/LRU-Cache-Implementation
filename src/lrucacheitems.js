import React, {Component} from "react"
import "./lrucache.css"
import FlipMove from "react-flip-move"

class LRUItems extends Component{
    constructor(props){
        super(props);
        this.createTasks=this.createTasks.bind(this);
    }

    createTasks(data){
        return <li>{data}</li>
    }

    render(){
        var lruElements = this.props.entries;
        var listItems = lruElements.map(this.createTasks);

        return (
            <ul className="theList">
                <FlipMove duration={250} easing="ease-out">
                {listItems}
                </FlipMove>
            </ul>
        );
    }
}

export default LRUItems;