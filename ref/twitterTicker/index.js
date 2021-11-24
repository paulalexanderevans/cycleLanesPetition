const express = require("express");
const app = express();
const { getToken, getTweets, filterTweets } = require("./twitter");
app.use(express.static("./ticker"));

app.get("/data.json", (req, res) => {
    getToken()
        .then((bearerToken) => {
            return Promise.all([
                getTweets(bearerToken, "TheOnion"),
                getTweets(bearerToken, "TheOnion"),
                getTweets(bearerToken, "TheOnion"),
            ]);
        })
        .then((tweets) => {
            const cnn = tweets[0];
            const bbc = tweets[1];
            const onion = tweets[2];
            const allTweets = [...cnn, ...bbc, ...onion];
            // console.log("allTweets: ", allTweets);
            // const filteredTweets = filterTweets(allTweets);
            res.json(filterTweets(allTweets));
        })

        .catch((err) => {
            console.log("it failed :(", err);
            res.sendStatus(500);
        });
});
app.listen(8080, () => console.log("twitterTicker Server Listening..."));

// console.log("error getting tweets: ", err);
//                 res.sendStatus(500);
