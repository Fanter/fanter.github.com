window.onload = main();

function main() {
    var CANVAS_WITDH = document.getElementById("TankCanvas").width;
    var CANVAS_HEIGHT = document.getElementById("TankCanvas").height;
    var keys = {};
    var level;
    var entities;
    
    function inputHandler(e) {
        console.log("inside inputHandler  +" + e.type);
        if (e.type === "keydown") {
            keys[e.keyCode] = true;
        } else if (e.type === "keyup") {
            delete keys[e.keyCode];
        }
        console.log(keys);
    }
    
    (function init() {
        entities = createEntities();
        level = new Level();
        var canvas = document.getElementById("TankCanvas");
        var context = canvas.getContext("2d");
        canvas.focus();
        canvas.addEventListener("keydown", inputHandler, false);
        canvas.addEventListener("keyup", inputHandler, false);

        setInterval(gameLoop, 10);

        function gameLoop() {
            update();
            render(context);
        }
    })();
    
    function createEntities() {
        var entities = [];
        var tank = new Tank();
        entities.push(tank);
        return entities;
    }

    function Level() {
        this.xSize = 20;
        this.ySize = 15;
        this.map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
    Level.prototype.render = function(context) {
        var width = CANVAS_WITDH/this.xSize;
        
        for (var i = 0; i < this.map.length; i++) {
            switch(this.map[i]) {
            case 0:
                context.fillStyle = "#00CC00";
                break;
            case 1:
                context.fillStyle = "#CCCCFF";
                break;
            }
            
            context.fillRect((i % this.xSize) * width , Math.floor(i / this.xSize) * width, width, width);
            context.fillStyle = "#000000";
            context.strokeRect((i % this.xSize) * width , Math.floor(i / this.xSize) * width, width, width);
        }
    };

    function update() {
        for (var i = 0; i < entities.length; i++) {
            entities[i].update();
        }
    }

    function render(context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, CANVAS_WITDH, CANVAS_HEIGHT);
        
        level.render(context);
        for (var i = 0; i < entities.length; i++) {
            entities[i].render(context);
        }
    }

    function Tank() {
        this.x = 120;
        this.y = 120;
        this.width = 25;
        this.height = 25;
        this.speed = 2;
        this.render = function(context) {
            context.fillStyle="#FFA100";
            context.fillRect(this.x, this.y, this.width, this.height);
        };
    }

    Tank.prototype.move = function() {
        var UP = 87;    //W
        var DOWN = 83;  //S
        var LEFT = 65;  //A
        var RIGHT = 68; //D

        if (keys[UP]) {
            this.y -= this.speed;
        } 
        if (keys[DOWN]) {
            this.y += this.speed;
        } 
        if (keys[RIGHT]) {
            this.x += this.speed;
        } 
        if (keys[LEFT]) {
            this.x -= this.speed;
        } 
    };
    
    Tank.prototype.handleCollisions = function() {
        if (this.x + this.width > CANVAS_WITDH) {
            this.x = CANVAS_WITDH - this.width;
        } else if (this.x < 0) {
            this.x = 0;
        }
        if (this.y + this.height > CANVAS_HEIGHT) {
            this.y = CANVAS_HEIGHT - this.height;
        } else if (this.y < 0) {
            this.y = 0;
        }
        
        
    };

    Tank.prototype.update = function() {
        this.move();
        this.handleCollisions();
    };
}



