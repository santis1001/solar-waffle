const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const planet = urlParams.get('planet'); 
var doc_title = document.getElementById('planet');
doc_title.textContent = planet;
var doc_container = document.getElementById('container');
var doc_model = document.getElementById('model');
var doc_info = document.getElementById('infocard');

var doc_previous = document.getElementById('prev');
var doc_information = {
    d_name : document.getElementById('name'),
    d_mass : document.getElementById('mass'),
    d_superscript : document.getElementById('superscript'),
    d_radius : document.getElementById('radius'),
    d_period : document.getElementById('period'),
    d_semi_major_axis : document.getElementById('semi_major_axis'),
    d_temperature : document.getElementById('temperature'),
    d_distance_light_year : document.getElementById('distance_light_year'),
};
var doc_next = document.getElementById('next');

var this_planet;

var planets = fetch('./assets/planets.json')
.then(response => response.json())
.then(obj =>{
    planets = JSON.parse(JSON.stringify(obj));    
    console.log(planets);
    main();
});

getPlanetInfo();
var rawinfo;
var formatedinfo;
function getPlanetInfo(){
    const name = planet;
    const apikey = 'zbWNexeBqsRfaHKFij9NkA==9qt3zabp9IB1swYI';

    const apiUrl = 'https://api.api-ninjas.com/v1/planets?name='+name;
    const headers = {
        'X-Api-Key': apikey,
        'Content-Type': 'application/json'
    };

    var fet = fetch(apiUrl,{method:'GET',headers:headers}).then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
            rawinfo=data[0];
            console.log(rawinfo);
            formatInfo();
        });
        } else {

        }
    });
}

function main(){
    const index = planets.findIndex(obj  => obj .name === planet);

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
function massCalc(mass){ 
    var num = (mass * 1.898)* Math.pow(10, 27);
    var fnum = num.toPrecision(4).split('e+');
    console.log(fnum);
    return fnum;
} 
function formatInfo(){
    formatedinfo = {
        name: rawinfo.name,
        mass: massCalc(rawinfo.mass)[0],  
        superscript : massCalc(rawinfo.mass)[1], 
        radius: ((rawinfo.radius)*69911).toFixed(2),
        period: rawinfo.period,
        semi_major_axis: ''+rawinfo.semi_major_axis,
        temperature: (rawinfo.temperature-273),
        distance_light_year: rawinfo.distance_light_year,        
    };
    renderInfo();
}
function renderInfo(){
    console.log(formatedinfo);

    doc_information.d_name.textContent = formatedinfo.name;
    doc_information.d_mass.textContent = formatedinfo.mass;
    doc_information.d_superscript.textContent = formatedinfo.superscript;
    doc_information.d_radius.textContent = formatedinfo.radius;
    doc_information.d_period.textContent = formatedinfo.period;
    doc_information.d_semi_major_axis.textContent = formatedinfo.semi_major_axis;
    doc_information.d_temperature.textContent = formatedinfo.temperature;
    doc_information.d_distance_light_year.textContent = formatedinfo.distance_light_year;
}
function rotation(){
    var deg = 1;
    rotate = setInterval(function () {
            doc_model.setAttribute('orientation', '0 0 '+deg+'deg');
            deg++;  
            //console.log("entro");                                          
    }, 16);   
}