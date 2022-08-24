const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')
const app = express();

app.use(cors());
app.use(bodyParser());


// Database Connection

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '#21Alishba*',
    database:'mydb'

});

// Check Error

db.connect(err=>{
    if(err) (console.log('err'));
    console.log('database connected');
});

// get data

app.get('/task',(req , res)=>{
    let qr = `select *from TASKS`;
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err);
        }
      
            res.send({
               
                data : result
            })
    })
    console.log('get users');
})

// post data
app.post('/task', (req , res)=>{
    console.log(req.body, 'post data');
    let title = req.body.title;
    let content = req.body.content;
    let qr = `insert into TASKS(title , content)
                values('${title}','${content}')`
        db.query(qr, (err, result)=>{
            if(err){
            console.log(err);
                    }
            res.send({
                message: 'data inserted',
                  })
                    
                })
});
// Updata data
app.put('/task/:title' , (req, res)=>{
    console.log(req.body , 'updata data');
    let gtitle = req.params.title;
    let content = req.body.content;

    let qr =  `update TASKS set content = '${content}' where title = '${gtitle}'`
    db.query(qr , (err, result)=>{
        if(err){console.log(err);}
        res.send({
            message : 'data updated'
        })
    })
});

// Delete data
app.delete('/task/:title' , (req, res)=>{
    console.log(req.body , 'Delete data');
    let gtitle = req.params.title;
    let content = req.body.content;

    let qr =  `DELETE FROM TASKS where title = '${gtitle}'`
    db.query(qr , (err, result)=>{
        if(err){console.log(err);}
        res.send({
            message : 'data DELETED'
        })
    })
});

app.listen(3001 ,()=>{
    console.log('server running on port 3001')
});