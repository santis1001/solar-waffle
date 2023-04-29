var doc_model = document.getElementById('model');
var doc_container = document.getElementById('modelcontent');

var doc_planets=[];

var rotate;

var planets = fetch('./assets/planets.json')
.then(response => response.json())
.then(obj =>{
    planets = JSON.parse(JSON.stringify(obj));    
    console.log(planets);
    main();
});
function main(){

    planets.forEach(element => {
        doc_planets.push(document.getElementById(element.name));
    });
    doc_planets.forEach(element=>{
        element.addEventListener("mouseover",function(event){
            //console.log(event);
            changeOBJ(event.target.textContent);
        });
    });
    
    rotation();
}
function changeOBJ(e) {
    console.log(e);
    const index = planets.findIndex(obj  => obj.name == e)
    clearInterval(rotate);
    doc_container.innerHTML = '';
    doc_model = document.createElement('model-viewer');
    doc_model.setAttribute('id','model')
    doc_model.setAttribute('src',''+planets[index].obj);
    doc_model.setAttribute('orientation', '0 0 0');
    doc_container.appendChild(doc_model);
    rotation();
}
function rotation(){
    var deg = 1;
    rotate = setInterval(function () {
            doc_model.setAttribute('orientation', '0 0 '+deg+'deg');
            deg++;  
            //console.log("entro");                                          
    }, 16);   
}