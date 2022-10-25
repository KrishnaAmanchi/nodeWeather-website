const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=a8013d0d46d91aa1f91f257a51bcfaab&query="+latitude+","+longitude+"&units=m";
    request({url:url,json:true},(error,{body})=>{
    // here error object will be populated only for os level error like network error etc....
    // if we didnt given location then in response itself we will have error key value we can access with that.
    if(error){
       callback("unable to connect to weather server...",undefined)
    }
    else if(body.error){
        
        callback("unable to find the the location",undefined)
    }
    else{
        
    callback(undefined,body.current.weather_descriptions[0]+", It is currently "+body.current.temperature+" degress out. There is "+body.current.precip+"% chance of rain")
    }
})

}

module.exports=forecast
