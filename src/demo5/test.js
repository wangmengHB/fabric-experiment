const PSD = require('psd');
const path = require('path');


const psd_file = '/psd/test1.psd';

const file_path = path.resolve(__dirname, '../../dist' + psd_file);


const psd = PSD.fromFile(file_path);
psd.parse();

console.log(psd.tree().export());


console.log(psd);