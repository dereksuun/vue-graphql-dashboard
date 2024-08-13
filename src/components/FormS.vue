<template>
  <div>
    <input v-model="firstName" placeholder="First name" />
    <input v-model="lastName" placeholder="Last name" />
    <input v-model="participation" type="number" placeholder="Participation" />
    <button @click="submitForm">SEND</button>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      participation: 0
    }
  },
  methods: {
    submitForm () {
      this.$apollo.mutate({
        mutation: gql`
          mutation($firstName: String!, $lastName: String!, $participation: Int!) {
            addParticipation(firstName: $firstName, lastName: $lastName, participation: $participation) {
              id
            }
          }
        `,
        variables: {
          firstName: this.firstName,
          lastName: this.lastName,
          participation: parseInt(this.participation)
        }
      }).then(() => {
        this.firstName = ''
        this.lastName = ''
        this.participation = 0
      })
    }
  }
}
</script>
