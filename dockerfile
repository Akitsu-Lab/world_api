FROM node:18.14-slim

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json ./

RUN npm install
# 本番用にコードを作成している場合
# RUN npm install --only=production

ENV DB_HOST world_db
ENV DB_PORT 3306
ENV DB_USER root
ENV DB_PASS rootpass
ENV DB_DATABASE world

# アプリケーションのソースをバンドルする
COPY . .

EXPOSE 3001
# startするためのコマンド
# package.jsonのstartに書いてあるもの
# CMD [ "node", "server.js" ]
CMD [ "node", "./bin/www" ]