# STEP 1 - BUILD OF REACT PROJECT
FROM node:16-alpine as build

WORKDIR /app

COPY . .

ENV REACT_APP_IPAPI games-result
ENV REACT_APP_RUST_API_HOST games-logs

RUN npm install

CMD ["npm", "start"]