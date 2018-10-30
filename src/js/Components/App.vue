<template>
	<div>
		<welcome v-if="$root.welcome"></welcome>
		<one></one>
		<footer class="footer">
			<div class="container" :style="{position:'absolute',right:0+'px'}">
				<span class="text-muted">Powered By The Ninja.</span>
			</div>
		</footer>
	</div>
</template>
<script>
	export default{
	}
</script>
