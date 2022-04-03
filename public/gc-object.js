class GCObject extends HTMLElement {

    destroy = () => {
        this.shadowRoot.querySelector(".gs-object").classList.add("anim-destroy");
        setTimeout(
            () => this.remove(),
            500
        )
    }

    connectedCallback() {
        this.attachShadow({mode: "open"})
        this.shadowRoot.innerHTML = `
            <style>
                .gs-object {
                    height: 50px;
                    width: 50px;
                    border: 5px solid black;
                    background-color: yellow;
                    position: relative;
                    cursor: pointer;
                }
                .gs-object:hover {
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
                    animation: move-down 0.5s;
                    animation-fill-mode: forwards;
                    transition: transform 0.5s;
                    transform: rotate(180deg) scale(0.5);
                }
                @keyframes move-down {
                    0% { top: 0px; background-color: orange }
                    100% { top: 110px; background-color: red}
                }
            </style>
            <div class="gs-object anim-create">
                ${this.dataset.id}
            </div>
        `;

        this.addEventListener('click', this.destroy);
    }
}

window.customElements.define('gc-object', GCObject);