#!/bin/bash

ID=$1
TITLE=$2
BACKEND_API=${LIKEDEMO_API:-http://localhost:8080/api}

curl -H "Content-type: application/json" -X PUT -d "{ title: '$TITLE' }" $BACKEND_API/posts/$ID; echo
