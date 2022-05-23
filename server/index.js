const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require("dotenv/config");
const connectDB = require('./DB/connections');
connectDB();
const details = require('./DB/schema');
const registerRouter = require('./routes/webapp/register');
const addUsersRouter = require('./routes/desktopApp/addUsers');
const getUsersRouter = require('./routes/desktopApp/getUsers');
const getOrgId = require('./routes/desktopApp/getOrgId');
const createExam = require('./routes/desktopApp/createExam');
const viewExam = require('./routes/desktopApp/viewExam');

let port = 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    // credentials: true,
    })
);

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb' }));
app.use(express.urlencoded({limit: '10mb', extended: false }));
app.use(express.json());

app.use("/", registerRouter);
app.use("/addUser",addUsersRouter);
app.use("/getUsers", getUsersRouter);
app.use("/getOrgId", getOrgId);
app.use("/createExam", createExam);
app.use("/viewExam", viewExam);

const DB = "mongodb+srv://vikram:vikram1234@cluster0.eaasq.mongodb.net/ExamPortal?retryWrites=true&w=majority"

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({error:{
        message: error.message
    }});
});

  

app.listen(port, () => console.log("Example app listening on port ", port));