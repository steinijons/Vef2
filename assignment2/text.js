
var fonts = ['Arial', 'calibri', 'Century Gothic', 'Comis Sans', 'Consolas', 'Courier', 'Dejavu Sans','Dejavu Serif'];

for(var i = 0; i < fonts.length; i++) {
    var fontElem = document.createElement('option');
    fontElem.className = 'font'
    fontElem.value = fonts[i];
    fontElem.addEventListener('onclick', setActiveFont);
    fontElem.innerHTML = fonts[i];
    document.getElementById('fonts').appendChild(fontElem);    
}

function setFont(font) {
    drawIo.ctx.font = font;
    var active = document.getElementsByClassName('active')[0];
    if(active) {
        active.className = ''
    }
}

function setActiveFont(e){
    console.log(e.target);
    console.log("bla");
    var activeFont = e.target;
    activeFont.className += ' active';
    setFont(activeFont.value);
}

