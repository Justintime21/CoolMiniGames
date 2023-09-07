const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const port=8000;
const mongoose=require('mongoose');

main().catch(err => console.log(err));
async function main(){
        await mongoose.connect('mongodb://127.0.0.1:27017/coolmini');

}


const registerSchema=new mongoose.Schema({
    Name:String,
    Email:String,
    password:String,
    confirmpassword:String,
    phone:Number,
    gender:String
});

const loginsignup=mongoose.model('loginsignup',registerSchema);

const contactSchema= new mongoose.Schema({
    name:String,
    email:String,
    age:String,
    message:String

});

const contact=mongoose.model('contact',contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
});
app.get('/aboutus',(req,res)=>{
    const params={};
    res.status(200).render('aboutus.pug',params);
});

app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
});

app.get('/loginsignup',(req,res)=>{
    const params={};
    res.status(200).render('loginsignup.pug',params);
});
app.get('/play',(req,res)=>{
    const params={};
    res.status(200).render('play.pug',params);
});
app.get('/snake',(req,res)=>{
    const params={};
    res.status(200).render('snake.pug',params);
});
app.get('/tictactoe',(req,res)=>{
    const params={};
    res.status(200).render('tictactoe.pug',params);
});
app.get('/pikath',(req,res)=>{
    const params={};
    res.status(200).render('pikathunder.pug',params);
});

app.post('/register',(req,res)=>{
    var logdata=new loginsignup(req.body);
    logdata.save().then(()=>{
        res.send('Your Data has been saved')
    }).catch(()=>{
        res.status(400).send('There was an error');
    });
});

app.post('/contact',(req,res)=>{
    var condata=new contact(req.body);
    condata.save().then(()=>{
        res.send(' your message has been saved to the database');
    }).catch(()=>{
        res.status(400).send(' there was an error');
    });
});

app.listen(port,()=>{
    console.log(`application is running on ${port}`);
});