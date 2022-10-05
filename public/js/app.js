

const weatherForecast=document.querySelector('form')
const search=document.querySelector('input')

const mes1=document.getElementById('message1')
const mes2=document.getElementById('message2')

weatherForecast.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    console.log(location);
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
    if(response.error){
        mes1.innerHTML=response.error;
        mes2.innerHTML=null;
    }  
    else{
    response.json().then((data)=>{
        if(data.error){
            mes1.innerHTML=data.error;
            mes2.innerHTML=null;
        }
        else{
        mes1.innerHTML=data.weather_update;
        mes2.innerHTML=data.location;
        }
    })
}
})

})