CREATE TABLE users (
    user_id INTEGER PRIMARY KEY, 
    username VARCHAR, 
    icon VARCHAR,
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

INSERT INTO events (event_id, owner_id, start_location, waypoints, end_location, creation_date, start_date) VALUES (0001, 0001, '{1.0, 1.0}', '{{2.0, 2.0}, {3.0, 3.0}}', '{4.0, 4.0}', CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP - interval '10 day'));
INSERT INTO events (event_id, owner_id, start_location, waypoints, end_location, creation_date, start_date) VALUES (0002, 0001, '{20.0, 20.0}', '{{21.0, 21.0}, {22.0, 22.0}}', '{23.0, 23.0}', CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP - interval '10 day'));

INSERT INTO attendee_mapping (attendee_id, event_id) VALUES (0002, 0001);
INSERT INTO attendee_mapping (attendee_id, event_id) VALUES (0003, 0001);
INSERT INTO attendee_mapping (attendee_id, event_id) VALUES (0004, 0001);

INSERT INTO attendee_mapping (attendee_id, event_id) VALUES (0003, 0002);
INSERT INTO attendee_mapping (attendee_id, event_id) VALUES (0004, 0002);
INSERT INTO attendee_mapping (attendee_id, event_id) VALUES (0005, 0002);

INSERT INTO users (user_id, username, icon, location) VALUES (0001, 'alice', 'icon1', '{1.0, 2.0}');
INSERT INTO users (user_id, username, icon, location) VALUES (0002, 'bob', 'icon1', '{2.0, 3.0}');
INSERT INTO users (user_id, username, icon, location) VALUES (0003, 'charlie', 'icon1', '{3.0, 4.0}');
INSERT INTO users (user_id, username, icon, location) VALUES (0004, 'daron', 'icon1', '{4.0, 5.0}');
INSERT INTO users (user_id, username, icon, location) VALUES (0005, 'ella', 'icon1', '{5.0, 6.0}');