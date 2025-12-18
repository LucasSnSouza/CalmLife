<template>

    <div class="wrapper-market color-brand-two h-full font-sm flex flex-column gap-md">

        <h1 class="font-md">{{ $tr("market_view.market_title") }}</h1>
        <p class="w-3-4">
            {{ $tr("market_view.market_description") }}
        </p>

        <div class="flex gap-md bg-color-brand-four rounded-md p-sm">
            <div class="flex gap-sm w-full x-start">
                <ButtonBasic
                    class="rounded-md bg-color-grandit-brand-one w-full h-full p-md flex gap-md"
                    @click=""
                >
                    <div class="color-brand-two text-start flex flex-column y-start x-center">
                        <p class="font-md color-brand-one">{{ $tr("market_view.compare_list") }}</p>
                    </div>
                </ButtonBasic>
                <div 
                    class="bg-color-brand-five p-md rounded-md flex flex-column"
                >
                    <p class="o-half">Compras</p>
                    <p>{{ checkoutCount.toFixed(2) }}</p>
                </div>
                <div 
                    class="bg-color-brand-five p-md rounded-md"
                >
                    <p class="o-half">Produtos</p>
                    <p>{{ checkoutAmount }}</p>
                </div>
            </div>
        </div>

        <div class="flex gap-md">
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

        <div 
            class="flex flex-column gap-md scroll-y" 
            style="
                height: 75%; 
                padding-bottom: 80px;"
        >

            <div
                v-for="(item, index) in getMarketItemsList"
                class="flex gap-md"
                :index="index"
            >
                <ButtonBasic 
                    class="item-list w-full rounded-md p-sm flex y-center gap-sm text-start x-start hidden color-brand-two bg-color-brand-four"
                    style="height: 64px;"
                >
                    <div 
                        class="flex flex-column w-half"
                        @click="add_item_modal = true, item_form = item, showSuggestions = false"
                    >
                        <p class="font-md">{{ item.name }}</p>
                        <p class="font-sm o-half">{{ item?.description }}</p>
                        <p v-if="item?.discount" class="font-sm color-brand-three">Com desconto</p>
                    </div>
                    <div class="flex gap-sm w-half x-end">
                        <div 
                            v-if="item?.value"
                            class="bg-color-brand-five p-md rounded-md flex flex-column w-full"
                        >
                            <p class="o-half">Valor</p>
                            <p>{{ item?.discount ? item?.discount.value : item?.value }}</p>
                        </div>
                        <div 
                            v-if="item?.amount"
                            class="bg-color-brand-five p-md rounded-md flex flex-column w-full"
                        >
                            <p class="o-half">Quantidade</p>
                            <p>{{ item?.amount }}</p>
                        </div>
                    </div>
                </ButtonBasic>
            </div>

        </div>

        <ModalBasic
            v-if="add_item_modal"
            :title="item_form?.edit ? 'Editar informações' : 'Adicionar item a lista'"
            :cancel-button="item_form?.edit ? $tr('modals.return') : $tr('modals.cancel')"
            :confirm-button="item_form?.edit ? null : $tr('modals.include')"
            @cancel-action="add_item_modal = false, showSuggestions = true, defaultItemForm()"
            @confirm-action="addItem(), add_item_modal = false, showSuggestions = true, defaultItemForm()"
        >
            <div class="flex flex-column gap-lg">
                <div class="flex gap-md">
                    <div class="relative w-full">
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
                        />
                        <div 
                            v-if="filteredItems.length"
                            class="absolute bg-color-brand-one p-lg rounded-lg w-full flex gap-md"
                            style="box-shadow: 2px 2px 8px #00000022; margin-top: 5px; flex-wrap: wrap;"
                        >
                            <ButtonBasic
                                v-for="(item, index) in filteredItems"
                                class="rounded bg-color-brand-three p-md color-brand-one"
                                :index="index"
                                @click="selectItem(item)"
                            >
                                <p>{{ item.name }}</p>
                            </ButtonBasic>                            
                        </div>
                    </div>
                </div>
                <div class="flex gap-md">
                    <InputBasic
                        v-model="item_form['amount']"
                        class="rounded-md p-lg w-full flex gap-md"
                        input-class="color-brand-two"
                        style="
                            border: 1px solid var(--color-brand-three);
                            box-shadow: 2px 2px 8px #00000011;
                        "
                        placeholder="Quantidade"
                        :value="item_form['amount']"
                    >
                        <p>Unidade{{ item_form?.amount > 1 ? "(s)" : "" }}</p>
                    </InputBasic>
                    <InputBasic
                        v-model="item_form['value']"
                        class="rounded-md p-lg w-full flex gap-md"
                        input-class="color-brand-two"
                        style="
                            border: 1px solid var(--color-brand-three);
                            box-shadow: 2px 2px 8px #00000011;
                        "
                        placeholder="Valor"
                        :value="item_form['value']"
                    >
                        <p>R$</p>
                    </InputBasic>
                </div>
                <div class="flex gap-md">
                    <p class="font-md text-center w-full">Informações Adicionais</p>
                </div>
                <div class="flex flex-column gap-lg">
                    <div class="flex gap-md">
                        <InputSelect
                            class="rounded-md p-lg flex gap-md"
                            :class="item_form.unit.short == 'kg' ? 'w-half' : 'w-full' "
                            input-class="color-brand-two"
                            style="
                                border: 1px solid var(--color-brand-three);
                                box-shadow: 2px 2px 8px #00000011;
                            "
                            placeholder="Calcular Por"
                            reference="name"
                            :items="item_units"
                            :value="item_form['unit']"
                            
                        >
                            <template #default="{ item }">
                                <ButtonBasic
                                    class="rounded bg-color-brand-three p-md color-brand-one"
                                    @click="item_form['unit'] = item"
                                >
                                    <p>{{ item.name }}</p>
                                </ButtonBasic>
                            </template>
                        </InputSelect>
                        <InputBasic
                            v-if="item_form?.unit.short == 'kg'"
                            v-model="item_form['weight']"
                            class="rounded-md p-lg w-half flex gap-md"
                            input-class="color-brand-two"
                            style="
                                border: 1px solid var(--color-brand-three);
                                box-shadow: 2px 2px 8px #00000011;
                            "
                            placeholder="Peso"
                            :value="item_form['weight']"
                        >
                            <p>{{ item_form?.unit.short }}</p>
                        </InputBasic>
                    </div>
                    <div 
                        v-if="item_form?.unit.short != 'kg'"
                        class="flex gap-md"
                    >
                        <ButtonBasic
                            v-if="!item_form?.discount"
                            class="rounded-md bg-color-brand-four p-lg color-brand-two w-full"
                            @click="item_form['discount'] = { enabled: true }"
                        >
                            <p class="color-brand-two">Contem Promoção</p>
                        </ButtonBasic>
                        <div
                            v-if="item_form?.discount && item_form?.discount.enabled"
                            class="flex gap-md"
                        >
                            <InputBasic
                                v-model="item_form['discount']['amount']"
                                class="rounded-md p-lg w-half flex gap-md"
                                input-class="color-brand-two"
                                style="
                                    border: 1px solid var(--color-brand-three);
                                    box-shadow: 2px 2px 8px #00000011;
                                "
                                placeholder="Quantidade"
                                :value="item_form['discount']['amount']"
                            >
                                <p>{{ item_form?.unit.name }}</p>
                            </InputBasic>
                            <InputBasic
                                v-model="item_form['discount']['value']"
                                class="rounded-md p-lg w-half flex gap-md"
                                input-class="color-brand-two"
                                style="
                                    border: 1px solid var(--color-brand-three);
                                    box-shadow: 2px 2px 8px #00000011;
                                "
                                placeholder="Valor do Desconto"
                                :value="item_form['discount']['value']"
                            >
                                <p>R$</p>
                            </InputBasic>
                        </div>
                    </div>
                </div>
                <InputText
                    v-model="item_form['description']"
                    input-class="color-brand-two"
                    placeholder="Tem observações do produto?"
                    :value="item_form['description']"
                />
            </div>
        </ModalBasic>

    </div>

</template>

<script>

import { useEnvironmentStore } from '@/stores/environment.js'
import { useMarketStore } from '@/stores/market.js'

import { MarketItems } from '@/assets/market/items.js'

import * as Misc from "@/components/Misc"
import * as Button from "@/components/Button"
import * as Sound from "@/components/Sound"
import * as Modal from "@/components/Modal"
import * as Input from "@/components/Input"

export default {
    data(){
        return{
            showSuggestions: true,
            add_item_modal: false,
            item_form: {
                unit: {
                    name: "Unidade",
                    short: "un"
                }
            },
            item_units: [
                {
                    name: "Unidade",
                    short: "un"
                },
                {
                    name: "Pacote",
                    short: "pct"
                },
                {
                    name: "Kilograma",
                    short: "kg"
                }
            ],
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
        selectItem(item) {
            this.item_form = { ...this.item_form, ...item }
            this.item_form.name = item.name
            this.showSuggestions = false
        },
        addItem(){
            useMarketStore().addItem({ ...this.item_form, gotten: false, edit: true })
        },
        defaultItemForm(){
            this.item_form = {
                unit: {
                    name: "Unidade",
                    short: "un"
                }
            }
        }
    },
    computed: {
        getEnvironmentSounds(){
            return useEnvironmentStore().getEnvironmentSounds
        },
        getMarketItemsList(){
            return useMarketStore().getItemsList
        },
        checkoutCount() {
            return this.getMarketItemsList
                .map(item => {
                    const value = parseFloat((item.value || "0").replace(',', '.'));
                    const amount = Number(item.amount) || 0;
                    if (item?.unit && item.unit.short === "kg") {
                        const full_weight = (Number(item?.weight || 1) * amount) / 1000;
                        return full_weight * value;
                    }
                    if (item?.discount) {
                        const dAmount = Number(item.discount.amount) || 0;
                        const dValue = parseFloat((item.discount.value || "0").replace(',', '.'));
                        if (dAmount > 0) {
                            const groups = Math.floor(amount / dAmount);
                            const rest   = amount % dAmount;
                            const totalWithDiscount =
                                (groups * dValue) +
                                (rest * value);
                            return totalWithDiscount;
                        }
                    }
                    return value * amount;
                })
                .reduce((total, num) => total + num, 0);
        },
        checkoutAmount() {
            return this.getMarketItemsList.reduce((soma, item) => {
                if (item?.unit && item.unit.short === "kg") {
                    return soma + 1;
                }
                return soma + Number(item.amount);
            }, 0);
        },
        filteredItems() {
            if (!this.item_form?.name || !this.showSuggestions) return []
                const search = this.item_form.name.toLowerCase()
                return MarketItems.filter(item =>
                item.name.toLowerCase().startsWith(search)
            )
        }
    },
    created(){
    }
}

</script>

<style lang="scss">

</style>
