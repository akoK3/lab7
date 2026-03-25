const crypto = require("crypto")
const fs = require('fs')

const privateKey = fs.readFileSync('private.pem', 'utf8')
const messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'))

const SYM_ALGORITHM = 'aes-128-ctr'
const ASYM_PAD = crypto.constants.RSA_PKCS1_OAEP_PADDING

function decryptPriv(encryptedB64,privateKey){
  // Decryption using private key
  const decryptedBuffer = crypto.privateDecrypt({
    key: privateKey,
    padding: ASYM_PAD,
    oaepHash: 'sha256',
  }, Buffer.from(encryptedB64,'base64') );
  return decryptedBuffer;
}
function decrypt(text,key,iv){
  let encryptedText = Buffer.from(text,'base64');
  let decipher = crypto.createDecipheriv(SYM_ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const key = decryptPriv(messages.key, privateKey)
const iv = decryptPriv(messages.iv, privateKey)

for(let m of messages.data) {
    console.log(decrypt(m, key, iv))
}