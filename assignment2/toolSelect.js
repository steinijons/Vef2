var tools = ['pen', 'rectangle', 'circle', 'line', 'text']; 
 
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
    /*if(e.target.value == 'text'){ 
        //var textBoxAppear = document.createElement('input'); 
        //textBoxAppear.id = 'text'; 
        //textBoxAppear.type = 'text'; 
        textBoxAppear.name = 'text'; 
        textBoxAppear.value = 'Insert text here'; 
        document.getElementById('textbox').appendChild(textBoxAppear); 
    }     */
    
    drawIo.selectedShape = e.target.value;     
}