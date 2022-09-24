import { __dirname } from "../config/constants.js"
import fs from 'fs'
import path from 'path'
import ejs from "ejs"
import util from 'util'


//**
//  * Load template file.
//**


 export const loadTemplate = (name) => {
    var contents = fs.readFileSync(path.join(__dirname, '..', 'templates', (name + '.ejs')), 'utf-8')
    var locals = Object.create(null)
  
    function render () {
      return ejs.render(contents, locals, {
        escape: util.inspect
      })
    }
  
    return {
      locals: locals,
      render: render
    }
  }