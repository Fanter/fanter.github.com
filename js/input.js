var Input = (function() {

    function isDown(key) {
        for (var i = 0; i < this.keysArray.length; i++) {
            if (this.keysArray[i] === key) {
                return true;
            }
        }
        return false;
    }

    function handleEvent(e) {
        if (e.type === "keydown") {
            if (this.keysArray.indexOf(e.keyCode) === -1) {
                this.keysArray.push(e.keyCode);
            }
        } else if (e.type === "keyup") {
            if (this.keysArray.indexOf(e.keyCode) !== -1) {
                this.keysArray.splice(this.keysArray.indexOf(e.keyCode), 1);
            }
        }
    }

    function getLastKey() {
        var keyIndex = Math.max(this.keysArray.indexOf(this.UP), 
                                this.keysArray.indexOf(this.DOWN),
                                this.keysArray.indexOf(this.RIGHT),
                                this.keysArray.indexOf(this.LEFT));
        return this.keysArray[keyIndex];
    }
        
    return {
        isDown: isDown,
        handleEvent: handleEvent,
        getLastKey: getLastKey,
        UP: 87,    //W
        DOWN: 83,  //S
        LEFT: 65,  //A
        RIGHT: 68, //D
        FIRE: 32,  //space
        keysArray: []
    };
})();