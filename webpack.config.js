const path = require('path');
const glob = require("glob");

function getEntry(globPath,options={}){
    var files = glob.sync(globPath,options);
    var entries = {},entry,dirname,basename,extname;

    for(var i=0; i<files.length; i++){
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry,extname);
        entries[basename] = './'+entry;
    }
    return entries;
}
module.exports = {
    entry: Object.assign({
      'tpl': path.join(__dirname, 'src/tpl', 'index.js'),
    }, getEntry('./src/js/**/*.js')),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (data) => {
            // console.log(data.chunk.entryModule);
            return 'bundle/[name].bundle.js';
        }
    },
    watch: true,
    module: {
        rules: [
            { test: /\.art$/, use: 'art-template-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    }
}