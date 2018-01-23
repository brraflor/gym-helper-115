from flask import Blueprint, render_template

mod = Blueprint('login', __name__, template_folder='templates')

@mod.route('/')
def homepage():
    return render_template('boot/login.html',)
