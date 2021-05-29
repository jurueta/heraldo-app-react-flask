
FROM python:3.6

EXPOSE 5000

WORKDIR /app


COPY requirements.txt /app
RUN pip install -r requirements.txt


COPY main.py /app
CMD python main.py