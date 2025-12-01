<template>
    <div class="input-color-wrapper relative">
        <input type="color" class="input-color" v-model="color" @input="$emit('color-action', this.color)"></input>
        <div class="p-sm color-brand-three ghost rounded-md">
            <div class="input-color-preview" :class="this.classPreview" :style="stylePreview"></div>
        </div>
    </div>
</template>

<script>

export default{
    data(){
        return{
            color: "#000000"
        }
    },
    emits: ['color-action'],
    props: {
        classPreview: {
            type: String,
            default: ""
        },
        stylePreview: {
            type: String,
            default: ""
        }
    },
    methods: {
    }
}

</script>

<style lang="scss">

.input-color-wrapper{

    .input-color{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .input-color-preview{
        background: v-bind(color)
    }
    
}

</style>