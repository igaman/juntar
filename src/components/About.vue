<template>
    <section class="section">
        <h2 class="title">A propos</h2>

        <spinner v-if="!aboutData"/>
        <div class="container has-text-centered" v-if="aboutData">
            <text-word-press :dataHtml="aboutData"/>
        </div>
    </section>
</template>

<script>
import Spinner from './Spinner.vue';
import TextWordPress from './Text.vue';

const homePageUrl = 'http://juntar.club/wp-json/wp/v2/homepage?slug=about';


export default {
    name: 'about',
    components: {
        Spinner,
        TextWordPress,
    },
    data() {
        return {
            aboutData: null,
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
                this.aboutData = this.pageData(results, 'about');
            });
        },
    },
    mounted() {
        this.fetchUrl();
    },
}
</script>
