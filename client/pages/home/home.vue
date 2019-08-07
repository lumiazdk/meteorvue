<template>
    <div>
        <van-swipe :loop="true" :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" style="height: 200px;width:100%" />
            </van-swipe-item>
        </van-swipe>
        <swiper :options="swiperOption" ref="mySwiper">
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
        <van-panel title="标题" desc="描述信息" status="状态">
            <div>内容</div>
        </van-panel>
        <van-pagination 
  v-model="currentPage" 
  :total-items="24" 
  :items-per-page="5"
/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            images: [
                "https://img.yzcdn.cn/vant/apple-1.jpg",
                "https://img.yzcdn.cn/vant/apple-2.jpg"
            ],
            swiperOption: {},
            currentPage: 1
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        // current swiper instance
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    }
};
</script>