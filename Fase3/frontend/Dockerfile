# STEP 1 - BUILD OF REACT PROJECT
FROM node:16-alpine as build

WORKDIR /app

COPY . .

ENV REACT_APP_IPAPI games-result
ENV REACT_APP_RUST_API_HOST games-logs

RUN npm install

RUN npm run build

# STEP 2 - CREATE NGINX SERVER

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]