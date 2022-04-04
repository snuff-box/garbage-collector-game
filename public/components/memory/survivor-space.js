class SurvivorSpace extends HTMLElement {

    className = 'survivor-space';

    connectedCallback() {
        this.innerHTML = `
            <style>
                .survivor-space {
                    height: 60px;
                    padding: 2px;
                    width: 200px;
                    border: 3px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                    background-color: lightblue;
                }
            </style>
                <b>Survivor Space</b>
                <div class=${this.className}>
            </div>
        `;
    }
}

window.customElements.define('survivor-space', SurvivorSpace)