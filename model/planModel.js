// Driver
const mongoose = require("mongoose");
// DB
const DB =
  "mongodb+srv://admin:PmceahDOpMfUhm2B@cluster0-h7iox.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(function(conn) {
    console.log("Plan DB connected");
    // console.log(conn.connection);
  })
  .catch({
    function(err) {
      console.log("Data Base could not be connected");
    }
  });
// document
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required Field"],
    maxlength: 40,
    unique: true
  },
  price: { type: Number, min: 20, default: 40 },
  description: { type: String, required: true },
  preference: {
    type: String,
    enum: ["Vegan", "Vegetarian", "Organic", "Non Veg", "Eggiterian"]
  },
  averagerating: { type: Number, default: 5 },
  duration: { type: Number }
});

// Collection
const planModel = mongoose.model("planModel", planSchema);
module.exports = planModel;
