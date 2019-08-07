<template>
	<div class="app">
		<home v-if="active=='home'"></home>
		<my v-if="active=='my'"></my>

		<!-- {{ Meteor.userId() }} -->
		<!-- <a class="waves-effect waves-light btn" @click="add">add</a>
        <a class="waves-effect waves-light btn" @click="update"
            ><i class="material-icons left">cloud</i>update</a
        >
        <a class="waves-effect waves-light btn"
            ><i class="material-icons right">cloud</i>button</a
        >
        <ul>
            <li v-for="(item, k) in muser" :key="k">{{ item.username }}</li>
        </ul>
        <button @click="register">click</button>
        
        <input type="file" @change="add" ref="file" />
        <div v-for="i in 100">阿方索的</div> -->
		<van-tabbar v-model="active">
			<van-tabbar-item
				name="home"
				icon="home-o"
			>首页</van-tabbar-item>
			<van-tabbar-item
				name="search"
				icon="search"
			>晒图</van-tabbar-item>
			<van-tabbar-item
				name="friends"
				icon="friends-o"
			>养宠</van-tabbar-item>
			<van-tabbar-item
				name="my"
				icon="setting-o"
			>我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
	import { Accounts } from "meteor/accounts-base";
	import "../../../imports/collections/Post";
	import home from "../home/home";
	import my from "../my/my";

	import axios from "axios";

	export default {
		components: {
			home
		},
		data() {
			return {
				active: "home"
			};
		},
		meteor: {
			// Subscriptions - Errors not reported spelling and capitalization.
			$subscribe: {
				users: []
			},
			muser() {
				console.log(Meteor.users.find({}).fetch());
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
		}
	};
</script>
<style>
	.app {
		padding-bottom: 50px;
	}
</style>
