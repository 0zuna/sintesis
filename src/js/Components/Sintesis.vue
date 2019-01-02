<template>
<div>
<div class="carousel-item">
	<main role="main" class="container sintesis">
		<h1 class="mt-5">Síntesis</h1>
		<p class="lead">
			Elije tus temas
		</p>
		<div class="form-check" v-for="(main, k) in $root.sintetizador.data" v-if="main.data">
			<div v-if="main.data.length>0">
				<input class="form-check-input sintesis-check" type="checkbox" :id="k" :value="k" @click="go">
				<label class="form-check-label" :for="k">{{main.text}}</label>
			</div>
		</div>
	</main>
</div>
<div v-for="(main,k) in $root.sintetizador.data" v-if="main.data && checadora.includes(k)" class="modal fade" :id="'modal_'+k" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style="padding-left: 0px !important;">
	<div class="modal-dialog modal-lg" role="document" style="margin:0;">
		<div class="modal-content" style="width:100vw;">
			<div class="modal-header">
				<h5 class="modal-title">{{main.text}}</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" :style="{'max-height': 90+'vh','overflow-y': 'auto'}">
				<div class="container">
					<div class="row">
						<div class="col-sm-12" v-for="nota in main.data" v-if="$root.sintetizador.notas.filter((noti)=>{return noti.idEditorial==nota.idEditorial}).length==0">
							<div class="card">
								<div class="card-body">
									<h4 class="card-title">{{nota.Titulo}}</h4>
									<h6 class="card-subtitle mb-2 text-muted">{{nota.StringName}}</h6>
									<p class="card-text">{{nota.Texto}}</p>
									<div v-if="is_ref">
										<a href="" class="card-link" :style="{float: 'right'}" @click.prevent="push(nota,main)" v-if="nota_principal.refs.filter((noti)=>{return noti.idEditorial==nota.idEditorial}).length==0">Agregar</a>
										<a href="" class="card-link" :style="{float: 'right'}" @click.prevent="pop(nota)" v-if="nota_principal.refs.filter((noti)=>{return noti.idEditorial==nota.idEditorial}).length>0">Eliminar</a>
									</div>
									<div v-else>
										<a href="" class="card-link" :style="{float: 'right'}" @click.prevent="push(nota,main)" v-if="$root.sintetizador.notas.filter((noti)=>{return noti.idEditorial==nota.idEditorial}).length==0">Agregar</a>
										<a href="" class="card-link" :style="{float: 'right'}" @click.prevent="pop(nota)" v-if="$root.sintetizador.notas.filter((noti)=>{return noti.idEditorial==nota.idEditorial}).length>0">Eliminar</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="carousel-item" v-for="(main,k) in $root.sintetizador.data" v-if="main.data && checadora.includes(k)">
	<main role="main" class="container sintesis">
		<h1 class="mt-5">Síntesis</h1>
		<button type="button" class="btn btn-outline-dark float-right" data-toggle="modal" :data-target="'#modal_'+k" :style="" @click="is_ref=false">Agregar Notas</button>
		<p class="lead">
			Sintetizando {{main.text}}
		</p>
		<div class="card" v-for="nota in $root.sintetizador.notas" v-if="main.text==nota.text">
			<div class="card-body">
				<button type="button" class="close" aria-label="Close" @click.prevent="pop(nota)">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="card-title">{{nota.Titulo}}</h4>
				<h6 class="card-subtitle mb-2 text-muted">{{nota.StringName}}</h6>
				<p class="card-text">{{nota.Texto}}</p>
				<div v-for="ref in nota.refs">
					<p class="card-text">
						<a :href="'https://www.gaimpresos.com'+ref.pdf" class="card-link" target="_blank">{{ref.StringName}}</a> {{ref.Autor}} Pag.{{ref.PaginaPeriodico}}
					</p>
				</div>
				<!--a href="#" class="card-link" :style="{float: 'right'}" @click.prevent="ref(nota)">Agregar Referencia</a-->
				<a href="#" class="card-link float-right" data-toggle="modal" :data-target="'#modal_'+k" @click.prevent="ref(nota)">Agregar Referencia</a>
			</div>
		</div>
	</main>
</div>
</div>
</template>
<script>
export default{ 
	data(){
		return {
			checadora:[],
			is_ref:false,
			nota_principal:[]
		}
	},
	methods:{
		go: function(){
			this.checadora=$.map($('input.sintesis-check:checkbox:checked'), function(e,i) {
				return +e.value;
			});
		},
		push: function(nota,main){
			if(this.is_ref){
				this.nota_principal.refs.push(nota)
			}else{
				this.$set(nota,'refs', [])
				this.$set(nota,'text', main.text)
				this.$root.sintetizador.notas.push(nota)
			}
		},
		pop: function(nota){
			if(this.nota_principal.refs)
				this.nota_principal.refs=this.nota_principal.refs.filter((noti)=>{return noti.idEditorial!=nota.idEditorial});
			this.$root.sintetizador.notas=this.$root.sintetizador.notas.filter((noti)=>{return noti.idEditorial!=nota.idEditorial});
		},
		ref: function(nota){
			this.nota_principal=nota;
			this.is_ref=true;
		},
		hola: function(nota){
			return this.nota_principal.refs.filter((noti)=>{return noti.idEditorial==nota.idEditorial}).length==0
		}
		
	}
}
</script>
