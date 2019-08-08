<template>
	<div>
		<div>
			<van-swipe
				:loop="true"
				:autoplay="3000"
			>
				<van-swipe-item
					v-for="(image, index) in images"
					:key="index"
				>
					<van-image
						style="height: 150px;width:100%"
						:src="image"
					/>
				</van-swipe-item>
			</van-swipe>
			<van-sticky>
				<div style="padding:0 10px;background:white">
					<swiper
						:options="swiperOption"
						ref="mySwiper"
						style="margin-top:10px"
						fit="none"
					>
						<!-- slides -->
						<swiper-slide>
							<div
								class="animatebox"
								@click="changePage(true)"
								:style="{ background: `url(${'/img/t1.jpg'})` }"
							>
								<!-- <van-image
                                    style="height: 100%;width:100%;border-radius: 8px;"
                                    src="/img/t1.jpg"
                                /> -->
							</div>
						</swiper-slide>

						<swiper-slide>
							<div
								class="animatebox"
								:style="{ background: `url(${'/img/t2.jpg'})` }"
							></div>
						</swiper-slide>
						<swiper-slide>
							<div class="animatebox"></div>
						</swiper-slide>
						<swiper-slide>
							<div class="animatebox"></div>
						</swiper-slide>
						<!-- Optional controls -->
					</swiper>
				</div>
			</van-sticky>

			<div class="line"></div>

			<van-pull-refresh
				v-model="isLoading"
				@refresh="onRefresh"
				style="min-height:300px"
			>
				<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
				>
					<van-panel
						desc="描述信息"
						v-for="(item,k) in list"
						:key="k"
						:title="item.name"
					>
						<van-grid
							:border="false"
							:column-num="3"
						>
							<van-grid-item>
								<van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
							</van-grid-item>
							<van-grid-item>
								<van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
							</van-grid-item>
							<van-grid-item>
								<van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
							</van-grid-item>

						</van-grid>
					</van-panel>
					<div
						class="none"
						v-if="list.length == 0"
					>
						<van-image
							src="/img/mescroll-empty.png"
							style="width:200px"
						/>
					</div>
				</van-list>
			</van-pull-refresh>
		</div>
	</div>
</template>
<script>
	import { mapMutations } from "vuex";
	// import "../../../lib/collections/Post";
	// import "/imports/collections/Post";

	export default {
		data() {
			return {
				images: ["/img/b1.jpg", "/img/b2.jpg", "/img/b3.jpg"],
				swiperOption: {
					slidesPerView: 4,
					// spaceBetween: 30,
					freeMode: true
				},
				list: [],
				loading: false,
				finished: false,
				count: 0,
				isLoading: false,
				page: 0,
				PlayersPages: "",
				pages: "",
				limit: 3
			};
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		meteor: {
			// Subscriptions - Errors not reported spelling and capitalization.
			$subscribe: {
				Post: []
			},
			getPost() {
				this.pages = Math.ceil(Counts.get("PostCounts") / this.limit) || 1;
				this.list = Post.find(
					{},
					{ sort: { createdAt: -1 }, limit: this.limit * this.page }
				).fetch();
				if (this.list.length < 10) {
					this.finished = true;
				} else {
					this.finished = false;
				}
			}
		},
		mounted: function() {},
		methods: {
			...mapMutations(["changePage"]),
			onLoad() {
				console.log(2323);
				this.page = this.page + 1;
				this.pages = Math.ceil(Counts.get("PostCounts") / this.limit) || 1;
				if (this.page > this.pages) {
					this.finished = true;
				}
				this.list = Post.find(
					{},
					{ sort: { createdAt: -1 }, limit: this.limit * this.page }
				).fetch();
				if (this.list.length < 10) {
					this.finished = true;
				} else {
					this.finished = false;
				}
				console.log(
					Post.find(
						{},
						{ sort: { createdAt: -1 }, limit: this.limit * this.page }
					).fetch()
				);
				this.loading = false;
			},
			onRefresh() {
				this.page = 1;
				this.list = Post.find(
					{},
					{ sort: { createdAt: -1 }, limit: this.limit * this.page }
				).fetch();

				setTimeout(() => {
					this.$toast("刷新成功");
					this.isLoading = false;
					this.finished = false;
				}, 500);
			}
		},
		destroyed() {}
	};
</script>
<style scope>
	.animatebox {
		height: 70px;
		width: 70px;
		border-radius: 8px;
		background: wheat;
		background-size: cover !important;
	}
	.line {
		height: 10px;
		width: 100%;
		background: #eeeeee;
		margin-top: 10px;
	}
	.none {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
