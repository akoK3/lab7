const fs = require('fs')
const crypto = require("crypto")

const publicKey = fs.readFileSync('public.pem', 'utf8')
const key = crypto.randomBytes(16)
const iv = crypto.randomBytes(16)

const SYM_ALGORITHM = 'aes-128-ctr'
const ASYM_PAD = crypto.constants.RSA_PKCS1_OAEP_PADDING

function encrypt(text, key, iv){
    let cipher = crypto.createCipheriv(SYM_ALGORITHM, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('base64');
}

function encryptPub(txt, publicKey){
    const encryptedBuffer = crypto.publicEncrypt({
        key: publicKey,
        padding: ASYM_PAD,
        oaepHash: 'sha256',
    }, Buffer.from(txt));
    return encryptedBuffer.toString('base64');
}

let phrases = [
    'hello world!!!!!',
    'whatever whatever',
    'x, y, z, whatever',
    'this can be anything.... ☺️☺️☺️'
];

const encryptedData = []
for(let p of phrases) {
    encryptedData.push(encrypt(p, key, iv))
}

const encryptedKey = encryptPub(key, publicKey)
const encryptedIv = encryptPub(iv, publicKey)

const output = {
    key: encryptedKey,
    iv: encryptedIv,
    data: encryptedData
}

fs.writeFileSync('messages.json', JSON.stringify(output, null, 2))
console.log('Messages encrypted and saved to messages.json')