import fs from 'fs'
//**
//  * echo str > file.
//  *
//  * @param {String} file
//  * @param {String} str
//**

import { MODE_0666 } from '../config/constants.js'

export const write = (file, str, mode) => {
    fs.writeFileSync(file, str, { mode: mode || MODE_0666 })
    console.log('   \x1b[36mcreate\x1b[0m : ' + file)
}
