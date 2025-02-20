# ベースイメージの指定
FROM node:22-alpine

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# # ソースコードをコピー
COPY . .

# # Express サーバーを起動
CMD ["node", "server.js"]
# CMD ["npx", "nodemon", "-L", "server.js"]