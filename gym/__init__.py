from flask import Flask
app = Flask(__name__)

from gym.home.views import mod
from gym.api.views import mod


#Register the Home localhost:PORT/ route
app.register_blueprint(home.views.mod, url_prefix='/')
#Register the API route  localhost:PORT/api
app.register_blueprint(api.views.mod, url_prefix='/api')
