const bcrypt = require('bcrypt')
const fs = require('fs')


async function main() {
    const password = process.argv[2]
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    fs.writeFileSync('password.txt', hash)
}
main()
