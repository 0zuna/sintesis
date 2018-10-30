require("@babel/polyfill")
require('./bootstrap')
//require('pdfmake/build/pdfmake.js')
//require('pdfmake/build/vfs_fonts.js')

pdfMake = require('pdfmake/build/pdfmake.js');
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import Vue from 'vue'


Vue.component('holi', require('./Components/App.vue').default);
Vue.component('welcome', require('./Components/Welcome.vue').default);
Vue.component('one', require('./Components/One.vue').default);


new Vue({
  el: '#app',
  data:{
  	welcome:true
  }
  //render: h => h(App)
})
function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
