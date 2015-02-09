import webbrowser


class Video:
    """This class provides a way to store video information"""

    def __init__(self, title, duration, description):
        self.title = title
        self.duration = duration
        self.description = description


class Movie(Video):
    """This class provides a way to store movie related information"""

    VALID_RATINGS = ["G", "PG", "PG-13", "R"]
    """Valid Ratings"""

    def __init__(self, title, duration, description, poster_image, trailer_youtube):
        Video.__init__(self, title, duration, description)
        self.poster_image_url = poster_image
        self.trailer_youtube_url = trailer_youtube

    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)
