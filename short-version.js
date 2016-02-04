var crypto = require('crypto');
var password = 'admin123';
salt = crypto.randomBytes(64);
console.log('salt = ', salt.toString('base64'));
crypto.pbkdf2(password, salt, 10000, 64, function(err, hash){
    console.log('hash = ', hash.toString('base64'));
});