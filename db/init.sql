-- CREATE DATABASE IF NOT EXISTS codrrdb
SELECT 'CREATE DATABASE cursojs'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cursojs')\gexec