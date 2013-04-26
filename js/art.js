Art = (function() {

    function getImage(src) {
        var img = new Image();
        img.src = src;
        return img;
    }
    
    return {
        bullet: getImage("images/missile/missile.png"),
        soundIcon0: getImage("images/sound-icon/speaker0.png"),
        soundIcon1: getImage("images/sound-icon/speaker1.png"),
        soundIcon2: getImage("images/sound-icon/speaker2.png"),
        soundIcon3: getImage("images/sound-icon/speaker3.png"),
    };
})();


