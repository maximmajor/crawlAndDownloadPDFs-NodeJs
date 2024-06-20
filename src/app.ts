import createServer from "./utils/server"
const PORT = process.env.PORT || 3000;


// create the Express app
const app = createServer()

// start the server
app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});