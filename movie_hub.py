import fresh_tomatoes
from media import movie
import json


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

fresh_tomatoes.open_movies_page(movie_list)
