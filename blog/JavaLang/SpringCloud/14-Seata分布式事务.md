---
title: 14-Seata分布式事务
date: 2022-1-12 22:07:51
category: 分布式-微服务
tag:
- 微服务
- Spring Cloud Alibaba
- Seata
- SpringCloud
---

## 概述

这玩意我在使用的时候经历了一天的在配置上找BUG，如此感叹：不愧是马云家的玩意儿！对于其配置的怪异程度远远超出了我的想象

我们实际上使用数据库不单单是一对一，还有可能

![image-20220112224744828](/images/SpringCloud/14-Seata分布式事务/image-20220112224744828.png)

一对一，一对多，多对多之间的数据同步性

这就是分布式事务（单机没有这种问题）

![image-20220112224841410](/images/SpringCloud/14-Seata分布式事务/image-20220112224841410.png)

![image-20220112224919602](/images/SpringCloud/14-Seata分布式事务/image-20220112224919602.png)

为此，就要用到阿里开发的Seata了

官网：<https://seata.io/zh-cn/>

在正式开始前，有几个术语需要了解下

1. `Translation ID XID`：全局唯一事务ID
2. 三组件概念
   - TC (Transaction Coordinator) - 事务协调者
     - 维护全局和分支事务的状态，驱动全局事务提交或回滚。
     - 也就是协调开启全局事务的提交或者回滚
   - TM (Transaction Manager) - 事务管理器
     - 定义全局事务的范围：开始全局事务、提交或回滚全局事务。
     - 也就是控制全局事务的边界，负责开启一个事务和发起最终全局提交或者全局回滚的决议
   - RM (Resource Manager) - 资源管理器
     - 管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。
3. 以上两点面试百分之七十会问

处理过程如图所示



![img](/images/SpringCloud/14-Seata分布式事务/TB1rDpkJAvoK1RjSZPfXXXPKFXa-794-478.png)

执行步骤：

1. TM向TC申请开启一个全局事务，全局事务创建成功会生成一个全局唯一的XID
2. XID在微服务调用链路的上下文进行传播
3. RM向TC注册分支事务，将其纳入XID对应全局事务的管辖
4. TM对TC发起针对XID的全局提交或者回滚协议
5. TC调度XID下管辖的全部分支事务完成提交或回滚请求

人话

> 把着整个玩意看成一个班级，TC就是班主任，TM就是上课的老师
>
> - 现在上课的老师向班主任申请开启一个网络讲堂，班主任同意后就去网络上建一个QQ群
> - 这个QQ群就相当于是XID，在学生之间传播
> - 学生要进网络课堂，需要先在班主任那登记，报备对应信息（网课开摄像头）
> - 老师向班主任发起让所有人打卡的需求
> - 班主任收到后，通过QQ群通知已经报备的所有人进行上课打卡
>
> 就是这样

## Seata的下载和安装

### 下载

到[这里](https://seata.io/zh-cn/blog/download.html)或者GitHub上下载即可，我的选择到[GitHub](https://github,com/seata/seata/release)上

已经有半年多没有更新了hhh

![image-20220112235620331](/images/SpringCloud/14-Seata分布式事务/image-20220112235620331.png)

下载好后怎么用？

- 本地@Translation
- 全局@GlobalTranslation

两个注解就完了

![image-20220113000401578](/images/SpringCloud/14-Seata分布式事务/image-20220113000401578.png)

下载解压后，我们能得到这些文件

![image-20220113000552374](/images/SpringCloud/14-Seata分布式事务/image-20220113000552374.png)



## Seata-Server的配置及启动

先说下，这玩意是配置超级痛苦，使用非常舒服的…所以配置时间会大于编码时间



我这里的Seata是1.4，参考[这篇](https://blog.csdn.net/zhang18024666607/article/details/113118599)配置文章 具体自己版本的可以在百度上搜`seata 1.x`来

然后如果是`1.x`之前的话，可以看[视频](https://www.bilibili.com/video/BV18E411x7eT?p=140)来配置

配置的第一步，是看官方文档<https://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html>

最终我参考的文章是[这篇](https://blog.csdn.net/weixin_43831049/article/details/117446071)和[这篇](https://blog.csdn.net/zhang18024666607/article/details/113118599)，并且成功配置启动成功

Seata分TC、TM和RM三个角色，TC（Server端）为单独服务端部署，TM和RM（Client端）由业务系统集成。

- TC--班主任
- TM-上课老师
- RM-学生

### 相关SQL脚本的链接

注意 我这里是1.4.2，不同的版本，对应的脚本链接也不同

链接<https://github.com/seata/seata/tree/1.4.2/script>

——–后续补充：1.3+的一律用默认分支的脚本：<https://github.com/seata/seata/tree/develop/script>，不然出大问题

你可以根据你正在使用的版本，将上面链接改成指定的地址

首先是Server端，我的脚本链接为<https://github.com/seata/seata/blob/develop/script/server/db>

内容为

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
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

然后是client端，对应的脚本链接为：<https://github.com/seata/seata/tree/develop/script/client>

对应的脚本内容为

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

### registry.conf

我们这里用的是Nacos，所以修改registry.conf的注册中心和配置中心为nacos

注意这两个namespace，等下要用到

```ini {3,5-13,59,61-68}
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "myserver:8435"
    group = "SEATA_GROUP"
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

### config.conf

接着，我们想要seata的内容存放在mysql内，所以要修改`conf/file.conf`这个文件

注意，这个文件原本并没有啥内容，主要是参照这着同级目录下的另一个文件`file.conf.example`来进行修改

我们这里主要做了三件事

1. 自定义事务组名称
2. 事务存储模式为db
3. 数据库连接信息

```ini {4,24-42}
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
    # 不过一般来说，我们的值都要以 tx_group结尾，例如aaa_tx_group
    vgroupMapping {
        seata_samples_tx_group = "fsp_tx_group"
    }
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

### 导入脚本到sql、配置nacos

我们之前指定了`jdbc:mysql://127.0.0.1:3306/seata`这个数据库，所以要先配置下

```sql
-- -------------------------------- The script used when storeMode is 'db' --------------------------------
-- the table to store GlobalSession data
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

然后我们在nacos中新建一个命名空间

![image-20220113133626909](/images/SpringCloud/14-Seata分布式事务/image-20220113133626909.png)

这里唯一id填写我们刚刚生成的，或者你也可以让他自己生成，回头我们再写入到那啥里面

### 配置脚本导入数据到nacos

这一步是将我们的配置数据转为远程存储，如果说你不需要的话 可以略过，直接到下一步（registry.conf的那两个type要改回file）

我们到这里<https://github.com/seata/seata/tree/1.4.2/script/config-center> 后续补充：别点这个链接，点下面那个

注意 这个config.txt要下载下来

![image-20220113134813184](/images/SpringCloud/14-Seata分布式事务/image-20220113134813184.png)

> 后续补充：**千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本千万不要用自己版本分支的脚本**
>
> **用默认分支的脚本，不然百分之一万会出错**
>
> 默认分支的脚本<https://github.com/seata/seata/tree/develop/script/config-center>

这里，我们在nacos-server内新建一个script文件夹，然后这个文件夹内的路径应该如下所示

```md
script
├── config.txt
└── nacos
    ├── nacos-config.py
    └── nacos-config.sh
```

接着，修改config.txt的内容，它里面的内容是properties语法

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
# 这里是分布式事务组的配置 默认是default
service.vgroupMapping.my_test_tx_group=fsp_tx_group
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
# 修改db配置为我们之前的配置 这个注释要删掉
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
# 注意这里的包名  这个注释要删掉
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

接着我们运行脚本，需要加参数

推荐使用sh，但如果你的nacos中的用户名和密码还是默认的nacos的话 可以使用py

sh脚本的使用：

```shell
-h nacos地址
-p 端口
-t 命名空间不写默认public
-u 用户名
-w 密码

sh nacos-config.sh -h myserver -p 8435 -g SEATA_GROUP -t 029fa2f3-e90a-400c-91ac-7f1b83dc4785 -u nacos -w nacos
```

Py脚本同理

接着，你就可以在你的nacos内看到如下配置

![image-20220113141356702](/images/SpringCloud/14-Seata分布式事务/image-20220113141356702.png)

### 启动Seata

我们接着到bin目录中启动服务端

![image-20220113133058737](/images/SpringCloud/14-Seata分布式事务/image-20220113133058737.png)

支持的参数  这些会覆盖掉我们配置的内容

```md
-h: 注册到注册中心的ip
-p: Server rpc 监听端口 也就是seata监听的端口
-m: 全局事务会话信息存储模式，file、db、redis，优先读取启动参数 (Seata-Server 1.3及以上版本支持redis)
-n: Server node，多个Server时，需区分各自节点，用于生成不同区间的transactionId，以免冲突
-e: 多环境配置参考 http://seata.io/en-us/docs/ops/multi-configuration-isolation.html
```

这个一般我们指定下端口即可

当然 我选择三个全都要

```sh
.\seata-server.bat -p 8366 -h 192.168.1.1 -m db
```

如果说你能看到最后端口号冒出来了，表示成功

```md
15:38:19.557  INFO --- [                     main] io.seata.config.FileConfiguration        : The file name of the operation is registry
15:38:19.562  INFO --- [                     main] io.seata.config.FileConfiguration        : The configuration file used is D:\java_Program\seata-server-1.4.2\conf\registry.conf
15:38:22.158  INFO --- [                     main] com.alibaba.druid.pool.DruidDataSource   : {dataSource-1} inited
15:38:22.970  INFO --- [                     main] i.s.core.rpc.netty.NettyServerBootstrap  : Server started, listen port: 8366
```

如果说没有冒出来，**表示你的registry内的nacos之类的信息没有配置正确**，要仔细检查下

如果说你始终不成功的话

![image-20220113165743916](/images/SpringCloud/14-Seata分布式事务/image-20220113165743916.png)

把这里面的sql版本换成你自己的即可

然后你就能在nacos的服务列表内看到它了

![image-20220113142831087](/images/SpringCloud/14-Seata分布式事务/image-20220113142831087.png)

### 使用本地文件和使用Nacos内容的区别

如果你要指定是本地文件还是Nacos文件，只需要在`registry.conf`内指定两个属性即可

registry.type是指定我们要把服务注册到哪

config.type是我们从哪里读取配置文件（从哪里读conig.conf）

## Seata的分布式事务解决方案

### 订单、库存、账户数据库的准备

这里就懒得说了，随便找个数据库

![image-20220113171026035](/images/SpringCloud/14-Seata分布式事务/image-20220113171026035.png)

![image-20220113171938191](/images/SpringCloud/14-Seata分布式事务/image-20220113171938191.png)

```sql
CREATE DATABASE seata_order;
USE seata_order;
CREATE TABLE t_order(
    id BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    user_id BIGINT(11) DEFAULT NULL COMMENT '用户id',
    product_id BIGINT(11) DEFAULT NULL COMMENT '产品id',
    count INT(11) DEFAULT NULL COMMENT '数量',
    money DECIMAL(11,0) DEFAULT NULL COMMENT '金额',
    status INT(1) DEFAULT NULL COMMENT '订单状态：0创建中，1已完结'
)ENGINE=InnoDB AUTO_INCREMENT=7 CHARSET=utf8;
CREATE DATABASE seata_storage;
USE seata_storage;
CREATE TABLE t_storage(
    id BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    product_id BIGINT(11) DEFAULT NULL COMMENT '产品id',
    total INT(11) DEFAULT NULL COMMENT '总库存',
    used INT(11) DEFAULT NULL COMMENT '已用库存',
    residue INT(11) DEFAULT NULL COMMENT '剩余库存'
)ENGINE=InnoDB AUTO_INCREMENT=7 CHARSET=utf8;
INSERT INTO t_storage(id, product_id, total, used, residue) VALUES(1,1,100,0,100);
CREATE DATABASE seata_account;
USE seata_account;
CREATE TABLE t_account(
    id BIGINT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    user_id BIGINT(11) DEFAULT NULL COMMENT '用户id',
    total DECIMAL(10,0) DEFAULT NULL COMMENT '总额度',
    used DECIMAL(10,0) DEFAULT NULL COMMENT '已用额度',
    residue DECIMAL(10,0) DEFAULT 0 COMMENT '剩余可用额度'
)ENGINE=InnoDB AUTO_INCREMENT=7 CHARSET=utf8;
INSERT INTO t_account(id, user_id, total, used, residue) VALUES(1,1,1000,0,1000);
```

我们最终建立好的库为

![image-20220113172101572](/images/SpringCloud/14-Seata分布式事务/image-20220113172101572.png)



别以为这样就完了。。。还有一步，在三个库下分别建立对应的日志回滚表，日志回滚表都是一套模板的，Seata提供的，链接:<https://github.com/seata/seata/blob/develop/script/client/at/db/mysql.sql>

```sql
USE seata_order;
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
  USE seata_storage;
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
  USE seata_account;
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

最终结构

![image-20220113172656263](/images/SpringCloud/14-Seata分布式事务/image-20220113172656263.png)

### 业务需求梳理

1. 下订单
2. 减库存
3. 扣余额
4. 改订单状态
   1. 如果支持成功，订单表的状态应该变为1，已完成

### 公共模块

cloud-api-commons，用于统一各个地方的返回值以及公共类的存放，防止等下乱了

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>cn.hutool</groupId>
        <artifactId>hutool-all</artifactId>
        <version>5.7.18</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
    </dependency>
</dependencies>
```

然后新建包project.domain

```java
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonResult<T> {
    private Integer code;
    private String message;
    private T data;

    public CommonResult(Integer code, String message) {
        this(code, message, null);
    }
}
```

订单类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TAccount implements Serializable {
    /**
     * 唯一ID
     */
    private Long id;

    /**
     * 用户id
     */
    private Long user_id;

    /**
     * 总额度
     */
    private Integer total;

    /**
     * 已用额度
     */
    private Integer used;

    /**
     * 剩余可用额度
     */
    private Integer residue;

    private static final long serialVersionUID = 1L;

}
```

库存类：

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TStorage implements Serializable {
    /**
     * 唯一ID
     */
    private Long id;

    /**
     * 产品id
     */
    private Long product_id;

    /**
     * 总库存
     */
    private Integer total;

    /**
     * 已用库存
     */
    private Integer used;

    /**
     * 剩余库存
     */
    private Integer residue;

    private static final long serialVersionUID = 1L;


}
```

账户类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TAccount implements Serializable {
    /**
     * 唯一ID
     */
    private Long id;

    /**
     * 用户id
     */
    private Long user_id;

    /**
     * 总额度
     */
    private Integer total;

    /**
     * 已用额度
     */
    private Integer used;

    /**
     * 剩余可用额度
     */
    private Integer residue;

    private static final long serialVersionUID = 1L;

}
```

## 相关模块的准备

三个模块同理

![image-20220114183253532](/images/SpringCloud/14-Seata分布式事务/image-20220114183253532.png)

最终我们想要的是： 创建订单-》调用库存扣减库存-》调用账户服务扣减账户余额-》修改订单状态

这样一个效果

这里我省略库存和账户服务的构建，那里面就是非常简单的CRUD，只保留订单的创建过程

名称为：`seata-order-service-2001`

### 依赖引入

seata固定死了是三个依赖，不要多也不要少，不然都会报错（DEBUG了两天的我如此说道）

```xml
<properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
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
        <artifactId>seata-spring-boot-starter</artifactId>
        <version>${seata.version}</version>
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

### 配置文件的准备

务必按照这套模板来做

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
        namespace: 029fa2f3-e90a-400c-91ac-7f1b83dc4785
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

### 准备对应的Mapper

我们的Mapper需要这样

```java
@Mapper
public interface OrderMapper {

    /**
     * 创建订单
     *
     * @param order
     */
    void create(TOrder order);

    /**
     * 修改订单状态
     *
     * @param userId 用户ID
     * @param status 订单状态：0未完成 1 已完成
     */
    void update(@Param("userID") Long userId, @Param("status") Integer status);


}
```

然后是手动写xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.Project.mapper.OrderMapper">

    <resultMap id="BaseResultMapper" type="project.domain.TOrder">
        <id column="id" property="id" jdbcType="BIGINT"/>
        <result column="user_id" property="userId" jdbcType="BIGINT"/>
        <result column="product_id" property="productId" jdbcType="BIGINT"/>
        <result column="count" property="count" jdbcType="INTEGER"/>
        <result column="money" property="money" jdbcType="DECIMAL"/>
        <result column="status" property="status" jdbcType="INTEGER"/>
    </resultMap>



    <insert id="create" >
        insert into seata_order.t_order(id, user_id, product_id, count, money, status)
        values (null, #{userId}, #{productId}, #{count}, #{money}, 0)
    </insert>
    <update id="update">
        update seata_order.t_order
        set status = 1
        where user_id = #{userID}
          and status = #{status}
    </update>
</mapper>
```

### 准备Service

> 首先是我们的订单service，用于创建订单

```java
public interface OrderService {
    String create(TOrder order);
}
```

接着因为我们之后还会调用另外两个模块的对应方法，这里先定义好FeginService来

> 账户模块的接口

```java
@Service
@FeignClient("seata-account-service")
public interface AccountService {
    /**
     * 扣减账户余额
     * @param userId 用户id
     * @param money 金额
     * @return 返回一个CommonResult 如果修改成功，那么其data值等于传入的money
     */
    @PostMapping("/account/decrease")
    CommonResult<Integer> decrease(@RequestParam("userId") Long userId, @RequestParam("money") BigDecimal money);

}

```

> 库存模块的接口

```java
@Service
@FeignClient("seata-storage-service")
public interface StorageService {

    /**
     * 扣减指定数量的商品
     *
     * @param productId 商品ID
     * @param count     数量
     * @return 返回一个CommonResult 如果修改成功，那么其data值等于传入的count
     */
    @PostMapping("/storage/decrease")
    CommonResult<Integer> decrease(@RequestParam("productId") Long productId, @RequestParam("count") Integer count);

}
```

> 接着是我们订单模块的实现类，这里一定要知道自己这个业务是如何走的

```java
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
     * 返回444 ERR  200 Success
     *
     * @param order
     */
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

### 取消数据库自动配置-自定义数据库代理配置

我们要给数据库设定一个代理才能在等下正常的使用

首先是main方法中，要加上排除数据库的自动配置

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

然后编写一个配置类，自己来配置数据库的数据源 这都是固定写法 以后直接搬过去就行

```java
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

### 测试

我刚刚完成了一个模块 还有两个模块，如果你有兴趣就自己搭建

最终应该是

![image-20220114193507737](/images/SpringCloud/14-Seata分布式事务/image-20220114193507737.png)

2001调用2002，2002 调用结束后，2001再调用2003

我这里也省略测试了，直接run是跑得通的

但是如果我们此时在2003的业务方法上加上一个延迟

```java {10-14}
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountMapper accountMapper;


    @Override
    public CommonResult<Integer> decrease(Long userId, BigDecimal money) {
        try {
            TimeUnit.SECONDS.sleep(20);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Integer decrease = accountMapper.decrease(userId, money);
        if (decrease == null || decrease < 1) {
            return new CommonResult<>(444, "扣款失败", decrease);
        }
        return new CommonResult<>(200, "扣款成功", decrease);
    }
}

```

总所周知，之前我们在2001内设置过了超时时间为5s，这样做无异于直接那啥了

所以说运行起来是绝对会报错的

我们再来捋一捋思路：

1. 下订单，标记status为0
2. 减库存
3. 扣钱
4. 标记status为1

如果说在减库存之后的扣钱的地方或者在最后标记之前出了问题，就会导致

- 库存减了
- 钱减了
- status没有标记为1

## 使用@GlobalTransaction解决问题

之前就说过，实际上我们使用起来非常简单

我们只需要在我们最开始的2001的业务类内加上一个注解就行

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
    // 这个GlobalTransactional的名称随便取 还记得之前我们的基本概念吗
    // TC 这个就是我们的seata服务器
    // TM 就是这个注解 整个事务的发起人
    // RM 就是我们的三个数据库 
   // 所以这个name就是这次事务的名称，取啥都行，保证全局唯一即可
    // 然后这个rollbackFor 表示发生什么异常将会触发回滚 我们这里直接那啥捕获全部异常
    // 当然 这样的话就是直接抛异常给客户了，所以我们之后可以在COntroller内添加对应的降级规则
    // 这个@GlobalTransactional不止接收这几个参数 还能接受别的，具体可以看源码，例如可以排除指定异常
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

接下来你测试下 一定是出了错误后 数据库已经进行的所有操作都恢复没操作之前的，具体我这里就不演示了

## 简单的原理解析

### 基本流程

> Seata是蚂蚁金服的产物，所以说值得信赖
>
> 你可能会问，它是不是有…没错，GTS(**G**lobal**T**ran**s**actional的缩写)是阿里推出的服付费项目，有非常好的集群之类的玩意

它的整体三组件，可以用一张图概括

![image-20220114195801910](/images/SpringCloud/14-Seata分布式事务/image-20220114195801910.png)

它的执行流程为：

1. TM开启分布式事务（TM向TC注册全局事务记录）
2. 按业务场景，编排数据库，服务等事务内资源（RM向TC汇报资源准备状态）
3. TM结束分布式事务，事务一阶段结束（TM通知TC来提交/回滚事务）
4. TC汇总事务，决定分布式事务是提交还是回滚
5. TC通知所有RM提交/回滚资源，事务二阶段结束

### AT模式

官方文档中是这样说的

> Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。

这几个模式没啥好说的，反正用AT即可

![image-20220114200431812](/images/SpringCloud/14-Seata分布式事务/image-20220114200431812.png)

当然，阿里云主推的GTS比AT强非常多

![image-20220114200812457](/images/SpringCloud/14-Seata分布式事务/image-20220114200812457.png)

这句话代表着啥呢？

就是我们每一个操作，都会记录在

![image-20220114200719502](/images/SpringCloud/14-Seata分布式事务/image-20220114200719502.png)

这个表中，然后统一的，在这些表中提现

![image-20220114200742919](/images/SpringCloud/14-Seata分布式事务/image-20220114200742919.png)

它总共分为三个阶段

![image-20220114200854020](/images/SpringCloud/14-Seata分布式事务/image-20220114200854020.png)

这就相当于Spring的AOP：前置通知和后置通知

![image-20220114201148826](/images/SpringCloud/14-Seata分布式事务/image-20220114201148826.png)



然后是三阶段

![image-20220114201348572](/images/SpringCloud/14-Seata分布式事务/image-20220114201348572.png)

![image-20220114201355998](/images/SpringCloud/14-Seata分布式事务/image-20220114201355998.png)

可能你会说 啥都没有看到

DEBUG一下就看得到了hhh

先打个断点

![image-20220114201716474](/images/SpringCloud/14-Seata分布式事务/image-20220114201716474.png)

然后你就能在你的seata库内看到内容

![image-20220114201731704](/images/SpringCloud/14-Seata分布式事务/image-20220114201731704.png)

出现了三个ID

我们可以看到中间的 XID 三个一模一样 并且 规则都是相同的这就是我们全局的事务ID（TM的ID）

然后左边的是分支ID，三个都不相同

最终是这样的，我们的xid加上这个分支id来决定我们的全部内容

并且你还可以在这后面看到他们所有的详细内容

![image-20220114202011787](/images/SpringCloud/14-Seata分布式事务/image-20220114202011787.png)

接下来我们看看其他表的情况

![image-20220114202053947](/images/SpringCloud/14-Seata分布式事务/image-20220114202053947.png)

首先看订单表 他这个undo_log就多出了一些内容

首先第二个和第三个 和之前的一样 分支id和全局事务id，我们主要看后面的

![image-20220114202214494](/images/SpringCloud/14-Seata分布式事务/image-20220114202214494.png)

rollback_info 这又是个啥玩意?

![image-20220114202308873](/images/SpringCloud/14-Seata分布式事务/image-20220114202308873.png)

把他提取出来后 可以看到两个 一个beforeImage 一个afterImage

也就是我们在执行前和执行后的内容，都被封装成了一个内部类 保存在内存中

接着我们回过头来看看原理

![image-20220114202448744](/images/SpringCloud/14-Seata分布式事务/image-20220114202448744.png)

就相当于是这样的

![image-20220114202606699](/images/SpringCloud/14-Seata分布式事务/image-20220114202606699.png)

我们在执行业务之前 都先哪一个小本本记录下当前的状态 执行完毕后同理

那么操作之后如果成功了倒没啥，如果失败了就要进行反补

反补又是什么呢？

我们前面做了insert 它就会执行delete

我们前面做了update 它就会执行方向update回退

我们也知道 它是有一两个镜像来记录我们修改之前的值和修改之后的值，所以说他们将会直接用镜像内的内容来进行修改

> 当然 这之前还有一个验证脏写的过程：对比当前数据库内的数据和存放的afterImage内的数据，如果结果一致，就直接进行反补
>
> 如果说不一样 那就…需要转人工处理
>
> ![image-20220114203246779](/images/SpringCloud/14-Seata分布式事务/image-20220114203246779.png)

我们的前置数据和后置数据都在镜像内存储的明明白白的

![image-20220114203435775](/images/SpringCloud/14-Seata分布式事务/image-20220114203435775.png)

然后我们再来看看这张表

![image-20220114203540728](/images/SpringCloud/14-Seata分布式事务/image-20220114203540728.png)

这里的内容就是一个xid 非常明显，就是我们的@GlobalTransaction发起的

然后还有一个lock表

![image-20220114203617419](/images/SpringCloud/14-Seata分布式事务/image-20220114203617419.png)

能非常直观的看到，这里把我们的三张表全给锁了

接着你取消debug之后，全部内容都没了，也印证了官方文档的那句话

![image-20220114203827692](/images/SpringCloud/14-Seata分布式事务/image-20220114203827692.png)

所以最终的流程为

![image-20220114203955251](/images/SpringCloud/14-Seata分布式事务/image-20220114203955251.png)

![image-20220114204036254](/images/SpringCloud/14-Seata分布式事务/image-20220114204036254.png)

代理数据源：就是我们自己配置的@bean之类的

