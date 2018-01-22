from flask import Blueprint, render_template
from jinja2 import Template


mod = Blueprint('home', __name__, template_folder='templates')

@mod.route('/')
def homepage():
    return render_template('boot/index.html', my_list=[0,1,2,3,4])
