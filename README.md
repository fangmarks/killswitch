# Killswitch

killswitch is a proxy api for [fangmarks/yiff](https://lio.to/yiff) and probably various other random image sites

Supported Sites:

- [x] e621.net
- [x] e926.net
- [x] yiff.rest
- [x] shibe.online
- [x] randomfox.ca
- [x] gelbooru.com

> If you don't see a site that's supported yet, but should be, open an Issue or if you're the owner of the API, make a PR!

> Please include a Link to the Documentation of the API, if possible, otherwise a Link to a Discord Server\* where I can ask questions is also ok!

\*_(Don't Advertise random Servers that have noting to do with a API/Service or you'll be banned from this Repo)_

> [!IMPORTANT]
> Support for Sheri has been dropped due to me being unable to test it, if you want to add support for it, feel free to make a PR
> Support for the Thaldrin and Floofy.dev API has been dropped to both of them being discontinued

# Usage

All of these examples require you to have either Docker or Node and Git installed

## Usage through Docker

Setting up a Killswitch Instance is as easy as running

```zsh
sudo docker run -p 42069:3000 -d hokkqi/killswitch
```

**NOTE:** By default, Killswitch redirects to [the Wiki] if no `REDIRECT` Environment Variable is provided.

## Building the Docker Image yourself (with custom options)

```zsh
git clone https://github.com/fangmarks/killswitch

cd killswitch

sudo docker build --build-arg PORT=YourPort --build-arg REDIRECT=https://your.site -t hokkqi/killswitch .
```

## Node / TS-Node

```zsh
git clone https://github.com/fangmarks/killswitch

cd killswitch

#Node
npm run build && npm run start

#TS-Node
ts-node index.ts

```

# Docs

For Docs, see [the Wiki]

[the wiki]: https://github.com/farngmarks/killswitch/wiki
