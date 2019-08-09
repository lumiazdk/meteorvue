<template>
	<div class="app">
		<div v-if="$route.path=='/'">
			<home v-if="active == 'home'"></home>
			<my v-if="active == 'my'"></my>
			<pictures v-if="active == 'pictures'"></pictures>
			<friends v-if="active == 'friends'"></friends>
		</div>
		<transition
			:name="transitionName"
			v-if="$route.path!='/'"
		>
			<keep-alive>
				<router-view class="
			Router">
				</router-view>
			</keep-alive>
		</transition>
		<van-tabbar
			v-model="active"
			v-if="$route.path=='/'"
		>
			<van-tabbar-item
				name="home"
				icon="home-o"
			>首页</van-tabbar-item>
			<van-tabbar-item
				name="pictures"
				icon="search"
			>晒图</van-tabbar-item>
			<van-tabbar-item
				name="friends"
				icon="friends-o"
			>宠友</van-tabbar-item>
			<van-tabbar-item
				name="my"
				icon="setting-o"
			>我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
	import { Accounts } from "meteor/accounts-base";
	import "../../../lib/collections/Post";
	import home from "../home/home";
	import my from "../my/my";
	import pictures from "../pictures/pictures";
	import friends from "../friends/friends";

	import axios from "axios";

	export default {
		components: {
			home,
			my,
			pictures,
			friends
		},
		data() {
			return {
				active: "home",
				show: true,
				transitionName: "slide-right"
			};
		},
		meteor: {
			// Subscriptions - Errors not reported spelling and capitalization.
			$subscribe: {
				users: []
			},
			muser() {
				// console.log(Meteor.users.find({}).fetch());
				return Meteor.users.find({}).fetch();
			}
		},
		computed: {
			users() {
				// console.log(Meteor.users.find({}).fetch())
				// return Meteor.users.find({}).fetch();
			}
		},
		methods: {
			register() {
				let registerData = {
					username: "zdkk" + Math.random(),
					email: "1126572821@qq.com" + Math.random(),
					password: "123456",
					profile: {
						autograph: "haha",
						photo: "http://phnlqajge.bkt.clouddn.com/timg.jpg"
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
				console.log(33);
				var insert = Post.insert({
					name: "zdk",
					content: "我的第一个post"
				});
				console.log(insert);
			},
			update() {
				var update = Post.upsert(
					{ _id: "S5YDQWe5AomLddCJLWJ" },
					{ $set: { content: "Alice" } }
				);
				console.log(update);
			}
		},
		created() {
			// console.log(2341234);
			// this.$router.push({
			// 	path: "/login"
			// });

			if (localStorage.pname) {
				this.active = localStorage.pname;
			} else {
				localStorage.pname = "home";
				this.active = localStorage.pname;
			}
		},
		watch: {
			active() {
				localStorage.pname = this.active;
			},
			$route(to, from) {
				// 切换动画
				let isBack = this.$router.isBack; // 监听路由变化时的状态为前进还是后退
				if (isBack) {
					this.transitionName = "slide-left";
				} else {
					this.transitionName = "slide-right";
				}
				this.$router.isBack = false;
			}
		}
	};
</script>
<style>
	.app {
		padding-bottom: 50px;
	}
	.Router {
		position: fixed;
		height: 100%;
		width: 100%;
		transition: all 0.377s ease;
		will-change: transform;
		top: 0;
		bottom: 0;
		backface-visibility: hidden;
		perspective: 1000;
	}
	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
</style>
