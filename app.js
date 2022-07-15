const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const morgan = require('morgan')
const app = express()
const port = 3000

    // information using ejs
    app.set('view engine', 'ejs') 
    //mmenggunakan ejs layouts
    app.use(expressEjsLayouts)
    // Memberikan akses terhadap folder public
    app.use(express.static('public'))
    // menampilkan Log activity
    app.use(morgan('dev'))
    app.set('layout', './layout/main-layout')
    // Middleware configuration
    app.use((req, res, next) => {
        console.log('Time:', Date.now())
        next()
      })

      //Membuat fungsi loader jsonnya
    const loadContact= ()=>{
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        const contacts =JSON.parse(file);
        return contacts;
      }


    app.get('/', (req, res) => {
    // res.send('Hello World!')
    // membuat array yang berisi objek
    // cont = [
    //     {
    //         name:'adi riyanto',
    //         email:'adi@gmail.com',
    //     },
    //     {
    //         name:'riyanto',
    //         email:'riyanto@gmail.com',
    //     },
    //     {
    //         name:'mamang',
    //         email:'Radi@gmail.com',
    //     },
    // ]
   
    

    res.render('index',{nama : "Adi Riyanto", title : "WebServer EJS", layout : "layout/main-layout"})
    })

    app.get('/about', (req, res) => {
        // res.send('This is about Page!')
        res.render('about', {title : "About", layout : "layout/main-layout"})
    })
  
    app.get('/contact', (req, res) => {
        // res.send('This is contact Page!')
        const contacts = loadContact();
        res.render('contact',{title : "Contact", layout : "layout/main-layout",contacts})
    })

    //Membuat reques
    app.get('/product/:id?', (req, res) => {
        // res.send('Product Id: ' + req.params.id + '<br>'
        // + 'Category Id : ' + req.params.idCat);
        let category = req.query.category;
        res.send(`Product Id : ${req.params.id} <br> Category Id : ${category}`);
    })

    app.use('/', (req,res)=>{
        res.status(404)
        res.send('Page Not found : 404')
    })

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })

    
  


// const http = require('http');   
// const port = 3000;
// const fs = require('fs'); 

// const findRespown = (url, res)=>{
    
//     fs.readFile(url,(err,data)=> {
        
//         if(err){
//             res.writeHead(404);
//             res.write('Error : page not found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     })
    
// }

// http
//     .createServer((req,res)=>{
        
//         //membuat fungsi validasi
//         const url = req.url;
//         console.log(url);
//         // Menambahkan validasi untuk setiap pagenya
//         if(url==='/about'){
//             // res.write('<h1>this is about page</h1>');
//             // res.end();
//             findRespown('./view/about.html',res);
//             // fs.readFile('./view/about.html',(err,data)=> {
//             //     validasiData(err,data);
//             // })
//         }else  if(url==='/contact'){
//             // res.write('<h1>this is contact page</h1>');
//             // res.end();
//             findRespown('./view/contact.html',res);
//             // fs.readFile('./view/contact.html',(err,data)=> {
//             //     validasiData(err,data);
//             // })

//         }else {
//             findRespown('./view/index.html',res);
//         // res.write('hello world');
//         // res.end();
//         }
//         // res.writeHead(200, { 
//         //     'Content-Type': 'text/html' });
        
//     })
//     // Memasukan Port yang akan di jalankan
//     .listen(port, ()=>{
//         console.log('Server listening on port 3000');
//     });