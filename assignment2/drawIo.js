

window.drawIo = {
    shapes: [],
    selectedShape: 'line',
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
var radius = 10,
    dragging = false,
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
    $('.tool').on('click', function () {
        /*$('.tool').removeClass('selected');
        $(this).addClass('selected');*/
        console.log(drawIo.shapes);
        drawIo.selectedShape = $(this).data('shape');
        console.log(drawIo.selectedShape);
    });

    //mousedown
    $('#canvas').on('mousedown', function (mouseEvent) {
        dragging = true;
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
                drawIo.ctx.clearRect(0, 0, drawIo.canvas.width, drawIo.canvas.height);
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
                drawIo.ctx.clearRect(0, 0, drawIo.canvas.width, drawIo.canvas.height);
                drawIo.selectElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
                
            }
            if(drawIo.selectedShape == 'line') {
                drawIo.ctx.beginPath();
                drawIo.ctx.moveTo(startLocation.x, startLocation.y);
                drawIo.ctx.lineTo(mouseEvent.offsetX, mouseEvent.offsetY);                
            }      
            drawCanvas();          
        }
    });

    //mouseup
    $('#canvas').on('mouseup', function (mouseEvent) {
        if(drawIo.selectedShape == 'line'){
            drawIo.ctx.stroke();
        }
        if(drawIo.selectedShape == 'text') {
            var text = document.getElementById("text").value;
            drawIo.ctx.fillText(text,mouseEvent.offsetX, mouseEvent.offsetY);
        } 
        drawIo.shapes.push(drawIo.selectElement);
        drawIo.selectElement = null;
       // drawIo.ctx.beginPath();
    });

  

});