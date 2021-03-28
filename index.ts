//@ts-nocheck

import express from 'express'
import { Request, Response } from "express";
import config from "./config"
import path from "path"
import fs from "fs"
const app = new express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
import Logger from './utils/logger'


// ! Route Imports
import { paths as e621_paths, handler as e621_handler } from './routes/e621'
import { paths as yiff_rest_paths, handler as yiff_rest_handler } from './routes/yiff.rest'
import { paths as e926_paths, handler as e926_handler } from './routes/e926'
import { paths as floofy_paths, handler as floofy_handler } from './routes/floofy.dev'
import { paths as shibe_paths, handler as shibe_handler } from './routes/shibe.online'
import { paths as fox_paths, handler as fox_handler } from './routes/randomfox.ca'
import { paths as sheri_paths, handler as sheri_handler } from './routes/sheri.bot'
import constants from './constants';

const paths = {
    e621: e621_paths,
    e926: e926_paths,
    yiffrest: yiff_rest_paths,
    floofy: floofy_paths,
    shibe: shibe_paths,
    fox: fox_paths,
    sheri: sheri_paths,
}
const handlers = {
    e621: e621_handler,
    e926: e926_handler,
    yiffrest: yiff_rest_handler,
    floofy: floofy_handler,
    shibe: shibe_handler,
    fox: fox_handler,
    sheri: sheri_handler,
}

app.use((req: Request, res: Response, next: any) => {
    let querykey
    let bodykey

    if (req.path === '/log') return next()
    if (req.body.apikey) {
        bodykey = req.body.apikey
        req.body.apikey = "Censored for Privacy"
    }
    if (req.query.apikey) {
        querykey = req.query.apikey
        req.query.apikey = "Censored for Privacy"
    }
    let query = req.query
    let body = req.body
    Logger.info(`[ ${new Date().toLocaleString()} ]`, {
        path: req.path,
        query, body,
        useragent: req.get('User-Agent')
    })

    req.query.apikey = querykey
    req.body.apikey = bodykey

    // Armpit.info("Data: ", )
    next()
})

app.get('/', async (req: Request, res: Response) => {
    res.redirect(constants.redirect)
})


app.use(paths.e621, handlers.e621)
app.use(paths.e926, handlers.e926)
app.use(paths.yiffrest, handlers.yiffrest)
app.use(paths.floofy, handlers.floofy)
app.use(paths.shibe, handlers.shibe)
app.use(paths.fox, handlers.fox)
app.use(paths.sheri, handlers.sheri)

app.get("/log", async (req, res) => {
    fs.readFile(`${req.query.error ? constants.error : constants.log}`, 'utf8', function (err, data) {
        if (err) throw err;
        res.set({
            'Content-Type': 'text/plain',
        })

        return res.send(data);
    })
})

app.listen(constants.port, () => Logger.info(`Listening on port ${constants.port}`))

module.exports = app