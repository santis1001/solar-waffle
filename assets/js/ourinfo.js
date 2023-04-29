const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const this_name = urlParams.get('prs'); 
var doc_title = document.getElementById('myname');

var doc_modelCont = document.getElementById('modelcontent');
var doc_info = document.getElementById('info-credit');
var doc_model = document.getElementById('model');
var d_name = document.getElementById('Name');
var d_git = document.getElementById('git');

var doc_sant = document.getElementById('Santiago');
var doc_edu = document.getElementById('Eduardo');

var info = fetch('./assets/aboutus.json')
.then(response => response.json())
.then(obj =>{
    info = JSON.parse(JSON.stringify(obj));    
    //console.log(info);
    main();
});

function main(){
    const index = info.findIndex(obj  => obj .short === this_name);
    var thisinfo;
    if(index!=-1){
        thisinfo = info[index];
        console.log(thisinfo);

        doc_title.textContent = ''+thisinfo.name;

        doc_modelCont.innerHTML = '';
        doc_modelCont.setAttribute('class','modelcontent');
        
        doc_model = document.createElement('model-viewer');
        doc_model.setAttribute('id','model')
        doc_model.setAttribute('src',''+thisinfo.obj);
        
        doc_modelCont.appendChild(doc_model);

        d_name.textContent = ''+thisinfo.name;
        console.log(thisinfo.git);
        d_git.setAttribute('href',thisinfo.git);

        doc_info.innerHTML = '';
        
        var createDiv = document.createElement('div');
        createDiv.setAttribute('class','line');
        
        var roll = document.createElement('p');
        roll.setAttribute('class','bold');
        roll.textContent = thisinfo.roll;
        
        createDiv.appendChild(roll);
        doc_info.appendChild(createDiv);
        var desc = thisinfo.description;
        console.log(thisinfo.description);
        for(var i=0;i<desc.length;i++){
            var createP = document.createElement('p');
            createP.setAttribute('class','line');
            createP.textContent = desc[i];
            
            doc_info.appendChild(createP);
        };


    }else{
        window.location.href = "./404.html";
    }
    
    if(index==0){
        doc_sant.setAttribute('style','background-color: var(--light-blue-color);');
        doc_sant.setAttribute('disabled','')     

        doc_edu.addEventListener("click", function() {
            window.location.href = "./aboutus.html?prs=eduardo";
        });
    }
    if(index==1){
        doc_edu.setAttribute('style','background-color: var(--light-blue-color);');
        doc_edu.setAttribute('disabled', '')

        doc_sant.addEventListener("click", function() {
            window.location.href = "./aboutus.html?prs=santiago";
        });
    }
}