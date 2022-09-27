![NoExGen](https://socialify.git.ci/Yourstruggle11/NoExGen/image?description=1&descriptionEditable=NoExGen%20is%20a%20node.js%20express%20application%20generator%20with%20modern%20folder%20structure%2C%20namespace%2Fproject%20mapping%20and%20much%20more!%20It%20contains%20preconfigured%20Settings%20and%20Routing%20files%2C%20ready%20to%20be%20used%20in%20any%20project.&font=Bitter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Charlie%20Brown&pulls=1&stargazers=1&theme=Light)


[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]


## Installation

```sh
$ npm install -g noexgen
```

## Quick Start

You can use Node Package Execution to create your node-express application as shown below:

Create the app:

```bash
$ npx noexgen --view=ejs my-noex-app && cd my-noex-app
```

Install dependencies:

```bash
$ npm install
```

## start your app

```bash
$ npm start
```

**_to start your app using nodemon_**

```bash
$ npm run dev
```

# All Done

## visit `http://localhost:5000/`

## Other Command Line Options you can use with NoExGen

The following command line options can be used to further customise this generator.

Options:

    --version            output the version number
    -h, --help           output usage information
    --es6                create NoEx template With modern ES6 synteax
    --view=jade          create NoEx template With ejs engine
    --view=pug           create NoEx template With pug engine
    --view=hbs           create NoEx template With handlebars engine
    --view=hjs           create NoEx template With hogan.js engine
    -v, --view <engine>  create NoEx template with view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
        --no-view        use static html instead of view engine
    -c, --css <engine>   add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git            add .gitignore
    -f, --force          force on non-empty directory

## The produced app has the directory structure shown below.:

    |   index.js
    |   package.json
    |
    +---config
    |       db.js
    |
    +---controllers
    +---middlewares
    |       errorMiddleware.js
    |
    +---models
    +---public
    |   +---images
    |   +---javascripts
    |   \---stylesheets
    |           style.css
    |
    +---routes
    |   |   home.route.js
    |   |
    |   +---private
    |   |       index.js
    |   |
    |   \---public
    |           index.js
    |
    \---views
            error.ejs
            index.ejs
            layout.ejs

## 12 directories, 11 files


# NOTE
## This is a beta version of NoExGen, which will be more stable and include all test cases in version 1.0.0. 


## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/noexgen.svg
[npm-url]: https://www.npmjs.com/package/noexgen
[downloads-image]: https://img.shields.io/npm/dm/noexgen.svg
[downloads-url]: https://www.npmjs.com/package/noexgen