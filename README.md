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

## License

[MIT](LICENSE)
