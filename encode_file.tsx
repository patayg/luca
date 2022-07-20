const fs = require('fs');
const cccrypto = require('crypto');

function encryptData(
  data,
  passphrase) {
  const initVector = Buffer.alloc(16, 0);;
  const key = cccrypto.createHash('sha256').update(passphrase).digest();
  const cipher = cccrypto.createCipheriv("aes-256-cbc", key, initVector);
  return Buffer.concat([
    cipher.update(data),
    cipher.final()
  ]);
}

const passphrase = "commented out";

var data = fs.readFileSync('luca.ged');

var encryptedData = encryptData(data, passphrase);
var serializedData = JSON.stringify(encryptedData);
fs.writeFile("luca.gedx", serializedData, function (err, ddd) {
  if (err) {
    return console.log(err);
  }
});
