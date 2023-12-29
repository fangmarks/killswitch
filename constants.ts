import * as pkg from './package.json'
import dotenv from 'dotenv'
dotenv.config()

export default {
    // ! Supported APIs
    "e621": "https://e621.net",
    "e926": "https://e926.net",
    yiffrest: "https://v2.yiff.rest",
    shibe: "https://shibe.online/api/",
    fox: "https://randomfox.ca/floof/",
    gelbooru: "https://gelbooru.com",

    // "r34": "https://rule34.xxx/index.php?page=dapi&s=post&q=index",

    // ? Config Stuff
    useragent: `Killswitch/v${pkg.version} (yiff.click);`,
    port: process.env.PORT || 3000,
    log: 'killswitch.log',
    error: 'killswitch.error.log',
    redirect: process.env.REDIRECT || 'https://github.com/himbolion/killswitch/wiki'

}
