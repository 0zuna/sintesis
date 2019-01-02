<template>
	<div class="carousel-item">
		<main role="main" class="container opinion">
			<h1 class="mt-5">Opinión</h1>
			<p class="lead">
				Elije tu contenido
			</p>
			<div>
				<select class="image-picker select-opinion show-html" multiple="multiple">
					<option v-for="sakura in this.$root.opiniones" :key="sakura.idEditorial" :data-img-src="'assets/img/opinion/'+sakura.Titulo+'.jpg'" data-img-label="" :value="sakura.idEditorial" selected=true></option>
				</select>
			</div>
		</main>
	</div>
</template>
<script>
	export default{ 
		created(){
			setTimeout(function(){
			$("select.select-opinion").imagepicker({show_label: false});
					},1000);
		},
		methods:{
			go: function(){
				//pdfMake.createPdf(docDefinition).print();
				//pdfMake.createPdf(docDefinition).download();


			}
		}
	}
</script>
