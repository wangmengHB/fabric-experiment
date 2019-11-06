const path = require('path')


module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        'fabric-test': path.resolve(__dirname, '../src/demo3')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/',
        libraryTarget: 'umd',
        library: 'CommonUtil'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
          {
            test: /\.(js|ts)$/,
            include: [
              path.resolve(__dirname, '../src')
            ],
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: 'ts-loader',
              }
            ]
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                }
              }
            ]
          },
          {
            test: /\.(png|jpg)$/,
            use: [
              {
                loader: 'url-loader',
              }
            ]
          },
        ]
    },
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}