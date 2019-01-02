<template>
	<div id="step" class="carousel-item active">
		<main role="main" class="container step-one">
			<h1 class="mt-5">Paso 1</h1>
			<p class="lead">Elije tu contenido</p>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="portada" v-model="$root.portada">
				<label class="form-check-label" for="portada">Portada</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="columnas" v-model="$root.columnas">
				<label class="form-check-label" for="columnas">Columnas</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="sintesis" v-model="$root.sintesis">
				<label class="form-check-label" for="sintesis">Síntesis</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="opinion" v-model="$root.opinion">
				<label class="form-check-label" for="opinion">Opinión</label>
			</div>
			<div class="form-check">
				<input class="form-check-input" type="checkbox" id="cartones" v-model="$root.cartoon">
				<label class="form-check-label" for="cartones">Cartones</label>
			</div>
		</main>
	</div>
</template>
<script>
	export default{ 
		methods:{
			go: function(){
				    console.log('hola')
				//pdfMake.createPdf(docDefinition).print();
				//pdfMake.createPdf(docDefinition).download();

			}
		}
	}
</script>
