const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const User = require('./models/userModel');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        name: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
    },
});

// Define a simple GraphQL type
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return User.findById(args.id)
            }
        }
    }
})




// Create the GraphQL schema
module.exports = new GraphQLSchema({
    query: RootQuery,
});
