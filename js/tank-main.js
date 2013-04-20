window.onload = main();

function main() {
    var GAME_RATE = 1000/40; //fps
    var CANVAS_WITDH = document.getElementById("TankCanvas").width;
    var CANVAS_HEIGHT = document.getElementById("TankCanvas").height;
    var keys = {};
    var map;
    var entities;
    
    function inputHandler(e) {
        if (e.type === "keydown") {
            keys[e.keyCode] = true;
        } else if (e.type === "keyup") {
            delete keys[e.keyCode];
        }
    }
    
    (function init() {
        entities = createEntities();
        map = new Map();
        var canvas = document.getElementById("TankCanvas");
        var context = canvas.getContext("2d");
        canvas.focus();
        canvas.addEventListener("keydown", inputHandler, false);
        canvas.addEventListener("keyup", inputHandler, false);

        setInterval(gameLoop, GAME_RATE);

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

    function Map() {
        this.xSize = 20;
        this.ySize = 15;
        this.map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
                    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
                    1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,1,1,0,
                    0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                    0,0,1,1,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,
                    0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,
                    0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
    Map.prototype.render = function(context) {
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
        }//for
    };
    
    Map.prototype.isBlocked = function(x, y) {
        var cellWidth = CANVAS_WITDH/this.xSize;
        var cellNumber = Math.floor(x/cellWidth) + (Math.floor(y/cellWidth))*this.xSize;
        if (this.map[cellNumber] === 1) {
            return true;
        }
        return false;
    };

    function update() {
        for (var i = 0; i < entities.length; i++) {
            entities[i].update();
        }
    }

    function render(context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, CANVAS_WITDH, CANVAS_HEIGHT);
        
        map.render(context);
        for (var i = 0; i < entities.length; i++) {
            entities[i].render(context);
        }
    }

    function Tank() {
        this.x = 120;
        this.y = 120;
        this.size = 36;
        this.speed = 2;
        this.frame = 0;
        var img = new Image();
        img.src = 'images/tank_t/tank_sprite.png';
        this.image = img;
    }
    
    Tank.prototype.render = function(context) {
        context.fillStyle="#FFA100";
        //context.fillRect(this.x, this.y, this.size, this.size);
        this.frame += 1;
        if (this.frame > 3) {
            this.frame = 0;
        }
        context.drawImage(this.image, 0, 36*this.frame, 36, 36, this.x, this.y, 36, 36);
    };

    Tank.prototype.move = function() {
        var UP = 87;    //W
        var DOWN = 83;  //S
        var LEFT = 65;  //A
        var RIGHT = 68; //D
        var dx = 0;
        var dy = 0;

        if (keys[UP]) {
            dy -= this.speed;
        } 
        if (keys[DOWN]) {
            dy += this.speed;
        } 
        if (keys[RIGHT]) {
            dx += this.speed;
        } 
        if (keys[LEFT]) {
            dx -= this.speed;
        }
        
        var nx = this.x + dx;
        var ny = this.y + dy;
        if (this.isValidLocation(nx, ny) && this.handleCollisions(nx, ny)) {
            this.x = nx;
            this.y = ny;
        }
    };
    
    Tank.prototype.handleCollisions = function(nx, ny) {
        if (nx + this.size > CANVAS_WITDH) {
            return false;
        } else if (nx < 0) {
            return false;
        }
        if (ny + this.size > CANVAS_HEIGHT) {
            return false;
        } else if (ny < 0) {
            return false;
        }
        return true;
    };
    
    Tank.prototype.isValidLocation = function(nx, ny) {
        if (map.isBlocked(nx, ny)) {
            return false;
	}
	if (map.isBlocked(nx + this.size, ny)) {
            return false;
	}
	if (map.isBlocked(nx, ny + this.size)) {
            return false;
	}
	if (map.isBlocked(nx + this.size, ny + this.size)) {
            return false;
	}
		
	return true;
    };

    Tank.prototype.update = function() {
        this.move();
    };
}



