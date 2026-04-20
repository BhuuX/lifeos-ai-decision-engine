FROM nginx:alpine
COPY . /usr/share/nginx/html
# Dynamically set Nginx to listen on the environment's $PORT
CMD ["/bin/sh", "-c", "sed -i 's/listen  80;/listen '\"$PORT\"';/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
