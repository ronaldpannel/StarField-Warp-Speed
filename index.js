/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const canvasBg = document.getElementById("canvasBg");
  const ctxBb = canvas.getContext("2d");
  canvasBg.width = window.innerWidth;
  canvasBg.height = window.innerHeight;

  class Star {
    constructor(effect) {
      this.effect = effect;
      this.x =
        Math.random() * (this.effect.width - -this.effect.width) +
        -this.effect.width;
      this.y =
        Math.random() * (this.effect.height - -this.effect.height) +
        -this.effect.height;
      this.z = Math.random() * this.effect.width;
      this.radius = 6;
      this.sx = 0;
      this.sy = 0;
      this.speed = 15;
      this.prevX = this.x;
      this.prevY = this.y;
      this.prevZ = this.z;
      this.prevSX;
      this.prevSY;
      this.opacity = mapRange(this.z, 0, this.effect.width, 1, 0);

      console.log(this.centerX);
    }
    draw(context) {
      context.beginPath();
      context.fillStyle = "white";
      context.translate(this.width * 0.5, this.height * 0.5);
      let r = mapRange(this.z, 0, this.effect.width, this.radius, 0);
      context.arc(this.sx, this.sy, r, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
      context.lineWidth = 2;
      context.moveTo(this.prevX, this.prevY);
      context.lineTo(this.sx, this.sy);
      context.stroke();
    }
    update() {
      this.sx = mapRange(this.x / this.z, 0, 1, 0, this.effect.width);
      this.sy = mapRange(this.y / this.z, 0, 1, 0, this.effect.height);

      this.z = this.z - 1 * this.speed;

      this.prevX = mapRange(this.x / this.prevZ, 0, 1, 0, this.effect.width);
      this.prevY = mapRange(this.y / this.prevZ, 0, 1, 0, this.effect.height);

      if (this.z < 1) {
        this.z = this.effect.width;
        this.x =
          Math.random() * (this.effect.width - -this.effect.width) +
          -this.effect.width;
        this.prevZ = this.z;
      }
    }
  }
  class Effect {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.starArray = [];
      this.numOfStars = 1000;
      this.createStars();
    }
    createStars() {
      for (let i = 0; i < this.numOfStars; i++) {
        this.starArray.push(new Star(this));
      }
    }
    render(context) {
      context.save();
      context.translate(this.width * 0.5, this.height * 0.5);
      this.starArray.forEach((star) => {
        star.draw(context);
        star.update();
      });
      context.restore();
    }
  }
  const effect = new Effect(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(this.width * 0.5, this.height * 0.5);
    effect.render(ctx, 0, 0);

    requestAnimationFrame(animate);
  }
  animate();

  //load function end
});
