
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

    var tilesPerRow = 0;

    // Resize listener to account for changes in doc size
    $(window).resize(function () {
        if($(window).width() > 1199 && tilesPerRow != 4) {
            tilesPerRow = 4;
        }else if($(window).width() > 991 && $(window).width() < 1200 && tilesPerRow != 3){
            tilesPerRow = 3;
        } else if($(window).width() < 992 && $(window).width() > 639 && tilesPerRow != 2){
            tilesPerRow = 2;
        } else {
            return;
        }
        resizeTiles(tilesPerRow); // Tiles are the correct height for each row

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



