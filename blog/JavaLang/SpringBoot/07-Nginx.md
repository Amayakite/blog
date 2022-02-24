---
title: 07-Nginx
date: 2021-12-30 11:52:30
category: SpringBoot
tag:
- Nginx
---

## 前言

这是学习Spring Cloud之前的倒数第二个垫脚石

### Nginx简介

> Nginx是一个高性能的**HTTP**和**反向代理**的Web服务器，同时也提供了IMAP/POP3/STMP等各种服务
>
> 是老毛子开发的
>
> 百分之九十的网站都用了Nginx
>
> 这玩意的特点是：占有的内存少，并发能力强，在同类的反向代理服务期内是表现比较好的那一种
>
> Nginx专门为性能优化而开发，能承受高负载的考验，貌似可以接收50000个并发连接/s

### 正向代理的概念

如果把局域网外的Internet想象成一个巨大的资源库，则局域网中的客户端要访问Internet，则需要通过代理服务器来访问

这种代理服务就被称为正向代理

就像是我们挂梯子访问github、google那样，梯子就是代理服务器，nginx就可以成为这样的服务器

![image-20211230120343736](/images/SpringBoot/07-Nginx/image-20211230120343736.png)

浏览器中配置代理服务器，通过代理服务器去绑定网址，最终将内容返回，这个过程就叫做正向代理

人话就是：搭梯子

### 反向代理的概念

通过反向代理，其实客户端对代理是没有感知的，因为客户端无需配置就可以进行访问，我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，再返回给客户端，此时反向代理服务器和目标服务器对外一是同一个服务器，暴露的是代理服务器的IP地址，隐藏了真实服务器IP地址

- **正向代理隐藏真实客户端，反向代理隐藏真实服务端**

正向代理访问的外部内容，反向代理访问的是内部内容

![image-20211230121146260](/images/SpringBoot/07-Nginx/image-20211230121146260.png)

### 负载均衡

客户端发送多个请求到服务器，服务器处理请求，有一些可能要与数据库交互，服务器处理完毕后，再将结果返回给客户端

这种架构模式对于早期的系统相对单一，并发和请求相对较少的情况下是比较合适的，成本也比较低，但是随着信息数据的不断增长，访问量和数据量飞速增长，以及业务系统的复杂程度增加，这种架构会造成服务器响应客户端的请求变慢，并发量特别大的时候，还很容易导致服务器崩溃，这很明显是由于服务器性能的瓶颈造成的问题，，那么如何解决这种情况呢

![image-20211230122132179](/images/SpringBoot/07-Nginx/image-20211230122132179.png)

首先我们可能想到的是给服务器加配，但是这也是有上限的

例如双十一的当天，某个商品的瞬间访问量是非常大的，那么类似于上面的操作 将电脑配置拉满，是不能解决需求的

也就是说，纵向解决问题的方法行不通了，那么横向增加服务器的数量呢？

这个时候集群的概念产生了，单个服务器解决不了，我们增加服务器的数量，然后将请求分发到各个服务器上，将原先请求集中到单个服务器的情况改变为将请求分配到多个服务器上，将负载分发到不同的服务器，这也就是我们说的负载均衡

![image-20211230122934893](/images/SpringBoot/07-Nginx/image-20211230122934893.png)

### 动静分离

为了加快网站的解析速度，可以把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力

原本是这样

![image-20211230123555818](/images/SpringBoot/07-Nginx/image-20211230123555818.png)

动静分离就是

![image-20211230123712085](/images/SpringBoot/07-Nginx/image-20211230123712085.png)

就有点像是IOC..

## Nginx的安装

### Ubuntu直装

```bash
sudo apt install nginx
```

编译安装这里就不说了  估计也没多少人会这样装

启动

```bash
systemctl start nginx
```

接着访问80端口即可

![image-20211230142610498](/images/SpringBoot/07-Nginx/image-20211230142610498.png)

### Docker

拉取镜像

```bash
docker pull nginx
```

启动

```bash
docker run --name 容器名称 -p 你想要的端口:80 -d nginx
```

我这里就丢在80端口启动了

```bash
docker run --name nginx -p 80:80 -d nginx
```

### Nginx基本命令

查看版本号

```bash
nginx -v
# 结果：nginx version: nginx/1.21.5
```

关闭nginx 如果是在docker容器内操作 容器也会被关闭

```bash
nginx -s stop
```

启动nginx

```bash
# 如果不是docker
nginx

# docker
docker start nginx
```

重新加载nginx（不重启 重新加载配置文件）

```bash
# 不是docker
nginx -s reload
```

## Nginx的配置文件

配置文件可能存在两个位置

如果说是普通启动的话 应该是在

```bash
cd /usr/local/nginx
# 或者可能在
cd /etc/nginx
```

如果说是在docker内启动的话 则在

```bash
cd /etc/nginx
```

如果说你不确定的话 **可以通过系统自带的命令来查看配置文件的位置**

```bash
# 这个是查看nginx的安装路径
whereis nginx
# docker结果：nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx

# 搜索nginx的配置文件路径
find / -name 'nginx.conf'
# 结果：/etc/nginx/nginx.conf

```

我们到了之后 可以通过 `cat nginx.conf`查看它的配置文件内都配置了什么

如果你是直装 那么文件应该不像下面一样简陋 而是有非常多的注释

如果你是docker安装 就会像下面一样  只有这些内容

```nginx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

Nginx的配置文件有三个部分组成

### 第一部分-全局快

从配置文件最开始到events块之前的内容，主要会设置一些影响nginx服务器整体运行的配置指令，主要包括配置运行nginx服务器的用户(组)、允许生成的worker process数，进程PID存放路径，日志存放路径和类型及配置文件的引入等

默认是这些

```nginx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;
```

先说明下worker_processes：**worker_processes，工作进程数**

这是nginx服务器并发处理服务的关键配置，可以穿入数值或者auto，如果传入的是数值，则数值越大，可以支持处理的并发量越多，但是会收到硬件、软件等设备的约束

简单来说 就是启动的进程数量，最多不能超过CPU的核心数量

一般来说保持auto即可 当然官方推荐是1

### 第二部分-events块

```nginx
events {
    worker_connections  1024;
}
```

这一款主要是负责nginx服务器和用户的网络连接：**worker_connections，单个工作进程可以允许同时建立外部连接的数量**

- 默认：worker_connections: 1024
- 调大：worker_connections: 100000，（调大到10万连接）

当然这个玩意不能随便设置

- connections不是随便设置的，而是与两个指标有重要关联，一是内存，二是操作系统级别的“进程最大可打开文件数
- 内存：每个连接数分别对应一个read_event、一个write_event事件
  - 一个连接数大概占用232字节
  - 2个事件总占用96字节
  - 那么一个连接总共占用328字节
  - 通过数学公式可以算出100000个连接数大概会占用 31M = 100000 * 328 / 1024 / 1024
  - 当然这只是nginx启动时，connections连接数所占用的nginx
- 进程最大可打开文件数
  - **进程最大可打开文件数受限于操作系统**，可通过 `ulimit -n` 命令查询
  - 以前是1024，现在是65535
  - nginx提供了`worker_rlimit_nofile`指令
  - 这是除了`ulimit`的一种设置可用的描述符的方式
  - 该指令与使用`ulimit`对用户的设置是同样的效果。此指令的值将覆盖`ulimit`的值
    - 如：`worker_rlimit_nofile 20960`;

```ini {2,5}
worker_processes auto; 
worker_rlimit_nofile 2;
error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;
events { 
   worker_connections 65535; 
}
```

### 第三部分-http块

前面的都是一些全局配置 基本上抄一抄就完事了 最重要的是接下来的HTTP块 这个是最重要的部分

```nginx
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

首先 注意最后一句话 这个`include`类似于Java或者其他语言内的导包`import xxx.xxx.xx`

他这里应该是有点正则匹配的那味道 我们接下来看看`/etc/nginx/conf.d/*.conf`目录下有多少个conf文件

```bash
cd /etc/nginx/conf.d/
find *.conf
# 结果:default.conf
```

接下来看看这个conf内有哪些内容

```bash
cat find *.conf
```

结果：

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

所以他们两组合在一起 应该是：

每个Http块可以包含多个server块，而每个server就相当于一个虚拟主机

而每个server块也分为全局server块，以及同时可以包含多个location块

```nginx
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;

    keepalive_timeout  65;

 server {
        listen       80;
        listen  [::]:80;
        server_name  localhost;


        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }


        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }


 }
}
```

## Nginx配置实例1-反向代理

我们首先使用spring整一个简单的hello world

```java
@RestController
public class HelloController{
    
    @GetMapping("/hello")
    public String sayHello(){
        return "Hello World";
    }
}
```

然后在pom.xml中加入build

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

接着运行右边maven的package 就能得到jar文件 丢到服务器上即可

端口我设置的是8888

```properties
server.port=8888
```

接着在服务器上

```bash
screen -S helloWorld
java -jar xxxx.jar
```

接着按ctrl+a+d暂时关闭这个窗口 进入到我们的nginx内

我们想要访问localhost:80/hello 跳转为我们这个spring工程的hello

接着 如果说你是docker装的nginx 先记下这个端口

![image-20211230163638948](/images/SpringBoot/07-Nginx/image-20211230163638948.png)

连接的时候会跳出来的docker绑定的ip

默认一般都是`172.17.0.1`

然后如果你是docker的话 先进入容器 然后安装下vim

```bash
mv /etc/apt/sources.list /etc/apt/sources.list.bak

cat <<EOF >/etc/apt/sources.list
deb http://mirrors.ustc.edu.cn/debian stable main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free
EOF

apt update

apt install vim
```

接着编辑配置Server的文件

```bash
vi /etc/nginx/conf.d/default.conf
```

首先可以看到默认的配置如下

```nginx
server {
 # 这个server的端口
    listen       80;
    # 这里的[::]:80; 表示本机的任意地址的80都是它
    listen  [::]:80;
    # 这里是这个server的名字 可以自由更该
    server_name  localhost;

 # 这里是访问根路径下的一些对应操作
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
 
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }


}
```

我们只需要做如下的更该

```nginx {10}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;


    location / {
        root   /usr/share/nginx/html;
        # 如果你不是docker的话 下面这个proxy_pass的路径设置为 http://localhost:8888或者127.0.0.1即可
        proxy_pass http://172.17.0.1:8888;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }


}
```

接着重载nginx

```bash
nginx -s reload
```

然后你就可以正常访问了

![image-20211230165105012](/images/SpringBoot/07-Nginx/image-20211230165105012.png)

### Nginx反向代理配置多个路径

假设说我们现在有这样一个需求

- 访问`localhost:655/baidu`跳转到`www.baidu.com`
- 访问`localhost:655/bilibili`跳转到`www.bilibili.com`

你也可以改成自己写的java程序 或者其他的东西 这里我就懒得整了

这里说下docker run的时候派发多个端口

```bash
docker run -d -p 80:80 -p 655:655 --name nginx nginx
```

接下来我们依旧是到default.conf内 **追加**如下数据

```nginx
server {
    listen 655;
    listen [::]:655;
    server_name MyLocal;

    location ~ /bilibili/ {
        proxy_pass https://www.bilibili.com;
    }

    location ~ /baidu/ {
        proxy_pass https://www.baidu.com;
    }

}

```

然后 nginx -s reload

接着访问

![image-20211230174250562](/images/SpringBoot/07-Nginx/image-20211230174250562.png)

发现err

这其实是正常的效果，看console可以发现

![image-20211230174354165](/images/SpringBoot/07-Nginx/image-20211230174354165.png)

有很多东西 没法代理，当然 如果是你自己整两个tomcat上去 并不会出现这样的问题

## Location内的特殊符号说明

我们刚刚在配置的时候 使用了一个特殊的符号

```nginx {6,10}
server {
    listen 655;
    listen [::]:655;
    server_name MyLocal;

    location ~ /bilibili/ {
        proxy_pass https://www.bilibili.com;
    }

    location ~ /baidu/ {
        proxy_pass https://www.baidu.com;
    }

}

```

`~ /bilibili/`和`~ /baidu/` 其他的好理解 代表访问自定路径balabala的 那么这个`~`呢？

其实nginx给我们准备了四个特殊的玩意

![image-20211230174832678](/images/SpringBoot/07-Nginx/image-20211230174832678.png)

1. `=` 用于不含正则表达式的uri前，要求请求字符串与uri严格匹配，如果是匹配成功，就停止继续向下搜索饼立刻处理该请求
2. `~`用户表示uri包含正则表达式，并且区分大小写
3. `~*` 用于表示uri包含正则表达式，并且不区分大小写
4. `^~`用于不含正则表达式的uri前，要求nginx服务器找到标识uri和请求字符串**匹配度最高**的location之后，立刻使用该location处理请求，而不再使用location块中的正则uri和请求字符串能做匹配

如果uri包含正则表达式，则必须包含有`~`或者`~*`的标识

也就是说 我们之前定义的规则可以通过这样访问

![image-20211230175117919](/images/SpringBoot/07-Nginx/image-20211230175117919.png)

也可以这样

![image-20211230175221571](/images/SpringBoot/07-Nginx/image-20211230175221571.png)

## Nginx配置负载均衡

我们现在有一个需求

现在有两个一模一样的nginx服务器 里面的内容都一样

区别就在于一个在7777端口 一个在 8888 端口

我们先准备下tomcat

```bash
docker pull tomcat
docker run -d -p 7777:8080 --name tomcat1  tomcat
docker run -d -p 8888:8080 --name tomcat2  tomcat
```

接着在两个的webapps内都添加对应的页面

![image-20211230180701609](/images/SpringBoot/07-Nginx/image-20211230180701609.png)

7777的index

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>7777</title>
</head>
<body>
    这里是7777端口的tomcat
</body>
</html>
```

另外一个同理 注意 tomcat默认是10.x 所以webinf也要10.x的（5.0+）

用命令来操作的话 大概是这样（两个容器内都是这样操作）

```shell
mkdir /usr/local/tomcat/webapps/ROOT/
mkdir /usr/local/tomcat/webapps/ROOT/WEB-INF/
touch /usr/local/tomcat/webapps/ROOT/index.html
touch /usr/local/tomcat/webapps/ROOT/WEB-INF/web.xml
cat << EOF > /usr/local/tomcat/webapps/ROOT/WEB-INF/web.xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee
                      https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
  version="5.0"
  metadata-complete="true">

  <display-name>Welcome to Tomcat</display-name>
  <description>
     Welcome to Tomcat
  </description>

</web-app>
EOF
cat  << EOF > /usr/local/tomcat/webapps/ROOT/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>8888</title>
</head>
<body>
    这里是8888端口的tomcat
</body>
</html>
EOF

```

如果感觉自己没有配置好 可以自己在vscode中开个端口转发测试

![image-20211230182449742](/images/SpringBoot/07-Nginx/image-20211230182449742.png)

接着开始配置nginx

在default.conf内添加如下内容

```nginx {15}
# 这里是配置一个负载均衡站点
# 相当于之后可以指定这里为一个网址 然后访问这里 随机访问一个站点 如果你不是docker 这里填写本机(localhost)即可
upstream myServer{
    server 172.17.0.1:7777;
    server 172.17.0.1:8888;
}

server {
    listen 655;
    listen [::]:655;
    server_name MyLocal;

    location / {
        # 指定访问路径为负载均衡站点 注意 http:// 不能省略
        proxy_pass http://myServer;
        
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
}

```

接着重载服务

```bash
nginx -s reload
```

接着访问

![image-20211230184107188](/images/SpringBoot/07-Nginx/image-20211230184107188.png)

![image-20211230184120999](/images/SpringBoot/07-Nginx/image-20211230184120999.png)

你会发现每次访问的都不一样

## 负载均衡的几种策略

### 轮循（默认）

默认是轮循（就像是RabbitMQ那样，固定的分配 如果说你多访问几次就会发现上面的案例中的结果 第一次是7 第二次一定是8 以此类推）

轮循分配：每个请求按照时间顺序逐一分配到不同的后端服务器，如果服务器down掉了，能自动剔除

### Weight权重策略

顾名思义 根据权重来分配客户端的访问倾斜度

默认所有的权重都是1

权重越高 分配到的客户端越多

```nginx {2,3}
upstream myServer{
    server 172.17.0.1:7777 weight=5;
    server 172.17.0.1:8888 weight=10;
}

server {
    listen 655;
    listen [::]:655;
    server_name MyLocal;

    location / {
        # 指定访问路径为负载均衡站点
        proxy_pass http://myServer;
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
}
```

### ip_hash

每个请求按照访问ip的hash结果分配，这样**每个访客可以固定访问一个后端服务器**，可以解决普通前后端不分离项目中的session问题

比如说下面这个配置 我第一次访问的时候分配到了8888 后面也会一直被分配到8888

```nginx {2}
upstream myServer{
    ip_hash;
    server 172.17.0.1:7777 ;
    server 172.17.0.1:8888 ;
}

server {
    listen 655;
    listen [::]:655;
    server_name MyLocal;

    location / {
        # 指定访问路径为负载均衡站点
        proxy_pass http://myServer;
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
}
```

### fair-响应时间分配

按照后端服务器的响应时间来动态分配 响应时间短的优先分配

 注意 这种方式需要自己手动给nginx安装第三方模块upstream-fair 具体方法百度

```nginx {4}
upstream myServer {
    server 172.17.0.1:7777 ;
    server 172.17.0.1:8888 ;
    fair;
}

server {
    listen 655;
    listen [::]:655;
    server_name MyLocal;

    location / {
        # 指定访问路径为负载均衡站点
        proxy_pass http://myServer;
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
}
```

## Nginx动静分离

简单来说就是把动态和静态资源的请求分开

也就是前后端分离 各做各的

> 可以理解成  Nginx处理静态页面，我们的Java程序处理动态页面

目前来说有两种实现方案

- 存储把静态文件独立成单独的域名，放在独立的服务器上，这也是主流推崇的方案
- 另一种是动态和静态文件混合在一起发布，通过nginx分开

![image-20211230191723582](/images/SpringBoot/07-Nginx/image-20211230191723582.png)

通过`location`指定不同的后缀名实现不同的转发请求，通过`expries`参数设置，可以使浏览器缓存过期时间，减少与服务器之间的请求和流量

### 静态资源的正向代理-准备工作

我这里就用vite+Vue3整一个简单的hello World吧

package.json:

```json
{
  "name": "test-vue3-vite",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^0.24.0",
    "sass": "^1.45.1",
    "sass-loader": "^12.4.0",
    "vue": "^3.2.25"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^2.0.0",
    "vite": "^2.7.2"
  }
}
```

App.vue

```vue
<template>
  <div class="container">
    <div>Hello World</div>
    <div>{{ count }}</div>
    <div>
      <button @click="add">Click Me Add Count</button>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

let count = ref(0);

const add = () => {
  count.value = count.value + 1;
}

</script>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  height: 100vh;

  flex-direction: column;
  button{
    font-size: 40px;
    background-color: rgb(225, 0, 255);
    border: none;
    // 点击变色
    &:active {
      background-color: rgb(0, 0, 255);
    }
    transition: background-color 0.5s ease;
    padding: 20px;
    color:aliceblue;
  }
}
</style>
```

页面效果

![image-20211230194525973](/images/SpringBoot/07-Nginx/image-20211230194525973.png)

接着，将相应的打包好的资源拷贝到docker目录内

```bash
docker cp /xxx/xxx/dist nginx:/data/www/
```

然后再拷贝一点静态文件进去

![image-20211230195615620](/images/SpringBoot/07-Nginx/image-20211230195615620.png)

附-重命名脚本

```shell
for names in ./images/*
do
    echo "$names"
    news=$i
    echo "$news"
    mv $names ./images/$news.png
    let i=i+1
done
```

最终结构

![image-20211230195809173](/images/SpringBoot/07-Nginx/image-20211230195809173.png)

### 配置静态资源

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name localhost;

    # 正常情况下 我们的html之类的都是放在根目录下的
    location / {
        root /data/www/;
        index index.html index.htm;
    }

    location /static/ {
        # 注意 其他静态资源 都要通过alias配置 不然读取不到 我也不知道为啥
        alias /data/images/;
        # 这个是文件树 默认是不开启的
        autoindex on;
        # 这个是设置客户端的静态资源缓存时间
        expires 3d;
    }
}
```

> nginx指定文件路径有两种方式root和alias，指令的使用方法和作用域：
>
> > [root]
> > 语法：root path
> > 默认值：root html
> > 配置段：http、server、location、if
> > [alias]
> > 语法：alias path
> > 配置段：location
>
> - root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。
> - root的处理结果是：root路径＋location路径
> - alias的处理结果是：使用alias路径替换location路径
> - alias是一个目录别名的定义，root则是最上层目录的定义。
> - 还有一个重要的区别是alias后面必须要用“/”结束，否则会找不到文件的。。。而root则可有可无
>
> `expries`定义：
>
> > 是给一个资源设定一个过期时间，也就是说无需去服务端做认证，直接通过浏览器自身确认是否过期即可
> >
> > 所以不会产生额外的流量
> >
> > 此种方法非常适合不经常变动的静态资源（如果经常更新一个文件，则不推荐用expries来缓存）
> >
> > 语法：
> > expires times
> > times 可以是：
> >
> > - 2s 2秒
> > - 2m 2分钟
> > - 2h 2小时
> > - 2d 2天
> > - -1 不缓存，用于过期
> > - 0  比-1更好用 立刻过期
> >
> > max ：31 December2037 23:59:59GMT

访问根路径

![image-20211230213847818](/images/SpringBoot/07-Nginx/image-20211230213847818.png)

访问static

![image-20211230213902858](/images/SpringBoot/07-Nginx/image-20211230213902858.png)

访问static路径下的资源

![image-20211230214230070](/images/SpringBoot/07-Nginx/image-20211230214230070.png)

## Nginx 集群

没错 这玩意也有集群..

![image-20211230214648202](/images/SpringBoot/07-Nginx/image-20211230214648202.png)

草 真就万物都可集群…绝了

Nginx的大概长这样

![image-20211230215018345](/images/SpringBoot/07-Nginx/image-20211230215018345.png)

然后需要一个额外的东西-KeepAlived来实现

![image-20211230215330918](/images/SpringBoot/07-Nginx/image-20211230215330918.png)

这里就不说了 实际上这玩意非常稳 很少用到集群（除非托大的project）

详细使用看这个视频<https://www.bilibili.com/video/BV1zJ411w7SV?p=15&spm_id_from=pageDriver>

不过据说实际项目中一般都不会用这种方式来配置 而是用另一个玩意：`lvs`来配置

## Nginx原理简单说明

稍微具体一点的原理可以看这个视频<https://www.bilibili.com/video/BV1zJ411w7SV?p=17&spm_id_from=pageDriver>

就客户是骨头

worker是狗

master进程是狗狗管理员即可

![image-20211230222442992](/images/SpringBoot/07-Nginx/image-20211230222442992.png)

![image-20211230222725945](/images/SpringBoot/07-Nginx/image-20211230222725945.png)
