# 포팅 매뉴얼
<hr>

## 서비스 버전 정보
<hr>

| 서비스 | 버전 |
| --- | ---|
|IntelliJ |UE 2023.3.4|
| AWS EC2 | Ubuntu 20.04.6 LTS|
|GCP VM | Debian GNU/Linux 12, e2-standard-2|
|AWS S3 | |
|Java|jdk17|
|Spring Boot|3.2.5|
|Gradle|8.7|
|mysql|8.3.0|
|mongoDB|7.0.8|
|redis|7.2.4|
|Nginx|openresty/1.21.4.3|
|Openvidu|2.29.0|
|jenkins|2.440.3|
|docker|26.0.2|
|docker compose|2.27.0|
|Node|20.11.1|
|npm|10.2.4|
|react|18.2.0|
<br>

## 우분투 서버 설정

<hr>

### 패키지 목록 업데이트

```
sudo apt-get update -y
```

### 방화벽 설정 

| To            |Action|From|
|---------------|---|---|
| 22            |ALLOW IN|AnyWhere
| 8989          |ALLOW IN|AnyWhere
| 443           |ALLOW IN|AnyWhere
| 3306/tcp      |ALLOW IN|AnyWhere
| 3307/tcp      |ALLOW IN|AnyWhere
| 3000          |ALLOW IN|AnyWhere
| 3000/tcp      |ALLOW IN|AnyWhere
| 22 (v6)       |ALLOW IN|AnyWhere (v6)
| 8989 (v6)     |ALLOW IN|AnyWhere (v6)
| 443 (v6)      |ALLOW IN|AnyWhere (v6)
| 3306/tcp (v6) |ALLOW IN|AnyWhere (v6)
| 3307/tcp (v6) |ALLOW IN|AnyWhere (v6)
| 3000 (v6)     |ALLOW IN|AnyWhere (v6)
| 3000/tcp (v6) |ALLOW IN|AnyWhere (v6)
| 3001 (v6)     |ALLOW IN|AnyWhere (v6)
| 3003 (v6)     |ALLOW IN|AnyWhere (v6)
<br>

## S3 설정  
exec/assets 내의 어셋을 S3에 올리기

## Docker 설치
<hr>

### 우분투 시스템 패키지 업데이트

```
sudo apt-get update
```

### 필요한 패키지 설치 

```
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

### Docker의 공식 GPG키를 추가

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

### Docker의 공식 apt 저장소 추가

```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

### 시스템 패키지 업데이트

```
sudo apt-get update
```

### Docker 설치

```
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### 도커 실행상태 확인
```
sudo systemctl status docker
```

### 도커 실행

```
sudo docker run hello-world
```
<br>

## Docker compose 설정

<hr>

### Docker-compose 설치

```
sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

### docker-compose.yml 파일 
위치는 컨테이너 내부 X  
컨테이너 내부에 위치할 시, 볼륨이 제대로 이뤄지지 않음. 

```

services:
  mogaknyan_spring_boot:
    image: mogaknyan_spring_boot_img
    container_name: mogaknyan_spring_boot
    ports:
      - "3001:8080"
    env_file:
      - ./mogaknyan/.env
    restart: always
    volumes:
      - ./data:/data





  dev-mysql:
    image: mysql:latest
    container_name: dev-mysql
    ports:
      - "3307:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 'Ssafy703!'
      MYSQL_DATABASE: 'mogaknyan'
    restart: always
    volumes:
      - ./db/dev-mysql/data:/var/lib/mysql
      - ./db/dev-mysql/init:/docker-entrypoint-initdb.d



  dev-mongodb:
    image: mongo:latest
    container_name: dev-mongodb
    ports:
      - "3304:27017"
    volumes:
      - ./db/dev-mongodb/data:/data
      - ./db/dev-mongodb/init:/docker-entrypoint-initdb.d
    environment:
      MONGO_INITDB_ROOT_USERNAME: chilbaeksan
      MONGO_INITDB_ROOT_PASSWORD: Ssafy703!
      MONGO_INITDB_DATABASE: mogaknyan





  dev-redis:
    image: redis:latest
    container_name: dev-redis
    ports:
      - "5433:6379"
    restart: always
    command: redis-server --requirepass Ssafy703!





  redis:
    image: redis:latest
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - ./db/redis/init/redis.conf:/usr/local/etc/redis/redis.conf
    restart: always
    command: redis-server --requirepass Ssafy703!


  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "3000:27017"
    volumes:
      - ./db/mongodb/data:/data
      - ./db/mongodb/init:/docker-entrypoint-initdb.d
    environment:
      MONGO_INITDB_ROOT_USERNAME: chilbaeksan
      MONGO_INITDB_ROOT_PASSWORD: Ssafy703!
      MONGO_INITDB_DATABASE: mogaknyan
    restart: always



  mysql:
    image: mysql:latest
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 'Ssafy703!'
      MYSQL_DATABASE: 'mogaknyan'
    restart: always
    volumes:
      - ./db/mysql/data:/var/lib/mysql
      - ./db/mysql/init:/docker-entrypoint-initdb.d



  nginx:
    image: 'jc21/nginx-proxy-manager:latest'
    container_name: nginx
    restart: unless-stopped
    ports:
      - '80:80'
      - '8000:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt


  dozzle:
    image: amir20/dozzle:latest
    container_name: dozzle
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 8080:8080
    environment:
      DOZZLE_HOSTNAME: mogaknyan
      DOZZLE_REMOTE_HOST: tcp://172.26.5.232:2375|mogaknyan2
    restart: unless-stopped
```


<br>

## Jenkins 설정

<hr>

### Docker에 Jenkins 이미지 다운로드
```
docker pull jenkins/jenkins
```
### 젠킨스 컨테이너 생성
```
docker run -d -v jenkins_home:/var/jenkins_home -p 8081:8080 -p 50000:50000 --restart=on-failure --name jenkins-server jenkins/jenkins:lts-jdk11
```

### Docker 프로세스 정상동작 확인
```
docker ps
```

### password 확인
```
docker logs jenkins-server
```

### 브라우저를 열고 주소창에 다음과 같이 입력하여 접속한다. 
```
[서버주소]:8081
```

<br>


### 설치 플러그인 목록
|플러그인 이름|
|---|
|Branch API|
|Credentials Binding|
|Display URL API|
|Docker|
|Email Extension|
|Font Awesome API|
|Git|
|GitHub|
|GitHub Branch Source|
|GitLab|
|Gradle|
|Ionicons API|
|LDAP|
|Pipeline: API|
|Pipeline: Basic Steps|
|Pipeline: Groovy|
|Pipeline: Groovy Libraries|
|Pipeline: Nodes and Processes|
|Pipeline: Supporting APIs|
|Plain Credentials|
|SCM API|
|Script Security|
|Timestamper|

<br>


### mogaknyan (백엔드) 설정 파이프라인
```
pipeline {
    agent any
    stages {
        stage('clone'){
            steps{
                git credentialsId:'mogaknyan', url: 'https://lab.ssafy.com/s10-final/S10P31A703.git', branch: 'dep/BE'
            }
        }

        stage('Build') {
            steps {
                dir("./backend"){  
                    sh ' ./gradlew build'
                    
                }
              
            }
        }
        stage('Dockerize') {
            steps {
                sh '''
                    docker stop mogaknyan_spring_boot || true
                    docker rm mogaknyan_spring_boot || true
                    docker rmi mogaknyan_spring_boot_img || true
                    docker build -t mogaknyan_spring_boot_img ./backend
                '''
            }
        }
        
        stage('Get Env') {
            steps {
               
                    withCredentials([file(credentialsId: 'spring-boot-env-var', variable: "env_file")]){
                        sh 'cp ${env_file} .env'
                    }
                
            }
        }
        
        
        stage('Deploy') {
            steps {
               dir("../"){
                sh 'docker-compose up mogaknyan_spring_boot -d'
               }
            }
        
            
        }
    }
}
```
<br>


### mogaknyan 환경변수 파일 설정

Credentail 파일 추가
spring-boot-env-var 라는 이름 .env파일 추가
```
MYSQL_HOST=[서버주소]
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=Ssafy703!
MYSQL_DATABASE=mogaknyan

MONGODB_HOST=[서버주소]
MONGODB_PORT=3000
MONGODB_USERNAME=mogaknyan
MONGODB_PASSWORD=Ssafy703!
MONGODB_DATABASE=mogaknyan


REDIS_HOST=[서버주소]
REDIS_PORT=6379
REDIS_PASSWORD=Ssafy703!


OPENVIDU_URL=https://34.152.10.124:443
OPENVIDU_SECRET=Ssafy703
```

<br>


### mogaknyan-frontend 설정 파이프라인

```
pipeline {
    agent any
    

    stages {
        stage('clone'){
            steps{
                git credentialsId:'mogaknyan', url: 'https://lab.ssafy.com/s10-final/S10P31A703.git', branch: 'dep/FE'
            }
        }

        stage('Build') {
            steps {
                dir("./frontend"){  
                    sh 'npm i -g pnpm'
                    sh 'pnpm i'
                    sh 'pnpm run build'
                    
                }
              
            }
        }

    }
}
```
<br>

### mogaknyan-frontend .env파일
```
VITE_API_URL=https://mogaknyang-back.duckdns.org/api/v1

VITE_IMG_URL=https://mogaknyan.s3.ap-northeast-2.amazonaws.com

VITE_AI_URL=https://mogaknyang-ai.duckdns.org

VITE_OPENVIDU_URL=https://mogaknyang-back.duckdns.org/api
VITE_OPENVIDU_SERVER_URL=https://34.152.10.124:443
VITE_OPENVIDU_ SERVER_SECRET=Ssafy703
```

### gitlab webhook 설정하기
<br>


1. <b>gitlab에서 API 토큰 발급하기</b>  
Settings - access Token - Add new token


2. <b> 젠킨스 credential 생성 </b>
젠킨스에서 생성  
Jenkins 관리 - Credentials - Add Credentials  
방금 발급 받은 api 키를 입력

3. <b> 젠킨스 프로젝트 - 설정에서 CI/CD 설정</b>  
Build Triggers - Build when a change is pushed to Gitlab... - PushEvents, Opened Merge Request Events 체크

고급 - Secret token Generate -> 복사해두기


4. <b>gitlab에서 settings - webhooks - add new webhook</b>


5. <b>URL에 해당 젠킨스 프로젝트 주소 입력</b>
```http://해당서버주소:8081/project/mogaknyan```  

6. <b>Secret token</b>  
복사해둔 시크릿 토큰 붙여넣기


7. <b>Trigger</b>  
Push Event 체크  
Regular expression으로 브랜치 설정  
```^dep/BE$```

8. <b>SSL verification</b>  
Enable SSL verification 체크

<br>


## Nginx 설정

<hr>

### docker-compose.yml에 nginx-proxy-manager 설정하기

```
  nginx:
    image: 'jc21/nginx-proxy-manager:latest'
    container_name: nginx
    restart: unless-stopped
    ports:
      - '80:80'
      - '8000:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt

```
```
docker-compose up nginx -d
```

### nginx-proxy-manager 접속하기   

```
서버주소:8000
```
기본 이메일, 비밀번호로 접속  후 변경하기
```
Email:    admin@example.com
Password: changeme
```


### 서버별 도메인 발급 받기
- duckdns와 같은 무료 도메인 발급 사이트에서 서버별 도메인 발급받기  
- 백엔드 서버, 프론트엔드 서버
### SSL Certificates 발급받기
- 발급받은 도메인으로 SSL 인증서 발급 
- nginx-proxy-manager - SSL Certification - Add Let's Encrypt


### 프록시 매니저 설정
Hosts - Add Proxy Host  
Domain Names 설정.   
Scheme : http  
Forward Hostname/IP : IP주소 적기  
Forward Port : 서비스 내부 포트 번호 적기   
Websockets Support 체크  
SSL - Force SSL, Http/2 Support, HSTS Enabled 체크  


## Openvidu 설정


<hr>

### Openvidu 설치

Google Cloud Platform VM에 설치

아래의 Openvidu Docs를 참고하여 오픈비두 설치

[On premises - OpenVidu Docs](https://docs.openvidu.io/en/stable/deployment/ce/on-premises/)

### 관리자 권한 부여

```jsx
sudo su
```

### opt 폴더로 이동

```jsx
cd /opt
```

### Openvidu 인스톨

```jsx
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```

### Openvidu env 파일 수정

```jsx
vim /opt/openvidu/.env
```

```
# OpenVidu configuration
# ----------------------
# Documentation: https://docs.openvidu.io/en/stable/reference-docs/openvidu-config/

# NOTE: This file doesn't need to quote assignment values, like most shells do.
# All values are stored as-is, even if they contain spaces, so don't quote them.

# Domain name. If you do not have one, the public IP of the machine.
# For example: 198.51.100.1, or openvidu.example.com
DOMAIN_OR_PUBLIC_IP=vidu.duckdns.org

# OpenVidu SECRET used for apps to connect to OpenVidu server and users to access to OpenVidu Dashboard
OPENVIDU_SECRET=Ssafy703

# Certificate type:
# - selfsigned:  Self signed certificate. Not recommended for production use.
#                Users will see an ERROR when connected to web page.
# - owncert:     Valid certificate purchased in a Internet services company.
#                Please put the certificates files inside folder ./owncert
#                with names certificate.key and certificate.cert
# - letsencrypt: Generate a new certificate using letsencrypt. Please set the
#                required contact email for Let's Encrypt in LETSENCRYPT_EMAIL
#                variable.
CERTIFICATE_TYPE=letsencrypt

# If CERTIFICATE_TYPE=letsencrypt, you need to configure a valid email for notifications
LETSENCRYPT_EMAIL=gyfl5542@naver.com

# Proxy configuration
# If you want to change the ports on which openvidu listens, uncomment the following lines

# Allows any request to http://DOMAIN_OR_PUBLIC_IP:HTTP_PORT/ to be automatically
# redirected to https://DOMAIN_OR_PUBLIC_IP:HTTPS_PORT/.
# WARNING: the default port 80 cannot be changed during the first boot
# if you have chosen to deploy with the option CERTIFICATE_TYPE=letsencrypt
# HTTP_PORT=80

# Changes the port of all services exposed by OpenVidu.
# SDKs, REST clients and browsers will have to connect to this port
# HTTPS_PORT=443

# Old paths are considered now deprecated, but still supported by default. 
# OpenVidu Server will log a WARN message every time a deprecated path is called, indicating 
# the new path that should be used instead. You can set property SUPPORT_DEPRECATED_API=false 
# to stop allowing the use of old paths.
# Default value is true
# SUPPORT_DEPRECATED_API=false

# If true request to with www will be redirected to non-www requests
# Default value is false
# REDIRECT_WWW=false

# How many workers to configure in nginx proxy. 
# The more workers, the more requests will be handled
# Default value is 10240
# WORKER_CONNECTIONS=10240

# Access restrictions
# In this section you will be able to restrict the IPs from which you can access to
# Openvidu API and the Administration Panel
# WARNING! If you touch this configuration you can lose access to the platform from some IPs.
# Use it carefully.

# This section limits access to the /dashboard (OpenVidu CE) and /inspector (OpenVidu Pro) pages.
# The form for a single IP or an IP range is:
# ALLOWED_ACCESS_TO_DASHBOARD=198.51.100.1 and ALLOWED_ACCESS_TO_DASHBOARD=198.51.100.0/24
# To limit multiple IPs or IP ranges, separate by commas like this:
# ALLOWED_ACCESS_TO_DASHBOARD=198.51.100.1, 198.51.100.0/24
# ALLOWED_ACCESS_TO_DASHBOARD=

# This section limits access to the Openvidu REST API.
# The form for a single IP or an IP range is:
# ALLOWED_ACCESS_TO_RESTAPI=198.51.100.1 and ALLOWED_ACCESS_TO_RESTAPI=198.51.100.0/24
# To limit multiple IPs or or IP ranges, separate by commas like this:
# ALLOWED_ACCESS_TO_RESTAPI=198.51.100.1, 198.51.100.0/24
# ALLOWED_ACCESS_TO_RESTAPI=

# Whether to enable recording module or not
OPENVIDU_RECORDING=false

# Use recording module with debug mode.
OPENVIDU_RECORDING_DEBUG=false

# Openvidu Folder Record used for save the openvidu recording videos. Change it
# with the folder you want to use from your host.
OPENVIDU_RECORDING_PATH=/opt/openvidu/recordings

# System path where OpenVidu Server should look for custom recording layouts
OPENVIDU_RECORDING_CUSTOM_LAYOUT=/opt/openvidu/custom-layout

# if true any client can connect to
# https://OPENVIDU_SERVER_IP:OPENVIDU_PORT/recordings/any_session_file.mp4
# and access any recorded video file. If false this path will be secured with
# OPENVIDU_SECRET param just as OpenVidu Server dashboard at
# https://OPENVIDU_SERVER_IP:OPENVIDU_PORT
# Values: true | false
OPENVIDU_RECORDING_PUBLIC_ACCESS=false

# Which users should receive the recording events in the client side
# (recordingStarted, recordingStopped). Can be all (every user connected to
# the session), publisher_moderator (users with role 'PUBLISHER' or
# 'MODERATOR'), moderator (only users with role 'MODERATOR') or none
# (no user will receive these events)
OPENVIDU_RECORDING_NOTIFICATION=publisher_moderator

# Timeout in seconds for recordings to automatically stop (and the session involved to be closed)
# when conditions are met: a session recording is started but no user is publishing to it or a session
# is being recorded and last user disconnects. If a user publishes within the timeout in either case,
# the automatic stop of the recording is cancelled
# 0 means no timeout
OPENVIDU_RECORDING_AUTOSTOP_TIMEOUT=120

# Maximum video bandwidth sent from clients to OpenVidu Server, in kbps.
# 0 means unconstrained
OPENVIDU_STREAMS_VIDEO_MAX_RECV_BANDWIDTH=1000

# Minimum video bandwidth sent from clients to OpenVidu Server, in kbps.
# 0 means unconstrained
OPENVIDU_STREAMS_VIDEO_MIN_RECV_BANDWIDTH=300

# Maximum video bandwidth sent from OpenVidu Server to clients, in kbps.
# 0 means unconstrained
OPENVIDU_STREAMS_VIDEO_MAX_SEND_BANDWIDTH=1000

# Minimum video bandwidth sent from OpenVidu Server to clients, in kbps.
# 0 means unconstrained
OPENVIDU_STREAMS_VIDEO_MIN_SEND_BANDWIDTH=300

# All sessions of OpenVidu will try to force this codec. If OPENVIDU_STREAMS_ALLOW_TRANSCODING=true
# when a codec can not be forced, transcoding will be allowed
# Values: MEDIA_SERVER_PREFERRED, NONE, VP8, VP9, H264
# Default value is MEDIA_SERVER_PREFERRED
# OPENVIDU_STREAMS_FORCED_VIDEO_CODEC=MEDIA_SERVER_PREFERRED

# Allow transcoding if codec specified in OPENVIDU_STREAMS_FORCED_VIDEO_CODEC can not be applied
# Values: true | false
# Default value is false
# OPENVIDU_STREAMS_ALLOW_TRANSCODING=false

# true to enable OpenVidu Webhook service. false' otherwise
# Values: true | false
OPENVIDU_WEBHOOK=false

# HTTP endpoint where OpenVidu Server will send Webhook HTTP POST messages
# Must be a valid URL: http(s)://ENDPOINT
#OPENVIDU_WEBHOOK_ENDPOINT=

# List of headers that OpenVidu Webhook service will attach to HTTP POST messages
#OPENVIDU_WEBHOOK_HEADERS=

# List of events that will be sent by OpenVidu Webhook service
# Default value is all available events
OPENVIDU_WEBHOOK_EVENTS=[sessionCreated,sessionDestroyed,participantJoined,participantLeft,webrtcConnectionCreated,webrtcConnectionDestroyed,recordingStatusChanged,filterEventDispatched,mediaNodeStatusChanged,nodeCrashed,nodeRecovered,broadcastStarted,broadcastStopped]

# How often the garbage collector of non active sessions runs.
# This helps cleaning up sessions that have been initialized through
# REST API (and maybe tokens have been created for them) but have had no users connected.
# Default to 900s (15 mins). 0 to disable non active sessions garbage collector
OPENVIDU_SESSIONS_GARBAGE_INTERVAL=900

# Minimum time in seconds that a non active session must have been in existence
# for the garbage collector of non active sessions to remove it. Default to 3600s (1 hour).
# If non active sessions garbage collector is disabled
# (property 'OPENVIDU_SESSIONS_GARBAGE_INTERVAL' to 0) this property is ignored
OPENVIDU_SESSIONS_GARBAGE_THRESHOLD=3600

# Call Detail Record enabled
# Whether to enable Call Detail Record or not
# Values: true | false
OPENVIDU_CDR=false

# Path where the cdr log files are hosted
OPENVIDU_CDR_PATH=/opt/openvidu/cdr

# Kurento Media Server image
# --------------------------
# Docker hub kurento media server: https://hub.docker.com/r/kurento/kurento-media-server
# Uncomment the next line and define this variable with KMS image that you want use
# KMS_IMAGE=kurento/kurento-media-server:7.0.1

# Kurento Media Server Level logs
# -------------------------------
# Uncomment the next line and define this variable to change
# the verbosity level of the logs of KMS
# Documentation: https://doc-kurento.readthedocs.io/en/stable/features/logging.html
# KMS_DOCKER_ENV_GST_DEBUG=

# Openvidu Server Level logs
# --------------------------
# Uncomment the next line and define this variable to change
# the verbosity level of the logs of Openvidu Service
# RECOMENDED VALUES: INFO for normal logs DEBUG for more verbose logs
# OV_CE_DEBUG_LEVEL=INFO

# Java Options
# --------------------------
# Uncomment the next line and define this to add
# options to java command
# Documentation: https://docs.oracle.com/cd/E37116_01/install.111210/e23737/configuring_jvm.htm#OUDIG00058
# JAVA_OPTIONS=-Xms2048m -Xmx4096m -Duser.timezone=UTC
```


## 사용 포트 목록


<hr>


### EC2
| 서비스 명  | 포트 | 도메인 |
| --- | --- | --- |
| frontend | 3001 |  |
| backend | 3002 | https://mogaknyang-back.duckdns.org/ |
| ai | 3003 | https://mogaknyang-ai.duckdns.org |
| mysql | 3306 |  |
| jenkins | 8081 |  |
| mongodb | 3000 |  |
| redis | 6379 |  |
| dev-mysql | 3307 |  |
| dev-mongodb | 3304 |  |
| dev-redis | 5433 |  |
| nginx-http | 80:80 |  |
| nginx-https | 443:443 |  |
| nginx-admin | 8000:81 |  |
| dozzle | 8080 | http://3.39.224.32:8080/ |

### Google Cloud Platform
|서비스명|포트|도메인|
| --- | --- | --- |
| dozzle | 8080 | http://34.152.10.124:8080/ |
| openvidu | 443 | 34.152.10.124 |
