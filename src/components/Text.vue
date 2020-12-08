<template>
    <div class="text" v-html="dataHtml"/>
</template>
<script>
export default {
    name: 'text-word-press',
    props: {
        dataHtml: {
            type: String,
            required: true,
        },
    }
}
</script>
<style lang="scss">
.text {
    max-width: 640px;
    margin: 0 auto;
}
</style>
