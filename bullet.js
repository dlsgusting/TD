let v = 0.5;
let crit_damage;
class Ball {
  constructor() {
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius", 0.5);
    this.fire = false;
    this.age = 0;
    scene.append(this.obj);
  }

  shoot(source, target) {

    let angle = this.angleTo(source, target);

    let pos = source.object3D.position;
    this.obj.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z });

    let v_xz = v * Math.cos(angle.phi);
    this.dz = v_xz * Math.cos(angle.theta);
    this.dx = v_xz * Math.sin(angle.theta);
    this.dy = v * Math.sin(angle.phi);
    this.fire = true;
  }

  angleTo(source, target) {
    let d = distance(source, target);
    let dx = target.object3D.position.x - source.object3D.position.x;
    let dy = target.object3D.position.y - source.object3D.position.y;
    let dz = target.object3D.position.z - source.object3D.position.z;

    let theta = Math.atan(dx / dz);
    if (dz < 0) {
      theta += Math.PI;
    }
    let phi = Math.asin(dy / d);

    return { theta: theta, phi: phi };
  }
  move() {
    if (this.fire) {
      this.obj.object3D.position.x += this.dx;
      this.obj.object3D.position.y += this.dy;
      this.obj.object3D.position.z += this.dz;
      this.age += 1;
    }
  }
  damage(){
    let iscritical = Math.random() < critChance;
    crit_damage = iscritical ? Math.floor(ball_damage * critMultiplier): ball_damage;
    return crit_damage;
  }
}

