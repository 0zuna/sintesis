<template>
	<div>
		<div v-if="$root.loading" :style="{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)'}">
			<h4>Cargando</h4>
		</div>
		<welcome v-if="$root.welcome"></welcome>
		<div class="hide main">
			<a href="javascript:void(0)" :style="{position:'fixed', right:10+'px',padding:10+'px','z-index': 1}" @click.prevent="go">CONTINUAR</a><br />
			<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
				<div class="carousel-inner">
					<one></one>
					<sintesis v-if="$root.sintesis"></sintesis>
					<opinion v-if="$root.opinion"></opinion>
					<carton v-if="$root.carton"></carton>
				</div>
			</div>
		</div>
		<footer class="footer">
			<div class="container" :style="{position:'absolute',right:0+'px'}">
				<span class="text-muted">Powered By The Ninja.</span>
			</div>
		</footer>
	</div>
</template>
<script>
	export default{
		mounted(){
			$('.carousel').carousel({pause:true,interval:false,wrap: false});
		},
		methods:{
			go: function(){
				if($(".carousel-inner > div").length==$('div.active').index() + 1){
					this.$root.sakura()
				}else{
					$('.carousel').carousel('next')
				}
			}
		}
	}
</script>
