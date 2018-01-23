from flask import Blueprint, render_template

mod = Blueprint('login', __name__, template_folder='templates')

@mod.route('/')
def login():
    return render_template('boot/login.html',)

@mod.route('/loggedIn')
def loggedIn():
    return render_template('boot/loggedIn.html',)
