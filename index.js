const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

// draw center circle
ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.arc(300, 300, 250, 0, Math.PI * 2, true);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2;
ctx.arc(300, 300, 5, 0, Math.PI * 2, true);
ctx.stroke();
ctx.fill();

let line = {
  y: 50,
  x: 0,
  r: Math.sqrt(Math.pow(0, 2) + Math.pow(50, 2)),
};

ctx.strokeStyle = "black";
ctx.lineWidth = 2;

let angle = 0;
let radius = 250;

const drawQuarter = ({ x, y, cx, cy }) => {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  ctx.stroke();

  requestAnimationFrame(() => {
    angle += 1;
    if (angle > 360) {
      //   ctx.clearRect(0, 0, 600, 600);
      angle = 0;
    }
    drawQuarter(getPointsOnCircle({ radius, angle, cx, cy }));
  });
};

const getPointsOnCircle = ({ radius, angle, cx, cy }) => {
  angle = angle * (Math.PI / 180); // convert from degrees to radians
  const x = cx + radius * Math.sin(angle);
  const y = cy + radius * Math.cos(angle);
  return {
    x,
    y,
    cx,
    cy,
  };
};

drawQuarter(getPointsOnCircle({ radius, angle, cx: 300, cy: 300 }));
