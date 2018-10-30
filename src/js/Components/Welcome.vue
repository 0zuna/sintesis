<template>
	<div>
		<main role="main" class="container welcome">
			<h1 class="mt-5">Bienvenido</h1>
			<p class="lead">Asistente para creación de Sintesis</p>
			<p>Se le guiará a través de varios pasos para ayudarle a crear su documento.</p>
			<p>
				para iniciar el proceso de click
				<a href="javascrip:void(0)" @click.prevent="go">aqui</a>.
			</p>
		</main>
	</div>
</template>
<script>
	export default{
		methods:{
			go: function(){
				$(".welcome").fadeOut("slow",function(){
					$(".step-one").fadeIn("slow");
				});
			}
		}
	}
</script>
