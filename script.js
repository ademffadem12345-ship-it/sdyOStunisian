// Open/Close Windows
function openWindow(id){
    const w = document.getElementById(id);
    w.style.display='flex';
    addToTaskbar(id);
}
function closeWindow(id){
    const w = document.getElementById(id);
    w.style.display='none';
    removeFromTaskbar(id);
}

// Clock
function updateClock(){
    const now = new Date();
    const h = now.getHours().toString().padStart(2,'0');
    const m = now.getMinutes().toString().padStart(2,'0');
    const s = now.getSeconds().toString().padStart(2,'0');
    document.getElementById('clock').innerText = h+':'+m+':'+s;
}
setInterval(updateClock,1000);
updateClock();

// Drag Windows
let dragItem=null, offsetX, offsetY;
document.querySelectorAll('.window-header').forEach(h=>{
    h.onmousedown=function(e){
        dragItem=h.parentElement;
        offsetX=e.clientX-dragItem.offsetLeft;
        offsetY=e.clientY-dragItem.offsetTop;
    }
});
document.onmouseup=function(){dragItem=null;}
document.onmousemove=function(e){
    if(dragItem){
        dragItem.style.left=(e.clientX-offsetX)+'px';
        dragItem.style.top=(e.clientY-offsetY)+'px';
    }
}

// Taskbar apps
function addToTaskbar(id){
    const tb=document.getElementById('taskbarApps');
    if(!document.getElementById('tb-'+id)){
        const div=document.createElement('div');
        div.id='tb-'+id;
        div.innerText=id;
        div.style.margin='0 5px';
        div.style.cursor='pointer';
        div.onclick=()=>{toggleWindow(id)};
        tb.appendChild(div);
    }
}
function removeFromTaskbar(id){
    const el=document.getElementById('tb-'+id);
    if(el) el.remove();
}
function toggleWindow(id){
    const w=document.getElementById(id);
    w.style.display = (w.style.display==='flex') ? 'none' : 'flex';
}

// Terminal simulation
const terminalOut=document.getElementById('terminalOutput');
document.getElementById('terminalInput').addEventListener('keydown',function(e){
    if(e.key==='Enter'){
        const cmd=this.value.trim();
        if(cmd==='ls'){terminalOut.innerHTML+='<div>file1.txt  file2.py  folder1/</div>';}
        else if(cmd==='python'){terminalOut.innerHTML+='<div>Python 3.11.0 (simulated) ></div>';}
        else{terminalOut.innerHTML+=`<div>Command not found: ${cmd}</div>`;}
        terminalOut.scrollTop=terminalOut.scrollHeight;
        this.value='';
    }
});

// Python IDE simulation
function runPython(){
    const code=document.getElementById('pythonCode').value;
    const output=document.getElementById('pythonOutput');
    output.innerHTML=`<div>Output (simulated): ${code}</div>`;
}
