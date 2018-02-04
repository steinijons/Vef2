

var redoElement = [];

var undo = document.getElementById('undoButton');
undo.addEventListener('click', undolastElem);

document.getElementById('redoButton').addEventListener('click', redoelement);

document.getElementById('New Picture').addEventListener('click', newPic);

function undolastElem(e) {
    console.log("before undo " + drawIo.shapes);



    //drawIo.shapes.splice(0,1);
    redoElement.push(drawIo.shapes.pop());

    drawIo.ctx.clearRect(0, 0, drawIo.canvas.width, drawIo.canvas.height);

    if(drawIo.selectElement) {
        drawIo.selectElement.render();
    }

    for(var i = 0; i < drawIo.shapes.length; i++) {
        drawIo.shapes[i].render();
    }
}

function redoelement() {


    drawIo.shapes.push(redoElement.pop());

    drawIo.ctx.clearRect(0, 0, drawIo.canvas.width, drawIo.canvas.height);

    if(drawIo.selectElement) {
        drawIo.selectElement.render();
    }

    for(var i = 0; i < drawIo.shapes.length; i++) {
        drawIo.shapes[i].render();
    }
}

function newPic() {
    drawIo.shapes = [];
    drawIo.ctx.clearRect(0, 0, drawIo.canvas.width, drawIo.canvas.height);
}
