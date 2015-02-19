import fresh_tomatoes
from media import movie
import json

# reading movie details from json
movies = json.load(open("movie_list.json"))["movies"]

movie_list = []

# iterating through each json object and adding it to the movie list
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
