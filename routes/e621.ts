// @ts-ignore
import { Request, Response } from "express";
import Armpit from "../utils/logger";
import request from "../utils/request";
const paths = [
    '/e6',
    '/e621',
]

async function handler(req: Request, res: Response) {
    // console.log(req.body)
    // console.log(req.query)

    let tags = req.body.tags || req.query.tags
    let apikey = req.body.apikey || req.query.apikey
    let limit = Number(req.body.limit) || Number(req.query.limit)
    let useragent = req.body.useragent

    let response;
    console.log(
        {
            tags,
            apikey,
            limit,
            useragent
        }
    )
    try {
        response = await request("e621", {
            tags,
            apikey,
            limit,
            // useragent
        })

    } catch (error) {
        console.error("Encountered an Error", error)
        response = {
            success: false,
            error
        }
    }
    res.send(response)
}

export {
    paths,
    handler
}