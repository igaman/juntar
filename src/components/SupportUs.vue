<template>
    <section class="section">
        <h2 class="title">Nous soutenir</h2>
        <spinner v-if="!supportUsData"/>
        <div class="container has-text-centered" v-if="supportUsData">
            <text-word-press :dataHtml="supportUsData"/>
        </div>
    </section>
</template>

<script>
import Spinner from './Spinner.vue';
import TextWordPress from './Text.vue';

const homePageUrl = 'http://juntar.club/wp-json/wp/v2/homepage?slug=support-us';

export default {
    name: 'support-us',
    components: {
        Spinner,
        TextWordPress,
    },
    data() {
        return {
            supportUsData: null,
        };
    },
    methods: {
        pageData(data, slug) {
            return Object.assign({}, ...data.filter(e => e.slug === slug))
                .content.rendered.replace(/\n/g, '');
        },
        fetchUrl() {
            const url =  homePageUrl;
            fetch(url).then(res => res.json())
            .then(results => {
                this.supportUsData = this.pageData(results, 'support-us');
            });
        },
    },
    mounted() {
        this.fetchUrl();
    },
}
</script>
