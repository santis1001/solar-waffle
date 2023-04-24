var doc_planets_cards = document.getElementById('cards');
var doc_planet_title = document.getElementById('main-title');
var doc_planet_model = document.getElementById('main-model');

var planets = [
    {name:'Sun',src:'./assets/models/assets/sol.gltf'},
    {name:'Mercury',src:'./assets/models/assets/mercury.gltf'},
    {name:'Venus',src:'./assets/models/assets/venus.gltf'},
    {name:'Earth',src:'./assets/models/assets/earth.gltf'},
    {name:'Mars',src:'./assets/models/assets/mars.gltf'},
    {name:'Jupiter',src:'./assets/models/assets/jupiter.gltf'},
    {name:'Saturn',src:'./assets/models/assets/saturn.gltf'},
    {name:'Uranus',src:'./assets/models/assets/uranus.gltf'},
    {name:'Neptune',src:'./assets/models/assets/neptune.gltf'},
];
var planets_triggers=[];

render_planets();

function planet_view(e){
    const index = planets_triggers.indexOf(e);

    doc_planet_title.textContent = planets[index].name;
    doc_planet_model.setAttribute('src', planets[index].src);

}
function render_planets(){
    doc_planets_cards.innerHTML = '';
    for(var i =0;i<planets.length;i++){
        var listelemnt = document.createElement('li');
        listelemnt.setAttribute('class', 'card');
        listelemnt.setAttribute('id', 'card-'+planets[i].name);

        
        var cont = document.createElement('div');

        var title = document.createElement('h3');
        title.setAttribute('class','card-title');
        title.textContent = planets[i].name;

        var dcont = document.createElement('div');
        dcont.setAttribute('class', 'card-content');

        var mview = document.createElement('model-viewer');
        mview.setAttribute('src', planets[i].src);
        mview.setAttribute('class', 'model-view');
        mview.setAttribute('orientation', '0 0 0');

        dcont.appendChild(mview);
        cont.appendChild(title);
        cont.appendChild(dcont);

        listelemnt.appendChild(cont);
        doc_planets_cards.appendChild(listelemnt);

        planets_triggers.push(document.getElementById('card-'+planets[i].name));
    }

    planets_triggers.forEach(element => {        
        element.addEventListener('click', function(event){planet_view(element)});
    });
}