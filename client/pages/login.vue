<template>
	<div>
		<van-nav-bar
			title="登录"
			left-text="返回"
			left-arrow
		/>
		<div class="banner">
			<van-image
				round
				width="10rem"
				height="10rem"
				src="https://img.yzcdn.cn/vant/cat.jpeg"
			/>
		</div>
		<van-cell-group>
			<van-field
				label="用户名"
				placeholder="请输入用户名"
			/>
			<van-field
				label="邮箱"
				placeholder="请输入邮箱"
				error-message="手机号格式错误"
			/>
		</van-cell-group>
		<div v-for="i in 100">asdfsd</div>
	</div>
</template>
<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState(["user"])
		}
	};
</script>
<style scoped>
	.banner {
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
