<template>
    <div>
        <div>
            <van-swipe :loop="true" :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <van-image style="height: 150px;width:100%" :src="image" />
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
                    <div
                        class="aui-card-list"
                        v-for="(item, k) in list"
                        :key="k"
                    >
                        <div
                            class="aui-card-list-header aui-card-list-user aui-border-b"
                        >
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
                                <i class="aui-iconfont aui-icon-note"></i> 666
                            </div>
                            <div>
                                <i class="aui-iconfont aui-icon-laud"></i> 888
                            </div>
                            <div>
                                <i class="aui-iconfont aui-icon-star"></i> 888
                            </div>
                        </div>
                    </div>
                    <div class="none" v-if="list.length == 0">
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
.van-sticky{
    background: white
}
</style>
