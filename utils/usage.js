//**
//  * Display the usage.
//**

export const usage = () => {
    console.log('')
    console.log(
        '  Usage: These are common NoExGen options used in various situations [options] [dir]'
    )
    console.log('')
    console.log('  Options:')
    console.log('')
    console.log(
        '    --es6                  create NoEx template With modern ES6 synteax'
    )
    console.log(
        '    -p,--port <port>       Start the server on the specified port'
    )
    console.log('    --view=jade            create NoEx template With ejs engine')
    console.log('    --view=pug             create NoEx template With pug engine')
    console.log(
        '    --view=hbs             create NoEx template With handlebars engine'
    )
    console.log('    --view=hjs             create NoEx template With hogan.js engine')
    console.log(
        '    -v, --view <engine>    create NoEx template with view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)'
    )
    console.log('        --no-view          use static html instead of view engine')
    console.log(
        '    -c, --css <engine>     add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)'
    )
    console.log('        --git              add .gitignore')
    console.log('    -f, --force            force on non-empty directory')
    console.log('    --version              output the version number')
    console.log('    -h, --help             output usage information')
}
