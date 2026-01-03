<template>
    <div class="sidepanel-environment-wrapper absolute w-full h-full flex x-end">
        <div class="sidepanel-environment-frame flex flex-column gap-lg w-3-4 bg-color-brand-one p-xlg">

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
                    <h1 class="font-md">{{ $tr("environment_view.environment_title") }}</h1>
                    <p class="font-sm o-3-4">{{ $tr("environment_view.sidebar_sounds_list.description") }}</p>
                </div>
            </div>

            <div 
                class="flex"
                
            >
                <InputSelect
                    class="bg-color-brand-three rounded-md p-lg w-full color-brand-two"
                    placeholder="Filtrar"
                    input-options-class="bg-color-brand-one p-lg rounded-md flex flex-column gap-md color-brand-three ghost"
                    input-options-style="z-index: 10;"
                    reference="name"
                    :items="environment_types"
                    :value="environment_type"
                >
                    <template #default="{ item }">
                        <p class="color-brand-two" @click="environment_type = item">{{ item.name }}</p>
                    </template>
                </InputSelect>
            </div>

            <div 
                class="flex gap-md scroll-y h-full"
                style="flex-wrap: wrap;"
            >
                <ButtonBasic
                    v-for="(item, index) in getEnviromentSoundsList"
                    class="sidepanel-environment-button w-full rounded-md bg-none flex gap-sm relative y-center bg-color-brand-three"
                    :style="`
                        background-image: url('/images/${item.photo}');
                        background-size: cover;
                        background-position: center;
                    `"
                    :index="index"
                    @click="addEnvironmentSound(item)"
                >
                    <div 
                        class="sidepanel-environment-title p-md absolute color-brand-two bg-color-brand-one rounded-sm"
                        style="bottom: var(--scale-brand-md); left: var(--scale-brand-md);"
                    >
                        <p class="font-sm text-start">{{ item?.title }}</p>
                    </div>
                </ButtonBasic>
            </div>
            
        </div>
    </div>
</template>

<script>

import { useEnvironmentStore } from '@/stores/environment.js'

import { Storage } from "@/utils/storage.js"

import * as Button from '@/components/Button'
import * as Input from '@/components/Input'
import * as Misc from '@/components/Misc'

export default{
    data(){
        return{
            environment_type: {},
            environment_types: [
                { name: "Sons Naturais" },
                { name: "Sons Minecraft" }
            ],
            environment_sounds: [
                {
                    title: "Chuva leve",
                    description: "Um leve som de chuva para relaxar",
                    type: "Sons Naturais",
                    photo: "calm-rain.png",
                    sound: "calm-rain"
                },
                {
                    title: "Trovões",
                    description: "Sons de pequenos trovões distantes",
                    type: "Sons Naturais",
                    photo: "thunder-storm.png",
                    sound: "distant-thunder"
                },
                {
                    title: "Fogueira",
                    description: "Um adoravel som de fogueira queimando",
                    type: "Sons Naturais",
                    photo: "camp-fire.png",
                    sound: "campfire"
                },
                {
                    title: "Queda D'Agua",
                    description: "A agua escorrendo pela pequena cachoeira",
                    type: "Sons Naturais",
                    photo: "water-fall.png",
                    sound: "waterfall"
                },
                {
                    title: "Piano",
                    description: "Algumas notas de piano suaves",
                    type: "Sons Naturais",
                    photo: "piano.png",
                    sound: "piano"
                },
            ],
            favorite_sounds_list: []
        }
    },
    components:{
        ...Button,
        ...Misc,
        ...Input
    },
    computed: {
        getEnviromentSounds(){
            return useEnvironmentStore().getEnvironmentSounds
        },
        getEnviromentSoundsList(){
            return this.environment_sounds.filter(item => item.type === this.environment_type?.name) || []
        }
    },
    methods:{
        async addEnvironmentSound(sound_data){
            useEnvironmentStore().addEnvironment(sound_data);
            if(this.getEnviromentSounds.length > 2){
                
            }
        },
        toggleEnvironmentInterface(){
            useEnvironmentStore().toggleEnvironmentInterface()
        }
    },
    created(){
        this.favorite_sounds_list = Storage.get("app-favorites").data.items
    }
}

</script>

<style lang="scss" scoped>

@media screen and (min-width: 500px) {
    .sidepanel-environment-frame{
        width: 100%;
    }
}

.sidepanel-environment-wrapper{
    top: 0;
    left: 0;
    background-color: var(--color-brand-five);
    backdrop-filter: blur(var(--scale-brand-lg));
    z-index: 5;
}

.sidepanel-environment-frame{
    animation: fade-in 0.5s ease;

    .sidepanel-environment-button{

        transition: 0.2s;

        &:active{
            transform: scale(0.95);
        }

    }
}

@keyframes fade-in {
    from{
        width: 0%;
    }to{
        width: 75%;
    }
}

</style>