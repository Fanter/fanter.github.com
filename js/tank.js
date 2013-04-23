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

    if (Input.getLastKey() === Input.UP) {
        this.angle = 0;
    }
    if (Input.getLastKey() === Input.DOWN) {
        this.angle = 180;
    }
    if (Input.getLastKey() === Input.RIGHT) {
        this.angle = 90;
    }
    if (Input.getLastKey() === Input.LEFT) {
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

    if (Input.getLastKey() === Input.UP) {
        dy -= this.speed;
    } 
    if (Input.getLastKey() === Input.DOWN) {
        dy += this.speed;
    } 
    if (Input.getLastKey() === Input.RIGHT) {
        dx += this.speed;
    } 
    if (Input.getLastKey() === Input.LEFT) {
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
    return Input.isDown(Input.UP) 
            || Input.isDown(Input.DOWN) 
            || Input.isDown(Input.RIGHT) 
            || Input.isDown(Input.LEFT);
};

Tank.prototype.handleCollisions = function(nx, ny) {
    if (nx + this.size > document.getElementById("TankCanvas").width) {
        return false;
    } else if (nx < 0) {
        return false;
    }
    if (ny + this.size > document.getElementById("TankCanvas").height) {
        return false;
    } else if (ny < 0) {
        return false;
    }
    return true;
};

Tank.prototype.isValidLocation = function(nx, ny) {
    if (Map.isBlocked(nx, ny)) {
        return false;
    }
    if (Map.isBlocked(nx + this.size, ny)) {
        return false;
    }
    if (Map.isBlocked(nx, ny + this.size)) {
        return false;
    }
    if (Map.isBlocked(nx + this.size, ny + this.size)) {
        return false;
    }

    return true;
};

Tank.prototype.getDirection = function() {
    switch(this.angle) {
        case 0:
            return Input.UP;
            break;
        case 90:
            return Input.RIGHT;
            break;
        case 180:
            return Input.DOWN;
            break;
        case 270:
            return Input.LEFT;
            break;
    }
};

Tank.prototype.fire = function() {
    this.shootLimiter += 1;

    if (this.shootLimiter > 20) {
        var bulletX;
        var bulletY;
        var bulletAngle;
        var bullet = new Bullet(this.getDirection());

        switch(this.getDirection()) {
            case Input.UP:
                bulletX = this.x + this.size/2 - bullet.width/2;
                bulletY = this.y - bullet.height;
                bulletAngle = 0;
                break;
            case Input.DOWN:
                bulletX = this.x + this.size/2 - bullet.width/2;
                bulletY = this.y + this.size;
                bulletAngle = 180;
                break;
            case Input.RIGHT:
                bulletX = this.x + this.size + bullet.height/2 - bullet.width/2;
                bulletY = this.y + this.size/2 - bullet.height/2;
                bulletAngle = 90;
                break;
            case Input.LEFT:
                bulletX = this.x - bullet.height/2 - bullet.width/2;
                bulletY = this.y + this.size/2 - bullet.height/2;
                bulletAngle = 270;
                break;
        }

        bullet.setX(bulletX);
        bullet.setY(bulletY);
        bullet.setAngle(bulletAngle);
        Game.entities.push(bullet);  
        this.shootLimiter = 0;
    }
};

Tank.prototype.update = function() {
    if (Input.isDown(Input.FIRE)) {
        this.fire();
    } 
    this.move();
};


