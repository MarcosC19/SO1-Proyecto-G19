FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install

ENV REACT_APP_IPAPI 35.208.76.187

CMD ["npm", "run", "start"]

EXPOSE 3000