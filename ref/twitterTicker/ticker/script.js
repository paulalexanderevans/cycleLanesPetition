(function () {
    console.log("twitterticker");
    var ticker = $(".ticker");
    var headlines = ticker.find(".headlines");
    var links = headlines.find(".link");
    console.log(links);
    var left = headlines.offset().left;
    var linkWidth = links.eq(0).outerWidth();
    var animId;

    $.ajax({
        url: "/data.json",
        method: "GET",
        data: {
            limit: 20,
        },
        success: function (data) {
            // console.log(data);
            const entries = Object.entries(data);
            // console.log(entries);
            var htmlForHeadlines = "";
            for (const [text, link] of entries) {
                htmlForHeadlines += `<a class="link" href=${link}>${text}</a>\n`;
            }

            // console.log("html we will be injecting", htmlForHeadlines);
            headlines.html(htmlForHeadlines);
        },
    });

    headlines.on("mouseenter", function (e) {
        cancelAnimationFrame(animId);
    });

    headlines.on("mouseleave", function () {
        moveHeadlines();
    });

    moveHeadlines();

    function moveHeadlines() {
        left--;
        if (left < -linkWidth) {
            left += linkWidth;
            links.eq(0).appendTo(headlines);
            links = headlines.find(".link");
            linkWidth = links.eq(0).outerWidth();
        }
        headlines.css({
            left: left + "px",
        });
        animId = requestAnimationFrame(moveHeadlines);
    }
})();
