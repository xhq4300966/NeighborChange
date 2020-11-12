let express = require('express');
let app = express ();
let bodyParser = require('body-parser');


//DB initialization
let Datastore = require('nedb');
db = {};
db.users = new Datastore('path/to/users.db');
db.items = new Datastore('path/to/items.db');

//load each database
db.users.loadDatabase();
db.items.loadDatabase();


app.use(bodyParser.json());

app.listen(3000, ()=> {
    console.log('listening at localhost:3000');
})

app.use('/', express.static('public'));

// Add a route on a server that listens for a POST request
app.post('/accountLog', (req, res)=>{
    console.log(req.body);

    let currentDate = Date();
    let obj = {
        date: currentDate,
        account: req.body
    }

    //insert account data into the database
    db.users.insert(obj, (err, newDocs)=> {
        console.log('new register info inserted');
        if(err){
            res.json({task: "task failed"});
        } else {
            res.json({task: "success"});
        } 
    })
})


//Pull out the list of accounts registered
app.get('/getAccounts', (req, res)=> {
    db.users.find({}, (err, docs) =>{
        if(err){
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }
        // console.log(docs);
    })
})


//Check whether an account is already registered
app.post('/accountCheck', (req, res)=> {
    console.log(req.body.emailEntered);
    db.users.find({'account.emailName':req.body.emailEntered}, (err, docs) =>{
        console.log(docs);
        //'emailName' : 'req.body.emailEntered'
        if(err){    
            console.log("error!");
        }

        if(docs.length<1){
            console.log("no account");
            res.json({success : false});
        } else {
            console.log("account existed");
            res.json({success : true});
            // window.prompt("There is no account found, you will be directed to creating a  new account!");
        }
    })
})




// //insert account data into the database
// db.insert(obj, (err, newDocs)=> {
//     console.log('new document inserted');
//     if(err){
//         res.json({task: "task failed"});
//     } else {
//         res.json({task: "success"});
//     } 
// })


app.get('/getAccount', (req,res)=> {

    db.users.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }
    })

})

app.post('/itemLog', (req, res)=>{
    console.log(req.body);

    let currentDate = Date();
    let obj = {
        date: currentDate,
        account: req.body
    }

    //insert account data into the database
    db.items.insert(obj, (err, newDocs)=> {
        console.log('new item info inserted');
        if(err){
            res.json({task: "task failed"});
        } else {
            res.json({task: "success"});
        } 
    })
})

app.get('/getItems', (req, res)=>{
    // console.log(req)
    db.items.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "task failed"})
        } else {
            let obj = {data: docs};
            res.json(obj);
        }
    })
})


app.post('/deleteItem', (req, res)=>{
    console.log(req.body.itemDescrip);

    // //delete corresponding data from the database
    db.items.remove({"account.itemDescrip": itemDescrip}, {}, function (err, numRemoved) {
        console.log('data removed');
        if(err){
            res.json({task: "failed"});
        } else {
            res.json({task: "success"});
        } 
    })
})
