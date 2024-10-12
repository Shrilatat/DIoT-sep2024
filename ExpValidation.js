const express = require('express')
const app = express()

const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())

app.get('/form', function (req, res) {
	res.sendFile('/validation_demo.html' , { root : __dirname});
});

app.post("/form",[
           check('name')
               .isLength({ min: 3 })
               .withMessage('Name must be greater than 3 characters'),
           check('password')
               .isLength({ min: 8, max: 10 })
               .withMessage('Password length should be 8 to 10 characters')
               .matches('[0-9]').withMessage('Password Must Contain a Number')
               .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter'),
           check('email').isEmail(),
           check('age').isNumeric()
          ],
         (req, resp) => {
          const errors = validationResult(req)
          if (!errors.isEmpty()) {
            return resp.status(422).json({ errors: errors.array() })
          }
        
          const name  = req.body.name
          const password = req.body.password
          const email = req.body.email
          const age   = req.body.age
         })

app.listen(3030, function(){
    console.log("server listening on port 3030")
})


