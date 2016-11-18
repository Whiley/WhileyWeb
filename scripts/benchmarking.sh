#!/bin/sh

CODE="function+f(int+x)+->+(int+r)ensures+r+>=+0:++++if+x+>=+0:++++++++return+x++++else:++++++++return+0++++"
#CODE=""
HOST="http://whileylabs.com"
#HOST="http://whiley.org/play"
#HOST="localhost:8080"
FILE=$(cat test.whiley)

#curl --verbose --request POST -d "$FILE" -d 'false' $HOST/compile

ab -c 5 -n 100 -T 'application/x-www-form-urlencoded; charset=UTF-8' -p test.whiley $HOST/compile
