<template>
    <div id="app">
    <nav-bar />
    <keep-alive>
        <router-view />
    </keep-alive>
    <footer class="footer is-dark">
        <div class="content has-text-centered">
            <img src="./assets/juntar-logo-white.png" alt="">
            <br>
            <p>
                Copyright JUNTAR CLUB
            </p>
        </div>
    </footer>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
    name: 'App',
    components: {
        NavBar,
    },
    data() {
        return {
            personaData: null,
            hpData: null,
            aboutData: null,
            SupportUsData: null,
        };
    },
}
</script>

<style lang="scss">
@keyframes spin { 100% { -webkit-transform: rotate(90deg); transform:rotate(90deg); } }

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.is-dark {
    background-color: #363636;
    color: #fff;
}

.navbar {
    .container {
        margin: 0 auto;
    }
}

.navbar-item img {
    max-height: none;
}

.hero {
    .image {
        max-width: 960px;
        margin: 0 auto;
    }
}

.search {
    max-width: 400px;
}

.card-img {
    position: relative;
}

.card-image {
    overflow: hidden;
    background: #000;

    @media screen and (min-width: 768px) {
        background: #fff;
    }
}

.card {
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    transform-origin: center;
    &:after {
        opacity: 0;
    }

    &:hover {
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 95%;
            height: 95%;
            opacity: 100%;
            transition: opacity .3s;
            transform: translate(-50%, -50%);
            border: 3px solid #fec101;
            transform-origin: 50% 0;
            animation: spin .3s ease-out;
        }

        span {
            background: #fec101;
            color: #000;
            animation-play-state:running;
            transition: background-color 1s;
            transition: color .75s;
        }

        img {
            transform: scale(1.15);
        }
    }

    img {
        transform: scale(1);
        transition: all .3s ease-out;
    }
}

.card-text {
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    background: #000;
    padding: 10px 0 6px;

    @media screen and (min-width: 768px) {
        transform: translate(-50%, 0);
        position: absolute;
        bottom: 10px;
        left: 50%;
        background: transparent;
        padding: 0;
    }

    span {
        display: table;
        margin: 0 auto;
        line-height: 18px;
        margin-bottom: 2px;
        padding: 1px 5px;
        background: #000;
    }
}

.main-intro {
    margin: 20px 0;
}

.is-danger {
    max-width: 600px;
    margin: 0 auto;
}

footer {
    img {
        max-width: 100px;
    }
}
</style>
