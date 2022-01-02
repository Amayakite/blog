---
title: 21-Mysql
date: 2021-11-21 21:56:18
category: JavaSE
tags:
 - Java
 - JavaSE
 - Mysql
---

## 基本介绍

​  数据库嘛，懂得都懂，在我学习Java之前，已经接触过Mysql了，并使用Nodejs、Koa、Vue3、ElementUI搭建了一个个人博客，使用的数据库就是Mysql，当然在学习Java之前Mysql为我存取了超多的图片：

![image-20211119220054247](/images/JavaSE/21-MySql/image-20211119220054247.png)

​  这大概是爬取了三天的结果，共在数据库内简历了八千多条索引，也就是说我以后能够随意调用这些数据hhhh~

​  总之，Mysql中最为核心的就是CRUP(增删改查)，其中最重要的就是查，实际项目中往往绝大部分项目都是存在sql数据库中，例如：网页的sabbar，网页的菜单，用户的信息，用户的发言，用户所拥有的东西等等

​  这里开始，学的也只是基础，Mysql后面还得学些更深入的玩意...

​  好了，言归正传，当你访问淘宝，京东，天猫，微信等相关软件或者网页时，是否发现每次退出，再次登陆时，你的订单，聊天等信息依旧还存在

​  又或者说，你电脑上的原神卸载了，重装回来后，再次登陆账号后，你账号上的所有角色和物品依旧存在

​  这之中就是Mysql的功劳----它存储了你的所有信息，当你访问到相关的网站、软件、服务时，对方的后台搜索到你的数据并返回给你

​  可能这样说有点抽象，举一个生活化的案例说明---> 如果说，图书馆是保存书籍的，那么数据库就是保存数据的

​  可能你会这样想，我现在正在用着Excel来存储数据，再不济也可以用txt文件啊之类的文件来保存数据，为什么要用Mysql

​  但是，假设现在有一千万条不重样的数据，我要你快速的读取或者写入或者在这些数据中查找某个符合条件的值，使用Excel.....一千万条数据可能连软件都打不开，使用普通的txt之类的文件，本人有幸试过（一个密码字典），可以说打开慢，查询慢，完全不符合我的使用需求

​  但是使用数据库的话，这些烦恼就没有了，我可能快速的增删改查，不过目前我还不好说，等过完一遍后大概就能知道它有多顺手了

## Mysql的安装

### Windows

Windows下的安装教程可以直接去看[老韩的视频](https://www.bilibili.com/video/BV1fh411y7R8?p=732&t=1.5)，讲的比较细，根据他的操作下来走一遍就可以使用了，Mysql的[下载地址](https://dev.mysql.com/downloads/mysql/)，根据他的视频下来操作一遍即可

![image-20211119224623277](/images/JavaSE/21-MySql/image-20211119224623277.png)

小TIps：在配置`my.ini`的过程中，字符集`default-character-set`可以选择设置为`utf8mb4`

为啥呢？比方说想在sql里存放🐂🐏子类的表情，utf-8是存放不进去的，因为这类表情占用四个字符...

#### 个人Windows安装流程

1. [下载](https://dev.mysql.com/downloads/mysql/)到包，并解压

2. 到解压目录，创建配置文件my.ini

   ```ini
   [mysqld] 
   # 设置mysql的安装目录，也就是刚才我们解压的目录 这里要么用正斜杠/，要么用\\双反斜杠
   basedir=C:/mysql-8.0.13-winx64
   # 设置mysql数据库的数据的存放目录
   datadir=C:/mysql-8.0.13-winx64/data
   # 设置默认使用的端口
   port=3306
   # 允许最大连接数
   max_connections=200
   # 允许连接失败的次数。这是为了防止有人试图攻击数据库
   max_connect_errors=10
   # 服务端使用的字符集
   character-set-server=utf8mb4
   # 数据库字符集对应一些排序等规则使用的字符集
   collation-server=utf8mb4_general_ci
   # 创建新表时将使用的默认存储引擎
   default-storage-engine=INNODB
   # 默认使用“mysql_native_password”插件作为认证加密方式
   # MySQL8.0默认认证加密方式为caching_sha2_password
   default_authentication_plugin=mysql_native_password
    
   [mysql]
   # 设置mysql客户端默认字符集
   default-character-set=utf8mb4
    
   [client]
   default-character-set=utf8mb4
   port=3306
   ```

3. 进入到`bin`目录，以管理员方式打开`powerShell`或者`Cmd`

   1. 安装服务

      ```powershell
      ./mysqld.exe install 
      ```

   2. 初始化：

      ```powershell
      ./mysqld.exe --initialize --console
      ```

   3. 等待初始化完毕后，会在最后打印出默认的root账户密码，把密码先记下来，格式大概是这样的：
      `root@localhost:dS8hTh)u?hAl`，其中`dS8hTh)u?hAl`就是初始密码

   4. 注意 这一步密码中可能会带有空格，别复制多了..

4. 接下来修改默认初始密码

   1. 依旧是在`bin`目录中的powershell或者cmd

      ```powershell
      mysql -uroot -p
      # 然后会提示要求输入root的密码，输入上一步中获取到的即可
      ```

   2. 修改密码

      - 首先输入`use mysql;`

      - 然后看下有没有出现一条消息

        - 如果发现屏幕中有这样的消息：You must reset your password using ALTER USER statement before executing this statement.

          - ```sql
            alter user 'root'@'localhost' identified by '要改成的密码';
            ```

        - 如果没有：

          - ```sql
            update user set authentication_string=password('要改成的密码') where user ='root' and Host='localhost';
            ```

      - 修改完毕后：

        - ```sql
          # 刷新权限
          flush privileges;
          ```

5. 添加系统变量

   1. 复制`bin`目录路径打开环境变量配置，配置当前用户的Path，添加该路径，关闭所有的cmd再重新打开即可

相关关闭启动命令：

```powershell
#启动服务
net start mysql
#关闭服务
net stop mysql
#进入mysql
mysql -uroot -p
```

##### 卸载mysql

<https://www.cnblogs.com/zhaosq/p/10469848.html>

<https://blog.csdn.net/weixin_29348211/article/details/113163856>

两篇文章的操作都跟着做下，然后把path中的相关信息删除即可

### Linux

因为我只用Ubuntu系统，所以只放出Ubuntu系统的安装方式，若要用其他系统自行百度

```shell
#安装
sudo apt update
sudo apt install mysql-server
# 初始化Mysql
sudo mysql_secure_installation
# 这里会要求进行相关配置，第一个是密码，其他的自己看着整，建议是跟着翻译来进行操作
# https://blog.csdn.net/weixx3/article/details/94133847/ 也可以参照这篇文章

#检查Mysql运行状态
systemctl status mysql.service

#如果不是运行状态的话（active不是running）：启动mysql
sudo service mysql start 

#停止mysql
sudo service mysql stop

#重启mysql
sudo service mysql restart

#刷新权限
flush privileges;

```

修改字符集为utf8mb4:

```shell
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
```

```ini
# 注意 是修改 若原先只有[mysql]，则覆盖，其余情况参照windows安装一览的写法写
[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-server=utf8mb4
character-set-client-handshake = FALSE
collation-server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'
```

然后重启mysql，进入mysql插入搜索验证：

```sql
# 查看字符集
SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
# 如果说发现还有utf8的字样：
set character_set_client =utf8mb4;
set character_set_results = utf8mb4;
set character_set_connection = utf8mb4;
# 或者 SET NAMES utf8mb4; 就可以修改client编码
SET NAMES utf8mb4;
# 最终结果大概是这样的
+--------------------------+--------------------+
| Variable_name            | Value              |
+--------------------------+--------------------+
| character_set_client     | utf8mb4            |
| character_set_connection | utf8mb4            |
| character_set_database   | utf8mb4            |
| character_set_filesystem | binary             |
| character_set_results    | utf8mb4            |
| character_set_server     | utf8mb4            |
| character_set_system     | utf8mb3            |
| collation_connection     | utf8mb4_unicode_ci |
| collation_database       | utf8mb4_unicode_ci |
| collation_server         | utf8mb4_unicode_ci |
+--------------------------+--------------------+
```

配置远程访问：

```shell
sudo mysql -uroot -p
#然后输入密码进入mysql
```

```sql
# 原先是这样的
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY "123456";

# 注意'root'@'localhost' 均有单引号，其余的也是

# 要设置成这样
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY "想设置成的密码";
#其中root@localhos，localhost就是本地访问，配置成%就是所有主机都可连接；
#第二个'123456'为你给新增权限用户设置的密码，%代表所有主机，也可以是具体的ip；
#不过这随设置了%但我root通过工具还是登陆不进去，可能是为了安全性，所以新建数据库和用户；


#或者指定用户：
#用root用户新建数据和用作远程访问的用户
##1 创建数据库weixx
CREATE DATABASE weixx;
##2 创建用户wxx(密码654321) 并允许wxx用户可以从任意机器上登入mysql的weixx数据库
GRANT ALL PRIVILEGES ON weixx.* TO 'wxx'@'%' IDENTIFIED BY "654321"; 

#刷新权限
flush privileges;
```

详细的配置外网连接可以看[这篇文章](https://blog.csdn.net/weixx3/article/details/80782479)，尤其是其评论区

#### 卸载和重装Mysql

先通过[这篇文章1](https://blog.csdn.net/fanrongwoaini/article/details/107518693)的操作走一遍删除，再通过[这篇文章2](https://www.cnblogs.com/zhangxuel1ang/p/13456116.html)的操作走一遍删除，然后回到文章1进行安装

### Docker

我还是更喜欢用Docker

```shell
docker pull mysql@版本号
# 不指定版本的话默认是最新
```

创建并运行容器

```shell
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

这里注意一下，最好不要加-d参数。-d表示后台执行，就不能看到初始化数据库过程，这个过程可能有一会儿，没经过初始化数据库不能启动服务的。

![img](/images/JavaSE/21-MySql/1704051-20200703164942350-177162620.png)

出现这条记录就说明安装成功，可以把这个控制台关掉，重新开一个

```shell
docker start mysql
```

进入bash

```shell
docker exec -it mysql bash
mysql -uroot -p
```

添加远程登录用户

```sql
CREATE USER '账户名'@'%' IDENTIFIED WITH mysql_native_password BY '密码'; 

#或者
##1 创建数据库weixx
CREATE DATABASE weixx;
##2 创建用户wxx(密码654321) 并允许wxx用户可以从任意机器上登入mysql的weixx数据库
GRANT ALL PRIVILEGES ON weixx.* TO 'wxx'@'%' IDENTIFIED BY "654321"; 
#刷新权限
flush privileges;

exit;
```

重启

```shell
service mysql restart
```

设置字符集的方式：和Linux中一致：个人建议使用图形化方式操作

![image-20211119233159061](/images/JavaSE/21-MySql/image-20211119233159061.png)

```ini
[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-server=utf8mb4
character-set-client-handshake = FALSE
collation-server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'
```

配置完毕后，重启mysql

```shell
docker restart mysql
```

## Mysql的基本使用

连接到任意的mysql数据库的指令

```shell
mysql -h 主机IP -P 端口 -u 用户名 -p密码
#小写的p和密码不要有空格
#如果-p时没跟密码，回车后会要求输入密码
#演示：
mysql -h localhost -P 3306 -u root -p123456

#当然默认的情况下前两个参数分别是 localhost 和 3306
mysql -uroot -p123456

```

当然默认情况下，在实际使用过程中，都会将Mysql的默认端口改成别的，如53146（3306容易被黑客攻击）

### 使用图形化管理软件来操作Mysql

[NaviCat](https://www.navicat.com.cn/products)应该是目前为止最好的Mysql管理软件，虽然贵，但是超好用

当然，贴心的[链接](https://github.com/gitccl/Navicat-key)也是不可少的

[SQlyog](https://github.com/webyog/sqlyog-community/wiki/Downloads)也不错，社区版本免费试用

他们两的功能都大同小异

....然后这太基础的地方（图形化创建db，图形化创建table，图形化insert数据）就不过多赘述了，可以去[老韩的视频](https://www.bilibili.com/video/BV1fh411y7R8?p=734&t=0.9)看看，我选择性撰写，他的视频中视频的是SqlYog

​  图形化的好处是方便直观的查看数据，但是在实际使用过程中，插入数据之类的过程一般都是才用命令模式插入（配合相关语言的相关库），试想一下，假设现在你要管理一千个用户的信息，每个用户的信息你都想要手动录入，那岂不是...

​  以后在Java程序中也是通过指令来操作数据库的，这里放下老韩视频中基本的操作：

```sql
#Create database
create database db02;
use db02;
#Create table
create table users(
 id int primary key,
    name varchar(255) not null,
    address varchar(255) not null
);
#insert values
insert into users values(1,"张三","北京");
insert into users values(2,"李四","天津");
insert into users values(3,"王老五","南京");
#search 
select * from users;
```

​  当然，无论你是否感觉到了图形化界面的好处，我都建议你----还是用回命令行开打的那个mysql进行操作，因为实际过程中大部分的操作都是由sql语句来完成的，比如上面的那些。

​  所以使用命令行来操作是一个好习惯。（同时可以有效的降低一丢丢面试不通过的概率）

### Mysql的结构

![image-20211120135003148](/images/JavaSE/21-MySql/image-20211120135003148.png)

![image-20211120135054472](/images/JavaSE/21-MySql/image-20211120135054472.png)

![image-20211120135239889](/images/JavaSE/21-MySql/image-20211120135239889.png)

## SQL语句分类

- DDL:数据定义语句:`create`表，库...
- DML:数据库操作语句:
  - 增加`insert`
  - 修改`update`
  - 删除`delete`
- DQL:数据库的查询语句`select` 查询时需指定哪个数据库
  - 比如指定db1的user:`select * from db1.user`
- DCL:数据库控制语句-管理数据库
  - 给用户授权`grant`
  - 取消对用户的授权`revoke`

## 数据库的相关操作

### 创建数据库

语法：`CREATE DATABASE [可选：IF NOT EXITS] 数据库名 [可选 CHARACTER SET] [可选 COLLATE]`

```sql
# 创建一个默认类型的数据库
CREATE DATABASE db1;
# 创建一个数据库，如果已存在，就不创建 不存在则创建
CREATE DATABASE IF NOT EXISTS db1;

# 创建一个数据库，并指定字符集为utf-8;
CREATE DATABASE if NOT EXISTS db2 CHARACTER SET utf8;

# 创建一个数据库，并指定字符集为utf-8,校验规则为区分大小写utf8_bin
CREATE DATABASE if NOT EXISTS db3 CHARACTER SET utf8 COLLATE utf8_bin;

# 通常来说，创建数据库的时候，为了规避关键字，都会使用反引号包裹名字
create database `select`;
```

`CHARACTER SET`:指定数据库采用的字符集，如果不指定字符集，默认为配置数据库时设置的字符集(utf8或者utf8mb4)

`COLLATE`:指定数据库的校验规则，无论是哪种字符集，排序规则的名字都是大同小异的，utf-8默认为`utf8_general_ci`，下面举几个常用的

|      名称       |                        特点                         |
| :-------------: | :-------------------------------------------------: |
| utf8_general_ci |       校对速度快，但准确度稍差，不区分大小写        |
| utf8_general_cs |        校对速度快，但准确度稍差，区分大小写         |
| utf8_unicode_ci |       准确度高，但校对速度稍慢，不区分大小写        |
|    utf8_bin     | 将字符串中的每一个字符用二进制数据存储，区分大小写; |

一般来说，都是在`general_ci`和 `utf8_bin`之间来回选择，其他字符集同理，例如utf8mb4要区分大小写就：`utf8mb4_bin`

### 查看、删除数据库

```sql
# 显示所有数据库
show databases;

# 显示创建数据库时的语句
show create database 数据库名;

# 删除一个数据库
drop database 数据库名;

# 删除一个数据库 如果存在就删除，不存在就什么也不做
drop database if exists 数据库名;

# 通常来说 为了严谨性，数据库名都会用反引号包裹
drop database `db222`;
```

### 备份、恢复数据库

- 备份数据库（CMD或者Shell下执行）千万别用powerShell 千万别用powerShell 千万别用powerShell

```shell
# 备份整个数据库
mysqldump -u 用户名 -p -B 数据库1 数据库2 数据库n > 文件名.sql或者路径/文件名.sql
#例如
cd d:\;
mysqldump -u root -p -B db1 >my.sql

#备份数据库的某些表
mysqldump -u 用户名 -p 数据库名 表1 表2 表n > 文件名.sql或者路径/文件名.sql

```

不指定路径的话默认位置是当前shell所在同级路径下

- 恢复数据库(要进入到MySQL命令行中执行)

```shell
# 必须得进入命令行
mysql -uroot -p
```

 然后再执行恢复：

```sql
source 路径:文件;

#例如
source d:\my.sql;

# 恢复数据表-要进入到自己想的数据库中;
use 数据库名;
source 路径:文件;
```

或者直接把文件拖到那些图形化软件中执行也可

## 表的相关操作

### 创建、查看、删除表

​  mysql中，普遍的命名规则是下划线命名，而非是编程语言中常见的驼峰命名，例如`userMessage`在mysql中就要写成`user_message`

```sql
create table 表名（
 字段名1 字段类型 可选-验证规则,
 字段名1 字段类型,
 字段名1 字段类型,
 字段名1 字段类型
）character set 字符集  collate 校验规则 engine 引擎;
```

`character set`字段的字符集，不指定为所在数据库的字符集

`collate`字段的校验规则，不指定为所在数据库的规则

`engine`引擎，这玩意涉及的内容有点多

验证规则，这个后面单独说-也被称为约束

查看当前库(database)中的所有表：

```sql
# 查看db1下的所有表;
use db1;
show tables;
```

删除当前库(database)中的某个表：

```sql
# 删除表：db1下的emp;
use db1;
drop table emp;

# 如果存在则删除：
drop table if exists emp;

```

### MySql的数据类型

大致如下，标了红旗的就是常用的，当然还有个非常罕见的bit(M)类型，M指定位数，默认值1，范围1~64

如果精度要求比价高的话就用Deicmal来存放数值

一般情况下不会用到二进制类型，文件一般都是直接存到一般，数据库中建个索引路径

![MySql数据类型](/images/JavaSE/21-MySql/MySql数据类型.svg)

![image-20211120185628320](/images/JavaSE/21-MySql/image-20211120185628320.png)

![image-20211120185641114](/images/JavaSE/21-MySql/image-20211120185641114.png)

![image-20211120192745001](/images/JavaSE/21-MySql/image-20211120192745001.png)

![image-20211120192825877](/images/JavaSE/21-MySql/image-20211120192825877.png)

Char和Varchar的长度（比如varchar(255)）表示的是255个字符，而并非是255个字节

反正用的时候只要知道，定义多长，就能放多少个字即可

![image-20211120205829953](/images/JavaSE/21-MySql/image-20211120205829953.png)

![image-20211120205914839](/images/JavaSE/21-MySql/image-20211120205914839.png)

#### Decimal类型额外说明

这个东西得额外提出来说一嘴

```sql
CREATE TABLE db3(
 num DECIMAL(30,20)
              
);
#第一个值就是总长度，第二个值就是小数所占长度；
insert into db3 values(233.1);
# 这样查询可以得到：233.10000000000000000000 1后面有19个小数

# 也可以这样让只能插入整数，以存放较大范围的整数
CREATE TABLE db3(
 num DECIMAL(30)
              
);

```

![image-20211120190547035](/images/JavaSE/21-MySql/image-20211120190547035.png)

![image-20211120185843253](/images/JavaSE/21-MySql/image-20211120185726028.png" alt="image-20211120185726028" style="zoom:50%;" /><img src="/images/JavaSE/21-MySql/image-20211120185843253.png)

#### 时间相关类型额外说明default值和on update值

```sql
CREATE TABLE test_time (
 birthday DATE,
 job_time DATETIME,
 login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP on UPDATE CURRENT_TIMESTAMP
    #TIMESTAMP 可以通过default来设置初始值 和 on update 来设置自动更新
    # 除了DATETIME，其他的时间字段都可以貌似这样CURRENT_XXX
);
INSERT into test_time(birthday,job_time) values('2011-1-1','2001-1-1 1:1:1');

SELECT * from test_time;

# 可以看到login_time被填充了相关时间
+------------+---------------------+---------------------+
| birthday   | job_time            | login_time          |
+------------+---------------------+---------------------+
| 2011-01-01 | 2001-01-01 01:01:01 | 2021-11-20 21:18:36 |
+------------+---------------------+---------------------+

#更新一下试试：
update test_time set  birthday='2111-11-1' where birthday='2011-01-01';
# 可以看到login_time同步的被更新了
+------------+---------------------+---------------------+
| birthday   | job_time            | login_time          |
+------------+---------------------+---------------------+
| 2111-11-01 | 2001-01-01 01:01:01 | 2021-11-20 21:24:56 |
+------------+---------------------+---------------------+

```

### 修改表-字段的增删改

增加字段`alter table 表名 add 字段1 字段类型 [可选约束] [after 字段2]`

```sql

alter table emp add image char(255) ;
# 在某个字段后面插入：

alter table emp add `version` varchar(10) after name;
# 在name后面插入version
```

修改字段属性`alter table 表名 modify 字段1 字段类型 [可选约束] [after 字段2]`

```sql

alter table emp modify job varchar(60);
# 将已有的job的数据类型替换为varchar60

alter table emp modify job varchar(60) DEFAULT NULL COMMENT '工作';
#能修改字段类型、类型长度、默认值、注释

alter table emp modify age int after name;
# 将age属性放到name属性后面，注意，字段类型不能落下
```

修改字段名及字段类型`alter table 表名 change 旧字段名 新字段名 新字段类型 [可选约束] [after 字段2]`

```sql
alter table emp change name user_name varchar(255) not null comment '用户名';

# 也可以在重命名后插入到其他元素后面
alter table employee change job today_job varchar(77) after sex;
# 将job重命名后丢在sex后面，注意，字段类型不能落下
```

删除字段`alter table 表名 drop 字段名`

```sql
alter table emp drop name;
```

查看表的结构:`desc 表名;`

修改表名：`Rename table 表名 to 新表名;`

修改表字符集：`alter table 表名 character set 字符集`

## CRUD-增删改查

### Insert添加数据

语法：`insert into 表名 [可选(数据项目)] values(数据),[可选 (数据)]`

插入数据的原则：校验用户的数据是否合发，是否在符合预期内，需前后端双重验证+防注入处理；

```sql
create table person(
    id int,
    name varchar(255),
    price double
);

# 插入一条数据 需要传入所有字段（按照顺序）
insert into person values(1,"张三",1500.1);

# 指定字段插入数据（按照指定字段的顺序）
insert into person(id,name) values(2,"李四");

+------+--------+--------+
| id   | name   | price  |
+------+--------+--------+
|    1 | 张三   | 1500.1 |
|    2 | 李四   |   NULL |
+------+--------+--------+

# 插入多条数据(可以配合指定字段使用)
insert into person values
 (3,"王老五",6663.1),
 (4,"陈六",2333.15),
 (4,"嘎子",159.15);

+------+-----------+---------+
| id   | name      | price   |
+------+-----------+---------+
|    1 | 张三      |  1500.1 |
|    2 | 李四      |    NULL |
|    3 | 王老五    |  6663.1 |
|    4 | 陈六      | 2333.15 |
|    4 | 嘎子      |  159.15 |
+------+-----------+---------+

```

### Update更新数据

语法：`update 表名 set 字段名=字段值,字段名=字段值 [可选： where筛选器]`

update 语法可以用于更新原有表行中的各列

set字句指示要修改那些行和要给予哪些值

**where字句指定应该更新哪些行，如果没有where，则更新所有行**，实际工作中绝对不能犯这种错误......

如果要修改多个字段 可以`set 字段1=值1,字段2=值2....`

```sql
#将表中的所有条目的price字段修改为1000
update person set price = 1000;
+------+-----------+-------+
| id   | name      | price |
+------+-----------+-------+
|    1 | 张三      |  1000 |
|    2 | 李四      |  1000 |
|    3 | 王老五    |  1000 |
|    4 | 陈六      |  1000 |
|    4 | 嘎子      |  1000 |
+------+-----------+-------+


#将姓名为张三的人的price修改为2000
update person set price = 2000 where name = "张三";
+------+--------+-------+
| id   | name   | price |
+------+--------+-------+
|    1 | 张三   |  2000 |
+------+--------+-------+


#将所有人的工资改变为原本的工资+1500
update person set price = price+1000;
+------+-----------+-------+
| id   | name      | price |
+------+-----------+-------+
|    1 | 张三      |  3000 |
|    2 | 李四      |  2000 |
|    3 | 王老五    |  2000 |
|    4 | 陈六      |  2000 |
|    4 | 嘎子      |  2000 |
+------+-----------+-------+

# 将李四的工资变为原本的工资+666
update person set price = price+666 where name = '李四';
+------+--------+-------+
| id   | name   | price |
+------+--------+-------+
|    2 | 李四   |  2666 |
+------+--------+-------+



```

### Delete删除数据

语法：`delete from 表名 [可选 where 筛选器]`

如果没有带where，则删除表中的所有数据

使用delete语句仅删除记录，不删除表的本身，如果说要删除一个表，一般都是直接使用`drop table 表名`语句

```sql
# 删除表中name=王老五的人;
delete from person where name = "王老五";

# 删除某个表中的所有数据 谨慎使用
delete from person;

# 如果说是想删除某一列的所有值，建议使用update
update person set price=null ;
#替换为null的方式 或者用替换为"",0之类的方式
+------+-----------+-------+
| id   | name      | price |
+------+-----------+-------+
|    1 | 张三      |  NULL |
|    2 | 李四      |  NULL |
|    3 | 王老五    |  NULL |
|    4 | 陈六      |  NULL |
|    4 | 嘎子      |  NULL |
+------+-----------+-------+

#如果说想要删除一列，直接通过操作字段的方式：
alter table person drop price;

# 总之，除非非常明确自己确实要删除这个表中的所有数据，不然千万不要
delete from person;
# 正常情况下，删除数据必须加where筛选器

```

### 删除表数据增强

1. 当你不再需要该表时， 用 drop：`drop table表名`
   - drop 是直接将表格删除，无法找回。例如删除 user 表：

2. 当你仍要保留该表，但要删除所有记录时，用truncate
    `truncate （table） 表名`
   - truncate 是删除表中所有数据，但不能与where一起使用；

3. 当你要删除部分记录或者有可能会后悔的话， 用 delete
   `delete from 表名 [where]`
   - delete 也是删除表中数据，但可以与where连用，删除特定行；

它们三者更详细的说明可以看[这里](https://www.cnblogs.com/fcc-123/p/10672604.html)

如果说想要删除某个表并且不留有缓存，但是又先使用了delete删除，那么再补一次truncate 即可

# Select 查找-单表查询

​  看到这个H1标题了吗，是整个sql中最重要的玩意。没有任何东西比他更重要了。在任何类型、任何种类的数据库中，查找永远都是最重要的部分，查找对于数据库来说就好比，饭对于人的重要性一般。

## 基本语法

基本语法很简单：

`select [可选：distinct] *号或者字段名1，字段名2，字段名3... from 表名`

distinct: 去重，当结果中有重复值的时候自动合并去重

也可以给字段取个别名：`select 字段1 as '别名1',字段2 as '别名2'... from 表名`

**字段名是使用运算符的**

然后在表名后面可以跟where语句：`select 相关数据 from 表名 where 相关逻辑表达式`

下面会演示的表达式：（代码块最后）运算，大小等于，and 和模糊匹配与正则表达式

[运算符链接](https://www.runoob.com/mysql/mysql-operator.html)，[正则表达式链接](https://www.runoob.com/mysql/mysql-regexp.html)，[Like模糊匹配链接](https://www.runoob.com/mysql/mysql-like-clause.html)

```sql
use db1;
#获取person中的所有字段
select * from person; 
+------+-----------+-------+
| id   | name      | price |
+------+-----------+-------+
|    1 | 张三      |  1500 |
|    2 | 李四      |  1500 |
|    3 | 王老五    |  1500 |
|    4 | 陈六      |  1500 |
+------+-----------+-------+

select name,price from person;
#只获取姓名，薪水
+-----------+-------+
| name      | price |
+-----------+-------+
| 张三      |  1500 |
| 李四      |  1500 |
| 王老五    |  1500 |
| 陈六      |  1500 |
+-----------+-------+

select name as "姓名" ,price as "薪水" from person;
#给获取到的值重命名
+-----------+--------+
| 姓名      | 薪水   |
+-----------+--------+
| 张三      |   1500 |
| 李四      |   1500 |
| 王老五    |   1500 |
| 陈六      |   1500 |
+-----------+--------+

select distinct price from person;
# 给薪水去重，注意，这里去重的话得是得到的所有字段值一致
+-------+
| price |
+-------+
|  1500 |
+-------+

#加入name字段，判定的时候也会判定name是否重复
# 只有name，price完全相同的时候才会去重
select distinct name,price from person;
+-----------+-------+
| name      | price |
+-----------+-------+
| 张三      |  1500 |
| 李四      |  1500 |
| 王老五    |  1500 |
| 陈六      |  1500 |
+-----------+-------+


# 给Student表
+-----------+---------+------+---------+
| name      | chinese | math | english |
+-----------+---------+------+---------+
| 张三      |     100 |   50 |      50 |
| 李四      |      50 |   80 |     100 |
| 王老五    |      75 |   99 |     105 |
| 老韩      |      60 |   80 |     100 |
| 老李      |      40 |   30 |      50 |
| 张飞      |      60 |   63 |      53 |
| 特朗普    |       0 |   60 |     100 |
| 蔡老狗    |      60 |   80 |      50 |
+-----------+---------+------+---------+
#中的每个学员的总成绩进行相加并算出其平均值

select name ,(chinese+math+english) as "总分" from student;
+-----------+--------+
| name      | 总分   |
+-----------+--------+
| 张三      |    200 |
| 李四      |    230 |
| 王老五    |    279 |
| 老韩      |    240 |
| 老李      |    120 |
| 张飞      |    176 |
| 特朗普    |    160 |
| 蔡老狗    |    190 |
+-----------+--------+

#附带上平均费
select name ,(chinese+math+english) as "总分",(chinese+math+english)/3 as "平均分" from student;
+-----------+--------+-----------+
| name      | 总分   | 平均分    |
+-----------+--------+-----------+
| 张三      |    200 |   66.6667 |
| 李四      |    230 |   76.6667 |
| 王老五    |    279 |   93.0000 |
| 老韩      |    240 |   80.0000 |
| 老李      |    120 |   40.0000 |
| 张飞      |    176 |   58.6667 |
| 特朗普    |    160 |   53.3333 |
| 蔡老狗    |    190 |   63.3333 |
+-----------+--------+-----------+

# 使用简单的where语句
select * from student where name = '李四';
+--------+---------+------+---------+
| name   | chinese | math | english |
+--------+---------+------+---------+
| 李四   |      50 |   80 |     100 |
+--------+---------+------+---------+
#英语大于60
select * from student where english>60;
+-----------+---------+------+---------+
| name      | chinese | math | english |
+-----------+---------+------+---------+
| 李四      |      50 |   80 |     100 |
| 王老五    |      75 |   99 |     105 |
| 老韩      |      60 |   80 |     100 |
| 特朗普    |       0 |   60 |     100 |
+-----------+---------+------+---------+
#总分大于200
select * from student where (chinese+math+english)>200;
+-----------+---------+------+---------+
| name      | chinese | math | english |
+-----------+---------+------+---------+
| 李四      |      50 |   80 |     100 |
| 王老五    |      75 |   99 |     105 |
| 老韩      |      60 |   80 |     100 |
+-----------+---------+------+---------+

#数学大于60且中文大于50的人：
select * from student where math>60 and chinese>50;
+-----------+---------+------+---------+
| name      | chinese | math | english |
+-----------+---------+------+---------+
| 王老五    |      75 |   99 |     105 |
| 老韩      |      60 |   80 |     100 |
| 张飞      |      60 |   63 |      53 |
| 蔡老狗    |      60 |   80 |      50 |
+-----------+---------+------+---------+

#英语成绩大于语文成绩:
select * from student where english>chinese;
+-----------+---------+------+---------+
| name      | chinese | math | english |
+-----------+---------+------+---------+
| 李四      |      50 |   80 |     100 |
| 王老五    |      75 |   99 |     105 |
| 老韩      |      60 |   80 |     100 |
| 老李      |      40 |   30 |      50 |
| 特朗普    |       0 |   60 |     100 |
+-----------+---------+------+---------+

#查询数学分数为80和99的同学
select name "姓名",math "数学分数" from student where math in (80,99);
+-----------+--------------+
| 姓名      | 数学分数     |
+-----------+--------------+
| 李四      |           80 |
| 王老五    |           99 |
| 老韩      |           80 |
| 蔡老狗    |           80 |
+-----------+--------------+

#查询平均分大于50且 数学成绩大于英语成绩 的姓张的学生;

#使用模糊匹配
select * from student where (chinese +math+english)/3>50 and math>english and name like "张%";

#使用正则表达式
select * from student where (chinese +math+english)/3>50 and math>english and name REGEXP '^张';
+--------+---------+------+---------+
| name   | chinese | math | english |
+--------+---------+------+---------+
| 张飞   |      60 |   63 |      53 |
+--------+---------+------+---------+


```

## 统计函数

### Order By 对结果进行排序

语法：`select 条目 from 表名 [条件筛选 where] order by 根据哪个字段 asc|desc`

ASC 升序（默认） 、DESC 降序

```sql
# 根据数学成绩升序排列
select * from student order by math;
+-----------+---------+------+---------+
| name      | chinese | math | english |
+-----------+---------+------+---------+
| 老李      |      40 |   30 |      50 |
| 张三      |     100 |   50 |      50 |
| 特朗普    |       0 |   60 |     100 |
| 张飞      |      60 |   63 |      53 |
| 李四      |      50 |   80 |     100 |
| 老韩      |      60 |   80 |     100 |
| 蔡老狗    |      60 |   80 |      50 |
| 王老五    |      75 |   99 |     105 |
+-----------+---------+------+---------+

# 加上where筛选器 根据语文成绩升序排序
select * from student where name like "张%" order by chinese ;
+--------+---------+------+---------+
| name   | chinese | math | english |
+--------+---------+------+---------+
| 张飞   |      60 |   63 |      53 |
| 张三   |     100 |   50 |      50 |
+--------+---------+------+---------+


# 降序
select * from student where name like "张%" order by chinese desc;
+--------+---------+------+---------+
| name   | chinese | math | english |
+--------+---------+------+---------+
| 张三   |     100 |   50 |      50 |
| 张飞   |      60 |   63 |      53 |
+--------+---------+------+---------+

# 根据总分进行升序排序 as 可以定义局部变量
select name,(chinese+math+english) as total_sorce from student order by total_sorce;
+-----------+-------------+
| name      | total_sorce |
+-----------+-------------+
| 老李      |         120 |
| 特朗普    |         160 |
| 张飞      |         176 |
| 蔡老狗    |         190 |
| 张三      |         200 |
| 李四      |         230 |
| 老韩      |         240 |
| 王老五    |         279 |
+-----------+-------------+
```

### Count-合并、统计函数

语法：`select count(*)|count(列名) from 表名 [可选 where等]`

count(*)和count(列名)的区别

- count(*) 返回满足条件的记录的行数，不会排除值为null的
  - 比如说一个人姓名年龄age之类的所有信息都为null，依然也会计入+1
- count(列名) 统计满足条件的某列有多少个，会排除值为null的
  - 比如说要统计age 然后有一个人的age为null，则这个人将不会算入其中，不会+1

```sql
#统计学生表共有多少行
select count(*) as count from student;
+-------+
| count |
+-------+
|     8 |
+-------+

# 统计数学成绩大于等于80的学生有多少
select count(math) as count from student where math >=80;
+-------+
| count |
+-------+
|     4 |
+-------+

# 统计总分大于200的人数有多少
select count(*) from student where (chinese+math+english)>200;
+----------+
| count(*) |
+----------+
|        3 |
+----------+

```

### SUM- 合计函数-计算数值的总合

该函数满足where条件的行的和，一般用于数值列

语法：`select sum(列名)，{sum(列名)...} from 表名 [where筛选器]`

只能对数值使用，否则会报错

```sql
# 计算数学的总成绩
select sum(math) "数学" from student;
+--------+
| 数学   |
+--------+
|    542 |
+--------+

#统计语文，数学，英语各科的总成绩
select sum(chinese) "语文",sum(math) "数学",sum(english) "英语" from student;
+--------+--------+--------+
| 语文   | 数学   | 英语   |
+--------+--------+--------+
|    445 |    542 |    608 |
+--------+--------+--------+

#统计语文数学英语的成绩总和
select sum(chinese+math+english) "总分" from student;
+--------+
| 总分   |
+--------+
|   1595 |
+--------+


#统计平均分
select sum(chinese+math+english)/count(*) "平均分" from student ;
+-----------+
| 平均分    |
+-----------+
|  199.3750 |
+-----------+
```

### AVG-合计函数-求平均值

返回满足where条件的一列的平均值

语法：`select avg(列名){avg(列名)...} from 表名 [where]`

只能对数值使用

```sql
# 求数学平均分;
select avg(math) as "数学平均分" from student;
+-----------------+
| 数学平均分       |
+-----------------+
|         67.7500 |
+-----------------+

# 总平均分
select avg(chinese+math+english) as "总平均分" from student;
+--------------+
| 总平均分      |
+--------------+
|     199.3750 |
+--------------+
```

### Max/Min-合计函数-返回最大最小值

返回满足where条件列的最大、最小值

语法：`select max|min(列名) from 表名 [where]`

```sql
#求一个班级的总最高分和总最低分
select max(chinese+math+english) "最高分",min(chinese+math+english) "最低分" from student;
+-----------+-----------+
| 最高分    | 最低分    |
+-----------+-----------+
|       279 |       120 |
+-----------+-----------+

```

### Group By+Having-分组+过滤

语法：`select 字段1,字段2,... from 表名 [where筛选器] group by 字段`

可选，使用having字句对分组后的结果进行过滤 一般情况下group by和having是形影不离的

`select 字段1,字段2,... from 表名 group by 字段 having...`

```sql
# 先分别建立好几张表
create table dept( /*部门表*/
 deptno MEDIUMINT unsigned not null default 0,
    dname varchar(20) not null default "",
    loc varchar(13) not null default ""
);
insert into dept values
(10,"ACCOUNTING","NEW Work"),
(20,"RESEARCH","DALLAS"),
(30,"SALES","CHICAGO"),
(40,"OPERATIONS","BOSTON");
# 员工表
create table emp(
 empno mediumint unsigned not null default 0,/*编号*/
    ename varchar(20) not null default "",/*名字*/
    job varchar(9) not null default "",/*工作*/
    mgr mediumint unsigned,/*上级编号*/
    hiredate DATE not null,/*入职时间*/
    sal DECIMAL(7,2) not null,/*薪水*/
    comm DECIMAL(7,2),/*红利*/
    deptno mediumint unsigned not null default 0/*部门编号*/
);
insert into emp values
 (7369,'SMITH','CLERK',7902,'1990-12-17',800.00,NULL,20),
 (7521,'WARD','SALESMAN',7698,'1991-2-20',1600.00,300.00,30),
 (7566,'JONES','SALESMAN',7698,'1991-2-22',2100.02,500.00,30),
 (7654,'MARTIN','MANAGER',7939,'1991-9-28',645.20,NULL,20),
 (7782,'BLACK','SALESMAN',7698,'1995-10-17',625.00,1250.00,30),
 (7788,'COALK','MANAGER',7698,'1997-4-19',3954.20,NULL,10),
 (7839,'SOCTT','MANAGER',7939,'1991-12-3',2681.30,2450.00,20),
 (7844,'KING','ANALYST',7566,'1992-5-7',1564.60,211.00,10),
 (7900,'TURNER','PRESIDENT',NULL,'1888-1-1',2435.00,NULL,30),
 (7902,'JAMES','CLERK',7698,'1996-1-13',433.10,255.52,20),
 (7934,'FORD','ANALYST',7566,'1990-6-3',6321.50,153.025,10),
 (7966,'MILLER','CLERK',7782,'1991-10-12',735.05,453.25,20);
#工资级别表
create table salgrade(
 grade mediumint unsigned not null default 0,/*工资级别*/
    losal decimal(17,2) not null,/*该级别的最低工资*/
    hisal decimal(17,2) not null/*该级别的最高工资*/
);

insert into salgrade values
 (1,700,1200),
 (2,1201,1400),
 (3,1401,2000),
 (4,2001,3000),
 (5,3001,9999);
```

接下来使用Group By+Having完成一系列操作

```sql
# 显示每个部门的平均和最高工资,按照部门来分组查询 并从低到高排序
select avg(sal) "平均工资",max(sal) "最高工资",deptno "部门分组" from emp group by deptno order by deptno;
+--------------+--------------+--------------+
| 平均工资       | 最高工资      | 部门分组      |
+--------------+--------------+--------------+
|  3946.766667 |      6321.50 |           10 |
|  1004.950000 |      2681.30 |           20 |
|  1690.005000 |      2435.00 |           30 |
+--------------+--------------+--------------+

#显示 每个部门 的 每种岗位 的 平均工资 和 最低工资
select avg(sal) "平均工资",min(sal) "最低工资",deptno "部门分组",job "岗位" from emp group by deptno,job ;
+--------------+--------------+--------------+-----------+
| 平均工资      | 最低工资      | 部门分组       | 岗位      |
+--------------+--------------+--------------+-----------+
|   675.800000 |       433.10 |           20 | CLERK     |
|  1441.673333 |       625.00 |           30 | SALESMAN  |
|  1663.250000 |       645.20 |           20 | MANAGER   |
|  3954.200000 |      3954.20 |           10 | MANAGER   |
|  3943.050000 |      1564.60 |           10 | ANALYST   |
|  2435.000000 |      2435.00 |           30 | PRESIDENT |
+--------------+--------------+--------------+-----------+

# 显示平均工资低于2000的部门号和它的平均工资 使用了having
select avg(sal) as sal_avg,deptno from emp group by deptno having sal_avg<2000 ;
+-------------+--------+
| sal_avg     | deptno |
+-------------+--------+
| 1004.950000 |     20 |
| 1690.005000 |     30 |
+-------------+--------+

```

![image-20211121154510850](/images/JavaSE/21-MySql/image-20211121154510850.png)

## 字符串函数

![image-20211121154625191](/images/JavaSE/21-MySql/image-20211121154625191.png)

```sql
#返回字串字符集
select charset(ename) from emp;
#utf8mb3就是utf8
+----------------+
| charset(ename) |
+----------------+
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
| utf8mb3        |
+----------------+

#拼接字段
select concat(ename,"工作是",job) "姓名和工作" from emp;
+--------------------------+
| 姓名和工作               |
+--------------------------+
| SMITH工作是CLERK         |
| WARD工作是SALESMAN       |
| JONES工作是SALESMAN      |
| MARTIN工作是MANAGER      |
| BLACK工作是SALESMAN      |
| COALK工作是MANAGER       |
| SOCTT工作是MANAGER       |
| KING工作是ANALYST        |
| TURNER工作是PRESIDENT    |
| JAMES工作是CLERK         |
| FORD工作是ANALYST        |
| MILLER工作是CLERK        |
| MILLER工作是CLERK        |
+--------------------------+

# 查询  字段2 在字段1中出现的位置，没有则返回0
select instr("hello world",'world');
+------------------------------+
| instr("hello world",'world') |
+------------------------------+
|                            7 |
+------------------------------+

#转换成小写
select lcase("ABCEDf");
+-----------------+
| lcase("ABCEDf") |
+-----------------+
| abcedf          |
+-----------------+

#转换成大写
select ucase("dlkjkl");
+-----------------+
| lcase("ABCEDf") |
+-----------------+
| abcedf          |
+-----------------+

#从某个字符串取n个字符出来（左边开始取）
select left("hello world",4);
+-----------------------+
| left("hello world",4) |
+-----------------------+
| hell                  |
+-----------------------+

#right 和上方同理，不过是从右边开始取


# 返回str的长度 （按照字节）
select length("世界你好");
+------------------------+
| length("世界你好")     |
+------------------------+
|                     12 |
+------------------------+

# 将hello world 中的hello 替换为 你好
select replace("hello world","hello","你好") "Replace";
+--------------+
| Replace      |
+--------------+
| 你好 world   |
+--------------+

#逐字符比较两字符串大小;
select strcmp("hello","hello");# 返回0
select strcmp("hello","jello"); # -1 右边比左边大返回负数，左边比右边大返回正数

#截取字符串-->我想从hello中截取ell---> string,startindex,length
select substring("hello",2,3);
+------------------------+
| substring("hello",2,3) |
+------------------------+
| ell                    |
+------------------------+
#截取第二位开始及后面所有---> string,startindex
+----------------------+
| substring("hello",2) |
+----------------------+
| ello                 |
+----------------------+

# 取出前端空格 ltrim 右端空格 rtrim 前后端空格一起去除 trim
select trim("  测试   ");
+---------------------+
| trim("  测试   ")   |
+---------------------+
| 测试                |
+---------------------+


# 以首字母大写，其余字母小写的形式显示所有员工名
select concat(ucase(left(ename,1)),lcase(substring(ename,2))) "员工姓名" from emp;
+--------------+
| 员工姓名     |
+--------------+
| Smith        |
| Ward         |
| Jones        |
| Martin       |
| Black        |
| Coalk        |
| Soctt        |
| King         |
| Turner       |
| James        |
| Ford         |
| Miller       |
| Miller       |
+--------------+
```

## 数学相关函数

![image-20211121163030748](/images/JavaSE/21-MySql/image-20211121163030748.png)

```sql
# 比较简单的这里不写了，写一些看起来难理解的

#将10进制的8，转换成2进制输出
select conv(8,10,2);
+--------------+
| conv(8,10,2) |
+--------------+
| 1000         |
+--------------+
#将16进制的9，转换为2进制输出
select conv(9,16,2);
+--------------+
| conv(9,16,2) |
+--------------+
| 1001         |
+--------------+

#将2进制的10001，转换成10进制
select conv(10001,2,10);
+------------------+
| conv(10001,2,10) |
+------------------+
| 17               |
+------------------+

# 保留小数位数 只保留两位（自动四舍五入）
select format(78.12543,2);
+--------------------+
| format(78.12543,2) |
+--------------------+
| 78.13              |
+--------------------+


# 取 1 -1 5 15 35 0 -200 之中最小的值
select least( 1 ,-1, 5 ,15 ,35, 0 ,-200 );
+------------------------------------+
| least( 1 ,-1, 5 ,15 ,35, 0 ,-200 ) |
+------------------------------------+
|                               -200 |
+------------------------------------+
1 row in set (0.00 sec)

# 生成一个随机数，范围在0<=number<=1.0
select rand();
+--------------------+
| rand()             |
+--------------------+
| 0.3412554928485821 |
+--------------------+ 

# 可以通过给定种子，让每次生成的随机数都一样
select rand(232332323);
#无论执行多少次，都将只会生成0.08963447072509162
+---------------------+
| rand(232332323)     |
+---------------------+
| 0.08963447072509162 |
+---------------------+
```

## 时间日期相关函数

![image-20211121165926182](/images/JavaSE/21-MySql/image-20211121165926182.png)

![image-20211121172736581](/images/JavaSE/21-MySql/image-20211121172736581.png)![image-20211121172709333](/images/JavaSE/21-MySql/image-20211121172709333.png)

![image-20211121173857683](/images/JavaSE/21-MySql/image-20211121173857683.png)

![image-20211121173952348](/images/JavaSE/21-MySql/image-20211121173952348.png)

```sql
create table mes(id int,content varchar(30),send_time DATETIME);

#添加一条记录，时间为当前时间
# 使用current_timestamp
insert into mes values(1,"北京新闻",current_timestamp);
#使用now()
insert into mes values(2,"上海新闻",now());

+------+--------------+---------------------+
| id   | content      | send_time           |
+------+--------------+---------------------+
|    1 | 北京新闻     | 2021-11-21 17:03:26 |
|    2 | 上海新闻     | 2021-11-21 17:06:14 |
+------+--------------+---------------------+


# 显示所有的新闻信息，和发布日期，只显示日期，不显示时间
select content,date(send_time) from mes;
+--------------+-----------------+
| content      | date(send_time) |
+--------------+-----------------+
| 北京新闻     | 2021-11-21      |
| 上海新闻     | 2021-11-21      |
+--------------+-----------------+

# 查询十分钟内发布的新闻
# 2021年11月21日17:10:42
select * from mes where date_add(send_time,interval 10 minute)>=now();
+------+--------------+---------------------+
| id   | content      | send_time           |
+------+--------------+---------------------+
|    1 | 北京新闻     | 2021-11-21 17:03:26 |
|    2 | 上海新闻     | 2021-11-21 17:06:14 |
+------+--------------+---------------------+


# 2011-11-1和1990-1-1相差多少天
select datediff('2011-11-1','1990-1-1');
+----------------------------------+
| datediff('2011-11-1','1990-1-1') |
+----------------------------------+
|                             7974 |
+----------------------------------+

#使用mysql语句，查询自己活了多少天
select datediff(current_date(),'2001-8-7');
+-------------------------------------+
| datediff(current_date(),'2001-8-7') |
+-------------------------------------+
|                                7411 |
+-------------------------------------+

#如果我能活到80岁，算出我还能活多少天
# 80岁的年份
select date_add('2011-8-7',interval 80 year);
#80岁的年份-已经活了的天数
select  datediff(date_add('2011-8-7',interval 80 year),now());
+-------------------------------------------------------+
| datediff(date_add('2011-8-7',interval 80 year),now()) |
+-------------------------------------------------------+
|                                                 25461 |
+-------------------------------------------------------+


```

## 加密函数和系统函数

![image-20211121174113576](/images/JavaSE/21-MySql/image-20211121174113576.png)

补充：[mysql加密数据的几种方法](https://blog.csdn.net/rocky1996/article/details/75283826)、[mysql8更该的用户信息加密方式](https://www.cnblogs.com/gjc592/p/9681093.html)

```sql
# 查询用户
#  可以查询到登陆到mysql的有哪些用户，以及登陆的IP
select user();
+----------------+
| user()         |
+----------------+
| root@localhost |
+----------------+ 

#查询当前使用的数据库名称
select database();
+------------+
| database() |
+------------+
| db1        |
+------------+

#为字符串算出一个md5 32的字符串，常用的对用户密码的加密方式; 固定的三十二位字符
#当然，正常工作中，这个md5加密加密的是已经加密的用户密码；（多重套娃加密一样）
select md5(123456789);
+----------------------------------+
| md5(123456789)                   |
+----------------------------------+
| 25f9e794323b453885f5181f1b624d0b |
+----------------------------------+
create table myuser(name varchar(255),password char(32));
insert into myuser values("admin",md5(123456879));
+-------+----------------------------------+
| name  | password                         |
+-------+----------------------------------+
| admin | 97b290acab82d5937fb87a28b06181a3 |
+-------+----------------------------------+

#一般验证用户的时候应该是 类似于这样的
select * from myuser where name="admin" and password=md5(123456879);

# password(str) 加密函数
SELECT PASSWORD("123456789");
#当然，mysql8.0开始就移除了这个函数，今天刚刚发现的，如果再使用PASSWORD会报错:You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near
#可以使用SHA1替代



```

## 流程控制函数-IF-IFNULL-CASE

if类似于三元表达式

ifnull类似于if

case类似于 套娃版三元表达式

![image-20211121205018177](/images/JavaSE/21-MySql/image-20211121205018177.png)

```sql
# if语句的基本使用：
select if(true,'北京','上海'),if(false,'北京','上海');
+----------------------------+-----------------------------+
| if(true,'北京','上海')     | if(false,'北京','上海')     |
+----------------------------+-----------------------------+
| 北京                       | 上海                        |
+----------------------------+-----------------------------+

# ifnull
select ifnull(null,"hello"),ifnull('world','hello');
+----------------------+-------------------------+
| ifnull(null,"hello") | ifnull('world','hello') |
+----------------------+-------------------------+
| hello                | world                   |
+----------------------+-------------------------+

# 进阶使用及when case的用法：数据源：
+-------+--------+-----------+------+------------+---------+---------+--------+
| empno | ename  | job       | mgr  | hiredate   | sal     | comm    | deptno |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK     | 7902 | 1990-12-17 |  800.00 |    NULL |     20 |
|  7521 | WARD   | SALESMAN  | 7698 | 1991-02-20 | 1600.00 |  300.00 |     30 |
|  7566 | JONES  | SALESMAN  | 7698 | 1991-02-22 | 2100.02 |  500.00 |     30 |
|  7654 | MARTIN | MANAGER   | 7939 | 1991-09-28 |  645.20 |    NULL |     20 |
|  7782 | BLACK  | SALESMAN  | 7698 | 1995-10-17 |  625.00 | 1250.00 |     30 |
|  7788 | COALK  | MANAGER   | 7698 | 1997-04-19 | 3954.20 |    NULL |     10 |
|  7839 | SOCTT  | MANAGER   | 7939 | 1991-12-03 | 2681.30 | 2450.00 |     20 |
|  7844 | KING   | ANALYST   | 7566 | 1992-05-07 | 1564.60 |  211.00 |     10 |
|  7900 | TURNER | PRESIDENT | NULL | 1888-01-01 | 2435.00 |    NULL |     30 |
|  7902 | JAMES  | CLERK     | 7698 | 1996-01-13 |  433.10 |  255.52 |     20 |
|  7934 | FORD   | ANALYST   | 7566 | 1990-06-03 | 6321.50 |  153.03 |     10 |
|  7966 | MILLER | CLERK     | 7782 | 1991-10-12 |  735.05 |  453.25 |     20 |
|  7966 | MILLER | CLERK     | 7782 | 1991-10-12 |  735.05 |  453.25 |     20 |
+-------+--------+-----------+------+------------+---------+---------+--------+


# 查询emp表，如果comm是null，则显示0
select ename,sal, IFNULL(comm,0.0) as comm,deptno from emp;
# 或者
select ename,sal, IF(comm IS NULL,0.0) as comm,deptno from emp;
+--------+---------+---------+--------+
| ename  | sal     | comm    | deptno |
+--------+---------+---------+--------+
| SMITH  |  800.00 |    0.00 |     20 |
| WARD   | 1600.00 |  300.00 |     30 |
| JONES  | 2100.02 |  500.00 |     30 |
| MARTIN |  645.20 |    0.00 |     20 |
| BLACK  |  625.00 | 1250.00 |     30 |
| COALK  | 3954.20 |    0.00 |     10 |
| SOCTT  | 2681.30 | 2450.00 |     20 |
| KING   | 1564.60 |  211.00 |     10 |
| TURNER | 2435.00 |    0.00 |     30 |
| JAMES  |  433.10 |  255.52 |     20 |
| FORD   | 6321.50 |  153.03 |     10 |
| MILLER |  735.05 |  453.25 |     20 |
| MILLER |  735.05 |  453.25 |     20 |
+--------+---------+---------+--------+

# 如果emp表的job是CLERK则显示职员，如果是MANAGER则显示经理，如果是SALESMAN则显示销售人员，其他正常显示
# 使用 case when   注意，这玩意使用的时候没有逗号的
select ename,( CASE 
              WHEN job = 'CLERK' THEN '职员'
              WHEN job = 'MANAGER' THEN '经理'
              WHEN job = 'SALESMAN' THEN '销售人员'
              ELSE job end
             ) as "job"
             from emp;
+--------+--------------+
| ename  | job          |
+--------+--------------+
| SMITH  | 职员         |
| WARD   | 销售人员     |
| JONES  | 销售人员     |
| MARTIN | 经理         |
| BLACK  | 销售人员     |
| COALK  | 经理         |
| SOCTT  | 经理         |
| KING   | ANALYST      |
| TURNER | PRESIDENT    |
| JAMES  | 职员         |
| FORD   | ANALYST      |
| MILLER | 职员         |
| MILLER | 职员         |
+--------+--------------+

```

## 单表补充-加强查询

### Where比较日期

在Mysql中，日期类型可以直接比较

```sql
# 查找1992.10.1后入职的员工-使用where完成
select ename,hiredate from emp where hiredate>'1992-10-1';
+-------+------------+
| ename | hiredate   |
+-------+------------+
| BLACK | 1995-10-17 |
| COALK | 1997-04-19 |
| JAMES | 1996-01-13 |
+-------+------------+
```

### Like模糊查询规则

- `%`表示0到多个字符
- `_`表示单个字符

```sql
# 查找首字母为S的员工姓名和工资 这里因为表格是非严格匹配大小写的，所以可以直接用小写的s
select ename,sal from emp where ename like 's%';
+-------+---------+
| ename | sal     |
+-------+---------+
| SMITH |  800.00 |
| SOCTT | 2681.30 |
+-------+---------+

# 第三个字符为A的所有员工 这里因为表格是非严格匹配大小写的，所以可以直接用小写的a
select ename,sal from emp where ename like '__a%';
+-------+---------+
| ename | sal     |
+-------+---------+
| BLACK |  625.00 |
| COALK | 3954.20 |
+-------+---------+
```

### 判断值是否为NULl

使用 `select * from xxx where xxx IS NULL`

```sql
# 显示没有上级雇员的情况
select * from emp where mgr is NULL;
+-------+--------+-----------+------+------------+---------+------+--------+
| empno | ename  | job       | mgr  | hiredate   | sal     | comm | deptno |
+-------+--------+-----------+------+------------+---------+------+--------+
|  7900 | TURNER | PRESIDENT | NULL | 1888-01-01 | 2435.00 | NULL |     30 |
+-------+--------+-----------+------+------------+---------+------+--------+
```

### 查询表的结构

`desc 表名称`

```sql
# 查看emp表的表结构;
desc emp;
+----------+--------------------+------+-----+---------+-------+
| Field    | Type               | Null | Key | Default | Extra |
+----------+--------------------+------+-----+---------+-------+
| empno    | mediumint unsigned | NO   |     | 0       |       |
| ename    | varchar(20)        | NO   |     |         |       |
| job      | varchar(9)         | NO   |     |         |       |
| mgr      | mediumint unsigned | YES  |     | NULL    |       |
| hiredate | date               | NO   |     | NULL    |       |
| sal      | decimal(7,2)       | NO   |     | NULL    |       |
| comm     | decimal(7,2)       | YES  |     | NULL    |       |
| deptno   | mediumint unsigned | NO   |     | 0       |       |
+----------+--------------------+------+-----+---------+-------+
```

### Order By排序-多重排序

语法：`select * from 表名 [where] order by 字段1 字段1排序规则, 字段2 字段2排序规则...`

字段1 中相同的按照字段2的排序规则进行排序 字段2中相同的字段按照字段3的规则进行排序...以此类推

```sql
# 按照部门号升序而雇员的工资降序的顺序排列
select ename,sal,deptno from emp order by deptno,sal desc;
+--------+---------+--------+
| ename  | sal     | deptno |
+--------+---------+--------+
| FORD   | 6321.50 |     10 |
| COALK  | 3954.20 |     10 |
| KING   | 1564.60 |     10 |
| SOCTT  | 2681.30 |     20 |
| SMITH  |  800.00 |     20 |
| MILLER |  735.05 |     20 |
| MILLER |  735.05 |     20 |
| MARTIN |  645.20 |     20 |
| JAMES  |  433.10 |     20 |
| TURNER | 2435.00 |     30 |
| JONES  | 2100.02 |     30 |
| WARD   | 1600.00 |     30 |
| BLACK  |  625.00 |     30 |
+--------+---------+--------+
```

### LIMIT 分页查询

在实际工作中，**做任何项目时都要用到分页**，因为正常情况下，一张表的数据往往是几万几十万几百万，不可能说每次查询都把全部查询下来：

基本语法：`select ... from 表名 [where order  group 等语句] LIMIT 位置,数量`

位置(index)从零开始计数

嘛，也就是说 实际上是index+1

- 0,10，表示第一条到第十条
- 10,20表示第十一条到第二十条
- 20，30表示第二十一条到第三十条

```sql
# 按照员工的id号升序取出，每页显示三条记录，分别显示1,2,3页
select * from emp order by  empno limit 0,3;#第一页
+-------+-------+----------+------+------------+---------+--------+--------+
| empno | ename | job      | mgr  | hiredate   | sal     | comm   | deptno |
+-------+-------+----------+------+------------+---------+--------+--------+
|  7369 | SMITH | CLERK    | 7902 | 1990-12-17 |  800.00 |   NULL |     20 |
|  7521 | WARD  | SALESMAN | 7698 | 1991-02-20 | 1600.00 | 300.00 |     30 |
|  7566 | JONES | SALESMAN | 7698 | 1991-02-22 | 2100.02 | 500.00 |     30 |
+-------+-------+----------+------+------------+---------+--------+--------+
select * from emp order by  empno limit 3,3;#第二页
+-------+--------+----------+------+------------+---------+---------+--------+
| empno | ename  | job      | mgr  | hiredate   | sal     | comm    | deptno |
+-------+--------+----------+------+------------+---------+---------+--------+
|  7654 | MARTIN | MANAGER  | 7939 | 1991-09-28 |  645.20 |    NULL |     20 |
|  7782 | BLACK  | SALESMAN | 7698 | 1995-10-17 |  625.00 | 1250.00 |     30 |
|  7788 | COALK  | MANAGER  | 7698 | 1997-04-19 | 3954.20 |    NULL |     10 |
+-------+--------+----------+------+------------+---------+---------+--------+
select * from emp order by  empno limit 6,3;#第三页
+-------+--------+-----------+------+------------+---------+---------+--------+
| empno | ename  | job       | mgr  | hiredate   | sal     | comm    | deptno |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7839 | SOCTT  | MANAGER   | 7939 | 1991-12-03 | 2681.30 | 2450.00 |     20 |
|  7844 | KING   | ANALYST   | 7566 | 1992-05-07 | 1564.60 |  211.00 |     10 |
|  7900 | TURNER | PRESIDENT | NULL | 1888-01-01 | 2435.00 |    NULL |     30 |
+-------+--------+-----------+------+------------+---------+---------+--------+
```

### 使用分组函数和分组字句、流程控制增强 GROUP BY、IF

```sql
# 显示 每种岗位 的 雇员总数、平均工资
select count(*),avg(sal) from emp group by deptno;
+----------+-------------+
| count(*) | avg(sal)    |
+----------+-------------+
|        6 | 1004.950000 |
|        4 | 1690.005000 |
|        3 | 3946.766667 |
+----------+-------------+

# 显示 雇员总数 以及 没有获得补助 的员工数
# count 某列 如果该列的值为null，是不会加入统计的

# 方法1
select count(*),count(if(comm is null,1,null))  from emp;
+----------+--------------------------------+
| count(*) | count(if(comm is null,1,null)) |
+----------+--------------------------------+
|       13 |                              4 |
+----------+--------------------------------+

# 方法2
select count(*),count(*)-count(comm) from emp;
+----------+----------------------+
| count(*) | count(*)-count(comm) |
+----------+----------------------+
|       13 |                    4 |
+----------+----------------------+

# 显示管理者的总人数(mgr)
# count 去null distinct 去重
select count(distinct mgr) from emp;
+---------------------+
| count(distinct mgr) |
+---------------------+
|                   5 |
+---------------------+

# 显示雇员的工资的最大差额

select max(sal) - min(sal) from emp;
+---------------------+
| max(sal) - min(sal) |
+---------------------+
|             5888.40 |
+---------------------+

```

### Group Having limit order 的使用顺序

首先他们必须在where之后，

这之后的顺序就是

```sql
select 字段 from 表名 where 条件
 GROUP BY 字段
 HAVING 字段
 ORDER BY 字段
 LIMIT 字段;
#LIMIT永远在最后

#应用案例 统计各个部门的平均工资 并且是平均工资大于1000的才会加入统计，并且按照工资从高到低排序，取出前两行记录
select avg(sal) as sal_avg,deptno from emp 
 group by deptno having sal_avg>1000
    order by sal_avg DESC
    limit 0,2;
+-------------+--------+
| sal_avg     | deptno |
+-------------+--------+
| 3946.766667 |     10 |
| 1690.005000 |     30 |
+-------------+--------+
```

# Select 查找-多表查询

实际上开发过程中多表用的多一些（指七八个表一块查..）

![image-20211121223552978](/images/JavaSE/21-MySql/image-20211121223552978.png)

接下来过程中要用到的三张表

```sql
mysql> select * from dept;
+--------+------------+----------+
| deptno | dname      | loc      |
+--------+------------+----------+
|     10 | ACCOUNTING | NEW Work |
|     20 | RESEARCH   | DALLAS   |
|     30 | SALES      | CHICAGO  |
|     40 | OPERATIONS | BOSTON   |
+--------+------------+----------+
4 rows in set (0.00 sec)

mysql> select * from salgrade;
+-------+---------+---------+
| grade | losal   | hisal   |
+-------+---------+---------+
|     1 |  700.00 | 1200.00 |
|     2 | 1201.00 | 1400.00 |
|     3 | 1401.00 | 2000.00 |
|     4 | 2001.00 | 3000.00 |
|     5 | 3001.00 | 9999.00 |
+-------+---------+---------+
5 rows in set (0.00 sec)

mysql> select * from emp;
+-------+--------+-----------+------+------------+---------+---------+--------+
| empno | ename  | job       | mgr  | hiredate   | sal     | comm    | deptno |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK     | 7902 | 1990-12-17 |  800.00 |    NULL |     20 |
|  7521 | WARD   | SALESMAN  | 7698 | 1991-02-20 | 1600.00 |  300.00 |     30 |
|  7566 | JONES  | SALESMAN  | 7698 | 1991-02-22 | 2100.02 |  500.00 |     30 |
|  7654 | MARTIN | MANAGER   | 7939 | 1991-09-28 |  645.20 |    NULL |     20 |
|  7782 | BLACK  | SALESMAN  | 7698 | 1995-10-17 |  625.00 | 1250.00 |     30 |
|  7788 | COALK  | MANAGER   | 7698 | 1997-04-19 | 3954.20 |    NULL |     10 |
|  7839 | SOCTT  | MANAGER   | 7939 | 1991-12-03 | 2681.30 | 2450.00 |     20 |
|  7844 | KING   | ANALYST   | 7566 | 1992-05-07 | 1564.60 |  211.00 |     10 |
|  7900 | TURNER | PRESIDENT | NULL | 1888-01-01 | 2435.00 |    NULL |     30 |
|  7902 | JAMES  | CLERK     | 7698 | 1996-01-13 |  433.10 |  255.52 |     20 |
|  7934 | FORD   | ANALYST   | 7566 | 1990-06-03 | 6321.50 |  153.03 |     10 |
|  7966 | MILLER | CLERK     | 7782 | 1991-10-12 |  735.05 |  453.25 |     20 |
|  7966 | MILLER | CLERK     | 7782 | 1991-10-12 |  735.05 |  453.25 |     20 |
+-------+--------+-----------+------+------------+---------+---------+--------+
13 rows in set (0.00 sec)
```

![image-20211121223951951](/images/JavaSE/21-MySql/image-20211121223951951.png)

![image-20211121224339699](/images/JavaSE/21-MySql/image-20211121224339699.png)

这样多表查询默认处理返回的结果，称为笛卡尔集

## 多表查询-where过滤

解决这个多表的关键就是要写出正确的过滤条件 where

![image-20211121230457415](/images/JavaSE/21-MySql/image-20211121230457415.png)

```sql

# emp.deptno = dept.deptno 即为去重
select * from emp,dept where emp.deptno = dept.deptno;
# 此时若想要显示指定值则需要：
select emp.ename,emp.deptno,dept.dname from emp,dept where emp.deptno = dept.deptno;
+--------+--------+------------+
| ename  | deptno | dname      |
+--------+--------+------------+
| SMITH  |     20 | RESEARCH   |
| WARD   |     30 | SALES      |
| JONES  |     30 | SALES      |
| MARTIN |     20 | RESEARCH   |
| BLACK  |     30 | SALES      |
| COALK  |     10 | ACCOUNTING |
| SOCTT  |     20 | RESEARCH   |
| KING   |     10 | ACCOUNTING |
| TURNER |     30 | SALES      |
| JAMES  |     20 | RESEARCH   |
| FORD   |     10 | ACCOUNTING |
| MILLER |     20 | RESEARCH   |
| MILLER |     20 | RESEARCH   |
+--------+--------+------------+


# 显示部门号为10的部门名 员工名 和工资
# 多表查询时，可以在from处定义别名
select d.dname,
 e.deptno,
 e.ename,
 e.sal 
 from emp as e ,dept as d where 
    e.deptno = d.deptno  and e.deptno=10;
+------------+--------+-------+---------+
| dname      | deptno | ename | sal     |
+------------+--------+-------+---------+
| ACCOUNTING |     10 | COALK | 3954.20 |
| ACCOUNTING |     10 | KING  | 1564.60 |
| ACCOUNTING |     10 | FORD  | 6321.50 |
+------------+--------+-------+---------+

# 显示各个员工的姓名。工资，及工资级别 

select e.ename,e.sal,s.grade
 from emp as e  ,salgrade as s
 where   e.sal BETWEEN s.losal and s.hisal;
+--------+---------+-------+
| ename  | sal     | grade |
+--------+---------+-------+
| SMITH  |  800.00 |     1 |
| WARD   | 1600.00 |     3 |
| JONES  | 2100.02 |     4 |
| COALK  | 3954.20 |     5 |
| SOCTT  | 2681.30 |     4 |
| KING   | 1564.60 |     3 |
| TURNER | 2435.00 |     4 |
| FORD   | 6321.50 |     5 |
| MILLER |  735.05 |     1 |
| MILLER |  735.05 |     1 |
+--------+---------+-------+

# 显示雇员名 雇员工资 及所在部门的名字 并按照部门排序（降序排）
# 部门相同的，按照工资降序排
select e.ename,e.sal,e.deptno,d.dname 
 from emp as e,dept as d
 where e.deptno = d.deptno
 order by e.deptno desc,e.sal desc;
+--------+---------+--------+------------+
| ename  | sal     | deptno | dname      |
+--------+---------+--------+------------+
| TURNER | 2435.00 |     30 | SALES      |
| JONES  | 2100.02 |     30 | SALES      |
| WARD   | 1600.00 |     30 | SALES      |
| BLACK  |  625.00 |     30 | SALES      |
| SOCTT  | 2681.30 |     20 | RESEARCH   |
| SMITH  |  800.00 |     20 | RESEARCH   |
| MILLER |  735.05 |     20 | RESEARCH   |
| MILLER |  735.05 |     20 | RESEARCH   |
| MARTIN |  645.20 |     20 | RESEARCH   |
| JAMES  |  433.10 |     20 | RESEARCH   |
| FORD   | 6321.50 |     10 | ACCOUNTING |
| COALK  | 3954.20 |     10 | ACCOUNTING |
| KING   | 1564.60 |     10 | ACCOUNTING |
+--------+---------+--------+------------+

```

## Mysql 多表查询-自连接

自连接指的是在同一张表的连接查询个（将同一张表看做两张表）

```sql
# 显示公示员工和他上级的名字
# 员工的名字在 emp 上级的名字 也在emp 员工和上级是通过emp表的mgr字段关联
# empno 是员工当前阶级  mgr 是员工上级阶级
 +-------+--------+-----------+------+------------+---------+---------+--------+
| empno | ename  | job       | mgr  | hiredate   | sal     | comm    | deptno |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK     | 7902 | 1990-12-17 |  800.00 |    NULL |     20 |
|  7521 | WARD   | SALESMAN  | 7698 | 1991-02-20 | 1600.00 |  300.00 |     30 |
|  7566 | JONES  | SALESMAN  | 7698 | 1991-02-22 | 2100.02 |  500.00 |     30 |
|  7654 | MARTIN | MANAGER   | 7939 | 1991-09-28 |  645.20 |    NULL |     20 |
|  7782 | BLACK  | SALESMAN  | 7698 | 1995-10-17 |  625.00 | 1250.00 |     30 |
|  7788 | COALK  | MANAGER   | 7698 | 1997-04-19 | 3954.20 |    NULL |     10 |
|  7839 | SOCTT  | MANAGER   | 7939 | 1991-12-03 | 2681.30 | 2450.00 |     20 |
|  7844 | KING   | ANALYST   | 7566 | 1992-05-07 | 1564.60 |  211.00 |     10 |
|  7900 | TURNER | PRESIDENT | NULL | 1888-01-01 | 2435.00 |    NULL |     30 |
|  7902 | JAMES  | CLERK     | 7698 | 1996-01-13 |  433.10 |  255.52 |     20 |
|  7934 | FORD   | ANALYST   | 7566 | 1990-06-03 | 6321.50 |  153.03 |     10 |
|  7966 | MILLER | CLERK     | 7782 | 1991-10-12 |  735.05 |  453.25 |     20 |
|  7966 | MILLER | CLERK     | 7782 | 1991-10-12 |  735.05 |  453.25 |     20 |
+-------+--------+-----------+------+------------+---------+---------+--------+

select work.ename "员工名",boss.ename "上级名称" from emp as work,emp as boss
 where work.mgr = boss.empno;
# 因为表中设计了大部分人的上级都没有，所以这里只获取到几个人的，为null或者不存在的都不会记录在内
# 通过别名即可轻松来使用 反正多表查询通常情况下分别取个别名就不会错
+-----------+--------------+
| 员工名    | 上级名称     |
+-----------+--------------+
| FORD      | JONES        |
| KING      | JONES        |
| MILLER    | BLACK        |
| MILLER    | BLACK        |
| SMITH     | JAMES        |
+-----------+--------------+

```

## Mysql多表查询-子查询-查询结果当做临时表使用

就是结果当成表来使用

```sql
# 查询emp各个comm分组中 工资最高的人 并按照类别升序排序

# 先得到 各个类别中的最高工资
select deptno,max(sal) from emp group by deptno;
+--------+----------+
| deptno | max(sal) |
+--------+----------+
|     20 |  2681.30 |
|     30 |  2435.00 |
|     10 |  6321.50 |
+--------+----------+

# 然后将其结果当做一张表 来传递使用
select e.deptno "类别",e.ename "员工名称",t.sal "工资"
 from emp as e , (select deptno,max(sal) as sal from emp group by deptno)as t
 where e.sal = t.sal
 order by e.deptno,t.deptno;
+--------+--------------+---------+
| 类别   | 员工名称     | 工资    |
+--------+--------------+---------+
|     10 | FORD         | 6321.50 |
|     20 | SOCTT        | 2681.30 |
|     30 | TURNER       | 2435.00 |
+--------+--------------+---------+


```

## Mysql多表查询-All、Any匹配操作符

all就是匹配某个值是否为另一个列表返回的所有字段或者一个子查询返回的所有字段的值

all前面一般是大于小于或者等于号

all 就是匹配全部

any 就是匹配上其中一个即可

```sql
# 显示工资比部门30的 所有员工 的工资高的员工姓名、工资和部门号
select ename,sal,deptno from emp where
 sal>ALL(SELECT sal from emp where deptno =30);
#  稍微的简写
 sal>ALL(SELECT MAX(sal) from emp where deptno =30);
 +-------+---------+--------+
| ename | sal     | deptno |
+-------+---------+--------+
| COALK | 3954.20 |     10 |
| SOCTT | 2681.30 |     20 |
| FORD  | 6321.50 |     10 |
+-------+---------+--------+

# 显示工资比部门30的其中 任何一个员工 的工资高的员工
select ename,sal,deptno from emp where
 sal>ANY(SELECT sal from emp where deptno =30);
# 也可以略微简化
 sal>ANY(SELECT MIN(sal) from emp where deptno =30);
+--------+---------+--------+
| ename  | sal     | deptno |
+--------+---------+--------+
| SMITH  |  800.00 |     20 |
| WARD   | 1600.00 |     30 |
| JONES  | 2100.02 |     30 |
| MARTIN |  645.20 |     20 |
| COALK  | 3954.20 |     10 |
| SOCTT  | 2681.30 |     20 |
| KING   | 1564.60 |     10 |
| TURNER | 2435.00 |     30 |
| FORD   | 6321.50 |     10 |
| MILLER |  735.05 |     20 |
| MILLER |  735.05 |     20 |
+--------+---------+--------+
```

## Mysql多表查询-多列子查询

就是多个值同时进行匹配，可以有效降低查询时候的资源浪费

```sql
#查询与 SMITH 的部门和岗位完全相同的所有雇员（不包括smith本人）

# 首先获取史密斯的部门和岗位
select deptno,job from emp where ename ='smith';
+--------+-------+
| deptno | job   |
+--------+-------+
|     20 | CLERK |
+--------+-------+

#再把结果当做子查询来使用，并且使用多列子查询的模式
select * from emp 
 where (deptno,job)= (select deptno,job from emp where ename ='smith') and ename != 'smith';
+-------+--------+-------+------+------------+--------+--------+--------+
| empno | ename  | job   | mgr  | hiredate   | sal    | comm   | deptno |
+-------+--------+-------+------+------------+--------+--------+--------+
|  7902 | JAMES  | CLERK | 7698 | 1996-01-13 | 433.10 | 255.52 |     20 |
|  7966 | MILLER | CLERK | 7782 | 1991-10-12 | 735.05 | 453.25 |     20 |
+-------+--------+-------+------+------------+--------+--------+--------+



# 获取所有部门中工资高于该部门平均工资的人

select deptno,avg(sal)as sal from emp group by deptno;

select e.ename '员工姓名',e.sal '员工工资',e.deptno '部门名称',g.sal "该部门平均工资"
 from emp as e,(select deptno,avg(sal)as sal from emp group by deptno)as g
 where e.deptno=g.deptno and e.sal>g.sal
 order by e.deptno;
+--------------+--------------+--------------+-----------------------+
| 员工姓名       | 员工工资      | 部门名称      | 该部门平均工资          |
+--------------+--------------+--------------+-----------------------+
| COALK        |      3954.20 |           10 |           3946.766667 |
| FORD         |      6321.50 |           10 |           3946.766667 |
| SOCTT        |      2681.30 |           20 |           1004.950000 |
| JONES        |      2100.02 |           30 |           1690.005000 |
| TURNER       |      2435.00 |           30 |           1690.005000 |
+--------------+--------------+--------------+-----------------------+

# 查找每个部门工资最高的人的详细资料
select e.ename '员工姓名',e.sal '员工工资',e.deptno '部门名称',g.sal "该部门最高工资"
 from emp as e,(select deptno,max(sal)as sal from emp group by deptno)as g
 where e.deptno=g.deptno and e.sal=g.sal
 order by e.deptno;
+--------------+--------------+--------------+-----------------------+
| 员工姓名     | 员工工资     | 部门名称     | 该部门最高工资        |
+--------------+--------------+--------------+-----------------------+
| FORD         |      6321.50 |           10 |               6321.50 |
| SOCTT        |      2681.30 |           20 |               2681.30 |
| TURNER       |      2435.00 |           30 |               2435.00 |
+--------------+--------------+--------------+-----------------------+
```

### 多表查询细节1 -as的省略，*返回某个表的全部内容

 ```sql
 # as 可以省略
 select ename as name from xxx;
 #可以简写为
 select ename  name;
 
 # 当查询多个表的时候，要输出某个表的全部内容
 # 使用*号即可
 select emp.*,dept.dname from emp,dept;
 
 # 也可以*号+ as缩写
 
 select e.* , d.dname from emp e,dept d;
 
 # 效果都是一样的
 
 ```

## 表复制-蠕虫复制、复制表的结构、去除表中的重复记录

有的时候，为了对某个sql语句进行效率测试，我们需要海量数据时，可以使用此方法为表创建海量数据

### 复制表

- `insert into 表1 select * from 表1` 自我复制
- `insert into 表1(字段1 字段2...) select 字段1,字段2... from 表2` 两个表之间的复制
  - 把表2中相应字段的值按照顺序复制到表1的相应字段（按照字段1，字段2相互相对应）

```sql
# 先来个测试的表
create table my_table01( id int,name varchar(30) ,sal double,job varchar(32) ,deptno int);
desc my_table01;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| id     | int         | YES  |     | NULL    |       |
| name   | varchar(30) | YES  |     | NULL    |       |
| sal    | double      | YES  |     | NULL    |       |
| job    | varchar(32) | YES  |     | NULL    |       |
| deptno | int         | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+

# 把emp表的记录复制到my_table01
insert into my_table01
 (id,name,sal,job,deptno) 
 (SELECT empno,ename,sal,job,deptno from emp);
 
+------+--------+---------+-----------+--------+
| id   | name   | sal     | job       | deptno |
+------+--------+---------+-----------+--------+
| 7369 | SMITH  |     800 | CLERK     |     20 |
| 7521 | WARD   |    1600 | SALESMAN  |     30 |
| 7566 | JONES  | 2100.02 | SALESMAN  |     30 |
......
13 rows in set (0.00 sec)

# 自我复制
INSERT INTO my_table01 SELECT * FROM my_table01;

+------+--------+---------+-----------+--------+
| id   | name   | sal     | job       | deptno |
+------+--------+---------+-----------+--------+
| 7369 | SMITH  |     800 | CLERK     |     20 |
| 7521 | WARD   |    1600 | SALESMAN  |     30 |
| 7566 | JONES  | 2100.02 | SALESMAN  |     30 |
| 7654 | MARTIN |   645.2 | MANAGER   |     20 |
......
26 rows in set (0.00 sec)

# 再次自我复制n次.
INSERT INTO my_table01 SELECT * FROM my_table01;
INSERT INTO my_table01 SELECT * FROM my_table01;
INSERT INTO my_table01 SELECT * FROM my_table01;
....
Query OK, 1703936 rows affected (16.21 sec)
# 复制了越来越多次，也可以明显的感觉到复制的速度越来越慢
# 每次复制都是上一次的2倍

```

### 复制表的结构

语法：`create table 表2 like 表1` 把表1的结构完整的复制给表2

```sql
# 复制表的结构
create table my_table02 like emp;
+----------+--------------------+------+-----+---------+-------+
| Field    | Type               | Null | Key | Default | Extra |
+----------+--------------------+------+-----+---------+-------+
| empno    | mediumint unsigned | NO   |     | 0       |       |
| ename    | varchar(20)        | NO   |     |         |       |
| job      | varchar(9)         | NO   |     |         |       |
| mgr      | mediumint unsigned | YES  |     | NULL    |       |
| hiredate | date               | NO   |     | NULL    |       |
| sal      | decimal(7,2)       | NO   |     | NULL    |       |
| comm     | decimal(7,2)       | YES  |     | NULL    |       |
| deptno   | mediumint unsigned | NO   |     | 0       |       |
+----------+--------------------+------+-----+---------+-------+

# 再把emp复制给他
insert into my_table02 select * from emp;
...
Query OK, 13 rows affected (0.01 sec)
#再执行一次复制内容
Query OK, 26 rows affected (0.01 sec)

```

### 表的去重

去重方式网上应该有更多种，这里举例一种最笨的方法

```sql
# 表的去重

# 1. 先创建一张临时表my_emp 该表的结构和my_table02完全相同
create table my_emp like my_table02;

# 2.把 my_table02的记录，通过 distinct 关键字处理后，复制给my_emp;
insert into my_emp select DISTINCT * from my_table02;
...
Records: 12  Duplicates: 0  Warnings: 0

# 3. 清除掉 my_table02的所有记录 这里的delete可以换成truncate使其不缓存删除的数据
delete from my_table02;

# 4. 把my_emp的表复制给 my_table02;
insert into my_table02 select DISTINCT * from my_emp;

# 5. drop 掉 临时表 my_emp;

drop table my_emp;

+-------+--------+-----------+------+------------+---------+---------+--------+
| empno | ename  | job       | mgr  | hiredate   | sal     | comm    | deptno |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK     | 7902 | 1990-12-17 |  800.00 |    NULL |     20 |
|  7521 | WARD   | SALESMAN  | 7698 | 1991-02-20 | 1600.00 |  300.00 |     30 |
|  7566 | JONES  | SALESMAN  | 7698 | 1991-02-22 | 2100.02 |  500.00 |     30 |
|  7654 | MARTIN | MANAGER   | 7939 | 1991-09-28 |  645.20 |    NULL |     20 |
|  7782 | BLACK  | SALESMAN  | 7698 | 1995-10-17 |  625.00 | 1250.00 |     30 |
|  7788 | COALK  | MANAGER   | 7698 | 1997-04-19 | 3954.20 |    NULL |     10 |
|  7839 | SOCTT  | MANAGER   | 7939 | 1991-12-03 | 2681.30 | 2450.00 |     20 |
|  7844 | KING   | ANALYST   | 7566 | 1992-05-07 | 1564.60 |  211.00 |     10 |
|  7900 | TURNER | PRESIDENT | NULL | 1888-01-01 | 2435.00 |    NULL |     30 |
|  7902 | JAMES  | CLERK     | 7698 | 1996-01-13 |  433.10 |  255.52 |     20 |
|  7934 | FORD   | ANALYST   | 7566 | 1990-06-03 | 6321.50 |  153.03 |     10 |
|  7966 | MILLER | CLERK     | 7782 | 1991-10-12 |  735.05 |  453.25 |     20 |
+-------+--------+-----------+------+------------+---------+---------+--------+
```

## 合并查询-UNION、UNION ALL

![image-20211122154537661](/images/JavaSE/21-MySql/image-20211122154537661.png)

![image-20211122154637130](/images/JavaSE/21-MySql/image-20211122154637130.png)

## 多表查询-外连接

![image-20211122154827000](/images/JavaSE/21-MySql/image-20211122154827000.png)

```sql
# 这里使用mgr  上级名称来演示
select worker.ename as "员工名称",worker.job "员工工作",worker.mgr "员工上级" ,boss.ename "上级名称"
 from emp as worker,emp as boss
 where worker.mgr = boss.empno;

+--------------+--------------+--------------+--------------+
| 员工名称       | 员工工作      | 员工上级      | 上级名称     |
+--------------+--------------+--------------+--------------+
| FORD         | ANALYST      |         7566 | JONES        |
| KING         | ANALYST      |         7566 | JONES        |
| MILLER       | CLERK        |         7782 | BLACK        |
| MILLER       | CLERK        |         7782 | BLACK        |
| SMITH        | CLERK        |         7902 | JAMES        |
+--------------+--------------+--------------+--------------+
# 可以看到，有些没有上级的员工是无法显示的，只显示了有上级的，为此需要外连接来让员工的上级可以完全显示
# 即使他没有上级，也要显示null
```

Mysql中外连接分为两种

### 左外连接

- 左外连接 如果`左侧的表能够完全显示`就是左外连接

  - **左边的表即使和右边的表**没有完全匹配的记录也能完全显示出来

  - 语法：

    ```sql
    select 字段  from
     左边的表 LEFT JOIN 右边的表
     ON 左边的表的某个值 = 右边的表的某个值;
    
    # 使用左外连接，显示所有员工的上级，包括没有上级的员工
    select worker.ename as "员工名称",worker.job "员工工作",worker.mgr "员工上级" ,boss.ename "上级名称"
     from emp as worker LEFT JOIN emp as boss
     ON worker.mgr = boss.empno;
    +--------------+--------------+--------------+--------------+
    | 员工名称      | 员工工作       | 员工上级      | 上级名称      |
    +--------------+--------------+--------------+--------------+
    | SMITH        | CLERK        |         7902 | JAMES        |
    | WARD         | SALESMAN     |         7698 | NULL         |
    | JONES        | SALESMAN     |         7698 | NULL         |
    | MARTIN       | MANAGER      |         7939 | NULL         |
    | BLACK        | SALESMAN     |         7698 | NULL         |
    | COALK        | MANAGER      |         7698 | NULL         |
    | SOCTT        | MANAGER      |         7939 | NULL         |
    | KING         | ANALYST      |         7566 | JONES        |
    | TURNER       | PRESIDENT    |         NULL | NULL         |
    | JAMES        | CLERK        |         7698 | NULL         |
    | FORD         | ANALYST      |         7566 | JONES        |
    | MILLER       | CLERK        |         7782 | BLACK        |
    | MILLER       | CLERK        |         7782 | BLACK        |
    +--------------+--------------+--------------+--------------+
    ```

### 右外连接

- 右外连接 如果`右侧的表能完全显示`就是右外连接

  - **右边的表即使和左边的表**没有完全匹配的记录也能完全显示出来

  - 语法

    ```sql
    select 字段  from
     左边的表 RIGHT JOIN 右边的表
     ON 右边的表的某个值 = 左边的表的某个值;
    
    # 使用左外连接，显示所有员工的下级，即使没有下级
    select worker.ename as "下级员工名称",worker.job "下级员工工作",worker.mgr "管理者ID" ,boss.ename "管理者名称"
     from emp as worker RIGHT JOIN emp as boss
     ON worker.mgr = boss.empno;
    +--------------------+--------------------+-------------+-----------------+
    | 下级员工名称         | 下级员工工作         | 管理者ID     | 管理者名称       |
    +--------------------+--------------------+-------------+-----------------+
    | NULL               | NULL               |        NULL | SMITH           |
    | NULL               | NULL               |        NULL | WARD            |
    | FORD               | ANALYST            |        7566 | JONES           |
    | KING               | ANALYST            |        7566 | JONES           |
    | NULL               | NULL               |        NULL | MARTIN          |
    | MILLER             | CLERK              |        7782 | BLACK           |
    | MILLER             | CLERK              |        7782 | BLACK           |
    | NULL               | NULL               |        NULL | COALK           |
    | NULL               | NULL               |        NULL | SOCTT           |
    | NULL               | NULL               |        NULL | KING            |
    | NULL               | NULL               |        NULL | TURNER          |
    | SMITH              | CLERK              |        7902 | JAMES           |
    | NULL               | NULL               |        NULL | FORD            |
    | NULL               | NULL               |        NULL | MILLER          |
    | NULL               | NULL               |        NULL | MILLER          |
    +--------------------+--------------------+-------------+-----------------+
    
    ```

# Mysql约束

嘛，这玩意可能是sql中创建表时必备的玩意了

## Primary key 主键约束

语法：`字段名 字段类型 PRIMARY KEY`

用于唯一的标识该字段（表行）的数据当定义主键后，该列**不能重复**

这个 。。。只能说是一张表都得用它

![image-20211122163807238](/images/JavaSE/21-MySql/image-20211122163807238.png)

```sql
# 前面添加主键
create table 表名(
 id int primary key,
    email varchar(50)
);
# 后面添加主键
create table 表名(
 id int ,
    email varchar(50),
    PRIMARY KEY(id)
);

# 一个表最多只能有一个主键，但是可以有复合主键

create table 表名(
 id int,
    email varchar(50),
 PRIMARY KEY(id,email)
);
# 让这两个值都不能重复

# 但是不能两种方式一起用

create table 表名(
 id int PRIMARY KEY, -- 绝对不能先在这定义主键后又在尾部定义主键 只能二选一
    name varchar(30);
    email varchar(50),
 PRIMARY KEY(id,name);
)
```

## NOT NULL 非空约束

这个不多说了

```sql
create table 表名(
 字段名 字段类型 NOT NULL
)
```

## UNIQUE 唯一约束

让某个字段不能有重复值

注意，这玩意一定要配合非空约束`not null`来使用

如果没有指定`not null`，则`unique`字段可以有多个null

```sql
create table 表名(
 字段值 字段类型 NOT NULL UNIQUE
);
```

## FOREIGN KEY 外键约束

语法：`FOREIGN KEY (本表字段名) REFERENCES 主表名(主键名或UNIQUE字段名)`

用语定义主表和从表之间 关系，外键约束要定义在从表上，且主表必须具有主键约束或是`unique`约束，当定义外键约束后，要求外键约束的字段（列）的数据（值）必须在主表的主键列存在或是为null

外键约束定义后，若主表要删除某个值，且该值正在外界约束的影响下，且从表正在使用他，需要先删除正在使用它的从表中用了它的内容，才能删除它的值

**一个从表中，外键可以有多个，任何表都可以是从表**

![image-20211122170615206](/images/JavaSE/21-MySql/image-20211122170615206.png)

![image-20211122164935895](/images/JavaSE/21-MySql/image-20211122164902068.png" alt="image-20211122164902068" style="zoom: 25%;" /><img src="/images/JavaSE/21-MySql/image-20211122164935895.png)

```sql
create table class_tab(
 id int primary key,
    name varchar(30) not null default ""
);

#学生表，外键约束
create table student_tab(
 id int primary key, 
    name varchar(32) not null default "",
    class_id int,
    FOREIGN KEY (class_id) REFERENCES class_tab (id)
);

# 测试数据
insert into class_tab values(1,"1年级1班"),(2,"2年级2班");

insert into student_tab values(1,"张三",1),(2,"李四",2);

#插入这条将会报错
insert into student_tab values(3,"王老五",3);
#Cannot add or update a child row: a foreign key constraint fails (`db1`.`student_tab`, CONSTRAINT `student_tab_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class_tab` (`id`))

# 插入该班级后再插入值 将可以正常插入
insert into class_tab values(3,"3年级3班");

insert into student_tab values(3,"王老五",3);

# 当然，如果在图形化软件里面，可以更直观的看到外键
+----+-------------+
| id | name        |
+----+-------------+
|  1 | 1年级1班    |
|  2 | 2年级2班    |
|  3 | 3年级3班    |
+----+-------------+

+----+-----------+----------+
| id | name      | class_id |
+----+-----------+----------+
|  1 | 张三      |        1 |
|  2 | 李四      |        2 |
|  3 | 王老五    |        3 |
+----+-----------+----------+

```

 图形化界面可以轻松地选择外键

![image-20211122170505505](/images/JavaSE/21-MySql/image-20211122170505505.png)

## Check约束 -要求字段满足指定条件（枚举约定）

![image-20211122171017894](/images/JavaSE/21-MySql/image-20211122171017894.png)

在Mysql8.0中，已经可以支持验证了，插入不合法的值，将插入失效

在`oracle`、`sql server`中，这个约束是一定会生效的

```sql
create table my_test_nx(
 id int primary key,
    name varchar(32),
    sex varchar(6) CHECK (sex IN('man','woman')),
    sal double check(sal>1000 and sal<2000)
);
insert into my_test_nx values(1,'张三','man',1001);
insert into my_test_nx values(2,'李四','woman',1999);

# mysql8 中 这条将插入失效
insert into my_test_nx values(3,'王老五','男',1999);
# ERROR 3819 (HY000): Check constraint 'my_test_nx_chk_1' is violated.
# 这条也是
insert into my_test_nx values(3,'王老五','man',22333);
# ERROR 3819 (HY000): Check constraint 'my_test_nx_chk_2' is violated.

+----+--------+-------+------+
| id | name   | sex   | sal  |
+----+--------+-------+------+
|  1 | 张三   | man   | 1001 |
|  2 | 李四   | woman | 1999 |
+----+--------+-------+------+

```

## Auto_increment-自增长

如其名，自动增长，适用于主键等 通常情况下主键都会用它

也得名：主键自增

![image-20211122173148429](/images/JavaSE/21-MySql/image-20211122173148429.png)

```sql
#自增长
create table test_auto(
 id int primary key auto_increment,
    name varchar(255)
);

# 修改默认的自增长开始的值
# 1.创建时指定
create table test_auto(
 id int primary key auto_increment,
    name varchar(255)
)auto_increment=10001;
# 2 创建后修改
alter table test_auto AUTO_INCREMENT = 1000;

```

### 自增长增归零

·如果曾经的数据都不需要的话，可以直接清空所有数据，并将自增字段恢复从1开始计数
`truncate table 表名`

或者要保留数据，但是后插入的数据都是按照新的值来开始计算

`ALTER TABLE 表名 AUTO_INCREMENT = 值;`

```sql
insert into test_auto(name) values('jock'),('having'),('booluse');
+------+---------+
| id   | name    |
+------+---------+
| 1000 | jock    |
| 1001 | having  |
| 1002 | booluse |
+------+---------+
ALTER TABLE test_auto AUTO_INCREMENT = 6666;
insert into test_auto(name) values('jiny'),('makr'),('ddd');
+------+---------+
| id   | name    |
+------+---------+
| 1000 | jock    |
| 1001 | having  |
| 1002 | booluse |
| 6666 | jiny    |
| 6667 | makr    |
| 6668 | ddd     |
+------+---------+

```

# Mysql索引

![image-20211122173232565](/images/JavaSE/21-MySql/image-20211122173232565.png)

先按照[这个教程](https://blog.csdn.net/qq_40530040/article/details/107623254)创建一个海量表

或者按照下方代码顺序的运行( 分开运行)

第一步： 这一步可能会出错，出错的话就三个建表的分开执行即可

```sql
# 第一行代码的用途：https://blog.csdn.net/topasstem8/article/details/8216740/
set global log_bin_trust_function_creators=TRUE;
CREATE TABLE dept( /*部门表*/
deptno MEDIUMINT   UNSIGNED  NOT NULL  DEFAULT 0,
dname VARCHAR(20)  NOT NULL  DEFAULT "",
loc VARCHAR(13) NOT NULL DEFAULT ""
) ;
#创建表EMP雇员
CREATE TABLE emp
(empno  MEDIUMINT UNSIGNED  NOT NULL  DEFAULT 0, /*编号*/
ename VARCHAR(20) NOT NULL DEFAULT "", /*名字*/
job VARCHAR(9) NOT NULL DEFAULT "",/*工作*/
mgr MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,/*上级编号*/
hiredate DATE NOT NULL,/*入职时间*/
sal DECIMAL(7,2)  NOT NULL,/*薪水*/
comm DECIMAL(7,2) NOT NULL,/*红利*/
deptno MEDIUMINT UNSIGNED NOT NULL DEFAULT 0 /*部门编号*/
) ;
#工资级别表
CREATE TABLE salgrade
(
grade MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,
losal DECIMAL(17,2)  NOT NULL,
hisal DECIMAL(17,2)  NOT NULL
);
#测试数据
INSERT INTO salgrade VALUES (1,700,1200);
INSERT INTO salgrade VALUES (2,1201,1400);
INSERT INTO salgrade VALUES (3,1401,2000);
INSERT INTO salgrade VALUES (4,2001,3000);
INSERT INTO salgrade VALUES (5,3001,9999);
```

第二步

```sql
delimiter $$

#创建一个函数，名字 rand_string，可以随机返回我指定的个数字符串
create function rand_string(n INT)
returns varchar(255) #该函数会返回一个字符串
begin
#定义了一个变量 chars_str， 类型  varchar(100)
#默认给 chars_str 初始值   'abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ'
 declare chars_str varchar(100) default
   'abcdefghijklmnopqrstuvwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ'; 
 declare return_str varchar(255) default '';
 declare i int default 0; 
 while i < n 
 do
    # concat 函数 : 连接函数mysql函数
   set return_str =concat(return_str,substring(chars_str,floor(1+rand()*52),1));
   set i = i + 1;
   end while;
  return return_str;
  end $$


#这里我们又自定了一个函数,返回一个随机的部门号
create function rand_num( )
returns int(5)
begin
declare i int default 0;
set i = floor(10+rand()*500);
return i;
end $$

 #创建一个存储过程， 可以添加雇员
create procedure insert_emp(in start int(10),in max_num int(10))
begin
declare i int default 0;
#set autocommit =0 把autocommit设置成0
 #autocommit = 0 含义: 不要自动提交
 set autocommit = 0; #默认不提交sql语句
 repeat
 set i = i + 1;
 #通过前面写的函数随机产生字符串和部门编号，然后加入到emp表
 insert into emp values ((start+i) ,rand_string(6),'SALESMAN',0001,curdate(),2000,400,rand_num());
  until i = max_num
 end repeat;
 #commit整体提交所有sql语句，提高效率
   commit;
 end $$

#这里我们又自定了一个函数,返回一个随机的部门号
create function rand_num( )
returns int(5)
begin
declare i int default 0;
set i = floor(10+rand()*500);
return i;
end $$

 #创建一个存储过程， 可以添加雇员
create procedure insert_emp(in start int(10),in max_num int(10))
begin
declare i int default 0;
#set autocommit =0 把autocommit设置成0
 #autocommit = 0 含义: 不要自动提交
 set autocommit = 0; #默认不提交sql语句
 repeat
 set i = i + 1;
 #通过前面写的函数随机产生字符串和部门编号，然后加入到emp表
 insert into emp values ((start+i) ,rand_string(6),'SALESMAN',0001,curdate(),2000,400,rand_num());
  until i = max_num
 end repeat;
 #commit整体提交所有sql语句，提高效率
   commit;
 end $$
```

第三步：

```sql
delimiter $$
# 这里是生成的数据量
CALL insert_emp ( 100001, 10000 ) $$
DELIMITER;
# 这里的10000 可以替换为自己想要的数值，我替换的是100w 用时300s
```

对自己电脑有信心的话可以1000w，千万不要1个亿，除非你的时间和硬盘空间是真滴多

接下来尝试查询下：

```sql
select * from emp where empno=123456;
+--------+--------+----------+------+------------+---------+--------+--------+
| empno  | ename  | job      | mgr  | hiredate   | sal     | comm   | deptno |
+--------+--------+----------+------+------------+---------+--------+--------+
| 123456 | qJxjJC | SALESMAN |    1 | 2021-11-22 | 2000.00 | 400.00 |    432 |
+--------+--------+----------+------+------------+---------+--------+--------+
1 row in set (0.75 sec)

# 可以看到，这只是插入了100w条数据，查询的速度就变成了0.75s
# 1kw大概要5~10s
# 如果在工作中，查个东西给用户要这么久时间，会被骂死..
# 举个形象点的例子，打个游戏，买个装备，要在商店前等到5秒才能拿到装备
# 5秒在那里卡着干等，什么都做不了
```

接下来使用索引优化下表

![image-20211122204414063](/images/JavaSE/21-MySql/image-20211122204414063.png)

优化前，这个表是72mb，查询一次大概要1s的时间

## 创建索引

语法：`CREATE INDEX 索引名 ON 表名(字段);`

索引创建需要时间，索引跟数据一样，也占用空间

但是能对查询速度有显著提升

```sql
CREATE INDEX empno_index ON emp(empno);
# empno_index 索引名称
# ON emp(empno) 表示在表emp的empno这个字段创建索引;
# 我这里创建索引花了3s
```

![image-20211122204942231](/images/JavaSE/21-MySql/image-20211122204942231.png)

创建完毕后，文件大了10mb

索引本身也是会占用磁盘空间

接下来尝试搜索下

```sql
select * from emp where empno=123486;
+--------+--------+----------+-----+------------+---------+--------+--------+
| empno  | ename  | job      | mgr | hiredate   | sal     | comm   | deptno |
+--------+--------+----------+-----+------------+---------+--------+--------+
| 123486 | XHtVyJ | SALESMAN |   1 | 2021-11-22 | 2000.00 | 400.00 |    365 |
+--------+--------+----------+-----+------------+---------+--------+--------+
1 row in set (0.00 sec)
# 瞬间完成...
# 如果是1000w条数据，也是可以这样完成 不信的话自行尝试...

# 当然，创建索引后，只对创建了索引的列有效
select * from emp where ename='SxKgBm';
mysql> select * from emp where ename='SxKgBm';
+--------+--------+----------+-----+------------+---------+--------+--------+
| empno  | ename  | job      | mgr | hiredate   | sal     | comm   | deptno |
+--------+--------+----------+-----+------------+---------+--------+--------+
| 114014 | SxKgBm | SALESMAN |   1 | 2021-11-22 | 2000.00 | 400.00 |    339 |
| 627592 | SxKgBm | SALESMAN |   1 | 2021-11-22 | 2000.00 | 400.00 |    326 |
+--------+--------+----------+-----+------------+---------+--------+--------+
2 rows in set (0.84 sec)
# 没创建索引的列依旧要1s左右的时间

# 如果为enmae 也创建个索引：
CREATE INDEX ename_index ON emp(ename);
# 创建完毕后，文件变成了108MB
# 搜索
select * from emp where ename='SxKgBm';
+--------+--------+----------+-----+------------+---------+--------+--------+
| empno  | ename  | job      | mgr | hiredate   | sal     | comm   | deptno |
+--------+--------+----------+-----+------------+---------+--------+--------+
| 114014 | SxKgBm | SALESMAN |   1 | 2021-11-22 | 2000.00 | 400.00 |    339 |
| 627592 | SxKgBm | SALESMAN |   1 | 2021-11-22 | 2000.00 | 400.00 |    326 |
+--------+--------+----------+-----+------------+---------+--------+--------+
2 rows in set (0.00 sec)


```

当然，目前也有很多不良程序员，会直接把产品给用户用，直到用户发觉很慢的时候，让用户加钱优化

## 索引机制

下图到查询到1后不确定后面还没有没有id=1的，所以要全表扫描

![image-20211122211047180](/images/JavaSE/21-MySql/image-20211122211047180.png)

![image-20211122212123404](/images/JavaSE/21-MySql/image-20211122212123404.png)

索引快的原因

- 形成了二叉树或B树等 数据结构，让查询起来变得高效快捷
  - 二叉树这玩意以后一定得学

索引的代价

- 磁盘占用增加

  - 索引的数据结构也是要占用空间的

- DML(update delete insert)效率变慢（影响不是很大）

  - 增删改一个数据后，要重新的去维护这个索引

  ![image-20211122212421742](/images/JavaSE/21-MySql/image-20211122212421742.png)

当然，在实际项目中，实际上90%左右的业务都是在进行查询，只有10%左右的业务在进行增删改

## 索引的类型

1. 主键索引，主键自动为主索引（加了`primary key`的字段就不需要加其他的索引了）

   ```sql
   crate table t1(
    id int PRIMARY KEY
       # 主键，同时也是索引，称为主键索引
   )
   ```

2. 唯一索引`unique` 同上

3. 普通索引`index`

   ```sql
   CREATE INDEX 索引名 ON 表名(字段);
   ```

4. 全文索引(`fulltext`)

   - mysq自带这玩意，但是不好用，效率也比较低
   - 在实际开发中，很少会用mysql自带的全文索引，一般都是用一些框架的全文搜索：
     - 比如Java的`Solr`和`ElasticSearch`框架
   - 一般开发中不使用mysql自带的全文索引（任何语言都是如此）

## 各种类型的索引添加、查询、删除、修改

**添加索引：**

`create [可选 UNIQUE] index 索引名 on 表名(字段1 [可选：length]  [可选 ASC|DESC], 字段2...  )`

如果某列的值是不会重复的，则优先考虑unique索引

添加unique索引的同时也会添加唯一约束

或者

`alter table 表名 add index 索引名 (字段名...)`

这里也可以通过这种方式来添加主键索引`alter table 表名 add primary key (字段);`

**查看索引：**

- `show index from  表名;`
- `show indexes from 表名;`

- `show keys from 表名`

三种方式都是相同的结果

- `desc 表名` 中的KEY字段就是索引 通过这种方式查找出来的索引信息没有前面的那么详细

**删除普通索引：**

`drop index 索引名称 on 表名;`

删除主键索引：`alter table 表名 drop primary key;`

修改索引：先删除，然后添加新的索引~

```sql
create table ts(
 id int,
    name varchar(32)
);

#查询一个表是否有索引
SHOW INDEXES FROM ts;
#Empty set (0.00 sec)
# 没有任何索引

# 添加唯一索引
create unique index id_index ON ts(id);

# 添加普通索引-alter方式
alter table ts add index name_index (name);

# 添加主键索引
create table ts2(
 id int, # 要么在这里加
    name varchar(32)
    #要么在这里加
);
# 创建时候没加的话就：
alter table ts2 add primary key (id);

```

添加完索引后查看：唯一索引和普通索引的：

![image-20211122220117209](/images/JavaSE/21-MySql/image-20211122220117209.png)

主键索引的：

![image-20211122220509463](/images/JavaSE/21-MySql/image-20211122220509463.png)

```sql
# 删除普通索引
drop index id_index on ts;
drop index name_index on ts;

# 删除主键索引
alter table ts2 drop primary key;

```

## 索引使用原则

创建索引前，先看看是否遵循以下原则（当然上司特别要求的玩意的话，啥索引都可以放上去）

1. 较频繁作为查询条件字段**应该**创建索引

   ```sql
   select * from emp where empno = 1;
   ```

2. 唯一性太差的字段**不适合**单独创建索引，即使该字段频繁的作为查询条件

   ```sql
   select * from emp where sex="男";
   ```

3. 更新非常频繁的字段**不适合**创建索引

   ```sql
   select * from emp where logincount = 1;
   ```

4. 不会出现在where字句中的字段**不该**创建索引

# Mysql事务

事务用于保证数据的一致性，它由一组相关的dml语句构成，该组的dml语句要么全部成功，要么全部失败
如：转账就要用事务来处理，用以确保事务的一致性

当执行事务操作时(DML语句)，MYSQL会在表上加锁，防止其他用户修改表的数据，这对用户来讲是非常重要的

![image-20211122222616278](/images/JavaSE/21-MySql/image-20211122222616278.png)

使用MySQL的事务，第一步**必须得确保**Mysql当前是是innodb引擎，查看方式

`show engines`

![image-20211122225446144](/images/JavaSE/21-MySql/image-20211122225446144.png)

看到innoDB这里的support是default即可；如果不是就要百度自行开启

## 基本语法

- `start transaction` 开始一个事务
  - 或者`set autocommit=off`
- `savepoint` 保存点名 设置保存点
- `rollback to` 保存点名 回退事务
- `rollback` 回退全部事物
- `commit` 提交事务，所有的操作生效，不能回退

![image-20211122224421237](/images/JavaSE/21-MySql/image-20211122224421237.png)

![image-20211122223136404](/images/JavaSE/21-MySql/image-20211122223136404.png)

回滚可以让事务能吃后悔药

```sql
# 1  测试表
create table person(
 id int,
    name varchar(32)
);
# 2 开始事务
START TRANSACTION;
# 3 设置保存点
SAVEPOINT a;
# 执行dml操作
INSERT INTO person values(100,'tom');
select * from person;
+------+------+
| id   | name |
+------+------+
|  100 | tom  |
+------+------+

# 设置第二个保存点
savepoint b;
# 执行dml操作
INSERT INTO person values(200,'jack');
select * from person;
+------+------+
| id   | name |
+------+------+
|  100 | tom  |
|  200 | jack |
+------+------+

# 回退到B保存点
ROLLBACK TO b;
select * from person;

+------+------+
| id   | name |
+------+------+
|  100 | tom  |
+------+------+

#继续回退
rollback to a;
select * from person;
#--没有任何记录

#如果直接rollback
ROLLBACK; 
# 直接回退到事物开始的状态

INSERT INTO person values(200,'jack');

# 提交所有事物，让其无法回退 并且将所有保存点一并删除
commit;
select * from person;

#如果试图再次回退
rollback to a;
#ERROR 1305 (42000): SAVEPOINT a does not exist



```

## 事务的细节

![image-20211122224643847](/images/JavaSE/21-MySql/image-20211122224643847.png)

数据库的存储引擎一定要是innodb！

## Mysql的事务隔离级别

1. 多个连接开启各自事务操作数据库中数据时，数据库系统要负责隔离性，以保证各个连接在获取数据时的准确性
2. 如果不考虑隔离性，可能会引发如下问题：
   - 脏读
     当一个事务读取另一个事务尚未提交的改变(增删改)时，产生脏读
   - 不可重复读
     同一查询在同一事务中多次进行，由于其他提交事务所做的修改或删除，每次返回不同的结果集，此时发生不可重复度
   - 幻读
     同一查询在同一事务中多次进行，由于其他提交事务所做的插入操作，每次返回不同的结果，此时发生幻读

![image-20211122230850135](/images/JavaSE/21-MySql/image-20211122230850135.png)

![image-20211122231201037](/images/JavaSE/21-MySql/image-20211122231201037.png)

查看当前Mysql的隔离级别：

- Mysql5.7:
  - `select @@tx_isolation;`
- Mysql 8+:
  - `select @@transaction_isolation;`
  - `show variables like 'transaction_isolation';`

可以看到，当前Mysql的隔离级别是(Mysql 8):

```sql
+-------------------------+
| @@transaction_isolation |
+-------------------------+
| REPEATABLE-READ         |
+-------------------------+
# 默认级别-可重复度
```

### 读未提交（Read uncommitted）

为了演示，先把其中一个控制台（第二个控制台）的隔离级别改成读未提交（Read uncommitted）

```sql
SET SESSION TRANSACTION isolation LEVEL read uncommitted;
#isolation就是隔离的意思
# level 就是级别的意思
```

然后查看其隔离级别：

```sql
# 第一个控制台： 可重复度
+-----------------------+-----------------+
| Variable_name         | Value           |
+-----------------------+-----------------+
| transaction_isolation | REPEATABLE-READ |
+-----------------------+-----------------+

#第二个控制台： 读未提交
+-----------------------+------------------+
| Variable_name         | Value            |
+-----------------------+------------------+
| transaction_isolation | READ-UNCOMMITTED |
+-----------------------+------------------+
```

隔离级别是跟事务相关的，一定要先启动事务，才能谈隔离级别的问题，离开事务就不要谈隔离级别的问题

首先创建一个表

```sql
use table db1;
create account(id int ,name varchar(32),money int);
```

然后两个控制台均开启一个事务，

```sql
start transaction;
```

然后console1 写入一个数据

```
insert into account values(1,"张三",1000);
```

然后两个表同时查询这一个表，发现：

```sql
# console 1
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
+------+--------+-------+

# console 2
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
+------+--------+-------+

```

这就是脏读：**当一个事务读取另一个事务尚未提交的改变(增删改)时，产生脏读**

然后我再往console 1中修改下内容，再添加一个新的value

```sql
update account set money =800 where id = 100;
insert into account values(2,"jock",222);
```

此时再查看console2

```sql
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
|    2 | jock   |   222 |
+------+--------+-------+
```

发现他这之中显示了console1对表操作的结果

这个本应该是不存在的------

​ 这里把console 1 叫做A，console 2叫做B

​ 事务的本意(潜台词)是：让B在进入事务的时间点，只展示改时间点有的内容，即：一个空的account表，而不是每次A操作，B就能同步感知A操作的结果，进而影响B的查询，只要B还没有提交`commit`，B读取到的就应该是它开启事务时SQL所拥有的数据，而不受到其他事务对SQL的影响

​ 事务的最理想效果：当B开启后连接到ACCOUNT表并对其操作时，B不会接收到A操作带来的影响，B的操作同时也不回影响A，也不希望互相影响到C 、D、E.....的操作和其带来的影响

其实到这一步的时候，已经可以发现，读未提交（Read uncommitted）已经出现了 脏读、不可重复读和幻读

### 读已提交(Read committed)

​  接下来将A和B的事务都提交，然后A重新开启一个新的事务，B将隔离级别改变为读已提交(Read committed) 并开启一个新的事务

```sql
# A & B
commit;

# A
start transaction;

# B
SET SESSION TRANSACTION isolation LEVEL read committed;
start transaction;

```

然后A添加一条数据，A、B再进行查找这个表

```sql
# A 
 insert into account values(3,'scott',8000);
 
# A
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
|    2 | jock   |   222 |
|    3 | scott  |  8000 |
+------+--------+-------+

# B
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
|    2 | jock   |   222 |
+------+--------+-------+
 
```

可以看到B的表中并没有出现A的表中所出现的第三条数据，即：读已提交(Read committed)隔离开启后，将不会出现脏读了

然后A再修改一条数据并提交，查看B此时的数据：

```sql
# A
update account set money = 1800 where id = 2;
commit;


# B
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
|    2 | jock   |  1800 |
|    3 | scott  |  8000 |
+------+--------+-------+

# B

commit;

```

可以发现 ，B表中的不可重复读，和幻读问题依旧存在

由上可知，在读已提交(Read committed)级别下，脏读已经不复存在，但是依旧出现了不可重复读和幻读

### 可重复读(Repeatable read)

 接下来把B改为可重复读(Repeatable read)并开启新的事务

```sql
# A
 start transaction;
 
# B 
SET SESSION TRANSACTION isolation LEVEL Repeatable read
start transaction;
```

然后A添加一条数据 ，B进行select

```sql
# A
insert into account values(4,'milan',300);
# B
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
|    2 | jock   |  1800 |
|    3 | scott  |  8000 |
+------+--------+-------+
```

 可以看到并未受A的影响

然后A修改一条数据

```sql
# A
update account set money = 100 where id = 3;

# B
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
|    2 | jock   |  1800 |
|    3 | scott  |  8000 |
+------+--------+-------+
# B依旧没有收到影响
```

然后A commit

```sql
# A 
commit;

# B
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |  1000 |
|    2 | jock   |  1800 |
|    3 | scott  |  8000 |
+------+--------+-------+
```

可以发现B没有受到影响，看不到A的变化

这就是可重复读(Repeatable read)，它将不会出现以上三种问题；

当然，还有最后一个：

### 可串行化(Serializable)

​ 这个继承了可重复读(Repeatable read)的优良传统，并且有一个新的特点：加锁：

​ 如果说他发现有一张表正在被操作且没有被提交`commit`，它会卡在这个地方，不会对表进行任何实际操作，非常神奇

将B表隔离级别设定为可串行化，A表不变

```sql
# A & B
commit;

# B 
SET SESSION TRANSACTION isolation LEVEL Serializable;
+-------------------------+
| @@transaction_isolation |
+-------------------------+
| SERIALIZABLE            |
+-------------------------+

# A & B

start transaction;

```

A 添加内容

 ```sql
 insert into account values(5,'trray',600);
 update account set money = 400 where id = 1;
 ```

此时 ，B查询内容

```
select * from account;
```

可以发现，B的终端卡住了，并且过了一会儿弹出：

`ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction`

锁定等待超时;试着重新启动事务；

然后我再次进行查询，并在10s后在A中commit

```sql
# B 
select * from account;

# A 等待10秒
commit;

#B
+------+--------+-------+
| id   | name   | money |
+------+--------+-------+
|    1 | 张三   |   400 |
|    2 | jock   |  1800 |
|    3 | scott  |   100 |
|    4 | milan  |   300 |
|    5 | trray  |   600 |
+------+--------+-------+
5 rows in set (9.44 sec)

```

可以看到，几乎是A一提交，B就出了结果

这就是可串行化(Serializable)

## 事务隔离级别-指令

1. 查看当前回话隔离级别：

   - Mysql5.7:
     - `select @@tx_isolation;`

   - Mysql 8+:
     1. `select @@transaction_isolation;`
     2. ``show variables like 'transaction_isolation';`

2. 查看系统当前隔离级别

   - Mysql5.7
     - `select @@global.tx_isolation;`
   - Mysql8+
     - `select @@global.transaction_isolation;`

3. 设置当前回话隔离级别

   - `SET session transaction isolation LEVEL 隔离级别`
     - 读未提交（`Read uncommitted`）
     - 读已提交(`Read committed`)
     - 可重复读(`Repeatable read`)
     - 可串行化(`Serializable`)

4. 设置系统当前隔离级别

   - `set global transaction isolation level 隔离级别`

   - 也可以在`my.ini`或者`my.cfg`中的[mysqld]加上并重启mysql来设置全局默认隔离级别

     ```ini
     [mysqld]
     ...其他内容
     transaction-isolation = 隔离级别
     # 注意 这里的隔离级别要采用全大写横线的命名方式：
     # 如：
     Read committed--->  READ-COMMITTED
     ```

     ```sh
     # 并重启mysql
     
     # windows
     net restart mysql;
     
     # linux /ubuntu
     sudo service mysql restart;
     
     # docker 
     docker restart mysql;
     ```

5. Mysql默认的事务隔离级别是 `repatable read`，一般情况下，没有特殊要求，没有必要修改（因为该级别可以满足绝大部门项目要求）

### 事务的ACID特性

![image-20211123004055233](/images/JavaSE/21-MySql/image-20211123004055233.png)

# Mysql表类型和存储引擎

1. Mysql的表类型由存储引擎（Storage Engines）决定，主要包括MyISAM、innoDB、Memory等
2. Mysql数据表主要支持六种类型，分别是：CSV、Memory、ARCHIVE、MRG_MYISAM、MYISAM、InnoDB
3. 这六种分为两类
   - 事务安全型(transaction-safe)---支持事务
     - innoDB 系统默认是这个
   - 非事物安全型（non-transaction-safe）---不支持事务
     - CSV
     - Memory
     - ARCHIVE
     - MRG_MYISAM
     - MYISAM

- 查看所有引擎：`show engines;`
  ![image-20211123121320164](/images/JavaSE/21-MySql/image-20211123121320164.png)

## 引擎的选择

一般情况会选择的

![image-20211123121826094](/images/JavaSE/21-MySql/image-20211123121826094.png)

![image-20211123122055639](/images/JavaSE/21-MySql/image-20211123122055639.png)

![image-20211123122248185](/images/JavaSE/21-MySql/image-20211123122248185.png)![image-20211123132241153](/images/JavaSE/21-MySql/image-20211123132241153.png)

## 引擎使用

```sql
# 默认就是innodb，这里不做演示


# 创建一个表，引擎为myisam
create table test_engine01(
 id int,
    name varchar(32)
)ENGINE myisam;
-- 添加速度快，不支持外键和事务，支持表锁

# memory引擎
create table test_engine01(
 id int,
    name varchar(32)
)ENGINE memory;
# 数据存储在内存中（关闭或重启mysql会导致所有数据丢失）
# 执行速度很快（没有io读写）
# 默认支持索引（hash table）

```

## 修改存储引擎

语法：`alter table 表名 engine = 存储引擎`

```sql
# 修改前得确定表是否符合要转到的引擎的规定
alter table emp engine = myisam;
```

# 视图(View)

- 先看一个需求：emp表的列(字段)信息很多，有些信息是个人重要信息，比如sal、comm、mgr、hiredate
  ![image-20211123132622996](/images/JavaSE/21-MySql/image-20211123132622996.png)
- 如果我们希望**某个用户只能查询**emp表的 empno、 ename、job和deptno信息
- 这个时候有很多方案，但是最好用的大概就是视图了

视图的基本概念：

1. 视图是一个虚拟表。其内容由查询定义。和真实的表一样，视图包含列(字段)，**其数据来源对应真实的表**(基表)
2. 视图和基表的关系示意图
   ![image-20211123133743001](/images/JavaSE/21-MySql/image-20211123133743001.png)

## 视图的基本使用

1. 创建`create view 视图名 as select语句`
2. 修改(更新视图) `alter view 视图名 as select语句`
3. 显示视图的结构`show create view 视图名`
4. 删除视图 `drop view 视图名1,视图名2...`

```sql
# 视图的增删改查
# 只查询emp表的 empno、 ename、job和deptno信息
# 创建
create view emp_view01 as select empno, ename,job,deptno from emp;

# 查看结构
desc emp_view01;
+--------+--------------------+------+-----+---------+-------+
| Field  | Type               | Null | Key | Default | Extra |
+--------+--------------------+------+-----+---------+-------+
| empno  | mediumint unsigned | NO   |     | 0       |       |
| ename  | varchar(20)        | NO   |     |         |       |
| job    | varchar(9)         | NO   |     |         |       |
| deptno | mediumint unsigned | NO   |     | 0       |       |
+--------+--------------------+------+-----+---------+-------+

# 查
select * from emp_view01 limit 5,5;
+--------+--------+----------+--------+
| empno  | ename  | job      | deptno |
+--------+--------+----------+--------+
| 100007 | ofLpoA | SALESMAN |    360 |
| 100008 | ZSoQnR | SALESMAN |    213 |
| 100009 | BwDASN | SALESMAN |    132 |
| 100010 | WWRuxd | SALESMAN |     15 |
| 100011 | RipbkV | SALESMAN |    488 |
+--------+--------+----------+--------+

# 查看创建视图时的指令：
show create view emp_view01;

# 删除视图
drop view emp_view01;
```

## 视图的使用细节

![image-20211123135455381](/images/JavaSE/21-MySql/image-20211123135455381.png)

![image-20211123140408719](/images/JavaSE/21-MySql/image-20211123140408719.png)

```sql
# 视图1号
desc emp_view01;
+--------+--------------------+------+-----+---------+-------+
| Field  | Type               | Null | Key | Default | Extra |
+--------+--------------------+------+-----+---------+-------+
| empno  | mediumint unsigned | NO   |     | 0       |       |
| ename  | varchar(20)        | NO   |     |         |       |
| job    | varchar(9)         | NO   |     |         |       |
| deptno | mediumint unsigned | NO   |     | 0       |       |
+--------+--------------------+------+-----+---------+-------+

# 把他的empno和ename做成新的视图
create view emp_view02 as select empno,ename from emp_view01;

select * from emp_view02 limit 5,5;
+--------+--------+
| empno  | ename  |
+--------+--------+
| 100007 | ofLpoA |
| 100008 | ZSoQnR |
| 100009 | BwDASN |
| 100010 | WWRuxd |
| 100011 | RipbkV |
+--------+--------+


# 修改view02 就相当于更该基表emp;

update  emp_view02 set ename ="张三" where empno=100007;

select * from emp_view02 where empno = 100007;
+--------+--------+
| empno  | ename  |
+--------+--------+
| 100007 | 张三   |
+--------+--------+
select * from emp_view01 where empno = 100007;
+--------+--------+----------+--------+
| empno  | ename  | job      | deptno |
+--------+--------+----------+--------+
| 100007 | 张三   | SALESMAN |    360 |
+--------+--------+----------+--------+
select * from emp where empno = 100007;
+--------+--------+----------+-----+------------+---------+--------+--------+
| empno  | ename  | job      | mgr | hiredate   | sal     | comm   | deptno |
+--------+--------+----------+-----+------------+---------+--------+--------+
| 100007 | 张三   | SALESMAN |   1 | 2021-11-22 | 2000.00 | 400.00 |    360 |
+--------+--------+----------+-----+------------+---------+--------+--------+
```

# Mysql管理-用户管理

mysql中的用户，都存储在系统数据库mysql中的user表中

![image-20211123140910846](/images/JavaSE/21-MySql/image-20211123140910846.png)

其中user表的重要字段说明：

1. `host`： 运行登陆的位置，localhost表示本机，也可以指定Ip地址，比如：172.17.0.1，115.15.15.15....
2. `user`：用户名
3. `authentication_string`密码
   - Mysql8前，是通过Mysql的password()函数加密之后的密码（mysql_native_password）
   - Mysql8后，可以通过caching_sha2_password加密密码
     - 当然，默认还是(mysql_native_password)加密密码
   - 密码字段左边会显示密码的加密方式
     ![image-20211123143351050](/images/JavaSE/21-MySql/image-20211123143351050.png)

## 创建、删除用户

如果创建的时候没有指定host，则默认为%:在任何地方都可以登陆

`create user xxx`;

指定host：`create user 'xxx'@xxx`

- host指定方式：
  - `%` :所有地方
  - `127.0.0.5` 特定地方
  - `192.168.1.%` 192.168.1下的所有地址都可链接
  - `255.255.%.%` 255.255下的所有地址都可连接

在删除用户的时候，如果host不是%，则必须要明确指定`用户名@登录位置`

`drop user jack` 等价于`drop user 'jack'@'%'`

```sql
# 创建用户

create user `用户名`@`允许登陆位置` identified by '密码';

# 创建用户 同时指定密码 注意 `` 这个绝对不能省略 但是可以替换成''
# 并且 用户名@密码 @前后不能有空格

create user 'mycom'@'localhost'  identified by '123456';


# 删除用户
drop user `用户名`@`允许登录位置`;

# 删除的时候加不加引号都可以 但是建议加上
drop user mycom@localhost;

```

登陆：

```shell
mysql -u mycom -p123456;
```

## 修改密码

Mysql5.7

```sql
use mysql;
# 修改自己的密码
set password = password('新密码')；

#修改他人的密码
set password for '用户名'@'登录位置' = password('新密码');

# 修改完密码后需要刷新权限
flush privileges;

```

Mysql8+

```sql
ALTER USER '用户名'@'登陆位置' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY '新密码';
# MYSQL_NATIVE_PASSWORD 是密码校验规则 不可省略
# 可以替换成 caching_sha2_password

# 例如：
alter user 'mycom'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1234';

# 修改完密码后需要刷新权限
flush privileges;

```

## 用户权限

在登陆到mycom用户后，查看数据库，发现了如下信息

```sql
show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
+--------------------+
```

![image-20211123144656109](/images/JavaSE/21-MySql/image-20211123144656109.png)

Mysql的权限大概有这些：

![image-20211123145819580](/images/JavaSE/21-MySql/image-20211123145819580.png)

### 给用户授权、回收权限

#### 授权

语法：`grant  权限对象 on 库.对象名 to '用户名'@'登录位置'`

在mysql5.7中在授权时可以修改密码:

`grant  权限对象 on 库.对象名 to '用户名'@'登录位置' [identified by '密码']`

- identified by可以省略就是修改用户密码
  - 如果该用户存在，就修改用户的密码
  - 如果用户不存在，就创建该用户
- 在mysql8之前应该都是有效的，mysql8后不允许这样，授权，创建用户，给用户修改密码是三档事情

`权限列表`，多个权限用逗号分开

```sql
grant select on ......
grant select,delete,create on ......

#赋予用户在该对象上的所有权限，all privileges  必须一块使用 不能单独 all on 或者 privileges  on
grant all privileges  on ....
```

`库.对象名`的特别说明

- `*.*` ：代表本系统中所有数据库的所有对象（表，视图，存储过程等）
- `库名.*` ：表示某个数据库中的所有数据对象（表，视图，存储过程等）
- `库名.对象名`: 表示某个数据库中的单个对象，对象名可以是表，视图，存储过程等 ，一般都是表名

授权完毕如果没有生效的话：刷新权限`flush privileges;`

#### 回收权限

基本语法: `revoke 权限列表 on 库.对象名 from '用户名'@'登录位置'`

也可以：`revoke all on 库.对象名 from '用户名'@'登录位置'` 直接回收某个用户的所有权限

撤销授权后如果没有生效的话：刷新权限`flush privileges;`

![image-20211123152210307](/images/JavaSE/21-MySql/image-20211123152210307.png)

```sql
# mysql8.0.1 ROOT USER
create user 'a'@'localhost'  identified by '123';
create database testdb;
use testdb;
create table news(
 id int primary key Auto_increment,
    author varchar(32),
    title varchar(50),
    body text
)Auto_increment=1001;

#授权
grant insert,select,update,delete on testdb.news to 'a'@'localhost';

#修改密码
ALTER USER 'a'@'localhost' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY '12345';

```

然后用户登陆

```shell
mysql -ua - p 12345;
```

进入后增删改查数据

```sql
show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| testdb             |
+--------------------+
use testdb;

show tables;
+------------------+
| Tables_in_testdb |
+------------------+
| news             |
+------------------+

## 添加数据
insert into news(author,title,body) values
 ("周树人","狂人日记","某君昆仲，今隐其名，皆余昔日在中学时良友；分隔多年，消息渐阙。日前偶闻其一大病..."),
 ("鲁迅","彷徨","寂寞新文苑，平安旧战场，两间余一卒，荷戟独彷徨。");


# 修改数据
update news set body = "123" where author ="周树人";
update news set body = "456" where author ="鲁迅";
select * from news;
+------+-----------+--------------+------+
| id   | author    | title        | body |
+------+-----------+--------------+------+
| 1001 | 周树人    | 狂人日记     | 123  |
| 1002 | 鲁迅      | 彷徨         | 456  |
+------+-----------+--------------+------+

# 删除
delete from news where author ="周树人";
select * from news;
+------+--------+--------+------+
| id   | author | title  | body |
+------+--------+--------+------+
| 1002 | 鲁迅   | 彷徨   | 456  |
+------+--------+--------+------+

# 视图创建表
create table tt(id int);
#ERROR 1142 (42000): CREATE command denied to user 'a'@'localhost' for table 'tt'

# 退出
exit;
```

使用root用户删除该用户;

```sql
## ROOT 
# 先取消授权
revoke all on testdb.news from 'a'@'localhost'；

# 再删除用户
drop user `a`@`localhost`;
```

自此，Mysql初级部分就过完了，Mysql实际上还有复杂的东西，以后有机会的话去了解下;
