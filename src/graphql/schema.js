const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const sdlSchema = `
    type Score {
        id: ID!
        name: String!
        score: Float!
        killedby: String!
        createdAt: String
        updatedAt: String
        message: String
    }

    type Query {
        leaderboard: [Score!]!
        score(id: ID!): Score
    }

    type Mutation {
        score(name: String!, score: Float!, killedby: String!): Score
    }
`;

const graphqlSchemaObj = makeExecutableSchema({
    typeDefs: sdlSchema,
    resolvers: resolvers,
  });
  

module.exports = graphqlSchemaObj;
