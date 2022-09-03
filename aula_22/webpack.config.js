const path = require('path')
const HtmlWebpack = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js', //local ao qual o arquivo será pego
    output:{
        filename: 'main.js', //insere um nome para o arquivo js
        path: path.resolve(__dirname, 'dist') //cria diretório(pasta) dist
    },
    module: {
        rules: [{
            test:/\.(sa|c|sc)ss$/,    // Expressão do Regex
            use: [
                MiniCssExtract.loader,
                'css-loader',
                'sass-loader'
            ]
        },{
            test:/\.css$/i,
            use: [
                'style-loader',
                'css-loader'
            ] 
        },{
            test: /\.js$/i,
            exclude: /node_modules/, //exclui o arquivo "node_modeles"
            use: {
                loader: 'babel-loader',
                options: {
                    presets:['@babel/preset-env']
                }
            }
        },{
            test: /\.(jpeg|jpg|png|svg|gif)$/i,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpack({
            filename: 'index.html', //nome do arquivo criado
            template: './src/index.html' // Local onde o arquivo será pego
        }),
        new MiniCssExtract({
            filename: 'style.css',
            // template: './src/styles.scss'
        })
    ]
}