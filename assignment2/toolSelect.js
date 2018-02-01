var tools = ['pen', 'rectangle', 'circle', 'line', 'text']; 
var previuousTool; 
 
for(var i = 0; i < tools.length; i++) { 
    var tool = document.createElement('option'); 
    tool.id = tools[i] + 'button'; 
    tool.className = 'tool'; 
    tool.value = tools[i]; 
    tool.innerHTML = tools[i]; 
    //tool.addEventListener('click', setTool); 
    document.getElementById('DrawStyle').appendChild(tool);  
} 
 
var tool = document.getElementById('DrawStyle'); 
tool.addEventListener('click', setTool); 
 
function setTool(e) { 
    console.log(e.target.value); 
    if(e.target.value == 'text'){ 
        if(counter != 1){ 
            var textBoxAppear = document.createElement('input'); 
            textBoxAppear.id = 'text'; 
            textBoxAppear.type = 'text'; 
            textBoxAppear.name = 'text'; 
            textBoxAppear.value = 'Insert text here'; 
            document.getElementById('textbox').appendChild(textBoxAppear); 
        } 
        var counter = 1; 
         
    } 
 
    previuousTool = e.target.value; 
    drawIo.selectedShape = e.target.value;     
}