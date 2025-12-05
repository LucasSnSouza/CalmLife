<template>

    <div class="subview-theme flex flex-column h-full">

        <div class="flex gap-md y-center">
            <div class="p-lg bg-color-brand-four rounded">
                <MiscIcon
                    class="bg-color-brand-two"
                    icon="like"
                    :size="[20,20]"
                />
            </div>
            <h1 class="font-md">Change your theme</h1>
        </div>

    </div>

</template>

<script>

import * as Misc from "@/components/Misc"

export default{
    data(){
        return{

        }
    },
    components:{
        ...Misc
    }
}

</script>

<style lang="scss">

</style>