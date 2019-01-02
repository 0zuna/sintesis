<template>
	<div>
		<main role="main" class="container welcome">
			<h1 class="mt-5">Bienvenido</h1>
			<p class="lead">Asistente para creación de Síntesis</p>
			<p>Se le guiará a través de varios pasos para ayudarle a crear su documento.</p>
			<button type="button" class="btn btn-outline-dark btn-lg btn-block" @click.prevent="go" :style="">Comenzar</button>
		</main>
	</div>
</template>
<script>
	export default{
		methods:{
			go: function(){
				$(".welcome").fadeOut("slow",function(){
					$(".main").fadeIn("slow");
				});
			}
		}
	}
</script>
