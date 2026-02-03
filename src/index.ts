import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

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
        `,
        resolvers: {
            Query:{
                hello:()=>`Hello, this is a graphql server;`,
                say:(_,{name}:{name:string})=>`Hello I am ${name}`

            }
        }
    })

    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({ message: "Server is running successfully..." })
    });
    
    app.use('/graphql',expressMiddleware(gqlServer))
    app.listen(port, () => console.log(`Server is running at PORT: ${port}`))


}
init();