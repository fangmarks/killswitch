import axios from "axios"
import c from "../constants";
import Armpit from './logger';

export default async function request(url: string, options: { tags?: string | string[], apikey?: string, limit?: number, useragent?: string }) {

    switch (url) {
        case 'e621':
            if (!options.tags) throw Error("No Tags provided")
            let request = await axios({
                method: 'get',
                params: {
                    tags: `limit:${Number(options.limit) || 1} order:random -young ${options.tags.toString()}`,
                },
                url: `${c.e621}/posts.json`,
                headers: {
                    "User-Agent": `${c.useragent} ${options.useragent || ""}`,
                    ...(options.apikey ? {
                        "Authorization": options.apikey
                    } : {})
                }
            })
            return request.data.posts


        default:
            return {
                success: false,
                message: "No URL provided"
            }
    }


}