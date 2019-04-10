const webpack = require('webpack');

module.exports = {
    devServer: {
        contentBase: __dirname + '/src',
        compress: true,
        historyApiFallback: true,
        hot: true,
        port: 9000
    },
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
        new webpack.HotModuleReplacementPlugin()
    ],
    target: 'web'
};
