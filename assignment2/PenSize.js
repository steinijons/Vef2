<<<<<<< HEAD
var setRadius = function(newR) {
    if(newR < minR){
        newR = minR;
    }else if(newR > maxR){
        newR = maxR;
    }
    radius = newR;
    drawIo.ctx.lineWidth = radius * 2;
    //radSpan.innerHTML = radius;
    radval.innerHTML = radius;
}
var minR = 0.5,
    maxR = 50,
    interval = 2,
    radval = document.getElementById('radval'),
    decRad = document.getElementById('decrad'),
    incRad = document.getElementById('incrad');

decRad.addEventListener('click', function() {
    setRadius(radius-interval)
});

incRad.addEventListener('click', function() {
    setRadius(radius+interval)
});
=======


var setRadius = function(newR) {
    if(newR < minR){
        newR = minR;
    }else if(newR > maxR){
        newR = maxR;
    }
    radius = newR;
    drawIo.ctx.lineWidth = radius * 2;
    //radSpan.innerHTML = radius;
    radval.innerHTML = radius;
}


var minR = 0.2,
    maxR = 50,
    interval = 2,   
    radval = document.getElementById('radval'),
    decRad = document.getElementById('decrad'),
    incRad = document.getElementById('incrad');

decRad.addEventListener('click', function() {
    setRadius(radius-interval);
});

incRad.addEventListener('click', function() {
    setRadius(radius+interval);
});

>>>>>>> d2e45ba4288aab2e4055cbfae299c3040bdf7b8d
