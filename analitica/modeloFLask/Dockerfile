# Use The Python3.7.2 container image
FROM python:3.7.2-stretch

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install the dependencies
RUN pip install -r requirements.txt

EXPOSE 5000

# Dockerfile - this is a comment. Delete me if you want.
ENTRYPOINT ["python"]

CMD ["run.py"]