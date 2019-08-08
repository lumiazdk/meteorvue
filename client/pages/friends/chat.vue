<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-swipe-cell>
                <template slot="left">
                    <van-button square type="primary" text="选择" />
                </template>

                <van-cell :border="false" title="单元格" value="内容" />

                <template slot="right">
                    <van-button square type="danger" text="删除" />
                    <van-button square type="primary" text="收藏" />
                </template>
            </van-swipe-cell>
        </van-list>
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

    methods: {
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 500);
        }
    }
};
</script>
