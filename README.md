## saqi-platform

### Git remotes to push deployments
- Main branch is deployed to the remote - https://git.heroku.com/saqi-platform.git
- triple-store-proc branch is deployed to the remote - https://git.heroku.com/saqi-rdfstore.git

### Deployment Links (Can be changed to custom domains later)
- Main branch contains scraping, cron jobs and platform interface code, deployed at this link - https://saqi-platform.herokuapp.com/
- Triple store is deployed in seperate jvm app using https://github.com/heroku/webapp-runner at - https://saqi-rdfstore.herokuapp.com/

### Steps to deploy
- Add heroku remote and push respective branch (will add cmmds later)
