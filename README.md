# outsourcing-docker-img

#### 개인로컬에 EC2 웹서버와 같은 개발환경을 구축한다. 설치 및 사용은 하단에 명시된 방식으로 진행한다.


### Install 
<pre>
>> cd/home 
>> git clone https://github.com/eomssy/outsourcing-docker-img 
>> cd outsourcing-docker-img
</pre>

### Make docker image 
<pre>
>> docker build -t [docker image name] ex) docker build -t APM 
>> docker images  --> check your images
</pre>

### Build docker Container
<pre>
>> docker run -p 8080:80 -v [docker container path]:/var/www/html [docker image name]
</pre>

### Access Docker Container
<pre>
>> cd /home/outsourcing-docker-img
>> sudo docker exec -it[Running Docker Container Name] /bin/bash
</pre>

