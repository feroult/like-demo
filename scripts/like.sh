#!/bin/bash

POST_ID="/posts/$1"
BACKEND_API=${LIKEDEMO_API:-http://localhost:8080/api}

curl -H "Content-type: application/json" -X POST -d "{ postId: '$POST_ID' }" $BACKEND_API/likes; echo
