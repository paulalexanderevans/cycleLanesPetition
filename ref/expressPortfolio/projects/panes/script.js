(function () {
    var containerX;
    var containerWidth;
    var offset;
    var slider = $(".slider");
    var container = $(".container");
    var fotoContainer = $(".fotoContainer");

    slider.on("mousedown", function (e) {
        console.log("someone clicked on the slider");
        console.log(container.offset());
        // .offset() returns an object containing the properties top and left.
        // console.log(container.offset().left);
        containerX = container.offset().left;
        containerWidth = container.outerWidth(true);
        //  .offset(), which retrieves the current position relative to the document, including true in the brackets includes the margin within the width measurement, false (default) ommits it.
        var sliderX = slider.position().left;
        // .position() method allows us to retrieve the current position of an element (specifically its margin box) relative to the parent.
        var mouseX = e.clientX - containerX;
        offset = mouseX - sliderX;
        container.on("mousemove", drag);
        console.log(mouseX);
        e.preventDefault();
        // in this case prevents the mouse from selecting or highlighting the target object on click & drag
    });

    $(document).on("mouseup", function () {
        console.log("mouse released");
        container.off("mousemove");
    });

    function drag(e) {
        if (e.clientX > containerX + containerWidth) {
            return;
        }
        if (e.clientX < containerX) {
            return;
        }
        var px = e.clientX - containerX - offset + "px";
        slider.css({
            left: px,
        });
        fotoContainer.css({
            width: px,
        });
    }
})();
