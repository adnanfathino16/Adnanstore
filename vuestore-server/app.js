const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

// setiap ada request yang dikirimkan melalui user / client harus bersifat tipe data JSON
app.use(express.json());
// supaya bisa menerima daya dari inputan form seperti bentuk file
app.use(express.urlencoded({ extended: true }));
//untuk bisa menampilkan file image dengan url /img
app.use("/img", express.static(path.join(__dirname, "./public/img")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((result) => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log("Cannot connect to database!", err);
    process.exit;
  });

// api endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to vuestore-server",
  });
});

require("./app/routes/product.route")(app);
require("./app/routes/order.route")(app);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
