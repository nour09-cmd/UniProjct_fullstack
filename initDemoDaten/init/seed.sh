#!/bin/bash
echo "Starting data import..."

# Importiere die ladensprofiles.csv in die Collection "ladensprofiles" der Datenbank "demo"
mongoimport --host localhost --db test --collection ladensprofiles --type csv --headerline --file /nosql/ladensprofiles.csv

# Importiere die userprofiles.csv in die Collection "userprofiles" der Datenbank "demo"
mongoimport --host localhost --db test --collection userprofiles --type csv --headerline --file /nosql/userprofiles.csv

echo "Data import completed."
