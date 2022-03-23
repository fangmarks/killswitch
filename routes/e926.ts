// @ts-ignore
import { Request, Response } from "express";
import Logger from "../utils/logger";
import request from "../utils/request";
const paths = [
    '/e9',
    '/e926',
]

async function handler(req: Request, res: Response) {
    // console.log(req.body)
    // console.log(req.query)

    let tags = req.body.tags || req.query.tags
    let apikey = req.body.apikey || req.query.apikey
    let limit = Number(req.body.limit) || Number(req.query.limit)
    let page = Number(req.body.page) || Number(req.query.page)
    let useragent = req.body.useragent
    if (isNaN(limit)) {
        limit = 1
    } else {
        limit = limit
    }

    let response;

    try {
        response = await request("e926", {
            tags,
            apikey,
            limit,
            page,
            useragent
        })

    } catch (error) {
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