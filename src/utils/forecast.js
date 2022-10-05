const request=require('request')
const forecast=(longitude,latitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=a8013d0d46d91aa1f91f257a51bcfaab&query="+longitude+","+latitude+"&units=m";
    request({url:url,json:true},(error,response)=>{
    // here error object will be populated only for os level error like network error etc....
    // if we didnt given location then in response itself we will have error key value we can access with that.
    if(error){
       callback("unable to connect to weather server...",undefined)
    }
    else if(response.body.error){
        callback("unable to find the the location",undefined)
    }
    else{
    callback(undefined,response.body.current.weather_descriptions[0]+" It is currently "+response.body.current.temperature+" degress out. It feels like "+response.body.current.feelslike+" degrees out")
    }
})

}

module.exports=forecast
