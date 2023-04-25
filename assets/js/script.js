const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const planet = urlParams.get('planet'); 
var doc_title = document.getElementById('planet');
doc_title.textContent = planet;
var doc_container = document.getElementById('container');
var doc_model = document.getElementById('model');
var doc_info = document.getElementById('infocard');

var doc_previous = document.getElementById('prev');
var doc_information = document.getElementById('info');
var doc_next = document.getElementById('next');

var this_planet;

var planets = fetch('./assets/planets.json')
.then(response => response.json())
.then(obj =>{
    planets = JSON.parse(JSON.stringify(obj));    
    console.log(planets);
    main();
});

function main(){
    const index = planets.findIndex(obj  => obj .name === planet);
    //console.log(index+' '+planets.length);
    for(var i =0;i<planets.length;i++){
        console.log('entro');
    }
    if(index!=-1){
        this_planet = planets[index];

        doc_container.innerHTML = '';
        
        var doc_modelCont = document.createElement('div');
        doc_modelCont.setAttribute('class','modelcontent');

        doc_model = document.createElement('model-viewer');
        doc_model.setAttribute('id','model')
        doc_model.setAttribute('src',''+this_planet.obj);
        doc_model.setAttribute('orientation', '0 0 0');
        doc_model.setAttribute('camera-controls', '');
        doc_model.setAttribute('touch-action', 'pan-y');


        doc_modelCont.appendChild(doc_model);

        doc_container.appendChild(doc_modelCont);
        doc_container.appendChild(doc_info);

        console.log(this_planet);
        rotation();

    }else{
        window.location.href = "./404.html";
    }
    
    if(index==0){
        doc_previous.setAttribute('style','background-color: var(--light-blue-color);');
        doc_previous.setAttribute('disabled','')
        doc_next.addEventListener("click", function() {
            window.location.href = planets[index+1].url;
        });
    }
    if(index==planets.length-1){
        doc_previous.addEventListener("click", function() {
            window.location.href = planets[index-1].url;
        });
        doc_next.setAttribute('style','background-color: var(--light-blue-color);');
        doc_next.setAttribute('disabled', '')
    }else{
        doc_previous.addEventListener("click", function() {
                window.location.href = planets[index-1].url;
            });
        
        doc_next.addEventListener("click", function() {
                window.location.href = planets[index+1].url;
            });
    }
}

function rotation(){
    var deg = 1;
    rotate = setInterval(function () {
            doc_model.setAttribute('orientation', '0 0 '+deg+'deg');
            deg++;  
            //console.log("entro");                                          
    }, 16);   
}