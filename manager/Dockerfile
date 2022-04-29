FROM python:3.8-alpine
WORKDIR /
COPY manager/requirements.txt .
RUN pip install -r requirements.txt
COPY manager/manager.py /
EXPOSE 5433
CMD python manager.py