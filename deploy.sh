#!/bin/bash
hostname=$(curl http://139.59.69.157/metadata/v1/hostname)
docker run -d -p 80:8080 --name openmct-"$hostname" effinbzz/backend:latest-prod
