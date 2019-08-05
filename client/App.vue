<template>
    <div>
        <index></index>
    </div>
</template>

<script>
import "/imports/collections/Time";
import index from "./pages/index/index";
export default {
    components: {
        index
    },
    data() {
        return {
          
        };
    },
    // Vue Methods
    methods: {
       
    },
    // Meteor reactivity
    meteor: {
       
    },
    mounted() {
        console.log(23);
        //   this.data=this.TimeCursor
    }
};
</script>

<style scoped>
p {
    font-size: 2em;
}
</style>