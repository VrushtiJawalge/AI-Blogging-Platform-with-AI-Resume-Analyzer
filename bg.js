const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize(){
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
resize();
window.addEventListener("resize", resize);

const particles = [];
const COUNT = 80;
const DIST = 150;

for(let i=0;i<COUNT;i++){
  particles.push({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    vx:(Math.random()-.5)*0.5,
    vy:(Math.random()-.5)*0.5
  });
}

function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);

  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;
    if(p.x<0||p.x>innerWidth)p.vx*=-1;
    if(p.y<0||p.y>innerHeight)p.vy*=-1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle="rgba(0,200,255,.8)";
    ctx.fill();
  });

  for(let i=0;i<COUNT;i++){
    for(let j=i+1;j<COUNT;j++){
      const dx=particles[i].x-particles[j].x;
      const dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<DIST){
        ctx.strokeStyle=`rgba(0,200,255,${1-d/DIST})`;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}
animate();
