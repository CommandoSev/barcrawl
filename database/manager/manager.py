
from flask import Flask, request
import sqlalchemy as sql
from sqlalchemy import text, insert
from datetime import datetime, timedelta

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

@app.route("/add_test", methods=['GET'])
def add_test():
    sql_query = "CREATE TABLE test (test_id INTEGER, test2_id INTEGER)"

    with engine.connect() as conn:
        conn.execute(text(sql_query))
        conn.close()
    
    return 'Sucess: Made table'


@app.route("/add_event", methods=['GET'])
def add_event():
    event_id = 1
    owner_id = 1
    start_location = [0, 0]
    waypoints = [[0, 20],[20, 20],[40, 20]]
    end_location = [40, 40]
    creation_date = datetime.now()

    sql_query = "INSERT INTO events (event_id, owner_id, start_location, waypoints, end_location, creation_date, start_date) VALUES ({}, {}, :strt, :way, :endl, CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP - interval '10 day'));".format(event_id, owner_id, creation_date)

    with engine.connect() as conn:
            conn.execute(text(sql_query), strt=start_location, way=waypoints, endl=end_location)
            conn.close()
        
    return 'Made Event'


# # managerservice:5433/add_event?event_id=1&owner_id=1


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5433, debug=True)