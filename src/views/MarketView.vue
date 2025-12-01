<template>

    <div class="wrapper-market color-brand-two h-full font-sm flex flex-column gap-md">

        <h1 class="font-md">{{ $tr("market_view.market_title") }}</h1>
        <p class="w-3-4">
            {{ $tr("market_view.market_description") }}
        </p>

        <div class="flex gap-lg">
            <ButtonBasic
                class="rounded-lg bg-color-brand-four w-half aspect-ratio color-brand-one p-lg flex flex-column gap-sm justify-between"
                @click="add_item_modal = true"
            >
                <div class="flex">
                    <div class="color-brand-two ghost rounded-md p-md">
                        <MiscIcon
                            icon="box-fill"
                            class="bg-color-brand-two"
                            :size="[20,20]"
                        />
                    </div>
                </div>
                <div class="color-brand-two text-start">
                    <h1 class="font-md">{{ $tr("market_view.add_item") }}</h1>
                    <p class="font-sm">{{ $tr("market_view.add_item_description") }}</p>
                </div>
            </ButtonBasic>
            <div
                class="w-half flex flex-column gap-md"
            >
                <ButtonBasic
                    class="rounded-lg bg-color-brand-four w-full h-full color-brand-one p-lg flex gap-md"
                    @click=""
                >
                    <div class="color-brand-two text-start flex flex-column y-start x-center">
                        <h1 class="font-md">{{ $tr("market_view.save_list") }}</h1>
                        <p class="font-sm">{{ $tr("market_view.save_list_description") }}</p>
                    </div>
                </ButtonBasic>
                <ButtonBasic
                    class="rounded-lg bg-color-brand-four w-full h-full color-brand-one p-lg flex gap-md"
                    @click=""
                >
                    <div class="color-brand-two text-start flex flex-column y-start x-center">
                        <h1 class="font-md">{{ $tr("market_view.compare_list") }}</h1>
                        <p class="font-sm">{{ $tr("market_view.compare_list_description") }}</p>
                    </div>
                </ButtonBasic>
            </div>
        </div>

        <div class="flex flex-column gap-md scroll-y" style="height: 75%;">


        </div>

        <ModalBasic
            v-if="add_item_modal"
            title="Adicionar item a lista"
            :cancel-button="$tr('modals.cancel')"
            :confirm-button="$tr('modals.include')"
            @cancel-action="add_item_modal = false"
            @confirm-action="addItem(), add_item_modal = false"
        >
            <div class="flex flex-column gap-lg">
                <div class="flex gap-md">
                    <InputBasic
                        v-model="item_form['name']"
                        class="rounded-md p-lg w-full"
                        input-class="color-brand-two"
                        style="
                            border: 1px solid var(--color-brand-three);
                            box-shadow: 2px 2px 8px #00000011;
                        "
                        placeholder="Insira o nome do item"
                        :value="item_form['name']"
                    ></InputBasic>
                </div>
            </div>
        </ModalBasic>

    </div>

</template>

<script>

import { useEnvironmentStore } from '@/stores/environment.js'

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"
import * as Sound from "@/components/Sound"
import * as Modal from "@/components/Modal"
import * as Input from "@/components/Input"

export default {
    data(){
        return{
            add_item_modal: false,
            item_form: {},
            items_list: []
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...Sound,
        ...Modal,
        ...Input
    },
    methods: {
        toggleEnvironmentInterface(){
            useEnvironmentStore().toggleEnvironmentInterface()
        },
        toggleFavoriteEnvironmentInterface(){
            useEnvironmentStore().toggleFavoriteEnvironmentInterface()
        },
        togglePause(index){
            useEnvironmentStore().togglePause(index)
        },
        setVolume(index, volume){
            useEnvironmentStore().setVolume(index, volume)
        },
        addItem(){
            Storage.get('app-notes').push("items", this.item_form).save()
            this.items_list.push({...this.item_form})
        }
    },
    computed: {
        getEnvironmentSounds(){
            return useEnvironmentStore().getEnvironmentSounds
        }
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
