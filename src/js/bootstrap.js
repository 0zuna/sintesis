window._ = require('lodash');
window.Popper = require('popper.js').default;
window.recurso = require('./recurso')
window.sakura = require('./sakura')

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}

window.axios = require('axios');

/*pdfMake*/
pdfMake = require('pdfmake/build/pdfmake.js');
import pdfFonts from './fonts/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
	'NunitoSans' : {
		normal: 'NunitoSans-ExtraLight.ttf',
		bold: 'NunitoSans-Bold.ttf',
		regular: 'NunitoSans-Regular.ttf',
	}
}
require('image-picker'); 
