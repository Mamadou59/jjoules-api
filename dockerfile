FROM node:12.18.3

ADD . . 

ENTRYPOINT ["node", "src/api/index.js"]