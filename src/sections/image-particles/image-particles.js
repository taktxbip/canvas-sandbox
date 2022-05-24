import './image-particles.scss';
import img from '../../images/batman-med.png';

const png = new Image();
png.src = img;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const particlesMaxSize = 3;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let imageCoordinates = [];

const mouse = {
    x: null,
    y: null,
    radius: 250
};

function imageParticles() {

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', (e) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    window.addEventListener('load', (e) => {
        console.log('Page is loaded');
        ctx.drawImage(png, 0, 0);
        drawImage();
        init();
        animate();
    });

    function animate() {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
        // connect();
        requestAnimationFrame(animate);
    }

}

class Particle {
    constructor(x, y, color, size) {
        // this.x = x;
        // this.y = y;
        this.x = x + canvas.width / 2 - png.width;
        this.y = y + canvas.height / 2 - png.height * 2;
        this.color = color;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.baseSize = this.size;
        this.mass = (Math.random() * 30) + 1;
        this.mouseDistance = null;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        ctx.fillStyle = this.color;
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        this.mouseDistance = Math.sqrt(dx * dx + dy * dy);

        const forceDirectionX = dx / this.mouseDistance;
        const forceDirectionY = dy / this.mouseDistance;
        const maxDistance = mouse.radius;
        let force = (maxDistance - this.mouseDistance) / maxDistance;
        if (force < 0) force = 0;

        const directionX = forceDirectionX * force * this.mass;
        const directionY = forceDirectionY * force * this.mass;
        if (this.mouseDistance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                this.x -= (this.x - this.baseX) / 10;
            }
            if (this.y !== this.baseY) {
                this.y -= (this.y - this.baseY) / 10;
            }
        }
        this.draw();
    }
}


function init() {
    particleArray = [];
    for (let y = 0, y2 = imageCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = imageCoordinates.width; x < x2; x++) {
            const index = (4 * y * imageCoordinates.width) + (4 * x) + 3;
            if (imageCoordinates.data[index] > 128) {
                const posX = x;
                const posY = y;
                let size = Math.random() * particlesMaxSize;
                // let size = particlesMaxSize;
                size = 3;
                const color = `rgb(
                                ${imageCoordinates.data[index - 3]},
                                ${imageCoordinates.data[index - 2]}, 
                                ${imageCoordinates.data[index - 1]})
                               `;
                particleArray.push(new Particle(posX * 2, posY * 2, color, size));
            }
        }

    }
}

function drawImage() {
    const imageWidth = png.width;
    const imageHeight = png.height;
    imageCoordinates = ctx.getImageData(0, 0, imageWidth, imageHeight);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


export default imageParticles;