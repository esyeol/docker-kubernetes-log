## Basic Container Practice  


### Docker Image & Container Basic

```bash
$ docker build . # 작성한 Koa Application 의 Dockerfile을 찾아서 이미지를 생성. 
$ docker run -p 3000:80 -d[detatch mode option] [docker image id] # 위에서 생성한 koa application image를 로컬 port 3000번에 매핑해서 실행 실제로 Docker Container 내부에서 사용되는 port는 80번 
$ docker ps  
$ docker ps -a 
$ docker stop [docker container id] # container stop
$ docker start [container id or name] # docker container start with backup
$ docker logs [container id or name] # docker log with detached mode 
$ docker logs -f [container id or name] # detached -> attached mode with -f option
```

- 기본적인 Docker에 대한 이미지 생성, 빌드, 포트 매핑, Dockerfile 작성 방식에 대해서 실습
- 코드단을 변경하고 컨테이너를 재시작 or 중지/시작을 했을 때, 내용이 바로 반영되지 않는 이유:
  - Dockerfile에 정의된 내용을 Docker 컨테이너 내부로 스냅샷을 단순히 복사하고 띄웠기 때문에 영향을 받지 않음.
  - 변경된 코드를 컨테이너에 적용시키기 위해서 image파일을 지우고 다시 이미지를 빌드하고 컨테이너를 띄워야함. 
- DockerImage를 맨 최초 빌드하고 이후에 재 빌드 하면 캐싱되서 빠르게 빌드됨 -> 기존 빌드 시간의 4/1 가량 단축
  - 이미지를 다시 빌드할 떄, 변경사항이 없거나 Dockerfile에 정의된 내용을 다시 실행 할 필요가 없을 때, 캐싱된 결과를 사용함 
  - 위와 같은 DockerImage 형식을 `Layer Based Architeture` 이라고 부름 
  - Dockerfile에 작성된 구문 하나를 하나의 Layer라고 부름 
  - 실제로 build 파일을 생성할 때, 생성 로그를 살펴보면, 각 Dockerfile에 작성된 Layer를 어떻게 가져오는지 확인 할 수 있음. 
    - 이전과 동일한 Layer를 작성하면 Layer Based Architeture에 근거해서 CACHED 된 Layer를 가져오는것을 확인 할 수 있음.
  
```bash 
 => [internal] load .dockerignore                                                                     0.0s
 => => transferring context: 2B                                                                       0.0s
 => [internal] load build definition from Dockerfile                                                  0.0s
 => => transferring dockerfile: 128B                                                                  0.0s
 => [internal] load metadata for docker.io/library/node:latest                                        1.8s 
 => [1/4] FROM docker.io/library/node@sha256:a8ba58f54e770a0f910ec36d25f8a4f1670e741a58c2e6358b2c30b  0.0s
 => [internal] load build context                                                                     0.0s
 => => transferring context: 213B                                                                     0.0s 
 => CACHED [2/4] WORKDIR /app                                                                         0.0s # CACHED
 => CACHED [3/4] COPY . /app                                                                          0.0s # CACHED
 => CACHED [4/4] RUN npm install                                                                      0.0s # CACHED
 => exporting to image                                                                                0.0s
 => => exporting layers                                                                               0.0s
 => => writing image sha256:ec5199e2f113a3b2104bf2a3e6c8387ae519f1ede91c70923d4da56bb1cfb227          0.0s
```
</br>
</br>

### Basic Dockerfile 최적화


> 최적화 이전 
``` Dockerfile
FROM node

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]
```


> 최적화 후 
``` Dockerfile
FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

CMD ["node", "server.js"]
```

- 2가지 Dockerfile을 살펴보면 중간에 COPY package.json /app 이라는 구문이 추가된 것을 확인 할 수 있음 
- Dockerfile은 각 명령어의 Layer를 캐싱함. 즉, 각 명령어가 실행된 후 결과를 이미지로 저장하고, 다음 빌드에 동일한 명령어가 실행되면 캐시된 결과를 재사용함(위 정리내용 참고)
- 최적화후 Dockerfile은 package.json 파일을 먼저 복사하고 이후에, npm install로 종속성을 설치함. 이후 나머지 파일을 복사하기 때문에 의존성 설치를 효율적으로 캐싱할 수 있음. 실제로 빌드 결과를 비교했을 때, 최적화된 도커 이미지의 빌드 속도가 훨씬더 빠른것을 확인 할 수 있음.

</br>

### Attached & Detached Container

- docker start ~ 명령어로 컨테이너를 시작하면 detached 모드로 시작함
- docker run ~ 명령어로 컨테이너를 시작하면 attached 모드로 시작함. 
- attached 모드로 설정하면 터미널에서 log 데이터를 모니터링 할 수 있음. 
  - attached 모드는 단순 컨테이너의 출력 결과를 로컬 터미널에서 바로 수신하고 모니터링 할 수있음. -> 컨테이너 내부 애플리케이션과 직접 상호작용 가능 
- Detach 모드는 백그라운드에서 실행하는 모드. 터미널이 컨테이너의 입출력에 직접적으로 연결되지 않고, 컨테이너가 백그라운드에서 독립적으로 실행됨. 백그라운드 모드에서 별도로 log를 보고 싶으면 docker logs containerId로 확인 가능. 
- Detach 모드에서 -f 옵션을 추가하면 detached -> attached 환경으로 넘어갈 수 있음. 


