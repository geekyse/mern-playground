![alt text](https://miro.medium.com/max/680/1*gPQDzHAT_df9y6491dhxag.png)

# Tech stack:
``` 
expressJs Nodejs Typescript reactjs babel mongoose jest
```

# Some docker combinations that help a lot:
```
 - kill all running containers with docker kill $(docker ps -q)
 - delete all stopped containers with docker rm $(docker ps -a -q)
 - delete all images with docker rmi $(docker images -q)
 - update and stop a container that is in a crash-loop with docker update --restart=no && docker stop
 - bash shell into container docker exec -i -t /bin/bash - if bash is not available use /bin/sh
 - bash shell with root if container is running in a different user context docker exec -i -t -u root /bin/bash
```
