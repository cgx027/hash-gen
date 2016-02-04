var crypto = require('crypto');
var Promise = require('bluebird');

// User inputs
var password = 'admin123';      // Put user password here
var generateRandomSalt = false;
var userSalt = 'zlxkgxjvcFwm0M8sWaGojh25qNYO8tuNWUMN4xKPH93PidwkCAvaX2JItLA3p7BSCWIzkw4GwWuezoMvKf3UXg==';


var hashConfig = {  //needs to be the same as RackHD. Do not change this
    // number of bytes in the Hash
    hashBytes: 64,
    // number of bytes in the slat
    saltBytes: 64,
    // number of iterations to get the final hash, longer means more secure,
    // but also slower
    iterations: 10000
};

var encoder = 'base64';

var calcPasswordHash = function (password, salt, iteration, bytes, callback) {
    crypto.pbkdf2(password, salt, hashConfig.iterations, hashConfig.hashBytes,
        function(err, hash){
            if(err){
                callback(err);
            }
            callback(null, hash);
        });
};

var getSalt = function (){
    return new Promise(function(resolve, reject){

        if(generateRandomSalt){
            crypto.randomBytes(hashConfig.saltBytes, function(err, randomSalt){
                if (err){
                    reject(err);
                }
                resolve(randomSalt);
            });
        }
        else {
            resolve(new Buffer(userSalt, encoder));
        }
    });
};

// The main process

getSalt().then(function(salt){
    calcPasswordHash(password, salt, hashConfig.iterations, hashConfig.hashBytes, function(err, hash) {
        if (err){
            console.log('error', err);
        }
        else{
            console.log('salt = ', salt.toString(encoder));
            console.log('hash = ', hash.toString(encoder));
        }
    })
});