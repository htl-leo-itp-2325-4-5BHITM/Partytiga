const path = require('path')

const baseHref = "/"
module.exports = env => ({
  entry: './src/index.ts',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  devtool: "cheap-source-map",
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      Model: path.resolve(__dirname, "src/model")
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './target'),
    publicPath: "/"
  },
  plugins: [
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 4200,
        proxy: {
          '/api': 'http://localhost:8080',
        },
        historyApiFallback: true        
    }   
})