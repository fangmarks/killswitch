// @ts-ignore
import { Request, Response } from "express";
import Logger from "../utils/logger";
import request from "../utils/request";
const paths = [
    '/sheri',
    '/sheribot',
]

async function handler(req: Request, res: Response) {
    // console.log(req.body)
    // console.log(req.query)

    let endpoint = req.body.endpoint || req.query.endpoint
    let apikey: string = req.body.apikey || req.query.apikey


    let useragent = req.body.useragent
    let response;
    if (apikey) {
        if (!apikey.startsWith('Token')) {
            apikey = `Token ${apikey}`
        }
    }
    // if (apikey) {
    // }
    try {
        response = await request("sheri", {
            endpoint,
            useragent, apikey
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