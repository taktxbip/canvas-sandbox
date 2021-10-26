import './lines-particles.scss';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particleQty = 500;
const particleMaxSize = 10;

// Max is 1;
const particleMaxMass = 0.1;
const particleMaxSpeed = 0.05;
const fade = 0.2;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const title = {
    x: null,
    y: null,
    width: null,
    height: 10
};


class Particle {
    constructor(x, y, size, mass, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.mass = mass;
        // this.speed = Math.random() * particleMaxSpeed;
        this.speed = 0.1;

        this.baseX = this.x;
        this.baseY = this.y;
        this.baseSize = this.size;
        this.baseMass = mass;

        // this.directionX = Math.random() > 0.5 ? 1 : -1;
        this.directionX = 1;
        this.directionY = Math.random() > 0.5 ? 1 : -1;

        this.mouseDistance = null;
    }

    draw() {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop('0', 'magenta');
        grad.addColorStop('0.5', 'blue');
        grad.addColorStop('1', 'red');

        ctx.fillStyle = grad;
        // ctx.fillStyle = '#39c';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.mass = this.baseMass;
            this.x = Math.random() * (canvas.width + 300) - 300;
        }


        this.mass += this.speed;
        this.y += this.mass;
        this.x += this.directionX;

        // collision check 
        if (
            this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
            this.y -= 3;
            this.mass *= -this.baseMass * 10;
        }

        // const forceX = (canvas.height - this.y) / canvas.height;
        // this.x -= this.mass * (1 - forceX);
    }
}

function linesParticles() {
    modifyHtml();
    animate();
    init();

    window.addEventListener('resize', (e) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

function animate() {
    ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
}

function init() {

    const h1 = document.querySelector('h1');
    const titleMeasurements = h1.getBoundingClientRect();

    title.x = titleMeasurements.left;
    title.y = titleMeasurements.top;
    title.width = titleMeasurements.width;

    particleArray = [];
    for (let i = 0; i < particleQty; i++) {
        const x = Math.random() * (canvas.width + 300) - 300;
        const y = Math.random() * canvas.height;
        const size = Math.random() * particleMaxSize;
        const mass = Math.random() * particleMaxMass;
        particleArray.push(new Particle(x, y, size, mass, 0.01));
    }
}


function modifyHtml() {
    const h1 = document.createElement('h1'),
        body = document.querySelector('body');

    h1.innerText = 'JavaScript';

    body.prepend(h1);
}

export default linesParticles;