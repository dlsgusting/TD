class PlayButton {
    constructor(x, y, z) {
        let scene = document.querySelector("a-scene");
        let entity = document.createElement("a-entity");
        entity.setAttribute("position", `${x} ${y} ${z}`);

        // Podium
        this.podium = document.createElement("a-cylinder");
        this.podium.setAttribute("position", "0 0 -3");
        this.podium.setAttribute("radius", "0.5");
        this.podium.setAttribute("height", "0.2");
        this.podium.setAttribute("color", "gray");
        entity.append(this.podium);

        // Button
        this.button = document.createElement("a-cylinder");
        this.button.setAttribute("id", "play_button");
        this.button.setAttribute("position", "0 0.2 -3");
        this.button.setAttribute("radius", "0.3");
        this.button.setAttribute("height", "0.1");
        this.button.setAttribute("color", "red");
        this.button.setAttribute("interact","");
        entity.append(this.button);

        // Text
        this.text = document.createElement("a-text");
        this.text.setAttribute("value", "PLAY");
        this.text.setAttribute("position", "-0.3 0.3 -3");
        this.text.setAttribute("rotation", "270 0 0");
        this.text.setAttribute("color", "white");
        this.text.setAttribute("scale", "1 1 1");
        this.text.setAttribute("side", "double");
        entity.append(this.text);

        scene.append(entity);
    }
}
