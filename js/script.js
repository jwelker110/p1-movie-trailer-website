
$(document).ready(function(){

    // Pause the video when the modal is closed
    $(document).on('click', '.hanging-close, .modal-backdrop, .modal', function (event) {
        // Remove the src so the player itself gets removed, as this is the only
        // reliable way to ensure the video stops playing in IE
        $("#trailer-video-container").empty();
    });

    // Start playing the video whenever the trailer modal is opened
    $(document).on('click', '.btn-trailer', function (event) {
        var trailerYouTubeId = $(this).attr('data-trailer-youtube-id');
        var sourceUrl = 'http://www.youtube.com/embed/' + trailerYouTubeId + '?autoplay=1&html5=1';
        $("#trailer-video-container").empty().append($("<iframe></iframe>", {
            'id': 'trailer-video',
            'type': 'text-html',
            'src': sourceUrl,
            'frameborder': 0
        }));
    });

    //Animate in the movies when the page loads
    //$('.movies').hide().first().show("fast", function showNext() {
    //    $(this).next("div").show("fast", showNext);
    //});

    // Set the 5-star rating for each movie on the page
    $(".raty").raty({score: function(){return $(this).attr('value')}},
            {target: $(this)});

    var breakpoint = 0;

    // Resize listener to account for changes in doc size
    // Only called when breakpoints are reached
    $(window).resize(function () {
        if (window.matchMedia("screen and (min-width: 1200px)").matches && breakpoint != 1200) {
            breakpoint = 1200;
            console.log("min: 1200");
            resizeTiles(3); // Current tiles in the row
        } else if (window.matchMedia("screen and (min-width: 992px) and (max-width: 1199px)").matches && breakpoint != 992) {
            breakpoint = 992;
            console.log("min: 992 max: 1199");
            resizeTiles(3); // Current tiles in the row
        } else if (window.matchMedia("screen and (min-width: 668px) and (max-width: 991px)").matches && breakpoint != 668) {
            breakpoint = 668;
            console.log("min: 668 max: 991");
            resizeTiles(2); // Current tiles in the row
        } else {
            return;
        }


    });

    $(window).trigger('resize');

});

function resetTileSize(){
    var tiles = $('.movie-tile');
    // Resetting height back to default height
    for(var i = 0; i < tiles.length; i++){
        $(tiles[i]).css('padding-top', '0');
    }
}

function resizeTiles(tilesPerRow){
    console.log("resize called");
    resetTileSize();
    var tiles = $('.movie-tile');
    var index;
    var heightChanged;
    var currentHeight;

    // Iterate through the tiles in each row and resize according to tallest tile
    for(var i = 0; i < tiles.length; i += tilesPerRow) {
        heightChanged = false;

        // Getting max height of the tiles in the row
        var maxHeight = $(tiles[i]).outerHeight();
        for (index = i; index < tiles.length && index < i + tilesPerRow; index++) {
            currentHeight = $(tiles[index]).outerHeight();
            if (currentHeight != maxHeight) {
                heightChanged = true;
            }
            if (currentHeight > maxHeight) {
                maxHeight = currentHeight;
            }
        }

        if(heightChanged) {
            // Setting the height of tiles in the row
            for (index = i; index < tiles.length && index < i + tilesPerRow; index++) {
                $(tiles[index]).css('padding-top', (maxHeight - $(tiles[index]).outerHeight()) + 'px');
            }
        }
    }
}



