const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = require('graphql');
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
        password: {
            type: GraphQLString,
        }
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                let user = new User({
                    name: args.name,
                    email: args.email,
                    password: args.password
                });
                return user.save();
            }
        }
    }
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
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parentValue, args) {
                return User.find()
            }
        }
    }
})




// Create the GraphQL schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
