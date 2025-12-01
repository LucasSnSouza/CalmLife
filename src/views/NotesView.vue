<template>

    <div class="wrapper-notes color-brand-two h-full font-sm flex flex-column gap-md">

        <div class="flex flex-column gap-md" v-if="expand_screen">
            <div class="flex flex-column">
                <h1 class="font-md">Notas</h1>
                <p class="w-3-4">
                    Escreva notas e guarde recordações, ou lembretes para o futuro.
                </p>
            </div>
            <div class="flex gap-lg">
                <ButtonBasic
                    class="rounded-lg bg-color-brand-four w-half aspect-ratio color-brand-one p-lg flex flex-column gap-sm justify-between"
                    @click="note_modal = true"
                >
                    <div class="flex">
                        <div class="color-brand-two ghost rounded-md p-md">
                            <MiscIcon
                                icon="notes"
                                class="bg-color-brand-two"
                                :size="[20,20]"
                            />
                        </div>
                    </div>
                    <div class="color-brand-two text-start">
                        <h1 class="font-md">Criar Notas</h1>
                        <p class="font-sm">Cria uma nota rapida</p>
                    </div>
                </ButtonBasic>
                <div
                    class="w-half flex flex-column gap-md"
                >
                    <ButtonBasic
                        class="rounded-lg bg-color-brand-four w-full h-full color-brand-one p-lg flex gap-md"
                        @click="expand_screen = false"
                    >
                        <div class="color-brand-two text-start flex flex-column y-start x-center">
                            <h1 class="font-md">Esconder Ações</h1>
                            <p class="font-sm">Esconda os botões de ações</p>
                        </div>
                    </ButtonBasic>
                    <ButtonBasic
                        class="rounded-lg bg-color-brand-four w-full h-full color-brand-one p-lg flex gap-md"
                        @click=""
                    >
                        <div class="color-brand-two text-start flex flex-column y-start x-center">
                            <h1 class="font-md">Limpar Lista</h1>
                            <p class="font-sm">Volte a lista do zero</p>
                        </div>
                    </ButtonBasic>
                </div>
            </div>
        </div>

        <div class="flex gap-md" v-else>
            <ButtonBasic
                class="rounded-lg p-md bg-color-brand-four"
                @click="expand_screen = true"
            >
                <div class="bg-color-brand-five rounded p-md">
                    <MiscIcon
                        class="bg-color-brand-two"
                        icon="music-fill"
                        :size="[20,20]"
                    />
                </div>
            </ButtonBasic>
        </div>

        <div 
            class="flex flex-column gap-md scroll-y" 
            style="
                height: 75%; 
                padding-bottom: 80px;"
        >

            <div
                v-for="(item, index) in notes_list"
                class="flex gap-md"
                :index="index"
            >
                <ButtonBasic 
                    class="w-full rounded-md p-lg flex flex-column text-start x-start color-brand-one" 
                    :style="{ background: item?.background || 'var(--color-brand-four)' }"
                    @click="note_preview_form = item, note_preview_modal = true"
                >
                    <p class="font-md" :style="{ color: verifyLuminance(item.background) }">{{ item.title }}</p>
                    <p 
                        class="o-3-4 font-sm hidden" 
                        style="white-space: nowrap; text-overflow: ellipsis;"
                        :style="{ color: verifyLuminance(item.background) }"
                    >
                        {{ item.text }}
                    </p>
                </ButtonBasic>
            </div>

        </div>

        <ModalBasic
            v-if="note_modal"
            title="Nova Anotação"
            :cancel-button="$tr('modals.cancel')"
            :confirm-button="$tr('modals.create')"
            @cancel-action="note_modal = false"
            @confirm-action="addNote(), note_modal = false"
        >
            <div class="flex flex-column gap-lg">
                <div class="flex gap-md">
                    <InputBasic
                        v-model="note_form['title']"
                        class="rounded-md p-lg w-full"
                        input-class="color-brand-two"
                        style="
                            border: 1px solid var(--color-brand-three);
                            box-shadow: 2px 2px 8px #00000011;
                        "
                        placeholder="Insira o titulo da nota"
                        :value="note_form['title']"
                    ></InputBasic>
                    <InputColor
                        class-preview="rounded-sm"
                        style-preview="padding: 20px; box-shadow: 2px 2px 8px #00000022;"
                        @color-action="(color) => { note_form['background'] = color } "
                    />
                </div>
                <InputText
                    v-model="note_form['text']"
                    input-class="color-brand-two"
                    input-style="height: 200px;"
                    placeholder="Digite sua nota aqui ..."
                    :value="note_form['text']"
                />
            </div>
        </ModalBasic>

        <ModalBasic
            v-if="note_preview_modal"
            :cancel-button="$tr('modals.return')"
            @cancel-action="note_preview_modal = false"
        >
            <div class="flex flex-column gap-md p-lg">
                <div class="flex gap-md">
                    <h1 class="font-md">{{ note_preview_form?.title }}</h1>
                </div>
                <p>
                    {{ note_preview_form?.text }}
                </p>
            </div>
        </ModalBasic>

    </div>

</template>

<script>

import { useEnvironmentStore } from '@/stores/environment.js'

import { Storage } from "@/utils/storage.js"

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"
import * as Modal from "@/components/Modal"
import * as Input from "@/components/Input"
import * as Sound from "@/components/Sound"

export default {
    data(){
        return{
            expand_screen: true,
            note_preview_modal: false,
            note_preview_form: {},
            note_modal: false,
            note_form: { background: "#e9f1f8" },
            notes_list: [],
        }
    },
    components: {
        ...Misc,
        ...Button,
        ...Sound,
        ...Modal,
        ...Input,
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
        verifyLuminance(color){
            const r = parseInt(color.substr(1, 2), 16);
            const g = parseInt(color.substr(3, 2), 16);
            const b = parseInt(color.substr(5, 2), 16);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
            return luminance < 140 ? '#FFFFFF' : '#000000' 
        },
        setVolume(index, volume){
            useEnvironmentStore().setVolume(index, volume)
        },
        addNote(){
            Storage.get('app-notes').push("items", this.note_form).save()
            this.notes_list.push({...this.note_form})
        }
    },
    computed: {
        getEnvironmentSounds(){
            return useEnvironmentStore().getEnvironmentSounds
        }
    },
    created(){
        this.notes_list = Storage.get('app-notes').data.items
    }
}

</script>

<style lang="scss">

.panel-information{

    height: calc( 100% - 48px );

}

</style>
