FROM node:alpine
WORKDIR /opt/killswitch

ARG PORT
ARG REDIRECT

ENV PORT=${PORT}
ENV REDIRECT=${REDIRECT}


EXPOSE ${PORT}

COPY . .
RUN npm i
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]