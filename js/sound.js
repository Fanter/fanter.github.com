Sound = (function() {
    var samples = {
        shoot: new Audio("sound/tank_shoot.wav")   
    };
    var volume = 0.3;
    
    function getSound(name) {
        var sample = samples[name];
        sample.volume = volume;
        return sample;
    }
    
    return {
        getSound: getSound
    };
})();

