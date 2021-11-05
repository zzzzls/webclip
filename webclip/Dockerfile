FROM node:17.0.1

LABEL author="zzzzls"\
      email="245129129@qq.com"

VOLUME ["/home/webclip/db"]

WORKDIR /home/webclip

COPY package.json ./

RUN ["npm", "install"]

COPY *.mjs ./


CMD ["node", "webclip.mjs"]
