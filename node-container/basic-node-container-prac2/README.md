## Basic Container Practice  



```bash
$ docker build . # 작성한 Koa Application 의 Dockerfile을 찾아서 이미지를 생성. 
$ docker run -p 3000:80 [docker image id] # 위에서 생성한 koa application image를 로컬 port 3000번에 매핑해서 실행 실제로 Docker Container 내부에서 사용되는 port는 80번 
$ docker ps  
$ docker ps -a 
$ docker stop [docker container id] # container stop
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



