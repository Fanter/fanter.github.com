function Bullet(direction) {
    this.x = null;
    this.y = null;
    this.dir = direction;
    this.speed = 6;
    this.width = 8;
    this.height = 12;
    this.angle = null;
    this.removed = false;
    this.animateExplosion = false;
    this.frame = 0;
    this.image = Art.bullet;
}

Bullet.prototype.update = function() {
    this.move();
    this.checkCollisions();
    this.checkIfInsideWindowBounds();
};

Bullet.prototype.move = function() {
    if (this.dir === Input.UP) {
        this.y -= this.speed;
    }
    if (this.dir === Input.DOWN) {
        this.y += this.speed;
    }
    if (this.dir === Input.RIGHT) {
        this.x += this.speed;
    }
    if (this.dir === Input.LEFT) {
        this.x -= this.speed;
    }    
};

Bullet.prototype.checkCollisions = function() {
    if (Map.isBlocked(this.x, this.y)
            || Map.isBlocked(this.x + this.width, this.y)
            || Map.isBlocked(this.x, this.y + this.height)
            || Map.isBlocked(this.x + this.width, this.y + this.height)) {
        this.animateExplosion = true;
        this.speed = 0;
    }
};

Bullet.prototype.checkIfInsideWindowBounds = function() {
    var padding = 20;

    if (this.x < 0 - padding 
            || this.x > document.getElementById("TankCanvas").width + padding
            || this.y < 0 - padding
            || this.y > document.getElementById("TankCanvas").height + padding) {
        this.removed = true;
    } 
};

Bullet.prototype.render = function(context) {
    if (!this.removed && !this.animateExplosion) {
        context.save();
        context.translate(this.x + this.width/2, this.y + this.height/2);
        context.rotate(this.angle * Math.PI/180);
        context.drawImage(this.image, 0, 0, 8, 12, -this.width/2, -this.height/2, 8, 12);
        context.restore();
    } else {
        console.log("bullet.js");
        
        this.image = Art.bullet_expl;
        context.save();
        context.translate(this.x + this.width/2, this.y + this.height/2);
        context.drawImage(this.image, 0, 20*this.frame, 20, 20, -this.width/2, -this.height/2, 20, 20);
        context.restore();
        
        this.frame += 1;
        if (this.frame > 7) {
            this.removed = true;
        }
    }
};

Bullet.prototype.setX = function(x) {
    this.x = x;
};

Bullet.prototype.setY = function(y) {
    this.y = y;
};

Bullet.prototype.setAngle = function(angle) {
    this.angle = angle;
};
