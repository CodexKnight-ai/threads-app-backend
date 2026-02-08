import express from 'express'
import { expressMiddleware } from '@as-integrations/express5';
import createGraphQLserver from './graphql/index.js';
async function init() {
    const app = express();
    const port = process.env.PORT || 8000;

    app.use(express.json());
    app.get("/", (req, res) => {
        res.json({ message: "Server is running successfully..." })
    });
    const gqlServer=await createGraphQLserver();
    app.use('/graphql', expressMiddleware(gqlServer))
    app.listen(port, () => console.log(`Server is running at PORT: ${port}`))
}
init();