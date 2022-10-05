const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

app.set('view engine','hbs')

app.use(express.static(path.join(__dirname,'../public')))
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather",
        name:"Krishna",
        content_about:"weather-app"
    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        content_about:"weather forecasting",
        title:"About page",
        name:"Krishna"
    })
}) 
app.get("/weather",(req,res)=>{
    if(req.query.address){
        const add=req.query.address;
        geocode(add,(error,{latitude,longitude,location}={})=>{

            if(error){
                res.send({
                    error:"The address mentioned is not valid"
                })
            }
            else{
                forecast(longitude,latitude,(error,re)=>{
                    res.send({
                        weather_update:re,
                        latitude,
                        longitude,
                        location
                    })
                })
                
            }
        })
    }
    else{
        res.send({
            error:"address is not mentioned"
    })
    }
    
})
app.get("*",(req,res)=>{
    res.render('404',{
        name:"krishna",
        content_about:"Page Not Found",
        title:"404"
    })
})

app.get("/help/*",(req,res)=>{
    res.render('404',{
        name:"krishna",
        content_about:"Help page is not found",
        title:"404"
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})