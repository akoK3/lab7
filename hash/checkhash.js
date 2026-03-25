const bcrypt = require('bcrypt')
const fs = require('fs')

const password = process.argv[2]
const hash = fs.readFileSync('password.txt','utf8')
const check = bcrypt.compareSync(password, hash)
if(check)
    console.log("worked")
else 
    console.log("didn't work")