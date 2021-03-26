import Armpits from "@sniff/armpits";
// @ts-ignore
import express from 'express'
//@ts-ignore
import { Request, Response } from "express";
import config from "./config"


const app = new express()
app.use(express.json())

// ! Route Imports
import { paths as e621_paths, handler as e621_handler } from './routes/e621'
import { paths as yiff_rest_paths, handler as yiff_rest_handler } from './routes/yiff.rest'
import { paths as e926_paths, handler as e926_handler } from './routes/e926'
import { paths as floofy_paths, handler as floofy_handler } from './routes/floofy.dev'
import { paths as shibe_paths, handler as shibe_handler } from './routes/shibe.online'

const paths = {
    e621: e621_paths,
    e926: e926_paths,
    yiffrest: yiff_rest_paths,
    floofy: floofy_paths,
    shibe: shibe_paths
}
const handlers = {
    e621: e621_handler,
    e926: e926_handler,
    yiffrest: yiff_rest_handler,
    floofy: floofy_handler,
    shibe: shibe_handler
}


app.get('/', async (req: Request, res: Response) => {
    res.redirect(config.REDIRECT)
})

app.use(paths.e621, handlers.e621)
app.use(paths.e926, handlers.e926)
app.use(paths.yiffrest, handlers.yiffrest)
app.use(paths.floofy, handlers.floofy)
app.use(paths.shibe, handlers.shibe)

app.listen(3000, () => console.log("Listening on port 3000"))

module.exports = app