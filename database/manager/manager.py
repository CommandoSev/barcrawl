
from flask import Flask, request, Response
import sqlalchemy as sql
from sqlalchemy import text, insert
from datetime import datetime, timedelta
import json

DATABASE_URL = "postgresql://postgres:password@postgresservice/postgres"
engine = sql.create_engine(DATABASE_URL)


app = Flask(__name__)


@app.route("/get_events", methods=['GET'])
def get_events():

    try:

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

        return Response(json_format, mimetype='text/json', status=200)

    except Exception as e:

        return Response(e, mimetype='text/json', status=500)

@app.route("/get_attendee_mapping", methods=['GET'])
def get_attendee_mapping():

    try:

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

        return Response(json_format, mimetype='text/json', status=200)

    except Exception as e:

        return Response(e, mimetype='text/json', status=500)

@app.route("/get_users", methods=['GET'])
def get_users():

    try:

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

        return Response(json_format, mimetype='text/json', status=200)

    except Exception as e:

        return Response(e, mimetype='text/json', status=500)

@app.route("/get_user", methods=['GET'])
def get_user():

    try:

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
        
        if len(a) < 1:
            raise ValueError('Invalid user_id')

        json_format = json.dumps(a, default=str)

        return Response(json_format, mimetype='text/json', status=200)

    except Exception as e:

        return Response(e, mimetype='text/json', status=500)

@app.route("/update_user_location", methods=['POST'])
def update_user_location():

    try:

        user_id = request.args.get('user_id')
        location = [float(request.args.get('lng')), float(request.args.get('lat'))]

        sql_query = "UPDATE users SET location = :location WHERE user_id = {}".format(user_id)

        with engine.connect() as conn:
            resultproxy = conn.execute(text(sql_query), location=location)
            conn.close()

        if resultproxy.rowcount < 1:
            raise ValueError('Invalid user_id')

        return Response(status=200)

    except Exception as e:

        return Response(e, mimetype='text/json', status=500)

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

    try:

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

        if resultproxy.rowcount < 1:
            raise ValueError('Invalid user_id')

        json_format = json.dumps(a, default=str)

        return Response(json_format, mimetype='text/json', status=200)

    except Exception as e:

        return Response(e, mimetype='text/json', status=500)


# # managerservice:5433/add_event?event_id=1&owner_id=1


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5433, debug=True)