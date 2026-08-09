FROM node:24.15.0-bookworm-slim

WORKDIR /report_loader

COPY package*.json  /report_loader/

RUN apt-get update \
    && apt-get install -y \
        vim \
        curl \
        python3 \
        make \
        g++ \
        wget \
        tar \
        ca-certificates \
        gnupg \
        libmongocrypt-dev \
       --no-install-recommends \
    && curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg \
    && echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list \
    && apt-get update \
    && wget https://downloads.mongodb.com/linux/mongo_crypt_shared_v1-linux-x86_64-enterprise-ubuntu2204-8.3.4.tgz \
    && mkdir -p /usr/local/mongo_crypt_shared \
    && tar -xzf mongo_crypt_shared_v1-linux-x86_64-enterprise-ubuntu2204-8.3.4.tgz -C /usr/local/mongo_crypt_shared --strip-components=1 \
    && rm mongo_crypt_shared_v1-linux-x86_64-enterprise-ubuntu2204-8.3.4.tgz \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm ci

COPY . .

EXPOSE 8000

CMD npm start
