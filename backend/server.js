const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema/schema')

const app = express()

// Conecte ao MongoDB
mongoose.connect('mongodb://localhost:27017/vue-graphql-dashboard', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err.message)
})
mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

// Middleware CORS
app.use(cors())

// Middleware GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  customFormatErrorFn: (err) => {
    console.error('Erro no GraphQL:', err.message)
    return { message: err.message }
  }
}))

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000')
})
