---
title: 16-Nginx-进阶
date: 2022-1-20 15:00:30
category: 分布式-微服务
tag:
- Nginx
---

## 概述

之前nginx并不是学习的特别的深入，这里深入了解下

## Nginx的变量一览

这里过一遍就好了，以后有需要的时候回来查

官方变量<http://nginx.org/en/docs/varindex.html>

### 和Request有关的变量

> `$arg_name`

请求行中，名称为*name*的参数的值。

比如，当请求行是`GET /nginx/varindex/?from=rss HTTP/1.1`时，`$arg_from`的值是"rss"

当请求行中没有名称为*name*的参数时，`$arg_name`的值是空字符串

> `$is_args`

如果请求行中包含参数，那么`$is_args`的值是"?"，否则是空字符串

> `$args、$query_string`

请求行中的全部参数（也就是查询字符串）。

比如，当请求行是`GET /nginx/varindex/?a=b&c=d HTTP/1.1`时，`$args`的值是**a=b&c=d**

当请求行中没有任何参数时，`$args`的值是空字符串

> `$cookie_name`

名称为*name*的cookie的值

> `$request`

完整的原始的请求行

比如`"GET /b/../a?a=b HTTP/1.1`（uri不会被规范化）

> `$http_name`

用来获取任意请求头的值。
HTTP header的命名方式是：

每个单词的首字母大写，其余字母小写，单词之间用中划线（"-"）连接

比如，User-Agent、Content-Type、`X-Forwarded-For`等
请求头名称和name之间的转换方式是

将请求头名称转换成小写形式，并将中划线（"-"）替换成下划线（"_"）

- 比如：`$http_x_forwarded_for`

> `$request_length`

请求的长度，包含请求行、请求头和请求体

> `$request_method`

请求方法，比如GET或POST

> `$request_uri`

完整的原始的URI（带参数）

> `$scheme`

请求模式，http或https

> `$content_length`

"Content-Length"请求头的值

> `$content_type`

"Content-Type"请求头的值

> `$document_root`

应用于当前请求的root或alias指令的值

> `$document_uri`、`$uri`

**规范化后的URI。所谓的规范化是指：将 以"%XX"形式编码的文本进行解码 之后，解决对相对地址"."和".."的引用，并将多个相邻的"/"压缩成一个。
请求处理期间，$uri的值可能发生改变，比如在发生内部重定向或者使用index文件的时候**

> `$host`

Nginx按照下面的优先级顺序，设置`$host`的值：

- 从请求行中获取到的主机名
- 从"Host"请求头中获取到的主机名
- 处理请求的虚拟主机的名称

一般情况下，请求行中只会包含 Request URI ，也就是 URI 和 QUERY STRING ，不会包含 host name。但是，当使用Nginx做HTTP正向代理服务器的时候，请求行中会包含host name

> `$proxy_add_x_fowarded_for`

在客户端传递来的X-Forwarded-For请求头后面追加`$remote_addr`（用逗号分隔）

如果客户端没有传递X-Forwarded-For请求头，那么该变量等于`$remote_addr`

- 比如，客户端传递来的XFF请求头是：
  - `192.168.1.1, 192.168.1.2`
  - `$remote_addr`是192.168.1.3
- 那么$proxy_add_x_forwarded_for等于`192.168.1.1,192.168.1.2,192.168.1.3`

> `$realpath_root`

应用于当前请求的root或alias指令的值所对应的绝对路径，所有的符号连接都会被解析成真实路径

> `$server_protocol`

请求协议，通常是"HTTP/1.0"、"HTTP/1.1"、"HTTP/2.0"

> `$request_filename`

当前请求对应的资源的路径。
该变量的值是基于root（或alias）指令的值，以及请求的URI计算出来的。比如，当root指令的值是/data/w3，URI是/images/logo.jpg时，该变量等于/data/w3/images/logo.jpg

### 和Response的相关变量

> `$body_bytes_sent`

下发给客户端的字节数（不包含响应头）

> `$request_time`

从 接收到请求的第一个字节 到 把响应的最后一个字节发送给客户端，所经历的时间。单位是秒，精确到毫秒

> `$send_http_*name*`

用于获取下发给客户端的任意响应头的值。响应头名称和*name*之间的转换方式是：将响应头名称转换成小写形式，并将中划线（"-"）替换成下划线（"_"）

> `$status`

下发给客户端的响应码

### 常用变量

> `$binary_remote_addr`

二进制形式的客户端地址。对于IPV4地址，该值的长度是4字节，对于IPV6地址该值的长度是16字节

> `$connection`

连接的序号

> `$connection_requests`

在开启keepalive的情况下，客户端可以使用一条连接发起多个请求，该变量用于记录通过一条连接发起的请求数

> `$date_local`

本地时区的当前时间

> `$date_gmt`

GMT格式的当前时间

> `$hostname`

运行Nginx的主机的主机名，比如：vm016_centos

> `$msec`

当前的时间戳，精确到毫秒。比如，1551609371.088

> `$nginx_version`

Nginx的版本号

> `$pid`

Worker进程的PID

> `$proxy_host`

在proxy_pass指令中指定的被代理服务的名称（可能是upstream的名称）

> `$proxy_port`

在proxy_pass指令中指定的被代理服务的端口。如果在proxy_pass指令中未指定端口，那么该变量等于协议的默认端口

> `$remote_addr`

客户端地址

> `$remote_port`

客户端端口

> `$remote_user`

在开启basic authentication的时候，客户端所使用的用户名

> `$server_addr`

接收请求的虚拟主机的地址

> `$server_port`

接收请求的虚拟主机的端口

> `$server_name`

接收请求的虚拟主机的名称

> `$time_iso8601`

ISO 8601标准格式的本地时间

> `$time_local`

通用日志格式的本地时间

### 与upstream相关的变量

> `$upstream_addr`

保存upstream server的ip地址和端口，或Unix套接字的路径。

在请求处理期间，如果请求被代理到多个upstream server，那么它们的地址之间用","分隔

比如："192.168.1.1:80, 192.168.1.2:80, unix:/tmp/sock"。

当发生（由error_page等发起的）从一个server group到另外一个server group的内部重定向时，不同的server group之间用":"分隔，比如："192.168.1.1:80, 192.168.1.2:80, unix:/tmp/sock : 192.168.10.1:80, 192.168.10.2:80"。

如果server group中没有可用的server，那么该变量的值是server group的名字

> `$upstream_bytes_received`

从upstream server接收到的字节数。来自于多个连接的值，像$upstream_addr中的地址一样，用","和":"分隔

> `$upstream_bytes_sent`
> （Nginx 1.15.8 起 可用）
> 发送到upstream server的字节数。来自多个连接的值，像$upstream_addr中的地址一样，用","和":"分隔

> `$upstream_cache_status`

该变量用来显示缓存的使用情况。其值是：

- HIT：命中缓存
- MISS：未命中缓存
- EXPIRED：缓存已过期
- BYPASS：客户端强制不使用缓存
- STALE：使用了过期的缓存。可以通过proxy_cache_use_stale指令，指定在什么情况下，使用过期的缓存，比如http_502、error、timeout等
- UPDATING：缓存正在更新
- REVALIDATE：缓存重新生效
  - 在启用客户端缓存的情况下，服务端可以通过以下两种方式，来判断客户端的缓存是否失效：
  - ETag响应头 和 If-None-Match请求头
  - Last-Modified响应头 和 If-Modified-Since请求头
  - 当客户端访问一个URL的时候，如果客户端没有缓存或缓存失效，那么服务端会下发资源，以及Last-Modified（资源的最后修改时间）和ETag（Entity Tag，服务端计算的资源指纹，当资源发生改变时，ETag也会改变）响应头。
  - 以后，客户端再访问该URL时，会带上If-Modified-Since和If-None-Match请求头。其中，If-Modified-Since的值是上次返回的响应中的Last-Modified头的值，If-None-Match的值是上次返回的响应中的ETag头的值。
- 下面是Nginx的处理流程，与别的文档的描述不同，Nginx的相关源码在：github，Mozilla的说明在：MDN
  - 如果存在IMS请求头，并且IMS的值小于资源的最后修改时间，那么返回200，以及新的ETag和Last-Modified
  - 如果存在INM请求头，并且资源的ETag值与INM的值不匹配，那么返回200，以及新的Etag和Last-Modified，否则，认为资源未被修改，返回304，以及空的响应体

当开启`proxy_cache_revalidate`时，Nginx会通过If-Modified-Since和If-None-Match请求头，来使过期的缓存条目重新生效

> `$upstream_connect_time`

建立到upstream server的连接所花费的时间。单位是秒，精确到毫秒。对于SSL连接，该时间也包含SSL握手所花费的时间。建立多个连接所花费的时间之间，像$upstream_addr中的地址一样，用","和":"分隔

> `$upstream_cookie_name`

upstream server返回的"Set-Cookie"响应头中的，名称name的cookie的值。只有最后一个server返回的响应中的cookie会被保存

> `$upstream_header_time`

从upstream server接收响应头所花费的时间。单位是秒，精确到毫秒。多个响应所花费的时间之间，像$upstream_addr中的地址一样，用","和":"分隔

> `$upstream_http_name`

用于获取upstream server返回的任意响应头的值。
响应头名称和name之间的转换方式是：将响应头名称转换成小写形式，并将中划线替换成下划线。
只有最后一个server的响应头会被保存

> `$upstream_response_length`

保存从upstream server获取到的响应的长度。单位是字节。多个响应的长度之间，像$upstream_addr中的地址一样，用","和":"分隔

> `$upstream_response_time`

保存从upstream server接收响应所花费的时间。单位是秒，精确到毫秒。多个响应所花费的时间之间，像$upstream_addr中的地址一样，用","和":"分隔

> `$upstream_status`

保存从upstream server获取到的响应的状态码。多个响应的状态码之间，像$upstream_addr中的地址一样，用","和":"分隔

## 配置文件初步解读

```nginx
# user-运行的用户，可以指定是哪个用户来运行，默认是当前用户（nobody），一般情况下不动
#user  nobody;

# 这个是程序的进程数量，默认是1，可以改成和服务器CPU数量一致 或者auto 这个根据心情来决定，docker内貌似默认是auto来着
# 但是服务器上如果还有别的中间件在运行的话，例如还有一个tomcat，就可以设置为n-1
worker_processes  1;

# 日志的存放路径，这里是错误日志的存放路径
#error_log  logs/error.log;
# notice是日志的级别，可以设置为debug，info，notice，warn，error，crit
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

# debug，info，notice，warn，error，crit
# 上述级别中，debug是最低的，crit是最严重的


#pid        logs/nginx.pid;


events {
    # 每个进程最多处理的请求数量，默认是1024，通常情况下都会改成一到两万左右 不建议改更高
    worker_connections  10240;
}

# http的设置
http {
    # 导入一个文件
    # 这个mine.type里面包含了所有的文件类型（http的数据类型，例如application/json等）
    include       mime.types;
    # 默认的文件类型，如果没有设置，默认是text/html
    default_type  application/octet-stream;

    # 这里主要是对日志的格式做一个配置，默认就是如下内容，如果想要自定义的话吧注释放开然后自己变动即可
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';



    # 这里是用户请求的日志存放路径，也就是有用户访问的时候，控制台上的内容对应的文件
    #access_log  logs/access.log  main;

    # 这个是用于进行文件的高效传输，不变动即可
    sendfile        on;

    # 当我们的数据包累计到一定的大小之后再进行发送，如果要启动的话，sendfile也得抱枕是on状态
    # 反正开启后能提高传输的效率
    #tcp_nopush     on;

    # 在和客户端完成通讯之后保持多长时间的连接，0的话就是用不超时（一直保持连接），可以设定为秒数，默认是65s
    #keepalive_timeout  0;
    keepalive_timeout  65;

    # 是否开启gzip压缩，开启了之后，js、css、html之类的传输的数据都会进行压缩，让体积变小，从而让传输效率更快，并解约服务器带宽
    # 对应的，开启了压缩后，会消耗一定的服务器的性能，这个自行斟酌
    # 当然 实际生产环境的时候，都会开启
    gzip  on;
    

    
    
    # server的配置，代表这是一个服务，一个http块中能够包含多个服务
    server {
        # 监听的端口号
        listen       80;
        listen       [::]:80 ;

        # 服务名称 可以配置一个ip 或者一个域名
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # 访问对应路径返回的内容
        location / {
            root   html;
            index  index.html index.htm;
        }

        # 当发生页面不存在（404）错误的时候，返回哪些内容给客户端，可以自行配置，可以是html、json、xml等
        # 注意 最后面的 /404.html 是一个规则名 详情看下面的
        #error_page  404              /404.html;

        # 发生错误的时候（指定多个），返回哪些页面给客户端
        error_page   500 502 503 504  /50x.html;
        
        # 规则名，访问/50x.html的时候，返回的内容
        location = /50x.html {
            root   html;
        }

    }

}
```

## Nginx常用命令

> 启动

```bash
nginx
```

> 关闭，关闭之前会处理完已经连接的用户的请求(HTTP，其他请求都会直接ban)

```bash
nginx -s quit
```

> 不优雅的关闭 会立刻关闭和所有用户的连接

```bash
nginx -s stop
```

> 平滑的重启

```bash
nginx -s reload
```

> 检查自己的配置文件是否有误

```bash
nginx -t
# 如果有错误的话，会打印出来 没有错误的话 会打印success之类的
```

> 启动的时候指定配置文件的路径

```bash
nginx -c /abc/aaa/aaa/nginx.conf
```

## Nginx-日志切割

我们在使用nginx的时候，日志默认是保存在一个文件夹内的，这样日积月累起来，之后查看日志会非常的不方便，并且也不易维护

### 手动

创建一个sh脚本，`logback.sh`

```bash
#!/bin/bash

# 指定日志和切割后日志备份的目录
YEAR=$(date +%Y)
MONTH=$(date +%m)
DAY=$(date +%d)
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d)
# 这里第一个填写你的nginx日志路径
LOGS_PATH=/var/log/nginx
# 这里填写想把日志存放在那个路径
LOGS_BAK_PATH=/var/log/nginx/back

# 得到1级目录名
if [[ $(($DAY)) -eq 1 ]]
  then
    if [[ $(($MONTH)) -eq 1 ]]
      then
        LOGS_BAK_PATH=$LOGS_BAK_PATH/$((${YEAR}-1))-12
    else
      if [[ $(($MONTH)) -gt 10 ]]
        then
          LOGS_BAK_PATH=$LOGS_BAK_PATH/${YEAR}-$((${MONTH}-1))
      else
          LOGS_BAK_PATH=$LOGS_BAK_PATH/${YEAR}-0$((${MONTH}-1))
      fi
    fi
else
    LOGS_BAK_PATH=$LOGS_BAK_PATH/${YEAR}-${MONTH}
fi

# 创建目录
mkdir -p $LOGS_BAK_PATH/${YESTERDAY}

# 复制当前的日志文件到备份的目录
cp ${LOGS_PATH}/access.log ${LOGS_BAK_PATH}/${YESTERDAY}/access_${YESTERDAY}.log
cp ${LOGS_PATH}/admin_access.log ${LOGS_BAK_PATH}/${YESTERDAY}/admin_access_${YESTERDAY}.log
cp ${LOGS_PATH}/error.log ${LOGS_BAK_PATH}/${YESTERDAY}/error_${YESTERDAY}.log

# 清空日志
> ${LOGS_PATH}/access.log
> ${LOGS_PATH}/admin_access.log
> ${LOGS_PATH}/error.log
```

然后把这个玩意添加下可执行

```bash
chmod +x loback.sh
```

然后执行即可

### 定时

编辑下文件`vi /etc/crontab`

添加定时任务

```bash
# 每天0:00执行该脚本
0 0 * * * root bash /opt/sh/logback.sh
```

重启crontab

```bash
systemctl restart crond
```

至于docker的话…以后遇上了再查吧 打个TODO

## 配置静态资源访问

### 基本配置

在server里面配置下即可

```nginx
server {
    listen    90;
    server_name localhost;
    
    # 根路径 这个没必要多说啥
    location / {
        # 这里配置绝对路径即可
        root /home/project/xxxxproject;
        index index.html;
    }
    
    # 下面这里额外说明 这里如果请求 http://ip:port/images/abc.jpg
    # 访问的是 /home/project/images里面的内容 也就是
    # 			/home/project/images/abc.jpg
   	# 在举个例子，例如访问的是 ip:port/images/video/1.mp4
    # 则对应的本地文件为： /home/project/images/video/1.mp4
    # 在使用这种方式匹配的时候，必须得确保，这个/images必须是在/home/project内的，不然匹配不到
    location /images {
        root /home/project;
    }
    
    # 当然 上面这样做的话，我们就必须确保images在project文件夹内
    #那么是否可以给他起个别名呢？
    # 例如访问 /abc 则为 /home/project/images,则可以通过另一种形式来进行配置
    
    # 当用户访问/static之后，所有的内容都会在/home/project这个路径之后去找
    # 例如访问 /static/1.jpg 则等同于访问 /home/project/1.jpg
    location /static {
        alias /home/project;
    }
    
}
```

保存并重启即可

```bash
nginx -s reload
```

## Gzip的压缩配置

更新详细都可以看[这篇文章](https://blog.csdn.net/jessonlv/article/details/8016284)

```nginx

http {

    # 是否开启gzip压缩
    gzip  on;
    
    # 限制最小压缩 下面这样小于1024个字节(1kb)的文件就不会压缩了
    gzip_min_length 1024;
    
    # 这个是设置压缩比例（级别）值越大，压缩比例也就越大，最终产生的文件理论上来说就越小
    # 当然 设置的太大的话会额外占用CPU，一般设置为3~5左右就差不多了
    gzip_comp_level 3;
    
    # 要对哪些类型进行压缩 用空格进行分割 通常来说网站上可能有啥内容有填啥内容
    gzip_types  text/plain application/x-javascript text/css text/html application/xml;
    
    # 识别http的协议版本。由于早期的一些浏览器或者http客户端，可能不支持gzip自解压，用户就会看到乱码，所以做一些判断还是有必要的。
    # 注：21世纪都来了，现在除了类似于百度的蜘蛛之类的东西不支持自解压（百度就是SX，我就不说了），99.99%的浏览器基本上都支持gzip解压了
    # 默认是1.1 一般不动
    gzip_http_version 1.1;
    
    #这个下面说
    gzip_proxied any;

} 
```

> gzip_proxied

Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果，匹配的前提是后端服务器必须要返回包含"Via"的 header头。

- off - 关闭所有的代理结果数据的压缩
- expired - 启用压缩，如果header头中包含 "Expires" 头信息
- no-cache - 启用压缩，如果header头中包含 "Cache-Control:no-cache" 头信息
- no-store - 启用压缩，如果header头中包含 "Cache-Control:no-store" 头信息
- private - 启用压缩，如果header头中包含 "Cache-Control:private" 头信息
- no_last_modified - 启用压缩,如果header头中不包含 "Last-Modified" 头信息
- no_etag - 启用压缩 ,如果header头中不包含 "ETag" 头信息
- auth - 启用压缩 , 如果header头中包含 "Authorization" 头信息
- any - 无条件启用压缩

## Location匹配规则说明

### 规则一览

![image-20220120174953645](/images/SpringCloud/16-Nginx-进阶/image-20220120174953645.png)

### 普通匹配

```nginx
server {
	#.....
    
    # 这样就是普通匹配，你访问斜杠相当于访问/home/project
    # 访问斜杆中的内容，就相当于访问/home/project中的资源
    location / {
        root   /home/project；
    }
}
```

### 精准匹配

```nginx
server {
	#.....
    
    # 精准匹配 只有请求路径完全符合我们的规则（规则必须设定为固定的内容）
    # 如下所示，我只有访问/static/img/face1.png
    # 才等同于访问 /home/project/img/face1.png
    # 如果我访问  /static/img/face2.png 那么这里因为没有注册过对应的location，所以是访问不了的
    location = /static/img/face1.png {
        root   /home/project；
    }
}
```

### 正则表达式匹配

```nginx
server {
	#.....
    
    # 正则表达式匹配以 ~ 波浪号开头
    # 正则表达式，*号代表不区分大小写的来进行匹配
    
    # 下面这样 例如我的/home/static文件夹下有一个 aaa.jpg
    # 则我可以通过 /static/AAA.jpg 可以访问到
 	
    # 如果你把下面这个*号去掉，则不支持不区分大小写来进行访问
    location ~* \.(gif|jpg|bmp|png|jpeg) {
        root   /home；
    }
}
```

详细的正则规则可以参考[这篇文章](https://www.cnblogs.com/whm-blog/p/13273503.html)

### 限制以某个字符路径开头请求（指定路径匹配）

```nginx
server {
	#.....
    
    # 这里相当于是
    # 必须得请求 /static/img才能匹配到 /home/static/img下的资源
    # 如果说想请求 static下img文件夹之外的资源会被拒绝
    # 相当于是必须得完全匹配我们制定的路径
    location ^~ /static/img {
        root   /home；
    }
}
```

## 配置Cors跨域

详细的可以看[这篇文章](https://blog.csdn.net/yujia_666/article/details/108490178)

正常来说，只要把下面的东西复制粘贴即可 不用深究

```nginx
server {

    listen       80;
    listen       [::]:80 ;

	# 反正这样配置就得了...具体原理不用太在意，可以单独放在location里面
    
    # 允许跨域的请求，*代表所有
    add_header Access-Control-Allow-Origin *;
    
    # 允许带上cookie请求
    add_header Access-Control-Allow-Credentials 'true';
    
    # 运行请求的方法，逗号分隔，例如这样写 ： 'GET,POST,OPTIONS,PUT,DELETE'
    # 也可以直接用通配符进行啥请求都运行跨域
    add_header Access-Control-Allow-Methods '*';
    
    # 运行请求的header， 下面也可以用通配符进行替换
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    location / {  
        root /home;
    } 
}
```

## 配置防盗链

参考文章<https://www.cnblogs.com/imcati/p/11743922.html>

简单来说，就是防止我们网站上的资源，被其他网站之类的拿去用了 

防止第三方引用链接访问我们的图片，消耗服务器资源和网络流量，我们可以在服务器上做防盗链限制。

```nginx
server {

    listen       80;
    listen       [::]:80 ;
    server_name www.myserver.com;
    
    # 对于源站点进行验证
    valid_refers *.myserver.com;
    
    # 如果请求不是来自上方的站点，则下方判断条件为真
    if($invalid_referer){
        // 返回404页面
        return 404;
    }

    location / {  
        root /home;
    } 
}
```

当然 也可以选择另一种配置方式

```nginx
server {
    
   listen 80;
    
   server_name www.imcati.com refer-test.imcati.com;
    
   root /usr/share/nginx/html;
    
    
   location ~*\.(gif|jpg|jpeg|png|bmp|swf)$ {
        
        valid_referers none blocked www.imcati.com;
        
        if ($invalid_referer) {
            return 403;
           }
      }
   }

#valid_referers: 指定资源访问是通过以下几种方式为合法，即白名单。
#none：允许缺失的头部访问。
#blocked：允许referer没有对应值的请求。
#server_names：若referer站点域名与server_name中本机配的域名一样允许访问。

```

## Nginx的模块化体系

![image-20220120183653791](/images/SpringCloud/16-Nginx-进阶/image-20220120183653791.png)

- nginx core：核心模块，底层的通信协议之类的，并且给其他模块之类的提供了运行时的环境
- http 核心模块的副本
- mail 邮件相关
- event module 事件模块，在操作系统层面的处理机制
- phase handler 用于处理客户端的一些请求，并负责响应内容的响应
- output file过滤器，过滤掉一部分的内容（例如gzip就属于它），把内容再返回到浏览器
- upstream  反向代理模块，会把真正的请求转发到真正的服务器里去响应真实的内容
- load balancer 负载均衡 可以实现集群之类的配置 以及实现了一些负载均衡的算法
- extend module 继承模块，如果要使用第三方的模块，就会使用到它

## 负载均衡反向代理的搭建

### 基本搭建-带有真实ip转发

例如三个tomcat，分别是8001 8002 8003

使用的话这样即可

 ```nginx
 server {
 
     listen       80;
     listen       [::]:80 ;
     server_name  localhost;
 
     upstream myserver {
         server localhost:8081;
         server localhost:8082;
         server localhost:8083;
     }
 	
     # 下面这里是在将请求发送给服务器的时候，将客户端的真实ip信息之类的也一并转发过去
     proxy_set_header Host $host;
 	proxy_set_header X-Real-IP $remote_addr;
 	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     # 这个和
     
     
     location / {
         proxy_pass http://myserver;
     }
 
 }
 ```

当然你的upstream也可以放在它的外面--也就是http里面（一般来说都是放到http里面）

那个proxy看情况，也能放在外面

默认的负载均衡是轮循机制

如果要改成按照权重的话

```nginx
server {
    # 监听的端口号
    listen 80;
    listen [::]:80 ;
    server_name localhost;

    upstream myserver {
        # 通过weight来设置权重 weight默认全都是1
        server localhost:8081 weight=1;
        server localhost:8082 weight=3;
        server localhost:8083 weight=5;
    }

    location / {
        proxy_pass http://myserver;
    }

       
}
```

### upstream的参数

> 针对单个链接

```nginx
upstream myserver {
    server localhost:8081 weight=1 max_conns=2;
    server localhost:8082 weight=3 slow_start=60s;
    server localhost:8083 weight=5 down;
    server localhost:8084 weight=7 backup;
    server localhost:8085 weight=9 max_fails=2 fail_timeout=15s;
}

```

- max_conns：设置这个机子的最大同时连接数（默认是0，没有上限，不是QPS，类似于线程），注意 如果说设置了线程数量并且大于1的话，则计算规则为：这里设置的值*线程数量，如果超过了这个数量的话，就返回502
- slow_start：就像是那啥sentinel的预热一样，不让请求一次性冲跨服务器
  - 参数是时间如果说设置了这个项，则必须要配合上weight来配合使用，最少要配合两个或者两个以上的服务器(server)才能配合这玩意来使用
  - 上方案例中配置的是60秒钟之内，权重会慢慢的从0提升到3

- down：标识这台服务器是不可用的（也就是说会排除在负载均衡之外，无论用户咋样都访问不到），可以用于预防某些特殊情况
- backup：标识这台服务器是一个备用机，当其他的服务都是可访问的状态的时候，访问不到这台，其他服务器挂掉了之后，才能被用户访问到
- max_files和fail_timeout：这个就是熔断
  - max_files设置错误次数
  - fail_timeout设置时间
  - 当在fail_timeout的指定时间内，错误次数达到了max_files次数之后，nginx将不会将请求发送到这台服务器上，时间为fail_timeout设定的时间
  - 例如 次数我设置成了2次，时间我设置成了15秒，则在15秒内，错误次数达到了两次，则nginx将会从第二次错误开始计数，15秒内将不会有任何连接到达这台服务器


### Keepalive

keepalive，保持和服务器的长连接数量

嘛大意就是，保持跟服务的连接，减少频繁断开的次数，提高吞吐量，固定的设置方式

```nginx
server {
    # 监听的端口号
    listen 80;
    listen [::]:80 ;
    server_name localhost;

    upstream myserver {
        server localhost:8081 ;
        server localhost:8082 ;
        server localhost:8083;
        # 1. 设置长连接是数量，
        keepalive 32;
    }

    location / {
        proxy_pass http://myserver;
        
        # 2. 下面这里也是固定的配置 http要设置成1.1发送给我们的tomcat服务器
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}
```

### 负载均衡-ip_hash

嘛，就是根据用户的ip来动态分配服务器，也就是说当用户第一次连接之后，后面每次连接都是到同一个服务器上

![image-20220120204553430](/images/SpringCloud/16-Nginx-进阶/image-20220120204553430-16426827540471.png)

算法如下

![image-20220120204737403](/images/SpringCloud/16-Nginx-进阶/image-20220120204737403.png)

使用如下

```nginx {13}
server {
    # 监听的端口号
    listen 80;
    listen [::]:80 ;

    # 服务名称 可以配置一个ip 或者一个域名
    server_name localhost;

    upstream myserver {
        server localhost:8081 ;
        server localhost:8082 ;
        server localhost:8083 ;
        ip_hash;
    }

    location / {
        proxy_pass http://myserver;
    }

}
```

注意 这玩意不能和权重共存

并且要注意一点，如果在使用的时候，有一台服务器down了，不要把他删除，而是要标记为down

官方文档如此说道

![image-20220120211041639](/images/SpringCloud/16-Nginx-进阶/image-20220120211041639.png)

### 通过访问的URI进行负载均衡

```nginx {13}
server {
    # 监听的端口号
    listen 80;
    listen [::]:80 ;

    # 服务名称 可以配置一个ip 或者一个域名
    server_name localhost;

    upstream myserver {
        server localhost:8081 ;
        server localhost:8082 ;
        server localhost:8083 ;
        hash $request_uri;
    }

    location / {
        proxy_pass http://myserver;
    }

}
```

这个用的比较少…也不太建议使用

### 最少的连接数优先进行负载均衡

如其名，来的请求优先去连接数较少的那个服务

```nginx {13}
server {
    # 监听的端口号
    listen 80;
    listen [::]:80 ;

    # 服务名称 可以配置一个ip 或者一个域名
    server_name localhost;

    upstream myserver {
        server localhost:8081 ;
        server localhost:8082 ;
        server localhost:8083 ;
        least_conn;
    }

    location / {
        proxy_pass http://myserver;
    }

}
```

## 缓存

### 静态资源缓存

非常简单 ，两种配置方式

```nginx {11-16,22-23}
server {
    listen 80;
    listen [::]:80 ;
    server_name localhost;



    location /static {
        alias /home/imooc;

        # 规定时间来进行配置，例如
        #	10s 	就是10秒 
        # 	10m		就是10分钟 
        #	10h		就是10个小时 
        #	10d		就是10天
        exprires 10s; 
    }

    location /static2 {
        alias /home/imooc2222;

        # 指定过期时间为今天的22点30分，如果用户过了这个时间再来访问的话，就是明天的22点30分
        exprires @22h30m;
        # expires -1h; 立刻过期
        # expires epoch; 不让客户端缓存（将过期时间设置为1970年）
        # expires off; 默认的 nginx不缓存内容，让客户端自行处理
    }



}
```

### 反向代理的缓存

这个一般比较少配置。。应该

![image-20220120220118212](/images/SpringCloud/16-Nginx-进阶/image-20220120220118212.png)

这个只针对server的静态资源有效

```nginx
http {

    # 设置缓存保存的目录
    # 第一个 设置换成保存的路径
    # 第二个 keyzone 设置名字，:5m 设置缓存占用的空间大小(内存)
    # 第三个 max_size 设置缓存的文件大小
    # 第四个 inactive 缓存清空的时间，也就是每隔多少时间清空一次缓存
    # 第五个 use_temp_path 是否开启临时目录 一般都会关掉
    proxy_cache_path 
        /usr/local/nginx/upstreamCache
        keys_zone=mycache:5m
        max_size=1g
        inactive=1m
        use_temp_path=off
        ;

    server {
        # 监听的端口号
        listen 80;
        listen [::]:80 ;

        # 服务名称 可以配置一个ip 或者一个域名
        server_name localhost;

        upstream myserver {
            server localhost:8081 ;
            server localhost:8082 ;
            server localhost:8083 ;
        }

        # 开启并且使用缓存
        proxy_cache mycache;
        
        # 针对200和304状态码的缓存设置过期时间
        proxy_cache_valid 200 304 8h;
        
        location / {
            proxy_pass http://myserver;
        }

    }
}
```

## 关于HTTPS证书的配置

因为我目前还没有整域名，所以说没得教程

以后如果用上了可以参照[这篇博客](https://blog.csdn.net/weixin_43909881/article/details/105635737)

## Nginx集群

### Keepalived双机主备

![image-20220120224852192](/images/SpringCloud/16-Nginx-进阶/image-20220120224852192.png)

大概就是这样

![image-20220120225014639](/images/SpringCloud/16-Nginx-进阶/image-20220120225014639.png)

这里安装我使用docker-compose了

PS：因为懒得上服务器，所以我这里用了[Docker Desktop](https://www.docker.com/products/docker-desktop)

