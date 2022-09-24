import parseArgs from 'minimist'



// PARSING ALL THE ARGS FROM THE COMMAND LINE
const unknown = []
export const args = parseArgs(process.argv.slice(2), {
  alias: {
    c: 'css',
    e: 'ejs',
    f: 'force',
    h: 'help',
    H: 'hogan',
    v: 'view'
  },
  boolean: ['ejs', 'force', 'git', 'hbs', 'help', 'hogan', 'pug', 'version', 'es6'],
  default: { css: true, view: true },
  string: ['css', 'view'],
  unknown: function (s) {
    if (s.charAt(0) === '-') {
      unknown.push(s)
    }
  }
})

args['!'] = unknown