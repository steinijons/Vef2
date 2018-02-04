var fonts = ['Arial', 'calibri', 'Century Gothic', 'Comis Sans', 'Consolas', 'Courier', 'Dejavu Sans','Dejavu Serif'];
var currentFont;

for(var i = 0; i < fonts.length; i++) {
    var fontElem = document.createElement('option');
    fontElem.className = 'font'
    fontElem.value = fonts[i];
    //fontElem.addEventListener('onclick', setActiveFont);
    fontElem.innerHTML = fonts[i];
    document.getElementById('fonts').appendChild(fontElem);
}


var fontSelector = document.getElementById('fonts');
fontSelector.addEventListener('click', setActiveFont);

function setActiveFont(e){
   currentFont = e.target.value;
}
