from flask import Flask, escape, request
app = Flask(__name__)

@app.route('/users/<string:nombre>')
def hello_world(nombre = None):
    return("Hola {}!".format(nombre))

if __name__ == "__main__":
    app.run()