const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
var mongoose = require('mongoose');
const port = 8000;





//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//for serving static file
app.use(express.urlencoded())

//PUG SPECIFIC CONFIGURATION OR STUFF
app.set('view engine', 'pug');//set the template engine as html

app.set('views', path.join(__dirname, 'view'))//Set the views directory

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/details', { useNewUrlParser: true });

// ENDPOINTS
app.get('/', (req, res)=>{ 
    const params = { }
    res.status(200).render('index.pug', params);
})
app.get('/address', (req, res)=>{ 
    const params = { }
    res.status(200).render('address.pug', params);
})







//Define mongoose schema
var addressSchema = new mongoose.Schema({
    name: String,
    pin: String,
    Street: String,
    landark: String,
    city: String,
    state: String,
    country: String,
    phone: String

});

var address = mongoose.model('address', addressSchema);




app.post('/details', (req, res) => {
    var myData = new address(req.body);
    myData.save().then(() => {
        res.redirect("/address")

    }).catch(() => {
        res.status(400).send("Item was not saved");
    })

});


app.get("/details", function (req, res) {
    address.find({}, function (err, docs) {
        if (err) {
            console.log(err);
        } 
        else {
            res.render("/address", { details:docs })
            console.log("Address fetched");
        }
    });
});




   


//START SERVER
app.listen(port, () => {
    console.log(`The application started succesfully in port ${port}`)
});

