<template>
	<div class="carousel-item">
		<main role="main" class="container sintesis">
			<h1 class="mt-5">Carton</h1>
			<p class="lead">
				Elije tus Cartones
			</p>
			<div>
				<select class="image-picker select-cartoon show-html" multiple="multiple">
					<option v-for="sakura in this.$root.cartoons" :key="sakura.idEditorial" :data-img-src="'assets/cuts/'+sakura.png" data-img-label="" :value="sakura.idEditorial" selected=true></option>
				</select>
			</div>
		</main>
	</div>
</template>
<script>
	export default{ 
		created(){
			setTimeout(function(){
			$("select.select-cartoon").imagepicker({show_label: false});
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
