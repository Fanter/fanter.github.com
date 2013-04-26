function SoundIcon() {
    this.width = 40;
    this.height = 40;
    this.x = document.getElementById("TankCanvas").width - this.width;
    this.y = 0;
    this.transparency = 0.5;
    this.imageIndex = 0;
    this.image = Art["soundIcon" + this.imageIndex];
}

SoundIcon.prototype.update = function() {
    switch(this.imageIndex) {
        case 3:
            Sound.setVolume(0);
            break;
        case 2:
            Sound.setVolume(0.35);
            break;
        case 1:
            Sound.setVolume(0.7);
            break;
        case 0:
            Sound.setVolume(1);
            break;
    };
};

SoundIcon.prototype.render = function(context) {
    context.save();
    context.globalAlpha = this.transparency;
    context.drawImage(this.image, 0, 0, 40, 40, this.x, this.y, 40, 40);
    context.restore();
};

SoundIcon.prototype.onClick = function(e) {
    var canvas = document.getElementById("TankCanvas");
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    
    if (x > this.x && x < this.x + this.width
                   && y > this.y && y < this.y + this.height) {
        this.imageIndex < 3 ? this.imageIndex++ : this.imageIndex = 0;
        this.image = Art["soundIcon" + this.imageIndex];
    }
};

SoundIcon.prototype.onMouseOver = function(e) {
    
};

SoundIcon.prototype.onMouseOut = function(e) {
    
}


