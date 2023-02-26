const express = require('express'); //Load express moudule which returns a function express
const router = express.Router();
const Joi = require('joi');//joi module return a Class and By covention class name start with capital letter

const courses = [
    { id: 1, name: 'Maths' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Hindi' }
];



//To define a parameter we use :id(id is name of parameter)  
// In order to read params we req.params.id
router.get('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send('Course Not Found');
    res.send(course);
});
//Multiple parameter
// localhost:3000/api/courses/2023/1
router.get('/:year/:month', (req, res) => {
    res.send(req.params);
});
//QuerString : To read query params we use req.query
//localhost:3000/api/courses/2023/1?sortBy=name
router.get('/:year/:month', (req, res) => {
    res.send(req.query);
});


// Input valdation we joi; npm i joi
router.post('/', (req, res) => {
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

router.post('/', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


module.exports = router;