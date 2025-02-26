class upgrade_button{
    constructor(x,y,z,value,type,type2,money){
        let scene = document.querySelector("a-scene");
        this.box = document.createElement("a-entity");
        this.box.setAttribute("position", `${x} ${y} ${z}`);
        this.box.setAttribute("class", "dynamic-object");

        this.level = 1;
        this.cost = money;



        //background panel
        let bg = document.createElement('a-entity');
        bg.setAttribute('geometry', { primitive: 'plane', height: 1, width: 2.5 });
        bg.setAttribute('material', { color: '#0A0F50' });
        bg.setAttribute('position', '0 1 -2.99');
        this.box.append(bg);

        //Border
        let border = document.createElement('a-entity');
        border.setAttribute('geometry', { primitive: 'plane', height: 1.05, width: 2.55 });
        border.setAttribute('material', { color: 'white', side: 'double' });
        border.setAttribute('position', '0 1 -3');
        border.setAttribute('scale', '1.02 1.02 1');
        this.box.append(border);

        //Type
        let Type_text = document.createElement('a-text');
        Type_text.setAttribute('value', `${type}`);
        Type_text.setAttribute('position', '-1.15 1.05 -2.9');
        Type_text.setAttribute('color', 'white');
        Type_text.setAttribute("scale","1 1 1");

        let Type2_text = document.createElement("a-text");
        Type2_text.setAttribute("value", `${type2}`);
        Type2_text.setAttribute('position', '-1.15 0.85 -2.9');
        Type2_text.setAttribute('color', 'white');
        Type2_text.setAttribute("scale","1 1 1");
        this.box.append(Type_text);
        this.box.append(Type2_text);

        // Border for value/cost
        let CV_border = document.createElement("a-entity")
        CV_border.setAttribute('geometry', { primitive: 'plane', height: 0.9, width: 1.4 });
        CV_border.setAttribute('material', { color: 'white', side: "double" });
        CV_border.setAttribute('position', '0.5 1 -2.98');
        this.box.append(CV_border);

        // Box for value
        let VBox = document.createElement('a-entity');
        VBox.setAttribute('geometry', { primitive: 'plane', height: 0.6, width: 1.35 });
        VBox.setAttribute('material', { color: '#062F7C', side: "double" });
        VBox.setAttribute('position', '0.5 1.13 -2.97');
        this.box.append(VBox);

        this.Value_text = document.createElement('a-text');
        this.Value_text.setAttribute('value', `${value}`);
        this.Value_text.setAttribute('position', '0.3 1.15 -2.96');
        this.Value_text.setAttribute('color', 'white');
        this.Value_text.setAttribute("width","4");
        this.Value_text.setAttribute("height","4")
        this.box.append(this.Value_text);

        // Box for cost
        this.Cost_box = document.createElement('a-entity');
        this.Cost_box.setAttribute('geometry', { primitive: 'plane', height: 0.23, width: 1.35 });
        this.Cost_box.setAttribute('material', { color: '#062F7C', side: "double" });
        this.Cost_box.setAttribute('position', '0.5 0.69 -2.97');
        this.Cost_box.setAttribute("interact","");
        this.box.append(this.Cost_box);
        
        this.Cost_text = document.createElement('a-text');
        this.Cost_text.setAttribute('value', `$${this.cost}`);
        this.Cost_text.setAttribute('position', '0.3 0.7 -2.96');
        this.Cost_text.setAttribute('color', 'white');
        this.Cost_text.setAttribute("width","4");
        this.Cost_text.setAttribute("height","4")
        this.box.append(this.Cost_text);



        scene.append(this.box)


    }

    damage_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            damage_lv++;
            this.cost = Math.ceil(0.354*(this.level**2)+10.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            ball_damage += Math.ceil(1 * (1.05**damage_lv));
            console.log(damage_work)
            this.Value_text.setAttribute("value", `${ball_damage}`);
        }else{
            console.log("not enough coins")
        }
    }
    
    speed_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            speed_lv++;
            this.cost = Math.ceil(0.6*(this.level**2)+5.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            attack_speed += 0.03 * (1.01**speed_lv);
            this.Value_text.setAttribute("value", `${attack_speed.toFixed(2)}`);
        }else{
            console.log("not enough coins")
        }
    }

    crit_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            crit_lv++;
            this.cost = Math.ceil(0.4*(this.level**2)+4.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            critChance += 0.5;
            this.Value_text.setAttribute("value", `${critChance.toFixed(2)}%`);
        }else{
            console.log("not enough coins")
        }  
    }

    critfactor_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            critfactor_lv++;
            this.cost = Math.ceil(0.45*(this.level**2)+10.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            critfactor += 0.1;
            this.Value_text.setAttribute("value", `x${critfactor.toFixed(2)}`);
        }else{
            console.log("not enough coins")
        }  
    }

    range_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            range_lv++;
            this.cost = Math.ceil(0.6*(this.level**2)+5.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            range += 0.5;
            range2 += 0.5;
            this.Value_text.setAttribute("value", `${range.toFixed(2)}m`);
        }else{
            console.log("not enough coins")
        }  
    }

    health_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            health_lv++;
            this.cost = Math.ceil(0.5*(this.level**2)+5.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            health += Math.ceil(1 * (1.15**health_lv));
            this.Value_text.setAttribute("value", `${health}`);
        }else{
            console.log("not enough coins")
        }  
    }

    regen_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            regen_lv++;
            this.cost = Math.ceil(0.4*(this.level**2)+5.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            regen += (1 * (1.01**regen_lv)-1);
            this.Value_text.setAttribute("value", `${regen.toFixed(2)}/s`);
        }else{
            console.log("not enough coins")
        }  
    }

    defensepercent_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            defensepercent_lv++;
            this.cost = Math.ceil(0.7*(this.level**2)+5.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            defensepercent += 0.5;
            this.Value_text.setAttribute("value", `${defensepercent.toFixed(2)}%`);
        }else{
            console.log("not enough coins")
        }  
    }

    defenseabsolute_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            defenseabsolute_lv++;
            this.cost = Math.ceil(0.55*(this.level**2)+3.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);
            
            defenseabsolute += Math.ceil(1 * (1.2**defenseabsolute_lv));
            this.Value_text.setAttribute("value", `${defenseabsolute}`);
        }else{
            console.log("not enough coins")
        }  
    }

    Cbonus_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            Cbonus_lv++;
            this.cost = Math.ceil(0.55*(this.level**2)+10.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);

            let bonusValues = [0.03, 0.02, 0.01];
            Cbonus += bonusValues[Cbonus_lv % bonusValues.length];
            this.Value_text.setAttribute("value", `x${Cbonus.toFixed(2)}`);
        }else{
            console.log("not enough coins")
        }  
    }

    Cwave_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            Cwave_lv++;
            this.cost = Math.ceil(0.60*(this.level**2)+10.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);

            Cwave += Math.ceil(1 * (1.1 ** Cwave_lv) * Math.log(Cwave_lv + 1));
            this.Value_text.setAttribute("value", `${Cwave}`);
        }else{
            console.log("not enough coins")
        }  
    }

    Gkillbonus_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            Gkillbonus_lv++;
            this.cost = Math.ceil(0.60*(this.level**2)+10.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);

            Gkillbonus += 0.01;
            this.Value_text.setAttribute("value", `x${Gkillbonus.toFixed(2)}`);
        }else{
            console.log("not enough coins")
        }  
    }

    Gwave_upgrade(){
        if(coin >= this.cost){
            coin -= this.cost;
            this.level++;
            Gwave_lv++;
            this.cost = Math.ceil(0.60*(this.level**2)+10.45);
            this.Cost_text.setAttribute("value", `$${this.cost}`);

            Gwave += 1;
            this.Value_text.setAttribute("value", `${Gwave}`);
        }else{
            console.log("not enough coins")
        }  
    }
}