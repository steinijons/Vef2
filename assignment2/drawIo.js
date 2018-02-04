
window.drawIo = {
    shapes: [],
    selectedShape: 'pen',
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),
    selectElement: null,
    availableShapes: {
        RECTANGLE: 'rectangle',
        PEN: 'pen',
        CIRCLE: 'circle',
        LINE: 'line',
        TEXT: 'text'
    }
};
var radius = 5,
    startLocation;

drawIo.ctx.lineWidth = radius * 2;


$(function () {
    //document is loaded and parsed
    function drawCanvas() {
        if(drawIo.selectElement) {
            drawIo.selectElement.render();
        }

        for(var i = 0; i < drawIo.shapes.length; i++) {
            drawIo.shapes[i].render();
        }
    }


    //mousedown
    $('#canvas').on('mousedown', function (mouseEvent) {
        startLocation = {x: mouseEvent.offsetX, y: mouseEvent.offsetY};
        switch(drawIo.selectedShape) {
            case drawIo.availableShapes.RECTANGLE:
                drawIo.selectElement = new Rectangle( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0 ,0 );
                break;
            case drawIo.availableShapes.PEN:
                drawIo.selectElement = new Pen( {x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                break;
            case drawIo.availableShapes.CIRCLE:
                drawIo.selectElement = new Circle( {x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0);
                break;
            case drawIo.availableShapes.LINE:
                drawIo.selectElement = new Line( {x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                break;
            case drawIo.availableShapes.TEXT:
                drawIo.selectElement = new Text( {x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                break;
        }
    });

    //mousemove
    $('#canvas').on('mousemove', function (mouseEvent) {
        if(drawIo.selectElement) {
            if(drawIo.selectedShape == 'rectangle'){
                drawIo.selectElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
                drawCanvas();
            }
            if(drawIo.selectedShape == 'pen') {
                drawIo.ctx.lineTo(mouseEvent.offsetX, mouseEvent.offsetY);
                drawIo.ctx.stroke();
                drawIo.ctx.beginPath();
                drawIo.ctx.arc(mouseEvent.offsetX, mouseEvent.offsetY, radius, 0, Math.PI * 2);
                drawIo.ctx.fill();
                drawIo.ctx.beginPath();
                drawIo.ctx.moveTo(mouseEvent.offsetX, mouseEvent.offsetY);
            }
            if(drawIo.selectedShape == 'circle'){
                drawIo.selectElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
                drawCanvas();
            }
            if(drawIo.selectedShape == 'line') {
                drawIo.ctx.beginPath();
                drawIo.ctx.lineCap = 'round';
                drawIo.ctx.moveTo(startLocation.x, startLocation.y);
                drawIo.ctx.lineTo(mouseEvent.offsetX, mouseEvent.offsetY);
            }

        }
    });

    //mouseup
    $('#canvas').on('mouseup', function (mouseEvent) {
        if(drawIo.selectedShape == 'line'){
            drawIo.ctx.stroke();
        }
        if(drawIo.selectedShape == 'text') {
            var radius = document.getElementById('radval').innerHTML;
            var text = document.getElementById("textbox").value;
            drawIo.ctx.font = radius + 'px ' + currentFont;
            drawIo.ctx.fillText(text,mouseEvent.offsetX, mouseEvent.offsetY);

        }
        drawIo.shapes.push(drawIo.selectElement);
        drawIo.selectElement = null;
        drawIo.ctx.beginPath();

        console.log(drawIo.shapes);
    });


});
