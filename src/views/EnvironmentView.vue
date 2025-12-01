<template>

    <div class="wrapper-environment color-brand-two h-full font-sm flex flex-column gap-md">

        <h1 class="font-md">{{ $tr("environment_view.environment_title") }}</h1>
        <p class="w-3-4">
            {{ $tr("environment_view.environment_description") }}
        </p>

        <div class="flex gap-md">
            <ButtonBasic
                class="rounded-lg p-md bg-color-brand-four"
                @click="toggleEnvironmentInterface()"
            >
                <div class="bg-color-brand-five rounded p-md">
                    <MiscIcon
                        class="bg-color-brand-two"
                        icon="music-fill"
                        :size="[20,20]"
                    />
                </div>
            </ButtonBasic>
            <ButtonBasic
                class="rounded-lg p-md bg-color-brand-four"
                @click="favorite_modal = !favorite_modal"
            >
                <div class="bg-color-brand-five rounded p-md">
                    <MiscIcon
                        class="bg-color-brand-two"
                        icon="favorite"
                        :size="[20,20]"
                    />
                </div>
            </ButtonBasic>
        </div>

        <div class="flex flex-column gap-md scroll-y" style="height: 75%; padding-bottom: 60px;">

            <SoundBasic
                v-for="(item, index) in getEnvironmentSounds"
                :title="item.title"
                :description="item?.description"
                :photo="item.photo"
                @change="(event) => { setVolume(index, event.target.value) }"
                @pause="togglePause(index)"
                :index="index"
            >
            </SoundBasic>

        </div>

        <SidePanelEnvironment
            v-if="getEnvironmentShow"
        />

        <ModalBasic
            v-if="favorite_modal"
            :title="$tr('environment_view.favorite_environment_modal.title')"
            :cancel-button="$tr('modals.cancel')"
            :confirm-button="$tr('modals.create')"
            @cancel-action="favorite_modal = false"
            @confirm-action="setFavorite, favorite_modal = false"
        >
            <div class="flex flex-column gap-lg">
                <div class="flex flex-column gap-sm">
                    <p class="font-md o-half">{{ $tr("environment_view.favorite_environment_modal.description") }}</p>
                </div>
                <InputBasic
                    v-model="favorite_text"
                    class="rounded-md p-lg"
                    style="
                        border: 1px solid var(--color-brand-three);
                        box-shadow: 2px 2px 8px #00000011;
                    "
                    :placeholder="$tr('environment_view.favorite_environment_modal.placeholder')"
                    :value="favorite_text"
                ></InputBasic>
            </div>
        </ModalBasic>

    </div>

</template>

<script>

import { useEnvironmentStore } from '@/stores/environment.js'

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"
import * as Input from "@/components/Input"
import * as Modal from "@/components/Modal"
import * as Sound from "@/components/Sound"
import * as SidePanel from "@/components/SidePanel"

export default {
    data(){
        return{
            favorite_modal: false,
            favorite_text: ""
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...Modal,
        ...Input,
        ...Sound,
        ...SidePanel,
    },
    methods: {
        toggleEnvironmentInterface(){
            useEnvironmentStore().toggleEnvironmentInterface()
        },
        setVolume(index, volume){
            useEnvironmentStore().setVolume(index, volume)
        },
        togglePause(index){
            useEnvironmentStore().togglePause(index)
        },
        setFavorite(){
            const EnvironmentSoundsSanitized = useEnvironmentStore().getEnvironmentSounds.map(s => {
                const { howl, ...rest } = s;
                return rest;
            });
            Storage
            .get("app-favorites")
            .push("items", {
                    name: this.favorite_text,
                    items: EnvironmentSoundsSanitized
                })
            .save()
            this.toggleFavoriteEnvironmentInterface()
        }
    },
    computed: {
        getEnvironmentSounds(){
            return useEnvironmentStore().getEnvironmentSounds
        },
        getEnvironmentShow(){
            return useEnvironmentStore().getEnvironmentShow
        },
    },
    created(){
    }
}

</script>

<style lang="scss">

.panel-information{

    height: calc( 100% - 48px );

}

</style>
