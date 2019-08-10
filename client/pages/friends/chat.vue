<template>
	<div>
		<van-swipe-cell>
			<ul class="aui-list aui-media-list">
				<li
					class="aui-list-item aui-list-item-middle"
					v-for="(item, k) in muser"
					:key="k"
				>
					<div class="aui-media-list-item-inner">
						<div
							class="aui-list-item-media"
							style="width: 3rem;"
						>
							<img
								:src="item.profile.photo"
								class="aui-img-round aui-list-img-sm"
							/>
						</div>
						<div class="aui-list-item-inner aui-list-item-arrow">
							<div class="aui-list-item-text">
								<div class="aui-list-item-title aui-font-size-14">
									{{ item.username }}
								</div>
								<div class="aui-list-item-right">
									{{ $moment(item.createdAt).fromNow() }}
								</div>
							</div>
							<div class="aui-list-item-text">
								www.auicss.com
							</div>
						</div>
					</div>
				</li>
			</ul>

			<template slot="right">
				<van-button
					square
					type="danger"
					text="删除"
					style="height:100%"
				/>
			</template>
		</van-swipe-cell>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				loading: false,
				finished: false
			};
		},
		meteor: {
			// Subscriptions - Errors not reported spelling and capitalization.
			$subscribe: {
				users: []
			},
			muser() {
				return Meteor.users.find({});
			}
		},
		methods: {},
		created() {}
	};
</script>
