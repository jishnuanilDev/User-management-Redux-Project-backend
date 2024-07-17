const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const userRoute = require('./Routes/UserRoutes');
const adminRoute = require('./Routes/AdminRoutes')

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mern').then(()=>{
    console.log("Database connected")
}).catch(err=>{
    console.log(err.message);
})


app.use('/',userRoute);
app.use('/admin',adminRoute);




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));