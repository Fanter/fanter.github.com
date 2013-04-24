Art = (function() {
    var bullet = getImage("images/missile/missile.png");
    
    function getImage(src) {
        var img = new Image();
        img.src = src;
        return img;
    }
    
    return {
        bullet: bullet
    };
})();


