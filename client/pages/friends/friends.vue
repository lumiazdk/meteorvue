<template>
    <div>
        <van-tabs v-model="active" sticky>
            <van-tab v-for="(item, k) in tab" :title="item.tag" :key="k">
                <person v-if="item.name == 'person'"></person>
                <chat v-if="item.name == 'chat'"></chat>

            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import person from "./person";
import chat from "./chat";

export default {
    components: {
        person,
        chat
    },
    data() {
        return {
            active: "",
            tab: [
                { name: "chat", tag: "会话" },
                { name: "person", tag: "好友" }
            ]
        };
    }
};
</script>