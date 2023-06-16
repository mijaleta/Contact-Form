
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



// Route for serving the contact form
app.get('/', (req, res) => {
  res.render('index');
});



// added code 
// Create a schema for the contact form
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
  });
  const Contact = mongoose.model('Contact', contactSchema);
app.post('/' , async(req, res) => {

    try {
        const newContact = new  Contact({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
          });
         await newContact.save();
        // Handle successful save
        res.render('success');
        // console.log("success");
        
        

      } catch (error) {
        res.render('error');
        // console.log("error")
        // res.render('error', { message: 'Error occurred while saving data', error: error });
      }
      
    })

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});








