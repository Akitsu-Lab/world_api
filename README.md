# world_api

## 起動方法

```sh
npm start
```

URL

```
http://localhost:3001/
```

## 手順

### リポジトリに移動する

```shell
cd (path to this repository)
```

### dockerfile から image を作成(ビルド)

```shell
docker build -t world_api_node18.14-slim .
```

---

### image を起動

```shell
docker run --name world_api --rm -d -p 3001:3001 world_api_node18.14-slim
```

docker run --name <コンテナ名> --rm -d -p <ホスト側ポート>:<コンテナ側ポート> <イメージ名>

### コンテナに入る

```shell
docker exec -it world_api bash
```

## コンテナを止める

```shell
docker stop world_api
```
