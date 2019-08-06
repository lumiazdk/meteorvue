<template>
    <div>
        <!-- {{ Meteor.userId() }} -->
        <a class="waves-effect waves-light btn">button</a>
<a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
<a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a>
        <ul>
            <li v-for="(item, k) in muser" :key="k">{{ item.username }}</li>
        </ul>
        <button @click="register">click</button>
        <van-tabbar v-model="active">
            <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
            <van-tabbar-item name="friends" icon="friends-o"
                >标签</van-tabbar-item
            >
            <van-tabbar-item name="setting" icon="setting-o"
                >标签</van-tabbar-item
            >
        </van-tabbar>
    </div>
</template>
<script>
import { Accounts } from "meteor/accounts-base";
export default {
    data() {
        return {
            active: "home"
        };
    },
     meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      'User': []

    },
    muser(){
        return Meteor.users.find({}).fetch()
    }
    
  },
    computed: {
        users() {
            // console.log(Meteor.users.find({}).fetch())
            // return Meteor.users.find({}).fetch();
        }
    },
    methods: {
        register() {
            let registerData = {
                username: "zdkk",
                email: "1126572821@qq.com",
                password: "123456",
                profile: {
                    autograph: "haha",
                    photo: "http://phnlqajge.bkt.clouddn.com/timg.jpg"
                }
            };

            Accounts.createUser(registerData, res => {
                if (res) {
                    console.log(res)
                    if (res.reason == "Email already exists.") {
                        console.log("账户已存在");

                        return;
                    }
                } else {
                    console.log("创建成功");
                }
            });
        }
    }
};
</script>