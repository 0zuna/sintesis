<template>
	<div>
		<div class="loading" :style="{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)'}">
			<h4>Cargando</h4>
		</div>
		<welcome v-if="$root.welcome"></welcome>
		<div class="hide main">
			<a href="javascript:void(0)" :style="{position:'fixed', right:10+'px',padding:10+'px','z-index': 1}" @click.prevent="go">CONTINUAR</a><br />
			<div id="carouselMain" class="carousel slide" data-ride="carousel">
				<div class="carousel-inner">
					<one></one>
					<sintesis v-if="$root.sintesis"></sintesis>
					<opinion v-if="$root.opinion"></opinion>
					<cartoon v-if="$root.cartoon"></cartoon>
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
			this.$root.clienta=this.sakura
		},
		props: ['sakura'],
		methods:{
			go: function(){
				if($(".carousel-item").length==$('div.carousel-item').index($('div.carousel-item.active')) + 1){
					this.$root.sakura()
				}else{
					var index=$('div.carousel-item').index($('div.carousel-item.active')) + 1;
					//$('.carousel').carousel('next')
					$('div.carousel-item.active').addClass('carousel-item-left')
					setTimeout(function(){
						$('.carousel-item').removeClass("active carousel-item-left")
						$('.carousel-item').eq(index).addClass("active")
					},500);
				}
			}
		}
	}
</script>
