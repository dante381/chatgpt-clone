const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://naveen:anr666ANR@clustergodse.3wkbspw.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
  .once('open', () => console.log('Connected to the database!'))
  .on('error', err => console.log('Error with the database!', err));

