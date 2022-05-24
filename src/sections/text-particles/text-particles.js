import './text-particles.scss';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particlesMaxSize = 2;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
const adjustX = -30;
const adjustY = 10;

const mouse = {
    x: null,
    y: null,
    radius: 500
};

function textParticles() {

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // window.addEventListener('resize', (e) => {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // });

    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Verdana';
    ctx.fillText('A', 50, 40);
    const textCoordinates = ctx.getImageData(0, 0, 200, 200);


    class Particle {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.baseX = this.x;
            this.baseY = this.y;
            this.baseSize = this.size;
            this.mass = (Math.random() * 30) + 1;
            this.mouseDistance = null;
        }

        draw() {
            if (Math.abs(this.mouseDistance) > mouse.radius) {
                ctx.fillStyle = `rgba(255,255,255,1)`;
            }
            else {
                const red = (mouse.radius - Math.abs(this.mouseDistance)) / mouse.radius * 255;
                ctx.fillStyle = `rgba(255,255,${red},1)`;
            }
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update(time) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            this.mouseDistance = Math.sqrt(dx * dx + dy * dy);
            const forceDirectionX = dx / this.mouseDistance;
            const forceDirectionY = dy / this.mouseDistance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - this.mouseDistance) / maxDistance;
            const directionX = forceDirectionX * force * this.mass;
            const directionY = forceDirectionY * force * this.mass;
            if (this.mouseDistance < mouse.radius) {
                // this.x -= directionX + Math.cos(force * time / 500);
                // this.y -= directionY + Math.sin(force * time / 500);
                this.x -= directionX;
                this.y -= directionY;
            }
            else {
                if (this.x !== this.baseSize.X) {
                    this.x -= (this.x - this.baseX) / 10;
                }
                if (this.y !== this.baseSize.Y) {
                    this.y -= (this.y - this.baseY) / 10;
                }
            }
        }
    }

    function init() {
        particleArray = [];
        // textCoordinates
        console.log(textCoordinates);
        for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
            for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
                const index = (4 * y * textCoordinates.width) + (4 * x) + 3;
                if (textCoordinates.data[index] > 128) {
                    const posX = x + adjustX;
                    const posY = y + adjustY;
                    // const size = Math.random() * particlesMaxSize;
                    const size = particlesMaxSize;
                    particleArray.push(new Particle(posX * 10, posY * 10, size));
                }
            }

        }
    }

    init();
    console.dir(particleArray);

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].draw();
            particleArray[i].update(time);
        }
        // connect();
        requestAnimationFrame(animate);
    }
    animate();
}

function connect() {
    let opacity = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            const dx = particleArray[a].x - particleArray[b].x;
            const dy = particleArray[a].y - particleArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            opacity = 1 - distance / 50;
            if (Math.abs(particleArray[a].mouseDistance) > mouse.radius) {
                ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            }
            else {
                const red = (mouse.radius - Math.abs(particleArray[a].mouseDistance)) / mouse.radius * 255;
                ctx.strokeStyle = `rgba(${red},255,255,${opacity})`;
            }

            if (distance < 50) {
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}


export {
    textParticles
};