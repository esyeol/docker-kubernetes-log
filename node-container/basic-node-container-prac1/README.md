## Node Container 

```bash
$ docker build . # 작성한 Koa Application 의 Dockerfile을 찾아서 빌드 
$ docker run -p 3000:3000 [docker image id] # 위에서 생성한 koa application image를 로컬 port 3000번에 매핑해서 실행 
$ docker ps 
$ docker stop [docker container id] # container stop
```