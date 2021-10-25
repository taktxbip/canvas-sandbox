'strict';
import basic from './sections/basic';

import './scss/main.scss';

let start, previousTimeStamp;

document.addEventListener('DOMContentLoaded', () => {
    window.requestAnimationFrame(step);
});

function step(timestamp) {
    if (start === undefined) start = timestamp;

    if (previousTimeStamp !== timestamp) {
        window.requestAnimationFrame(step);
        basic();
    }
}