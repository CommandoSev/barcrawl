
from flask import Flask, request
import sqlalchemy as sql
from sqlalchemy import text
from datetime import datetime, timedelta
import json

DATABASE_URL = "postgresql://postgres:password@postgresservice/postgres"

engine = sql.create_engine(DATABASE_URL)

app = Flask(__name__)


@app.route("/", methods=['GET'])
def hello():
    return nice_json({
        "uri": "/",
        "subresource_uris": {
            "movies": "/movies",
            "movie": "/movies/<id>"
        }
    })


# managerservice:5433/add_event?event_id=1&owner_id=1

@app.route("/add_user", methods=['POST'])
def add_user():
    username = request.args['username']
    icon = request.args['icon']
    location = request.args['location']
    return True


@app.route("/add_event", methods=['POST'])
def add_event():
    event_id = request.args['event_id']
    owner_id = request.args['owner_id']
    start_location = [0, 0]
    waypoints = [[0, 20],[20, 20],[40, 20]]
    end_location = [40, 40]
    creation_date = datetime.now()
    start_date = datetime.now() + timedelta(days=10)

    sql_query = "INSERT INTO events ({} INTEGER, {} INTEGER, {} FLOAT[], {} FLOAT[][], {} FLOAT[], {} TIMESTAMPTZ, {} TIMESTAMPTZ)".format(event_id, owner_id, start_location, waypoints, end_location, creation_date, start_date)

    with engine.connect() as conn:
        conn.execute(text(sql_query))
        conn.commit()
        conn.close()
    
    return True


if __name__ == "__main__":
    app.run(port=5000, debug=True)