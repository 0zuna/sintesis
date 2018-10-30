<template>
	<div>
		<main role="main" class="container step-one hide">
			<h1 class="mt-5">Paso 1</h1>
			<p class="lead">Elije</p>
			<p>
			<a href="" @click.prevent="go">aqui</a>.
			</p>
		</main>
	</div>
</template>
<script>
	export default{ 
		methods:{
			file: function(url) {
				return axios.get(url, { responseType: 'arraybuffer' })
					.then((response) => {
						let image = btoa(
							new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
						);
						return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
					});
			},
			go: async function(){
				/*$(".step-one").fadeOut("slow",function(){
					$(".step-two").fadeIn("slow");
				});*/
				var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
				var f=new Date();
				var fecha=f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear()

				var img= await this.file('http://dimitri/sintesis/public/portada_pgjcdmx.png');
				var docDefinition = {
					info: {
						title: 'Sintesis',
						author: 'oppaozuna@gmail.com',
						subject: 'subject of document',
						keywords: 'keywords for document',
					},
					content: [
						{
						image:img,
						width: 600,
						absolutePosition:{x:0,y:0}
						},
						 {
							text:fecha,
							fontSize: 15,
							color: 'white',
							bold: true,
							absolutePosition:{x:20,y:45},
							pageBreak: 'after'
						 }
					]
				};
				pdfMake.createPdf(docDefinition).open();
				//pdfMake.createPdf(docDefinition).print();
				//pdfMake.createPdf(docDefinition).download();


			}
		}
	}
</script>
