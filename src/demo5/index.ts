const PSD1 = require('./psd1.js');


(window as any).PSD = PSD1;
const psd_file = '/psd/test1.psd';


const psd = PSD1.fromURL(psd_file).then(psd => {
  (window as any).psd = psd;
  






})