
FROM ubuntu:20.04
MAINTAINER eomssy <co6747@naver.com> 

#auto debian ubuntu setting
ARG DEBIAN_FRONTEND=noninteractive

# php ver 7.4.3 
RUN apt-get update 
RUN apt-get install -y apache2  #Install Apache web server 
RUN apt-get install -y software-properties-common
RUN apt-get update
RUN apt-get install -y php

#connect php & mysql 
RUN apt-get install -y php-mysql

EXPOSE 80 

CMD ["apachectl","-D","FOREGROUND"]