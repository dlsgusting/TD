let rnd = (l,u) => Math.random() * (u-l) + l
let scene, cam1, balls = [], rooms = [], b_enemies = [], target, tower, WaveNumber;
let upgrades = [];
let angle, Edistance, x, z;


let damage_work,speed_work,crit_work,critfactor_work,range_work;
let damage_lv,speed_lv,crit_lv,critfactor_lv,range_lv;

let original_ball_damage = 3;
let ball_damage = original_ball_damage;

let original_attack_speed = 2;
let attack_speed = original_attack_speed;
let cooldown = 1/attack_speed;

let original_critChance = 0;
let critChance = original_critChance; 
let original_critfactor = 1;
let critfactor = original_critfactor;

let original_range = 20;
let range = original_range;
let original_range2 = 19.8;
let range2 = original_range2;

let health_work, regen_work, defensepercent_work, defenseabsolute_work, lifesteal_work;
let health_lv, regen_lv, defensepercent_lv, defenseabsolute_lv, lifesteal_lv;

let original_health = 10;
let health = original_health;
let in_game_health = health;

let original_regen = 0;
let regen = original_regen;

let original_defensepercent = 0;
let defensepercent = original_defensepercent;

let original_defenseabsolute = 0;
let defenseabsolute = original_defenseabsolute;

let Cbonus_work, Cwave_work, Gkillbonus_work, Gwave_work;
let Cbonus_lv, Cwave_lv, Gkillbonus_lv, Gwave_lv;

let original_Cbonus = 1;
let Cbonus = original_Cbonus;

let original_Cwave = 10;
let Cwave = original_Cwave;

let original_Gkillbonus = 1;
let Gkillbonus = original_Gkillbonus;

let original_Gwave = 0;
let Gwave = original_Gwave;




let gem = 0;
let coin = 80;
let wave = 100;
let lost = false;
let waveActive = false;
let bracePeriod = false;
let enemyCount = 1000;
let enemyHealth = 1 * (1.4**wave);
let enemyDamage = 1 * (1.2**wave);
let innerRadius = 40;  
let outerRadius = 45; 
let bossSpawned = false;

let damage_button;

let games = 0;

function newgame(){
  createGame()
  ball_damage = original_ball_damage;
  game_cam.setAttribute("active", "true");
  upgrade_cam.setAttribute("active", "false");
  coin = 80;

  startWave()
}

function createGame(){
  games +=1
  let existingObjects = scene.querySelectorAll('.dynamic-object');
  if(games >= 2){
    existingObjects.forEach(obj => obj.remove());
  }

  ball_damage = original_ball_damage;
  attack_speed = original_attack_speed;
  critfactor = original_critfactor;
  critChance = original_critChance; 
  range2 = original_range2;
  range = original_range;
  health = original_health;
  regen = original_regen;
  defensepercent = original_defensepercent;
  defenseabsolute = original_defenseabsolute;
  Cbonus = original_Cbonus;
  Cwave = original_Cwave;
  Gkillbonus = original_Gkillbonus;
  Gwave = original_Gwave;

  new wall(0,20.94,-2, 90, 90, 0);
  new wall(-7.5,20.94,5.5, 90, 0, 0)
  new wall(7.5,20.94,5.5, 90, 0, 0)

    //Offense
    damage_button = new upgrade_button(-6, 21.7, 1.2, ball_damage, "Damage", "", 10);
    damage_button.Cost_box.addEventListener("mouseenter", () => {
      damage_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    damage_button.Cost_box.addEventListener("mouseleave", () => {
      damage_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    damage_button.Cost_box.addEventListener("click", () => {

      damage_button.damage_upgrade();
    });

  
    let AS_button = new upgrade_button(-6,20.5,1.2, attack_speed, "Attack", "Speed", 5);
    AS_button.Cost_box.addEventListener("mouseenter", () => {
      AS_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    AS_button.Cost_box.addEventListener("mouseleave", () => {
      AS_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    AS_button.Cost_box.addEventListener("click", () => {
      
      AS_button.speed_upgrade();
    });
  
    let crit_button = new upgrade_button(-6,19.3,1.2, critChance, "Critical", "Chance", 5);
    crit_button.Cost_box.addEventListener("mouseenter", () => {
      crit_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    crit_button.Cost_box.addEventListener("mouseleave", () => {
      crit_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    crit_button.Cost_box.addEventListener("click", () => {
      
      crit_button.crit_upgrade();
    });
    

  
    let critfactor_button = new upgrade_button(-6,18.1,1.2, critfactor, "Critical", "Factor", 10);
    critfactor_button.Cost_box.addEventListener("mouseenter", () => {
      critfactor_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    critfactor_button.Cost_box.addEventListener("mouseleave", () => {
      critfactor_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    critfactor_button.Cost_box.addEventListener("click", () => {
      
      critfactor_button.critfactor_upgrade();
    });
  

  
    let range_button = new upgrade_button(-3.3,21.7,1.2, range, "Range", "", 10);
    range_button.Cost_box.addEventListener("mouseenter", () => {
      range_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    range_button.Cost_box.addEventListener("mouseleave", () => {
      range_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    range_button.Cost_box.addEventListener("click", () => {
      
      range_button.range_upgrade();
    });
  
    //Defense
  
    let health_button = new upgrade_button(-4.3,21.7,-0.5, health, "Health", "", 10);
    health_button.box.setAttribute("rotation", "0 90 0")
    health_button.Cost_box.addEventListener("mouseenter", () => {
      health_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    health_button.Cost_box.addEventListener("mouseleave", () => {
      health_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    health_button.Cost_box.addEventListener("click", () => {
      health_button.health_upgrade();
    });
  

  
    let regen_button = new upgrade_button(-4.3,20.5,-0.5, regen, "Regen", "", 5);
    regen_button.box.setAttribute("rotation", "0 90 0")
    regen_button.Cost_box.addEventListener("mouseenter", () => {
      regen_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    regen_button.Cost_box.addEventListener("mouseleave", () => {
      regen_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    regen_button.Cost_box.addEventListener("click", () => {
      regen_button.regen_upgrade();
    });
  
  
    let defensepercent_button = new upgrade_button(-4.3,19.3,-0.5, defensepercent, "Defense", "%", 5);
    defensepercent_button.box.setAttribute("rotation", "0 90 0")
    defensepercent_button.Cost_box.addEventListener("mouseenter", () => {
      defensepercent_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    defensepercent_button.Cost_box.addEventListener("mouseleave", () => {
      defensepercent_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    defensepercent_button.Cost_box.addEventListener("click", () => {
      defensepercent_button.defensepercent_upgrade();
    });
  
    let defenseabsolute_button = new upgrade_button(-4.3,18.1,-0.5, defenseabsolute, "Defense", "Absolute", 3);
    defenseabsolute_button.box.setAttribute("rotation", "0 90 0")
    defenseabsolute_button.Cost_box.addEventListener("mouseenter", () => {
      defenseabsolute_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    defenseabsolute_button.Cost_box.addEventListener("mouseleave", () => {
      defenseabsolute_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    defenseabsolute_button.Cost_box.addEventListener("click", () => {
      defenseabsolute_button.defenseabsolute_upgrade();
    });
  
    //utlility
    let Cbonus_button = new upgrade_button(4.3,21.7,-0.5, Cbonus, "Cash", "Bonus", 10);
    Cbonus_button.box.setAttribute("rotation", "0 270 0")
    Cbonus_button.Cost_box.addEventListener("mouseenter", () => {
      Cbonus_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    Cbonus_button.Cost_box.addEventListener("mouseleave", () => {
      Cbonus_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    Cbonus_button.Cost_box.addEventListener("click", () => {
      Cbonus_button.Cbonus_upgrade();
    });
  
    let Cwave_button = new upgrade_button(4.3,20.5,-0.5, Cwave, "Cash /", "Wave", 10);
    Cwave_button.box.setAttribute("rotation", "0 270 0")
    Cwave_button.Cost_box.addEventListener("mouseenter", () => {
      Cwave_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    Cwave_button.Cost_box.addEventListener("mouseleave", () => {
      Cwave_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    Cwave_button.Cost_box.addEventListener("click", () => {
      Cwave_button.Cwave_upgrade();
    });
  
    let Gkillbonus_button = new upgrade_button(4.3,19.3,-0.5, Gkillbonus, "Gem", "Bonus", 10);
    Gkillbonus_button.box.setAttribute("rotation", "0 270 0")
    Gkillbonus_button.Cost_box.addEventListener("mouseenter", () => {
      Gkillbonus_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    Gkillbonus_button.Cost_box.addEventListener("mouseleave", () => {
      Gkillbonus_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    Gkillbonus_button.Cost_box.addEventListener("click", () => {
      Gkillbonus_button.Gkillbonus_upgrade();
    });
  
    let Gwave_button = new upgrade_button(4.3,18.1,-0.5, Gwave, "Gem", "Bonus", 10);
    Gwave_button.box.setAttribute("rotation", "0 270 0")
    Gwave_button.Cost_box.addEventListener("mouseenter", () => {
      Gwave_button.Cost_box.setAttribute('material', 'color', 'red');
    });
    Gwave_button.Cost_box.addEventListener("mouseleave", () => {
      Gwave_button.Cost_box.setAttribute('material', 'color', '#062F7C');
    });
    Gwave_button.Cost_box.addEventListener("click", () => {
      Gwave_button.Gwave_upgrade();
    });

}


window.onload = function() {
  scene = document.querySelector("a-scene");
  tower = document.querySelector("#towerID");
  WaveNumber = document.querySelector("#WaveNumber");

  damage_work = 0;
  damage_lv = damage_work;
  if(damage_work > 0){
    for(let i = 1; i <= damage_work; i++){
     original_ball_damage += Math.ceil(1 * (1.05**i));
   }
   ball_damage = original_ball_damage;
 }else{
   ball_damage = original_ball_damage;
 }

 speed_work = 0;
 speed_lv = speed_work;
 if(speed_work > 0){
   for(let i = 1; i <= speed_work; i++){
    original_attack_speed += 0.03 * (1.01**i);
  }
  attack_speed = original_attack_speed;
  }else{
  attack_speed = original_attack_speed;
  }

  crit_work = 0;
  crit_lv = crit_work;
  if(crit_work > 0){
    for(let i = 1; i <= crit_work; i++){
    original_critChance += 0.5;
  }
  critChance = original_critChance;
  }else{
  critChance = original_critChance;
  }

  critfactor_work = 0;
  critfactor_lv = critfactor_work;
  if(critfactor_work > 0){
    for(let i = 1; i <= critfactor_work; i++){
     original_critfactor += 0.1;
   }
   critfactor = original_critfactor;
 }else{
  critfactor = original_critfactor;
 }

 range_work = 10;
 range_lv = range_work;
 if(range_work > 0){
   for(let i = 1; i <= range_work; i++){
    original_range += 0.5;
    original_range2 += 0.5;
  }
  range = original_range;
  range2 = original_range2;
  }else{
  range = original_range;
  range2 = original_range2;
  }

  health_work = 0;
  health_lv = health_work;
  if(health_work > 0){
    for(let i = 1; i <= health_work; i++){
      original_health += Math.ceil(1 * (1.15**i));
  }
  health = original_health;
  }else{
  health = original_health;
  }

  regen_work = 0;
  regen_lv = regen_work;
  if(regen_work > 0){
    for(let i = 1; i <= regen_work; i++){
      original_regen += (1 * (1.01**i)-1);
   }
   regen = original_regen;
 }else{
  regen = original_regen;
 }

 defensepercent_work = 0;
 defensepercent_lv = defensepercent_work;
 if(defensepercent_work > 0){
   for(let i = 1; i <= defensepercent_work; i++){
     original_defensepercent += 0.5;
  }
  defensepercent = original_defensepercent;
  }else{
  defensepercent = original_defensepercent;
  }

defenseabsolute_work = 0;
defenseabsolute_lv = defenseabsolute_work;
if(defenseabsolute_work > 0){
  for(let i = 1; i <= defenseabsolute_work; i++){
    original_defenseabsolute += Math.ceil(1 * (1.2**i));
 }
  defenseabsolute = original_defenseabsolute;
  }else{
  defenseabsolute = original_defenseabsolute;
  }

  Cbonus_work = 0;
  Cbonus_lv = Cbonus_work;
  if(Cbonus_work > 0){
    for(let i = 1; i <= Cbonus_work; i++){
      let bonusValues = [0.03, 0.02, 0.01];
      original_Cbonus += bonusValues[i % bonusValues.length];
   }
   Cbonus = original_Cbonus;
 }else{
  Cbonus = original_Cbonus;
 }

 Cwave_work = 0;
 Cwave_lv = Cwave_work;
 if(Cwave_work > 0){
   for(let i = 1; i <= Cwave_work; i++){
     original_Cwave += Math.ceil(1 * (1.1 ** i) * Math.log(i + 1));
  }
  Cwave = original_Cwave;
  }else{
  Cwave = original_Cwave;
  }

  Gkillbonus_work = 0;
  Gkillbonus_lv = Gkillbonus_work;
  if(Gkillbonus_work > 0){
    for(let i = 1; i <= Gkillbonus_work; i++){
      original_Gkillbonus += 0.01;
   }
   Gkillbonus = original_Gkillbonus;
 }else{
  Gkillbonus = original_Gkillbonus;
 }

 Gwave_work = 0;
 Gwave_lv = Gwave_work;
 if(Gwave_work > 0){
   for(let i = 1; i <= Gwave_work; i++){
     original_Gwave += 1;
  }
  Gwave = original_Gwave;
  }else{
  Gwave = original_Gwave;
  }

  //Permanent upgrade shop
  let wall1 = new wall(300,20.94,-2, 90, 90, 0);
  wall1.wall.setAttribute("static-body","");
  wall1.box.setAttribute("class", "a")
  let wall2 = new wall(292.5,20.94,5.5, 90, 0, 0);
  wall2.wall.setAttribute("static-body","");
  wall2.box.setAttribute("class", "a")
  let wall3 =  new wall(307.5,20.94,5.5, 90, 0, 0);
  wall3.wall.setAttribute("static-body","");
  wall3.box.setAttribute("class", "a")
  let wall4 = new wall(300,20.94,13,90,90,0);
  wall4.wall.setAttribute("static-body","");
  wall4.box.setAttribute("class", "a")
  let ceil = new wall(300,23.5,5,0,0,90);
  ceil.wall.setAttribute("depth", "20");
  ceil.box.setAttribute("class", "a")
  let floor = new wall(300,18.5,5,0,0,90);
  floor.wall.setAttribute("depth", "20");
  floor.wall.setAttribute("color", "black");
  floor.box.setAttribute("class", "a")

  play = new PlayButton(300,19,8);

  play.button.addEventListener("mouseenter", () => {
    play.button.setAttribute("color", "blue");
  });
  play.button.addEventListener("mouseleave", () => {
    play.button.setAttribute("color", "red");
  });
  play.button.addEventListener("click", () => {
    lost = false;
    newgame()
  });

  countdown()
}

function heal(){
  if(in_game_health < health){
    in_game_health = Math.min(in_game_health + regen, health)
  }
  setTimeout(heal, 1000);
}


function countdown() {
  for (let ball of balls) {
    ball.move()
  }

  if (cooldown > 0) {
      cooldown -= 0.01; 
      cooldown = Math.max(cooldown, 0); 
  }

  if (cooldown <= 0) {
    if (target && b_enemies.length > 0 && distance(target, tower) <= range) {
      let newBall = new Ball(); 
      balls.push(newBall); 
      newBall.shoot(tower, target);
      newBall.damage();
      cooldown = 1/attack_speed; 
    }
  }

  setTimeout(countdown, 10); 
}

function loop() {
  health_text.setAttribute("value", `Health: ${in_game_health.toFixed(2)}/${health}`);
  gems.setAttribute("value", `Gems:${gem.toFixed(1)}`) 
  attack_range.setAttribute("radius-outer", `${range}`);
  attack_range.setAttribute("radius-inner", `${range2}`); 
  enemyHealth_text.setAttribute("value", `Enemy health: ${enemyHealth}`)
  enemyDamage_text.setAttribute("value", `Enemy damage: ${enemyDamage}`)
  coins.setAttribute("value",`$${coin.toFixed(0)}`);
  if(!waveActive) return;

  if (in_game_health <= 0) {
    endWave();  
    return;
  }
  
  target = b_enemies[0].obj;
  let closest = distance(b_enemies[0].obj, tower);

  for (let i = 1; i < b_enemies.length; i++) { 
    if (distance(b_enemies[i].obj, tower) < closest) {
      closest = distance(b_enemies[i].obj, tower);
      target = b_enemies[i].obj;
    }
  }



  // Process box enemies
  for (let i = b_enemies.length - 1; i >= 0; i--) {
    let enemy = b_enemies[i];
    let d = distance(enemy.obj, tower);

    if (d < 2) {   
      enemy.damagePlayer();
      b_enemies.splice(i, 1); 
      Spawn_criteria();
      continue;  
    }

    for (let j = balls.length - 1; j >= 0; j--) {
      let ball = balls[j];
      let d_ball = distance(enemy.obj, ball.obj);

      if(ball.age > 500){
        balls.splice(j, 1); 

        if (ball.obj && ball.obj.parentNode) {
          ball.obj.parentNode.removeChild(ball.obj);
        }
      }

      if (d_ball < 1) {
        enemy.takeDamage();
        balls.splice(j, 1); 

        if (ball.obj && ball.obj.parentNode) {
          ball.obj.parentNode.removeChild(ball.obj);
        }

        if (enemy.box_hp <= 0) {
          b_enemies.splice(i, 1); 
          Spawn_criteria()
          break; 
        }
      }
    }

    if (!b_enemies.includes(enemy)) continue;
    enemy.angleTo(tower);
    enemy.forward();
  }
  window.requestAnimationFrame(loop);
}


function startWave() {
  if (lost) return;
  heal();

  WaveNumber.setAttribute("value", `Wave:${wave}`);


  gem += Gwave;
  coin += Cwave;

  enemyHealth = 1 + wave * 2;
  enemyDamage = 1 + wave * 0.5;
    
  waveActive = true;
  bracePeriod = false;

  enemyCount = 10000

    while (enemyCount > 0 && b_enemies.length < 10) {
      angle = Math.random() * Math.PI * 2;
      Edistance = Math.random() * (outerRadius - innerRadius) + innerRadius;
      x = Math.cos(angle) * Edistance;
      z = Math.sin(angle) * Edistance;

      normalenemies = new box_enemy(x, 1, z, enemyHealth, enemyDamage)
  
      b_enemies.push(normalenemies);
      enemyCount -= 1;
     
  
      random = Math.round(rnd(0, 10));
      random2 = Math.round(rnd(0,20))
  
      if (random == 1) {
          let SpeedAngle = Math.random() * Math.PI * 2;
          let SpeedDistance = Math.random() * (outerRadius - innerRadius) + innerRadius;
          let SpeedX = Math.cos(SpeedAngle) * SpeedDistance;
          let SpeedZ = Math.sin(SpeedAngle) * SpeedDistance;
  
          let SpeedEnemy = new box_enemy(SpeedX, 1, SpeedZ, enemyHealth, enemyDamage);
          b_enemies.push(SpeedEnemy);
          SpeedEnemy.obj.setAttribute("color", "yellow");
          SpeedEnemy.speed = 0.06;
          SpeedEnemy.obj.setAttribute("scale", "0.7 0.7 0.7")
      }

      if(random2 == 1){
        let TankAngle = Math.random() * Math.PI * 2;
        let TankDistance = Math.random() * (outerRadius - innerRadius) + innerRadius;
        let TankdX = Math.cos(TankAngle) * TankDistance;
        let TankZ = Math.sin(TankAngle) * TankDistance;

        let TankEnemy = new box_enemy(TankdX, 1, TankZ, enemyHealth * 4, enemyDamage * 0.5);
        b_enemies.push(TankEnemy);
        TankEnemy.obj.setAttribute("color", "orange");
        TankEnemy.obj.setAttribute("scale","2 2 2")
        TankEnemy.speed = 0.02;
      }



      if (wave % 10 === 0 && !bossSpawned) {
          WaveStuff.setAttribute("value", "Boss Wave!")
          let bossAngle = Math.random() * Math.PI * 2;
          let bossDistance = Math.random() * (outerRadius - innerRadius) + innerRadius;
          let bossX = Math.cos(bossAngle) * bossDistance;
          let bossZ = Math.sin(bossAngle) * bossDistance;
      
          let bossEnemy = new box_enemy(bossX, 1, bossZ, enemyHealth * 10, enemyDamage * 5);
          b_enemies.push(bossEnemy);
      
          bossEnemy.obj.setAttribute("scale", "4 4 4");
          bossEnemy.obj.setAttribute("color", "red");
          bossEnemy.speed = 0.01;
      
          bossSpawned = true;
      }
  }
  checkWaveEnd();
  setTimeout(loop, 100);
}

function checkWaveEnd() {
  setTimeout(() => {
      if (b_enemies.length > 0) {
          for (let i = b_enemies.length - 1; i >= 0; i--) {
              let enemy = b_enemies[i];
              if (enemy.obj && enemy.obj.parentNode) {
                  enemy.obj.parentNode.removeChild(enemy.obj); 
              }
          }
          b_enemies = []; 
      }
      endWave(); 
  }, 20000); 
}

function endWave() {
  waveActive = false;
  if (in_game_health <= 0) {
    for (let i = b_enemies.length - 1; i >= 0; i--) {
      let enemy = b_enemies[i];
      if (enemy.obj && enemy.obj.parentNode) {
          enemy.obj.parentNode.removeChild(enemy.obj); 
      }
    }
    b_enemies = []; 
    lost = true;
    game_cam.setAttribute("active", "false");
    upgrade_cam.setAttribute("active", "true");
    wave = 0;
    coin = 0;
    in_game_health = health;
  }


  
  WaveStuff.setAttribute("value", `Wave ${wave} completed!`);
  wave++;
  bracePeriod = true;

  
  if(!lost){
    setTimeout(() => {
      WaveStuff.setAttribute("value", "Brace period over. Starting next wave...");
      startWave();
    }, 2000);  
  }
}

function Spawn_criteria() {
    while (enemyCount > 0 && b_enemies.length < 10) {
      angle = Math.random() * Math.PI * 2;
      Edistance = Math.random() * (outerRadius - innerRadius) + innerRadius;
      x = Math.cos(angle) * Edistance;
      z = Math.sin(angle) * Edistance;
  
      b_enemies.push(new box_enemy(x, 1, z, enemyHealth, enemyDamage));
      enemyCount -= 1;
  
      random = Math.round(rnd(0, 20));
  
      if (random === 1) {
          let SpeedAngle = Math.random() * Math.PI * 2;
          let SpeedDistance = Math.random() * (outerRadius - innerRadius) + innerRadius;
          let SpeedX = Math.cos(SpeedAngle) * SpeedDistance;
          let SpeedZ = Math.sin(SpeedAngle) * SpeedDistance;
  
          let SpeedEnemy = new box_enemy(SpeedX, 1, SpeedZ, enemyHealth, enemyDamage);
          b_enemies.push(SpeedEnemy);
          SpeedEnemy.obj.setAttribute("color", "yellow");
          SpeedEnemy.speed = 0.06;
      }
    }
}



function distance(obj1,obj2){
  // if (!obj1 || !obj2) {
  //   console.warn("One of the objects is undefined:", obj1, obj2);
  //   return Infinity;
  // }
  // if (!obj1.object3D || !obj2.object3D) {
  //   console.warn("object3D is missing:");
  //   return Infinity;
  // }
  // if (!obj1.object3D.position || !obj2.object3D.position) {
  //   console.warn("Position is missing:", obj1.object3D, obj2.object3D);
  //   return Infinity;
  // }
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}
