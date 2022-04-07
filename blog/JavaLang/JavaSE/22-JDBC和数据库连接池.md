---
title: 22-JDBC和数据库连接池
date: 2021-11-23 16:16:50
category: JavaSE
tag:
 - Java
 - JavaSE
 - Mysql
 - Jdbc
---

## JDBC概述

1. JDBC为访问**不同的数据库**提供了**统一的接口**，为使用者屏蔽了细节问题
2. Java程序员使用JDBC，可以连接任何提供了JDBC驱动程序的数据库系统，从而完成对数据库的基本操作
3. JBDC的原理图
   ![image-20211123163155802](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123163155802.png)
4. 模拟一个简单的JDBC

先定义一个接口;

```java
public interface JdbcInterFace {
    /**
     * 连接速度库的操作
     *
     * @return 返回一个数据库的实例
     */
    Object connect();

    /**
     * 关闭数据库的链接
     */
    void close();

    /**
     * crud
     */
    void crud();

}
```

然后在定义一个实现类

```java
package com.jdbc.myjdbc;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc.myjdbc
 * @date 2021/11/23 16:40
 * @description 模拟实现接口 相当于实际使用中，是mysql的厂商在开发
 */
public class MysqlJdbcImpl implements JdbcInterFace {
    @Override
    public Object connect() {
        System.out.println("得到mysql的连接");
        return null;
    }

    @Override
    public void close() {
        System.out.println("关闭mysql的连接");
    }

    @Override
    public void crud() {
        System.out.println("mysql的crud");
    }
}
```

然后给用户使用

```java
package com.jdbc.myjdbc;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc.myjdbc
 * @date 2021/11/23 16:44
 * @description 项目描述
 */
public class TestJdbc {
    public static void main(String[] args) {
        MysqlJdbcImpl jdbc = new MysqlJdbcImpl();
        jdbc.connect();
        jdbc.crud();
        jdbc.close();
    }
}
```

其他数据库就是--实现那个接口，并完成相应的方法，以保证一致性

比如Oracle

```java
package com.jdbc.myjdbc;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc.myjdbc
 * @date 2021/11/23 16:50
 * @description 模拟Oracle的实现接口
 */
public class OracleJdbcImpl implements  JdbcInterFace {
    @Override
    public Object connect() {
        System.out.println("得到Oracle的连接");
        return null;
    }

    @Override
    public void close() {
        System.out.println("关闭Oracle的链接");
    }

    @Override
    public void crud() {
        System.out.println("Oracle的crud");
    }
}
```

至此，一个简单的模拟JDBC就完成了。

![image-20211123203656610](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123203656610.png)

![image-20211123204121562](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123204121562.png)

## JDBC快速入门

1. [注册驱动](###注册驱动) - 加载Driver类
2. [获取连接](###获取连接) - 得到Connection（客户端(Java程序)和数据库之间的连接）
3. [执行增删改查](###执行增删改查和释放资源) - 发送相关的SQL命令给mysql执行
4. [释放资源](###执行增删改查和释放资源) - 关闭相关的连接

接下来通过JDBC对actor表进行添加。删除的操作

```sql
create database db2;
use db2;
create table actor(
    id int primary key auto_increment,
    name varchar(32) not null default "",
    sex char(1) not null default "男",
    borndate datetime,
    phone varchar(32)
);
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| id       | int         | NO   | PRI | NULL    | auto_increment |
| name     | varchar(32) | NO   |     |         |                |
| sex      | char(1)     | NO   |     | 男      |                |
| borndate | datetime    | YES  |     | NULL    |                |
| phone    | varchar(32) | YES  |     | NULL    |                |
+----------+-------------+------+-----+---------+----------------+
```

接下来创建一个Java文件：

```java
package com.jdbc;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc
 * @date 2021/11/23 20:48
 * @description 这是第一个JDBC程序,完成简单的操作
 */
public class JdbcOne {
    public static void main(String[] args) {
//        0 前置工作-倒入jar包并添加到依赖
//        1 注册驱动
//        2 得到连接
//        3 执行sql语句
//        4 关闭连接
    }
}
```

### 注册驱动

首先前往myql的连接器下载页面👉[快速链接](https://dev.mysql.com/downloads/connector/j/)

然后查看自己的mysql版本，查看版本的方式为：

```sql
select version();
+-----------+
| version() |
+-----------+
| 8.0.26    |
+-----------+
```

如果你用的是最新版（和一打开的链接的版本对的上的话），就直接：

![image-20211123205837625](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123205837625.png)

下载即可，如果不是的话，则点击那个[Archives](https://downloads.mysql.com/archives/c-j/)

然后选择自己当前的版本，并选择Platform Independent，然后下载第一个

![image-20211123210114928](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123210114928.png)

当然，通常来说，下载目前自己数据库的大纲版本最新的即可（8的话直接下载最新，5的的话找到5版本里面最新的版本号），比方我这里数据库是8.0.26，但是我依旧可以正常使用8.0.27

下载好后，是一个压缩包文件，解压可以得到一个.jar文件

![image-20211123210625478](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123210625478.png)

把这个jar包取出来，丢到桌面

然后返回IEDA，新建一个根级目录libs

![image-20211123210829006](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123210829006.png)

然后把刚刚的那个.jar文件拷贝到这个目录下（Ctrl+c，Ctrl+v） 并点击确定

![image-20211123210928542](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123210928542.png)

然后右键它，添加为库(Add as Library)

![image-20211123211051078](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123211051078.png)

点确定

![image-20211123211116995](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123211116995.png)

完毕后，能看到点击这个jar包，可以看到里面的源码了

![image-20211123211417667](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123211417667.png)

至此，驱动注册完毕（依赖添加完毕），可以继续写代码了

### 获取连接

首先，new一个对象`new com.mysql.jdbc.Driver();`，会抛出异常SQLException

然后定义个String`String url = "jdbc:mysql://localhost:3306/db2";`

```
jdbc:mysql://   规定好的表示协议，通过jdbc的方式链接mysql
localhost:3306  ip地址和端口号
db2 数据库名
```

myql的连接本质就是前面学过的socket（底层还是socket）

然后new一个Properties

```java
//        将用户名和密码放入到一个Properties对象中
Properties properties = new Properties();
//        用户名  key 千万不能写成别的 规定好的
properties.setProperty("user", "root");
//        密码 key也是不能写成别的，只能写password
properties.setProperty("password", "123456");
```

最后，执行`Connection connect = driver.connect(url, properties);`获取连接

![image-20211123213046551](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123213046551.png)

自此，第一阶段完成，代码如下

```java
package com.jdbc;


import com.mysql.jdbc.Driver;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc
 * @date 2021/11/23 20:48
 * @description 这是第一个JDBC程序, 完成简单的操作
 */
public class JdbcOne {
    public static void main(String[] args) throws SQLException {
//        0 前置工作-倒入jar包并添加到依赖
//        1 注册驱动
//        1.1 创建Driver对象
        Driver driver = new Driver();
//        2 得到连接
//        2.1 jdbc:mysql// 规定好的表示协议，通过jdbc的方式链接mysql
//        2.2 localhost:3306 ip地址和端口号
//        2.3 db2 数据库名
        String url = "jdbc:mysql://localhost:3306/db2";
//        将用户名和密码放入到一个Properties对象中
        Properties properties = new Properties();
//        用户名  key 千万不能写成别的 规定好的
        properties.setProperty("user", "root");
//        密码 key也是不能写成别的，只能写password
        properties.setProperty("password", "123456");
//        获取连接
        Connection connect = driver.connect(url, properties);


//        3 执行sql语句
//        4 关闭连接
    }
}
```

### 执行增删改查和释放资源

```sql
//        3 执行sql语句
String sql = "Insert Into actor(name,sex,borndate,phone) Values('刘德华','男','1970-11-11',10001222);";
//        3.1 得到一个Statement对象，来执行静态的sql语句，和获取操作表时返回的结果
Statement statement = connect.createStatement();
//        这里返回的是受影响的行数
int i = statement.executeUpdate(sql);
//        如果是dml语句，返回的就是受影响的语句
System.out.println(i > 0 ? "成功" : "失败");
//        4 关闭连接
statement.close();
connect.close();
```

最终代码：

```java
package com.jdbc;


import com.mysql.cj.jdbc.Driver;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc
 * @date 2021/11/23 20:48
 * @description 这是第一个JDBC程序, 完成简单的操作
 */
public class JdbcOne {
    public static void main(String[] args) throws SQLException {
//        0 前置工作-倒入jar包并添加到依赖
//        1 注册驱动
//        1.1 创建Driver对象
        Driver driver = new Driver();
//        2 得到连接
//        2.1 jdbc:mysql// 规定好的表示协议，通过jdbc的方式链接mysql
//        2.2 localhost:3306 ip地址和端口号
//        2.3 db2 数据库名
        String url = "jdbc:mysql://localhost:3306/db2";
//        将用户名和密码放入到一个Properties对象中
        Properties properties = new Properties();
//        用户名  key 千万不能写成别的 规定好的
        properties.setProperty("user", "root");
//        密码 key也是不能写成别的，只能写password
        properties.setProperty("password", "123456");
//        获取连接
        Connection connect = driver.connect(url, properties);


//        3 执行sql语句
        String sql = "Insert Into actor(name,sex,borndate,phone) Values('刘德华','男','1970-11-11',10001222);";
//        3.1 得到一个Statement对象，来执行静态的sql语句，和获取操作表时返回的结果
        Statement statement = connect.createStatement();
//        这里返回的是受影响的行数
        int i = statement.executeUpdate(sql);
//        如果是dml语句，返回的就是受影响的语句
        System.out.println(i > 0 ? "成功" : "失败");
//        4 关闭连接
        statement.close();
        connect.close();

    }
}
```

执行完毕后发现返回成功了，去查看数据库：

```sql
select * from actor;
+----+-----------+-----+---------------------+----------+
| id | name      | sex | borndate            | phone    |
+----+-----------+-----+---------------------+----------+
|  1 | 刘德华    | 男  | 1970-11-11 00:00:00 | 10001222 |
+----+-----------+-----+---------------------+----------+
```

果真没问题了，好！

PS：IEDA中右侧可以连接数据库，连接完毕后编辑器将不会抛出异常，同时可以在设置中设置自动格式化sql代码（设置-代码样式-SQL-General）

当然，还可以自由的进行删除和修改

修改：`statement.executeUpdate("update actor SET name='周杰伦' WHERE name='刘德华'");`

删除：`statement.executeUpdate("delete from actor where id=1);`

## 获取数据库连接的5种方式

![image-20211123220140370](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123220140370.png)

![image-20211123220146702](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123220146702.png)

![image-20211123221245388](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123221245388.png)

最推荐使用的方式：第四种和第五种，按需使用，一般是用第五种方式

![image-20211123223644245](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123223644245.png)

![image-20211123223744099](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123223744099.png)

五种方式的代码：

```java
public class JdbcConn {
    @Test
    public void connect01() throws SQLException {
//        第一种方式
        Driver driver = new com.mysql.cj.jdbc.Driver();
        Properties properties = new Properties();
        properties.setProperty("user", "root");
        properties.setProperty("password", "123456");
        Connection connect = driver.connect("jdbc:mysql://localhost:3306/db2", properties);
        System.out.println("方式1 " + connect);
        //方式1 com.mysql.cj.jdbc.ConnectionImpl@131774fe
    }

    @Test
    public void connect02() throws ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException {
//       第二种方式 使用反射加载Dirver 动态加载 更加灵活 减少了依赖性
        Class<?> SqlClass = Class.forName("com.mysql.cj.jdbc.Driver");
//        向下转型
        Driver driver = (Driver) SqlClass.newInstance();
//        创建链接
        Properties properties = new Properties();
        properties.setProperty("user", "root");
        properties.setProperty("password", "123456");
        Connection connect = driver.connect("jdbc:mysql://localhost:3306/db2", properties);
        System.out.println("方式2" + connect);
//       方式2 com.mysql.cj.jdbc.ConnectionImpl@131774fe
    }

    @Test
    public void connect03() throws ClassNotFoundException, InstantiationException, IllegalAccessException, SQLException {
//        方式3 使用DriverManager替代Driver进行统一的管理 扩展性更好
        Class<?> MysqlClass = Class.forName("com.mysql.cj.jdbc.Driver");
        Driver driver = (Driver) MysqlClass.newInstance();
//        创建url，user，password
        String url = "jdbc:mysql://localhost:3306/db2";
        String user = "root";
        String password = "123456";
//        注册Driver驱动
        DriverManager.deregisterDriver(driver);
//        他这里有三种方式 1 url 2 url、Properties 3 url user password
        Connection connection = DriverManager.getConnection(url, user, password);
        System.out.println("方式3" + connection);
//        com.mysql.cj.jdbc.ConnectionImpl@158d2680

    }

    @Test
    public void connect04() throws ClassNotFoundException, SQLException {
//        方式4 使用Class.forName 自动完成注册，简化源码 推荐是用这种方式
//        这里应该是 Driver在静态加载时，静态代码块中有一串函数，是new一个Driver并放到DriverManager中的
        Class.forName("com.mysql.cj.jdbc.Driver");
/*
        看下Driver源码：果真如此
        static {
            try {
                DriverManager.registerDriver(new Driver());
            } catch (SQLException var1) {
                throw new RuntimeException("Can't register driver!");
            }
        }
        因此，注册Dirve的工作已经完成
*/
        String url = "jdbc:mysql://localhost:3306/db2";
        String user = "root";
        String password = "123456";
        Connection connection = DriverManager.getConnection(url, user, password);
        System.out.println("方式4" + connection);
//        com.mysql.cj.jdbc.ConnectionImpl@131774fe
    }

    @Test
    public void connect05() throws IOException, ClassNotFoundException, SQLException {
//        方式5 在方式4的基础上进行改进，增加配置文件，让连接Mysql更加灵活
        Properties properties = new Properties();
        FileInputStream fileInputStream = new FileInputStream("src/mysql.properties");
        properties.load(fileInputStream);

//        不写也可，但是建议写上，因为以后可能有好几个数据库插件共存的情况
//        或者好几个版本共存的情况（Mysql插件）
        Class.forName(properties.getProperty("driver"));
//        user和password通过它的自动搜索字段读取实现
        Connection connection = DriverManager.getConnection(
                properties.getProperty("url"),
                properties);
        System.out.println("方式5" + connection);
//     com.mysql.cj.jdbc.ConnectionImpl@131774fe
    }

}
```

配置文件properties

```properties
user=root
password=123456
url=jdbc:mysql://localhost:3306/db2
driver=com.mysql.cj.jdbc.Driver
```

### 扩展-小练

使用第五种连接数据库的方式，完成如下操作

1. 创建`actors`表，结构和actor相同，但是不能通过复制表结构的方式来创建
2. 动态添加5条数据
3. 修改id=1的记录，name修改为你的名字
4. 删除id=3的记录

```java
@Test
public void connect06() throws IOException, ClassNotFoundException, SQLException {
    Properties properties = new Properties();
    properties.load(new FileReader("src/mysql.properties"));
    Class.forName(properties.getProperty("driver"));
    Connection connection = DriverManager.getConnection(properties.getProperty("url"), properties.getProperty("user"), properties.getProperty("password"));
    Statement statement = connection.createStatement();
    //        create table
    String creates = "create table if not exists actors(" +
        "id int primary key Auto_increment," +
        "name varchar(32)," +
        "sex char(1) check (sex in ('男','女'))," +
        "born_date DATETIME  default current_timestamp()," +
        "phone varchar(12)" +
        " );";
    int i = statement.executeUpdate(creates);
    System.out.println("创建表" + (i > 0 ? "成功" : "失败"));
    for (int i1 = 1; i1 <= 5; i1++) {
        String insert = "insert  into actors(name,sex,phone) values('" + "张" + i1 +
            "','男','" + (i1 + 111111) +
            "');";
        i = statement.executeUpdate(insert);
        System.out.println("插入数据" + i1 + (i > 0 ? "成功" : "失败"));
    }
    i = statement.executeUpdate("update actors set name='ay' where id = 1;");
    System.out.println("修改数据" + (i > 0 ? "成功" : "失败"));
    i = statement.executeUpdate("delete from actors where id = 3;");
    System.out.println("删除数据" + (i > 0 ? "成功" : "失败"));
    statement.close();
    connection.close();

}
```

结果：

```sql
select * from actors;
+----+------+------+---------------------+--------+
| id | name | sex  | born_date           | phone  |
+----+------+------+---------------------+--------+
|  1 | ay   | 男   | 2021-11-23 23:15:15 | 111112 |
|  2 | 张2  | 男   | 2021-11-23 23:15:15 | 111113 |
|  4 | 张4  | 男   | 2021-11-23 23:15:15 | 111115 |
|  5 | 张5  | 男   | 2021-11-23 23:15:15 | 111116 |
+----+------+------+---------------------+--------+
```

## 查询-Select语句和ResultSet结果集

查询的语法：`statement.executeQuery(sql语句)`，返回一个ResultSet结果集：

1. 表示数据库结果集的数据表，通常通过执行查询数据库的语句生成
2. `ResultSet`对象保持一个光标指向其当前数据行，**最初，光标位于第一行之前**
3. next方法可以将光标移动到下一行，并且当`ResultSet`对象中没有更多行时返回false，因此可以用在while循环中来遍历结果集
4. `ResultSet`是个接口，真正的运行类型是`com.mysql.jdbc.ResultSet`
5. `com.mysql.jdbc.ResultSet`实现了`ResultSet`接口：
   1. 它之中维护了一个`rowData`
      1. 这里面有一个数据叫`rows`，是一个`ArrayList`，存放查询到的所有数据
      2. 然后在`rows`中可以看到`elementData`中存放了所有数据
      3. 在`elementData`(一个二维数组)中，可以看到他维护了一个`internalRowData`
      4. 这里面就是存放了查询到的这一行的所有的数据，以byte数组的形式保存
   2. 这里可以通过Debug查看的更明确一点

<img src="/images/JavaSE/22-JDBC和数据库连接池/image-20211124002543231.png" alt="image-20211124002543231"  />

![image-20211124002353136](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211124002353136.png)

![image-20211123233401976](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211123233401976.png)

```java
package com.jdbc.resultset_;

import java.io.FileReader;
import java.sql.*;
import java.util.Properties;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc.resultset_
 * @date 2021/11/23 23:35
 * @description 项目描述
 */
public class ResultSet_ {
    public static void main(String[] args) throws Exception {
//        加载驱动 注册驱动
        Properties properties = new Properties();
        properties.load(new FileReader("src/mysql.properties"));
        Class.forName(properties.getProperty("driver"));
//       得到连接
        Connection connection = DriverManager.getConnection(properties.getProperty("url"), properties.getProperty("user"), properties.getProperty("password"));
//       获取 statement
        Statement statement = connection.createStatement();
//        组织sql语句
        String sql = "select * from db2.actors";
        ResultSet resultSet = statement.executeQuery(sql);
//        使用while取出数据
/*        +----+------+------+---------------------+--------+
        | id | name | sex  | born_date           | phone  |
        +----+------+------+---------------------+--------+
        |  1 | ay   | 男   | 2021-11-23 23:15:15 | 111112 |
        |  2 | 张2  | 男   | 2021-11-23 23:15:15 | 111113 |
        |  4 | 张4  | 男   | 2021-11-23 23:15:15 | 111115 |
        |  5 | 张5  | 男   | 2021-11-23 23:15:15 | 111116 |
        +----+------+------+---------------------+--------+
*/
        while (resultSet.next()) {
//            获取第一个字段，值是int类型
            int id = resultSet.getInt(1);
//            获取第二个字段，值是varchar类型
            String name = resultSet.getString(2);
//            获取第三个字段 值是string类型
            String sex = resultSet.getString(3);
//            获取第四个类型 值是datetime
            Date date = resultSet.getDate(4);
//            获取第五个字段 值是varchar
            String phone = resultSet.getString(5);
            System.out.println(id + '\t' + name + '\t' + sex + '\t' + date + '\t' + phone);
        }
//        关闭链接
        resultSet.close();
        statement.close();
        connection.close();

    }
}
```

## Statement对象详解

1. `Statement`对象，用于执行静态SQL语句并返回其生成的结果对象

2. 在连接建立后，需要对数据库进行访问，执行命名或是sql语句，可以通过
   
   - Statement 【存在SQL注入】
   - PreparedStatement 【预存储】 工作中一般使用这个
   - ClassableStatement 【存储过程】

3. **Statement对象执行sql语句，存在SQL注入的风险**
   
   - SQL注入是利用某些系统没有对用户输入的数据进行充分校验，而在用户输入数据中注入非法的SQL语句段或命令，恶意攻击数据库
   
   - 演示SQl注入：
     
     ```sql
     -- 创建一张表
     # 管理员表
     create table admin(
         name varchar(32) not null unique,
         pwd varchar(32) not null  default ''
     )character set utf8;
     
     -- 添加数据
     insert into admin values('tom','123');
     ```

     # 正常情况下查找某个管理员是否存在
     select * from admin where name='tom' and pwd='123';
     +------+-----+
     | name | pwd |
     +------+-----+
     | tom  | 123 |
     +------+-----+
   
     # Sql注入： 
     # 恶意用户输入用户名为：1'or'
     # 恶意输入密码为： or'1'='1
     select * from admin where 
         name='1'or ' and pwd='or'1'='1';
     # 也就是说，1=1这个条件是永远成立的。。。
   
     # 查询结果：
     +------+-----+
     | name | pwd |
     +------+-----+
     | tom  | 123 |
     +------+-----+
     
     # 这就是大名鼎鼎的sql注入，这时
   
   
     ```
   
4. 要防范SQL注入，只要用`PreparedStatement`（是从Statement扩展而来的）取代Statement就可以了

### 使用Statement演示sql注入

先上代码：

```java
package com.jdbc.statement_;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;
import java.util.Scanner;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc.statement_
 * @date 2021/11/24 12:58
 * @description 演示Statement的注入
 */
public class Statementr_ {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入UserName：");
        String user = scanner.nextLine();
        System.out.print("请输入密码：");
        String password = scanner.nextLine();
        System.out.println("正在查询，请稍等...");
//        启动数据库进行验证
        Properties properties = new Properties();
        properties.load(new FileReader("src/mysql.properties"));
        Class.forName(properties.getProperty("driver"));

        Connection connection = DriverManager.getConnection(properties.getProperty("url"), properties);
        Statement statement = connection.createStatement();

        String sql = "select * from admin where name = '" + user + "' and pwd = '" + password + "'";
        System.out.println(sql);
        ResultSet resultSet = statement.executeQuery(sql);

        System.out.println("查询完毕，查询到的用户为");

        if (resultSet.next()) {
            System.out.printf("用户名：%s密码：%s%n", resultSet.getString("name"), resultSet.getString("pwd"));
        } else {
            System.out.println("没有查询到该用户！");
        }
        System.out.println("搜索完毕，程序退出");
//        关闭资源
        resultSet.close();
        statement.close();
        connection.close();


    }
}
```

然后尝试输入`万能密码`：

```md
请输入UserName：1'or
请输入密码：or'1'='1
正在查询，请稍等...
select * from admin where name = '1'or' and pwd = 'or'1'='1';
查询完毕，查询到的用户为
用户名：tom密码：123
搜索完毕，程序退出
```

注入成功，截下来使用PreparedStatement来解决这个问题

## PreparedStatement的使用-预防SQL注入

![image-20211124145728361](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211124145728361.png)

1. `PreparedStatement`执行的SQl语句中的参数用？问号来标识，调用`PreparedStatement`对象的`setXXX()`方法来设置这些参数
   - `setXXX()`方法有两个参数，第一个参数是要设置的SQL参数的索引，第二个是设置的SQL语句中的参数的值
2. 调用`executeQuery()` 进行查询，返回ResultSet对象
3. 调用`executeUpdate()`执行增删改
4. 他是使用预处理的方式来进行对数据库的操作，其好处为：
   1. 不再使用+拼接sql语句，减少语法错误
   2. 有效的解决了sql注入的问题
   3. 大大减少了编译次数，效率提高

接下来简单演示下它的使用

### PreparedStatement-查询

```java
Connection connection = DriverManager.getConnection(properties.getProperty("url"), properties);
//得到PreparedStatement
//SQL语句的问号（?）是占位符，它们会在执行SQL语句时被替换成实际的值。
 String sql = "select * from admin where name = ? and pwd = ?";

//创建PreparedStatement 需要传入一个sql语句 这里PreparedStatement是一个接口，它的实现类是PreparedStatementImpl(Mysql中的)
PreparedStatement statement = connection.prepareStatement(sql);

//设置占位符的值 1 表示第一个问号 2 表示第二个问号
statement.setString(1, user);
statement.setString(2, password);

//执行query查询如果执行增删改 这里要用的是executeUpdate()
//这里不用像之前一样executeQuery(sql)了， 因为他们之前就关联起来了 statement.executeQuery() 直接这样既可
//千万不要在这里写sql语句了
ResultSet resultSet = statement.executeQuery();
```

完整代码：

```java
package com.jdbc.statement_;

import java.io.FileReader;
import java.sql.*;
import java.util.Properties;
import java.util.Scanner;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc.statement_
 * @date 2021/11/24 15:09
 * @description 演示PreparedStatement的使用
 */
public class PreparedStatement_ {
    @SuppressWarnings({"all"})
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入UserName：");
        String user = scanner.nextLine();
        System.out.print("请输入密码：");
        String password = scanner.nextLine();
        System.out.println("正在查询，请稍等...");
        Properties properties = new Properties();
        properties.load(new FileReader("src/mysql.properties"));
        Class.forName(properties.getProperty("driver"));
        Connection connection = DriverManager.getConnection(properties.getProperty("url"), properties);

//        得到PreparedStatement
//        SQL语句的问号（?）是占位符，它们会在执行SQL语句时被替换成实际的值。
        String sql = "select * from admin where name = ? and pwd = ?";
//        创建PreparedStatement 需要传入一个sql语句 这里PreparedStatement是一个接口，它的实现类是PreparedStatementImpl(Mysql中的)
        PreparedStatement statement = connection.prepareStatement(sql);
//        设置占位符的值 1 表示第一个问号 2 表示第二个问号
        statement.setString(1, user);
        statement.setString(2, password);

//        执行query查询如果执行增删改 这里要用的是executeUpdate()
//        这里不用像之前一样executeQuery(sql)了， 因为他们之前就关联起来了 statement.executeQuery() 直接这样既可
//        千万不要在这里写sql语句了
        ResultSet resultSet = statement.executeQuery();

        System.out.println("查询完毕，查询到的用户为");

        if (resultSet.next()) {
            System.out.printf("用户名：%s密码：%s%n", resultSet.getString("name"), resultSet.getString("pwd"));
        } else {
            System.out.println("没有查询到该用户！");
        }


        System.out.println("搜索完毕，程序退出");
//        关闭资源  1'or or'1'='1
        resultSet.close();
        statement.close();
        connection.close();


    }
}
```

然后尝试注入：

```md
请输入UserName：1'or
请输入密码：or'1'='1
正在查询，请稍等...
查询完毕，查询到的用户为
没有查询到该用户！
搜索完毕，程序退出
```

好！注入失败

然后试试普通的输入

```sql
请输入UserName：tom
请输入密码：123
正在查询，请稍等...
查询完毕，查询到的用户为
用户名：tom密码：123
搜索完毕，程序退出
```

### PreparedStatement-增删改记录

按照正常方式的来即可： 修改和删除同理

```java
//获取连接
properties.load(new FileReader("src/mysql.properties"));
Class.forName(properties.getProperty("driver"));
Connection connection = DriverManager.getConnection(properties.getProperty("url"), properties.getProperty("user"), properties.getProperty("password"));

//获取用户输入
Scanner scanner = new Scanner(System.in);
System.out.println("start");
System.out.print("请输入用户名：");
String user = scanner.nextLine();
System.out.print("请输入密码：");
String password = scanner.nextLine();

//创建sql语句，并执行
 String sql = "insert into admin values(?,?)";
PreparedStatement statement = connection.prepareStatement(sql);
//设定值
statement.setString(1, user);
statement.setString(2, password);
//运行
int i = statement.executeUpdate();
if (i > 0) {
    System.out.println("添加成功！");
} else {
    System.out.println("添加失败！");
}

//关闭资源
scanner.close();
statement.close();
connection.close();
```

## JDBC API一览（常用API）

![JDBC API](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/JDBC API.svg)

## 封装 JDBCUtils

在JDBC操作中，**获取连接和释放资源**，是经常要使用到的

可以将其封装到JDBC连接的工具类`JdbcUtils.java`中

![image-20211124163943411](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211124163943411.png)

接下来写一个JDBC工具类

### 创建JbdcUtils工具类

```java
package com.jdbc.utils;


import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc.utils
 * @date 2021/11/24 16:40
 * @description 这是一个工具类，完成mysql的连接和关闭资源
 */
public class JdbcUtils {
    //    定义相关的属性 因为只需要一份，因此我们把他定义成静态的

    private static final String URL;
    private static final String DRIVER;
    private static final String USER;
    private static final String PASSWORD;

    /**
     * 在static代码块进行初始化
     */
    static {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("src/mysql.properties"));
            URL = properties.getProperty("url");
            DRIVER = properties.getProperty("driver");
            USER = properties.getProperty("user");
            PASSWORD = properties.getProperty("password");
        } catch (IOException e) {
//            在实际开发中，往往需要这样处理：
//            1. 将便以一场转换成运行异常
//            2. 这时调用者可以选择捕获该异常
//            3. 也可以选择默认处理该异常，比较方便
            throw new RuntimeException(e);

        }

    }

    /**
     * 获取连接
     *
     * @return Connection
     * @throws SQLException
     */
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    /**
     * 关闭相关资源 如果需要关闭资源，就传入对象，否则传入null
     *
     * @param set        一个ResultSet
     * @param statement  一个Statement或者PreparedStatement
     * @param connection 一个connection
     */
    public static void close(ResultSet set, Statement statement, Connection connection) {

        try {
            if (set != null) {
                set.close();
            }
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
//            转换为运行时异常并抛出
            throw new RuntimeException(e);
        }

    }

}
```

### 使用JbdcUtils工具类

### 增删改模板

```java
@Test
public void testDML() {

    //        定义connection statement
    Connection connection = null;
    PreparedStatement statement = null;

    //        组织一个sql语句
    String sql = "update admin set name=? where name=?";
    try {
        //            初始化值
        connection = JdbcUtils.getConnection();
        statement = connection.prepareStatement(sql);
        //            给占位符赋值：
        statement.setString(1, "Jumping");
        statement.setString(2, "1516");
        //            执行sql语句
        int i = statement.executeUpdate();
        System.out.println("修改" + (i > 0 ? "成功" : "失败"));
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        //            关闭资源  
        JdbcUtils.close(null, statement, connection);
    }
    System.out.println("程序结束");

}
```

### 查询模板

```java
@Test
public void testSelect() {
    //        定义connection statement resultSet
    Connection connection = null;
    PreparedStatement statement = null;
    ResultSet resultSet = null;

    try {
        String sql = "select * from admin where name=?";
        //            初始化值
        connection = JdbcUtils.getConnection();
        statement = connection.prepareStatement(sql);
        statement.setString(1, "Jumping");

        //            进行查询
        resultSet = statement.executeQuery();
        while (resultSet.next()) {
            String username = resultSet.getString("name");
            String password = resultSet.getString("pwd");
            System.out.println("用户名：" + username + " 密码：" + password);
        }

    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        //            关闭资源
        JdbcUtils.close(resultSet, statement, connection);
    }
    System.out.println("程序运行完毕");

}
```

## JBCD的事务

### 基本介绍

1. JBDC程序中当一个`Connection`对象创建时，默认情况下会自动提交事务：每次执行一个SQL语句时，如果执行成功，就会向数据库自动提交，而不能回滚
2. JBDC中为了让多个SQL语句作为一个整体执行，需要**使用事务**
3. 调用Connection的`setAutoCommit(false)`可以取消自动提交事务
4. 在所有的SQL语句都成功执行后，调用**Connection**的`commit()`方法提交事务
5. 再起某个操作失败或出现异常时，调用`rollback()`方法回滚事务

### 应用案例：转账业务

![image-20211128163346872](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211128163346872.png)

![image-20211128163922051](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211128163922051.png)

接下来先演示不使用事务带来的坏处

```java
/**
* 演示不使用事务的异常
*/
@Test
public void run1() {
    //        获取到连接
    Connection connection = JdbcUtils.getConnection(); 
    // 在默认情况下，这个Connection是默认自动提交
    //即：执行了任意sql语句后（一条），都会立刻写入到数据库内

    //        组织一个sql;
    String sql = "update account set price=price-100 where id = 1";
    String sql2 = "update account set price=price+100 where id = 2";
    try {
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.executeUpdate();//执行第一条sql

        //            抛出一个异常
        @SuppressWarnings({"all"})
        int i = 1 / 0;
        //            可以发现，这里没有执行第二条sql 第一条执行了，这就是没有使用事务处理的坏处
        //            执行第二条sql
        PreparedStatement preparedStatement2 = connection.prepareStatement(sql2);
        preparedStatement2.executeUpdate();


    } catch (SQLException throwables) {
        throwables.printStackTrace();
    } finally {

    }
}
```

接下来使用事务解决这个问题---> 让所有sql都是呈一步的执行

```java
/**
     * 演示通过事务来处理这个问题
     */
@Test
public void run2() {
    //        获取到连接
    Connection connection = JdbcUtils.getConnection();


    //        组织一个sql;
    String sql = "update account set price=price-100 where id = 1";
    String sql2 = "update account set price=price+100 where id = 2";
    PreparedStatement preparedStatement = null;
    try {
        //        将connection设置为不自动提交
        connection.setAutoCommit(false);

        preparedStatement = connection.prepareStatement(sql);
        preparedStatement.executeUpdate();//执行第一条sql

        //            抛出一个异常
        //            @SuppressWarnings({"all"})
        //            int i = 1 / 0;


        //            执行第二条sql
        preparedStatement = connection.prepareStatement(sql2);
        preparedStatement.executeUpdate();

        //            在这里提交事务
        connection.commit();
        System.out.println("执行完毕，提交成功！");

    } catch (Exception throwables) {
        System.out.println("发生了异常，撤销执行的SQL");
        //            这里我们可以进行回滚，即撤销执行的sql
        try {
            //                默认回滚到事务开始的地方
            connection.rollback();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        throwables.printStackTrace();
    } finally {
        //            close
        JdbcUtils.close(null, preparedStatement, connection);
    }
}
```

## 批处理

1. 当需要成批插入或者更新数据时，可以才用Java的批量更新机制，这一机制运行多条语句一次性提交给数据库批量处理，通常情况下比单独提交处理要更有效率

2. JDBC的批量处理语句包括下面方法：
   
   - `addBatch()` 添加需要批量处理的SQL语句或参数
   - `executeBatch()` 执行批量处理语句
   - `clearBatch()` 清空批量处理

3. JDBC连接Mysql时，如果要使用批处理功能，需要在URL中加参：
   
   `jdbc:mysql://IP地址:端口号/数据库名称?rewriteBatchedStatements=true`

4. 批处理往往和`PreparedStatement`一起搭配使用，既可以减少编译次数，又减少运行次数，效率大大提高

接下来演示传统插入和批量插入的对比（耗时）

传统方式：16613MS 相当慢

```java
@Test
public void noBatch() throws SQLException {

    Connection connection = JdbcUtils.getConnection();
    //        这是一个主键自增长的table
    String sql = "insert into admin2(name, password) values (?, sha1(?));";
    PreparedStatement statement = connection.prepareStatement(sql);
    System.out.println("开始执行");
    long startTime = System.currentTimeMillis();

    //        使用for循环来添加数据
    for (int i = 0; i < 5000; i++) {
        statement.setString(1, "user" + i);
        statement.setString(2, "password" + i);
        statement.executeUpdate();
    }
    long endTime = System.currentTimeMillis();
    System.out.println("执行完毕");
    System.out.println("传统的方式耗时：" + (endTime - startTime) + "ms");
    //        我这里耗时：16613ms

    //        close
    JdbcUtils.close(null, statement, connection);
}
```

使用批处理：206ms

```java
@Test
public void batch() throws SQLException {
    //        这之前要把url改成：jdbc:mysql://localhost:3306/db1?rewriteBatchedStatements=true
    Connection connection = JdbcUtils.getConnection();
    //        这是一个主键自增长的table
    String sql = "insert into admin3(name, password) values (?, sha1(?))";
    PreparedStatement statement = connection.prepareStatement(sql);
    System.out.println("开始执行");
    long startTime = System.currentTimeMillis();

    //        使用for循环来添加数据c
    for (int i = 0; i < 5000; i++) {
        statement.setString(1, "user" + i);
        statement.setString(2, "password" + i);
        //            将SQL语句加入到批处理包中
        statement.addBatch();
        //            当有1000条记录时，再批量执行
        if ((i + 1) % 1000 == 0) {
            statement.executeBatch();
            //                清空batch
            statement.clearBatch();
        }
    }

    long endTime = System.currentTimeMillis();
    System.out.println("执行完毕");
    System.out.println("批量的方式耗时：" + (endTime - startTime) + "ms");
    //        我这里耗时：206ms

    //        close
    JdbcUtils.close(null, statement, connection);
}
```

验证数据：

```sql
mysql> select count(*) from admin2;
+----------+
| count(*) |
+----------+
|     5000 |
+----------+
1 row in set (0.00 sec)

mysql> select count(*) from admin3;
+----------+
| count(*) |
+----------+
|     5000 |
+----------+
1 row in set (0.00 sec)
```

### 批处理源码的解析

![image-20211128182349488](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211128182349488.png)

## Mysql 数据库连接池

​        首先，提出一个问题

​        在我们实际的工作中，数据库的连接往往是最为频繁的点，比如10W个用户连接，也就是要创建10W个connection

接下来用普通的方法测试下他们的速度

执行5000次链接：

```java
@Test
public void testCon() {
    //        查看传统的方式链接数据库5k次需要多久
    System.out.println("开始连接");
    long startTime = System.currentTimeMillis();
    for (int i = 0; i < 5000; i++) {
        Connection connection = JdbcUtils.getConnection();
        //            DO Nothing
        JdbcUtils.close(null, null, connection);
    }
    long endTime = System.currentTimeMillis();
    System.out.println("连接5k次结束，用时：" + (endTime - startTime) + "ms");
}
```

连接5k次结束，用时：73838ms

### 传统获取Connection问题分析

1. 传统的Jbdc数据库使用`DriverManager`来获取，每次像数据库建立连接的时候都要将Connection加载到内存中，**再验证IP地址、用户名、密码**(0.05~1s)的时间，需要数据库连接的时候，就再向数据库要求一个，频繁的进行数据库连接操作将占用很多的系统医院，容易造成服务器崩溃
2. 每一次数据库链接，使用完毕后都得断开，如果程序出现异常而未能关闭，将导致数据库**内存泄露**，最终导致重启数据库
3. 传统获取连接的方式，不能创建控制的连接数量，如连接过多，也可能导致内存泄漏，Mysql崩溃
4. 解决传统开发中的数据库连接问题，可以才用数据库连接池技术(connection pool)

PS:实际开发过程中，往往是一堆线程（或者一堆软件）同时和一个数据库，建立一大堆连接

![image-20211128185137727](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211128185137727.png)

### 数据库连接池的基本介绍

1. 预先在缓冲池中放入一定数量的连接，当需要建立数据库连接时，只需要从`缓冲池`中取出一个，使用完毕后再**放回去**
2. 数据库连接池负责分配、管理和释放数据库连接，它允许应用程序`重复使用`一个现有的数据库连接，而不是重新建立一个
3. 当应用程序向连接池请求的连接数量超过最大的连接数量时，这些请求将被加入到等待队列中

![image-20211128202718243](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211128202718243.png)

![image-20211128203247533](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211128203247533.png)

### 数据库连接池的种类

1. Jbdc的数据库连接池使用`javax.sql.DataSource`来表示，`DataSource`只是一个[接口](https://www.matools.com/file/manual/jdk_api_1.8_google/javax/sql/DataSource.html)，该接口通常由第三方提供实现
2. `C3P0`数据库连接池，速度相对较慢，稳定性不错--**常用**
3. `DBCP`数据库连接池，速度相对于`C3P0`较快，但是不稳定
4. `Proxool`数据库连接池，有监控连接池状态的功能，稳定性比`C3P0`更慢
5. `BoneCP`数据库连接池，速度快
6. `Druid`(德鲁伊)是阿里提供的数据库连接池，集`DBCP`、`C3P0`、`Proxool`优点于一身的数据库连接池，是真实开发中最常用的连接池--**常用**

### C3P0连接池的使用

[在这里](https://sourceforge.net/projects/c3p0/)下载最新的包，然后拿到其lib目录下的`c3p0-x.x.x.x.jar` ，按照安装Mysql插件的方式在IEDA中安装(我这里用的是0.9.5.5) ，还有一个`mchange-commons-java-0.2.xx.jar`的包也一并安装，另外一个貌似是扩展可以不装，不影响来着

接下来简单使用下它来测试连接5k次的效率

#### C3P0的使用方法1

```java
/**
     * 方式1 相关参数，在程序中指定：user url password 等
     */
@Test
public void testC3P001() throws Exception {
    //        1 创建一个数据源对象
    ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource();
    //        2 通过配置文件mysql.properties获取相关连接的信息
    Properties properties = new Properties();
    properties.load(new FileReader("src/mysql.properties"));
    //        3 给数据源 comboPooledDataSource 设置相关的参数
    //        3.1 设置driver（数据库驱动）
    //        连接的管理是由comboPooledDataSource来管理，操作数据是由mysql插件管理
    comboPooledDataSource.setDriverClass(properties.getProperty("driver"));
    //        3.2 url user password
    comboPooledDataSource.setJdbcUrl(properties.getProperty("url"));
    comboPooledDataSource.setUser(properties.getProperty("user"));
    comboPooledDataSource.setPassword(properties.getProperty("password"));

    //        4 设置初始化连接数
    //        4.1 这里10的意思是，再初始化时，会自动建立10个连接
    comboPooledDataSource.setInitialPoolSize(10);
    //        4.2 最大连接数
    comboPooledDataSource.setInitialPoolSize(50);

    //        5 获取一个连接
    //        这个方法就是从DataSource接口实现的
    Connection connection = comboPooledDataSource.getConnection();
    System.out.println("连接OK");
    connection.close();

    //        测试连接池的效率
    long start = System.currentTimeMillis();
    for (int i = 0; i < 5000; i++) {
        connection = comboPooledDataSource.getConnection();
        //            do nothing
        connection.close();
    }
    long end = System.currentTimeMillis();
    System.out.println("连接池的效率：" + (end - start) + "ms");
}
```

连接池的效率：212ms

这快了100倍吧..

当然我也分别测试了10W和100W的效率，分别为：642ms和2714ms...

#### C3P0的使用方法2-XML配置文件

首先在src目录下新建一个文件：`c3p0-config.xml` 必须是这个

```xml
<c3p0-config>
    <!-- 默认配置，如果没有指定则使用这个配置 -->
    <default-config>
        <!-- 驱动类 -->
        <property name="driverClass">com.mysql.cj.jdbc.Driver</property>
        <!-- url -->
        <property name="jdbcUrl">
            <![CDATA[jdbc:mysql://127.0.0.1:3306/db1]]>
        </property>
        <!-- 用户名及密码 -->
        <property name="user">root</property>
        <property name="password">123456</property>
        <!-- 初始化池大小 -->
        <property name="initialPoolSize">2</property>
        <!-- 最大空闲时间 -->
        <property name="maxIdleTime">30</property>
        <!-- 最多有多少个连接 -->
        <property name="maxPoolSize">10</property>
        <!-- 最少几个连接 这个就相当于在指定数量访问内的连接只有那么多时，多余的其他空闲的连接会自动关闭（销毁） -->
        <property name="minPoolSize">5</property>
        <!-- 每次最多可以执行多少个批处理语句 -->
        <property name="maxStatements">50</property>
        <!--每个连接对象可连接的最多的命令对象数量，默认是2，通常不写这个-->
        <property name="maxStatementsPerConnection">5</property>
        <!-- 如果池中数据连接不够时一次增长多少个 -->
        <property name="acquireIncrement">5</property>
    </default-config>
    <!-- 命名的配置 -->
    <named-config name="MyC3P0Config">
        <property name="driverClass">com.mysql.jdbc.Driver</property>
        <property name="jdbcUrl">jdbc:mysql://127.0.0.1:3306/db1</property>
        <property name="user">root</property>
        <property name="password">123456</property>
        <property name="acquireIncrement">5</property><!-- 如果池中数据连接不够时一次增长多少个 -->
        <property name="initialPoolSize">100</property>
        <property name="minPoolSize">50</property>
        <property name="maxPoolSize">1000</property>
        <property name="maxStatements">0</property>
        <property name="acquireIncrement">5</property>
        <property name="maxStatementsPerConnection">5</property> <!-- he's important, but there's only one of him -->
    </named-config>
</c3p0-config>
```

使用：

```java
@Test
public void xmlConnect() throws SQLException {
    //        使用xml连接，如果说使用默认(<default-config>)的话，这里无参即可
    //        系统会自动去读src/c3p0-config.xml这个文件
    //        ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource();
    //        如果说要使用有名的，这里直接填写named-config的name
    ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource("MyC3P0Config");
    Connection connection = comboPooledDataSource.getConnection();
    System.out.println("连接成功");
    connection.close();
    //        测试第二种方式的效率
    long start = System.currentTimeMillis();
    for (int i = 0; i < 5000; i++) {
        connection = comboPooledDataSource.getConnection();
        //            do nothing
        connection.close();
    }
    long end = System.currentTimeMillis();
    System.out.println("连接池二种方式的效率：" + (end - start) + "ms");
}
```

连接池二种方式的效率：909ms 

因为我这里做的限制比第一种多，所以时间会更长，如果各项数值调高一点，也能达到第一种的速度

## Druid-最好的连接池

下载：

​        👉[这个链接](https://github.com/alibaba/druid/releases/tag/1.2.8)中找到

![image-20211128223747850](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211128223747850.png)

然后再到里面找到只有名字和版本号的jar下载即可，当然也可以再下载第一个(带JavaDoc的)，使用起来更看得懂在做啥

![image-20211128223821947](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211128223821947.png)

安装老一套即可

然后再到src目录下新建文件`druid.properties` 这里名字也可以取别的

```properties
#Driver的驱动路径
driverClassName=com.mysql.cj.jdbc.Driver
# url
url=jdbc:mysql://localhost:3306/db1?rewriteBatchedStatements=true
username=root
password=123456
# 初始的连接数
initialSize=10
# 最小保留的连接数
minIdle=5
# 最大的同时连接数
maxActive=50
# 最大等待超时时间 单位:ms（当同时连接数满的时候新的连接的等待时间，如果超过指定时间则放弃连接）
maxWait=5000
```

使用Druid 为了对标C3P0 我这里直接上1000w次

```java
@Test
public void testDruid() throws Exception {
    //        1. 加入 Druid jar包
    //        2. 加入 配置文件src/druid.properties
    //        3. 创建 Properties对象，读取配置文件
    Properties properties = new Properties();
    properties.load(new FileReader("src/druid.properties"));

    //        4. 创建一个指定参数的数据库连接池
    DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);
    //        5. 测试连接
    Connection connection = dataSource.getConnection();
    System.out.println("连接成功");
    connection.close();

    //        6. 测试运行效率
    long start = System.currentTimeMillis();
    for (int i = 0; i < 1000000; i++) {
        connection = dataSource.getConnection();
        connection.close();
    }
    long end = System.currentTimeMillis();
    System.out.println("运行时间：" + (end - start) + "ms");

}
```

运行时间：275ms

大概是C3P0的10倍？

当然，次数越小，他们两之间的差距也越小，这个可以自行测试

## JDBCUtils改进-使用Druid工具类

有了德鲁伊，就方便很多了，接下来使用他来改进下工具类
druid.properties文件

```properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/db1?rewriteBatchedStatements=true
username=root
password=123456
initialSize=10
minIdle=5
maxActive=50
maxWait=5000
```

然后进行改进 注意看close的connection注释，可以结合getclass查看运行类型

```java
package com.jdbc.utils;


import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.jdbc.utils
 * @date 2021/11/24 16:40
 * @description 这是一个工具类，完成mysql的连接和关闭资源
 */
public class JdbcUtils {
    //    定义相关的属性 因为只需要一份，因此我们把他定义成静态的

    private static final DataSource DATA_SOURCE;

    /**
     * 在static代码块进行初始化
     */
    static {
        Properties properties = new Properties();
        try {
            properties.load(new FileReader("src/druid.properties"));
            DATA_SOURCE = DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
//            在实际开发中，往往需要这样处理：
//            1. 将便以一场转换成运行异常
//            2. 这时调用者可以选择捕获该异常
//            3. 也可以选择默认处理该异常，比较方便
            throw new RuntimeException(e);

        }

    }

    /**
     * 获取连接
     *
     * @return Connection
     * @throws SQLException
     */
    public static Connection getConnection() {
        try {
            return DATA_SOURCE.getConnection();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 关闭相关资源 如果需要关闭资源，就传入对象，否则传入null
     * 注意，这里的connection关闭并不是真正的关闭，而是将connection放回了连接池
     * connection本身是一个接口，mysql实现了该接口，druid也实现了该接口，遵循就近原则及动态绑定，调用的是druid实现的该接口
     * @param set        一个ResultSet
     * @param statement  一个Statement或者PreparedStatement
     * @param connection 一个connection
     */
    public static void close(ResultSet set, Statement statement, Connection connection) {

        try {
            if (set != null) {
                set.close();
            }
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
//            转换为运行时异常并抛出
            throw new RuntimeException(e);
        }

    }


}

```

## Apache-DButils

先分析一个问题

1. 关闭connection后，resultSet结果集无法继续使用
2. resultSet不利于数据的管理

接下来视图分析并解决

![image-20211129001607820](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211129001607820.png)

自己尝试用代码来解决这个问题

测试表为admin3，数据：

![image-20211129001714487](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211129001714487.png)

```java
package com;

import com.jdbc.utils.JdbcUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com
 * @date 2021/11/29 0:17
 * @description 尝试解决resultSet的问题
 */
public class MyjdbcObj {
    public static void main(String[] args) throws SQLException {
        ArrayList<User> users = new ArrayList<>();
        Connection connection = JdbcUtils.getConnection();
        String sql = "select * from admin3 limit 0,10";
        PreparedStatement statement = connection.prepareStatement(sql);
        ResultSet resultSet = statement.executeQuery();
        while (resultSet.next()) {
            users.add(
                    new User(resultSet.getInt("id"),
                            resultSet.getString("name"),
                            resultSet.getString("password")));
        }
        JdbcUtils.close(resultSet, statement, connection);
        users.forEach(System.out::println);

    }
}

class User {
    private Integer id;
    private String name;
    private String password;


    public User() {//一定要给一个无参构造器，反射需要
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public User(int id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}


```

虽然封装的过程并不难，这里可以通过函数来返回值，方便以后调用，但是一直手动这样不太舒服

于是就可以用上Apache的一款工具：Apache-DButils

### Apache-DButils的概述

1. `commone-dbutils`是Apache组织提供的一个开源的JDBC工具类库，它是对JDBC的封装，使用dbutils能极大简化JDBC编码的工作量【超级好用】
2. Dbuils类
3. QueryRunner类：该类封装了SQl的执行，是线程安全的，可以实现增删改查、批处理
4. ResultSetHandler接口：该接口用于处理`java.sql.resultSet`，将数据按照要求转换成另一种形式，其实现类有：

![image-20211129135236273](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211129135236273.png)

### Apache-DButils安装及使用

先到[这里](https://commons.apache.org/proper/commons-dbutils/download_dbutils.cgi)下载压缩包，下载带bin的

![image-20211129153536045](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211129153536045.png)

然后解压出

![image-20211129153605252](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211129153605252.png)

这个，之后老一套安装即可

使用：

#### 返回一个ArrayList Object

```java
package com.datasource;

import com.jdbc.utils.JdbcUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.datasource
 * @date 2021/11/29 13:57
 * @description 项目描述
 */
public class Dbutils_USE {
    //    使用Apache-DButils+druid+工具类完成对表的CRUD操作
    public static void main(String[] args) throws SQLException {
//    1 得到连接
        Connection connection = JdbcUtils.getConnection();
//        2 使用Dbutils类和接口，先引入相关的jar，加入到本project
//        3 传建一个QueryRunner
        QueryRunner queryRunner = new QueryRunner();
        String sql = "select * from admin3 where id>? limit 0,50";
//        4 就可以执行相关的方法，返回ArrayList结果集
        List<User> query =
                //query()方法就是执行一个sql语句，得到一个resultSet ---封装到--> ArrayList结果集,并返回
                queryRunner.query(
//                        连接
                        connection,
//                        sql语句
                        sql,
//                        在将resultSet --->User对象--->封装到ArrayList中
//                        底层使用反射机制去获取到User的属性，然后进行封装
//                        这里的User必须是public类
                        new BeanListHandler<>(User.class),
//                        这个就是传入到sql的参数，可以填写多个(可变参数)
                        1
                );
//        底层得到的结果集resultSet会自动关闭，statement也是
        JdbcUtils.close(null, null, connection);
        query.forEach(System.out::println);
    }

}

```

#### 返回一个对象 Object

```java
/**
* 演示使用apache utils + druid 完成返回的结果是单行记录（单个对象）
*/
@Test
public void testQuerySingle() throws SQLException {
    Connection connection = JdbcUtils.getConnection();
    QueryRunner queryRunner = new QueryRunner();
    //        SQL语句返回单个对象
    String sql = "select * from admin3 where id = ?";
    //这里是知道只返回一条的前提下使用 BeanHandler
    User query = queryRunner.query(connection, sql, new BeanHandler<>(User.class), 1);
    connection.close();
    //如果说没有符合的结果将返回一个null
    System.out.println(query);
}
```

#### 返回一个字段的对象

```java
/**
* 返回一个单行单列的对象（结果只有一条且只有一个字段）
* @throws SQLException
*/
@Test
public void testQueryScalar() throws SQLException {
    Connection connection = JdbcUtils.getConnection();
    QueryRunner queryRunner = new QueryRunner();
    String sql = "select name from admin3 where id = ?";
    Object query = queryRunner.query(connection, sql, new ScalarHandler<>(), 1);
    System.out.println(query);
    //user0
    System.out.println(query.getClass()); 
    //java.lang.String
    connection.close();
}
```

#### 完成DML操作

 ```java
 @Test
 public void testDML() throws SQLException {
     Connection connection = JdbcUtils.getConnection();
     QueryRunner queryRunner = new QueryRunner();
     String sql = "insert into admin3 values(null,?,?)";
     //        这里组织语句完成DML操作 （update insert delete 都是一样的用法）
     int update = queryRunner.update(connection, sql, "user1", "123");
     //        返回值是受影响的函数，如果返回0则表示没有行受影响（增删改失败）
     System.out.println(update);
     connection.close();
 }
 ```

### SQL中各个类型和JavaBean类型的对应关系

![image-20211129165329057](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211129165329057.png)

## BasicDao

先来看一个问题

apache-Dbutils+Druid简化了JDBC的开发，但还有不足：

1. SQL语句是固定，不能通过参数传入，通用型不好，需要进行改进，更方便的执行**增删改查**
2. 对于select操作，如果有返回值，返回类型不能固定，需要使用泛型
3. 将来的表很多，业务需求复杂，不可能只靠一个java类完成

![image-20211129171051364](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211129171051364.png)

![image-20211129171857970](http://81.68.162.137:9300/blog-notes/images/JavaSE/22-JDBC和数据库连接池/image-20211129171857970.png)

### DAO和增删改查通用方法-写一个basicDao

1. DAO：<u>data access object</u> 数据访问对象
2. 这样的通用类，被称为*basicDao*，是专门和数据库交互的，即完成对数据库（表）的crud操作
3. 在BasicDao的基础上，实现一张表对应一个Dao，更好的完成功能
   比如Customer表-Customer.java类(Javabean)--CustomerDao.java

接下来完成一个简单的设计

- `com.xxx.utils` 工具类 比如JDBCUtils
- `com.xxx.domain` JavaBean 比如User、Emp之类的
- `com.xxx.dao` 存放XxxDao和BasicDao
- `com.xxx.test`测试类

接下来开始写BasicDao类：其实很简单，就是对前面的类的封装

```java
package com.batch_;

import com.dao_.utils.JdbcUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.util.List;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.batch_
 * @date 2021/11/29 17:22
 * @description 开发BasicDao，是其他Dao的父类
 * 泛型来指定具体的类型
 */
public class BasicDao<T> {
    QueryRunner queryRunner = new QueryRunner();

    /**
     * 通用的增删改方法
     *
     * @param sql    sql语句，String
     * @param params 参数，Object[]
     * @return int
     */
    public int update(String sql, Object... params) {
        Connection connection = null;
        try {
            connection = JdbcUtils.getConnection();
            return queryRunner.update(sql, params);
        } catch (Exception e) {
//            将编译时异常，转换成运行时异常
            throw new RuntimeException(e);
        } finally {
            JdbcUtils.close(null, null, connection);
        }
    }

    /**
     * 查询多个结果
     *
     * @param sql    SQL 语句 可以有占位符
     * @param clazz  传入一个类的Class对象 比如 User.class...
     * @param params 参数 可变形参 传入问号的具体的值，可以是多个
     * @return 根据clazz返回一个ArrayList T
     */
    public List<T> select(String sql, Class<T> clazz, Object... params) {
        Connection connection = null;
        try {
            connection = JdbcUtils.getConnection();
            return queryRunner.query(connection, sql, new BeanListHandler<>(clazz), params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            JdbcUtils.close(null, null, connection);
        }
    }

    /**
     * 查询单挑数据 返回一个Object
     *
     * @param sql    sql语句
     * @param clazz  一个类的Class对象
     * @param params 可变形参 传入问号的具体的值，可以是多个
     * @return 一个Object T 根据clazz决定
     */
    public T selectToOne(String sql, Class<T> clazz, Object... params) {
        Connection connection = null;
        try {
            connection = JdbcUtils.getConnection();
            return queryRunner.query(connection, sql, new BeanHandler<>(clazz), params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            JdbcUtils.close(null, null, connection);
        }
    }

    /**
     * 返回单行的某个字段的方法
     *
     * @param sql    sql语句
     * @param params 可变形参
     * @return 一个Object，根据最终取出的值动态绑定运行类型
     */
    public Object selectToField(String sql, Object... params) {
        Connection connection = null;
        try {
            connection = JdbcUtils.getConnection();
            return queryRunner.query(connection, sql, new ScalarHandler<>(), params);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            JdbcUtils.close(null, null, connection);
        }
    }

}

```

然后定义一个UserDao和BasicDao在同级下

```java
package com.dao_.dao;

import com.dao_.domain.User;

import java.util.List;

/**
 * @author Amayakite
 * @version 1.0.0
 * @BelongsProject 13-JDBC
 * @BelongsPackage com.dao_.dao
 * @date 2021/11/29 20:50
 * @description UserDao 继承自BasicDao
 * 可以使用BasicDao的独有方法，如果说项目需求特殊，也可以写上自己的特有方法(根据业务需求 )
 */
public class UserDao extends BasicDao<User> {

}

```

使用:

```java
@Test
public void testUserDao() {
    UserDao userDao = new UserDao();
    List<User> select = userDao.select("select * from admin3 where id >=? limit 0,10", User.class, 5);
    System.out.println("=====查询多行结果");
    select.forEach(System.out::println);
    System.out.println("=====查询完毕");
    //        查询单行单列
    Object o = userDao.selectToField("select name from admin3 where id = ?", 666);
    System.out.println("=====查询单行单列");
    System.out.println(o);
    System.out.println("=====查询完毕");
    //        增加一条数据
    int update = userDao.update("insert into  admin3 values(null,?,sha1(?))", "张三", "123456");
    System.out.println("=====增加一条数据");
    System.out.println("增加" + (update > 0 ? "成功" : "失败"));
    System.out.println("=====增加完毕");
    User user = userDao.selectToOne("select * from admin3 where name = ?", User.class, "张三");
    System.out.println("=====查询单行");
    System.out.println(user);
    System.out.println("=====查询完毕");
    //        更新一条数据
    int update1 = userDao.update("update admin3 set name = ? where id = ?", "王老五", 5);
    User user1 = userDao.selectToOne("select * from admin3 where id = ?", User.class, 5);
    System.out.println("更新一条数据");
    System.out.println(user1);
    System.out.println("更新完毕");
    //        删除一条数据
    int delete = userDao.update("delete from admin3 where name=?", "张三");
    System.out.println("删除一条数据");
    System.out.println("删除" + (delete > 0 ? "成功" : "失败"));
    System.out.println("删除完毕");
}
```

自此，JDBC的基本使用就结束了，剩余的高级内容等JUC学完了再说吧
