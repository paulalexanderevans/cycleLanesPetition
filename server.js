const express = require("express");
const app = express();
const hb = require("express-handlebars");
const db = require("./db");
let secrets;
if (process.env.sessionSecret) {
    // in production mode
    secrets = process.env.sessionSecret;
} else secrets = require("./secrets").sessionSecret;
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bCrypt.js");
const csurf = require("csurf");
app.use(express.static("public/media"));
app.engine("handlebars", hb());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: false }));
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14,
        keys: ["key1", "key2"],
        secret: secrets,
    })
);
app.use(csurf());
app.use((req, res, next) => {
    res.set("x-frame-options", "deny");
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use(express.static("./public"));

// //authentication...could be useful for cheching cookies and redirecting
// const auth = function (req, res, next) {
//     const creds = basicAuth(req);
//     if (!creds || creds.name != "name" || creds.pass != "password") {
//         res.setHeader(
//             "WWW-Authenticate",
//             'Basic realm="Enter your credentials to see this stuff."'
//         );
//         res.sendStatus(401);
//     } else {
//         next();
//     }
// };
// app.use("/about", auth); //implementing above code

// app.use((req, res, next) => {
//     if (!req.cookies.funckyChicken) {
//         req.session.funckyChicken = "moaw";
//         return res.redirect(req.url);
//     }
// });
//petition

//ROUTES

app.get("/", (req, res) => {
    res.render("welcome", {
        layout: "main",
        title: "welcome",
    });
});

app.get("/register", (req, res) => {
    if (req.session.signatureID) {
        return res.redirect("/thanks");
    } else if (req.session.user_id) {
        return res.redirect("/login");
    }
    res.render("register", {
        layout: "main",
        title: "Register",
    });
});

app.post("/register", (req, res) => {
    hash(req.body.password)
        .then((hashedPW) => {
            db.register(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPW
            ).then((results) => {
                console.log("user_id: ", results.rows[0].id);
                req.session.user_id = results.rows[0].id;
                res.redirect("/profile");
            });
        })
        .catch((err) => {
            res.redirect("/login");
            console.log("err in hash: ", err);
        });
});

app.get("/profile", (req, res) => {
    if (!req.session.user_id) {
        return res.redirect("/register");
    }
    console.log("user_id: ", req.session.user_id);
    res.render("profile", {
        layout: "main",
        title: "Profile",
    });
});

app.post("/profile", (req, res) => {
    console.log("req.body.age: ", req.body.age);
    console.log("req.body.city: ", req.body.city);
    console.log("req.body.url: ", req.body.url);
    console.log("user_id: ", req.session.user_id);
    db.addDetails(
        req.body.age,
        req.body.city,
        req.body.url,
        req.session.user_id
    )
        .then((results) => {
            console.log("results: ", results);
            console.log("Profile updated");
            res.redirect("/petition");
        })
        .catch((err) => console.log("err in profile update: ", err));
});

app.get("/logIn", (req, res) => {
    res.render("login", {
        layout: "main",
        title: "Log In",
        welcome: true,
    });
    if (req.session.signatureID) {
        return res.redirect("/thanks");
    }
});

app.post("/login", (req, res) => {
    db.getHashedPW(req.body.email)
        .then((results) => {
            const hashFromDatabase = results.rows[0].password;
            compare(req.body.password, hashFromDatabase).then((match) => {
                if (match) {
                    console.log("it's a match");
                    console.log("user_id: ", results.rows[0].id);
                    req.session.user_id = results.rows[0].id;
                    res.redirect("/petition");
                    //redirect soemwhere & set a "logged-in" cookie with user id
                } else {
                    console.log("Incorrect password");
                    res.render("login", {
                        layout: "main",
                        title: "Log In",
                        error: true,
                    });
                }
            });
        })
        .catch((err) => console.log("err in hash: ", err));

    // res.sendStatus(200);
});

app.get("/petition", (req, res) => {
    console.log("req.session.user_id: ", req.session.user_id);
    res.render("petition", {
        layout: "main",
        title: "Petition",
    });
    // if (req.session.signatureID) {
    //     return res.redirect("/thanks");
    // }
});

app.post("/petition", (req, res) => {
    console.log("req.session.user_id: ", req.session.user_id);
    db.addSignature(req.session.user_id, req.body.signature)
        .then((results) => {
            req.session.signatureId = results.rows[0].id;
            res.redirect("/thanks");
        })
        .catch((err) => {
            console.log("error in addSignature: ", err);
            res.redirect("/thanks");
        });
});

app.get("/thanks", (req, res) => {
    console.log("req.session.signatureId: ", req.session.signatureId);
    console.log("req.session.user_id: ", req.session.user_id);
    db.getNameAndSignature(req.session.user_id)
        .then((results) => {
            // console.log("results: ", results.rows);
            res.render("thanks", {
                layout: "main",
                title: "Thank You",
                rowCount: results.rowCount,
                first: results.rows[0].first,
                last: results.rows[0].last,
                signature: results.rows[0].signature,
            });
        })
        .catch((err) => {
            console.log("error in getNamAndSignature: ", err);
        });
});

app.post("/thanks", (req, res) => {
    console.log("someone clicked the delete signature button");
    db.deleteSignature(req.session.user_id)
        .then(() => {
            req.session.signatureId = null;
            res.redirect("/petition");
        })
        .catch((err) => {
            console.log("error in deleteSignature: ", err);
            res.redirect("/thanks");
        });
});

app.get("/edit", (req, res) => {
    console.log("req.session.user_id: ", req.session.user_id);
    db.getUserInfo(req.session.user_id)
        .then((results) => {
            console.log("results.rows1: ", results.rows[0]);
            res.render("edit", {
                layout: "main",
                title: "Edit your Profile",
                first: results.rows[0].first,
                last: results.rows[0].last,
                email: results.rows[0].email,
                age: results.rows[0].age,
                city: results.rows[0].city,
                url: results.rows[0].url,
            });
        })
        .catch((err) => {
            console.log("error in getUserInfo: ", err);
        });
});

app.post("/edit", (req, res) => {
    if (req.body.password) {
        console.log("user updated password");
        hash(req.body.password)
            .then((hashedPW) => {
                db.updateInfoAndPW(
                    req.session.user_id,
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hashedPW
                );
            })
            .then(() => {
                console.log("users updated");
                db.upsertProfiles(
                    req.body.age,
                    req.body.city,
                    req.body.url,
                    req.session.user_id
                );
            })
            .then(() => {
                console.log("user_profile updated");
                res.redirect("/thanks");
            })
            .catch((err) => console.log("err in profile update: ", err));
    } else {
        console.log("user did not update password");
        db.updateInfoNoPW(
            req.session.user_id,
            req.body.first,
            req.body.last,
            req.body.email
        )
            .then(() => {
                console.log("users updated");
                db.upsertProfiles(
                    req.body.age,
                    req.body.city,
                    req.body.url,
                    req.session.user_id
                );
            })
            .then(() => {
                console.log("user_profile updated");
                res.redirect("/thanks");
            })
            .catch((err) => console.log("err in profile update: ", err));
    }
});

app.get("/signers", (req, res) => {
    db.getSigners()
        .then((results) => {
            console.log("results.rows: ", results.rows);
            res.render("signers", {
                layout: "main",
                title: "Signers",
                signers: results.rows,
            });
        })
        .catch((err) => {
            console.log("error in getNames: ", err);
        });
});

app.get("/signers/:city", (req, res) => {
    console.log("req.params: ", req.params.city);
    const city = req.params.city;
    db.getSignersByCity(city)
        .then((results) => {
            console.log("results.rows: ", results.rows);
            res.render("signersByCity", {
                layout: "main",
                signers: results.rows,
                city: city,
            });
        })
        .catch((err) => {
            console.log("err in filetering city: ", err);
        });
});

app.listen(process.env.PORT || 8080, () =>
    console.log("Petition Server is lstening on port 8080...")
);
