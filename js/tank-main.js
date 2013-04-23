window.onload = main();

function main() {
    var GAME_RATE = 1000/60; //fps
    var CANVAS_WITDH = document.getElementById("TankCanvas").width;
    var CANVAS_HEIGHT = document.getElementById("TankCanvas").height;
    var keysArray = [];
    keys = {};
    var map;
    var entities;
    var input;
    var UP = 87;    //W
    var DOWN = 83;  //S
    var LEFT = 65;  //A
    var RIGHT = 68; //D
    var FIRE = 32;  //space

    function inputHandler(e) {
        if (e.type === "keydown") {
            keys[e.keyCode] = true;
            if (keysArray.indexOf(e.keyCode) === -1) {
                keysArray.push(e.keyCode);
            }
        } else if (e.type === "keyup") {
            delete keys[e.keyCode];
            if (keysArray.indexOf(e.keyCode) !== -1) {
                keysArray.splice(keysArray.indexOf(e.keyCode), 1);
            }
        }
        input.handleEvent(e);
    }
    
    (function init() {
        entities = createEntities();
        map = new Map();
        input = new Input();
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
        context.fillRect(0, 0, CANVAS_WITDH, CANVAS_HEIGHT);
        
        map.render(context);
        for (var i = 0; i < entities.length; i++) {
            entities[i].render(context);
        }
    }
    
    function createEntities() {
        var entities = [];
        var tank = new Tank();
        entities.push(tank);
        return entities;
    }
    
    function Input() {
        this.keysArray = [];
    }
    
    Input.prototype.isDown = function(key) {
        for (var i = 0; i < this.keysArray.length; i++) {
            if (this.keysArray[i] === key) {
                return true;
            }
        }
        return false;
    };
    
    Input.prototype.handleEvent = function (e) {
        if (e.type === "keydown") {
            if (this.keysArray.indexOf(e.keyCode) === -1) {
                this.keysArray.push(e.keyCode);
            }
        } else if (e.type === "keyup") {
            if (this.keysArray.indexOf(e.keyCode) !== -1) {
                this.keysArray.splice(this.keysArray.indexOf(e.keyCode), 1);
            }
        }
    };
    
    Input.prototype.getLastKey = function() {
        var keyIndex = Math.max(keysArray.indexOf(UP), 
                                keysArray.indexOf(DOWN),
                                keysArray.indexOf(RIGHT),
                                keysArray.indexOf(LEFT));
        return this.keysArray[keyIndex];
    };

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

    function Tank() {
        this.x = 120;
        this.y = 120;
        this.size = 36;
        this.angle = 0;
        this.speed = 2;
        this.frame = 0;
        this.msPerFrame = 15;
        this.summDelta = 0;
        this.lastUpdateTime = 0;
        this.shootLimiter = 20;
        var img = new Image();
        img.src = 'images/tank_t/tank_sprite.png';
        this.image = img;
    }
    
    Tank.prototype.render = function(context) {
        var delta = Date.now() - this.lastUpdateTime;
        if (this.summDelta > this.msPerFrame && this.isMoving()) {
            this.summDelta = 0;
            this.frame += 1;
            if (this.frame > 3) {
                this.frame = 0;
            }
        } else {
            this.summDelta += delta;
        }
        this.lastUpdateTime = Date.now();
        
        if (input.getLastKey() === UP) {
            this.angle = 0;
        }
        if (input.getLastKey() === DOWN) {
            this.angle = 180;
        }
        if (input.getLastKey() === RIGHT) {
            this.angle = 90;
        }
        if (input.getLastKey() === LEFT) {
            this.angle = 270;
        }
        context.save();
        context.translate(this.x + this.size/2, this.y + this.size/2);
        context.rotate(this.angle * Math.PI/180);
        context.drawImage(this.image, 0, 36*this.frame, 36, 36, -this.size/2, -this.size/2, 36, 36);
        context.restore();
    };

    Tank.prototype.move = function() {
        var dx = 0;
        var dy = 0;                               
        
        if (input.getLastKey() === UP) {
            dy -= this.speed;
        } 
        if (input.getLastKey() === DOWN) {
            dy += this.speed;
        } 
        if (input.getLastKey() === RIGHT) {
            dx += this.speed;
        } 
        if (input.getLastKey() === LEFT) {
            dx -= this.speed;
        }
        
        var nx = this.x + dx;
        var ny = this.y + dy;
        if (this.isValidLocation(nx, ny) && this.handleCollisions(nx, ny)) {
            this.x = nx;
            this.y = ny;
        }
    };
    
    Tank.prototype.isMoving = function() {
        return keys[UP] || keys[DOWN] || keys[RIGHT] || keys[LEFT];
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
    
    Tank.prototype.getDirection = function() {
        switch(this.angle) {
            case 0:
                return UP;
                break;
            case 90:
                return RIGHT;
                break;
            case 180:
                return DOWN;
                break;
            case 270:
                return LEFT;
                break;
        }
    };
    
    Tank.prototype.fire = function() {
        this.shootLimiter += 1;
        
        if (this.shootLimiter > 20) {
            this.shootLimiter = 0;
            var bullet = new Bullet(this.x, this.y, this.getDirection());
            entities.push(bullet);  
        }
    };

    Tank.prototype.update = function() {
        if (input.isDown(FIRE)) {
            this.fire();
        } 
        this.move();
    };
    
    function Bullet(x, y, direction) {
        this.x = x;
        this.y = y;
        this.dir = direction;
        this.speed = 4;
        this.width = 5;
        this.height = 10;
        this.removed = false;
    }
    
    Bullet.prototype.update = function() {
        if (this.dir === UP) {
            this.y -= this.speed;
        }
        if (this.dir === DOWN) {
            this.y += this.speed;
        }
        if (this.dir === RIGHT) {
            this.x += this.speed;
        }
        if (this.dir === LEFT) {
            this.x -= this.speed;
        }
        
        this.checkCollisionsAndBoundary();
    };
    
    Bullet.prototype.checkCollisionsAndBoundary = function() {
        var padding = 20;
        
        if (this.x < 0 - padding 
                || this.x > CANVAS_WITDH + padding
                || this.y < 0 - padding
                || this.y > CANVAS_HEIGHT + padding) {
            this.removed = true;
        } 
    };
    
    Bullet.prototype.render = function(context) {
        if (!this.removed) {
            context.fillStyle = "#FF00FF";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}



