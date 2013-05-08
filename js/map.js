Map = (function() {
    var map =  [0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,
                1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,1,0,
                1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
                1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,
                0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,1,1,0,
                0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                0,0,1,1,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,
                0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,2,2,2,
                0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,2,0,0,
                0,2,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,2,0,0,
                0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,
                0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


    function render(context) {
        var width = document.getElementById("TankCanvas").width/this.xSize;

        for (var i = 0; i < this.map.length; i++) {
            var x = (i % this.xSize) * width;
            var y = Math.floor(i / this.xSize) * width;
            
            switch(this.map[i]) {
            case 0:
                context.fillStyle = "#00CC00";
                break;
            case 1:
                context.fillStyle = "#CCCCFF";
                break;
            case 2:
                context.fillStyle = "#B20000";
                break;
            }
            
            if (this.map[i] === 2) {
                context.save();
                context.translate(x + width/2, y + width/2);
                context.drawImage(Art.brick, 0, 0, 32, 32, -width/2, -width/2, width, width);
                context.restore();
            } else if (this.map[i] === 0) {
                context.save();
                context.translate(x + width/2, y + width/2);
                context.drawImage(Art.grass, 0, 0, 32, 32, -width/2, -width/2, width, width);
                context.restore();
            } else if (this.map[i] === 1) {
                context.save();
                context.translate(x + width/2, y + width/2);
                context.drawImage(Art.water, 0, 0, 32, 32, -width/2, -width/2, width, width);
                context.restore();                
            } else {
                context.fillRect((i % this.xSize) * width , Math.floor(i / this.xSize) * width, width, width);
                context.fillStyle = "#000000";
                context.strokeRect((i % this.xSize) * width , Math.floor(i / this.xSize) * width, width, width);
            }
        }//for
    }

    function isBlocked(x, y) {
        var cellWidth = document.getElementById("TankCanvas").width/this.xSize;
        var cellNumber = Math.floor(x/cellWidth) + (Math.floor(y/cellWidth))*this.xSize;
        if (this.map[cellNumber] === 1 || this.map[cellNumber] === 2) {
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

