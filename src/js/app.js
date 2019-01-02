require("@babel/polyfill")
require('./bootstrap')
import Vue from 'vue'

Vue.component('holi', require('./Components/App.vue').default);
Vue.component('welcome', require('./Components/Welcome.vue').default);
Vue.component('one', require('./Components/One.vue').default);
Vue.component('sintesis', require('./Components/Sintesis.vue').default);
Vue.component('opinion', require('./Components/Opinion.vue').default);
Vue.component('cartoon', require('./Components/Carton.vue').default);
new Vue({
	el: '#app',
	data:{
		clienta:'',
		welcome:false,
		portada:true,
		columnas:false,
		sintesis:false,
		opinion:false,
		cartoon:false,
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
		columns:[],
		cartoons:[],
		sintetizador:{
			data:'',
			notas:[],
		}
	},
	async mounted(){
		/*
		  *covers
		  */
		if(recurso[this.clienta+'portada.jpg']){
			sakura.cover[0].image='data:image/jpeg;base64,'+recurso[this.clienta+'portada.jpg']
			sakura.opinion[0].image='data:image/jpeg;base64,'+recurso[this.clienta+'columnas_opinion.jpg']
			sakura.cartoons[0].image='data:image/jpeg;base64,'+recurso[this.clienta+'cartoon.jpg']
			sakura.columns[0].image = 'data:image/jpeg;base64,'+recurso[this.clienta+'ocho_columnas.jpg']
		}else{
			sakura.cover[0].image='data:image/jpeg;base64,'+recurso['portada.jpg']
			sakura.opinion[0].image='data:image/jpeg;base64,'+recurso['columnas_opinion.jpg']
			sakura.cartoons[0].image='data:image/jpeg;base64,'+recurso['cartoon.jpg']
			sakura.columns[0].image = 'data:image/jpeg;base64,'+recurso['ocho_columnas.jpg']
			sakura.cover[2].stack[0]="SÍNTESIS INFORMATIVA";
			sakura.cover[2].stack[1].text=this.clienta.toUpperCase();

		}

		await axios.get(this.clienta+'/data').then((response)=>{
			this.columns=response.data.columnas
			this.opiniones=response.data.opinion
			this.cartoons=response.data.cartoons
			this.sintetizador.data=response.data.sintesis
			$('.loading').hide()
			this.welcome=true
		})
		$("select.select-opinion").imagepicker({show_label: false});
		$("select.select-cartoon").imagepicker({show_label: false});
		console.log('holi')

	},
	methods:{
		file: function(url) {
			return axios.get(url, { responseType: 'arraybuffer' }).then((response) => {
				let image = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
				return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
			});
		},
		sakura: function(){
			$('.main').hide()
			$('.loading').show()
			console.log('sakura')
			if(this.portada){
				this.pdf.content.push($.extend(true,[],sakura.cover));
			}
		/*
		  *columnas
		  */
			if(this.columnas){
				var col = $.extend(true,[],sakura.columns);
				if(this.portada)
					col[0].pageBreak='before';
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
				if(this.sintesis || this.opinion)
					col[1].pageBreak='after';
				this.pdf.content.push(col);
			}
		/*
		  *sintesis
		  */
			if(this.sintesis){
				var sintesis=[]
				var aux=''
				for(var x=0;x<this.sintetizador.notas.length;x++){
					if(this.sintetizador.notas[x].text!=aux){
						var sintec={
							stack:[
								{
									text: this.sintetizador.notas[x].text,
									fontSize: 20
								},
								{
									text:'_____________________________________________________________________________________',
									color:'green'
								}
							]
						}
						if(x>0)
							sintec.pageBreak='before'
						sintesis.push(sintec)
					}
					sintesis.push({stack:[{text: this.sintetizador.notas[x].Titulo,bold: true},{text: this.sintetizador.notas[x].Texto}],margin: [0, 20, 0, 0]})
					$.each(this.sintetizador.notas[x].refs,function (k,v) {
						sintesis[sintesis.length-1].stack.push(
								{text:[
							{text:v.StringName,link:'https://www.gaimpresos.com'+v.pdf,color:'blue'},
							'  '+v.Autor,
							'  Pag.'+v.PaginaPeriodico
							],regular: true,fontSize:10})
					});
					aux=this.sintetizador.notas[x].text
				}
				this.pdf.content.push(sintesis)
			}
		/*
		  *opinion
		  */
			if(this.opinion){
				var opinion = $.extend(true,[],sakura.opinion);
				if(this.sintesis)
					opinion[0].pageBreak='before';
				var opinadora = this.opiniones.filter((opinion) => {
					return $(".select-opinion").data("picker").selected_values().includes(opinion.idEditorial)
				});
				for(var x=0;x<opinadora.length;x++){
					if(x%4==0){
						opinion.push({columns:[],columnGap: 20})
					}
					opinion[opinion.length-1].columns.push({stack:[{image:opinadora[x].image,width: 115,link:'https://www.gaimpresos.com/boards/cut/'+opinadora[x].idEditorial+':pgjcdmx',alignment: 'center',margin:[0,0,0,20]}]})
				}
				if(this.cartoon)
					opinion[opinion.length-1].pageBreak='after'
				this.pdf.content.push(opinion)
			}
		/*
		  *cartoon
		  */
			if(this.cartoon){
				var cartoons = $.extend(true,[],sakura.cartoons);
				var cartoon = this.cartoons.filter((cartoon) => {
					return $(".select-cartoon").data("picker").selected_values().includes(cartoon.idEditorial)
				});
				for(var x=0;x<cartoon.length;x++){
					if(x%16==0 && x!=0){
						cartoons.push($.extend(true,{},sakura.cartoons[0]))
					}
					if(x%4==0){
						cartoons.push({columns:[],columnGap: 10})
					}
					cartoons[cartoons.length-1].columns.push({stack:[{image:cartoon[x].image,width: 120,height:150,link:'https://www.gaimpresos.com/boards/cut/'+cartoon[x].idEditorial+':pgjcdmx',alignment: 'center'},{text:cartoon[x].Periodico,color:'grey',alignment: 'center'}]})
				}
				this.pdf.content.push(cartoons)
			}

			//pdfMake.createPdf(this.pdf).open()
			var self = this;
			setTimeout(function(){
				pdfMake.createPdf(self.pdf).download('Síntesis.pdf', function(){
						$('.loading').hide()
						$('.welcome').show()
						$('.carousel-item').removeClass("active")
						$('#step').addClass("active")
						self.pdf.content=[]
					},null
				)
			},500);

		}
	}
  //render: h => h(App)
})
