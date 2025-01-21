# ベースイメージの指定
FROM node:22-alpine

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# 開発モードで起動
CMD ["npm", "run", "dev"]