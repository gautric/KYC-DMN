
#
# docker build -f Dockerfile -t kyc-webapp .
#
# Then run the container using:
#
# docker run -i --rm -p 9000:8080 kyc-webapp
FROM node:18.15.0 as build-stage

# set working directory
WORKDIR /app

COPY package.json .
RUN npm install

# add app
COPY . .
RUN npm run build

FROM nginx:1.15
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080

RUN     chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /usr/share/nginx/html && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx
