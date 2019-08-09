<template>
    <div>
        <van-index-bar>
            <div v-for="(item, k) in muser" :key="k">
                <van-index-anchor :index="k" />
                <ul class="aui-list aui-media-list">
                    <li class="aui-list-item aui-list-item-middle" v-for="(el, j) in item" :key="j">
                        <div class="aui-media-list-item-inner">
                            <div
                                class="aui-list-item-media"
                                style="width: 3rem;"
                            >
                                <img
                                    :src="el.profile.photo"
                                    class="aui-img-round aui-list-img-sm"
                                />
                            </div>
                            <div
                                class="aui-list-item-inner aui-list-item-arrow"
                            >
                                {{el.username}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </van-index-bar>
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
            let data = Meteor.users.find({});
            let obj = {};
            data.forEach(item => {
                if (
                    obj[
                        $("body")
                            .val(item.username)
                            .toPinyin()
                            .substr(0, 1).toUpperCase()
                    ]
                ) {
                    obj[
                        $("body")
                            .val(item.username)
                            .toPinyin()
                            .substr(0, 1).toUpperCase()
                    ].push(item);
                } else {
                    obj[
                        $("body")
                            .val(item.username)
                            .toPinyin()
                            .substr(0, 1).toUpperCase()
                    ] = [item];
                }
            });
            console.log(obj);
            return obj;
        }
    },
    methods: {},
    created() {
        var Array = ["鄂州", "白山", "朝阳", "阿拉善盟"];
        for (var i = 0; i < Array.length; i++) {
            console.log(
                $("body")
                    .val(Array[i])
                    .toPinyin()
                    .substr(0, 1).toUpperCase()
            );
        }
    }
};
</script>