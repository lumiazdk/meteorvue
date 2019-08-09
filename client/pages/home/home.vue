<template>
	<div>
		<div>

			<div
				id="mescroll"
				class="mescroll"
				ref='mescroll'
			>
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
				<van-sticky style="background:white">
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
								></div>
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
					<div class="line"></div>
				</van-sticky>

				<div id="animallist">
					<div
						class="aui-card-list"
						v-for="(item, k) in list"
						:key="k"
					>
						<div class="aui-card-list-header aui-card-list-user aui-border-b">
							<div class="aui-card-list-user-avatar">
								<img
									src="/aui/image/demo4.png"
									class="aui-img-round"
								/>
							</div>
							<div class="aui-card-list-user-name">
								<div>{{ item.name }}</div>
								<small>1天前</small>
							</div>
							<div class="aui-card-list-user-info">北京朝阳</div>
						</div>
						<div class="aui-card-list-content-padded">
							<img src="/aui/image/l2.png" />
						</div>
						<div class="aui-card-list-footer aui-border-t">
							<div>
								<svg
									class="icon cardicon"
									aria-hidden="true"
								>
									<use xlink:href="#iconshoucang"></use>
								</svg>
								666
							</div>
							<div>
								<svg
									class="icon cardicon"
									aria-hidden="true"
								>
									<use xlink:href="#icondianzan-copy"></use>
								</svg>
								888
							</div>
							<div>
								<svg
									class="icon cardicon"
									aria-hidden="true"
								>
									<use xlink:href="#iconpinglun"></use>
								</svg>
								888
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapMutations } from "vuex";
	import MeScroll from "mescroll.js";
	import "mescroll.js/mescroll.min.css";
	export default {
		data() {
			return {
				images: ["/img/b1.jpg", "/img/b2.jpg", "/img/b3.jpg"],
				swiperOption: {
					slidesPerView: 4,
					freeMode: true
				},
				list: [],
				pages: "",
				limit: 10,
				page: 1,
				mescroll: null //mescroll实例对象
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
				Meteor.call(
					"post",
					{ limit: this.limit, page: this.page },
					(error, success) => {
						if (error) {
							console.log("error", error);
						}
						if (success) {
							console.log(success);
							this.list = success.data;
							this.mescroll.endByPage(success.data, success.page);
							if (success.page == this.page) {
								console.log("showNoMore");
								this.mescroll.showNoMore();
							}
						}
					}
				);
				return Post.find({});
			}
		},
		mounted: function() {
			console.log("-----");

			//创建MeScroll对象
			this.mescroll = new MeScroll(this.$refs.mescroll, {
				//在mounted初始化mescroll,确保此处配置的ref有值
				// down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
				up: {
					callback: this.onLoad,
					//上拉回调
					//以下参数可删除,不配置
					isBounce: true,
					//此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
					page: {
						size: 10
					},
					//可配置每页8条数据,默认10
					toTop: {
						//配置回到顶部按钮
						src: "/img/mescroll-totop.png",
						//默认滚动到1000px显示,可配置offset修改
						//html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
						offset: 500
					},
					htmlNodata: '<p class=" foot"> end</p>',
					htmlLoading:
						'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">努力加载中..</p>',
					empty: {
						//配置列表无任何数据的提示
						warpId: "animallist",
						icon: "./img/mescroll-empty.png",
						tip: "亲,暂无相关数据哦~" // btntext : "去逛逛 >" ,
						// btnClick : function() {
						// 	alert("点击了去逛逛按钮");
						// }
					},
					lazyLoad: {
						use: true // 是否开启懒加载,默认false
					},
					bottomOffset: -50
				}
			});
		},
		methods: {
			...mapMutations(["changePage"]),
			onLoad(page) {
				this.page = page.num;

				Meteor.call(
					"post",
					{ limit: this.limit, page: page.num },
					(error, success) => {
						if (error) {
							console.log("error", error);
						}
						if (success) {
							console.log(success);
							this.list = success.data;
							this.page = page.num;
							this.mescroll.endByPage(success.data, success.page);
							console.log(success.page);
							console.log(page.num);
							if (success.page == page.num) {
								console.log("showNoMore");
								this.mescroll.showNoMore();
							}
						}
					}
				);
			}
		},
		destroyed() {
			this.mescroll.destroy();
		},
		watch: {}
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
	.van-sticky {
		background: white;
	}
	.cardicon {
		height: 15px;
		width: 15px;
	}
	.mescroll-empty {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	#mescroll {
		position: fixed;
		top: 0px;
		bottom: 50px;
		height: auto;
	}
</style>
