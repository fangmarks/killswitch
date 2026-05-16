FROM denoland/deno:alpine

WORKDIR /app

COPY deno.json deno.lock ./
RUN deno install

COPY . .

ENV PORT=8000
EXPOSE ${PORT}

ENTRYPOINT ["deno", "run", "--allow-net", "--allow-env", "main.ts"]
