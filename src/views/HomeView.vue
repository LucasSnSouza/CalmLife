<template>

    <div class="wrapper-home color-brand-two h-full font-sm flex flex-column gap-lg">

        <div class="color-brand-two flex flex-column y-center">
            <h1 class="font-md text-center">{{ $tr("home_view.hello") }} {{ getDayPeriod() }}</h1>
            <p class="w-3-4 text-center">
                {{ $tr("home_view.welcome") }}
            </p>
        </div>

        <div class="flex gap-lg">
            <ButtonBasic
                class="rounded-lg bg-color-brand-four w-half aspect-ratio color-brand-one p-lg flex flex-column gap-sm justify-between"
                @click="toggleTheme()"
            >
                <div class="flex">
                    <div class="color-brand-two ghost rounded-md p-md">
                        <MiscIcon
                            icon="lamp-filled-icon"
                            class="bg-color-brand-two"
                            :size="[20,20]"
                        />
                    </div>
                </div>
                <div class="color-brand-two text-start">
                    <h1 class="font-md">{{ $tr("home_view.theme") }}</h1>
                    <p class="font-sm">{{ $tr("home_view.theme_description") }}</p>
                </div>
            </ButtonBasic>
            <ButtonBasic
                class="rounded-lg bg-color-brand-four w-half aspect-ratio color-brand-one p-lg flex flex-column gap-sm justify-between"
                @click="toggleLanguage()"
            >
                <div class="flex">
                    <div class="color-brand-two ghost rounded-md p-md">
                        <MiscIcon
                            icon="translate-filled-icon"
                            class="bg-color-brand-two"
                            :size="[20,20]"
                        />
                    </div>
                </div>
                <div class="color-brand-two text-start">
                    <h1 class="font-md">{{ $tr("home_view.language") }}</h1>
                    <p class="font-sm">{{ $tr("home_view.language_description") }}</p>
                </div>
            </ButtonBasic>
        </div>
        

    </div>

</template>

<script>

import { useSystemStore } from '@/stores/system.js'

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"

export default {
    data(){
        return{
            current_time: this.getCurrentTime()
        }
    },
    components: {
        ...Misc,
        ...Button,
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
        toggleLanguage(){
            useSystemStore().toggleLanguage()
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
