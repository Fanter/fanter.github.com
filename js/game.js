Game = (function() {
    var GAME_RATE = 1000/60; //fps
    var canvas = document.getElementById("TankCanvas");
    var context = canvas.getContext("2d");
    var entities = [];
    
    function initialize() {
        entities = createEntities();
        canvas.focus();
        canvas.addEventListener("keydown", Input.handleEvent.bind(Input), false);
        canvas.addEventListener("keyup", Input.handleEvent.bind(Input), false);
        setInterval(gameLoop, GAME_RATE);
    }
    
    var gameLoop = function() {
        update();
        render(context);
    };
    
    function update() {
        for (var i = 0; i < entities.length; i++) {
            if (entities[i].removed) {
                entities.splice(i, 1);
                i--;
            } else {
                entities[i].update();
            }
        }
    }

    function render(context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, this.WITDH, this.HEIGHT);
        
        Map.render(context);
        for (var i = 0; i < entities.length; i++) {
            entities[i].render(context);
        }
    }
    
    function createEntities() {
        var entities = [];
        var tank = new Tank();
        var soundIcon = new SoundIcon();
        
        canvas.addEventListener("click", soundIcon.onClick.bind(soundIcon), false);
        canvas.addEventListener("mousemove", soundIcon.onMouseMove.bind(soundIcon), false);
        
        entities.push(tank);
        entities.push(soundIcon);
        return entities;
    }
    
    function addEntity(entity) {
        entities.push(entity);
    }
    
    return {
        WITDH: document.getElementById("TankCanvas").width,
        HEIGHT: document.getElementById("TankCanvas").height,
        initialize: initialize,
        addEntity: addEntity
    };
})();