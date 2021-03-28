import * as pkg from './package.json'
import dotenv from 'dotenv'
dotenv.config()

export default {
    // ! Supported APIs
    "e621": "https://e621.net",
    "e926": "https://e926.net",
    yiffrest: "https://yiff.rest/V2",
    floofy: "https://api.floofy.dev",
    shibe: "https://shibe.online/api/",
    fox: "https://randomfox.ca/floof/",
    sheri: "https://sheri.bot/api/",

    // ? Config Stuff
    useragent: `Killswitch/v${pkg.version} (wrwlf.de/killswitch);`,
    // "r34": "https://rule34.xxx/index.php?page=dapi&s=post&q=index",
    port: process.env.PORT || 3000,
    log: 'killswitch.log',
    error: 'killswitch.error.log',
    redirect: process.env.REDIRECT || 'https://github.com/hokkqi/killswitch/wiki'

}
