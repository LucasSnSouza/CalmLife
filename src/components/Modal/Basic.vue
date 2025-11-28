<template>

    <div class="modal-basic-wrapper absolute w-full h-full y-center p-xlg flex">
        <div class="modal-basic-panel bg-color-brand-one rounded-md hidden">
            <div 
                v-if="title"
                class="bg-color-brand-four p-xlg"
            >
                <p class="color-brand-three font-md w-full text-center">{{ title }}</p>
            </div>
            <div class="modal-basic-informations p-lg">
                <slot/>
            </div>
            <div class="modal-basic-actions p-lg flex gap-md">
    
                <ButtonBasic
                    v-if="cancelButton"
                    class="w-full p-lg rounded-md bg-none color-brand-three"
                    @click="$emit('cancel-action')"
                >
                    <p>{{ cancelButton }}</p>
                </ButtonBasic>
    
                <ButtonBasic
                    v-if="confirmButton"
                    class="w-full p-lg rounded-md bg-color-brand-three color-brand-one"
                    @click="$emit('confirm-action')"
                >
                    <p>{{ confirmButton }}</p>
                </ButtonBasic>
                
            </div>
        </div>
    </div>

</template>

<script>

import * as Button from "@/components/Button"

export default{
    data(){
        return{

        }
    },
    components: {
        ...Button
    },
    props: {
        title: {
            type: String,
            default: null
        },
        cancelButton: {
            type: String,
            default: null
        },
        confirmButton: {
            type: String,
            default: null
        }
    }
}

</script>

<style lang="scss">

.modal-basic-wrapper{
    background-color: var(--color-brand-five);
    backdrop-filter: blur(10px);
    z-index: 5;
}


</style>