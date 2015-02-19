import webbrowser
import os
import re

# Styles and scripting for the page
main_page_head = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Movie Hub</title>

    <!-- Bootstrap 3 -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="lib/jquery.raty.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
    <script src="lib/jquery.raty.js"></script>
    <script src="js/script.js"></script>
</head>
'''

# The main page layout and title bar
main_page_content = '''

  <body>
    <!-- Trailer Video Modal -->
    <div class="modal" id="trailer">
      <div class="modal-dialog">
        <div class="modal-content">
          <a href="#" class="hanging-close" data-dismiss="modal" aria-hidden="true">
            <img src="https://lh5.ggpht.com/v4-628SilF0HtHuHdu5EzxD7WRqOrrTIDi_MhEG6_qkNtUK5Wg7KPkofp_VJoF7RS2LhxwEFCO1ICHZlc-o_=s0#w=24&h=24"/>
          </a>
          <div class="scale-media" id="trailer-video-container">
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Page Content -->
    <div class="container">
      <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand" href="#">Movies At The Hub</a>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
        <div class="row">
      {movie_tiles}
        </div>
    </div>
  </body>
</html>
'''

# A single movie entry html template
movie_tile_content = '''
<div class="row col-xs-12 col-sm-6 col-md-4 movie-tile text-center">
    <h2>{movie_title}</h2><h6>({genre}) {duration} mins</h6>
    <figure>
        <img class="movie-poster" src="{poster_image_url}" width="220" height="342">
    </figure>
    <div class="rating"></div>
    <p class="description">{movie_description}</p>
    <div class="rating-trailer">
    <a href="#" class="btn btn-primary btn-trailer" data-trailer-youtube-id="{trailer_youtube_id}" data-toggle="modal" data-target="#trailer">Trailer</a>
    <div class="raty" value="{rating}"></div>
    </div>
</div>
'''


def create_movie_tiles_content(movies):
    # The HTML content for this section of the page
    content = ''
    count = 0
    for movie in movies:
        # Extract the youtube ID from the url
        youtube_id_match = re.search(r'(?<=v=)[^&#]+', movie.trailer_youtube_url)
        youtube_id_match = youtube_id_match or re.search(r'(?<=be/)[^&#]+', movie.trailer_youtube_url)
        trailer_youtube_id = youtube_id_match.group(0) if youtube_id_match else None

        # Append the tile for the movie with its content filled in
        content += movie_tile_content.format(
            movie_title=movie.title,
            poster_image_url=movie.poster_image_url,
            trailer_youtube_id=trailer_youtube_id,
            movie_description=movie.description,
            rating=movie.quality_rating,
            duration=movie.duration,
            genre=movie.genre
        )

        # Add clear fix for proper alignment of movie tiles
        count += 1
        if count % 3 == 0:
            content += '''<div class="clearfix visible-md-block"></div>'''
        if count % 2 == 0:
            content += '''<div class="clearfix visible-sm-block visible-xs-block"></div>'''

    return content


def open_movies_page(movies):
    # Create or overwrite the output file
    output_file = open('index.html', 'w')

    # Replace the placeholder for the movie tiles with the actual dynamically generated content
    rendered_content = main_page_content.format(movie_tiles=create_movie_tiles_content(movies))

    # Output the file
    output_file.write(main_page_head + rendered_content)
    output_file.close()

    # open the output file in the browser
    url = os.path.abspath(output_file.name)
    webbrowser.open('file://' + url, new=2)  # open in a new tab, if possible