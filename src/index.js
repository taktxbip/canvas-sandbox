'strict';
import basic from './sections/basic/basic';
// import { textParticles } from './sections/text-particles/text-particles';
// import linesParticles from './sections/lines-particles/lines-particles';
// import imageParticles from './sections/image-particles/image-particles';
import liquidParticles from './sections/liquid-particles/liquid-particles';

let start, previousTimeStamp;

document.addEventListener('DOMContentLoaded', () => {
    window.requestAnimationFrame(step);
    // textParticles();
    // linesParticles();
    // imageParticles();
    liquidParticles();
});

function step(timestamp) {
    if (start === undefined) start = timestamp;

    if (previousTimeStamp !== timestamp) {
        window.requestAnimationFrame(step);
        // basic();
    }
}