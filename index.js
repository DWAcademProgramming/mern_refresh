const express = require('express');
const mongoose = require('mongoose'); 
const keys = require('./config/keys'); 
const cookieSession = require('cookie-session'); 
const passport = require('passport'); 
const bodyparser = require('body-parser'); 
require("./models/user.js");
require("./models/survey.js");
require("./services/passport.js");

mongoose.connect(keys.mongoURI); 

const app = express(); 

app.use(bodyparser.json()); 
app.use(
    cookieSession({
        maxAge: 30*24*60*60*10000,
        keys: [keys.cookieKey]
    })
); 
app.use(passport.initialize()); 
app.use(passport.session()); 

require('./routes/authRoutes')(app); 
require('./routes/billingRoutes')(app); 

const PORT = process.env.PORT || 5000; 
app.listen(PORT)