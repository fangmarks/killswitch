import Armpits from "@sniff/armpits";
// @ts-ignore
import express from 'express'
//@ts-ignore
import { Request, Response } from "express";
import config from "./config"


const app = new express()
app.use(express.json())

// ! Route Imports
import {
    paths as e621_paths,
    handler as e621_handler
} from './routes/e621'

const paths = {
    e621: e621_paths,
}
const handlers = {
    e621: e621_handler
}


app.get('/', async (req: Request, res: Response) => {
    res.redirect(config.REDIRECT)
})

app.use(paths.e621, handlers.e621)

app.listen(3000, () => console.log("Listening on port 3000"))