const express = require("express");
const app = express();
const hb = require("express-handlebars"); // require the templating engine we want to use: express-handlebars
const projects = require("./data");
const basicAuth = require("basic-auth");

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));
app.use(express.static("./public"));

const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!creds || creds.name != "name" || creds.pass != "password") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};
app.use("/about", auth);

// what res.render looks like in action
app.get("/", (req, res) => {
    res.render("welcome", {
        layout: "main",
        cohort: "adobo",
        title: "welcome",
        projects,
    });
});

app.get("/carousel", (req, res) => {
    console.log("get request on /carousel");
});

app.get("/about", (req, res) => {
    console.log("get request on /about");

    res.render("about", {
        title: "about",
        emojis: ["🦩", "🚀", "👽"],
    });
});

app.listen(8080, () => console.log("expressPortfolio server listening"));
