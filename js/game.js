Game = (function() {
    var GAME_RATE = 1000/60; //fps
    var canvas = document.getElementById("TankCanvas");
    var context = canvas.getContext("2d");

    function inputHandler(e) {
        Input.handleEvent(e);
    }
    
    function initialize() {
        this.entities = createEntities();
        canvas.focus();
        canvas.addEventListener("keydown", inputHandler, false);
        canvas.addEventListener("keyup", inputHandler, false);

        setInterval(this.gameLoop.bind(this), GAME_RATE);
    }
    
    function gameLoop() {
        this.update();
        this.render(context);
    }
    
    function update() {
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].removed) {
                this.entities.splice(i, 1);
                i--;
            } else {
                this.entities[i].update();
            }
        }
    }

    function render(context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, this.CANVAS_WITDH, this.CANVAS_HEIGHT);
        
        Map.render(context);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].render(context);
        }
    }
    
    function createEntities() {
        var entities = [];
        var tank = new Tank();
        entities.push(tank);
        return entities;
    }
    
    return {
        CANVAS_WITDH: document.getElementById("TankCanvas").width,
        CANVAS_HEIGHT: document.getElementById("TankCanvas").height,
        entities: [],
        initialize: initialize,
        update: update,
        render: render,
        createEntities: createEntities,
        inputHandler: inputHandler,
        gameLoop: gameLoop
    };
})();