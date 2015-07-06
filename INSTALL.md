# Installation
Please  use one of the below options to install Trillion OpenFDA Visualization Platform


. Manual installation with Node.js and Bower 


```

### Manual installation with Node.js
It is assumed that [node.js] [bower] are installed and configured on your system for these instructions.

#### Build
```sh
$ git clone git@github.com:trillion1-repos/18fpool1.git
$ cd 18fpoo1
$ npm install
$ bower install 
$ npm install -g forever
$ npm test
```

#### Run
```sh
$ forserver start server.js
```
Once running the application can be accessed at -
* http://localhost:3000
* http://[your IP]:3000


