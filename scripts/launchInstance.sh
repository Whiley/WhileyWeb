#!/bin/sh

# This script launches a new AWS instance for running WhileyLabs.
# This not only launches an ec2 instance, but also initialises it with
# the necessary Ubuntu packages and clones the WhileyLabs repository.

# =====================================================================
# Config
# =====================================================================

TYPE=t2.micro             # Free tier
IMAGE=ami-9abea4fb        # Ubuntu-trusty 14.04
SECURITY_GROUP=WhileyLabs
KEYPAIR=WhileyLabs#1
LAUNCH_SCRIPT=configureInstance.sh

# =====================================================================
# Main
# =====================================================================

aws ec2 run-instances --image-id $IMAGE --instance-type $TYPE --key-name $KEYPAIR --security-groups $SECURITY_GROUP --user-data file://$LAUNCH_SCRIPT >> launch.log
