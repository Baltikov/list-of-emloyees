<template>
    <div>
        <div class="header center">
            <router-link :to="{ name: 'list' }">
                <img
                    class="header__account"
                    :src="logo"
                    alt="logo">
            </router-link>
            <div class="header__right">
                <router-link :to="{ name: 'form' }">
                    <img
                        class="header__account"
                        :src=" account "
                        alt="img">
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            logo: "./img/logo.svg",
            account: "./img/account.svg",
        }
    }
}
</script>

<style module>
    
</style>