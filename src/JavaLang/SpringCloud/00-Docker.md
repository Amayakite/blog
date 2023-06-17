---
title: 00-Docker
date: 2022-1-4 15:17:00
category: 分布式-微服务
tag:
- Docker
---

## 概述

具体的不多说了…反正有这玩意我们无论是学习之后的东西，还是干别的事情，都很方便

别TM以为自己回一个 docker run 就会docker了

### Docker为什么会出现

一款产品：开发===>上线 两套环境：应用环境，应用配置

我在我的电脑上可以运行，但是因为版本更新之类的，导致服务不可用

配置环境是非常麻烦的一件事情，每个机器都要部署Redis、Mysql之类的环境，直接整非常痛苦

发布一个项目（Jar+Redis、Mysql、Rs）项目都不能带上环境打包

之前配置一个Redis、mysql、Es都比较痛苦了，不能跨平台

传统：开发jar，运维来做这些操作

现在：一个人，从头到尾

Docker给以上的问题，提出了解决方案

就像是app一样

- APK=>发布=>张三下载apk，安装即可
- jar（环境）=>打包项目带上环境（镜像）=>发布到（docker仓库、商店）=>下载我们发布的镜像，直接运行即可

这样说吧，Docker也可以做集群，也可以做Docker集群（这涉及到的东西蛮多，有专门的东西来着，貌似现在K8S非常牛逼，等我开始工作了之后得取了解下K8s）

docker实质是轻量化的虚拟机(就像是VMware之类的，但是那些玩意非常大，非常痛苦)，创建一个空白虚拟机几秒就可以完成

在几年前，一般说到搭环境，首先想到的就是….虚拟机，奈何电脑不允许，开多一丢丢就非常痛苦了

Docker是基于Golang开发的，依赖于Golang天生的高并发，非常牛逼

Docker[官方文档](https://docs.docker.com/)非常的清晰 很容易就能上手使用

> DevOps(开发。运维)

应用更快速的交付和部署

传统：一堆帮助文档，安装程序

Docker：打包镜像发布测试，一键运行

更便捷的升级和扩容：使用了Docker之后，我们的部署应用就跟搭积木一样

### Docker的基本组成

![image-20220104155005672](/images/Java/SpringCloud/00-Docker/image-20220104155005672.png)

大概就是这样 嘛反正非常简单就是了，直到DockerFile之前Docker的操作就是非常简单的

反正Docker就三个东西

- 镜像（Image）
  - Docker镜像就好比是一个模板，可以通过这个模板来创建容器服务（tomcat镜像==>run===>tomcat01容器），可以通过这个镜像创建多个容器
- 容器（container）
  - Docker利用容器技术，独立运行或一组应用，通过镜像来创建
  - 启动、停止、基本命令
  - 目前就可以把这个容器理解成一个简单的linux系统
- 仓库（repository）
  - 仓库就是存放镜像的地方
  - 仓库分为共有和私有仓库
    - Docker Hub 官方
    - 国内 阿里云之类的都有容器服务器

## 安装和使用Docker

### 安装和卸载

非常简单 不用管原理

自动安装，二选一，两个都可以安装docker

个人推荐是一键安装

注意 安装之前 要sudo su 获取下root权限

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# 或者
curl -sSL https://get.daocloud.io/docker | sh
```

效果都是一样的

如果说之前安装过了，想要卸载的话

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

手动安装的话，步骤稍微有点复杂

```shell
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/ \
  $(lsb_release -cs) \
  stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

测试docker是否安装成功

```bash
sudo docker run hello-world
```

出现这样的即可

![image-20220104160301590](/images/Java/SpringCloud/00-Docker/image-20220104160301590.png)

### 更换国内源（可选）

需要sudo权限

```bash
sudo vi /etc/docker/daemon.json
```

填入如下内容

```json
{
    "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
```

然后重启即可

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

这里可以支持的有

Docker中国官方

`https://registry.docker-cn.com`

网易

`http://hub-mirror.c.163.com`

中科大

`https://docker.mirrors.ustc.edu.cn`

阿里云

`https://{your_id}.mirror.aliyuncs.com`

腾讯云

`https://mirror.ccs.tencentyun.com`

daocloud

`http://{your_id}.m.daocloud.io`

一般来说 用网易的或者阿里或者中科大都可

阿里云申请教程
<https://cr.console.aliyun.com/>
点进去之后，有一个镜像工具，点进去之后，有一个镜像加速器，里面有大概类似于这样一个地址

<https://1234abcd.mirror.aliyuncs.com>

我的是`https://dvxjv1j7.mirror.aliyuncs.com`

### 非root用户使用docker

首先来个root用户 输入如下命令

```shell
#创建docker用户组 最新版本应该不用这一步了 直接下面的步骤即可
 sudo groupadd docker
 # 应用用户加入docker用户组
 sudo usermod -aG docker ${USER}
 # 重启docker服务
 sudo systemctl restart docker
 # 进入指定的user
 su - ${USER}
 # 测试
 docker run hello-world
```

![image-20220104163355780](/images/Java/SpringCloud/00-Docker/image-20220104163355780.png)



## Docker常用命令

### 帮助命令

```bash
docker version
docker info #显示docker的系统信息
docker xxx --help
```

官方文档cli[命令一览](https://docs.docker.com/engine/reference/run/)

### images查看image

```shell
docker images --help

## 结果
Usage:  docker images [OPTIONS] [REPOSITORY[:TAG]]

List images

Options:
  -a, --all             列出所有的镜像
      --digests         Show digests
  -f, --filter filter   Filter output based on conditions provided 过滤的
      --format string   Pretty-print images using a Go template 同上
      --no-trunc        Don't truncate output
  -q, --quiet           只显示镜像的id
 # 可以组合使用
 docker images -aq
 # 查看所有已经下载的镜像id
```

### search搜索image

网上搜索：<https://hub.docker.com/>左上搜索，请

```bash
docker search --help

# 结果
Usage:  docker search [OPTIONS] TERM

Search the Docker Hub for images

Options:
  -f, --filter filter   Filter output based on conditions provided 过滤
      --format string   Pretty-print search using a Go template 渲染
      --limit int       Max number of search results (default 25) 分页
      --no-trunc        Don't truncate output
      
 # 例子： 搜索start大于3000的mysql镜像
 docker search mysql --filter=STARS=3000
 
 # 结果：
NAME      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql     MySQL is a widely used, open-source relation…   11905     [OK]       
mariadb   MariaDB Server is a high performing open sou…   4556      [OK]   
```

### pull下载image

```bash
# 如果不指定版本，默认是下载最新的
docker pull mysql

# 可以指定版本 一定要在docker hub上找到的到的.. 例如mysql
# https://hub.docker.com/_/mysql?tab=tags
docekr pull mysql:5.7
```

### rmi删除image

```bash
docker rmi mysql
# 也可通过镜像id来删除
docker rmi 7ebbdadjakdjakdladad
# 可以同时删除多个
docker rmi mysql redis wordpress
# 当然 id也可以
docker rmi xxxx xxx xxx

# 还可以通过表达式来删除多个，例如删除全部
docker rmi -f ${docker images -aq}
```

## 常用命令

我们有了镜像才能创建容器

我们先来拉一个ubuntu镜像吧~

```bash
docker pull ubuntu
```

### run命令一览

只能说 docker最核心的地方就是这个了
命令相当多

```shell
docker run --help

# 结果

Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

Run a command in a new container

Options:
      --add-host list                  Add a custom host-to-IP mapping (host:ip)
  -a, --attach list                    Attach to STDIN, STDOUT or STDERR
      --blkio-weight uint16            Block IO (relative weight), between 10 and 1000, or 0 to disable (default 0)
      --blkio-weight-device list       Block IO weight (relative device weight) (default [])
      --cap-add list                   Add Linux capabilities
      --cap-drop list                  Drop Linux capabilities
      --cgroup-parent string           Optional parent cgroup for the container
      --cgroupns string                Cgroup namespace to use (host|private)
                                       'host':    Run the container in the Docker host's cgroup namespace
                                       'private': Run the container in its own private cgroup namespace
                                       '':        Use the cgroup namespace as configured by the
                                                  default-cgroupns-mode option on the daemon (default)
      --cidfile string                 Write the container ID to the file
      --cpu-period int                 Limit CPU CFS (Completely Fair Scheduler) period
      --cpu-quota int                  Limit CPU CFS (Completely Fair Scheduler) quota
      --cpu-rt-period int              Limit CPU real-time period in microseconds
      --cpu-rt-runtime int             Limit CPU real-time runtime in microseconds
  -c, --cpu-shares int                 CPU shares (relative weight)
      --cpus decimal                   Number of CPUs
      --cpuset-cpus string             CPUs in which to allow execution (0-3, 0,1)
      --cpuset-mems string             MEMs in which to allow execution (0-3, 0,1)
  -d, --detach                         Run container in background and print container ID
      --detach-keys string             Override the key sequence for detaching a container
      --device list                    Add a host device to the container
      --device-cgroup-rule list        Add a rule to the cgroup allowed devices list
      --device-read-bps list           Limit read rate (bytes per second) from a device (default [])
      --device-read-iops list          Limit read rate (IO per second) from a device (default [])
      --device-write-bps list          Limit write rate (bytes per second) to a device (default [])
      --device-write-iops list         Limit write rate (IO per second) to a device (default [])
      --disable-content-trust          Skip image verification (default true)
      --dns list                       Set custom DNS servers
      --dns-option list                Set DNS options
      --dns-search list                Set custom DNS search domains
      --domainname string              Container NIS domain name
      --entrypoint string              Overwrite the default ENTRYPOINT of the image
  -e, --env list                       Set environment variables
      --env-file list                  Read in a file of environment variables
      --expose list                    Expose a port or a range of ports
      --gpus gpu-request               GPU devices to add to the container ('all' to pass all GPUs)
      --group-add list                 Add additional groups to join
      --health-cmd string              Command to run to check health
      --health-interval duration       Time between running the check (ms|s|m|h) (default 0s)
      --health-retries int             Consecutive failures needed to report unhealthy
      --health-start-period duration   Start period for the container to initialize before starting health-retries
                                       countdown (ms|s|m|h) (default 0s)
      --health-timeout duration        Maximum time to allow one check to run (ms|s|m|h) (default 0s)
      --help                           Print usage
  -h, --hostname string                Container host name
      --init                           Run an init inside the container that forwards signals and reaps processes
  -i, --interactive                    Keep STDIN open even if not attached
      --ip string                      IPv4 address (e.g., 172.30.100.104)
      --ip6 string                     IPv6 address (e.g., 2001:db8::33)
      --ipc string                     IPC mode to use
      --isolation string               Container isolation technology
      --kernel-memory bytes            Kernel memory limit
  -l, --label list                     Set meta data on a container
      --label-file list                Read in a line delimited file of labels
      --link list                      Add link to another container
      --link-local-ip list             Container IPv4/IPv6 link-local addresses
      --log-driver string              Logging driver for the container
      --log-opt list                   Log driver options
      --mac-address string             Container MAC address (e.g., 92:d0:c6:0a:29:33)
  -m, --memory bytes                   Memory limit
      --memory-reservation bytes       Memory soft limit
      --memory-swap bytes              Swap limit equal to memory plus swap: '-1' to enable unlimited swap
      --memory-swappiness int          Tune container memory swappiness (0 to 100) (default -1)
      --mount mount                    Attach a filesystem mount to the container
      --name string                    Assign a name to the container
      --network network                Connect a container to a network
      --network-alias list             Add network-scoped alias for the container
      --no-healthcheck                 Disable any container-specified HEALTHCHECK
      --oom-kill-disable               Disable OOM Killer
      --oom-score-adj int              Tune host's OOM preferences (-1000 to 1000)
      --pid string                     PID namespace to use
      --pids-limit int                 Tune container pids limit (set -1 for unlimited)
      --platform string                Set platform if server is multi-platform capable
      --privileged                     Give extended privileges to this container
  -p, --publish list                   Publish a container's port(s) to the host
  -P, --publish-all                    Publish all exposed ports to random ports
      --pull string                    Pull image before running ("always"|"missing"|"never") (default "missing")
      --read-only                      Mount the container's root filesystem as read only
      --restart string                 Restart policy to apply when a container exits (default "no")
      --rm                             Automatically remove the container when it exits
      --runtime string                 Runtime to use for this container
      --security-opt list              Security Options
      --shm-size bytes                 Size of /dev/shm
      --sig-proxy                      Proxy received signals to the process (default true)
      --stop-signal string             Signal to stop a container (default "SIGTERM")
      --stop-timeout int               Timeout (in seconds) to stop a container
      --storage-opt list               Storage driver options for the container
      --sysctl map                     Sysctl options (default map[])
      --tmpfs list                     Mount a tmpfs directory
  -t, --tty                            Allocate a pseudo-TTY
      --ulimit ulimit                  Ulimit options (default [])
  -u, --user string                    Username or UID (format: <name|uid>[:<group|gid>])
      --userns string                  User namespace to use
      --uts string                     UTS namespace to use
  -v, --volume list                    Bind mount a volume
      --volume-driver string           Optional volume driver for the container
      --volumes-from list              Mount volumes from the specified container(s)
  -w, --workdir string                 Working directory inside the container
```

### docker最基本的启动容器

为什么说是最基本的呢….因为这玩意非常五花八门

```bash
docker run [可选参数] image的名字或者id

# 最简单的参数
--name "abc" 用来区分容器
--name="abc" 同上
-d 			以后台方式启动
-it			使用交互方式运行，进入容器查看内容
-p			指定容器的端口，例如，要将容器内的8080端口映射到本地的6666端口，则：-p 6666:8080
	-p 主机端口:容器端口 实际中百分之九十是用这个方式
	-p ip:主机端口:容器端口
	-p 容器端口
	-p 啥都不填 随机生成 没人用过这种方式
	
```

我们先来启动下刚刚pull的ubuntu

```bash
docker run -it ubuntu bash
```

进入到ubuntu的bash目录（根路径），然后你可以像正常操作ubuntu那样，键入`exit`退出

### ps查看正在运行的容器

语法

```bash
Usage:  docker ps [OPTIONS]

List containers

Options:
  -a, --all            # 列出当前正在运行的容器，和历史运行过的容器
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print containers using a Go template
  -n, --last int       # 语法 -n=number 或者 -n number number是int 可以通过这个参数来指定显示最近创建的容器
  -l, --latest          Show the latest created container (includes all states)
      --no-trunc        Don't truncate output
  -q, --quiet         # 只显示容器的id，可以配合 -a 也就是： -qa 显示出所有的容器
  -s, --size            Display total file sizes
```

一般都是 -qa -a，用的多

### 退出容器和不停止退出

我们先进入下

```bash
docker run -it ubuntu bash
```

然后你输入`exit`，再用`docker ps`什么都看不到

但如果你在进入这个容器后，按下`Ctrl+p+q` ---没错，就是这种组合快捷键，然后再到ps查看

![image-20220104201536544](/images/Java/SpringCloud/00-Docker/image-20220104201536544.png)

你就能看到你的容器了

### 结束运行的容器和删除容器

结束：

比如说刚刚的那个ubuntu 它的id是b5187daa2403

我要直接停止它只需要

```bash
docker stop b5187daa2403
```

然后删除容器只需要

```bash
docker rm b5187daa2403
```

注意 要先停止 再删除

如果一定要直接删除的话

```bash
# 不走停止步骤 直接删除
docker rm -f b5187daa2403
```

如果要批量删除的话：删除所有容器

```bash
docker rm -f ${docker ps -qa}
```

或者通过linux的管道符来批量删除

```bash
docker ps -qa | xargs docker rm -f
# xargs就是将上个命里的输出作为参数传递给docker rm这个命令
```

### 启动和停止容器的操作

比如说我现在启动了一个mysql

```bash
docker run --name mysql1 -p:3306:3306 -d mysql
```

我想停止它

```bash
docker stop mysql
# 或者kill，但通常情况下都是stop kill可能存在一些bug
# kill是强制停止
docker kill mysql
```

我想重启它

```bash
docker start mysql
```

我想直接重启它

```bash
docker restart mysql
```

### 后台启动

```bash
docekr run -d ubuntu
```

有些时候 你启动了一个容器 比如说这个ubuntu

然后你会发现它不在你的ps正在运行的列表中

这是因为 这个容器没有任何正在运行的任务 所以会自动停止

如果docker容器使用后台运行 那么他必须要一个前台进程

docker如果发现没有应用，就会自动停止

### logs查看日志

```bash
Usage:  docker logs [OPTIONS] CONTAINER

Fetch the logs of a container

Options:
      --details        Show extra details provided to logs 显示提供给日志的额外详细信息
  -f, --follow         Follow log output 按照日志输出
      --since string   Show logs since timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g. 42m for 42 minutes)  显示自时间戳记起的日志（例如 2013-01-02T13： 23:37Z）或相关（例如 42m 为 42 分钟）
  -n, --tail string    Number of lines to show from the end of the logs (default "all") 从日志末尾显示的行数（默认为“all”） 例如  --tail 10 就是显示最新的十条记录
  -t, --timestamps     Show timestamps 显示时间戳
      --until string   Show logs before a timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g. 42m for 42 minutes) 在时间戳（例如 2013-01-02T13:23:37Z）或相关（例如 42m 为 42 分钟）之前的日志
```

这些一般情况下都有可能用得上 最常用的大概是`-t`和`-f`以及`-n`了

```bash
# 查看最近10条log，包含时间戳
docker logs -t -n 10 容器
#  显示42分钟之前的日志 包含时间戳
 docker logs --until 42m -t 容器
# 显示xxx号开始，40分钟之前的日志 包含时间戳
docker logs --since "2011-11-11" --until 40m 容器
```

### top查看容器内的进程信息

比如我有个容器运行了mysql 我想看看里面的进程信息

```bash
 docker top mysql
```

结果

![image-20220104204917613](/images/Java/SpringCloud/00-Docker/image-20220104204917613.png)

### inspect查看容器的所有原信息

```bash
 docker inspect mysql
```

结果非常多

```json
[
    {
        //容器ID
        "Id": "9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54",
        // 创建时间
        "Created": "2021-09-26T08:00:11.915899405Z",
        // 默认的bash控制台
        "Path": "docker-entrypoint.sh",
        // 传递的参数
        "Args": [
            "mysqld"
        ],
        // 状态
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 1003688,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-01-04T12:48:29.623170827Z",
            "FinishedAt": "2021-12-21T09:14:39.402134711Z"
        },
        // 是通过哪个image创建的
        "Image": "sha256:0716d6ebcc1a61c5a296fcb187e71f93531e510d4e4400267e2e502103d0194c",
        "ResolvConfPath": "/var/lib/docker/containers/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54/hostname",
        "HostsPath": "/var/lib/docker/containers/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54/hosts",
        "LogPath": "/var/lib/docker/containers/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54/9f21f81da25373b2896b7945ab6d6dafc69cf3f2e8623a428f95383dcb6e2f54-json.log",
        // 主机的配置
        "Name": "/mysql",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "docker-default",
        "ExecIDs": null,
        // 端口之类的配置
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "3306/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "3306"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "host",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/25d2c9aecfed8840414278a14f2f2549069a27ec07b268e0acd4f9649a462a51-init/diff:/var/lib/docker/overlay2/9f1869bece0ef786bf2728d5a9b5382d35f2d1129b0c34b7c8a4ce0ba96db65b/diff:/var/lib/docker/overlay2/5ba831e614fc8249b892624286b87d99de8a1cf0002af63dd5b1b78c14afb02c/diff:/var/lib/docker/overlay2/7a46fd9b22b210e0e03af3e7769c508ee6c664180d23b231cd4c1807a41c28f3/diff:/var/lib/docker/overlay2/04483e1d79d5ebe5dd267433079c9ae7bfe5f2ae1bd236763afee15631ac040f/diff:/var/lib/docker/overlay2/13875c72f323a9b4494d16aae350ccf2fb7cc017955dfa25b70033b71268e538/diff:/var/lib/docker/overlay2/f796562cea5598a9ad118d294e6a1753c9e56260d6dd9a2ab28c7e7721cb8487/diff:/var/lib/docker/overlay2/d9dce547d72843ffd026fea1a76b77bba364073acbb71ccdd3e03959730fc070/diff:/var/lib/docker/overlay2/2313046eeca90ad031a5210b5de4cb2596d9020e4a434b5a23031b321882cded/diff:/var/lib/docker/overlay2/ad4cb3141a2f4cf39e264b886cf31b0d303b11909a1f56b49fc7422c45035d1a/diff:/var/lib/docker/overlay2/c4c4cfbd4b4b01ca95b7cda32507f45c96e8a4e932c31f15311135416d831676/diff:/var/lib/docker/overlay2/f7eb97beb793d4b34a2d20c526f11f3369a9430fc8c9d22296121b60e1e39940/diff:/var/lib/docker/overlay2/ddbc25b697c64e7f46cb77e545aae9fde56d11d45778a6b2d13578fd61dcb7a6/diff",
                "MergedDir": "/var/lib/docker/overlay2/25d2c9aecfed8840414278a14f2f2549069a27ec07b268e0acd4f9649a462a51/merged",
                "UpperDir": "/var/lib/docker/overlay2/25d2c9aecfed8840414278a14f2f2549069a27ec07b268e0acd4f9649a462a51/diff",
                "WorkDir": "/var/lib/docker/overlay2/25d2c9aecfed8840414278a14f2f2549069a27ec07b268e0acd4f9649a462a51/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [
            {
                "Type": "volume",
                "Name": "4e006693351035d468b0b79ddec3dec1710c96cce8424437b65405a4e7e20e03",
                "Source": "/var/lib/docker/volumes/4e006693351035d468b0b79ddec3dec1710c96cce8424437b65405a4e7e20e03/_data",
                "Destination": "/var/lib/mysql",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "9f21f81da253",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "3306/tcp": {},
                "33060/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "MYSQL_ROOT_PASSWORD=123456789",
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "GOSU_VERSION=1.12",
                "MYSQL_MAJOR=8.0",
                "MYSQL_VERSION=8.0.26-1debian10"
            ],
            "Cmd": [
                "mysqld"
            ],
            "Image": "mysql",
            "Volumes": {
                "/var/lib/mysql": {}
            },
            "WorkingDir": "",
            "Entrypoint": [
                "docker-entrypoint.sh"
            ],
            "OnBuild": null,
            "Labels": {}
        },
        // 网络的一些信息
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "46656b4e57a5381633087312627c8c66bfd36515ef7dbabb0978f4e94a71ad6a",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "3306/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "3306"
                    },
                    {
                        "HostIp": "::",
                        "HostPort": "3306"
                    }
                ],
                "33060/tcp": null
            },
            "SandboxKey": "/var/run/docker/netns/46656b4e57a5",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "1d1797f34b09434542f50e955a80ff45ab5cd6dad3f00c743af8fdacbfc39058",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.3",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:03",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "d00c679d51fa5d3a4485eaadfdfcc7181aa634bfb13f553027f4b0fd4f2a3aa6",
                    "EndpointID": "1d1797f34b09434542f50e955a80ff45ab5cd6dad3f00c743af8fdacbfc39058",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.3",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:03",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

### exec和attach进入容器

这是非常重要的命令

```bash
Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

Run a command in a running container

Options:
  -d, --detach               Detached mode: run command in the background
      --detach-keys string   Override the key sequence for detaching a container
  -e, --env list             Set environment variables
      --env-file list        Read in a file of environment variables
  -i, --interactive          Keep STDIN open even if not attached
      --privileged           Give extended privileges to the command
  -t, --tty                  Allocate a pseudo-TTY
  -u, --user string          Username or UID (format: <name|uid>[:<group|gid>])
  -w, --workdir string       Working directory inside the container
```

最常用的是：

`-it` 交互模式

例如进入mysql

```bash
docker exec -it mysql bash
```

然后你就可以自由的更改你的mysql

或者还有一种方式可以进入容器

下面这个是正在运行的命令行（例如mysql 进入后你将会看到正在运行的mysql 注意 实际工程中百分之一万不会用到这个）

```bash
docker attach mysql
```

- docker exec 进入容器后开启一个新的终端 可以在里面操作
- docker attach 进入容器正在执行的终端，不会启动新的进程

### cp--容器和主机的文件互相传递

从容器内拷贝到主机上

```bash
docker cp 容器id:容器内的路径（要从根路径开始） 主机路径（也是要从根路径开始）
```

例如

我现在的ubuntu容器内`/home`路径下有一个`abc.java`

我想拷贝到我主机的`/home/root`路径下

无论容器有没有启动，都可以用cp来进行拷贝

```bash
docker cp ubuntu:/home/abc.java /home/root
```

如果说要把主机的拷贝到容器 反着来就行了

```bash
docker cp /home/root/abc.java ubuntu:/home
```

## ✨Docker命令一图概括

![image-20220104210746142](/images/Java/SpringCloud/00-Docker/image-20220104210746142.png)

```bash
ttach    #当前shell下attach连接指定运行镜像
build      #通过Dockerfile定制镜像
commit      #提交当前容器为新的镜像
cp     #从容器中拷贝指定文件或者目录到宿主机中
create      #创建一个新的容器，同run 但不启动容器
diff      #查看docker容器变化
events    #从docker服务获取容器实时事件
exec    #在已存在的容器上运行命令
export    #导出容器的内容流作为一个tar归档文件(对应import)
history    #展示一个镜像形成历史
images    #列出系统当前镜像
import    #从tar包中的内容创建一个新的文件系统映像(对应export)
info     #显示系统相关信息
inspect    #查看容器详细信息
kill    #kill指定docker容器
load     #从一个tar包中加载一个镜像(对应save)
login    #注册或者登陆一个docker源服务器
logout    #从当前Docker registry退出
logs    #输出当前容器日志信息
pause    #暂停容器
port    #查看映射端口对应的容器内部源端口
ps    #列出容器列表
pull      #从docker镜像源服务器拉取指定镜像或者库镜像
push     #推送指定镜像或者库镜像至docker源服务器
rename     #重命名容器
restart    #重启运行的容器
rm    #移除一个或者多个容器
rmi    #移除一个或多个镜像(无容器使用该镜像才可以删除，否则需要删除相关容器才可以继续或者-f强制删除)
run      #创建一个新的容器并运行一个命令
save    #保存一个镜像为一个tar包(对应load)
search     #在dockerhub中搜索镜像
start   #启动容器
stats      #统计容器使用资源
stop    #停止容器
tag          #给源中镜像打标签
top      #查看容器中运行的进程信息
unpause     #取消暂停容器
version   #查看容器版本号
wait       #截取容器停止时的退出状态值
```

## 部署测试

### Nginx

```shell
docker run -d --name nginx01 -p 3344:80 nginx
```

测试：

```bash
curl localhost:3344
```

结果：

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to nginx!</title>
        <style>
            html { color-scheme: light dark; }
            body { width: 35em; margin: 0 auto;
                font-family: Tahoma, Verdana, Arial, sans-serif; }
        </style>
    </head>
    <body>
        <h1>Welcome to nginx!</h1>
        <p>If you see this page, the nginx web server is successfully installed and
            working. Further configuration is required.</p>

        <p>For online documentation and support please refer to
            <a href="http://nginx.org/">nginx.org</a>.<br/>
            Commercial support is available at
            <a href="http://nginx.com/">nginx.com</a>.</p>

        <p><em>Thank you for using nginx.</em></p>
    </body>
</html>
```

![image-20220104211904044](/images/Java/SpringCloud/00-Docker/image-20220104211904044.png)



### Tomcat以及启动时--rm命令

关于tomcat 可以在其[官方文档](https://hub.docker.com/_/tomcat)中看到这样一条启动命令

```bash
docker run -it --rm -p 8888:8080 tomcat:9.0
```

这个`--rm`意思其实非产简单---用完就自动的删除（退出后自动执行docker rm xxx）

但是image不会删除

接着访问 404 正常

![image-20220104214250828](/images/Java/SpringCloud/00-Docker/image-20220104214250828.png)

说明我们的tomcat下没有配置root

我们退出 后台启动并进入一下

```bash
docker run -d --name tomcat -p 8888:8080 tomcat:9.0
docker exec -it tomcat bash
```

![image-20220104214744642](/images/Java/SpringCloud/00-Docker/image-20220104214744642.png)

可以看到 有两个webapps文件夹 已知webapps里面没有东西

所以我们看看webapps.dist

![image-20220104214827117](/images/Java/SpringCloud/00-Docker/image-20220104214827117.png)

果真都在这

所以把他重命名即可

```bash
rm -rf webapps/
mv webapps.dist/ webapps
```

接着访问，东西就有了

![image-20220104215004188](/images/Java/SpringCloud/00-Docker/image-20220104215004188.png)

### ElasticSearch+Kibana图形化面板

md 不太想部署这个玩意 主要是太费内存了

首先看看[部署文档](https://hub.docker.com/_/elasticsearch)

他需要两行命令

```bash
# 这里是创建一个网关 之后会说
docker network create somenetwork
# -e是额外的参数 -net是指定网关
docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.16.2
```

启动完毕后 如果你的服务器是1g2h，建议不要这样做…

你可以输入：

```bash
docker stats
```

查看服务状态

![image-20220104215807989](/images/Java/SpringCloud/00-Docker/image-20220104215807989.png)

md 两个G太卡了吧这

接下来测试下

```bash
curl localhost:9200
```

结果

```json
{
  "name" : "81343bfa8cac",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "U-jQ8AFxSFOS2mfEVHbsJw",
  "version" : {
    "number" : "7.16.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "2b937c44140b6559905130a8650c64dbd0879cfb",
    "build_date" : "2021-12-18T19:42:46.604893745Z",
    "build_snapshot" : false,
    "lucene_version" : "8.10.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

问题来了：我们改如何控制它的内存

在它的docker hub主页面内 可以看到一个[here](https://www.elastic.co/guide/en/elasticsearch/reference/index.html)

点进去 找到自己的版本

![image-20220104220233176](/images/Java/SpringCloud/00-Docker/image-20220104220233176.png)

emm不对啊 我们用过es  可以通过修改配置文件来解决啊

我们先kill这个玩意

```bash
docker rm -f elasticsearch
```

然后重新指定参数

```bash
docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.16.2
```

这里是给他启动的时候加参数  我们加了一个jvm的内存限制参数

嘛，JVM的大概就是[这些](https://www.cnblogs.com/likehua/p/3369823.html)，目前来说也只需要知道这些就行了，这里就类似于

```bash
java xxx.class -Xms64m -Xmx512m discovery.type=single-node
```

![image-20220104220735753](/images/Java/SpringCloud/00-Docker/image-20220104220735753.png)

是不是好多了

再访问下

```bash
curl localhost:9200
# 结果
{
  "name" : "d9715b359c73",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "VjWWATzsTKWEreDkUfjoPg",
  "version" : {
    "number" : "7.16.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "2b937c44140b6559905130a8650c64dbd0879cfb",
    "build_date" : "2021-12-18T19:42:46.604893745Z",
    "build_snapshot" : false,
    "lucene_version" : "8.10.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

接下来再启动下kibana

这个非常简单，看下[文档](https://hub.docker.com/_/kibana)

两条命令

```bash
docker network create somenetwork
docker run -d --name kibana --net somenetwork -p 5601:5601 kibana:tag
```

我们之前已经创建过网关了，所以第一条不需要 只需要第二条即可

```bash
docker run -d --name kibana --net somenetwork -p 5601:5601 kibana:7.16.2
```

接着等待一会儿，浏览器进入5601就可以了

![image-20220104221743328](/images/Java/SpringCloud/00-Docker/image-20220104221743328.png)



### Docker可视化web图形管理页面

这里先使用**Portainer** 

<https://docs.portainer.io/v/ce-2.9/start/install/agent/docker/linux>

一条命令

```bash
docker run -d -p 9001:9001 --name portainer_agent --restart=always --privileged=true -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker/volumes:/var/lib/docker/volumes cr.portainer.io/portainer/agent:2.9.3
```

restart指的是会跟随系统启动而启动

-v 是映射本地路径

–privileged是授权让其能访问docker和其他对应数据的

当然也有国人汉化版本的

```bash
docker search portainer
# 结果：
NAME                                DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
6053537/portainer-ce                portainer-ce中文汉化版                               16
lihaixin/portainer                  docker ui                                       15                   [OK]
6053537/portainer                   portainer中文版，完整汉化，汉化程度95%以上                     6
......
```

所以我们只需要：

```bash
docker run -d -p 9000:9001 --name portainer_agent --restart=always --privileged=true -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/docker/volumes:/var/lib/docker/volumes 6053537/portainer-ce
```

我这里省事 设置了9k

等待他部署好，访问`9000`端口设置账号密码即可

接下来看看最终效果

![image-20220104222935979](/images/Java/SpringCloud/00-Docker/image-20220104222935979.png)

## Docker镜像说明

### 镜像是啥

镜像是一个轻量级，可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需要的所有内容，包括代码、运行时的库、环境变量和配置文件

所有的应用，直接打包成docker镜像，就可以跑起来

如何得到镜像

- 从远程仓库clone
- 从朋友那嫖
- 自己制作一个镜像Dockerfile

### Docker镜像加载原理

> UnionFS（联合文件系统）

这是一种分层、轻量级、高性能的文件系统，**它支持对文件系统的修改作为一次提交来一层层叠加**，同时可以将不同目录挂载到同一个虚拟文件系统下，UnionFS是Docker镜像的基础，镜像可以通过分层来继承（没有父镜像），可以制作各种具体的应用镜像

![image-20220104224728009](/images/Java/SpringCloud/00-Docker/image-20220104224728009.png)

特性：一次性同时加载多个文件系统，从外表看起来，只看得到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统包含所有底层的文件目录

比如说我们先有两个 镜像 一个tomcat 一个mysql 都用上了同版本的ubuntu 然后他们其中一个的ubuntu将会公用（也就是有一方不需要启动ubuntu，直接用另外一个的）

![image-20220104224931947](/images/Java/SpringCloud/00-Docker/image-20220104224931947.png)

![image-20220104225352499](/images/Java/SpringCloud/00-Docker/image-20220104225352499.png)

![image-20220104225509194](/images/Java/SpringCloud/00-Docker/image-20220104225509194.png)

![image-20220104225522848](/images/Java/SpringCloud/00-Docker/image-20220104225522848.png)

![image-20220104225620567](/images/Java/SpringCloud/00-Docker/image-20220104225620567.png)

![image-20220104225645879](/images/Java/SpringCloud/00-Docker/image-20220104225645879.png)

![image-20220104230006641](/images/Java/SpringCloud/00-Docker/image-20220104230006641.png)



![image-20220104230123481](/images/Java/SpringCloud/00-Docker/image-20220104230123481.png)

## ✨Commit镜像

```bash
docker commit 提交容器成为一个新的副本
# 命令和git类似
docker commit -m="提交的描述信息" -a="作者" 容器id 目标镜像名:[Tag]
```

我们先启动一个镜像 并做一些修改

```bash
docker run --name tomcat -p 8888:8080 -d tomcat
docker exec -it tomcat bash
mv webapps.dist/* webapps/
exit
```

接下来提交

```bash
docker commit -a="一个平平淡淡的人" -m="add webapps app" tomcat tomcat02:1.0.0
```

接下来你就能在`dokcer images`中看到它了

![image-20220104231223999](/images/Java/SpringCloud/00-Docker/image-20220104231223999.png)

以后我们就可以直接使用我们修改过后的镜像了

先把正在用的镜像删掉

```bash
docker rm -f tomcat
# 再启动自己的
docker run --name myTomcat -p 8888:8080 -d tomcat02:1.0.0
```

接下来

```bash
 curl localhost:8888
```

你就能看到我们之前整的内容了

这玩意就像是Git一样 方便快捷好用

好，如果你看到了这里，恭喜你，你已经真正的**入门**了Docker

## ✨容器数据卷

### 概述

我们的数据如果都存储在容器之中，那么只要容器一删除，数据就会丢失

现在有一个需求：让数据持久化到本地硬盘，例如Mysql的

所以说我们可以通过配置容器数据卷 来让数据存储到本地 从而实现持久化

这就是卷技术--人话：将我们容器的目录，挂载到Linux上面

### 使用数据卷-映射

> 方式一：直接使用命令来挂载 `-v`
>
> -v 表示， 初始化时，主机目录/文件 覆盖容器目录/文件 之后开始双向同步

```bash
docker run -it -v 主机目录:容器内目录 可以配置多个 
```

例如我们把自己之前创建的tomcat镜像内的webappss存放在

`/home/root/java/webappss`这个目录下

```bash
docker run --name testTomcat -d -p 8888:8080 -v /home/你的用户名/java/webapps:/usr/local/tomcat/webapps tomcat
```

接着你会发现无论是容器内还是外部的文件内 都没有任何内容

但是我们可以自己手动添加一个

首先在自己的tomcat目录下新建一个ROOT文件夹和一个index.html，html文件内写一个Hello World（注意 要root权限）

接着curl测试下

```bash
 curl localhost:8888
 # 结果
 Hello World
```

我们继续看下这个容器的信息

```bash
docker inspect testTomcat
```

可以看到一个信息

```json
"Mounts": [
    {
        "Type": "bind",
        // 本机地址
        "Source": "/home/root/java/webapps",
        // 容器内地址
        "Destination": "/usr/local/tomcat/webapps",
        "Mode": "",
        "RW": true,
        "Propagation": "rprivate"
    }
],
```

接下来我们尝试在这个docker容器内加一点东西

```bash
docker exec -it testTomcat bash
cd webapps
mkdir home 
echo "Hello Home">index.html
```

接着返回本机 可以看到 本地的路径下也多了个文件夹

![image-20220104234146298](/images/Java/SpringCloud/00-Docker/image-20220104234146298.png)

接着我们访问下

```bash
curl localhost:8888/home/
# 结果：Hello Home
```

当然 也可以指定文件 例如nginx制定本机的配置文件映射到容器内 这里就不多做讨论了

### 具名挂载和匿名挂载

```bash
# 匿名挂载
-v 容器内路径（这个的主机地址之后会说到） 或者 主机路径:容器路径
# 这样会自动生成主机路径
```

你可以通过

```bash
docker volume ls
```

来查看映射卷

通常来说是这样的

![image-20220104235934545](/images/Java/SpringCloud/00-Docker/image-20220104235934545.png)

就相当于是Java的匿名内部类一样

当然 查看想要的卷的信息也非常简单

```bash
docker inspect 卷名，例如：0ad3c188c086845507bb70c08b8f0763f5d6f210b92d0529fcd56abbd9edc2ae
```

结果：

```json
[
    {
        "CreatedAt": "2021-09-26T14:46:54+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/0ad3c188c086845507bb70c08b8f0763f5d6f210b92d0529fcd56abbd9edc2ae/_data",
        "Name": "0ad3c188c086845507bb70c08b8f0763f5d6f210b92d0529fcd56abbd9edc2ae",
        "Options": null,
        "Scope": "local"
    }
]
```

如果要使用具名挂载的话，只需要：

```bash
 docker run -d -p 5333:80 --name test_nginx -v nginx-test:/etc/nginx nginx
```

接着查看：

```bash
 docker volume ls
```

![image-20220105000827945](/images/Java/SpringCloud/00-Docker/image-20220105000827945.png)

接着看看他的信息

```bash
docker inspect nginx-test
```

结果：

```bash
[
    {
        "CreatedAt": "2022-01-05T00:07:04+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/nginx-test/_data",
        "Name": "nginx-test",
        "Options": null,
        "Scope": "local"
    }
]
```

挂载到了`/var/lib/docker/volumes/赋予的数据卷的名称/_data目录下`

所以docker所有没有指定的 都在这

### 总结以及读写权限

```yaml
# 指定路径挂载形式
-v 容器内路径 # 匿名挂载
-v 卷名:容器内路径 # 具名挂载
-v 主机路径:容器内路径 # 指定路径挂载
```

然后还有一个参数

例如：

```bash
docker run -d -p 80:80 nginx -v jump-nginx:/etc/nginx:ro nginx
```

这个-ro

```bash
:ro #表示只读 readonly
:rw #表示可读可写 readwrite
# 如果设置了ro，容器内将无法修改该文件 只能读取该文件

反正看到ro就说明该路径只能是我们主机来操作，容器内部是无法修改的，默认是rw，
```

### 一个最简单的dockerfile

可以把这个理解为用文件来替代我们手动commit镜像

我们随便找一个文件夹，里面创建一个dockerfile01，无需后缀

然后填入如下内容

```dockerfile
#  文件中的内容分为指令和参数 指令大小写不敏感

# 导入ubuntu镜像
from ubuntu

# 镜像的挂载卷 这里可以指定多个 等同于 -v
volume ["volume01","volume02"]

# 我们要执行的命令
cmd echo "---end---"
cmd /bin/bash
```

然后在控制台输入如下命令

```bash
docker build -f ./dockerfile01 -t my/ubuntu:1.0 .
#      构建   通过文件           打上表桥          注意这个点

# 结果：
Sending build context to Docker daemon  2.048kB
Step 1/4 : from ubuntu
 ---> ba6acccedd29
Step 2/4 : volume ["volume01","volume02"]
 ---> Running in 05a165d67ad3
Removing intermediate container 05a165d67ad3
 ---> fe33c84c3f12
Step 3/4 : cmd echo "---end---"
 ---> Running in a8e799afcc38
Removing intermediate container a8e799afcc38
 ---> bef8e13dba1a
Step 4/4 : cmd /bin/bash
 ---> Running in 5a946a331840
Removing intermediate container 5a946a331840
 ---> 2b87daccb8f7
Successfully built 2b87daccb8f7
Successfully tagged my/ubuntu:1.0
```

接着我们run一下

```bash {29,30}
 docker run -it my/ubuntu:1.0
 
 # 然后看看容器内文件
 ls - l
 
 # 结果
 total 56
lrwxrwxrwx   1 root root    7 Oct  6 16:47 bin -> usr/bin
drwxr-xr-x   2 root root 4096 Apr 15  2020 boot
drwxr-xr-x   5 root root  360 Jan  5 04:42 dev
drwxr-xr-x   1 root root 4096 Jan  5 04:42 etc
drwxr-xr-x   2 root root 4096 Apr 15  2020 home
lrwxrwxrwx   1 root root    7 Oct  6 16:47 lib -> usr/lib
lrwxrwxrwx   1 root root    9 Oct  6 16:47 lib32 -> usr/lib32
lrwxrwxrwx   1 root root    9 Oct  6 16:47 lib64 -> usr/lib64
lrwxrwxrwx   1 root root   10 Oct  6 16:47 libx32 -> usr/libx32
drwxr-xr-x   2 root root 4096 Oct  6 16:47 media
drwxr-xr-x   2 root root 4096 Oct  6 16:47 mnt
drwxr-xr-x   2 root root 4096 Oct  6 16:47 opt
dr-xr-xr-x 241 root root    0 Jan  5 04:42 proc
drwx------   2 root root 4096 Oct  6 16:58 root
drwxr-xr-x   5 root root 4096 Oct  6 16:58 run
lrwxrwxrwx   1 root root    8 Oct  6 16:47 sbin -> usr/sbin
drwxr-xr-x   2 root root 4096 Oct  6 16:47 srv
dr-xr-xr-x  13 root root    0 Jan  5 04:42 sys
drwxrwxrwt   2 root root 4096 Oct  6 16:58 tmp
drwxr-xr-x  13 root root 4096 Oct  6 16:47 usr
drwxr-xr-x  11 root root 4096 Oct  6 16:58 var
drwxr-xr-x   2 root root 4096 Jan  5 04:42 volume01
drwxr-xr-x   2 root root 4096 Jan  5 04:42 volume02
```

可以看到 最后两个目录，就是我们生成镜像的时候自动挂载的数据卷目录

也就是说 这个卷一定是和外部有一个卷是同步的

但我们之前是` volume ["volume01","volume02"]`

匿名挂载的 所以说得通过`inspect`来查看

```json
"Mounts": [
    {
        "Type": "volume",
        "Name": "6ee8e6c78e4b01f488d22cb35aa55d87713d540e01b45908399e830751222bea",
        "Source": "/var/lib/docker/volumes/6ee8e6c78e4b01f488d22cb35aa55d87713d540e01b45908399e830751222bea/_data",
        "Destination": "volume01",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    },
    {
        "Type": "volume",
        "Name": "26efe6b8dfad81f3985149cd14daf4f26b44c115a88b89f61ca76c5584b123f8",
        "Source": "/var/lib/docker/volumes/26efe6b8dfad81f3985149cd14daf4f26b44c115a88b89f61ca76c5584b123f8/_data",
        "Destination": "volume02",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
],
```

### 多个容器之间数据卷共享

注意，这个玩意貌似不能实现mysql之类的数据共享

我们先启动一个

```bash
 docker run -it --name docker01 my/ubuntu:1.0
 # 进入后 ctrl+pq暂时退出

```

之前制作过对应的镜像 所以他有两个挂载卷 volume01 和02

我现在想让另一个容器来继承它 和它使用同一个数据卷，只需要

语法：

```bash
docker run -it -name 容器名 --volumes-from 父容器 父容器名 镜像
```

实例：

```bash
 docker run -it --name docker02 --volumes-from docker01 my/ubuntu:1.0
 #								让容器的数据卷继承指定的容器
 # 接着进入docker01容器
  docker exec -it docker01 bash
  # 接下来 cd 到 v1 然后 touch aaa.txt 并ctrl+pq退出
 #接着进入第二个容器
 docker exec -it docker02 bash
 cd ./volume01
 ls
 # 然后你就能看到刚刚创建的文件
 # 同时你还可以 echo "bbb">bb.txt，然后进入docker01容器查看 他们两之间的数据是互通的
```

这个继承是可以套娃的，就像是Java那样

你可以写多个东西来继承docker01 或者docker02 嘛都会自动挂载

并且之后你删掉1 另外两个依旧会共享数据

当然 你可以用portainer来看差数据卷的共享情况，一目了然

![image-20220105131700746](/images/Java/SpringCloud/00-Docker/image-20220105131700746.png)

volumes-from就是捆绑多少个就多少个数据卷共享，即使docker01被停止

## ✨Dockerfile

dockerfile是用来构建docker镜像文件的命令参数脚本

构建步骤：

- 编写一个dockerfile文件
- docker build成为一个镜像
- docker run 运行镜像
- docker push 发布镜像（Dockerhub 或者腾讯阿里云之类的）

我们先来看看一般的镜像是怎么样的，例如[ubuntu](https://hub.docker.com/_/ubuntu)

进去后，它有一个链接

![image-20220105140313843](/images/Java/SpringCloud/00-Docker/image-20220105140313843.png)

点击会发现跳转到了github 

<https://github.com/tianon/docker-brew-ubuntu-core/blob/bf61e139e84e04f9d87fff5dc588a3f0398da627/focal/Dockerfile>

然后得到如下内容

```dockerfile
# 这是最基本的镜像 可以理解为Java的Object类
FROM scratch
ADD ubuntu-focal-oci-amd64-root.tar.gz /
CMD ["bash"]
```

![image-20220105141103036](/images/Java/SpringCloud/00-Docker/image-20220105141103036.png)



![image-20220105140848278](/images/Java/SpringCloud/00-Docker/image-20220105140848278.png)

### Dockerfile命令一览

```dockerfile
from 		#	基础镜像，一切重这里开始构建
maintainer 	#	镜像是谁写的==姓名+邮箱
label 		#	同上 目前来说一般通过这个来制定姓名+邮箱
run 		#	镜像构建的时候要运行的命令
add 		#	添加别的内容 例如添加一个tomcat.tar.gz压缩包的内容
workdir 	#	镜像的工作目录
volume 		#	挂载的目录 等同于 -v
expose 		#	保留端口配置 等同于-p
cmd 		#	指定这个容器启动的时候要运行的命令，一行只能写一个命令
entrypoint	#	指定这个容器启动的时候要运行的命令，可以最追加命令 （一行可以写多个命令）
onbuild		#	当构建一个被继承的Dockerfile的时候，就会运行onbuild中的指令，也就是一个触发指令
copy		#	类似于add命令，将我们的文件拷贝到镜像中
env			#	构建的时候设置环境变量

```



![image-20220105141218399](/images/Java/SpringCloud/00-Docker/image-20220105141218399.png)

- FROM-构建镜像基于哪个镜像

- MAINTAINER-镜像维护者姓名或邮箱地址—目前官方已经不在推荐使用它，而是建议使用label来替代

- RUN-构建镜像时运行的指令

- CMD-运行容器时执行的shell环境

- VOLUME-指定容器挂载点到宿主机自动生成的目录或其他容器

- USER-为RUN、CMD、和 ENTRYPOINT 执行命令指定运行用户

- WORKDIR-为 RUN、CMD、ENTRYPOINT、COPY 和 ADD 设置工作目录，就是切换目录

- HEALTHCHECH-健康检查

- ARG-构建时指定的一些参数

- EXPOSE-声明容器的服务端口（仅仅是声明）

- ENV-设置容器环境变量

- ADD-拷贝文件或目录到容器中，如果是URL或压缩包便会自动下载或自动解压

- COPY-拷贝文件或目录到容器中，跟ADD类似，但不具备自动下载或解压的功能

- ENTRYPOINT 运行容器时执行的shell命令

### 构建一个自己的镜像

我们之前看ubuntu的时候，发现有一个特殊的镜像

```dockerfile {1}
FROM scratch
ADD ubuntu-focal-oci-amd64-root.tar.gz /
CMD ["bash"]
```

在[官方文档](https://docs.docker.com/develop/develop-images/baseimages/)中，是这样说明的：

- 一个[父映像](https://docs.docker.com/glossary/#parent-image)是你的形象是基于图像。它指的是`FROM`Dockerfile 中指令的内容。Dockerfile 中的每个后续声明都会修改此父映像。大多数 Dockerfile 从父映像开始，而不是从基础映像开始。但是，这些术语有时可以互换使用。
- [基本图像](https://docs.docker.com/glossary/#base-image)具有`FROM scratch`在其Dockerfile。

也就是说，市面上百分之百的镜像都是依赖于它，它就相当于Java的Object类

例如：

PS：这样依旧安装不起vim 反正把run当做是bash命令即可

```dockerfile
# 指定基础镜像
FROM ubuntu
# 设置作者
MAINTAINER amayakite<amayakite@qq.com>

# 添加一些我们自己的内容
ENV mypath /usr/local
WORKDIR $mypath

# 构建时候的命令
# 先添加下依赖

RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse \n\
           deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse \n\
           deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse \n\
           deb http://mirrors.aliyun.com/ubuntu/ xenial-proposed main restricted universe multiverse \n\
           deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial-proposed main restricted universe multiverse \n\
           deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse \n'\
              > /etc/apt/sources.list
RUN ["apt-get", "update"]
RUN ["apt-get","install"," vim","-y"]

EXPOSE 663

CMD echo $mypath
CMD echo "---end---"
CMD /bin/bash
```

### 查看镜像的构成方式

非常简单 例如我想看nginx是怎么样构成的

```bash
docker history mysql
```

结果

```md
IMAGE          CREATED        CREATED BY                                      SIZE      COMMENT
0716d6ebcc1a   4 months ago   /bin/sh -c #(nop)  CMD ["mysqld"]               0B
<missing>      4 months ago   /bin/sh -c #(nop)  EXPOSE 3306 33060            0B
<missing>      4 months ago   /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B
<missing>      4 months ago   /bin/sh -c ln -s usr/local/bin/docker-entryp…   34B
<missing>      4 months ago   /bin/sh -c #(nop) COPY file:345a22fe55d3e678…   14.5kB
<missing>      4 months ago   /bin/sh -c #(nop) COPY dir:2e040acc386ebd23b…   1.12kB
<missing>      4 months ago   /bin/sh -c #(nop)  VOLUME [/var/lib/mysql]      0B
<missing>      4 months ago   /bin/sh -c {   echo mysql-community-server m…   378MB
<missing>      4 months ago   /bin/sh -c echo 'deb http://repo.mysql.com/a…   55B
<missing>      4 months ago   /bin/sh -c #(nop)  ENV MYSQL_VERSION=8.0.26-…   0B
<missing>      4 months ago   /bin/sh -c #(nop)  ENV MYSQL_MAJOR=8.0          0B
<missing>      4 months ago   /bin/sh -c set -ex;  key='A4A9406876FCBD3C45…   1.84kB
<missing>      4 months ago   /bin/sh -c apt-get update && apt-get install…   52.2MB
<missing>      4 months ago   /bin/sh -c mkdir /docker-entrypoint-initdb.d    0B
<missing>      4 months ago   /bin/sh -c set -eux;  savedAptMark="$(apt-ma…   4.17MB
<missing>      4 months ago   /bin/sh -c #(nop)  ENV GOSU_VERSION=1.12        0B
<missing>      4 months ago   /bin/sh -c apt-get update && apt-get install…   9.34MB
<missing>      4 months ago   /bin/sh -c groupadd -r mysql && useradd -r -…   329kB
<missing>      4 months ago   /bin/sh -c #(nop)  CMD ["bash"]                 0B
<missing>      4 months ago   /bin/sh -c #(nop) ADD file:4ff85d9f6aa246746…   69.3MB
```

### cmd和entrypoint的区别

例如：

```dockerfile
from ubuntu
cmd ["ls","-a"]
```

接着运行将会直接列出根路径下的所有内容

但是如果我想在运行的时候追加额外的参数

例如 这里是-a 我想

```bash
docker run xxx -l
```

你就会发现报错

但是替换成这样

```bash
docker run xx ls -al
```

将不会报错

RUN就是：我们在运行的时候输入的命令会替换掉其中的命令

但如果是entrypoint的话 则不会这样

docker run中的命令是直接替换CMD指定的命令与参数，使用ENTRYPOINT命令后，CMD指定的命令则是作为参数列表，作为ENTRYPOINT命令的参数使用

```dockerfile
from ubuntu
entrypoint ["ls","-a"]
```

你再运行

```bash
docker run xxx -l
```

就能完整的模拟出`ls -al`的效果

### ✨docker制作tomcat镜像

1. 准备文件：tomcat压缩包，jdk的压缩包
2. 准备dockerfile文件

首先下载java压缩包和tomcat压缩包

JDK：<https://www.oracle.com/java/technologies/downloads/>往下拉找到x64 Compressed Archive下载即可

Tomcat：<https://tomcat.apache.org/download-90.cgi>

然后传输到你的服务器上（创建好一个文件夹）

接着我们编写`DockerFIle`文件，记住这个名字 官方在build的时候会默认寻找这个文件

DockerFIle和那两个压缩包在同一个文件夹内

我这里最终是如下两个文件

![image-20220119174116464](/images/Java/SpringCloud/00-Docker/image-20220119174116464.png)

接着创建`Dockerfile`，然后编写其中的内容

```dockerfile
FROM ubuntu

MAINTAINER "Amayakite"

# 使用add命令添加文件会自动解压 这里第一个参数是文件名，相对路径
# 第二个参数是容器内的路径，解压后的文件将会存放至该路径下

# 添加jdk
ADD jdk-8u321-linux-x64.tar.gz /usr/local

# 添加tomcat
ADD apache-tomcat-9.0.56.tar.gz /usr/local

# 设置工作目录
ENV MYPATH=/usr/local
WORKDIR $MYPATH

# 设置JAva的工作目录 这里填写解压后的路径 jdk压缩包解压后默认是还有一个文件夹
# 里面是一个Java的版本号：例如:jdk1.8.0_111
ENV JAVA_HOME=/usr/local/jdk1.8.0_321

ENV CLASSSPATH=$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

# 配置tomcat目录
ENV CATALINA_HOME=/usr/local/apache-tomcat-9.0.56

# 设置tomcat的运行目录
ENV PATH=$PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

## 启动后暴露的端口
EXPOSE 8080

# 启动时运行的命令
CMD $CATALINA_HOME/bin/startup.sh && tail -F $CATALINA_HOME/logs/catalina.out

```

接下来运行构建命令

```bash
docker build -t mytomcat .
```

如果不出意外，你的控制台应该打印如下内容

![image-20220119180519935](/images/Java/SpringCloud/00-Docker/image-20220119180519935.png)

接下来你可以通过`docker images`看到你刚刚创建的镜像

![image-20220119180547179](/images/Java/SpringCloud/00-Docker/image-20220119180547179.png)

emm事后我发现事情并没有我想的那么简单

**下载的jdk无法自动解压**

于是乎我分别尝试了如下几种方式

使用OpenLogic的[JDK](https://www.openlogic.com/openjdk-downloads?field_java_parent_version_target_id=416&field_operating_system_target_id=426&field_architecture_target_id=391&field_java_package_target_id=396)

在下载的时候，我突然想到，阿里巴巴不是也有jdk来着，于是也尝试了下阿里巴巴的[JDK](https://github.com/alibaba/dragonwell8)

但是当我想要下载阿里巴巴的jdk的时候，那啥open啥啥啥的jdk下载好了，于是我就用上了它家的

```dockerfile
FROM ubuntu

MAINTAINER "Amayakite"

# 使用add命令添加文件会自动解压 这里第一个参数是文件名，相对路径
# 第二个参数是容器内的路径，解压后的文件将会存放至该路径下

# 添加jdk
ADD openlogic-openjdk-8u262-b10-linux-x64.tar.gz /usr/local

# 添加tomcat
ADD apache-tomcat-9.0.56.tar.gz /usr/local

# 设置工作目录
ENV MYPATH=/usr/local
WORKDIR $MYPATH

# 设置JAva的工作目录 这里填写解压后的路径 jdk压缩包解压后默认是还有一个文件夹
# 里面是一个Java的版本号：例如:jdk1.8.0_111
ENV JAVA_HOME=/usr/local/openlogic-openjdk-8u262-b10-linux-64

ENV CLASSSPATH=$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

# 配置tomcat目录
ENV CATALINA_HOME=/usr/local/apache-tomcat-9.0.56

# 设置tomcat的运行目录
ENV PATH=$PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

## 启动后暴露的端口
EXPOSE 8080



# 启动时运行的命令
CMD $CATALINA_HOME/bin/startup.sh && tail -F $CATALINA_HOME/logs/catalina.out

```

成功运行

![image-20220119193933882](/images/Java/SpringCloud/00-Docker/image-20220119193933882.png)

然后尝试访问（我这里开的映射是9001）

```bash
curl localhost:9001
```

成功获取到结果

![image-20220119194007032](/images/Java/SpringCloud/00-Docker/image-20220119194007032.png)

并且可以看到容器内都有内容了

![image-20220119194245470](/images/Java/SpringCloud/00-Docker/image-20220119194245470.png)

当然你也可以选择挂载卷之类的。。

### 发布自己的tomcat到dockerhub

1. 注册账号<https://hub.docker.com/>

2. 登陆账号

   1. ```bash
      docker login --help
      # 查看帮助一览
      ```

   2. 例如

   3. ```bash
      docker login -u youUserName -p youPassord
      ```

3. 提交

   - ```bash
     docker push --help
     ```

   - push的时候要带上自己的名字，上传的镜像名必须是【用户名/镜像名】，所以我们得重新构建一个镜像

   - ```bash
     docker build -t amayakite/diytomcat:1.0.0 .
     ```

   - 或者用重命名的方式

   - ```bash
     docker tag diytomcat amayakite/diytomcat:1.0.0
     ```

   - 然后push

   - ```bash
     docker push amayakite/diytomcat:1.0.0
     ```

   - 结果

   - ![image-20220119200457890](/images/Java/SpringCloud/00-Docker/image-20220119200457890.png)

   - 上传是比较慢的….因为人家是国外的服务器

   - 上传完毕后，是这样的

   - ![image-20220119200759277](/images/Java/SpringCloud/00-Docker/image-20220119200759277.png)

   - 然后你就能在自己的[Docker Hub](https://hub.docker.com/)上看到如下内容了

   - ![image-20220119200847859](/images/Java/SpringCloud/00-Docker/image-20220119200847859.png)

可以看到我们的镜像已经上传了(另外那个貌似是创建docker账号的时候自动创建的)

如果你要上传到阿里云或者腾讯云之类的地方的话，可以自行去他们官网上，一般都会要求创建命名空间，创建完毕后，会有详细的push教程

### docker打包容器

> 将容器保存成镜像

```bash
#语法：
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]

# 例如
docker commit -a "Amayakite" mytomcat  imagexxx:1.1.1
-a :提交的镜像作者；
-c :使用Dockerfile指令来创建镜像；
-m :提交时的说明文字；
-p :在commit时，将容器暂停。
imagexxx 是新创建的镜像的名字
```

>  将镜像打包成tar包

```bash
docker  save  -o xxx.tar  imagexxx1.1.1  # 当前路径下会生成一个xxx.tar
```

> 将tar包再次压缩为gz包

```bash
tar -zcvf xxx.tar.gz     xxx.tar    # 当前路径生成一个xxx.tar.gz压缩包
```

然后假设你在一台新的电脑上获取了这个tar.gz包并且想要使用它

> 解压缩得到tar包

````bash
tar -zxvf xxx.tar.gz
````

> 将tar包生成镜像

```bash
docke load < xxx.tar #生成的镜像信息和打包之前的一样
```

然后照常运行即可

## Docker网络

### Docker0网络

当你连接上服务器的时候，应该有注意到过这个玩意

![image-20220119212308383](/images/Java/SpringCloud/00-Docker/image-20220119212308383.png)

那么现在我有个问题，例如我有个mysql容器，映射了6000到本地，那么我能不能直接访问它的3306呢

接下来我进入我的mysql容器看看ip

```bash
docker exec -it mysql bash
cat /etc/hosts
```

结果如下

```bash
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.17.0.4      9f21f81da253
```

有个`172.17.0.4`比较令人在意，那么我尝试下本地ping下

![image-20220119214058287](/images/Java/SpringCloud/00-Docker/image-20220119214058287.png)

看来是可以的，也就是说我在容器外面也可以通过访问这个地址的3306来进行访问

换一种方式尝试，我开一个tomcat，映射本地9999

```bash
docker run -d -p 9999:8080 -name testTomcat tomcat
docker exec -it  testTomcat bash
rm -rf webapps && mv webapps.dist/ webapps
cat /etc/hosts


# Host结果为
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.17.0.5      b352b627f9c7
```

接下来退出容器，然后访问下这个`172.17.0.5:8080`试试

得到了html

![image-20220119214548354](/images/Java/SpringCloud/00-Docker/image-20220119214548354.png)

那么容器和容器之间是否可以ping通呢？答案是可以的，你可以自行尝试

docker0相当于网卡，同一个网段内是可以互相连接的

### 容器互联-link

好了，下面的话是你学完SpringCloud再过来学的了

我现在有两个服务，tomcat1和tomcat2，能否像在Spring Cloud中的那样(Fegin)，通过服务名来互相调用呢？

我们先给当前的Tomcat安装下ping之类的工具

```bash
mv /etc/apt/sources.list /etc/apt/sources.list.bak

cat <<EOF >/etc/apt/sources.list
deb http://mirrors.ustc.edu.cn/debian stable main contrib non-free
deb http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free
EOF
apt update
apt install iputils-ping
apt install net-tools
exit
# 然后打包成一个镜像
docker commit testTomcat mytomcat

# 然后运行两个
docker run -d -p 9001:8080 --name tomcat1 mytomcat
docker run -d -p 9002:8080 --name tomcat2 mytomcat

```

然后ping一下 是ping不通的

![image-20220119222108897](/images/Java/SpringCloud/00-Docker/image-20220119222108897.png)

所以Docker给我们提供了一个解决方案，link

```bash
docker run  -d -p 9003:8080 --link tomcat2 --name tomcat3 mytomcat
```

我们只需要在启动的时候，加一个link命令，指定要桥接的容器即可

接下来进入tomcat3

```bash
docker exec -it tomcat3 bash
ping tomcat2
```

可以发现ping通了

![image-20220119222336320](/images/Java/SpringCloud/00-Docker/image-20220119222336320.png)

但是此时，tomcat2可以ping通tomcat3吗？

实际上是不可以的….

因为我们没有配置tomcat2的link…

现在，我们来看下docker的网卡信息

```bash
 docker network ls
 # 结果
 NETWORK ID     NAME                DRIVER    SCOPE
2addf569c311   bridge              bridge    local
。。。。等一系列网卡信息
# 这里的bridge就是docker的基础网卡 我们来看看这个网卡的信息
 docker network  inspect bridge
```

可以发现你的全部网络，例如tomcat2和3

![image-20220119222915944](/images/Java/SpringCloud/00-Docker/image-20220119222915944.png)

那么看着两个的配置不用多说了

```bash
docker inspect tomcat3
```

可以看到，在它的`HostConfig`内，有一个配置

![image-20220119223715561](/images/Java/SpringCloud/00-Docker/image-20220119223715561.png)

但是在tomcat2中这个地方是没有东西的

并且你进入Tomcat3，可以在` /etc/hosts`看到

```bash
docker exec -it tomcat3 bash
cat /etc/hosts
```

![image-20220119223910780](/images/Java/SpringCloud/00-Docker/image-20220119223910780.png)

这里就是直接来了个转发，就像是windows的修改hosts文件那样，所以可以直接ping通

当然，现在完Docker已经不推荐用`--link`这个玩意了

因为docker0毕竟是官方默认的，使用过多容易造成混乱，并且不易维护

### 自定义网络-创建

创建

```bash
docker network create [OPTIONS] NETWORK
```

- OPtions参数如下

| 简参数,参数   | 默认   | 描述                                                                         |
| ------------- | ------ | ---------------------------------------------------------------------------- |
| --attachable  |        | API 1.25+启用手动容器附件                                                    |
| --aux-address |        | 网络驱动程序使用的辅助IPv4或IPv6地址                                         |
| --config-from |        | API 1.30+从中复制配置的网络                                                  |
| --config-only |        | API 1.30+创建仅配置网络                                                      |
| -d,--driver   | bridge | 驱动程序来管理网络                                                           |
| **--gateway** |        | **主子网的IPv4或IPv6网关**<br />这个相当于是暴露给主机的网络                 |
| --ingress     |        | API 1.29+创建群集路由网状网络                                                |
| --internal    |        | 限制外部访问网络                                                             |
| --ip-range    |        | 从子范围分配容器ip                                                           |
| --ipam-driver |        | IP地址管理驱动程序                                                           |
| --ipam-opt    |        | 设置IPAM驱动程序特定选项                                                     |
| --ipv6        |        | 启用IPv6网络                                                                 |
| --label       |        | 在网络上设置元数据                                                           |
| -o,--opt      |        | 设置驱动程序特定选项                                                         |
| --scope       |        | API 1.30+控制网络范围                                                        |
| **--subnet**  |        | **代表网段的CIDR格式的子网**<br />这个比较重要，也就是配置这个网卡的虚拟地址 |

我们接下来创建一个

```bash
docker network create --subnet 233.33.0.0/16 --gateway 233.33.0.1 mynet
# 这里的16代表双路啥啥啥的，反正最多能创建65535个子网，如果说这里写了24，那就只有255个
#貌似也指的是前面16位固定 不过无所谓 反正这玩意知道咋用就行
# 后面的表示主机能通过哪个地址来访问到这个网卡
```

然后就可以看到我们刚刚创建的网卡了

![image-20220119232745245](/images/Java/SpringCloud/00-Docker/image-20220119232745245.png)

之后，从`233.33.0.2`一直到`233.33.255.255`中都属于他

自此，我们的自定义网络就创建好了，你可以看看他的具体内容

```bash
docker network inspect  mynet
```

结果：

```json
[
    {
        "Name": "mynet",
        "Id": "39ac7d62a102c2b9eb7bd179119022942d3db33a317ed03530e0714ba5022cd7",
        "Created": "2022-01-19T23:27:03.473039445+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "233.33.0.0/16",
                    "Gateway": "233.33.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]
```

emm然后我尝试创建一个容器，桥接这个网卡

```bash
 docker run -d -p 9001:8080 --net mynet --name tomcat-net1 mytomcat
 # -net就是桥接网卡 不填写的话就是默认的那个东西
```

然后发现了如下异常

![image-20220119234052518](/images/Java/SpringCloud/00-Docker/image-20220119234052518.png)

大意就是网络地址不可用，没事，我们删掉重新创建一个1xx的

```bash
docker rm -fv tomcat-net1
docker network rm mynet
docker network create --subnet 160.1.0.0/16 --gateway 160.1.0.1 mynet
6503247b85489d8f7e8f68e69c62d9b7ea2632bcb31c56d441559caa288bb3b3
docker run -d -p 9001:8080 --net mynet --name tomcat-net1 mytomcat
```

![image-20220119234145202](/images/Java/SpringCloud/00-Docker/image-20220119234145202.png)

创建成功，再来创建一个2吧

```bash
docker run -d -p 9002:8080 --net mynet --name tomcat-net2 mytomcat
```

再来尝试ping一下，你就会发现神奇的事情

```bash
docker exec  -it tomcat-net1 ping tomcat-net2
```

![image-20220119234338393](/images/Java/SpringCloud/00-Docker/image-20220119234338393.png)

居然ping通了….

这就非常舒服了

原理就是这两个容器都是连的自定义网络，连接在同一个自定义网络的容器之间端口会自动相互暴露，而且不会向以外的显示任何端口，这样就更好的进行了容器见相互通信和隔离

### 网络连通

现在我们想把docker0和mynet之间也实现可以通过直接通过名字来访问的方式，又该怎么做呢？

也就是在docker0上面的tomcat1和tomcat2和在mynet上面的tomcat-net1和tomcat-net2如何通过名字来实现互相访问

也就是这样

![image-20220119234953131](/images/Java/SpringCloud/00-Docker/image-20220119234953131.png)

这个是想都不用想的，压根不可能的，所以说我们应该换一种想法

让在docekr0上面的容器能连接上mynet

![image-20220119235138175](/images/Java/SpringCloud/00-Docker/image-20220119235138175.png)

在`docker networ`中，有如下几个命令

```bash
Usage:  docker network COMMAND

Manage networks

Commands:
  connect     Connect a container to a network
  create      Create a network
  disconnect  Disconnect a container from a network
  inspect     Display detailed information on one or more networks
  ls          List networks
  prune       Remove all unused networks
  rm          Remove one or more networks

Run 'docker network COMMAND --help' for more information on a command.
```

其中第一个就是我们要用的：**将容器连接到网络**

看看他的参数

```bash
Usage:  docker network connect [OPTIONS] NETWORK CONTAINER

Connect a container to a network

Options:

# 为容器添加网络范围的别名
--alias strings           Add network-scoped alias for the container

#网络的驱动程序选项
--driver-opt strings      driver options for the network

#IPv4 地址（例如，172.30.100.104）
--ip string               IPv4 address (e.g., 172.30.100.104)

#IPv6 地址（例如，2001:db8::33） 
--ip6 string              IPv6 address (e.g., 2001:db8::33)

#添加到另一个容器的链接
--link list               Add link to another container

#为容器添加链接本地地址
--link-local-ip strings   Add a link-local address for the container

当然这些参数并不是最重要的，它的语句是这样的

docker network connect [OPTIONS] 网络 容器
```

所以我们只需要

```bash
docker network connect mynet tomcat1
```

运行之后，没有任何事情发生，但是我们这个时候尝试ping下

```bash
docker exec  -it tomcat1 ping tomcat-net1
```

![image-20220119235724607](/images/Java/SpringCloud/00-Docker/image-20220119235724607.png)

居然ping通了

那么如何解除呢？

依旧是看看network

```bash
Usage:  docker network COMMAND

Manage networks

Commands:
# 连接
  connect     Connect a container to a network
  # 创建
  create      Create a network
  # 解除连接
  disconnect  Disconnect a container from a network
  # 查看
  inspect     Display detailed information on one or more networks
  # 列表
  ls          List networks
  # 自动删除没人用的
  prune       Remove all unused networks
  # 指定删除
  rm          Remove one or more networks

Run 'docker network COMMAND --help' for more information on a command.
```

看看取消连接有哪些参数

```bash
Usage:  docker network disconnect [OPTIONS] NETWORK CONTAINER

Disconnect a container from a network

Options:
  -f, --force   Force the container to disconnect from a network 强制容器断开网络连接
```

所以我们只需要

```bash
docker network disconnect mynet tomcat1
```

然后再ping，就会发现ping不上了

![image-20220120000044659](/images/Java/SpringCloud/00-Docker/image-20220120000044659.png)

## Docker Compose

### 概述

我们现在配置Docker有三个步骤：

1. DockerFIle
2. Docker Build
3. Docker Run

这三步全都是手动操作，并且一次只能操作单个容器

但是假设我们现在有100个微服务，宕机了我们就要手动重启，非常麻烦，而他们之中还存在依赖关系，配置起来非常麻烦

Docker Compose就是来解决这个问题的，他可以轻松搞笑的管理容器，定义运行多个容器

根据它的[官方文档](https://docs.docker.com/compose/)中描述，可以得知，我们使用的话需要三步

1. 准备好`DockerFile`
2. 准备好一个`docker-compose.yml`
3. 运行`docker-compose up`

作用是：批量容器编排

Compose是Docker官方的开源项目，需要额外自行安装

`Dockerfile`让程序在任何地方可以运行web服务等，web服务、redis、mysql、nginx….多个容器

`docker-compose.yml`让这些容器可以一键部署

官方文档中这个yml的格式为

```yaml
version: "3.9"  # optional since v1.27.0
services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - .:/code
      - logvolume01:/var/log
    links:
      - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

这看起来就像是：image用了redis，然后volumes指定了挂在卷，然后定义了端口暴露..

Compose有两个重要的概念

- 服务Service：容器，应用(web/redis/mysql…)
- 项目Project，一组关联的容器

### Docker Compose的安装

参照官方文档<https://docs.docker.com/compose/install/>

文档中有git的命令，于是我去Compose的[仓库](https://github.com/docker/compose)看了看

我这里看的最新的是v2.2.3

你可以到这个链接里面去看看<https://github.com/docker/compose/releases>

> 后续补充：不建议用v2.0+的版本，有很多地方不太兼容
>
> 建议是用1.29.2
>
> ```bash
> sudo curl -L https://get.daocloud.io/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
> 
> # 或者另一个加速
> sudo curl -L "https://download.fastgit.org/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
> 
> sudo chmod +x /usr/local/bin/docker-compose
> ```
>
> 

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

当然，因为直接下载速度较慢，可以选择加速

```bash
sudo curl -L "https://github.91chi.fun//https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

我这里的话，比较块的加速还是这个<https://fastgit.org/>

这个加速的使用[教程](https://doc.fastgit.org/zh-cn/guide.html#web-%E7%9A%84%E4%BD%BF%E7%94%A8)

```bash
sudo curl -L "https://download.fastgit.org/docker/compose/releases/download/v2.2.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

以及daocloud的，看个人心情，反正加速的都可以用，最稳的就是这个daocloud

```bash
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.2.3/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

然后赋予可执行权限

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

然后测试

```bash
docker-compose --version
```

![image-20220120114317974](/images/Java/SpringCloud/00-Docker/image-20220120114317974.png)

当然 我们还可以使用Python-pip来进行安装

```bash
pip3 install docker-compose
```

或者你可以使用贴心的包管理来一键安装（并不推荐，版本有点旧）

```bash
sudo apt install docker-compose
```

### 使用

参考官方文档<https://docs.docker.com/compose/gettingstarted/>

先创建个文件夹

```bash
 mkdir composetest
 cd composetest
```

然后创建一个`app.py`

??貌似用到了redis

```bash
import time

# 导入redis
import redis
# 导入Flask  这类似于Java的SpringWeb
from flask import Flask

app = Flask(__name__)
# 监听redis
cache = redis.Redis(host='redis', port=6379)

# 一个方法 反正每次调用都是执行redis的一个自增
def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

# 访问根路径调用方法，并使用模板字符串渲染
@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
```

然后创建一个pip的`requirements.txt`

```text
flask
redis
```

然后编写一个DockerFile

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
```

- 从 Python 3.7 映像开始构建映像。
- 将工作目录设置为`/code`.
- 设置命令使用的环境变量`flask`。
- 安装 gcc 和其他依赖项
- 复制`requirements.txt`并安装 Python 依赖项。
- 向镜像添加元数据以描述容器正在侦听端口 5000
- 将项目中的当前目录复制`.`到镜像中的workdir `.`。
- 将容器的默认命令设置为`flask run`.

> 然后定义我们的service的yml：`docker-compose.yml`

```yaml
# 版本号
version: "3.9"
services:
 # 这里是使用DockerFile构建的镜像
  web:
  # 构建目录
    build: .
    # 暴露的端口
    ports:
      - "5000:5000"
  # 下面这里是使用了官方的redis的镜像
  redis:
    image: "redis:alpine"
```

然后只需要在当前文件夹下执行一条命令即可

```bash
docker-compose up
```

然后你就能看到如下内容

![image-20220120120148671](/images/Java/SpringCloud/00-Docker/image-20220120120148671.png)

最后一个下载可能会比较慢…

草，会非常非常的慢，尤其是那个gcc

所以说我们改动下脚本

![image-20220120124603233](/images/Java/SpringCloud/00-Docker/image-20220120124603233.png)

这行删掉，重新构建（或者你在那里自己指定代理）

然后你就能得到

![image-20220120124734036](/images/Java/SpringCloud/00-Docker/image-20220120124734036.png)

然后开下5000端口，外网访问下看看

![image-20220120124915265](/images/Java/SpringCloud/00-Docker/image-20220120124915265.png)

成功，然后尝试下退出

![image-20220120125100136](/images/Java/SpringCloud/00-Docker/image-20220120125100136.png)

然后您能得到这两个镜像

![image-20220120125230085](/images/Java/SpringCloud/00-Docker/image-20220120125230085.png)

并且在docker images里面多了一个内容

![image-20220120125354954](/images/Java/SpringCloud/00-Docker/image-20220120125354954.png)

并且，我们看看network

![image-20220120131325324](/images/Java/SpringCloud/00-Docker/image-20220120131325324.png)

可以看到，多出了一个网络，也就是说我们部署的容器都是可以互通的

### Compose常用命令一览

注意 以下命令都是要cd到指定文件夹下才行

> 普通运行

```bash
docker-compose up
```

> 后台运行

```bash
docker-compose up -d
```

> 一次性运行

```bash
docker-compose run
```

> 查看正在运行的容器(通过Compose构建的)

```bash
docker-compose ps
```

> 结束服务

```bash
docker-compose stop
```

> 完全关闭、删除容器，并且删除对应的数据卷

```bash
docker-compose down --volumes
```

## Compose文件编写规则

参照官方文档<https://docs.docker.com/compose/compose-file/>

### version约定

表示这个Compose文件支持哪些指定的Docker版本

一般来说现在都是写3.9

| 版本号                | 对应的Docker版本 |
| :-------------------- | :--------------- |
| Compose specification | 19.03.0+         |
| 3.8                   | 19.03.0+         |
| 3.7                   | 18.06.0+         |
| 3.6                   | 18.02.0+         |
| 3.5                   | 17.12.0+         |
| 3.4                   | 17.09.0+         |
| 3.3                   | 17.06.0+         |
| 3.2                   | 17.04.0+         |
| 3.1                   | 1.13.1+          |
| 3.0                   | 1.13.0+          |
| 2.4                   | 17.12.0+         |
| 2.3                   | 17.06.0+         |
| 2.2                   | 1.13.0+          |
| 2.1                   | 1.12.0+          |
| 2.0                   | 1.10.0+          |

### Compose-Service

详细的可以去看[官方文档](https://docs.docker.com/compose/compose-file/compose-file-v3/#service-configuration-reference)

或者这篇[博客](https://blog.csdn.net/qq_36148847/article/details/79427878)（这篇博客比较齐全）

反正总共就三层概念

```yaml
version: "版本号"
service: #服务
	服务1: web
		images
		build
		network
		....
    服务2: redis。。。
    服务3: redis。。。
# 其他配置：网络、数据卷、全局规则
volumes: 
networks:
configs: 
```

### 编写一个WordPress博客

随便创建一个文件夹，然后创建一个docker-compose.yml

```yaml
version: '3.1'

services:

  wordpress:
  # 使用镜像
    image: wordpress
    # 是否自动启动
    restart: always
    # 容器端口
    ports:
      - 8080:80
    # 容器环境变量
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb
    # 挂载的数据卷
    volumes:
      - wordpress:/var/www/html

  db:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
    volumes:
      - db:/var/lib/mysql

volumes:
  wordpress:
  db:
```

然后启动

```bash
docker-compose up
```

然后就行了

删除：

```bash
docker-compose down --volumes
```











