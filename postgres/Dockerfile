FROM postgres:alpine
ENV POSTGRES_PASSWORD password
COPY postgres/sql_scrips.sql /docker-entrypoint-initdb.d/
EXPOSE 5432