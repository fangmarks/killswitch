// @ts-ignore
import { Request, Response } from "express";
import Logger from "../utils/logger";
import request from "../utils/request";
const paths = [
    '/gel',
    '/gelbooru',
]

async function handler(req: Request, res: Response) {
    // console.log(req.body)
    // console.log(req.query)

    let tags = req.body.tags || req.query.tags
    let limit = Number(req.body.limit) || Number(req.query.limit)
    let useragent = req.body.useragent
    if (isNaN(limit)) {
        limit = 1
    } else {
        limit = limit
    }

    let response;
    try {
        response = await request("gelbooru", {
            tags,
            limit,
            useragent
        })

    } catch (error) {
        // console.error("Encountered an Error", error)
        Logger.error(error)
        response = {
            success: false,
            error: {
                msg: error.message
            }
        }
    }
    res.send(response)
}

export {
    paths,
    handler
}