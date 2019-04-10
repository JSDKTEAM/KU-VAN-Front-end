const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new CopyWebpackPlugin([
            { from: './src/index.html', to: 'index.html' }
        ]),
        new UglifyJsPlugin()
    ],
    target: 'web'
};
