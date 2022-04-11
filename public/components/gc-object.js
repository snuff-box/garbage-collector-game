const eden = Symbol("eden");
const survivor = Symbol("survivor");
const tenured = Symbol("tenured");
const garbage = Symbol("garbage");

const stateToSpace = {
    [eden]: "eden-space",
    [survivor]: "survivor-space",
    [tenured]: "tenured-space"
}

class GCObject extends HTMLElement {

    state = eden;
    numericId =() => this.dataset.id
    getElement = () => this.querySelector(".gc-object")
    destroy = () => {
        this.getElement().classList.add("anim-destroy");
        this.state = garbage;
        setTimeout(
            () => this.remove(),
            500
        )
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .gc-object {
                    height: 50px;
                    width: 50px;
                    border: 3px solid black;
                    background-color: yellow;
                    position: relative;
                    cursor: pointer;
                    text-align: center;
                }
                .gc-object:hover {
                    background-color: orange;
                }
                .anim-create {
                    animation: move-from-top 2s;
                    animation-fill-mode: forwards;
                }
                @keyframes move-from-top {
                    0% { top: -300px; }
                    100% { top: 0px;}
                }
                .anim-destroy {
                    animation: fall-down 0.5s;
                    animation-fill-mode: forwards;
                    transition: transform 0.5s;
                    transform: rotate(180deg) scale(0.5);
                }
                @keyframes fall-down {
                    0% { top: 0px; background-color: orange }
                    100% { top: 110px; background-color: red}
                }
                .anim-promote-right {
                    animation: move-right 1s;
                    animation-fill-mode: forwards;
                }
                .anim-promote-down {
                    animation: move-down 1s;
                    animation-fill-mode: forwards;
                }
                @keyframes  move-right {
                    0% { left: 0px; }
                    100% { left: 300px;}
                }
                @keyframes  move-down {
                    0% { top: 0px; left: 0px;}
                    100% { top: 170px; left: -100px}
                }
            </style>
            <div class="gc-object">
                <p>obj-${this.numericId()}</p>
            </div>
        `;

        this.addEventListener('click', this.destroy);

        const promoteTo = (newState, newClass) => {
            const newParent = stateToSpace[newState];
            this.getElement().classList.add(newClass);
            this.state = newState;
            setTimeout(() => window.dispatchEvent(new CustomEvent(`${newParent}:add`, { detail: { id: this.id } })), 1000);
        }

        window.addEventListener("minor-gc:stop", e => {
            const state = this.state;
            switch (state) {
                case garbage:
                    break;
                case eden:
                    promoteTo(survivor, 'anim-promote-right');
                    break;
                case survivor:
                    promoteTo(tenured, 'anim-promote-down');
                    break;

            }
        })
    }
}

window.customElements.define('gc-object', GCObject);