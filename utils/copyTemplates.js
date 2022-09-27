import fs from "fs"
import path from "path"
import minimatch from "minimatch"
import { write } from "./write.js"
import { TEMPLATE_DIR } from "../config/constants.js"

//**
// * Copy file from template directory.
//**
export const copySingleTemplate = (from, to) => {
	write(to, fs.readFileSync(path.join(TEMPLATE_DIR, from), "utf-8"))
}

//**
// * Copy multiple files from template directory.
//**
export const copyMultiTemplate = (fromDir, toDir, nameGlob) => {
	fs.readdirSync(path.join(TEMPLATE_DIR, fromDir))
		.filter(minimatch.filter(nameGlob, { matchBase: true }))
		.forEach(function (name) {
			copySingleTemplate(path.join(fromDir, name), path.join(toDir, name))
		})
}
