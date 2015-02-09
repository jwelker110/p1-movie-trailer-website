import fresh_tomatoes
from media import media
import json


movies = json.load(open("movie_list.json"))

fresh_tomatoes.open_movies_page(movies)



