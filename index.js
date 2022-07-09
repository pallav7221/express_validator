const express = require("express");
const { body, validationResult } = require('express-validator');


const app = express();
const datas = []

app.use(express.json());

app.get("/", (req, res) => {
    return res.send(datas)
})

app.post("/data", [
    body('first_name').isLength({ min: 5, max: 30 }),
    body('last_name').isLength({ min: 5, max: 30 }),
    body('email').isEmail(),
    body('pincode').isLength({ min: 6, max: 6 }),
    body('age').isLength({ min: 1, max: 100 }),
    body('gender').isLength({ min: 3 }),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let pincode = req.body.pincode;
    let age = req.body.age;
    let gender = req.body.gender;

    datas.push({ first_name, last_name, email, pincode, age, gender })
    res.status(201).send("data is pushed")
})


app.listen(3000);