const redis = require("redis");
const client = redis.createClient({
    host: "localhost",
    port: 6379,
});

client.on("error", function (err) {
    console.log(err);
});

module.exports.set = promisify(client.set).bind(client);
module.exports.get = promisify(client.get).bind(client);
module.exports.setex = promisify(client.setex).bind(client);
module.exports.del = promisify(client.del).bind(client);

//communicating with redis using node-style callback functions

// client.set("name", "Paul", (err, data) => {
//     console.log("data: ", data);
// });

// client.get("name", (err, data) => {
//     console.log("get name from redis: ", data);
// });

// client.del("name", (err, data) => {
//     console.log("delete name: ", data);
// });

// client.get("name", (err, data) => {
//     console.log("get name after del name: ", data);
// });
