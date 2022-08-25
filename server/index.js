require("dotenv").config();
const cors = require("cors");
const express = require("express");
const path = require("path");
const connection = require("./database/MongoDB");

const users = require("./routes/users.routes");
const contact = require("./routes/contact.routes");
const packages = require("./routes/packages.routes");
const subscription = require("./routes/subscription.route");

const app = express();
app.use(express.json());
app.use(cors());

//Database connection
connection();

//application routes
app.use("/api/user", users);
app.use("/api/contact", contact);
app.use("/api/package", packages);
app.use("/api/subscription", subscription);

// --------------------------deployment------------------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
}
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// --------------------------deployment------------------------------

//Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
