#!/usr/bin/env node

import path from 'path'
import sortedObject from 'sorted-object'
import { args } from './utils/parseArgs.js'
import { confirm } from './utils/confirm.js'
import { copySingleTemplate, copyMultiTemplate } from './utils/copyTemplates.js'
import { isCmd } from './utils/isCMD.js'
import { loadTemplate } from './utils/loadTemplate.js'
import { mkdir } from './utils/makeDirectory.js'
import { usage } from './utils/usage.js'
import { warning } from './utils/warning.js'
import { write } from './utils/write.js'
import { createAppName } from './utils/createAppName.js'
import { emptyDirectory } from './utils/emptyDirectory.js'
import { error } from './utils/error.js'
import { exit } from './utils/exit.js'

// run the main function
main(args, exit)

/**
 * Create application at the given directory.
 *
 * @param {string} name
 * @param {string} dir
 * @param {object} options
 * @param {function} done
 */

function createApplication(name, dir, options, done) {
    // Package
    var type = options.es6 ? 'module' : 'commonjs'
    var pkg = {
        name: name,
        version: '0.0.0',
        description: 'Node Express application created with NoExGen cli',
        main: 'index.js',
        type: type,
        private: true,
        scripts: {
            start: 'node index.js',
            dev: 'npx nodemon index.js'
        },
        dependencies: {
            express: '~4.18.1',
            mongoose: '~6.6.1'
        }
    }

    // JavaScript
    var app = options.es6 ? loadTemplate('js/es6app.js') : loadTemplate('js/app.js')

    // App modules
    app.locals.localModules = Object.create(null)
    app.locals.modules = Object.create(null)
    app.locals.mounts = []
    app.locals.uses = []

    // Request logger
    app.locals.modules.morgan = 'morgan'
    app.locals.uses.push("morgan('dev')")
    pkg.dependencies.morgan = '~1.10.0'

    // added Cors
    app.locals.modules.cors = 'cors'
    app.locals.uses.push('cors()')
    pkg.dependencies['cors'] = '~2.8.5'

    // added security headers
    app.locals.modules.helmet = 'helmet'
    app.locals.uses.push('helmet()')
    pkg.dependencies['helmet'] = '~6.0.0'

    // added mongo sanitizer
    app.locals.modules.ExpressMongoSanitize = 'express-mongo-sanitize'
    app.locals.uses.push('ExpressMongoSanitize()')
    pkg.dependencies['express-mongo-sanitize'] = '~2.2.0'

    // Body parsers
    app.locals.uses.push('express.json()')
    app.locals.uses.push('express.urlencoded({ extended: false })')

    // Cookie parser
    app.locals.modules.cookieParser = 'cookie-parser'
    app.locals.uses.push('cookieParser()')
    pkg.dependencies['cookie-parser'] = '~1.4.5'

    pkg.dependencies['dotenv'] = '~16.0.2'

    if (dir !== '.') {
        mkdir(dir, '.')
    }

    // CREATE ALL THE NEEDED FOLDERS
    mkdir(dir, 'public')
    mkdir(dir, 'public/javascripts')
    mkdir(dir, 'public/images')
    mkdir(dir, 'public/stylesheets')
    mkdir(dir, 'routes')
    mkdir(dir, 'config')
    mkdir(dir, 'middlewares')
    mkdir(dir, 'controllers')
    mkdir(dir, 'models')
    mkdir(dir + '/routes', 'private')
    mkdir(dir + '/routes', 'public')

    // copy css templates
    switch (options.css) {
        case 'less':
            copyMultiTemplate('css', dir + '/public/stylesheets', '*.less')
            break
        case 'stylus':
            copyMultiTemplate('css', dir + '/public/stylesheets', '*.styl')
            break
        case 'compass':
            copyMultiTemplate('css', dir + '/public/stylesheets', '*.scss')
            break
        case 'sass':
            copyMultiTemplate('css', dir + '/public/stylesheets', '*.sass')
            break
        default:
            copyMultiTemplate('css', dir + '/public/stylesheets', '*.css')
            break
    }

    // copy route templates
    if (options.es6) {
        copySingleTemplate('js/routes/es6index.js', dir + '/routes/private/index.js')
        copySingleTemplate('js/routes/es6index.js', dir + '/routes/public/index.js')
        copySingleTemplate(
            'js/routes/es6home.route.js',
            dir + '/routes/home.route.js'
        )
        copySingleTemplate('js/es6db.js', dir + '/config/db.js')
        copySingleTemplate(
            'js/middlewares/es6errorMiddleware.js',
            dir + '/middlewares/errorMiddleware.js'
        )
    } else {
        copySingleTemplate('js/routes/index.js', dir + '/routes/private/index.js')
        copySingleTemplate('js/routes/index.js', dir + '/routes/public/index.js')
        copySingleTemplate('js/routes/home.route.js', dir + '/routes/home.route.js')
        copySingleTemplate('js/db.js', dir + '/config/db.js')
        copySingleTemplate(
            'js/middlewares/errorMiddleware.js',
            dir + '/middlewares/errorMiddleware.js'
        )
    }

    if (options.view) {
        // Copy view templates
        mkdir(dir, 'views')
        switch (options.view) {
            case 'dust':
                copyMultiTemplate('views', dir + '/views', '*.dust')
                break
            case 'ejs':
                copyMultiTemplate('views', dir + '/views', '*.ejs')
                break
            case 'hbs':
                copyMultiTemplate('views', dir + '/views', '*.hbs')
                break
            case 'hjs':
                copyMultiTemplate('views', dir + '/views', '*.hjs')
                break
            case 'jade':
                copyMultiTemplate('views', dir + '/views', '*.jade')
                break
            case 'pug':
                copyMultiTemplate('views', dir + '/views', '*.pug')
                break
            case 'twig':
                copyMultiTemplate('views', dir + '/views', '*.twig')
                break
            case 'vash':
                copyMultiTemplate('views', dir + '/views', '*.vash')
                break
        }
    } else {
        // Copy extra public files
        copySingleTemplate('js/index.html', path.join(dir, 'public/index.html'))
    }

    // CSS Engine support
    switch (options.css) {
        case 'compass':
            app.locals.modules.compass = 'node-compass'
            app.locals.uses.push("compass({ mode: 'expanded' })")
            pkg.dependencies['node-compass'] = '0.2.3'
            break
        case 'less':
            app.locals.modules.lessMiddleware = 'less-middleware'
            app.locals.uses.push("lessMiddleware(path.join(__dirname, 'public'))")
            pkg.dependencies['less-middleware'] = '~2.2.1'
            break
        case 'sass':
            app.locals.modules.sassMiddleware = 'node-sass-middleware'
            app.locals.uses.push(
                "sassMiddleware({\n  src: path.join(__dirname, 'public'),\n  dest: path.join(__dirname, 'public'),\n  indentedSyntax: true, // true = .sass and false = .scss\n  sourceMap: true\n})"
            )
            pkg.dependencies['node-sass-middleware'] = '0.11.0'
            break
        case 'stylus':
            app.locals.modules.stylus = 'stylus'
            app.locals.uses.push("stylus.middleware(path.join(__dirname, 'public'))")
            pkg.dependencies.stylus = '0.54.5'
            break
    }

    // Home router mount
    app.locals.localModules.homeRoute = './routes/home.route'
    app.locals.mounts.push({ path: '/', code: 'homeRoute' })

    // Other Router mount
    app.locals.localModules.PublicRouter = './routes/public/index'
    app.locals.mounts.push({ path: '/public', code: 'PublicRouter' })
    app.locals.localModules.PrivateRouter = './routes/private/index'
    app.locals.mounts.push({ path: '/public', code: 'PrivateRouter' })

    // Template support
    switch (options.view) {
        case 'dust':
            app.locals.modules.adaro = 'adaro'
            app.locals.view = {
                engine: 'dust',
                render: 'adaro.dust()'
            }
            pkg.dependencies.adaro = '~1.0.4'
            break
        case 'ejs':
            app.locals.view = { engine: 'ejs' }
            pkg.dependencies.ejs = '~2.6.1'
            break
        case 'hbs':
            app.locals.view = { engine: 'hbs' }
            pkg.dependencies.hbs = '~4.0.4'
            break
        case 'hjs':
            app.locals.view = { engine: 'hjs' }
            pkg.dependencies.hjs = '~0.0.6'
            break
        case 'jade':
            app.locals.view = { engine: 'jade' }
            pkg.dependencies.jade = '~1.11.0'
            break
        case 'pug':
            app.locals.view = { engine: 'pug' }
            pkg.dependencies.pug = '2.0.0-beta11'
            break
        case 'twig':
            app.locals.view = { engine: 'twig' }
            pkg.dependencies.twig = '~0.10.3'
            break
        case 'vash':
            app.locals.view = { engine: 'vash' }
            pkg.dependencies.vash = '~0.12.6'
            break
        default:
            app.locals.view = false
            break
    }

    // Static files
    app.locals.uses.push("express.static(path.join(__dirname, 'public'))")

    if (options.git) {
        copySingleTemplate('js/gitignore', path.join(dir, '.gitignore'))
    }

    // sort dependencies like npm(1)
    pkg.dependencies = sortedObject(pkg.dependencies)

    // write files
    write(path.join(dir, 'index.js'), app.render())
    write(path.join(dir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')

    var prompt = isCmd() ? '>' : '$'

    if (dir !== '.') {
        console.log()
        console.log('   change directory:')
        console.log('     %s cd %s', prompt, dir)
    }

    console.log()
    console.log('   install dependencies:')
    console.log('     %s npm install', prompt)
    console.log()
    console.log('   run the app:')

    if (isCmd()) {
        console.log('     %s SET npm run dev', prompt)
    } else {
        console.log('     %s npm run dev', prompt)
    }

    console.log()

    done(0)
}

/**
 * Main program.
 */

function main(options, done) {
    // top-level argument direction
    if (options['!'].length > 0) {
        usage()
        error('unknown option `' + options['!'][0] + "'")
        done(1)
    } else if (options.help) {
        usage()
        done(0)
    } else if (options.version) {
        version()
        done(0)
    } else if (options.css === '') {
        usage()
        error("option `-c, --css <engine>' argument missing")
        done(1)
    } else if (options.view === '') {
        usage()
        error("option `-v, --view <engine>' argument missing")
        done(1)
    } else {
        // Path
        var destinationPath = options._[0] || '.'

        // App name
        var appName = createAppName(path.resolve(destinationPath)) || 'NoExGen-App'

        // View engine
        if (options.view === true) {
            if (options.ejs) {
                options.view = 'ejs'
                warning("option `--ejs' has been renamed to `--view=ejs'")
            }

            if (options.hbs) {
                options.view = 'hbs'
                warning("option `--hbs' has been renamed to `--view=hbs'")
            }

            if (options.hogan) {
                options.view = 'hjs'
                warning("option `--hogan' has been renamed to `--view=hjs'")
            }

            if (options.pug) {
                options.view = 'pug'
                warning("option `--pug' has been renamed to `--view=pug'")
            }
        }

        // Default view engine
        if (options.view === true) {
            warning(
                'the default view engine will not be jade in future releases\n' +
                    "use `--view=jade' or `--help' for additional options"
            )
            options.view = 'jade'
        }

        // Generate application
        emptyDirectory(destinationPath, function (empty) {
            if (empty || options.force) {
                createApplication(appName, destinationPath, options, done)
            } else {
                confirm('destination is not empty, continue? [y/N] ', function (ok) {
                    if (ok) {
                        process.stdin.destroy()
                        createApplication(appName, destinationPath, options, done)
                    } else {
                        console.error('aborting')
                        done(1)
                    }
                })
            }
        })
    }
}

/**
 * Display the version.
 */
function version() {
    console.log('1.0.0')
}
