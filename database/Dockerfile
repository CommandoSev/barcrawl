FROM postgres-alpine
ENV POSTGRES_PASSWORD password
ENV POSTGRES_USER root
ENV POSTGRES_DB barcrawl_db
COPY *.sql /docker-entrypoint-initdb.d/