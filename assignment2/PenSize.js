

var setRadius = function(newRadius) {
    if(newRadius < minRadius){
        newRadius = minRadius;
    }else if(newRadius > maxRadius){
        newRadius = maxRadius;
    }
    radius = newRadius;
    drawIo.ctx.lineWidth = radius * 2;
    //radSpan.innerHTML = radius;
    radSpan.innerHTML = radius;
}


var minRadius = 0.5,
    maxRadius = 100,
    defaultRadius = 20,
    interval = 5,
    radSpan = document.getElementById('radval'),
    decRad = document.getElementById('decrad'),
    incRad = document.getElementById('incrad');

decRad.addEventListener('click', function() {
    setRadius(radius-interval)
});

incRad.addEventListener('click', function() {
    setRadius(radius+interval)
});

