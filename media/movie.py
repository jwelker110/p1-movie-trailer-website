import webbrowser


class Movie():

    def __init__(self, movie_title, movie_description, poster_image_url, movie_trailer,
                 movie_rating, movie_duration_minutes, movie_genre):
        self.title = movie_title
        self.description = movie_description
        self.poster_image_url = poster_image_url
        self.trailer_youtube_url = movie_trailer
        self.rating = movie_rating
        self.duration = movie_duration_minutes
        self.genre = movie_genre

    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)