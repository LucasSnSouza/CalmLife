<template>
    <div class="sidebar-navigation-wrapper flex absolute w-full h-full x-end color-brand-two">

        <div class="bg-color-brand-one w-3-4 h-full scroll-y flex flex-column gap-lg p-xlg">

            <div class="flex gap-md">
                <div>
                    <ButtonBasic
                        class="bg-color-brand-three p-lg rounded-md"
                        @click="toggleSidebar()"
                    >
                        <MiscIcon
                            icon="return"
                            class="bg-color-brand-one"
                            :size="[18,18]"
                        />
                    </ButtonBasic>
                </div>
                <div class="flex flex-column">
                    <h1 class="font-md">Navegação</h1>
                    <p class="font-sm o-3-4">Instrumento para ajudar a navegar entre projetos</p>
                </div>
            </div>

            <div class="flex flex-column gap-sm">

                <ButtonBasic
                    class="bg-none p-md rounded-md flex y-center x-start gap-lg color-brand-two"
                >
                    <MiscIcon
                        icon="simple-arrow"
                        class="bg-color-brand-two"
                        style="transform: rotate(90deg);"
                        :size="[12,12]"
                    />
                    <h1 class="font-md">Projects</h1>
                </ButtonBasic>
                <div 
                    class="w-full flex flex-column gap-md"               
                >
                    <ButtonBasic
                        v-for="(item, index) in getEnabledResources"
                        class="bg-none w-full p-md rounded-md flex y-center gap-lg justify-between color-brand-two"
                        @click="$router.push({ path: item.path }), toggleSidebar()"
                        :index="index"
                    >
                        <div class="flex gap-md y-center">
                            <div
                                class="rounded-sm"
                                style="width: 14px; height: 14px; box-shadow: 2px 2px 8px #00000011;"
                                :style="{ backgroundColor: item.color }"
                            ></div>
                            <p>{{ $tr(item.name) }}</p>
                        </div>
                        <MiscIcon
                            icon="simple-arrow"
                            class="bg-color-brand-two"
                            :size="[10,10]"
                        />
                    </ButtonBasic>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

import { useSystemStore } from '@/stores/system.js'

import * as Button from '@/components/Button'
import * as Misc from '@/components/Misc'

export default{
    data(){
        return{

        }
    },
    components:{
        ...Button,
        ...Misc
    },
    methods: {
        toggleSidebar(){
            useSystemStore().toggleSidebar()
        },
    },
    computed: {
        getEnabledResources(){
            return useSystemStore().getEnabledRersources
        }
    }
}

</script>

<style lang="scss">

.sidebar-navigation-wrapper{
    top: 0px;
    left: 0px;
    background-color: var(--color-brand-five);
    backdrop-filter: blur(var(--scale-brand-lg));
    z-index: 5;
}

</style>