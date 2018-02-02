// Download the image
// fékk aðstoð héðan
// https://jsfiddle.net/V6ufG/729/

var savedPic = document.getElementById('saveAsButton'); // find the saveAsbutton
savedPic.addEventListener('click', function (ev) {
  savedPic.href = canvas.toDataURL();
  savedPic.download = "myArt.png";
}, false);

// Save the image
// fékk aðstoð héðan
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
document.getElementById('saveButton').onclick =
function () {
  localStorage.setItem(canvas, canvas.toDataURL());
};

// Load image
// fékk aðstoð héðan
// https://stackoverflow.com/questions/20507534/how-to-save-and-load-html5-canvas-to-from-localstorage
var dataURL = localStorage.getItem(canvas);
var getImg = new Image;
document.getElementById('loadButton').onclick =
function () {
  getImg.src = dataURL;
  getImg.onload = function () {
    drawIo.ctx.drawImage(getImg, 0,0);
  };
};
