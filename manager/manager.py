
from flask import Flask, request, Response
from flask_cors import CORS
import sqlalchemy as sql
from sqlalchemy import text, insert
from datetime import datetime, timedelta
import json
import sys

DATABASE_URL = "postgresql://postgres:password@postgresservice/postgres"
engine = sql.create_engine(DATABASE_URL)


app = Flask(__name__)
CORS(app)


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

@app.route("/get_event", methods=['GET'])
def get_event():

    try:

        event_id = request.args.get('event_id')

        sql_query = "SELECT * FROM events WHERE event_id = :event_id"

        with engine.connect() as conn:
            resultproxy = conn.execute(text(sql_query), event_id=event_id)
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

@app.route("/set_event", methods=['POST'])
def set_event():
    
    try:

        owner_id = request.args.get('owner_id')
        start_location = json.loads(request.args.get('start_location'))
        waypoints = json.loads(request.args.get('waypoints'))
        end_location = json.loads(request.args.get('end_location'))

        sql_query = "INSERT INTO events (owner_id, start_location, waypoints, end_location, creation_date, start_date) VALUES (:owner_id, :strt, :way, :endl, CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP - interval '10 day'));"

        with engine.connect() as conn:
                conn.execute(text(sql_query), owner_id=owner_id, strt=start_location, way=waypoints, endl=end_location)
                conn.close()
            
        return Response(status=200)
    
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

        sql_query = "SELECT * FROM users WHERE user_id = :user_id"

        with engine.connect() as conn:
            resultproxy = conn.execute(text(sql_query), user_id=user_id)
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

@app.route("/set_user", methods=['POST'])
def set_user():
    
    try:

        username = request.args.get('username') 
        icon = request.args.get('icon')
        location = json.loads(request.args.get('location'))

        sql_query = "INSERT INTO users (username, icon, location) VALUES (:username, :icon, :location);"

        with engine.connect() as conn:
                conn.execute(text(sql_query), username=username, icon=icon, location=location)
                conn.close()
            
        return Response(status=200)
    
    except Exception as e:

        return Response(e, mimetype='text/json', status=500)

@app.route("/update_user_location", methods=['POST'])
def update_user_location():

    # try:

        user_id = request.args.get('user_id')
        location = json.loads(request.args.get('location'))

        sql_query = "UPDATE users SET location = :location WHERE user_id = :user_id"

        with engine.connect() as conn:
            resultproxy = conn.execute(text(sql_query), location=location, user_id=user_id)
            conn.close()

        if resultproxy.rowcount < 1:
            raise ValueError('Invalid user_id')

        return Response(status=200)

    # except Exception as e:

    #     return Response(e, mimetype='text/json', status=500)

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

@app.route("/set_attendee_mapping", methods=['POST'])
def set_attendee_mapping():
    
    try:

        attendee_id = request.args.get('attendee_id')
        event_id = request.args.get('event_id')

        sql_query = "INSERT INTO attendee_mapping (attendee_id, event_id) VALUES (:attendee_id, :event_id);"

        with engine.connect() as conn:
                conn.execute(text(sql_query), attendee_id=attendee_id, event_id=event_id)
                conn.close()
            
        return Response(status=200)
    
    except Exception as e:

        return Response(e, mimetype='text/json', status=500)

@app.route("/get_attendee_locations", methods=['GET'])
def get_attendee_locations():

    try:

        event_id = request.args.get('event_id')

        sql_query = "SELECT * FROM users WHERE user_id IN (SELECT attendee_id FROM attendee_mapping WHERE event_id = :event_id)"

        with engine.connect() as conn:
            resultproxy = conn.execute(text(sql_query), event_id=event_id)
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