CREATE TABLE users (
    user_id INTEGER PRIMARY KEY, 
    username VARCHAR, 
    icon BYTEA,
    location FLOAT[]
    );

CREATE TABLE attendee_mapping (
    attendee_id INTEGER, 
    event_id INTEGER,
    PRIMARY KEY (attendee_id, event_id)
    );

CREATE TABLE events (
    event_id INTEGER PRIMARY KEY, 
    owner_id INTEGER, 
    start_location FLOAT[],
    waypoints FLOAT[][],
    end_location FLOAT[],
    creation_date TIMESTAMPTZ,
    start_date TIMESTAMPTZ
    );