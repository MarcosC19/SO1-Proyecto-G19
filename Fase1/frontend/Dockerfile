FROM node:16-alpine

WORKDIR /g19

COPY package*.json ./

COPY . .

RUN npm i

ENV REACT_APP_IPAPI=35.208.76.187

CMD ["npm", "run", "start"]