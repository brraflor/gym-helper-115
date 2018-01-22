from flask import Flask
app = Flask(__name__)

from gym.home.views import mod

app.register_blueprint(home.views.mod, url_prefix='/')
