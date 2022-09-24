import path from "path"
//**
//  * Create an app name from a directory path, fitting npm naming requirements.
//  *
//  * @param {String} pathName
//**

 export const createAppName =  (pathName) => {
    return path.basename(pathName)
      .replace(/[^A-Za-z0-9.-]+/g, '-')
      .replace(/^[-_.]+|-+$/g, '')
      .toLowerCase()
  }