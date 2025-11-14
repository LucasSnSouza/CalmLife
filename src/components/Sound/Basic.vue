<template>

    <div class="sound-basic-wrapper shadow-sm w-full p-lg rounded-md bg-color-brand-one color-brand-three ghost flex x-start y-center gap-lg">

        <ButtonBasic
            class="rounded-md p-lg bg-color-brand-three"
            @click="$emit('pause'), paused = !paused"
        >
            <MiscIcon
                v-if="paused"
                class="bg-color-brand-one"
                icon="play-fill"
                :size="[20,20]"
            />
            <MiscIcon
                v-else
                class="bg-color-brand-one"
                icon="pause-fill"
                :size="[20,20]"
            />
        </ButtonBasic>

        <div class="sound-basic-information color-brand-two flex flex-column gap-md w-full">
            <h1 class="font-md">{{ title }}</h1>
            <input class="sound-basic-slide" type="range" min="0" max="100"/>
        </div>

    </div>

</template>

<script>

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"

export default {
    data(){
        return{
            paused: false
        }
    },
    props:{
        title: {
            type: String
        }
    },
    components: {
        ...Misc,
        ...Button,
    },
    methods: {
    },
    computed: {
    },
    created(){
    }
}


</script>

<style lang="scss">

.sound-basic-wrapper{


    .sound-basic-information{

        .sound-basic-slide{
            appearance: none;
            height: 4px;
            background: var(--color-brand-three);
            border-radius: 2px;
        }

        .sound-basic-slide::-webkit-slider-thumb{
            appearance: none;
            width: 14px;
            height: 14px;
            border: 3px solid var(--color-brand-three);
            background: white;
            border-radius: var(--scale-brand-sm);
            box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.150);
            cursor: pointer;
        }

    }

}

</style>
