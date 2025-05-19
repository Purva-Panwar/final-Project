const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
const upload = require("express-fileupload");

const Routes = require("./routes/Routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();


// const Upload = require("express-fileupload");
// app.use(Upload());
// CORS (Ensure proper setup)
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"] // Use HTTP instead of HTTPS
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(upload());  // Comment out if not needed

app.use('/api', Routes);
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
    })
    .catch(err => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    });




//youtube
// const express = require("express")
// const cors = require("cors")
// const { connect } = require("mongoose")
// require("dotenv").config()
// const upload = require("express-fileupload")

// const Routes = require("./routes/Routes")
// const { notFound, errorHandler } = require("./middleware/errorMiddleware")

// const app = express()

// app.use(cors()); // Allows all origins
// app.use(express.json());

// app.use(express.json({ extended: true }))
// app.use(express.urlencoded({ extended: true }))
// app.use(cors(
//     {
//         origin: ["https://localhost:3000"],
//         methods: "GET,POST,PUT,DELETE",
//         credentials: true
//     }
// ))
// app.use(upload())

// app.use('/api', Routes)
// app.use(notFound)
// app.use(errorHandler)



// connect(process.env.MONGO_URL).then(app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))).catch(err => console.log(err))

// //password
// //jIMybSmOsvkcr8qJ