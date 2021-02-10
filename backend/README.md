![alt text](https://miro.medium.com/max/680/1*gPQDzHAT_df9y6491dhxag.png)

#### install deps 
 ``` 
yarn
```
#### Start the app 
``` 
npm run dev
```
#### Create admin (cli command)
``` 
npm cli create-admin
```
###User Apis
``` 
Create User : http://localhost:8080/user
{
    "userName" : "",
    "firstName": "",
    "lastName" : "",
    "email"    : "",
    "password" : ""
}
```
``` 
Login User : http://localhost:8080/user/login
{
    "email" : "",
    "password":""
}
```
``` 
List Users : http://localhost:8080/user
```
``` 
Update User : http://localhost:8080/user/{user_id}
{
    "userName" : "",
    "firstName": "",
    "lastName" : "",
    "email"    : "",
    "password" : ""
}
```
