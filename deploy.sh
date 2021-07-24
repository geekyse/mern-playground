hostname=$(curl http://169.254.169.254/metadata/v1/user-data)
docker run -d -p 80:8080 --name openmct-"$hostname" Ec-App/backend:"$hostname"
