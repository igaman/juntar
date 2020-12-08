<template>
    <nav class="navbar is-dark">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="../assets/juntar-logo-white.png" alt="Juntar" width="112" height="28">
                </a>
                <div class="navbar-burger burger"
                    data-target="navbarExampleTransparentExample"
                    @click="clickMenu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div
                class="navbar-start"
                :style="{ display: displayMenu }"
            >
                <a class="navbar-item" href="/">
                    Accueil
                </a>
                <a class="navbar-item" href="/a-propos">
                    A propos
                </a>
                <a class="navbar-item" href="/nous-soutenir">
                    Nous soutenir
                </a>
                <a class="navbar-item" href="/ajouter-votre-profil">
                    Ajouter votre profil
                </a>
                <a class="navbar-item" href="/contact">
                    Contact
                </a>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'nav-bar',
    data() {
        return {
            displayMenu: '',
            isActive: false
        };
    },
    methods: {
        clickMenu() {
            this.displayMenu = this.displayMenu === "block" ? "none" : "block";
            this.isActive = !this.isActive;
        },
        myEventHandler() {
            this.displayMenu = window.matchMedia("(min-width: 1024px)").matches
            ? "flex"
            : "none";
        }
    },
    created() {
        this.myEventHandler();
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    }
};
</script>
<style lang="scss" scoped>
.text {
    max-width: 640px;
    margin: 0 auto;
}


.navbar-burger span {
    height: 2px;
    width: 24px;
    left: calc(50% - 12px);

    &:nth-child(1) {
        top: calc(50% - 8px);
    }

    &:nth-child(3) {
        top: calc(50% + 6px);
    }
}

.navbar-start a {
    color: #fff;

    &:focus, &:hover {
        background: #fec101;
        color: #000;
    }
}
</style>
