Map = (function() {
    var map =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
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


    function render(context) {
        var width = document.getElementById("TankCanvas").width/this.xSize;

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
    }

    function isBlocked(x, y) {
        var cellWidth = document.getElementById("TankCanvas").width/this.xSize;
        var cellNumber = Math.floor(x/cellWidth) + (Math.floor(y/cellWidth))*this.xSize;
        if (this.map[cellNumber] === 1) {
            return true;
        }
        return false;
    }
    
    return {
        xSize: 20,
        ySize: 15,
        map: map,
        render: render,
        isBlocked: isBlocked
    };
    
})();

