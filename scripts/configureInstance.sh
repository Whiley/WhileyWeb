#!/bin/sh

# This script configures a new AWS instance to run WhileyLabs.  In
# particular, it installs all necessary packages, clones the Git
# repository and begins the server.

# =====================================================================
# Config
# =====================================================================

PACKAGES="openjdk-7-jdk git python-pip"
PYTHON_LIBS="cherrypy mako"
REPOSITORY="https://github.com/DavePearce/WhileyWeb.git"
USER=ubuntu

# =====================================================================
# Root (Commands run as root)
# =====================================================================

# Update all install packages
apt-get -y update

# Add all required Ubuntu packages
for PKG in $PACKAGES
do
    apt-get install -y $PKG
done

# Add all required Python libraries packages
for LIB in $PYTHON_LIBS
do
    pip install $LIB
done

# =====================================================================
# User
# =====================================================================
cd /home/$USER

# Clone the WhileyLabs code
sudo -u $USER git clone $REPOSITORY

# Copy config file
sudo -u $USER cp WhileyWeb/example-config.py WhileyWeb/config.py

# Launch the server...
cd WhileyWeb
./launcher.cgi
