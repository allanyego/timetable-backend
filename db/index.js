const mongoose = require("mongoose");

const password = "timetable-app";
const dbName = "test";
const mongoUrl = `mongodb+srv://timetable-app:${password}@cluster0.oqaiq.azure.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
