### Docker Log

#### 자주 사용하는 Docker Image LOG 

<hr>
<br>

> Desktop setup

1. https://www.docker.com/get-started/. => MAC | Window 용 Docker Desktop 설치 (공식문서에서 Docker Hub에 관한 설명도 있고 설치하라고 하는데, 굳이 설치 안 해도됨.)

2. Terminal | PowerShell 창 => docker —version 명령어로 로컬에 도커 설치 확인.

<br>

> Docker Images 생성 방법

1. Dockerfile 생성 
2. 본인이 원하는 위치에 도커용 폴더 생성.
3. 1번에서 다운로드 받았거나 복사해둔 파일을 2번에 생성한 폴더에 붙여넣기. (이때, 파일명은 반드시 Dockerfile 라고 해야만 도커 이미지라고 인식함.)
4. 2번 폴더경로에서 docker build -t [원하는 이미지 이름] . —> 입력하면 도커 이미지가 생성됨. EX)docker build -t apm . 라고 명령어를 작성하면 위의 Dockerfile에 저장된 apm 이라는 이름을 가진 도커 이미지가 생성된다.
5. 설치관련 로그가 쭉 나오고 설치 완료되면, docker images 명령어를 통해 현재 내 로컬에 있는 이미지 목록을 볼 수 있음


<br>

> Docker image Container에 올리기 [container 관련 명령어 (도커 이미지 컨테이너에 올리고 실행)]

1. docker images —> 명령어를 통해 본인의 로컬에 존재하는 로컬 이미지 목록을 확인, 여기서 본인이 실행시키고자 하는 docker image 파일의 이름을 확인(REPOSITORY란 확인).

2. 1번에서 확인한 이름을 기반으로 도커 이미지를 컨테이너에 올리면 됨. docker run -p 8080:80 -v [본인이 사용하고자 하는 도커 컨테이너 폴더 경로 ]:/var/www/html [도커 이미지 이름] EX) docker run -p 8080:80 -v /Users/eomseung-yeol/Desktop/docker-test:/var/www/html apm —> -p 포트 지정, -v 폴더 연결 (본인의 로컬서버의 8080 포트에 아파치 웹 서버 80번 포트를 인바운드 해준다. 본인이 8080 포트 말고 다른 포트를 사용하고 싶으면, 본인이 사용중인 포트가 아닌 임의의 포트번호를 지정해서 연결할 수 도 있음. 추가로 로컬 폴더 경로를 아파치 메인 경로처럼 사용해서 사용이 가능하다. 폴더 위치만 잘 선정하면 본인 입맛에 맞게 개발가능.)


<br>

> Container & image 관련 명령어

```bash

# image 관련 명령어
docker images # 현재 내 컴퓨터에 만들어둔 도커 이미지 리스트를 확인 하는 명령어.
docker rmi [docker image name] # 만들어둔 도커 이미지를 제거하는 명령어.
docker build -t [만들고자 하는 docker image name] . # 도커 이미지 생성 명령어.

# container 관련 명령어 
docker ps -a # 현재 도커 컨테이너에 올라간 리스트를 보여준다
docker ps # 구동중인 컨테이너 리스트를 보여준다. 
docker container stop [Container ID] # 구동중인 컨테이너를 중지
docker rm [Container ID] # 리스트에 올라온 도커 컨테이너를 제거하는 명령어. 
sudo docker exec -it [실행중인 컨테이너 ID] /bin/bash # 실행중인 도커 컨테이너 내부로 접속하는 명령어.

```

<br>

>Docker Hub 이미지 검색 & Pull

```bash
docker search [docker image name] # docker image name 은 docker hub에 올라와 있는 이름을 검색하면 된다. 
docker pull [docker image name]:tag # docker hub에 올라온 이미지를 다운로드 받는 명령어. 
```

<br>

> Tip
- 도커 이미지는 용량이 매우 작은 편이지만, 그래도 메모리 공간을 어느 정도 차지하고 있음. 본인이 사용하지 않는 이미지는 삭제 시켜주는게 좋음.
- 도커 이미지 삭제시, 컨테이너를 먼저 삭제해주고, 이미지를 삭제해야 함. 컨테이너가 실행중인데 이미지를 삭제하면 에러나고 삭제 안됨.
- 내가 만들어둔 도커 이미지는 서버의 필수적인 요소만을 담고 있음. 혹시나 본인이 추가적으로 설치해야되는 패키지가 있을경우, 본인 로컬의 Dockerfile에 패키지 관련 명령어를 절차적으로 삽입하면 됨. (RUN ~~ )
- docker 설치/이미지 생성시에 /var/run/docker.sock의 permission denied 발생하는 경우
    - sudo chmod 666 /var/run/docker.sock —> 해당 경로의 권한을 주면 해결됨.