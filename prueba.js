/*
const express = require('express')
const app = express()
 
//EN EL BROWSER SOLO SE PUEDE PROBAR GET
app.get('/', function (req, res) {
  res.send('Hello World')
})
*/

/*
app.delete('/', function (req, res) {
  res.send('Hello DELETE')
})
*/


//app.listen(3000)

//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------

const express = require('express')
const app     = express()
//const port    = 3000

const http = require('http');
const normalizePort = require('normalize-port');
 
const port = normalizePort(process.env.PORT || '3000');


var mysql      = require('mysql');
var connection = mysql.createConnection({ 
  host     : 'testaws.cwyvtim77nro.us-east-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'Amazonbase2019',
  database : 'test'
});

 
connection.connect();

//40:00
//req es por convencion
//params es parte de express
//imporimio en consola otros datos


app.get('/producto/:id', (req, res) => 
//{ 
//        console.log(req);
        connection.query('SELECT * from productos where SKU='+req.params.id, 
            function (error, results, fields) { //fields campos que retorna, en este caso todos --> *
                console.log(error);
                if (error) 
                    res.send("no encontrado")
                else
                    res.send(results);
            }))

////////////////////////////////////////////////////////////////////////////////////////


app.post('/add/:nombre', function(req, res){    
    //req.assert('name', 'Name is required').notEmpty()           //Validate name
    //req.assert('email', 'A valid email is required').isEmail()  //Validate email
  
    var errors = req.validationErrors()
     
    if( !errors ) {   //No errors were found.  Passed Validation!
         
     /*
        var producto = {
            
            nombre ='fideo'
            precio = '30,6'        
            stock  = '50'
            
            //name: req.sanitize('name').escape().trim(),
            //email: req.sanitize('email').escape().trim()
        }
      */   //INSERT INTO productos  (Nombre,Precio,Stock) values ('esew', null, null)
     connection.query('INSERT INTO (Nombre,Precio,Stock) productos values("' +req.params.nombre +'", null,null)', 
                      function(err, result) {
                //if(err) throw err
                if (err) {
                    /*
                    req.flash('error', err)
                     
                    // render to views/user/add.ejs
                    res.render('customers/add', {
                        title: 'Add New Customer',
                        name: user.name,
                        email: user.email                    
                    })
                    */
                     res.send("error")
                } else {                
                   // req.flash('success', 'Data added successfully!');
                    //res.redirect('/customers');
                }
            })
    }
    else {  
        /*
        //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
         */
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        /*
        res.render('customers/add', { 
            title: 'Add New Customer',
            name: req.body.name,
            email: req.body.email
        })
        */
        
    }
})
 

















//no cambiar el orden, la mas general siempre va a ir abajo
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




