const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

let isRadarOn = true;

const center = {
  cx: 300,
  cy: 300,
};

document.body.addEventListener("click", () => {
  isRadarOn = !isRadarOn;
  drawRadarScanner(center);
});

// draw center circle
const drawContainerCircle = ({ cx, cy }) => {
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 2;
  ctx.arc(cx, cy, 250, 0, Math.PI * 2, true);
  ctx.stroke();

  drawCenterCircle({ cx, cy });
};

const drawCenterCircle = ({ cx, cy }) => {
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.fillStyle = "green";
  ctx.lineWidth = 2;
  ctx.arc(cx, cy, 5, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
};

let line = {
  y: 50,
  x: 0,
  r: Math.sqrt(Math.pow(0, 2) + Math.pow(50, 2)),
};

ctx.lineWidth = 2;

const startAngle = 180;
const endAngle = -startAngle;
let angle = startAngle;
let radius = 250;

const drawRadarScanner = ({ x, y, cx, cy }) => {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(x, y);
  ctx.stroke();

  requestAnimationFrame(() => draw({ cx, cy }));
};

/**
 * This method still uses global variabes
 * TODO avoid using globals (closure)
 * @param {*} param0
 */
const draw = ({ cx, cy }) => {
  if (angle <= endAngle) {
    ctx.clearRect(0, 0, 600, 600);
    drawContainerCircle({ cx, cy });
    angle = startAngle;
  }

  if (!isRadarOn) {
    return;
  }

  angle -= 0.35;
  drawRadarScanner(getPointsOnCircle({ radius, angle, cx, cy }));
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

drawContainerCircle(center);
drawRadarScanner(getPointsOnCircle({ ...center, radius, angle }));
