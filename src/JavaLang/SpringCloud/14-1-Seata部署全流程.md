---
title: 14-1-Seata部署全流程
date: 2022-1-14 12:13:30
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Alibaba
- Seata
---

## 先说总结

除非万不得已，不然千万别用本地配置..非常多的BUG

## 数据库准备（服务端）

```sql
create database seata;
use seata;
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_status` (`status`),
    KEY `idx_branch_id` (`branch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `distributed_lock`
(
    `lock_key`       CHAR(20) NOT NULL,
    `lock_value`     VARCHAR(20) NOT NULL,
    `expire`         BIGINT,
    primary key (`lock_key`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('AsyncCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryCommitting', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('RetryRollbacking', ' ', 0);
INSERT INTO `distributed_lock` (lock_key, lock_value, expire) VALUES ('TxTimeoutCheck', ' ', 0);
```



## 服务端搭建(Server)-本地

虽然是本地，但是通讯还是要用到Nacos

### registry.conf

```ini
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa 这里必须选择nacos
  type = "nacos"
  nacos {
    application = "seata-server"
    serverAddr = "myserver:8435"
    group = "SEATA_GROUP"
    namespace = "029fa2f3-e90a-400c-91ac-7f1b83dc4785"
    # 注意这玩意 非常重要 你最终的成败都在cluster上边
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = 0
    password = ""
    cluster = "default"
    timeout = 0
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
  }
  consul {
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
  etcd3 {
    cluster = "default"
    serverAddr = "http://localhost:2379"
  }
  sofa {
    serverAddr = "127.0.0.1:9603"
    application = "default"
    region = "DEFAULT_ZONE"
    datacenter = "DefaultDataCenter"
    cluster = "default"
    group = "SEATA_GROUP"
    addressWaitTime = "3000"
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3 这里选择file，读取本地文件
  type = "file"

  nacos {
    serverAddr = "myserver:8435"
    namespace = "029fa2f3-e90a-400c-91ac-7f1b83dc4785"
    group = "SEATA_GROUP"
    username = "nacos"
    password = "nacos"
    dataId = "seataServer.properties"
  }
  consul {
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
  apollo {
    appId = "seata-server"
    ## apolloConfigService will cover apolloMeta
    apolloMeta = "http://192.168.1.204:8801"
    apolloConfigService = "http://192.168.1.204:8080"
    namespace = "application"
    apolloAccesskeySecret = ""
    cluster = "seata"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
    nodePath = "/seata/seata.properties"
  }
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
  file {
    name = "file.conf"
  }
}

```

### file.conf

```ini
# 传输模块 这个不用管 直接用即可
transport {
    # tcp, unix-domain-socket
    type = "TCP"
    #NIO, NATIVE
    server = "NIO"
    #enable heartbeat
    heartbeat = true
    # the client batch send request enable
    enableClientBatchSendRequest = false
    #thread factory for netty
    threadFactory {
        bossThreadPrefix = "NettyBoss"
        workerThreadPrefix = "NettyServerNIOWorker"
        serverExecutorThreadPrefix = "NettyServerBizHandler"
        shareBossWorker = false
        clientSelectorThreadPrefix = "NettyClientSelector"
        clientSelectorThreadSize = 1
        clientWorkerThreadPrefix = "NettyClientWorkerThread"
        # netty boss thread size
        bossThreadSize = 1
        #auto default pin or 8
        workerThreadSize = "default"
    }
    shutdown {
        # when destroy server, wait seconds
        wait = 3
    }
    serialization = "seata"
    compressor = "none"
}
# 这里是指定service 一定要配置
service {
    # 这个是事务分组 开始是使用了一个默认的 这里要改成自己的 这里随便取一个名字就可以了，顺手就行
   vgroupMapping.default_tx_group = "default"
   # 可以配置多个
   vgroupMapping.seata-order-service-tx_group="default"
   vgroupMapping.seata-account-service-tx_group="default"
   vgroupMapping.seata-storage-service-tx_group="default"
    # TC服务列表 这个不用管，仅注册中心为file时使用
    default.grouplist = "127.0.0.1:8091"
    enableDegrade = false
    # 全局事务开关 默认false。false为开启，true为关闭
    disableGlobalTransaction = false
}
# 下面这里也是固定操作 不用管
client {
    rm {
        asyncCommitBufferLimit = 10000
        lock.retryInterval = 10
        lock.retryTimes = 30
        lock.retryPolicyBranchRollbackOnConflict = true
        reportRetryCount = 5
        tableMetaCheckEnable = false
        tableMetaCheckerInterval = 60000
        sqlParserType = druid
        reportSuccessEnable = false
        sagaBranchRegisterEnable = false
    }
    tm {
        commitRetryCount = 5
        rollbackRetryCount = 5
        defaultGlobalTransactionTimeout = 60000
        degradeCheck = false
        degradeCheckAllowTimes = 10
        degradeCheckPeriod = 2000

    }
}


## transaction log store, only used in seata-server
store {
    ## store mode: file、db、redis 这里是让你选择存储模式，db就是mysql，file就是文件，redis就是用redis来存储数据
    mode = "db"
    ## rsa decryption public key 这里是公钥之类的配置 先不管
    publicKey = ""
    ## file store property
    file {
        ## store location dir
        dir = "sessionStore"
        # branch session size , if exceeded first try compress lockkey, still exceeded throws exceptions
        maxBranchSessionSize = 16384
        # globe session size , if exceeded throws exceptions
        maxGlobalSessionSize = 512
        # file buffer size , if exceeded allocate new buffer
        fileWriteBufferCacheSize = 16384
        # when recover batch read size
        sessionReloadReadSize = 100
        # async, sync
        flushDiskMode = async
    }

    ## database store property 我们上面选择了DB，所以这里要配置一些基本的连接信息
    db {
        ## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp)/HikariDataSource(hikari) etc.
        datasource = "druid"
        ## mysql/oracle/postgresql/h2/oceanbase etc.
        dbType = "mysql"
        # 注意 这里如果你用的是mysql8以下的话 要com.mysql.jdbc.Driver 否则 com.mysql.cj.jdbc.Driver
        driverClassName = "com.mysql.cj.jdbc.Driver"
        ## if using mysql to store the data, recommend add rewriteBatchedStatements=true in jdbc connection param
        url = "jdbc:mysql://localhost:3306/seata?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&rewriteBatchedStatements=true&&serverTimezone=UTC"
        user = "root"
        password = "123456"
        minConn = 5
        maxConn = 100
        globalTable = "global_table"
        branchTable = "branch_table"
        lockTable = "lock_table"
        queryLimit = 100
        maxWait = 5000
    }

    ## redis store property
    redis {
        ## redis mode: single、sentinel
        mode = "single"
        ## single mode property
        single {
            host = "127.0.0.1"
            port = "6379"
        }
        ## sentinel mode property
        sentinel {
            masterName = ""
            ## such as "10.28.235.65:26379,10.28.235.65:26380,10.28.235.65:26381"
            sentinelHosts = ""
        }
        password = ""
        database = "0"
        minConn = 1
        maxConn = 10
        maxTotal = 100
        queryLimit = 100
    }
}
## server configuration, only used in server side 下面都是固定配置 一般不用管
server {
    recovery {
        #schedule committing retry period in milliseconds
        committingRetryPeriod = 1000
        #schedule asyn committing retry period in milliseconds
        asynCommittingRetryPeriod = 1000
        #schedule rollbacking retry period in milliseconds
        rollbackingRetryPeriod = 1000
        #schedule timeout retry period in milliseconds
        timeoutRetryPeriod = 1000
    }
    undo {
        logSaveDays = 7
        #schedule delete expired undo_log in milliseconds
        logDeletePeriod = 86400000
    }
    #check auth
    enableCheckAuth = true
    #unit ms,s,m,h,d represents milliseconds, seconds, minutes, hours, days, default permanent
    maxCommitRetryTimeout = "-1"
    maxRollbackRetryTimeout = "-1"
    rollbackRetryTimeoutUnlockEnable = false
    retryDeadThreshold = 130000
}


## metrics configuration, only used in server side
metrics {
    enabled = false
    registryType = "compact"
    # multi exporters use comma divided
    exporterList = "prometheus"
    exporterPrometheusPort = 9898
}

```

## 服务端搭建(Server)-Nacos

### registry.conf

```ini
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"
  nacos {
    application = "seata-server"
    serverAddr = "myserver:8435"
    group = "SEATA_GROUP"
    # 这里的命名空间要提前到nacos内创建好
    namespace = "029fa2f3-e90a-400c-91ac-7f1b83dc4785"
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = 0
    password = ""
    cluster = "default"
    timeout = 0
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
  }
  consul {
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
  etcd3 {
    cluster = "default"
    serverAddr = "http://localhost:2379"
  }
  sofa {
    serverAddr = "127.0.0.1:9603"
    application = "default"
    region = "DEFAULT_ZONE"
    datacenter = "DefaultDataCenter"
    cluster = "default"
    group = "SEATA_GROUP"
    addressWaitTime = "3000"
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"

  nacos {
    serverAddr = "myserver:8435"
    # 这里和上面用同样的
    namespace = "029fa2f3-e90a-400c-91ac-7f1b83dc4785"
    group = "SEATA_GROUP"
    username = "nacos"
    password = "nacos"
    dataId = "seataServer.properties"
  }
  consul {
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
  apollo {
    appId = "seata-server"
    ## apolloConfigService will cover apolloMeta
    apolloMeta = "http://192.168.1.204:8801"
    apolloConfigService = "http://192.168.1.204:8080"
    namespace = "application"
    apolloAccesskeySecret = ""
    cluster = "seata"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
    nodePath = "/seata/seata.properties"
  }
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
  file {
    name = "file.conf"
  }
}

```

### 文件上传到Nacos的脚本

因为官方的有问题，所以用这一版的

```python
#!/usr/bin/env python3
#  -*- coding: UTF-8 -*-

import http.client
import sys
import getopt as opts
import urllib.parse
import re


# 下面这个params填写你响应的信息 第一个是ip 第二个是端口 第三个是命名空间 第四个是分组 其余的是账号密码
def get_params() -> dict:
    params = {
        '-h': 'myserver',
        '-p': '8435',
        '-t': '029fa2f3-e90a-400c-91ac-7f1b83dc4785',
        '-g': 'SEATA_GROUP',
        '-u': 'nacos',
        '-w': 'nacos'
    }
    inputs, args = opts.getopt(sys.argv[1:], shortopts='h:p:t:g:u:w:')
    for k, v in inputs:
        params[k] = v
    print(params)
    return params

def error_exit():
    print('python nacos-config.py [-h host] [-p port] [-t tenant] [-g group] [-u username] [-w password]')
    exit()

def get_pair(line: str) -> tuple:
    res = re.match(r"([\.\w-]+)=(.*)",line)
    return res.groups() if res is not None else ['','']


headers = {
    'content-type': "application/x-www-form-urlencoded"
}

hasError = False

params = get_params()

url_prefix = f"{params['-h']}:{params['-p']}"
tenant = params['-t']
username = params['-u']
password = params['-w']
group = params['-g']
url_postfix_base = f'/nacos/v1/cs/configs?group={group}&tenant={tenant}'

if username != '' and password != '':
    url_postfix_base += f'&username={username}&password={password}'

if url_prefix == ':':
    error_exit()

for line in open('../config.txt'):
    pair = get_pair(line.rstrip("\n"))
    print(pair)
    if len(pair) < 2 or pair[0] == '' or pair[1] == '':
        continue
    url_postfix = url_postfix_base + f'&dataId={urllib.parse.quote(str(pair[0]))}&content={urllib.parse.quote(str(pair[1])).strip()}'
    conn = http.client.HTTPConnection(url_prefix)
    conn.request("POST", url_postfix, headers=headers)
    res = conn.getresponse()
    data = res.read().decode("utf-8")
    if data != "true":
        hasError = True
    print(f"{pair[0]}={pair[1]} {data if hasError else 'success'}")

if hasError:
    print("init nacos config fail.")
else:
    print("init nacos config finished, please start seata-server.")
```

### 上传的内容准备

```properties
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.enableClientBatchSendRequest=false
transport.threadFactory.bossThreadPrefix=NettyBoss
transport.threadFactory.workerThreadPrefix=NettyServerNIOWorker
transport.threadFactory.serverExecutorThreadPrefix=NettyServerBizHandler
transport.threadFactory.shareBossWorker=false
transport.threadFactory.clientSelectorThreadPrefix=NettyClientSelector
transport.threadFactory.clientSelectorThreadSize=1
transport.threadFactory.clientWorkerThreadPrefix=NettyClientWorkerThread
transport.threadFactory.bossThreadSize=1
transport.threadFactory.workerThreadSize=default
transport.shutdown.wait=3
# 这里可以配置多个 这条注释记得删了
service.vgroupMapping.my_test_tx_group=default
service.vgroupMapping.seata-order-service-tx_group=default
service.vgroupMapping.seata-account-service-tx_group=default
service.vgroupMapping.seata-storage-service-tx_group=default
service.default.grouplist=127.0.0.1:8091
service.enableDegrade=false
service.disableGlobalTransaction=false
client.rm.asyncCommitBufferLimit=10000
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
client.rm.lock.retryPolicyBranchRollbackOnConflict=true
client.rm.reportRetryCount=5
client.rm.tableMetaCheckEnable=false
client.rm.tableMetaCheckerInterval=60000
client.rm.sqlParserType=druid
client.rm.reportSuccessEnable=false
client.rm.sagaBranchRegisterEnable=false
client.tm.commitRetryCount=5
client.tm.rollbackRetryCount=5
client.tm.defaultGlobalTransactionTimeout=60000
client.tm.degradeCheck=false
client.tm.degradeCheckAllowTimes=10
client.tm.degradeCheckPeriod=2000
# 配置数据源和对应的驱动 这条注释记得删了
store.mode=db
store.publicKey=
store.file.dir=file_store/data
store.file.maxBranchSessionSize=16384
store.file.maxGlobalSessionSize=512
store.file.fileWriteBufferCacheSize=16384
store.file.flushDiskMode=async
store.file.sessionReloadReadSize=100
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://localhost:3306/seata?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&rewriteBatchedStatements=true&&serverTimezone=UTC
store.db.user=root
store.db.password=123456
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000
store.redis.mode=single
store.redis.single.host=127.0.0.1
store.redis.single.port=6379
store.redis.sentinel.masterName=
store.redis.sentinel.sentinelHosts=
store.redis.maxConn=10
store.redis.minConn=1
store.redis.maxTotal=100
store.redis.database=0
store.redis.password=
store.redis.queryLimit=100
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackRetryTimeoutUnlockEnable=false
client.undo.dataValidation=true
client.undo.logSerialization=jackson
client.undo.onlyCareUpdateColumns=true
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000
client.undo.logTable=undo_log
client.undo.compress.enable=true
client.undo.compress.type=zip
client.undo.compress.threshold=64k
log.exceptionRate=100
transport.serialization=seata
transport.compressor=none
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
```

## 数据库准备（客户端）

最终应该和业务库再一个库内

![image-20220114225612986](/images/Java/SpringCloud/14-1-Seata部署全流程/image-20220114225612986.png)

如果有多个业务库 需要分别创建

![image-20220114225637546](/images/Java/SpringCloud/14-1-Seata部署全流程/image-20220114225637546.png)

```sql
-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT       NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT ='AT transaction mode undo table';
```

## 客户端

### 依赖

```xml
<properties>
    <seata.version>1.4.2</seata.version>
</properties>
<dependencies>
    <!--        这里是参考官方文档，引入和我们使用的seata server相同版本的seata 替换掉spring-cloud-alibaba-seata自带的-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
        <exclusions>
            <exclusion>
                <artifactId>seata-all</artifactId>
                <groupId>io.seata</groupId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>io.seata</groupId>
        <artifactId>seata-all</artifactId>
        <version>${seata.version}</version>
    </dependency>


    <!--        Nacos-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>

    <!--        微服务之间的调用-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-loadbalancer</artifactId>
    </dependency>


    <!--        基本组件-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>

    <!--        自己的api-->
    <dependency>
        <groupId>org.example</groupId>
        <artifactId>cloud-api-commons</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>


</dependencies>

```

### 配置文件

```yaml
server:
  port: 2001
spring:
  application:
    name: seata-order-service
  cloud:
    nacos:
      discovery:
        server-addr: myserver:8435
        username: nacos
        password: nacos
        # 这里的命名空间无所谓 填啥都可以 跟seata没关系
 #       namespace: 029fa2f3-e90a-400c-91ac-7f1b83dc4785
  #    alibaba:
  #      seata:
  # 老版本要用这种方式开启（0.9.x） 新版本直接用下面那种
  #        tx-service-group: ${spring.application.name}-tx_group
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/seata_order?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&rewriteBatchedStatements=true&&serverTimezone=UTC
# 这里是开下log记录下回滚
logging:
  level:
    io:
      seata: info
seata:
  # 这里配置应用程序ID，和我们当前服务在Nacos注册的一致
  application-id: ${spring.application.name}
  # 这里是选择分组 和之前在file.conf内注册的service一致（我之前注册的是seata-order-service-tx_group=default ）
  tx-service-group: ${spring.application.name}-tx_group
  service:
    vgroup-mapping:
      # 这里 是配置分组和服务的映射关系 我们之前把之前写的seata-order-service-tx_group=default搬过来就行
      seata-order-service-tx_group: default
  # 配置通讯
  registry:
    # 下面这里 配置我们在seata-server内配置的内容即可
    type: nacos
    nacos:
      application: seata-server
      server-addr: ${spring.cloud.nacos.discovery.server-addr}
      group: "SEATA_GROUP"
      namespace: "029fa2f3-e90a-400c-91ac-7f1b83dc4785"
      username: "nacos"
      password: "nacos"

# 杂项
mybatis-plus:
  mapper-locations: classpath*:/mapper/**/*.xml
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
feign:
  client:
    config:
      default:
        #建立连接所用的时间，适用于网络状况正常的情况下，两端连接所需要的时间
        ConnectTimeOut: 5000
        #指建立连接后从服务端读取到可用资源所用的时间 这里是为了等下分布式事务做准备
        ReadTimeOut: 5000


```

### 主启动类关闭自动加载数据库

```java {1}
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
@EnableFeignClients
@EnableDiscoveryClient
@MapperScan(value = "com.Project.mapper")
public class OrderService2001Application {
    public static void main(String[] args) {
        SpringApplication.run(OrderService2001Application.class, args);
    }
}
```

### 自定义数据源

```java
package com.Project.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.transaction.SpringManagedTransactionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;

/**
 * @author Amayakite
 * @version 1.0.0
 * @date 2022/1/13 21:54
 * @description 自定义数据源
 * @since 1.8
 */
@Configuration
public class DataSourceProxyConfig {
    @Value("${mybatis-plus.mapper-locations}")
    private String mapperLocations;

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
        return new DruidDataSource();
    }

    @Bean
    public SqlSessionFactory sqlSessionFactoryBean(DataSource dataSource) throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactoryBean = new MybatisSqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver()
                .getResources(mapperLocations));
        sqlSessionFactoryBean.setTransactionFactory(new SpringManagedTransactionFactory());
        return sqlSessionFactoryBean.getObject();
    }

}

```



### 使用

在需要开分布式的方法上加个注解即可

```java {23}
@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Resource
    OrderMapper orderMapper;

    @Resource
    AccountService accountService;

    @Resource
    StorageService storageService;


    private static final Integer SUCCESS_CODE = 200;

    /**
     * 创建订单-》调用库存扣减库存-》调用账户服务扣减账户余额-》修改订单状态
     * 444 ERR 200 Success
     *
     * @param order
     */
    @GlobalTransactional(name = "fsp-create-order", rollbackFor = Exception.class)
    @Override
    public String create(TOrder order) {
        log.info("开始新建订单");
       orderMapper.create(order);
        log.info("orderID:{}", order.getId());
//        TODO
        log.info("订单微服务开始调用库存微服务进行扣减---START");
        CommonResult<Integer> decrease = storageService.decrease(order.getProductId(), order.getCount());
        if (decrease.getCode().equals(SUCCESS_CODE)) {
            log.info("订单微服务开始调用库存微服务进行扣减----END");
            log.info("订单微服务开始调用账户微服务进行扣减---START");
            CommonResult<Integer> decreaseMoney = accountService.decrease(order.getUserId(), order.getMoney());
            if (decreaseMoney.getCode().equals(SUCCESS_CODE)) {
                log.info("订单微服务开始调用账户微服务进行扣减----END");
                log.info("订单微服务开始更新订单状态---START");
                orderMapper.update(order.getUserId(), 0);
                log.info("订单微服务开始更新订单状态----END");
                log.info("下订单结束了 O(∩_∩)O哈哈~");
                return "下订单成功";
            }
            return "账户扣减失败";
        }
        return "库存扣减失败";
    }
}

```



