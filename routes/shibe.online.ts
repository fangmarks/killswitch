// @ts-ignore
import { Request, Response } from "express";
import Logger from "../utils/logger";
import request from "../utils/request";
const paths = [
    '/shibe'
]

async function handler(req: Request, res: Response) {
    // console.log(req.body)
    // console.log(req.query)

    let useragent = req.body.useragent
    let animal = req.body.animal || req.query.animal
    let limit = Number(req.body.limit) || Number(req.query.limit)
    if (isNaN(limit)) {
        limit = 1
    } else {
        limit = limit
    }
    let response;

    try {
        response = await request("shibe", {
            useragent, animal, limit
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