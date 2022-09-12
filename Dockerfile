# FROM node:14.18-alpine

# WORKDIR /usr/src/app

# COPY package.json ./
# RUN yarn install
# RUN yarn add react-scripts@3.4.1 -g

# COPY . .

# EXPOSE 3000
# CMD [ "yarn", "start" ]

FROM node:14.18-alpine as build
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN apk add curl
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]