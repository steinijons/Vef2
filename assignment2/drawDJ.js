var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var radius = 10;
var dragging = false;




/*hafa þetta í html
<canvas id='canvas' width='400' height='400'>
*/

//fillRect(x,y,width, height) - fylltur kassi
//strokeRect(x,y,width, height) - kassa útlínur
//
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = radius * 2;

//kassi
/*
    context.fillstyle = 'black';
    context.fillRect(10,10,100,100);
*/


var putPoint = function(e) {
    if(dragging){
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
        //context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
        context.fill();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }
}

var engage = function(e) {
    dragging = true;
    putPoint(e);
}
var disengage = function(e) {
    dragging = false;
}


canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);
