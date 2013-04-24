function Bullet(direction) {
    this.x = null;
    this.y = null;
    this.dir = direction;
    this.speed = 3;
    this.width = 16;
    this.height = 16;
    this.angle = null;
    this.removed = false;
    var img = new Image();
    img.src = "images/missile/missile.png";
    this.image = Art.bullet;
}

Bullet.prototype.update = function() {
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

    this.checkCollisionsAndBoundary();
};

Bullet.prototype.checkCollisionsAndBoundary = function() {
    var padding = 20;

    if (this.x < 0 - padding 
            || this.x > document.getElementById("TankCanvas").width + padding
            || this.y < 0 - padding
            || this.y > document.getElementById("TankCanvas").height + padding) {
        this.removed = true;
    } 
};

Bullet.prototype.render = function(context) {
    if (!this.removed) {
        context.save();
        context.translate(this.x + this.width/2, this.y + this.height/2);
        context.rotate(this.angle * Math.PI/180);
        context.drawImage(this.image, 0, 0, 16, 16, -this.width/2, -this.height/2, 16, 16);
        context.restore();
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
