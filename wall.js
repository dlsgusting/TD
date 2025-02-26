class wall{
    constructor(x,y,z,rotate1, rotate2, rotate3){
        let scene = document.querySelector("a-scene");
        this.box = document.createElement("a-entity");
        this.box.setAttribute("position", `${x} ${y} ${z}`);
        this.box.setAttribute("class", "dynamic-object");

        this.wall = document.createElement("a-box");
        this.wall.setAttribute("height", "15");
        this.wall.setAttribute("width", "0.1");
        this.wall.setAttribute("depth", "5");
        this.wall.setAttribute("color", "#8B4513");
        this.wall.setAttribute("rotation", `${rotate1} ${rotate2} ${rotate3}`);
        this.box.append(this.wall);
        scene.append(this.box);

    }
}