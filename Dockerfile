FROM nginx:alpine

# Copy local files
COPY . /usr/share/nginx/html

# Create a clean Nginx config that listens on $PORT
RUN printf "server {\n\
    listen 8080;\n\
    server_name localhost;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files \$uri \$uri/ /index.html;\n\
    }\n\
}\n" > /etc/nginx/conf.d/default.conf

# Ensure Nginx respects the $PORT env var at runtime
CMD sh -c "sed -i 's/8080/'\"$PORT\"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
