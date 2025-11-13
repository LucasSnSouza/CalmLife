<template>
    <div class="sidepanel-environment-wrapper absolute w-full h-full flex x-end">
        <div class="flex flex-column gap-lg w-3-4 bg-color-brand-one p-xlg">

            <div class="flex gap-md">
                <div>
                    <ButtonBasic
                        class="bg-color-brand-three p-lg rounded-md"
                        @click="toggleEnvironmentInterface()"
                    >
                        <MiscIcon
                            icon="return"
                            class="bg-color-brand-one"
                            :size="[18,18]"
                        />
                    </ButtonBasic>
                </div>
                <div class="flex flex-column">
                    <h1 class="font-md">Sons Ambientes</h1>
                    <p class="font-sm o-3-4">Uma lista confortavel de sons ambientes para você relaxar a qualquer momento.</p>
                </div>
            </div>

            <ButtonBasic
                v-for="(item, index) in environment_sounds"
                class="sidepanel-environment-button w-full rounded-md bg-none flex gap-sm p-lg y-center bg-color-brand-three"
                :index="index"
                @click="addEnvironmentSound(item)"
            >
                <div class="sidepanel-environment-icon aspect-ratio">
                    <MiscIcon
                        :icon="item.icon"
                        class="bg-color-brand-one"
                        :size="[19,19]"
                    />
                </div>
                <div class="sidepanel-environment-title w-full h-full color-brand-one">
                    <p class="font-md">{{ item?.title }}</p>
                    <p class="font-md">{{ item?.description }}</p>
                </div>
            </ButtonBasic>
            
        </div>
    </div>
</template>

<script>

import { useEnvironmentStore } from '@/stores/environment.js'

import * as Button from '@/components/Button'
import * as Misc from '@/components/Misc'

export default{
    data(){
        return{
            environment_sounds: [
                {
                    title: "Chuva Fraca",
                    icon: "drop",
                    sound: "calm-rain"
                }
            ]
        }
    },
    components:{
        ...Button,
        ...Misc
    },
    computed: {
    },
    methods:{
        addEnvironmentSound(sound_data){
            useEnvironmentStore().addEnvironment(sound_data);
        },
        toggleEnvironmentInterface(){
            useEnvironmentStore().toggleEnvironmentInterface()
        }
    }
}

</script>

<style lang="scss">

.sidepanel-environment-wrapper{
    background: rgba(0, 0, 0, 0.150);

    .sidepanel-environment-button{

        .sidepanel-environment-icon{
            border-top-left-radius: var(--scale-brand-md);
            border-bottom-left-radius: var(--scale-brand-md);
        }

        .sidepanel-environment-title{
            border-top-right-radius: var(--scale-brand-md);
            border-bottom-right-radius: var(--scale-brand-md);
        }

    }

}

</style>