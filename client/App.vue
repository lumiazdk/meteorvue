<template>
	<div>
		<index></index>
	</div>
</template>

<script>
	import "/lib/collections/Time";
	import index from "./pages/index/index";
	import persondetail from "./pages/persondetail/persondetail";

	import { mapState } from "vuex";
	export default {
		components: {
			index
		},
		computed: {},
		data() {
			return {};
		},
		// Vue Methods
		methods: {},
		// Meteor reactivity
		meteor: {},
		mounted() {}
	};
</script>

<style scoped>
</style>