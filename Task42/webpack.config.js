module.exports = {
    entry: './main.js'
    , output: {
        filename: 'bundle.js'
    }
    , module: {
        rules: [
            {
                test: /\.js$/
                , loader: "eslint-loader"
                , enforce: "pre"
            }
            , {
                test: /\.js$/
                , loader: "babel-loader"
                , exclude: /node_modules/
                , options: {
                  presets: [['es2015', {modules: false}]],
                   plugins: ['syntax-dynamic-import']
                }
            }
        ]
    }
    , watch: false
};