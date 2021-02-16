var express = require("express");
var app = express();
var cors = require('cors')

var bodyParser=require('body-parser');
const fs = require('fs');
app.use(cors())


// const url = localhost:4000/api/users/register;

// let getData = () => {
// axios.get(url)
//    .then(res => console.log(res.data))
//    .catch(err => console.log(err.data))
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', (req, res) => {
    var z= req.body;
    var k='';
    var tobeSent='';
    var cities=[];
    var citiestobeSent=[];
    for(i in z){k=i; console.log(k);}
   
    fs.readFile('cities.json', (err, data) => {
    var obj=JSON.parse(data);
    var cn=''
    for(i in obj){
      if(i===k)
    cn=obj[i].countryName;
    }
    for(i in obj){
      if(obj[i].countryName==cn){
         cities.push(obj[i]);
      }
    }
    for(i=0;i<5;i++){
      var random = Math.floor(Math.random() * cities.length);
      if(citiestobeSent.indexOf(cities[random]==-1)&&citiestobeSent.length <=5){
        citiestobeSent.push(cities[random])
      }
    }
   console.log(citiestobeSent);    
    res.send(citiestobeSent);
});
});

// fs.readFile('cities.json', (err, data) => {
//     var obj=JSON.parse(data);
//     var cn=''
//     for(i in obj){
//       if(i==='BBA')
//     cn=obj[i].countryName;
//     }
//     for(i in obj){
//       if(obj[i].countryName==cn){
//         console.log(obj[i].countryName)
//       }
//     }
    
//     })
app.listen(3000, () => {
 console.log("Server running on port 3000");
});