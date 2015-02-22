# p1-movie-trailer-website
Movie Trailer Website for the Udacity Full Stack Web Development Course

# Overview
`movie_hub.py` uses `fresh_tomatoes.py` to generate movie tiles that are displayed on the viewport. The movies are contained within `movie_list.json`.

# Instructions
1. Download and install [python](http://en.wikibooks.org/wiki/Choose_Your_Own_Pyventure#Installing_Python).
2. [Clone](https://github.com/jwelker110/p1-movie-trailer-website.git) or [download](https://github.com/jwelker110/p1-movie-trailer-website/archive/master.zip) the repository.
3. [Execute](https://opentechschool.github.io/python-beginners/en/getting_started.html#running-python-files) `movie_hub.py`.
4. `index.html` will be created in the same directory.

If you would like to add your own movies, they can be added in the `movie_list.json` file. All fields given are required. Movie Poster Images should be downloaded and saved in the `img` folder. Example: 
```
{
      "title": "My Movie Title",
      "description": "This is my custom movie",
      "poster_image": "img/myCustomMovieImage.jpg",
      "youtube_trailer": "www.youtube.com/myMovieTrailer",
      "rating": 3.5 (out of 5 stars),
      "duration": 137 (in minutes),
      "genre": "Custom Movie Genre"
    }
```

you can view the site demo [here](http://jwelker110.github.io/p1-movie-trailer-website/)
