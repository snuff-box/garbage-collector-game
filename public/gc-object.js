class GCObject extends HTMLElement {

    destroy = () => {
        this.remove()
    }

    connectedCallback() {
        this.attachShadow({mode: "open"})
        this.shadowRoot.innerHTML = `
            <style>
                .gs-object {
                    height: 80px;
                    width: 80px;
                    border: 5px solid black;
                    background-color: yellow;
                    cursor: pointer;
                    animation: color 1s 2s;
                    animation-fill-mode: forwards;
                }
                @keyframes color {
                    0% {background-color: yellow}
                    100% {background-color: red}
                }
            </style>
            <div class="gs-object">
                ${Math.floor(Math.random() * 100)}
            </div>
        `;

        this.addEventListener('click', this.destroy);
    }
}

window.customElements.define('gc-object', GCObject);