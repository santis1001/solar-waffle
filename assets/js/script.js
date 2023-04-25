const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const planet = urlParams.get('planet'); 
var doc_title = document.getElementById('planet');
doc_title.textContent = planet;

var doc_previous = document.getElementById('prev');
var doc_information = document.getElementById('info');
var doc_next = document.getElementById('next');


//window.location.href = "https://example.com";

var planets = [
    {   name:'Mercury',
        obj:'',        
        url:'./planet.html?planet=Mercury'
    },
    {   name:'Venus',
        obj:'',        
        url:'./planet.html?planet=Venus'
    },
    {   name:'Earth',
        obj:'',        
        url:'./planet.html?planet=Earth'
    },
    {   name:'Mars',
        obj:'',        
        url:'./planet.html?planet=Mars'
    },
    {   name:'Jupiter',
        obj:'',        
        url:'./planet.html?planet=Jupiter'
    },
    {   name:'Saturn',
        obj:'',        
        url:'./planet.html?planet=Saturn'
    },
    {   name:'Uranus',
        obj:'',        
        url:'./planet.html?planet=Uranus'
    },
    {   name:'Neptune',
        obj:'',        
        url:'./planet.html?planet=Neptune'
    }
]
try{
    if(planets.findIndex(obj  => obj .name === planet)!=-1){
        
    }else{
        window.location.href = "./404.html";
    }
    
        
    
}catch{console.log("error")}

