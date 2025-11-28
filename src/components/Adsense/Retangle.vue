<template>
    <ins 
        class="adsbygoogle"
        style="display:block"
        :data-ad-client="adClient"
        :data-ad-slot="adSlot"
        data-ad-format="auto"
        data-full-width-responsive="true">
    </ins>
</template>

<script>
export default {
    name: "GoogleAd",
    data(){
        return{
        }
    },
    props: {
        adClient: {
            type: String,
            default: "ca-pub-5574985001749299"
        },
        adSlot: {
            type: String,
            required: true
        }
    },
    mounted() {
        // const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";
        // if (isLocal) {
        //     console.info("AdSense desabilitado no ambiente de desenvolvimento.");
        //     return;
        // }
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.warn("AdSense error:", e);
        }
    }
};
</script>
