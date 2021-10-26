import './text-particles.scss';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const mouse = {
    x: null,
    y: null,
    radius: 150
};

function textParticles() {

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    ctx.fillStyle = 'white';
    ctx.font = '30px Verdana';
    ctx.fillText('A', 50, 40);

    // ctx.strokeStyle = 'white';
    // ctx.strokeRect(0, 0, 100, 100);
    const data = ctx.getImageData(0, 0, 100, 100);
}

class Particle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.baseSize = this.size;
        this.dencity = (Math.random() * 30) + 1;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
            this.size = 30;
        }
        else {
            this.size = this.baseSize;
        }
    }
}

function init() {
    particleArray = [];
    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3;
        particleArray.push(new Particle(x, y, size));
    }
    // particleArray.push(new Particle(50, 50));
    // particleArray.push(new Particle(80, 50));
}

init();
console.log(particleArray);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();

export {
    textParticles
};