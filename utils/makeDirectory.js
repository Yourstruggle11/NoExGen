import mkdirp from "mkdirp"
import path from "path"
import { MODE_0755 } from "../config/constants.js"

//**
//  * Make the given dir relative to base.
//  *
//  * @param {string} base
//  * @param {string} dir
//  */

export const mkdir = (base, dir) => {
	var loc = path.join(base, dir)
	console.log("   \x1b[36mcreate\x1b[0m : " + loc + path.sep)
	mkdirp.sync(loc, MODE_0755)
}
