const path = require( 'path' );
const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const WebpackAutoInject = require( 'webpack-auto-inject-version' );

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new ExtractTextPlugin( {
  filename: './assets/css/blocks.style.css',
} );
const editBlocksCSSPlugin = new ExtractTextPlugin( {
  filename: './assets/css/blocks.editor.css',
} );


const WebpackAutoInjectPlugin = new WebpackAutoInject({
  NAME: '',
  SHORT: '',
  SILENT: false,
  PACKAGE_JSON_PATH: './package.json',
  components: {
    AutoIncreaseVersion: true,
    InjectAsComment: false,
    InjectByTag: true
  },
  componentsOptions: {
    AutoIncreaseVersion: {
      runInWatchMode: true // it will increase version with every single build!
    },
    InjectAsComment: {
      tag: 'Version: {version} - {date}',
      dateFormat: 'h:MM:ss TT'
    },
    InjectByTag: {
      fileRegex: /\.+/,
      dateFormat: 'h:MM:ss TT'
    }
  },
  LOGS_TEXT: {
    AIS_START: 'DEMO AIV started'
  }
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [ require( 'autoprefixer' ) ],
      },
    },
    {
      loader: 'sass-loader',
      query: {
        outputStyle:
          'production' === process.env.NODE_ENV ? 'compressed' : 'nested',
      },
    },
  ],
};

module.exports = {
  entry: {
    './assets/js/editor.blocks' : './blocks/index.js',
    './assets/js/frontend.blocks' : './blocks/frontend.js',
  },
  output: {
    path: path.resolve( __dirname ),
    filename: '[name].js',
  },
  watch: true,
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /style\.s?css$/,
        use: blocksCSSPlugin.extract( extractConfig ),
      },
      {
        test: /editor\.s?css$/,
        use: editBlocksCSSPlugin.extract( extractConfig ),
      },
    ],
  },
  plugins: [
    blocksCSSPlugin,
    editBlocksCSSPlugin,
    WebpackAutoInjectPlugin,
  ],
};
