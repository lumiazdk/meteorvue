<template>
	<div>
		<van-nav-bar
			title="登录"
			left-text="返回"
			left-arrow
			@click-left="back"
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
				label="邮箱"
				placeholder="请输入邮箱"
				error-message="邮箱格式错误"
			/>
			<van-field
				label="密码"
				placeholder="请输入密码"
				type="password"
			/>
		</van-cell-group>
		<van-button
			type="default"
			@click="register"
		>注册</van-button>
		<van-button
			type="primary"
			@click="login"
		>登陆</van-button>
	</div>
</template>
<script>
	import { mapState, mapMutations } from "vuex";
	import { Accounts } from "meteor/accounts-base";

	export default {
		data() {
			return {
				email: "1126572821@qq.com",
				password: "123456"
			};
		},
		computed: {
			...mapState(["user"])
		},
		methods: {
			...mapMutations(["changePage"]),
			back() {
				console.log(23);
				this.changePage(false);
				this.$router.push({
					path: "/"
				});
			},
			register() {
				let registerData = {
					username: "zdkk",
					email: "1126572821@qq.com",
					password: "123456",
					profile: {
						autograph: "haha",
						photo:
							"https://res.cloudinary.com/lumiazdk/image/upload/v1564845073/20180513224039_tgfwu_hjjutj.png"
					}
				};

				Accounts.createUser(registerData, res => {
					if (res) {
						console.log(res);
						if (res.reason == "Email already exists.") {
							console.log("账户已存在");

							return;
						}
					} else {
						console.log("创建成功");
					}
				});
				sAlert.error("Your message");
			},
			add() {
				console.log(this.$refs.file.files);
				let that = this;
				let formData = new FormData();
				formData.append("files", this.$refs.file.files[0]);
				axios({
					method: "post",
					url: "/upload",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: formData
				}).then(res => {
					console.log(res);
					if (res.data.code == 0) {
						let data = res.data.data;
					} else {
					}
				});
				return;
				var insert = Post.insert({
					name: "zdk",
					content: "我的第一个post"
				});
				console.log(insert);
			},
			login() {
				let user = {
					email: this.email
				};
				Meteor.loginWithPassword(user, this.password, function(error) {
					if (error) {
						if (error.reason == "User not found") {
							layer.msg("暂无此用户");
						} else if (error.reason == "Incorrect password") {
							layer.msg("密码不正确");
						}
					} else {
						layer.msg("登陆成功");

						that.$state.go("tab.favorites");
					}
				});
			}
		},
		created() {
			console.log(Meteor.userId());
			// sAlert.error("Your message", { position: "top", zIndex: "999999" });
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
