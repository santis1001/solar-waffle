# solar-waffle
01 Project

# Description
# Project Requirements
* Use a CSS framework other than Bootstrap.

* Be deployed to GitHub Pages.
* Be interactive (i.e., accept and respond to user input).
* Use at least two [server-side APIs](https://coding-boot-camp.github.io/full-stack/apis/api-resources).
* Does not use alerts, confirms, or prompts (use modals).
* Use client-side storage to store persistent data.
* Be responsive.
* Have a polished UI.
* Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).
* Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).
# User Story
```
AS an astronomy enthusiast
I WANT to explore the solar system and learn about each planet's unique characteristics.
SO THAT I can deepen my understanding of our universe.
```
# Code Snippets

## HTML
### Structure
### Model HTML
## CSS


## Javascript
## Index script
* Document elements Variables
* Fetch the `planet.json` file and store it in a variable. This JSON contains an array of all the planets' names, 3D object location, and URL.
```js
var doc_model = document.getElementById('model');
var doc_container = document.getElementById('modelcontent');

var doc_planets=[];

var rotate;

var planets = fetch('./assets/planets.json')
.then(response => response.json())
.then(obj =>{
    planets = JSON.parse(JSON.stringify(obj));    
    main();
});
```
### `Main()` Function
* This function runs after the fetch of the planets is finished. It performs the following tasks:
* Runs a `forEach` loop that fills an array with the HTML `nav` elements.
* Runs a forEach loop that adds a mouseover event listener to every nav element.      
  * This event triggers the changeOBJ() function.
* Runs the `rotation()` function.
```js
function main(){

    planets.forEach(element => {
        doc_planets.push(document.getElementById(element.name));
    });
    doc_planets.forEach(element=>{
        element.addEventListener("mouseover",function(event){
            changeOBJ(event.target.textContent);
        });
    });
    
    rotation();
}
```
### `changeOBJ()` Function
* Gets the `textContent` of the nav element and compares it to the array to get its index.
* Stops the rotation interval.
* Clears the container that contains the 3D object of the planet.
* Creates a new HTML element for the object and fills its attributes with the necessary details for the selected planet.
* Restarts the `rotation()` function.
```js
function changeOBJ(e) {
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
```
### `rotation()` Function
* This function performs the following tasks:
* Starts an interval of 16ms that will add 1 degree in every interval, which is set into the `<model-viewer orientation="0 0 0">` attribute.
```js
function rotation(){
    var deg = 1;
    rotate = setInterval(function () {
            doc_model.setAttribute('orientation', '0 0 '+deg+'deg');
            deg++;  
    }, 16);   
}
```
## Planets script
* Document elements Variables, and URL search parameters.
* Document element Object with references for each information elements.
* Fetch the `planet.json` file and store it in a variable. This JSON contains an array of all the planets' names, 3D object location, and URL.
```js
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
    main();
});
```
### `main()` Functiom
This function runs after the fetch of the planets is finished. It performs the following tasks:
* Finds the index of the specified planet in the planets array.
* If the planet is within the array it will start to render element on screen for that planet 3D Object. 
* Runs the `rotation()` function
* If its not within the array the window will be redirected to a `error` page.
* At Last it set parametes to the button.
  * If the planet selected is the first planet the `previous` button option will be disable and the color will change. And the `next` button will be set to redirect to the next planet in the list.
  * If the planet selected isnt the first or last planet, both button will be set to redirect to the `previous` or `next` planet.
  * If the planet selected is the last planet the `next` button option will be disable and the color will change.And the `previous` button will be set to redirect to the next planet in the list.
```js
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
```
### `getPlanetInfo()` Function
This function fetch additional information about the specified planet from an external API. It performs the following tasks:
* Set the variables necessary for the completion of the API fetch.
* Use the variables to fetch the details of the selected planet and store the raw information in a variable.
* If the fetch is successful it will run `formatInfo(rawinfo)` funtion and send the rawinfo as a parameter.
```js
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
            formatInfo();
        });
        } else {

        }
    });
}

```
### `formatInfo()` Function
* function takes the raw information retrieved from the API and formats it for display on the webpage and stores it in a global object.
* Runs the `renderInfo()` Function.
```js
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
```
### `renderInfo()` Function
* function updates the HTML elements on the webpage with the formatted planet information.
* It uses the doc_information and formatedinfo objects to get the reference and values to be displayed on the screen.
```js
function renderInfo(){
    doc_information.d_name.textContent = formatedinfo.name;
    doc_information.d_mass.textContent = formatedinfo.mass;
    doc_information.d_superscript.textContent = formatedinfo.superscript;
    doc_information.d_radius.textContent = formatedinfo.radius;
    doc_information.d_period.textContent = formatedinfo.period;
    doc_information.d_semi_major_axis.textContent = formatedinfo.semi_major_axis;
    doc_information.d_temperature.textContent = formatedinfo.temperature;
    doc_information.d_distance_light_year.textContent = formatedinfo.distance_light_year;
}
```
### `rotation()` Function
* This function performs the following tasks:
* Starts an interval of 16ms that will add 1 degree in every interval, which is set into the `<model-viewer orientation="0 0 0">` attribute.
```js
function rotation(){
    var deg = 1;
    rotate = setInterval(function () {
            doc_model.setAttribute('orientation', '0 0 '+deg+'deg');
            deg++;            
    }, 16);   
}
```
## About us script


# Screenshots

# Video

# Pages Link
Website Link [Github Pages Link](https://santis1001.github.io/solar-waffle/)