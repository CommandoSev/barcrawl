
from flask import Flask, request
import sqlalchemy as sql
from sqlalchemy import text, insert
from datetime import datetime, timedelta
import json

DATABASE_URL = "postgresql://postgres:password@postgresservice/postgres"
engine = sql.create_engine(DATABASE_URL)


app = Flask(__name__)


@app.route("/get_events", methods=['GET'])
def get_events():

    sql_query = "SELECT * FROM events"

    with engine.connect() as conn:
        resultproxy = conn.execute(text(sql_query))
        conn.close()

    d, a = {}, []
    for rowproxy in resultproxy:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)

    json_format = json.dumps(a, default=str)

    return json_format

@app.route("/get_attendee_mapping", methods=['GET'])
def get_attendee_mapping():

    sql_query = "SELECT * FROM attendee_mapping"

    with engine.connect() as conn:
        resultproxy = conn.execute(text(sql_query))
        conn.close()

    d, a = {}, []
    for rowproxy in resultproxy:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)

    json_format = json.dumps(a, default=str)

    return json_format

@app.route("/get_users", methods=['GET'])
def get_users():

    sql_query = "SELECT * FROM users"

    with engine.connect() as conn:
        resultproxy = conn.execute(text(sql_query))
        conn.close()

    d, a = {}, []
    for rowproxy in resultproxy:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)

    json_format = json.dumps(a, default=str)

    return json_format

@app.route("/get_user", methods=['GET'])
def get_user():

    user_id = request.args.get('user_id')

    sql_query = "SELECT * FROM users WHERE user_id = {}".format(user_id)

    with engine.connect() as conn:
        resultproxy = conn.execute(text(sql_query))
        conn.close()

    d, a = {}, []
    for rowproxy in resultproxy:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)

    json_format = json.dumps(a, default=str)

    return json_format

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

@app.route("/get_attendee_locations", methods=['GET'])
def get_attendee_locations():

    event_id = request.args.get('event_id')

    sql_query = "SELECT * FROM users WHERE user_id IN (SELECT attendee_id FROM attendee_mapping WHERE event_id = {})".format(event_id)

    with engine.connect() as conn:
        resultproxy = conn.execute(text(sql_query))
        conn.close()

    d, a = {}, []
    for rowproxy in resultproxy:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)

    json_format = json.dumps(a, default=str)

    return json_format


# # managerservice:5433/add_event?event_id=1&owner_id=1


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5433, debug=True)