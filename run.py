from gym import app
import os


port = int(os.environ.get('PORT',8080))
app.run(host='0.0.0.0', port=port, debug='TRUE')
