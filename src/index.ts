import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from "./schema/schema.js";

dotenv.config();
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json())

    const gqlServer = new ApolloServer({
        typeDefs,  //->schema
        resolvers: {
            Query:{
                hello:()=>'hi, i am graphql',
                say:(_,{name}:{name:string})=>{
                    return `Hey, I am ${name} !`
                }

            }
        }
    })

    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({ message: "Server is running" });
    });
    app.use('/graphql',expressMiddleware(gqlServer))
    //
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
init();
