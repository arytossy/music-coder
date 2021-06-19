FROM alpine:3.13
RUN apk add --no-cache \
        bash \
        curl \
        git \
        npm \
    && npm install -g nodemon \
    && curl https://cli-assets.heroku.com/install.sh | bash