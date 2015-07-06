# Installation
Please  use one of the below options to install Trillion OpenFDA Visualization Platform


. Manual installation with Node.js and Bower 




### Manual installation with Node.js
It is assumed that [node.js  v0.10.36] is installed and configured on your system for these instructions.

#### Build
```
$ git clone git@github.com:trillion1-repos/18fpool1.git
$ cd 18fpoo1
$ npm install -g bower
$ npm install -g forever
$ npm install
$ bower install 
$ npm install -g forever
$ npm test
```

#### Run
```sh
$ forever start server.js
```
Once running the application can be accessed at -
* http://localhost:3000
* http://[your IP]:3000


[node.js  v0.10.36]:http://blog.nodejs.org/2015/01/26/node-v0-10-36-stable/
