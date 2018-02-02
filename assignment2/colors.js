
var colors = ['black', 'grey', 'white', 'blue', 'violet', 'cyan', 'yellow', 'orange'];



for(var i = 0; i < colors.length; i++) {
    var swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.backgroundColor = colors[i];
    swatch.addEventListener('click', setSwatch);
    document.getElementById('colors').appendChild(swatch);
}

function setColor(color) {
    drawIo.ctx.fillStyle = color;
    drawIo.ctx.strokeStyle = color;
    var active = document.getElementsByClassName('active')[0];
    if(active) {
        active.className = 'swatch';
    }
}

function setSwatch(e) {
    var swatch = e.target;
    setColor(swatch.style.backgroundColor);
    swatch.className += ' active';
}
