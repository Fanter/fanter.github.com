window.onload = main();

function main() {
    var CANVAS_WITDH = document.getElementById("TankCanvas").width;
    var CANVAS_HEIGHT = document.getElementById("TankCanvas").height;
    var keys = {};
    var UP = 87;    //W
    var DOWN = 83;  //S
    var LEFT = 65;  //A
    var RIGHT = 68; //D
    
    function inputHandler(e) {
        console.log("inside inputHandler  +" + e.type);
        if (e.type === "keydown") {
            keys[e.keyCode] = true;
        } else if (e.type === "keyup") {
            keys[e.keyCode] = false;
        }
        console.log(keys);
    }
    
    (function init() {
        var entities = createEntities();
        var canvas = document.getElementById("TankCanvas");
        var context = canvas.getContext("2d");
        canvas.focus();
        canvas.addEventListener("keydown", inputHandler, false);
        canvas.addEventListener("keyup", inputHandler, false);

        setInterval(gameLoop, 10);

        function gameLoop() {
            update(entities);
            render(entities, context);  
        }
    })();
    
    function createEntities() {
        var entities = [];
        var tank = new Tank();
        entities.push(tank);
        return entities;
    }

    function update(entities) {
        for (var i = 0; i < entities.length; i++) {
            entities[i].update();
        }
    }

    function render(entities, context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, CANVAS_WITDH, CANVAS_HEIGHT);
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
        this.dirX = 1;
        this.dirY = 0;
        this.render = function(context) {
            context.fillStyle="#FFA100";
            context.fillRect(this.x, this.y, this.width, this.height);
        };
    }

    Tank.prototype.move = function() {
        var that = this;
        setDirection();
        this.x += this.speed * this.dirX;
        this.y += this.speed * this.dirY;
        
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
        
        function setDirection() {
            if (keys[UP]) {
                that.dirY = -1;
            } else if (that.dirY === -1) {
                that.dirY = 0;
            }
            if (keys[DOWN]) {
                that.dirY = 1;
            } else if (that.dirY ===1) {
                that.dirY = 0;
            }
            if (keys[RIGHT]) {
                that.dirX = 1;
            } else if (that.dirX === 1) {
                that.dirX = 0;
            }
            if (keys[LEFT]) {
                that.dirX = -1;
            } else if (that.dirX === -1) {
                that.dirX = 0;
            }
        }
    };

    Tank.prototype.setSpeedX = function(sx) {
        this.speedX = sx;
    };

    Tank.prototype.setSpeedY = function(sy) {
        this.speedY = sy;
    };

    Tank.prototype.setDirection = function(direction) {
        this.dir = direction;
    };

    Tank.prototype.update = function() {
        this.move();
    };
}



