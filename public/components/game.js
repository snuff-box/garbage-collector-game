import {toEncodedJson} from "../utils.js";
import "../programmer.js";
import "./gc-object.js";
import "./object-reference.js";
import "./gc-collector.js";
import "./memory/heap-memory.js";
import "./memory/eden-space.js";
import "./memory/tenured-space.js";
import "./memory/survivor-space.js";
import "./memory/stack-memory.js";

class Game extends HTMLElement {

    objectCounter = 0;

    createObject = ()=> {
        this.objectCounter++;
        window.dispatchEvent(new CustomEvent("object:new", { detail: { id: this.objectCounter} }));
    }

    start = () => {
        let counter = 0;
        let maxCount = 6;
        const interval = setInterval(() => {
            this.createObject();
            counter++;
            if (counter == maxCount) {
                clearInterval(interval)
            }
        }, 500);
    }

    runGC = () => {
        window.dispatchEvent(new CustomEvent("cycle:start"));
        this.start();
    }

    finishCycle = () => {
        console.log("event finished cycle");
        window.dispatchEvent(new CustomEvent("cycle:finished"));
        setTimeout(this.start, 2500);
    }

    connectedCallback() {
        window.finishCycle = this.finishCycle;
        window.runGC = this.runGC;
        this.innerHTML = `
            <style>
                .memory {
                    height: 100px;
                    padding: 10px;
                    width: 1400px;
                    border: 1px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 20px;
                }
            </style>
            <button onclick="window.finishCycle()">finish cycle</button>
            <button onclick="window.runGC()">run gc</button>
            <h1>Garbage Collector</h1>
            <stack-memory></stack-memory> 
            <div class="space">
                <img src="../images/code.png"></img>
            </div>
            <heap-memory></heap-memory>
            <gc-collector></gc-collector>
        `;

        this.start();
    }
}

window.customElements.define("my-game", Game);
