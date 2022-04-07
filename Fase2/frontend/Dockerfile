FROM node:16-alpine

COPY . .

RUN npm install

ENV REACT_APP_IPAPI https://so1-proyecto-342902.uc.r.appspot.com

CMD ["npm", "run", "start"]

EXPOSE 3000