FROM ubuntu:16.04

# Update image and install git
RUN apt-get update -y && apt-get install -y \
    git \
    openjdk-8-jdk \
    ant

# Copy repository data from here
CMD mkdir /home/WhileyLabs
COPY . /home/WhileyLabs/

# Set the working directory
WORKDIR /home/WhileyLabs/
# Set the default command
CMD ["./scripts/docker.sh"]

# Expose port
EXPOSE 8080:80