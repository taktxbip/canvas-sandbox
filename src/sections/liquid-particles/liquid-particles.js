// 13:12
import './liquid-particles.scss';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const particlesQty = 1000;
const particlesMaxSize = 10;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let buttons = [];

const mouse = {
    x: null,
    y: null,
    radius: 250
};

function liquidParticles() {
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', (e) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawButtons();
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
        requestAnimationFrame(animate);
    }
    animate();
}

class Block {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseX = this.x;
    }
    update() {
        let directionX = 2.2;
        if ((
            mouse.x < this.x + this.width &&
            mouse.x > this.x &&
            mouse.y < this.y + this.height &&
            mouse.y > this.y
        ) &&
            (this.x > this.baseX - 50)
        ) {
            this.x -= directionX;
            this.width += directionX;
        } else if (this.x < this.baseX) {
            this.x += directionX;
            this.width -= directionX;
        }
    }
    draw() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}

class Particle {
    constructor(x, y, size, mass) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.mass = mass;

        this.baseX = this.x;
        this.baseY = this.y;
        this.baseSize = this.size;
        this.baseMass = this.mass;

        this.mouseDistance = null;
        this.flowingRight = false;
    }
    update() {
        // collision with mouse;
        if (
            this.x > mouse.x - 50 &&
            this.x < mouse.x + 50 &&
            this.y > mouse.y - 5 &&
            this.y < mouse.y + 5
        ) {
            this.x -= this.mass;
            this.y += this.mass;
            this.flowingRight = true;
        }

        // collision with blocks;
        for (let i = 0; i < buttons.length; i++) {
            if (
                this.x < buttons[i].x + buttons[i].width &&
                this.x > buttons[i].x &&
                this.y < buttons[i].y + buttons[i].height &&
                this.y > buttons[i].y
            ) {
                this.mass = 0;
                if (!this.flowingRight) {
                    this.x -= 4;
                }
                else {
                    this.x += 4;
                }
            }
            else {
                this.mass += 0.03;
            }
        }

        // fall off screen
        if (canvas.height < this.y) {
            this.y = 0 - this.size;
            this.x = Math.random() * 60 + 200;
            this.mass = this.baseMass;
            this.flowingRight = false;
        }
        this.y += this.mass;
        this.draw();
    }

    draw() {
        ctx.fillStyle = 'rgba(128,197,222,1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}


function createParticles() {
    particleArray = [];
    for (let i = 0; i < particlesQty; i++) {
        const x = Math.random() * 60 + 200;
        const y = Math.random() * canvas.height + 200;
        const size = Math.random() * particlesMaxSize + 5;
        const mass = Math.random() * 1.5 + 0.9;
        particleArray.push(new Particle(x, y, size, mass));
    }
}
createParticles();

function createButtons() {
    for (let i = 0; i < 5; i++) {
        const topMargin = 150;
        const buttonMargin = 5;
        const x = 150;
        const y = topMargin + ((70 + buttonMargin) * i);
        const height = 50;
        const width = 200;
        buttons.push(new Block(x, y, width, height));
    }
}
createButtons();

function drawButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].update();
        buttons[i].draw();
    }
}

export default liquidParticles;