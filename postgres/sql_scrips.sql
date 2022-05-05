CREATE TABLE users (
    user_id UUID DEFAULT gen_random_uuid (), 
    username VARCHAR, 
    icon VARCHAR,
    location FLOAT[],
    PRIMARY KEY (user_id)
    );

CREATE TABLE attendee_mapping (
    attendee_id UUID, 
    event_id UUID,
    PRIMARY KEY (attendee_id, event_id)
    );

CREATE TABLE events (
    event_id UUID DEFAULT gen_random_uuid (), 
    owner_id UUID, 
    start_location FLOAT[],
    waypoints FLOAT[][],
    end_location FLOAT[],
    creation_date TIMESTAMPTZ,
    start_date TIMESTAMPTZ,
    PRIMARY KEY (event_id)
    );

INSERT INTO users (username, icon, location) VALUES ('alice', 'icon1', '{1.0, 2.0}');
INSERT INTO users (username, icon, location) VALUES ('bob', 'icon1', '{2.0, 3.0}');
INSERT INTO users (username, icon, location) VALUES ('charlie', 'icon1', '{3.0, 4.0}');
INSERT INTO users (username, icon, location) VALUES ('daron', 'icon1', '{4.0, 5.0}');
INSERT INTO users (username, icon, location) VALUES ('ella', 'icon1', '{5.0, 6.0}');

INSERT INTO events (event_id, owner_id, start_location, waypoints, end_location, creation_date, start_date) VALUES ('6cbedd47-c97e-44ba-b235-d89f8934a542', (SELECT user_id FROM users LIMIT 1), '{1.0, 1.0}', '{{2.0, 2.0}, {3.0, 3.0}}', '{4.0, 4.0}', CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP - interval '10 day'));

INSERT INTO events (owner_id, start_location, waypoints, end_location, creation_date, start_date) VALUES ((SELECT user_id FROM users LIMIT 1), '{1.0, 1.0}', '{{2.0, 2.0}, {3.0, 3.0}}', '{4.0, 4.0}', CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP - interval '10 day'));
INSERT INTO events (owner_id, start_location, waypoints, end_location, creation_date, start_date) VALUES ((SELECT user_id FROM users LIMIT 1), '{20.0, 20.0}', '{{21.0, 21.0}, {22.0, 22.0}}', '{23.0, 23.0}', CURRENT_TIMESTAMP, (CURRENT_TIMESTAMP - interval '10 day'));

INSERT INTO attendee_mapping (attendee_id, event_id) VALUES ((SELECT user_id FROM users LIMIT 1), '6cbedd47-c97e-44ba-b235-d89f8934a542');
INSERT INTO attendee_mapping (attendee_id, event_id) VALUES ((SELECT user_id FROM users LIMIT 1 OFFSET 1), '6cbedd47-c97e-44ba-b235-d89f8934a542');
INSERT INTO attendee_mapping (attendee_id, event_id) VALUES ((SELECT user_id FROM users LIMIT 1 OFFSET 2), '6cbedd47-c97e-44ba-b235-d89f8934a542');