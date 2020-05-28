import React from "react"
import ReactDOM from "react-dom"
import LRU from "./lrucache.js"
import "./index.css"

var destination = document.querySelector('#container')

ReactDOM.render(
    <div>
        <LRU></LRU>
    </div>,
    destination
)