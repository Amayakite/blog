---
title: 24-扩展-MySQL存储过程
date: 2022-5-31 22:12:38
category: Java学习中
tag:
- Mysql
---

# 存储过程

发现之前一直没有了解过这玩意，现在来了解下

存储过程简单来说就是一个无返回值的函数，思想比较简单，就是一个预先编译的sql语句封装

好，存储过程预先存储在服务器上，需要执行的时候，客户端只需要向服务端发出调用存储过程的命令，服务器端就可以把预先存储好的这一系列sql全部执行

![image-20220531221631138](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531221631138.png)

语法大概如下

```sql
create procedure 存储过程名称(in|out|inout 参数名 参数类型...)
[charateristics...]
BEGIN
 存储过程体
END
```

这里面的 int out 和intout含义如下

![image-20220531221844915](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531221844915.png)

![image-20220531221932194](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531221932194.png)

![image-20220531221938852](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531221938852.png)

charateristics可以包含的内容详情如下

![image-20220531222108162](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531222108162.png)

![image-20220531222120297](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531222120297.png)

![image-20220531222221893](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531222221893.png)

![image-20220531222233036](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531222233036.png)

嘛，整体看来还是比较麻烦的...

## 存储过程-快速上手-查询

这里以查询为例

我们先创建一点点数据

```sql
DROP TABLE if EXISTS test_emp;


CREATE TABLE if not EXISTS  test_emp  (
 id BIGINT PRIMARY key  AUTO_INCREMENT ,
 name VARCHAR(255) 
);
-- 插入
INSERT INTO test_emp(name) VALUES("1"),("2"),("3"),("4"),("5");
```

然后创建一个简单的存储过程函数

```sql
create PROCEDURE select_all_emp()
BEGIN

 SELECT * FROM test_emp;

END ;
```

对，就是这么简单，然后就可以发现在函数处多了个这个

![image-20220531223539750](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531223539750.png)

当然，如果你不想用`;`来进行结尾的话，也可以这样

```sql
DELIMITER $

create PROCEDURE select_all_emp()
BEGIN

 SELECT * FROM test_emp;

END $
DELIMITER ;
```

然后调用它，非常简单，只需要使用**call**即可

```sql
call  select_all_emp();
```

结果就来了

![image-20220531223905362](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531223905362.png)

## 接收返回结果

首先定义一个函数

```sql
-- 统计小于某个id的总计数量
# out定义的变量为要返回的变量
create PROCEDURE show_min_id(OUT c INT)
BEGIN
# 需要使用 into来暴露返回变量
SELECT COUNT(*) INTO c FROM test_emp WHERE id < 4;

END;
```

接着调用

```sql

-- 声明接收变量（这里的@ms相当于定义了一个变量 作用域为当前session）
call show_min_id(@ms);

--  查看变量
select @ms;
```

## 接收参数作为条件

```sql
-- 例如查询某个指定id的姓名
create PROCEDURE show_id_name(in user_id INT)
BEGIN

 select * FROM test_emp WHERE id =  user_id;

end;

-- 执行

call show_id_name(1);

-- 或者也可以这样

-- 先定义一个变量
# 定义变量 标准语法
SET @show_id_in := 2;

# 使用变量
call show_id_name(@show_id_in);
```

# 存储函数

我们时常使用例如count等函数，当然这些都是可以自己定义的，定义好了之后，调用方式和调用mysql中的函数一致

语法格式

```sql
create function 函数名(参数名 参数类型...)
returns 返回值类型
[characteristics...(这里详情看前面的存储过程)]
begin 
 函数体 注意 这里面一定要有return语句
end ;
```

## 存储函数简单使用

```sql
-- 查询id大于执行值的用户 返回用户名
DELIMITER $
create FUNCTION  select_user_id(user_id BIGINT)
returns VARCHAR(255)
# 下面是标准写法
# 表示使用sql方言
LANGUAGE SQL
# 返回值是不确定的
not DETERMINISTIC
# 使用了读取的sql语句
READS SQL DATA

BEGIN

 RETURN(SELECT `name` FROM `test_emp` WHERE id >user_id);

END $
DELIMITER ;

# 如果小于一条的返回值 可以使用它
select select_user_id(4);

# 如果结果大于一条，则这里直接会报错....所以函数只能有一条返回值，如果有多条的话，一定要加个limit之类的
```

# 对比存储过程和存储函数

![image-20220531231329533](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531231329533.png)

# 存储过程/函数的查看、修改、删除

固定语法

## 查看

```sql
show create {procedure | function } 存储过程或者函数名
# 例如
 # 不存在的话会抛出异常
show create procedure aaaa;
show create function bbbb ;
```

查询的话 如果有结果会返回具体信息

![image-20220531231704192](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531231704192.png)

![image-20220531231810735](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531231810735.png)

![image-20220531231816952](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531231816952.png)

![image-20220531231825280](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531231825280.png)

## 修改

只能修改特征，不能修改具体的内容

![image-20220531231908910](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531231908910.png)

## 删除

![image-20220531231948245](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531231948245.png)

# 关于存储过程和函数的争议

某些规范中，是不允许使用存储过程的，因为这样做出来的代码之类的不易迁移，不如使用sql或者其他的框架方便（这里假设你学完了java的Springboot和mybatis plus，mybatisplus的lambda可以很方便的创建优雅的查询）

但是有些大型项目中要求必须使用存储过程，因为它确实很方便

## 存储过程的优点

![image-20220531232156533](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531232156533.png)

## 缺点

阿里巴巴的标准在国内一度成为java开发标准，所以大部分国内java项目或者脚手架中都见不到存储过程的影子

![image-20220531232250476](/images/Java/JavaSE/25-扩展-MySQL存储过程/image-20220531232250476.png)
