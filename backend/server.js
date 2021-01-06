const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const path = require('path');
// const helmet = require('helmet');

const app = express();
app.use(cors());

connectDB();

app.use(express.json({ extended: false }));
// app.use(helmet());

// Define Routes
app.use('/api/sign-up', require('./routes/api/users'));
app.use('/api/sign-in', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/profile'));
app.use('/api/googleLogin', require('./routes/api/googleLogin'));

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;