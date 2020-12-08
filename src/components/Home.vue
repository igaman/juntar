<template>
    <section class="section">
        <spinner v-if="!hpData"/>
        <div class="container has-text-centered" v-if="hpData">
            <text-word-press :dataHtml="hpData"/>
            <br>
            <div class="search-block">
                <h2 class="title">Recherche</h2>
                <div class="field">
                    <div class="control">
                        <input
                            class="input search"
                            type="text"
                            v-model="searchInput"
                            placeholder="Trier les profils . . ."
                        >
                    </div>
                </div>
                <article
                    class="message is-danger"
                    v-if="errorSearch"
                >
                    <div class="message-body">
                        Nous ne trouvons pas votre recherche
                    </div>
                </article>
            </div>
            <div class="columns is-multiline is-mobile">
                <div
                    v-for="persona in lycos"
                    :key="persona.id"
                    class="column is-6-mobile is-4-tablet is-3-desktop"
                >
                    <div class="card" @click="openModal(persona)">
                        <div class="card-image">
                            <figure class="image is-1by1">
                                <img :src="persona.picture.url" :alt="persona.name">
                            </figure>
                            <p class="card-text">
                                <span class="text-name">{{persona.name}}</span>
                                <span class="text-job">{{persona.job}}</span>
                                <span class="text-company">{{persona.compagny}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal"
                v-if="isShowModal"
                v-bind:class="{ 'is-active': isShowModal }"
            >
                <div class="modal-background" v-on:click="isShowModal = false"></div>
                <div class="modal-card">
                <header class="modal-card-head">
                    <h3 class="modal-card-title">
                        <span class="bigtitle">{{selectedPeople.name}}</span>
                        <span class="subtitle is-size-6">{{selectedPeople.job}} | {{selectedPeople.compagny}}</span>
                    </h3>
                    <button class="delete is-large" aria-label="close" v-on:click="isShowModal = false"></button>
                </header>
                <section class="modal-card-body">
                    <div class="columns is-mobile is-gapless">
                        <div class="column">
                            <figure class="image is-1by1">
                                <img src="../assets/selected.png" alt="selected by juntar">
                            </figure>
                        </div>
                        <div class="column">
                            <figure class="image is-1by1">
                                <img :src="selectedPeople.picture.url" :alt="selectedPeople.name">
                            </figure>
                        </div>
                    </div>
                    <p class="story has-text-left">{{selectedPeople.story}}</p>
                    <div class="buttons" v-if="selectedPeople.share_link">
                        <button class="button is-info">
                            <a :href="selectedPeople.share_link" target="_blank">
                                {{selectedPeople.name_link || 'Site'}}
                            </a>
                        </button>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" v-on:click="isShowModal = false">Retour</button>
                </footer>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Spinner from './Spinner.vue';
import TextWordPress from './Text.vue';
const personaUrl = 'https://juntar.club/wp-json/wp/v2/persona?per_page=100';
const homePageUrl = 'https://juntar.club/wp-json/wp/v2/homepage?per_page=100';

export default {
    name: 'home',
    components: {
        Spinner,
        TextWordPress,
    },
    data() {
        return {
            personaData: null,
            hpData: null,
            searchInput: null,
            selectedPeople: null,
            isShowModal: false,
        };
    },
    methods: {
        pageData(data, slug) {
            return Object.assign({}, ...data.filter(e => e.slug === slug))
                .content.rendered.replace(/\n/g, '');
        },
        fetchUrl() {
            const urls = [personaUrl, homePageUrl];
            Promise.all(urls.map(url => fetch(url).then(res => res.json())))
            .then(results => {
                this.personaData = results[0].map(e => e.acf).sort((a, b) => a.rank - b.rank);
                this.hpData = this.pageData(results[1], 'homepage');
                this.aboutData = this.pageData(results[1], 'about');
                this.supportUsData = this.pageData(results[1], 'support-us');
            });
        },
        formatString(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        },
        openModal(obj) {
            this.selectedPeople = obj;
            this.isShowModal = true;
        },
    },
    computed: {
        lycos() {
            if (!this.searchInput) {
                return this.personaData;
            }

            const lycosData = this.personaData.filter(e => {
                const searchName = this.formatString(e.name);
                const searchJob= this.formatString(e.job);
                const searchCompagny= this.formatString(e.compagny);
                const searchInput = this.formatString(this.searchInput);
                return searchName.includes(searchInput)
                || searchJob.includes(searchInput)
                || searchCompagny.includes(searchInput);
            });

            return !lycosData.length ? this.personaData : lycosData;
        },
        errorSearch() {
            if (!this.searchInput) return false;
            return this.lycos === this.personaData && this.searchInput.length ? true : false;
        },
    },
    mounted() {
        this.fetchUrl();
    },
}
</script>
<style lang="scss" scoped>
    .bigtitle {
        display: block;
    }

    .subtitle {
        display: inline-block;
        padding: 4px;
        margin-top: 10px;
        background: #000;
        color: #fff;
    }

    .columns.is-multiline {
        padding: 2rem 0rem;

        @media screen and (min-width: 768px) {
            padding: 2rem;
        }
    }

    .modal-card {
        background: #fff;
        border-radius: 6px;
    }

    .modal-card-head {
        border-bottom: none;
    }

    .modal-card-foot {
        border-top: none;
    }

    .delete {
        background: #000;
        position: absolute;
        top: 10px;
        right: 10px;

        @media screen and (min-width: 400px) {
            top: 20px;
            right: 20px;
        }
    }

    .modal-card-foot .button {
        background: #000;
        color: #fff;
    }

    .modal-card-title {
        font-weight: bold;
    }

    .button {
        margin-top: 20px;

        a {
            color: #fff;
        }
    }
</style>
