# hash-gen

This is a tool for generating hash and salt for monorail.json configure file
that is used by RackHD on-http project.

Link to [monorail.json](https://github.com/RackHD/RackHD/blob/master/packer%2Fansible%2Froles%2Fmonorail%2Ffiles%2Fmonorail.json)

## Output from the project

Giving that the password you wanted to use for RackHD is PASSWORD, you will
get following output from this project, that are configuration items needed
in following monorail.json:

* authPasswordSalt: The salt used to generate the password hash. It's base64
coded. It's better to be a random value.
* authPasswordHash: The hash generated from PASSWORD and authPasswordSalt
using crypto.pbkdf2. It's base 64 coded.


## User preference input to the project

* password: the user password that needs to generate hash from
* generateRandomSalt: specify whether users want to generate a random salt
using this project, or they prefer to use salt defined by themselves.
    * true: Need a generated random salt. This is the default value.
    * false: user want to use their own salt.
* userSalt: specify a non-empty string value as a salt to generate the hash,
if generateRandomSalt is set false.

## How to use it

1. checkout the project from github

```
git checkout https://github.com/cgx027/hash-gen.git
```

2. Install npm packages

```
npm install
```

3. modify user preferences

Open up hash-gen.js and modify the value of variable password, generateRandomSalt
and userSalt as you like. No need to modify anything else unless you know what you
are doing.

4. run the project and get a result

```
onrack@~/github/hash-gen> node hash-gen.js
salt =  zlxkgxjvcFwm0M8sWaGojh25qNYO8tuNWUMN4xKPH93PidwkCAvaX2JItLA3p7BSCWIzkw4GwWuezoMvKf3UXg==
hash =  KcBN9YobNV0wdux8h0fKNqi4uoKCgGl/j8c6YGlG7iA0PB3P9ojbmANGhDlcSBE0iOTIsYsGbtSsbqP4wvsVcw==
```

5. Fill the value of salt and hash to authPasswordSalt and authPasswordHash in
/opt/onrack/etc/monorail.json file of your local RackHD on-http project.

an instance of monorail.json file:
```
{
    "CIDRNet": "172.31.128.0/22",
    "amqp": "amqp://localhost",
    "apiServerAddress": "172.31.128.1",
    "apiServerPort": 9080,
    "broadcastaddr": "172.31.131.255",
    "dhcpGateway": "172.31.128.1",
    "dhcpProxyBindAddress": "172.31.128.1",
    "dhcpProxyBindPort": 4011,
    "dhcpSubnetMask": "255.255.252.0",
    "gatewayaddr": "172.31.128.1",
    "httpEndpoints": [
        {
            "address": "0.0.0.0",
            "port": 8080,
            "httpsEnabled": false,
            "proxiesEnabled": true,
            "authEnabled": false,
            "routers": "northbound-api-router"
        },
        {
            "address": "172.31.128.1",
            "port": 9080,
            "httpsEnabled": false,
            "proxiesEnabled": true,
            "authEnabled": false,
            "routers": "southbound-api-router"
        }
    ],
    "httpDocsRoot": "./build/apidoc",
    "httpFileServiceRoot": "./static/files",
    "httpFileServiceType": "FileSystem",
    "httpProxies": [{
        "localPath": "/coreos",
        "server": "http://stable.release.core-os.net",
        "remotePath": "/amd64-usr/current/"
    }],
    "httpStaticRoot": "/opt/monorail/static/http",
    "minLogLevel": 3,
    "authUsername": "admin",
    "authPasswordHash": "KcBN9YobNV0wdux8h0fKNqi4uoKCgGl/j8c6YGlG7iA0PB3P9ojbmANGhDlcSBE0iOTIsYsGbtSsbqP4wvsVcw==",
    "authPasswordSalt": "zlxkgxjvcFwm0M8sWaGojh25qNYO8tuNWUMN4xKPH93PidwkCAvaX2JItLA3p7BSCWIzkw4GwWuezoMvKf3UXg==",
    "authTokenSecret": "RackHDRocks!",
    "authTokenExpireIn": 86400,
    "mongo": "mongodb://localhost/pxe",
    "sharedKey": "qxfO2D3tIJsZACu7UA6Fbw0avowo8r79ALzn+WeuC8M=",
    "statsd": "127.0.0.1:8125",
    "subnetmask": "255.255.252.0",
    "syslogBindAddress": "172.31.128.1",
    "syslogBindPort": 514,
    "tftpBindAddress": "172.31.128.1",
    "tftpBindPort": 69,
    "tftpRoot": "./static/tftp",
    "minLogLevel": 2
}
```