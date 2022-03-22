## saqi-platform

### Git remotes to push deployments
- Main branch is deployed to the remote - https://git.heroku.com/saqi-platform.git
- triple-store-proc branch is deployed to the remote - https://git.heroku.com/saqi-rdfstore.git

### Deployment Links (Can be changed to custom domains later)
- Main branch contains scraping, cron jobs and platform interface code, deployed at this link - https://saqi-platform.herokuapp.com/
- Triple store is deployed in seperate jvm app using https://github.com/heroku/webapp-runner at - https://saqi-rdfstore.herokuapp.com/

### Steps to deploy
#### Add heroku git remotes
 ```
heroku git:remote -a saqi-platform
git remote rename heroku platform
heroku git:remote -a saqi-rdfstore
git remote rename heroku rdfstore
```

#### Push to remote
```
git push -f rdfstore triple-store-proc:main
git push -f platform main:main
```

### Deploy WAR file
Install heroku java
```
heroku plugins:install java
```

upload WAR file with app name
```
heroku deploy:war fuseki.war -a saqi-rdfstore
```

