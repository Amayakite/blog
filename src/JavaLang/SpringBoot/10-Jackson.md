---
title: 10-Jackson
date: 2022-6-11 21:12:34
category: SpringBoot
tags:
- Json
- FastJson
- SpringBoot
---

## 概述

如果你用了Springboot，应该会发现他有个很神奇的自带功能，就是可以将实体类转换成json对象返回给客户端，其底层就是用到了Jackson

不过json转换器目前不止有Jackson，还有

- Google提供的Gson
- Alibaba提供的FastJson

当然三者各有千秋吧，不过SpringBoot竟然默认是使用Jackson，所以就有必要了解下如何使用了

官网：[FasterXML/jackson: Main Portal page for the Jackson project (github.com)](https://github.com/FasterXML/jackson)

其中有一句描述为

> Jackson has been known as "the Java JSON library" or "the best JSON parser for Java". Or simply as "JSON for Java".
>
> Jackson被称为“Java JSON库”或“Java的最佳JSON解析器”。或者干脆写成“JSON for Java”。

然后它还有如下的几个内容可以选择

- [Streaming](https://github.com/FasterXML/jackson-core) ([docs](https://github.com/FasterXML/jackson-core/wiki)) ("jackson-core") defines low-level streaming API, and includes JSON-specific implementations—也就是核心包
- [Annotations](https://github.com/FasterXML/jackson-annotations) ([docs](https://github.com/FasterXML/jackson-annotations/wiki)) ("jackson-annotations") contains standard Jackson annotations—基于核心包封装了一些注解
- [Databind](https://github.com/FasterXML/jackson-databind) ([docs](https://github.com/FasterXML/jackson-databind/wiki)) ("jackson-databind") implements data-binding (and object serialization) support on `streaming` package; it depends both on `streaming` and `annotations` packages—实现数据的绑定（序列化和反序列化）

也就是说我们使用jackson实际上就是使用它的`jackson-databind`这个项目

并且它还不仅能转换json，还可通过其他方式来完成对其他类型的转换

![image-20220611212331382](/images/SpringBoot/10-Jackson/image-20220611212331382.png)

## Jackson的安装

比较简单，这里创建一个空的maven或者gradle项目，依赖如下

> maven

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.3</version>
</dependency>
```

> gradle(groovy)

```groovy
// https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind
implementation 'com.fasterxml.jackson.core:jackson-databind:2.13.3'
```

> gradle(kotlin)

```kotlin
// https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind
implementation("com.fasterxml.jackson.core:jackson-databind:2.13.3")
```

可以看到导入后，实际包含了core和注解的依赖

![image-20220611212734500](/images/SpringBoot/10-Jackson/image-20220611212734500.png)

## 将Java对象转换成Json字符串

我们首先来一个实体类

```java
package com.project.jsontest;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class User {
    private String name;
    private Integer age;
    private BigDecimal salary;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    public User(String name, Integer age, BigDecimal salary, LocalDateTime createTime, LocalDateTime updateTime) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public User() {
    }
}
```

接着写一点测试代码，然后发现运行报错

```java
public class JsonTest {
    public static void main(String[] args) {
        User user = new User(
                "张三",
                20,
                new BigDecimal("1012321.325135621156"),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
//        首先来一个ObjectMapper对象
        ObjectMapper objectMapper = new ObjectMapper();
        try {
//            然后来转换成json字符串
            String s = objectMapper.writeValueAsString(user);
            System.out.println(s);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
```

![image-20220611213608366](/images/SpringBoot/10-Jackson/image-20220611213608366.png)

是我们**实体类中并没有任何的get**和set方法，所以说给全部属性手动加上即可（基本所有来检测是否有get方法，通过getXXX来获取所有的相关字段，fastjson和gson之类的也是如此）

加上后，又出现了一个异常

![image-20220611214047277](/images/SpringBoot/10-Jackson/image-20220611214047277.png)

```text
 com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 date/time type `java.time.LocalDateTime` not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling (through reference chain: com.project.jsontest.User["createTime"])
 
 com.fasterxml.jackson.databind.exc.InvalidDefinitionException: Java 8 datetime type `java.time.LocalDateTime` 默认不支持：添加模块“com.fasterxml.jackson.datatype:jackson-datatype-jsr310”以启用处理（通过参考链：com.project.jsontest.User["createTime"])
```

也就是说他不支持java8中提供的LocalDatetime类的转换，需要额外添加一个依赖来进行处理

这里直接加上即可

```xml
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
    <version>2.13.3</version>
</dependency>
```

接下来看看这个jsr310的依赖关系

![image-20220611214435426](/images/SpringBoot/10-Jackson/image-20220611214435426.png)

实际上它包含了之前的三者，所以说通常情况下直接引入它就可以替代databind了，所以现在可以直接把`databind`删除掉

当然，目前情况下依旧是无法直接转换的，需要添加一行代码来注册jsr310到ObjectWarpper对象之内

```java {12-13}
public class JsonTest {
    public static void main(String[] args) {
        User user = new User(
                "张三",
                20,
                new BigDecimal("1012321.325135621156"),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
//        首先来一个ObjectMapper对象
        ObjectMapper objectMapper = new ObjectMapper();
//        findAndRegisterModules：查找并注册所有的Module（比如jsr310）
        objectMapper.findAndRegisterModules();
        try {
//            然后来转换成json字符串
            String s = objectMapper.writeValueAsString(user);
            System.out.println(s);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
```

结果

```json
{
    "name":"张三",
    "age":20,
    "salary":1012321.325135621156,
    "createTime":[
        2022,
        6,
        11,
        21,
        47,
        55,
        818482000
    ],
    "updateTime":[
        2022,
        6,
        11,
        21,
        47,
        55,
        818482000
    ]
}
```

EMM这个日期也转换的不对啊，所以我们应该手动给他一个日期转换器，这里可以在实体类中设置

```java
// 注意 这个@Date是Lombok的，不是Jackson的 和Jackson没有关系
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String name;
    private Integer age;
    private BigDecimal salary;

//    只需要使用@JsonFormat注解，然后pattern参数指定日期格式即可
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

}
```

然后你就能得到这样一个json

```json
{
    "name":"张三",
    "age":20,
    "salary":1012321.325135621156,
    "createTime":"2022-06-11 21:54:14",
    "updateTime":"2022-06-11 21:54:14"
}
```

## Json自定义转换器

如果我们想要自定义一个Json的转换器，例如一个BigDecimal，我只想保留小数点后一位（四舍五入）

那么可以这样

```java
package com.project.jsontest;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class CustomerBigDecimalSerialize extends JsonSerializer<BigDecimal> {
    @Override
    public void serialize(BigDecimal bigDecimal, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
//        保留小数点后一位，第二个参数是四舍五入的模式
        jsonGenerator.writeNumber(bigDecimal.setScale(1, RoundingMode.HALF_UP));
    }
}

```

当然你也可以直接输出string

```java
package com.project.jsontest;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class CustomerBigDecimalSerialize extends JsonSerializer<BigDecimal> {
    @Override
    public void serialize(BigDecimal bigDecimal, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
//        保留小数点后一位，第二个参数是四舍五入的模式
        BigDecimal bigDecimal1 = bigDecimal.setScale(1, RoundingMode.HALF_UP);
//       当然也可以直接输出string
        jsonGenerator.writeString(bigDecimal1.toString());
    }
}

```

接着使用

```java {8-11}
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private String name;
    private Integer age;

//    @JsonSerialize:可以自定义序列化的规则，例如：将BigDecimal转换为String
//    注意 这里并不是@JsonFormat
    @JsonSerialize(using = CustomerBigDecimalSerialize.class)
    private BigDecimal salary;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

}

```

> 再写一个方法试试
>
> ```java
> public class JsonTest {
>     public static void main(String[] args) throws JsonProcessingException {
>         ArrayList<User> users = new ArrayList<>();
>         users.add(new User("张三", 18, new BigDecimal(1000.56456456), LocalDateTime.now(), LocalDateTime.now()));
>         users.add(new User("李四", 19, new BigDecimal(2000.45645456), LocalDateTime.now(), LocalDateTime.now()));
>         users.add(new User("王五", 20, new BigDecimal(3000.33345633), LocalDateTime.now(), LocalDateTime.now()));
> 
> //        首先来一个ObjectMapper对象
>         ObjectMapper objectMapper = new ObjectMapper();
> //        findAndRegisterModules：查找并注册所有的Module（比如jsr310）
>         objectMapper.findAndRegisterModules();
> //        writeValueAsString：将对象转换为json字符串
>         String json = objectMapper.writeValueAsString(users);
>         System.out.println(json);
>     }
> }
> ```

效果

```json
[
    {
        "name":"张三",
        "age":18,
        "salary":"1000.6",
        "createTime":"2022-06-11 22:18:42",
        "updateTime":"2022-06-11 22:18:42"
    },
    {
        "name":"李四",
        "age":19,
        "salary":"2000.5",
        "createTime":"2022-06-11 22:18:42",
        "updateTime":"2022-06-11 22:18:42"
    },
    {
        "name":"王五",
        "age":20,
        "salary":"3000.3",
        "createTime":"2022-06-11 22:18:42",
        "updateTime":"2022-06-11 22:18:42"
    }
]
```

## 解析Json字符串

直接上代码

只有一个注意点：在任何情况下，要转换成带有泛型的类的话，必须得使用`TypeReference`

```java {15-17}
package com.project.jsontest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;

public class JsonTest {
    public static void main(String[] args) throws JsonProcessingException {
        String str = "[{\"name\":\"张三\",\"age\":18,\"salary\":\"1000.6\",\"createTime\":\"2022-06-11 22:18:42\",\"updateTime\":\"2022-06-11 22:18:42\"},{\"name\":\"李四\",\"age\":19,\"salary\":\"2000.5\",\"createTime\":\"2022-06-11 22:18:42\",\"updateTime\":\"2022-06-11 22:18:42\"},{\"name\":\"王五\",\"age\":20,\"salary\":\"3000.3\",\"createTime\":\"2022-06-11 22:18:42\",\"updateTime\":\"2022-06-11 22:18:42\"}]";
//        首先来一个ObjectMapper对象
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
//        解析json字符串 这里和FastJson差不多，都是用objectMapper.readValue(str, new TypeReference<List<Customer>>() {});
//        如果是FastJson的话，则是：JSON.parseObject(str, new TypeReference<List<Customer>>() {});
        ArrayList<User> users = objectMapper.readValue(str, new TypeReference<ArrayList<User>>() {
        });
        for (User user : users) {
            System.out.println(user);
        }
    }
}

```

当然，如果只是转换个简简单单的单User的话，第二个参数直接传入`User.class`即可

效果

![image-20220611223636750](/images/SpringBoot/10-Jackson/image-20220611223636750.png)

嘛反正这个Typereference用途大概如下

![image-20220611224750641](/images/SpringBoot/10-Jackson/image-20220611224750641.png)

## @JsonProperty设定别名

例如

```java {5}
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @JsonProperty("user_name")
    private String name;
    
    private Integer age;

    @JsonSerialize(using = CustomerBigDecimalSerialize.class)
    private BigDecimal salary;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

}

```

反序列化结果

```json
{"age":20,"salary":"1000.0","createTime":"2022-06-11 22:59:12","updateTime":"2022-06-11 22:59:12","user_name":"张三"}
```

## @JsonIgnore和@JsonIgnoreProperties忽略属性

两个效果一样，不过一个是放在类上，一个是放在属性上声明

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
// 这里可以指定多个，逗号分隔
@JsonIgnoreProperties({"user_name"})
public class User {
    @JsonProperty("user_name")
    private String name;

    @JsonIgnore
    private Integer age;

    @JsonSerialize(using = CustomerBigDecimalSerialize.class)
    private BigDecimal salary;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

}
```

效果

```json
{"salary":"1000.0","createTime":"2022-06-11 23:02:10","updateTime":"2022-06-11 23:02:10"}
```

## @JsonCreator来自定义构造函数

例子：当你 的属性都是final值的时候（无法set）

```java
public class CtorBean
{
  public final String name;
  public final int age;

  @JsonCreator // 这个构造器随便是啥，public或者private都可以，只要带上JsonCreator这个依赖并且在构造函数中声明的属性和实际要解析的属性名一致（可以用@JsonProperty来指定
  private CtorBean(@JsonProperty("name") String name,
    @JsonProperty("age") int age)
  {
      this.name = name;
      this.age = age;
  }
}
```

## 附录-在Kotlin中使用Jackson

首先需要一个原先的jsr310依赖（附带data-bind、注解和core)，然后需要一个配合kotlin的依赖`jackson-module-kotlin`，这两个依赖的版本务必相同

```kotlin
implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.13.3")
implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.3")
```

接着，可以正常的在data类中使用对对应的注解，例如

```kotlin
package com.project

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import java.math.BigDecimal
import java.time.LocalDateTime

data class User(
    @JsonProperty("user_name") val name: String,
    val age: Int?,
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") val createTime: LocalDateTime,
    @JsonSerialize(using = CustomBigDecimalSerialize::class) val salary: BigDecimal?
)

```

CustomBigDecimalSerialize类如下

```kotlin
package com.project

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializerProvider
import java.math.BigDecimal

class CustomBigDecimalSerialize : JsonSerializer<BigDecimal>() {
    override fun serialize(value: BigDecimal?, gen: JsonGenerator?, serializers: SerializerProvider?) {
        gen?.writeString(value?.toPlainString())
    }

}
```

接着调用

```kotlin {23-24}
package com.project

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import java.math.BigDecimal
import java.time.LocalDateTime


fun main() {

    val jacksonObjectMapper = jacksonObjectMapper()
    jacksonObjectMapper.findAndRegisterModules()

    val userList = ArrayList<User>()
    userList.add(User("张三", 1, LocalDateTime.now(), BigDecimal("100.00")))
    userList.add(User("李四", 2, LocalDateTime.now(), BigDecimal("200.03")))
    userList.add(User("王五", 3, LocalDateTime.now(), BigDecimal("300.04")))
    userList.add(User("赵六", 4, LocalDateTime.now(), BigDecimal("400.05")))
    userList.add(User("田七", 5, LocalDateTime.now(), BigDecimal("500.06")))

    jacksonObjectMapper.writeValueAsString(userList).also {
        println(it)
//        再转换回来 在Kotlin中对readValue做了增强，可以直接传入泛型而不需要使用TypeReference
        val userList2 = jacksonObjectMapper.readValue<List<User>>(it)
        println("====转换回来")
        println(userList2)
    }


}


```

效果

```json
[{"user_name":"张三","age":1,"createTime":"2022-06-12 10:21:24","salary":"100.00"},{"user_name":"李四","age":2,"createTime":"2022-06-12 10:21:24","salary":"200.03"},{"user_name":"王五","age":3,"createTime":"2022-06-12 10:21:24","salary":"300.04"},{"user_name":"赵六","age":4,"createTime":"2022-06-12 10:21:24","salary":"400.05"},{"user_name":"田七","age":5,"createTime":"2022-06-12 10:21:24","salary":"500.06"}]

====转换回来

[User(name=张三, age=1, createTime=2022-06-12T10:21:24, salary=100.00), User(name=李四, age=2, createTime=2022-06-12T10:21:24, salary=200.03), User(name=王五, age=3, createTime=2022-06-12T10:21:24, salary=300.04), User(name=赵六, age=4, createTime=2022-06-12T10:21:24, salary=400.05), User(name=田七, age=5, createTime=2022-06-12T10:21:24, salary=500.06)]
```
