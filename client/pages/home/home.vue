<template>
	<div>
		<div
			id="mescroll"
			class="mescroll"
		>
			<div>
				<van-swipe
					:loop="true"
					:autoplay="3000"
				>
					<van-swipe-item
						v-for="(image, index) in images"
						:key="index"
					>
						<img
							v-lazy="image"
							style="height: 200px;width:100%"
						/>
					</van-swipe-item>
				</van-swipe>
				<swiper
					:options="swiperOption"
					ref="mySwiper"
				>
					<!-- slides -->
					<swiper-slide>I'm Slide 1</swiper-slide>
					<swiper-slide>I'm Slide 2</swiper-slide>
					<swiper-slide>I'm Slide 3</swiper-slide>
					<swiper-slide>I'm Slide 4</swiper-slide>
					<swiper-slide>I'm Slide 5</swiper-slide>
					<swiper-slide>I'm Slide 6</swiper-slide>
					<swiper-slide>I'm Slide 7</swiper-slide>
					<!-- Optional controls -->
				</swiper>
				<van-panel
					title="标题"
					desc="描述信息"
					status="状态"
				>
					<div>内容</div>
				</van-panel>

			</div>
		</div>

	</div>
</template>
<script>
	import MeScroll from "mescroll.js";
	import "mescroll.js/mescroll.min.css";
	export default {
		data() {
			return {
				mescroll: null, // mescroll实例对象
				mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
				mescrollUp: {
					// 上拉加载的配置.
					callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
					//以下是一些常用的配置,当然不写也可以的.
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 10 //每页数据条数,默认10
					},
					htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
					toTop: {
						//回到顶部按钮
						src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
						offset: 1000 //列表滚动1000px才显示回到顶部按钮
					},
					empty: {
						//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
						warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
						icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
						tip: "暂无相关数据~" //提示
					}
				},
				dataList: [], // 列表数据
				images: [
					"https://img.yzcdn.cn/vant/apple-1.jpg",
					"https://img.yzcdn.cn/vant/apple-2.jpg"
				],
				swiperOption: {
					slidesPerView: 3,
					spaceBetween: 30,
					freeMode: true
				}
			};
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		created: function() {
			//创建MeScroll对象
			if (this.mescroll) return;
			console.log(22);
			this.mescroll = new MeScroll(this.$refs.mescroll, {
				//在mounted初始化mescroll,确保此处配置的ref有值
				// down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
				up: {
					callback: this.upCallback,
					// 以下是一些常用的配置,当然不写也可以的.
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 10 //每页数据条数,默认10
					},
					htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;

					toTop: {
						//回到顶部按钮
						src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
						offset: 1000 //列表滚动1000px才显示回到顶部按钮
					},
					empty: {
						//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
						warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
						icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
						tip: "暂无相关数据~" //提示
					}
				}
			});
		},
		methods: {
			//上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
			upCallback(page, mescroll) {
				// 联网请求
				let arr = [];
				this.dataList = this.dataList.concat(arr);
				// 数据渲染成功后,隐藏下拉刷新的状态

				this.$nextTick(() => {
					mescroll.endSuccess(arr.length);
				});
			}
		},
		destroyed() {
			this.mescroll.destroy();
		}
	};
</script>
<style>
</style>
