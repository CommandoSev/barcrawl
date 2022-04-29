## Docker Compose

# Prepare the environment by removing pre existing docker compose
docker-compose rm -f

# Start up the docker compose image
docker-compose up --build -d

# Shut it down after it has been run
docker-compose stop -t 1


# Stop the network
docker-compose down



## postgres

# Access the postgres using postgres user
psql -U postgres

# List all databases
\l

# Switch to 'database'
\c ['database']

# List all tables available in current DB
\dt

