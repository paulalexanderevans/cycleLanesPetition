const https = require("https");
const { twitterKey, twitterSecret } = require("./secrets.json");
const util = require("util");

module.exports.getToken = util.promisify(getToken);

function getToken(callback) {
    const creds = `${twitterKey}:${twitterSecret}`;
    const encodedCreds = Buffer.from(creds).toString("base64");
    const config = {
        method: "POST",
        host: "api.twitter.com",
        path: "/oauth2/token",
        headers: {
            Authorization: `Basic ${encodedCreds}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    };
    function httpsRequestCallback(res) {
        if (res.statusCode !== 200) {
            callback(res.statusCode);
            return;
        }
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
            const parsedBody = JSON.parse(body);
            callback(null, parsedBody.access_token);
        });
        res.on("error", (err) => {
            console.log("err: ", err);
        });
    }
    const req = https.request(config, httpsRequestCallback);
    req.end("grant_type=client_credentials");
}

module.exports.getTweets = util.promisify(getTweets);
function getTweets(bearerToken, screenName, callback) {
    const https = require("https");
    const req = https.request(
        {
            method: "GET",
            host: "api.twitter.com",
            path: `"/1.1/statuses/user_timeline.json?screen_name=${screenName}&tweet_mode=extended"`,
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        },
        (res) => {
            if (res.statusCode !== 200) {
                callback(res.statusCode);
                return;
            }
            let tweets = "";

            res.on("data", (chunk) => (tweets += chunk));
            res.on("end", () => {
                const parsedTweets = JSON.parse(tweets);
                callback(null, parsedTweets);
                return parsedTweets;
            });
            res.on("error", (err) => console.log(err));
        }
    );
    req.end();
}

module.exports.filterTweets = filterTweets;
function filterTweets(tweets) {
    let output = {};
    console.log("tweets.length: ", tweets.length);
    // console.log("tweets[0].full_text: ", tweets[0].full_text);
    for (let i = 0; i < tweets.length; i++) {
        let text;
        if (tweets[i].full_text) {
            text = tweets[i].full_text;
        } else {
            text = tweets[i].text;
        }
        let url = tweets[i].entities.urls[0].url;
        let newText = text.replace(url, "");
        let outputText = "";
        if (tweets[i].entities.media) {
            let media = tweets[i].entities.media[0].url;
            let textNoMedia = newText.replace(media, "");
            outputText += textNoMedia;
        } else {
            outputText += newText;
        }
        let link = tweets[i].entities.urls[0].expanded_url;
        // output += `<a href="${link}">${outputText}</a>\n`;
        output[outputText] = link;
    }
    console.log("output: ", output);
    return output;
}
