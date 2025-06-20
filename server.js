/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

mongoose.connect('mongodb://localhost:27017/quizapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


// Connect auth routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);  // register and login routes

// For quiz logic, keep your existing route
const quizApi = require('./routes/api');
app.use('/api', quizApi);


app.listen(5000, () => console.log('Server started on http://localhost:5000'));*/
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// MongoDB  mongodb+srv://quizuser:quiz1234@cluster0.g9qau7k.mongodb.net/quizapp?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect("mongodb+srv://quizuser:quiz1234@cluster0.g9qau7k.mongodb.net/quizapp?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB atlas connected '))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static assets from public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve register.html as homepage manually
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const quizApi = require('./routes/api');
app.use('/api', quizApi);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

