from flask import Blueprint

mod = Blueprint('siete', __name__)

@mod.route('/tst')
def test():
    return '{tst : "You are in the api/tst"}'
