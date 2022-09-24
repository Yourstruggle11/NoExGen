import fs from "fs"
//**
//  * Check if the given directory `dir` is empty.
//  *
//  * @param {String} dir
//  * @param {Function} fn
//**

 export const emptyDirectory = (dir, fn) => {
    fs.readdir(dir, function (err, files) {
      if (err && err.code !== 'ENOENT') throw err
      fn(!files || !files.length)
    })
  }