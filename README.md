# Killswitch

killswitch is a proxy api for [hokkqi/yiff](https://wrwlf.de/yiff) and probably various other random image sites

Supported Sites:

- [x] e621.net
- [x] e926.net
- [x] yiff.rest
- [x] api.floofy.dev
- [x] shibe.online
- [x] randomfox.ca
- [ ] sheri.bot

If you don't see a site that's supported yet, but should be, open an Issue!

# Usage

All of these examples require you to have either Docker or Node and Git installed

## Usage through Docker

Setting up a Killswitch Instance is as easy as running

```zsh
sudo docker run -p 42069:3000 -d hokkqi/killswitch
```

**NOTE:** By default, Killswitch redirects to [himbo.cat](https://himbo.cat) if no `REDIRECT` Environment Variable is provided.

## Building the Docker Image yourself (with custom options)

```zsh
git clone https://github.com/hokkqi/killswitch

cd killswitch

sudo docker build --build-arg PORT=YourPort --build-arg REDIRECT=https://your.site -t hokkqi/killswitch .
```

## Node / TS-Node

```zsh
git clone https://github.com/hokkqi/killswitch

cd killswitch

#Node
npm run build && npm run start

#TS-Node
ts-node index.ts

```

# Docs

For Docs, see [the Wiki](https://github.com/hokkqi/killswitch/wiki)
