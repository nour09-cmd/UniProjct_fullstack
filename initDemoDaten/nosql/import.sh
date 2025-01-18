#!/bin/bash
echo "🚀 Starting MongoDB Initialization with mongoimport..."

# Wait for MongoDB to be ready
until mongo --host mongo --eval "print('MongoDB is ready!')" &>/dev/null; do
  echo "⏳ Waiting for MongoDB to start..."
  sleep 5
done

# Import ladensprofiles.json
mongoimport --uri="mongodb://mongodbNonosql:27017/local" \
  --collection=ladensprofiles \
  --file=/docker-entrypoint-initdb.d/ladensprofiles.json \
  --jsonArray

# Import userprofiles.json
mongoimport --uri="mongodb://mongodbNonosql:27017/local" \
  --collection=userprofiles \
  --file=/docker-entrypoint-initdb.d/userprofiles.json \
  --jsonArray

echo "✅ MongoDB Initialization Complete!"
