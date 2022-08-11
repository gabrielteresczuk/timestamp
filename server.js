const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/* ------------- methods ------------ */


app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });


app.get('/api',(req,res)=>{
    res.json({
        'unix':Date.now(),
        'utc':new Date().toUTCString()
    })
});

function dateIsValid(date) {
    return date instanceof Date && !isNaN(date);
}

app.get('/api/:date',(req,res)=>{

    let {date}= req.params;

    if(/\d{13}$/.test(date)){
        date= parseInt(date);
        if(dateIsValid(new Date(date))){
            res.json({
                'unix':date,
                'utc':new Date(date).toUTCString(),
            });
        }else{
            res.json({
                error : "Invalid Date" 
           });
        }
    } 
    else if(/\d{2}-\d{2}-\d{2}$/g.test(date)){
        if(dateIsValid(new Date(date))){
            res.json({
                'unix':Date.parse(date),
                'utc':new Date(date).toUTCString(),
            });
        }else{
            res.json({
                error : "Invalid Date" 
            });
        }
    }else{
       res.json({
             error : "Invalid Date" 
        });
    }


});

/* ------------ listener ------------ */

port = 8080;
let server = app.listen(port,()=>{
    console.log('server escuchando al puerto '+port);
});

server.on('error',(error)=>{console.log(error)});
