const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt } = graphql
const Participation = require('../models/participation')

// Defina o Tipo de Participação
const ParticipationType = new GraphQLObjectType({
  name: 'Participation',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    participation: { type: GraphQLInt }
  })
})

// Defina as Queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    participations: {
      type: new GraphQLList(ParticipationType),
      resolve: async (parent, args) => {
        try {
          return await Participation.find({})
        } catch (err) {
          throw new Error('Erro ao buscar participações: ' + err.message)
        }
      }
    }
  }
})

// Defina as Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addParticipation: {
      type: ParticipationType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        participation: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const participation = new Participation({
          firstName: args.firstName,
          lastName: args.lastName,
          participation: args.participation
        })
        try {
          return await participation.save()
        } catch (err) {
          throw new Error('Erro ao adicionar participação: ' + err.message)
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
