class GameIntro extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
    }
    connectedCallback() {
        this.shadowRoot.querySelector('#startBtn').addEventListener('click', () => {
            document.querySelector('game-intro').remove();
            startGame();
        });
    }
}
customElements.define('game-intro', GameIntro);

document.body.prepend(document.createElement('game-intro'));
