<template>
    <div>
        <h1>login</h1>
        <Login @submit="login" />
        {{account.user_id}}
    </div>
</template>
<script>

import Login from '@/components/Login.vue'
import Account from './api/Account'


export default {
    name: 'Matrix',
    components: {
        Login,
        

    },
    data() {
    return {
    user: '',
    password: '',
    account : {
    user_id: '',
    access_token: ''
    }
    }
  },
    methods: {
    async login(account) {
     const accountData = await Account.accountLogin(account.user , account.password)
     this.account = accountData.data
        console.log(accountData)
        }
    }
}
</script>