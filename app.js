const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter
const express = require('express'); //Load express moudule which returns a function express
const app = express(); //express fucntion retuns object of type express,by convention we call the object as app.app object support varios method get,post,put

const logger = require('./logger');

//To enable parsing of JSON object in the body of request

//http://expressjs.com/en/api.html#express.json
app.use(express.json());
//http://expressjs.com/en/api.html#express.urlencoded
app.use(express.urlencoded({ extended: true }));

/*A middleware function is basically a function that takes a request object and return the response to client or either terminates the request/response cycle or passes control to another middleware function.Ex. Route Handler Function beacuse it take req as object and return the response to client.So it terminate the request response cycle.*/
//Another ex: express.json() when we call express.json() method this method return a middleware function the job of this middleware function is to read the request and if there is json object in the body of request it will parse the body of request into a json object then it will set it req.body property.
//express.json passes the json object to route handler function.It is builtin middleware function.
//Express application is a bunch of middleware function.
//A midleware function called in sequence

//Sattic is used to serve static data. To acess locahost:5000/readme.txt
app.use(express.static('public'));  //public is name of folder
//Coustom Middlware
app.use(logger);


app.use(function (req, res, next) {
    console.log("Authenticating");
    next();
});


const courses = [
    { id: 1, name: 'Maths' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Hindi' }
];

// First argument in get fuction is url or path.second parameter is a callback function which is called when we have http request to this endpoint '/'.This req object has bunch of properties ex.re
app.get('/', (req, res) => {
    res.send("Hello World");
});


//To define a parameter we use :id(id is name of parameter)  
// In order to read params we req.params.id
app.get('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send('Course Not Found');
    res.send(course);
});
//Multiple parameter
// localhost:3000/api/courses/2023/1
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
});
//QuerString : To read query params we use req.query
//localhost:3000/api/courses/2023/1?sortBy=name
app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query);
});


// Input valdation we joi; npm i joi
app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(404).send(result.error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);

});