<template>
	<div>
		<van-nav-bar>
			<svg
				class="icon camera"
				aria-hidden="true"
				slot="right"
			>
				<use xlink:href="#iconshouye"></use>
			</svg>
		</van-nav-bar>
		<div class="banner">
			<van-image
				round
				width="10rem"
				height="10rem"
				v-if="muser"
				:src="muser.profile.photo"
			/>
		</div>
		<van-cell is-link>
			<template slot="title">
				<span class="custom-title">个人资料</span>
			</template>
		</van-cell>
		<van-cell is-link>
			<template slot="title">
				<span class="custom-title">我的宠物</span>
			</template>
		</van-cell>
		<van-cell is-link>
			<template slot="title">
				<span class="custom-title">我的消息</span>
			</template>
		</van-cell>
	</div>
</template>
<script>
export default {
	meteor: {
			// Subscriptions - Errors not reported spelling and capitalization.
			$subscribe: {
				users: []
			},
			muser() {
				return Meteor.users.findOne({_id:Meteor.userId()});
			}
		},
}
</script>
<style scoped>
	.banner {
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.camera{
		height: 15px;
		width: 15px
	}
</style>
