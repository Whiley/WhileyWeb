FROM openjdk:8-alpine

# Update image and install git
RUN apk update && apk add --no-cache apache-ant 

# Copy repository data from here
CMD mkdir /home/WhileyWeb
COPY . /home/WhileyWeb/

# Set the working directory
WORKDIR /home/WhileyWeb/
# Set the default command
CMD ["ant","run"]

# Expose port
EXPOSE 8080:80