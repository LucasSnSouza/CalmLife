<template>

    <div class="wrapper-homeview color-brand-two h-full font-sm flex flex-column gap-md">

        <div class="color-brand-two flex flex-column gap-sm">
            <h1 class="font-md">Olá, {{ getDayPeriod() }}</h1>
            <p class="w-3-4">
                Seja bem vindo a o nosso aplicativo de ajuda geral.
            </p>
        </div>

        <div class="flex gap-sm">
            <ButtonBasic
                class="rounded-md bg-color-brand-four w-half aspect-ratio color-brand-one p-lg flex flex-column gap-sm justify-between"
                @click="toggleTheme()"
            >
                <div class="flex">
                    <div class="color-brand-two ghost rounded-sm p-md">
                        <MiscIcon
                            icon="lamp-filled-icon"
                            class="bg-color-brand-two"
                            :size="[20,20]"
                        />
                    </div>
                </div>
                <div class="color-brand-two text-start">
                    <h1 class="font-md">Tema</h1>
                    <p class="font-sm">Alterar o Tema</p>
                </div>
            </ButtonBasic>
            <ButtonBasic
                class="rounded-md bg-color-brand-four w-half aspect-ratio color-brand-one p-lg flex flex-column gap-sm justify-between"
                @click="toggleTheme()"
            >
                <div class="flex">
                    <div class="color-brand-two ghost rounded-sm p-md">
                        <MiscIcon
                            icon="translate-filled-icon"
                            class="bg-color-brand-two"
                            :size="[20,20]"
                        />
                    </div>
                </div>
                <div class="color-brand-two text-start">
                    <h1 class="font-md">Linguagem</h1>
                    <p class="font-sm">Alterar o idioma</p>
                </div>
            </ButtonBasic>
        </div>

        <div class="w-full">
            <!-- <AdsenseRetangle ad-slot="4058977152"/> -->
        </div>

    </div>

</template>

<script>

import { useSystemStore } from '@/stores/system.js'

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"
import * as AdSense from "@/components/Adsense"

export default {
    data(){
        return{
            current_time: this.getCurrentTime()
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...AdSense
    },
    methods: {
        getDayPeriod(){
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                return "Bom dia";
            } else if (hour >= 12 && hour < 18) {
                return "Boa tarde";
            } else {
                return "Boa noite";
            }
        },
        getCurrentTime(){
            return `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`
        },
        toggleTheme(){
            useSystemStore().toggleTheme()
        },
    },
    computed: {
    },
    created(){
        window.setInterval(() => {
            this.current_time = this.getCurrentTime()
        }, 60000);
    }
}

</script>

<style lang="scss">

.panel-information{

    height: calc( 100% - 48px );

}

</style>
