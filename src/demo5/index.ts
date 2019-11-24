
const psd_file = '/psd/test1.psd';

const PSD = window.require('psd');
(window as any).PSD = PSD;


const psd = PSD.fromURL(psd_file).then(psd => {
  (window as any).psd = psd;
  






});