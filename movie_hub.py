import json

import fresh_tomatoes
from lib.media import movie


# Read movie from JSON file
movies = json.load(open("movie_list.json"))["movies"]

movie_list = []

for m in movies:
    movie_list.append(movie.Movie(m["title"],
                                  m["description"],
                                  m["poster_image"],
                                  m["youtube_trailer"],
                                  m["rating"],
                                  m["duration"],
                                  m["genre"]))

# generating the html for movie hub using the movie list
fresh_tomatoes.open_movies_page(movie_list)
