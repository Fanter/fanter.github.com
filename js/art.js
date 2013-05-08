Art = (function() {

    function getImage(src) {
        var img = new Image();
        img.src = src;
        return img;
    }
    
    return {
        tank: getImage("images/tank_t/tank_sprite.png"),
        bullet: getImage("images/missile/missile.png"),
        bullet_expl: getImage("images/explosions/missile_expl.png"),
        soundIcon0: getImage("images/sound-icon/speaker0.png"),
        soundIcon1: getImage("images/sound-icon/speaker1.png"),
        soundIcon2: getImage("images/sound-icon/speaker2.png"),
        soundIcon3: getImage("images/sound-icon/speaker3.png"),
        brick: getImage("images/brick1.png"),
        grass: getImage("images/grass.png"),
        water: getImage("images/water.png")
    };
})();


