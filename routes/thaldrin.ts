// @ts-ignore
import { Request, Response } from "express";
import Logger from "../utils/logger";
import request from "../utils/request";
const paths = [
    '/thal',
    '/thaldrin',
]

async function handler(req: Request, res: Response) {
    // console.log(req.body)
    // console.log(req.query)

    let endpoint = req.body.endpoint || req.query.endpoint
    let apikey: string = req.body.apikey || req.query.apikey


    let useragent = req.body.useragent
    let response;
    try {
        response = await request("thaldrin", {
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