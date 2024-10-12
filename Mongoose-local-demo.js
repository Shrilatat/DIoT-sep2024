var express = require('express');
var app = express();

const mongoose = require('mongoose');
const Contact = require('./model/contactmodel')

mongoose.connect('mongodb://127.0.0.1:27017/trgdb', 
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const newContact = new Contact({
    name:'Sunita',
    email:'sunita@gmail.com',
    phoneno:'9375654340'
});

newContact.save()
          .then(() => console.log('Contact created'))
          .catch(err => console.log(err));

Contact.find()
       .then(contacts => console.log(contacts))
       .catch(err => console.log(err));

Contact.findOneAndUpdate({name:'Soha'}, {name:'Shrilata'})
       .then(() => console.log('contact updated'))
       .catch(err => console.log(err));

Contact.deleteOne({name:'Sunita'})
       .then(() => console.log('contact deleted'))
       .catch(err => console.log(err));

app.listen(3030);
