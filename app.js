const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoute');
const bookRoutes = require('./routes/bookRoute');
const borrowingRoutes = require('./routes/borrowingRoute');
const profileRoute = require('./routes/profileRoute');


const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes, profileRoute);
app.use('/books', bookRoutes);
app.use('/borrowing', borrowingRoutes);
// Protected routes


sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;