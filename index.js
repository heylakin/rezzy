import App from './app.js';

const VIEWPORT = document.querySelector('#viewport');

export default VIEWPORT;

(() => { VIEWPORT.innerHTML = App(); })();

