class box_enemy {
    constructor(x, y, z) {
        this.position = { x, y, z }; 
        this.obj = document.createElement("a-box");
        this.obj.setAttribute("position", { x: x, y: y, z: z });
        scene.append(this.obj);

        this.box_hp = enemyHealth; 
        this.speed = 0.03;

    }

    angleTo(that){
        let dx = that.object3D.position.x - this.obj.object3D.position.x;
        let dz = that.object3D.position.z - this.obj.object3D.position.z;
  
        this.angle = Math.atan(dx/dz)
        if(dz < 0){
            this.angle += Math.PI
        }
    }
    forward(){
        let dx = this.speed * Math.sin(this.angle);
        let dz = this.speed * Math.cos(this.angle);
        this.obj.object3D.position.x += dx;
        this.obj.object3D.position.z += dz; 
    }

    damagePlayer() {
        let damageTaken = (enemyDamage * (1 - defensepercent)) - defenseabsolute;
        if (damageTaken > 0) {
            in_game_health -= damageTaken;
        }
    
        if (health <= 0) {
            health_text.setAttribute("value", "Game Over!");
        }
    
        if (this.obj && this.obj.parentNode) {
            this.obj.parentNode.removeChild(this.obj);
        }
    }
    
    takeDamage() {
        this.box_hp -= crit_damage > 0 ? crit_damage: ball_damage;

        if (this.box_hp <= 0) {
            this.die(); 
        }
    }

    die() {
        if (this.obj && this.obj.parentNode) {
            this.obj.parentNode.removeChild(this.obj);
        }
        this.obj = null;
        // add upgrade bonus
        gem += Math.round(((0.1 + (wave/5)) * Gkillbonus) * 10) / 10;
        coin += Math.round(((1 + (wave/5)) * Cbonus) * 10) / 10;
    }
    
  }