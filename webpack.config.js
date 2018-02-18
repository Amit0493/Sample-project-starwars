var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');


if(process.env.NODE_ENV && process.env.NODE_ENV === 'production'){
    var outputObject = {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: "[name]-bundle-[hash].js"
    }
}else{
    var outputObject = {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: "bundle.js"
    }
}


var config = {
    entry:['./app/index.js'],
    output:outputObject,
    devtool: "#cheap-module-source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: 'dist/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "react","stage-2","stage-0"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ?[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin({ filename: './css/[name][hash].css',
            publicPath: "dist",
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                unused: true,
                dead_code: true,

            },
            sourceMap: true,
        }),
        new HtmlWebpackPlugin({
            template:"./app/index.html"
        })

    ]
        :[
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
        }),
        new HtmlWebpackPlugin({
            template:"./app/index.html"
        })
    ]

}

module.exports = config;