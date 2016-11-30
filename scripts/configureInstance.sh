#!/bin/sh

# This script configures a new AWS instance to run WhileyLabs.  In
# particular, it installs all necessary packages, clones the Git
# repository and begins the server.

# =====================================================================
# Config
# =====================================================================

PACKAGES="openjdk-8-jdk git ant"
REPOSITORY="https://github.com/Whiley/WhileyLabs.git"
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

# =====================================================================
# User
# =====================================================================
cd /home/$USER

# Clone the WhileyLabs code
sudo -u $USER git clone $REPOSITORY

# Launch the server...
cd WhileyLabs
ant run
