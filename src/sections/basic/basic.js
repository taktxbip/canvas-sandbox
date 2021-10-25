let x = 50;

function basic() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Rectangle
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(x++, 50, 300, 200);

    // Circle
    ctx.fillStyle = 'blue';
    ctx.arc(canvas.width / 2, canvas.height / 2 + 40, 100, 0, Math.PI);
    ctx.fill();

    // x degrees
    // ctx.rotate(x * Math.PI / 180);

    // Triangle
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(25, 100);
    ctx.lineTo(50, 150);
    ctx.closePath();
    ctx.stroke();

    // Gradient
    const grad = ctx.createLinearGradient(0, 0, 500, 0);
    grad.addColorStop('0', 'magenta');
    grad.addColorStop(Math.abs(Math.cos(x / 70)), 'blue');
    grad.addColorStop('1', 'red');

    // Text
    ctx.fillStyle = grad;
    // ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.font = '50px Georgia';
    ctx.fillText('Hello world', canvas.width / 2, canvas.height / 2);
}

export default basic;