<template>
	<div>
		<index></index>
		<van-popup
			v-model="pageShow"
			get-container="#app"
			position="right"
			style="width:100%;height:100%"
			:overlay-style="overlay"
			:lock-scroll='true'
		>
			<login></login>
		</van-popup>
	</div>
</template>

<script>
	import "/lib/collections/Time";
	import index from "./pages/index/index";

	import { mapState } from "vuex";
	export default {
		components: {
			index
		},
		computed: {
			...mapState(["pageShow"])
		},
		data() {
			return {
				show: false,
				overlay: { background: "#FFE" }
			};
		},
		// Vue Methods
		methods: {},
		// Meteor reactivity
		meteor: {},
		mounted() {
			console.log(23);
			//   this.data=this.TimeCursor
		}
	};
</script>

<style scoped>
</style>