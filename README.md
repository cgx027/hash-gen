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
