import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { prismaClient } from './lib/db.js'

async function init() {
    const app = express();
    const port = process.env.PORT || 8000;

    app.use(express.json());

    //GraphQL server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello:String   
                say(name:String):String         
            }
            type Mutation{
                createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean      
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hello, this is a graphql server;`,
                say: (_, { name }: { name: string }) => `Hello I am ${name}`
            },
            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }) => {
                    try {
                        const result = await prismaClient.user.create({
                            data: {
                                id: Date.now().toString(),
                                firstName,
                                lastName,
                                email: email,
                                password: password,
                                salt: 'random'
                            }
                        });
                        console.log("Success!", result);
                        return true;
                    } catch (err: any) {
                        console.log("--- DATABASE ERROR ---");
                        console.log("Code:", err.code);
                        console.log("Message:", err.message);
                        console.log("Meta:", err.meta);
                        return false;
                    }
                }
            }

        }
    })

    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({ message: "Server is running successfully..." })
    });

    app.use('/graphql', expressMiddleware(gqlServer))
    app.listen(port, () => console.log(`Server is running at PORT: ${port}`))


}
init();