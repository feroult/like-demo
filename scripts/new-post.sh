#!/bin/bash

CONTENT=$1
BACKEND_API=${LIKEAPP_API:-http://localhost:8080/api}

curl -H "Content-type: application/json" -X POST -d "{ content: '$CONTENT' }" $BACKEND_API/posts; echo
