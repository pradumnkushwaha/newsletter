//jshint esversion:6

const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
// const e = require("express");
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req,res){
            res.sendFile(__dirname+"/signUp.html")
})


app.post('/',function(req, res)
{
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    
    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                 merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                 }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url ="https://us21.api.mailchimp.com/3.0/lists/ddb7ff371c";

    const options = {
        method: "POST",
        auth: "pradu:d74874a93bc4abb89bba278dad000b8a-us21"
    }

      const request  =  https.request(url, options ,function(response){
                response.on("data",function(data){
                    console.log(JSON.parse(data));
                })
        })
        request.write(jsonData);
        request.end();
});

app.listen(3000, function()
{
    console.log("3000 is reunning");
})

// api key  d74874a93bc4abb89bba278dad000b8a-us21

// audiance id   ddb7ff371c