const chalk = require("chalk");
const http = require("http");
const qs = require("querystring");

const server = http.createServer((request, response) => {
    request.on("error", (error) => console.log("error: ", error));
    response.on("error", (error) => console.log("error: ", error));

    if (request.method === "GET") {
        response.statusCode = 200;
        response.write(
            `
            <!doctype html>
            <html>
            <title>Colors</title>
            <form method="POST">
            <input type="text" name="text">
            <select name="color">
                <option value="red">red</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
                <option value="gray">gray</option>
                <option value="magenta">magenta</option>
                <option value="cyan">cyan</option>
            </select>
            <button type="submit">Go</button>
            </form>
            </html>
            `
        );
        response.end();
    } else if (request.method === "POST") {
        let body = "";
        request
            .on("data", (chunk) => {
                body += chunk;
            })
            .on("end", () => {
                // console.log("body inside the end listener: ", body);
                let str = qs.parse(body);
                // console.log("str: ", str);
                // console.log("str.text: ", str.text);
                let txt = str.text;
                // console.log("str.color: ", str.color);
                let colour = str.color;
                // console.log(chalk[colour](str.text));
                response.write(
                    `
                <!doctype html>
                <html>
                    <title>${txt}</title>
                    <a href="/" style="color:${colour}">${txt}</a>
                </html>
            `
                );
            });
    }
});

server.listen(8080, () => console.log("Colorful Console Listening"));

console.log(chalk.blue("hello chalk blue"));
