FROM node:16-alpine

COPY . .

RUN npm install

ENV NODE_OPTIONS --max_old_space_size=8048

EXPOSE 3000

CMD ["npm", "run", "start"]