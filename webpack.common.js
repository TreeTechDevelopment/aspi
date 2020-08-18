const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports  = {
    entry: './client/index.js',
    output: {
        path: __dirname + '/server/src/public',
        filename: 'bundle.js'
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
              use: 'babel-loader',
              test: /\.js$/,
              exclude: [/node_modules/, /server/]
            },
            {
              test: /\.css$/i,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    esModule: true,
                  },
                },
                'css-loader'
              ]
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
              'file-loader',
              ],
            }
        ]
    },
    node : {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
}

