const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

//GET REQUESTS

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if((name != undefined) && (job != undefined)){
        let result = findUserByNameAndJob(name, job);
        res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.delete('/users', (req, res) => {
    const id = req.query.id;
    if(id != undefined){
        let result = removeUserByID(id);
        res.send(result);
    }else{
        res.send(users);
    }
    
});


app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


//HELPER FUNCTIONS
function findUserByNameAndJob(name, job){
    return users['users_list'].filter( ((user) => user['name'] === name) && ((user)=> user['job'] === job));
}

function removeUserByID(id){
    return users['users_list'].filter( (user) => !(user['name'] === id)); 
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

//POST 
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = IDGen();
    addUser(userToAdd);
    res.status(201).end();
});

function addUser(user){
    users['users_list'].push(user);
}

//LISTEN REQUESTS
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

function IDGen(){
    return Math.floor(Math.random() * 101);
}

//USERs struct
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }