
$(document).ready(function(){
    resizeTiles(); // Tiles are the correct height for each row

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

    // Animate in the movies when the page loads
    $('.movie-tile').hide().first().show("fast", function showNext() {
        $(this).next("div").show("fast", showNext);
    });

    // Set the 5-star rating for each movie on the page
    $(".raty").raty({score: function(){return $(this).attr('value')}},
            {target: $(this)});

    // Resize listener to account for changes in doc size
    $(window).resize(resizeTiles);

});

function resizeTiles(){
    var tiles = $('.movie-tile');
    var index;
    var heightChanged;

    // Setting the number of tiles in a row
    var tilesPerRow;
    if($(window).width() > 991){
        tilesPerRow = 3;
    } else if($(window).width() < 992 && $(window).width() > 639){
        tilesPerRow = 2;
    } else {
        return; // No need to resize since only one tile per row
    }

    // Iterate through the tiles in each row and resize according to tallest tile
    for(var i = 0; i < tiles.length; i += tilesPerRow) {
        heightChanged = false;

        // Getting max height of the tiles in the row
        var maxHeight = $(tiles[i]).outerHeight();
        for (index = i; index < tiles.length && index < i + tilesPerRow; index++) {
            if ($(tiles[index]).outerHeight() > maxHeight) {
                heightChanged = true;
                maxHeight = $(tiles[index]).outerHeight();
            }
        }

        if(heightChanged) {
            // Setting the height of tiles in the row
            for (index = i; index < tiles.length && index < i + tilesPerRow; index++) {
                $(tiles[index]).css('padding-top', (maxHeight - $(tiles[index]).outerHeight()) + 'px');
                $(tiles[index]).outerHeight(maxHeight);
            }
        }
    }
}



