<template>
    <div>
        <van-nav-bar
            title="标题"
            left-text="返回"
            right-text="按钮"
            left-arrow
        />
        <div>{{ user }}</div>
        <van-button type="default">默认按钮</van-button>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["user"])
    }
};
</script>