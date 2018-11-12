require("@babel/polyfill")
require('./bootstrap')
window.sakura =require('./sakura')
import Vue from 'vue'

Vue.component('holi', require('./Components/App.vue').default);
Vue.component('welcome', require('./Components/Welcome.vue').default);
Vue.component('one', require('./Components/One.vue').default);
Vue.component('sintesis', require('./Components/Sintesis.vue').default);
Vue.component('opinion', require('./Components/Opinion.vue').default);
Vue.component('carton', require('./Components/Carton.vue').default);

new Vue({
	el: '#app',
	data:{
		loading:true,
		welcome:false,
		portada:true,
		columnas:true,
		sintesis:false,
		opinion:true,
		carton:false,
		pdf:{
			info: {
				title: 'Sintesis',
				author: 'oppaozuna@gmail.com',
				subject: 'subject of document',
				keywords: 'keywords for document',
			},
			content: [],
			defaultStyle: {
				font:'NunitoSans',
			}
		},
		url:'/sintesis/public',
		opiniones:[],
		columns:[]
	},
	async created(){
		/*
		  *cover
		  */
		sakura.cover[0].image=await this.file(this.url+'/assets/img/pgjcdmx/portada.png');
		sakura.cover[3].stack[0]="Procuraduría General de Justicia de la Ciudad de México"
		sakura.cover[3].stack[1].text="Dirección General de Comunicación Social"
		/*
		  *opinion
		  */
		sakura.opinion[0].image=await this.file(this.url+'/assets/img/pgjcdmx/columnas_opinion.jpg')
		/*
		  *columnas
		  */
		sakura.columns[0].image = await this.file(this.url+'/assets/img/pgjcdmx/ocho_columnas.jpg');
		axios.get(this.url+'/data').then(async (response)=>{
			this.columns=response.data.columnas
			this.opiniones=response.data.opinion
			this.loading=false
			this.welcome=true
		})

	},
	methods:{
		file: function(url) {
			return axios.get(url, { responseType: 'arraybuffer' }).then((response) => {
				let image = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
				return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
			});
		},
		sakura: async function(){
			var pdf=this.pdf;
			console.log('sakura')
			if(this.portada){
				this.pdf.content.push($.extend(true,[],sakura.cover));
			}
		/*
		  *columnas
		  */
			if(this.columnas){
				var col = $.extend(true,[],sakura.columns);
				for(var x=0;x<this.columns.length;x++){
					var holi=[
						{
							image: '',
							width: 100,
							height: 20,
							margin: [0, 4, 0, 0],
						}, 
						{
							fontSize: 10,
							stack: [],
							margin: [0, 4, 0, 0],
						}];
					holi[1].stack.push({text:[this.columns[x].titulo],link:this.columns[x].pdf,color:'#2A2A2A'});
					holi[0].image=this.columns[x].image;
					if(this.columns[x].idPer==this.columns[x+1].idPer){
						holi[1].stack.push({text:[this.columns[x+1].titulo],link:this.columns[x+1].pdf,color:'#DB006E'});
						x++;
					}
					col[1].table.body.push(holi);
				}
				if(this.opinion)
					col[1].pageBreak='after';
				this.pdf.content.push(col);
			}
		/*
		  *opinion
		  */
			if(this.opinion){
				var opinion = $.extend(true,[],sakura.opinion);
				var opinadora = this.opiniones.filter((opinion) => {
					return $("select").data("picker").selected_values().includes(opinion.idEditorial)
				});
				for(var x=0;x<opinadora.length;x++){
					if(x%4==0){
						opinion.push({columns:[],columnGap: 20})
					}
					opinion[opinion.length-1].columns.push({image:opinadora[x].image,width: 115,link:'https://www.gaimpresos.com/boards/cut/'+opinadora[x].idEditorial+':pgjcdmx',margin:[0,0,0,20]})
				}
				this.pdf.content.push(opinion)
			}
			$(".main").fadeOut("slow",function(){
				$(".welcome").fadeIn("slow")
				$('.carousel').carousel(0)
			});
			pdfMake.createPdf(this.pdf).open()
			this.pdf.content=[]
		}
	}
  //render: h => h(App)
})
