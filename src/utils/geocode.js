const request=require('request')
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiMTliY2U3MDYyIiwiYSI6ImNsOGk2bXQ2aTBmdXEzb2xjN3FnajUydzAifQ.tax7erAf6HOigF0EV5Gl6g&limit=1"
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather services",undefined);
        }
        else if(body.features.length==0){
            callback("Enter correct address, try with another search",undefined)
        }
        else{
            
           callback(undefined,{
            
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
           });
        }
    })
}

module.exports=geocode