import { ApolloServer } from "@apollo/server";
// import { prismaClient } from "../lib/db.js";
import { User } from "./user/index.js";
async function createGraphQLserver() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                ${User.queries}
            }
            type Mutation{
                ${User.mutation}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }

        }
    })
    await gqlServer.start();
    return gqlServer;
}
export default createGraphQLserver;