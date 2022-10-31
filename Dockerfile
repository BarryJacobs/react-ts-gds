FROM node:18-alpine as build
RUN mkdir -p /app
WORKDIR /app

COPY ./package.json ./
RUN yarn install --network-timeout 1000000
COPY . .
RUN yarn run build

FROM nginx:1.23.2-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]