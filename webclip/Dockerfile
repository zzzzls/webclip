FROM node:lts-alpine

LABEL author="zzzzls"\
      email="245129129@qq.com"

VOLUME ["/home/webclip/db"]

WORKDIR /home/webclip

COPY package.json ./

RUN ["npm", "install"]

COPY . ./

CMD ["npm", "start"]
