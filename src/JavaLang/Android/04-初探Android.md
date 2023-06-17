---
title: 4-初探Android
date: 2022-5-9 12:20:35
category: Andorid
tag:
- Android
---

# 概述

关于AndroidOS，这是基于Linux内核的自由及开源的操作系统（嘛因为基于Linux，所以也得这样整

然后就是关于如何开发，学习过程中我将会使用Java和Kotlin的混合开发

最后就是IED的选择，可以选择基于IEDA衍生的Android Studio，也可以选择IEDA（需要启用Kotlin和Android插件），我这里就懒得下载Android Studio了，直接用IEDA

# 初探Android



## 从一个HelloWorld开始

毕竟万物基于Hello World嘛，我这里假设你安装完毕了Android Studio或者IEDA，下面使用IEDA演示，Android Studio跟着感觉做即可

首先新建一个项目，创建的过程中选择**Empty Activity**

![image-20220509122858858](/images/Android/04-初探Android/image-20220509122858858.png)

然后填入如下内容（PS：实际开发大项目的过程中都是兼容最老的版本hhhh不过一般都是7.0多一些）

![image-20220509123140115](/images/Android/04-初探Android/image-20220509123140115.png)

创建完毕后，等待gradle加载完毕，首先能看到有个main类

![image-20220509123736298](/images/Android/04-初探Android/image-20220509123736298.png)

点击左边那个xml

![image-20220509123800742](/images/Android/04-初探Android/image-20220509123800742.png)

能看到一个Hello World居中显示

然后我们需要下载下adv（就类似于模拟器之类的）

![image-20220509123918115](/images/Android/04-初探Android/image-20220509123918115.png)

然后点击create

![image-20220509123935442](/images/Android/04-初探Android/image-20220509123935442.png)

然后选择默认（这里只是选择下外观而已）的并next

![image-20220509124053671](/images/Android/04-初探Android/image-20220509124053671.png)

然后选择Android的版本，这里选择API是30的，也就是Android11，并点击download

![image-20220509124221944](/images/Android/04-初探Android/image-20220509124221944.png)

下载需要一定的时间，可能速度会比较慢...

下载好后点击下一步，会显示要创建的ADV的信息，同时如果你是IEDA的话，右下角会出现一个要安装的按钮，点进去安装即可，里面的内存随你电脑的内存来酌情设置（貌似不装也可以，直接点右下角完成也行）

![image-20220509125618433](/images/Android/04-初探Android/image-20220509125618433.png)

完毕后，点击启动即可

![image-20220509125822975](/images/Android/04-初探Android/image-20220509125822975.png)

然后你就可以看到Hello World了

![image-20220509130008530](/images/Android/04-初探Android/image-20220509130008530.png)

这是一个正宗的原生系统，如果说你不想用它的话，也可以选择模拟器或者手机

如果要连接手机的话，首先手机通过USB连接电脑，然后打开USB调试模式（要先开启开发者模式），然后就能在IED中看到多了一个设备，也就是你的设备，这时就可以直接run在上面了

![image-20220509130517917](/images/Android/04-初探Android/image-20220509130517917.png)

运行效果

![image-20220509130658246](/images/Android/04-初探Android/image-20220509130658246.png)

然后如果你使用的是内置模拟器的话，还可以通过这种方式来内嵌使用

![image-20220509131043760](/images/Android/04-初探Android/image-20220509131043760.png)

当然你也可以使用模拟器之类的来run，不过模拟器的话需要先把之前在下载Android系统中的`platform-tools`这个路径下的adb.exe替换掉模拟器自带的adb.exe

![image-20220509133228784](/images/Android/04-初探Android/image-20220509133228784.png)

## Android中的日志相关

要在Android中DEBUG有点困难，所以一般都是用Log的形式来查看

要创建一个Log，只需要这样

```java {15}
package com.project.helloworld;

import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // log
        Log.d("MainActivity", "Hello World!");
    }
}
```

在Android中，日志分为5个等级

![image-20220509131548632](/images/Android/04-初探Android/image-20220509131548632.png)

然后就可以看到了

![image-20220509131851339](/images/Android/04-初探Android/image-20220509131851339.png)

不过这贼多的日志看着头疼，可以通过配置过滤器来查看我们的日志

![image-20220509131935217](/images/Android/04-初探Android/image-20220509131935217.png)

这样配置即可

![image-20220509132000606](/images/Android/04-初探Android/image-20220509132000606.png)

当然你也可以命名下之类的，这里就不说明了，设置完后，效果为

![image-20220509132044842](/images/Android/04-初探Android/image-20220509132044842.png)

## Android的开发语言

主要有两条路子：**原生开发**和**混合开发**

Android的官方编译语言包括Java和Kotlin

![image-20220509133529414](/images/Android/04-初探Android/image-20220509133529414.png)

混合开发就是emm类似于开发HTML一样的语法，给你解析成Android，比起原生的好处是可以一套代码几个平台（例如Flutter、ReactNatie和Vue的UniApp等），常见的就是一套代码支持Web，桌面，Android，IOS，但缺点是性能和体验度没有原生的好

一般来说大项目是纯原生，小项目一般混合或者说两者混合

## Android的目录结构

首先我们将视图切换成Android

![image-20220509134936845](/images/Android/04-初探Android/image-20220509134936845.png)

然后可以看到有如下几个文件夹

![image-20220509135000483](/images/Android/04-初探Android/image-20220509135000483.png)

![image-20220509134912482](/images/Android/04-初探Android/image-20220509134912482.png)

首先看这个文件

![image-20220509135055619](/images/Android/04-初探Android/image-20220509135055619.png)

这里面只有一个xml文件，这个xml文件是APP的运行配置文件，其余的和springboot相同，那两个generated不管他

在java文件夹中，有三个包，除了第一个，其余两个都是单元测试的

![image-20220509135229518](/images/Android/04-初探Android/image-20220509135229518.png)

然后在res文件夹中，有额外的四个文件夹

![image-20220509135244139](/images/Android/04-初探Android/image-20220509135244139.png)

- Drawable：存放图形描述文件和图片文件
- Layout：存放APP页面的布局文件
- mipmap：存放App的启动图标
- values：存放一些常量定义文件，例如字符串常量strings.xml，像素常量dimens.xml，颜色常量colors.xml，样式风格文件styles.xml等

然后是gradle scripts文件夹

![image-20220509135826693](/images/Android/04-初探Android/image-20220509135826693.png)

PS：如果要给项目加依赖的话，加到那个Module的build.gradle内

![image-20220509140232659](/images/Android/04-初探Android/image-20220509140232659.png)

## build.gradle配置文件

通常来说在Android中一个Module就是一个APP

![image-20220509141037269](/images/Android/04-初探Android/image-20220509141037269.png)

先看Project的

````groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        // 配置gradle插件版本，下面的版本号就是Android Studio内核版本号
        classpath "com.android.tools.build:gradle:7.0.0"

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files

    }
}



task clean(type: Delete) {
    delete rootProject.buildDir
}
````

然后是模块的

```groovy
plugins {
    id 'com.android.application'
}

android {
    // 指定编译用的SDK版本号，比如30就是Android 11.0编译
    compileSdk 32
    
    // 指定编译工具的版本号，这里的头两位必须和compileSdk相同，具体的版本号可以在sdk的安装目录下的build-tools找到 新版中默认没有下面这个东西，可以手动设置下
    buildToolsVersion "32.0.0"

    defaultConfig {
        // 指定包名（也是运行时候的编号，用户看的到）
        applicationId "com.project.helloworld"
        // 指定适合运行的最小版本号 比如19的话表示最少要Android 4.4
        minSdk 28
        //  指定目标设备的sdk版本号，表示App最希望在哪个版本的Android下运行
        targetSdk 32
        // 应用版本号
        versionCode 1
        // 应用版本昵称（用户看得到）
        versionName "1.0"
	
        // 指定单元测试类
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
	// 这里就可以自定义依赖了
    // 兼容性的库 例如刚刚我们的那个类就是继承自AppCompatActivity
    // 就是官方给的兼容性的解决方案
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'com.google.android.material:material:1.3.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    testImplementation 'junit:junit:4.+'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
    
    // 自定义例如fastjson和lombok
    implementation 'com.alibaba:fastjson:1.2.80'
    
    // 注意 lombok必须要这样，否则无法使用
    implementation 'org.projectlombok:lombok:1.18.22'
    annotationProcessor 'org.projectlombok:lombok:1.18.22'

}
```

## 运行配置文件AndroidManifest.xml

AndroidManifest.xml指定了APP的运行配置信息，它是一个XML描述文件，初始大概是这个样子

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          // 指定包 要和build.gradle(Module)的applicationId保持一致
          package="com.project.helloworld">

    <application
            // 是否允许应用备份，允许用户备份系统应用和第三方应用的apk安装包和应用数据，以便在刷机或者数据丢失后恢复应用，用户可以通过adb backup 和 adb restore来进行对应用数据的备份和恢复，为true表示允许，false表示不允许
            android:allowBackup="true"
            // 指定App在手机屏幕上显示的图标
            android:icon="@mipmap/ic_launcher"
            // 指定App在手机上显示的名称
            android:label="@string/app_name"
            // 指定App的圆角图标
            android:roundIcon="@mipmap/ic_launcher_round"
            // 是否支持阿拉伯语、波斯语这种从右往左的文字排序，true表示支持，false表示不支持
            android:supportsRtl="true"
            // 指定App的显示风格（UI风格）
            android:theme="@style/Theme.HelloWorld">
        
        <!--
		这个activity节点，是活动页面的注册声明，相当于只有在这里配置了activity节点，才能在运行的时候访问对应的活动页面，初始配置的.MainActivity是APP的默认主页，之所以说是APP的默认主页，是因为它的内部有一个intent-filter
		activity类似于router
		-->
        <activity
                android:name=".MainActivity"
                android:exported="true">
            <!--
			下面的两个标签就表示这个activity是一个主页
			-->
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>

</manifest>
```

## 基本的页面显示和逻辑处理

首先我们修改下res/layout的`activity_main.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>


<!--下面这些代码的大意
LinearLayoutCompat：线性布局
xmlns:android="http://schemas.android.com/apk/res/android"：命名空间 android: 让后续的代码可以访问 android 命名空间下的属性
android:layout_width="match_parent"：布局宽度为 match_parent 即全屏
android:layout_height="match_parent"：布局高度为 match_parent 即全屏
android:orientation="vertical"：布局方向为垂直
android:gravity="center"：布局居中 相当于css中的 display: flex; justify-content: center; align-items: center;

-->
<androidx.appcompat.widget.LinearLayoutCompat
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:gravity="center"
>

    <!--    文本空间，宽高为根据内容自动调整(wrap_content 包裹内容) 字体大小30sp(这个之后会说) id等下会用到，固定写法 @+id/你的自定义内容 即可设置id-->
    <TextView
            android:id="@+id/myText"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello World"
            android:textSize="30sp"
    />


</androidx.appcompat.widget.LinearLayoutCompat>
```

然后修改我们的MainActivity

```java
package com.project.helloworld;

import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 生命周期 之后会说明
        super.onCreate(savedInstanceState);
//        显示哪一个布局 R这个类是自动生成的 相当于R可以直接获取res文件夹下的资源 例如R.layout.activity_main 就是获取res/layout/activity_main.xml
        setContentView(R.layout.activity_main);
//        通过id获取控件
        TextView textView = findViewById(R.id.myText);
//        设置文本
        textView.setText("你好，世界！");

    }
}
```

运行后，你就可以看到自己的后续重设的内容了

![image-20220509152053493](/images/Android/04-初探Android/image-20220509152053493.png)

## Activity的创建和跳转

我们在res/layout下新建一个`mypage.xml`

![image-20220509152729006](/images/Android/04-初探Android/image-20220509152729006.png)

里面更名啥的然后完成即可

![image-20220509152808942](/images/Android/04-初探Android/image-20220509152808942.png)

然后先到values下的strings.xml中添加如下内容

```xml {3}
<resources>
    <string name="app_name">HelloWorld</string>
    <string name="myPage_Text">This is a MyPage!</string>
</resources>
```

接着回到mypage调用这个资源给到文本

```xml {15}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical"
              android:gravity="center"
>

<!--
    @string/xxx 指的是调用res/values/strings.xml中的字符串
-->
    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/myPage_Text"
    />

</LinearLayout>
```

接着，我们回到java中，新建一个MyPageActivity.java并且继承于AppCompatActivity

并且重写`onCreate(@Nullable Bundle savedInstanceState)`这个方法，注意是一个参数的，还有个两个参数的调不到，剩下的就是常规操作了

```java
package com.project.helloworld;

import android.os.Bundle;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

/**
 * @author Amayakite
 * @version 1.0
 * @date 2022年05月09日15时33分16秒
 * @description TODO
 */
public class MyPageActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.mypage);
    }
}

```

接着，我们还需要在清单文件`AndroidManifest.xml`中声明这个activity

```xml {22}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.project.helloworld">

    <application
            android:allowBackup="true"
            android:icon="@mipmap/ic_launcher"
            android:label="@string/app_name"
            android:roundIcon="@mipmap/ic_launcher_round"
            android:supportsRtl="true"
            android:theme="@style/Theme.HelloWorld">
        <activity
                android:name=".MainActivity"
                android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        
        
        <activity android:name=".MyPageActivity"/>
    </application>

</manifest>
```

然后就是编写下从main要跳转到我们的mypage，回到`layout/activity_main.xml`，增加一个按钮

```xml {19-20}
<?xml version="1.0" encoding="utf-8"?>

<androidx.appcompat.widget.LinearLayoutCompat
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:gravity="center"
>

    <TextView
            android:id="@+id/myText"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello World"
            android:textSize="30sp"
    />

    <Button android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="点击跳转页面"
            android:id="@+id/changeBtn"/>


</androidx.appcompat.widget.LinearLayoutCompat>
```

然后回到它的类，给按钮添加click事件

```java {20-33}
package com.project.helloworld;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TextView textView = findViewById(R.id.myText);
        textView.setText("你好，世界！");

//        获取btn
        Button btn = findViewById(R.id.changeBtn);
//        设置点击事件
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                创建一个意图对象
                Intent intent = new Intent();
//                设置意图的动作：跳转：第一个参数：上下文对象，这里是MainActivity对象，但是由于此处匿名内部类的缘故，需要指定this
//                第二个参数：要跳转的目标Activity，传入的是一个Class对象
                intent.setClass(MainActivity.this, MyPageActivity.class);
//                启动意图
                startActivity(intent);
            }
            
        });
    }
}
```

然后你就完美的实现了一个跳转了



![image-20220509154859141](/images/Android/04-初探Android/image-20220509154859141.png)

![image-20220509154913184](/images/Android/04-初探Android/image-20220509154913184.png)

## 补充-更方便的创建Activity的方法

刚刚那样创建Activity太麻烦，要手动创建贼多文件，所以一般情况下可以通过这种方式来创建Activity

![image-20220509155111752](/images/Android/04-初探Android/image-20220509155111752.png)

它将会自动给你创建xml，类，和在声明文件中声明（当然不一定要在layout那点，在java那点也可）

# 简单控件

首先我们新建一个Android Module

![image-20220509160214688](/images/Android/04-初探Android/image-20220509160214688.png)

## 文本控件

> 设置文本内容有两种方式
>
> - 方式1
>
> > ```xml
> > <TextView
> >   android:text="Hello World!"
> >   // 或者
> >   android:text="@string/app_name"
> > />
> > ```
>
> - 方式2
>
> > ```java
> > public class MainActivity extends AppCompatActivity {
> > 
> >     @Override
> >     protected void onCreate(Bundle savedInstanceState) {
> >         super.onCreate(savedInstanceState);
> >         setContentView(R.layout.activity_main);
> >         // 通过findViewById方式动态修改
> >         TextView textView = findViewById(R.id.myText);
> >         textView.setText("Hello World");
> >     }
> > }
> > ```

当然，也可以按照这种方式来设置文本的大小

```java {9}
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TextView textView = findViewById(R.id.myText);
        textView.setText("Hello World");
        textView.setTextSize(50); // 注意 这里单位是sp
    }
}
```

也可以在xml中先设置好

```xml
<TextView
          android:id="@+id/myText"
          android:textSize="24sp"
          />
```

当然，对于这个之后会有更好的封装

### 补充-Android中关于尺寸单位的说明-Dp

首先我们要了解这几点内容

| 名称       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| px         | 图像元素，每个像素的大小并不固定，跟随屏幕大小和像素数量而变化 |
| Resolution | 分辨率，屏幕水平和垂直方向的像素数量，如果是1920*1080分辨率，那么就是竖着1920，横着1080 |
| Dpi        | 像素密度，屏幕上每英寸（2.54厘米）距离中有多少个像素点       |
| Density    | 密度，屏幕上每平方英寸（2.54^2）中含有像素点的数量           |
| Dip/dp     | 设备独立像素，也可以较多dp，长度单位，同一个单位在不同的设备上有不同的展现效果，具体公式如下 |

> 计算规则

这里以一个4.95英寸的1920*1080的手机为例

DPI：

1. 计算直角边的像素数量：1920^2+1080^2=2202^2（勾股定理）
2. 计算DPI：2202/4.95=445
3. 所以这个设备的DPI为445（每英寸的距离中有445个像素）

Density：

上方得到的DPI是445，那么这玩意是平方，所以：445^2=198025

DIP

所由显示到屏幕上的图像都是以px为单位，DIP是我们开发中使用的长度单位，最后它也要转换成px，计算这个设备上1dip等于多少px

> px = dip * dip / 160

根据转换关系：

320x480分辨率，3.6寸的手机，dpi为160,1dpi=1px

![image-20220509185512465](/images/Android/04-初探Android/image-20220509185512465.png)

也可以这样理解：在不同分辨率的手机上，通过dp来设置的尺寸比例是一致的

当然这也引出了屏幕适配方案：针对不同的屏幕进行一些动态的适配，当然这之后如果有遇上再说吧

### 补充-字体大小SP

跟DP的原理差不多，但它专门用来设置字体大小，手机在系统中可以调节字体大小（小，标准，大，超大），设置普通字体时，同数值SP和DP文字看起来一样大，但如果说设置为大字体时，DP还是依旧，而SP会动态变大

在Java代码中设置字体大小，默认是直接设置SP为单位的

```java
TextView textView = findViewById(R.id.myText);
textView.setText("Hello World");
textView.setTextSize(50);
```

源码

```java
public void setTextSize(float size) {
    setTextSize(TypedValue.COMPLEX_UNIT_SP, size);
}
```

### 设置文本的颜色

在Android中，我们有很多种方式来设置颜色

例如

> 直接在xml中配置(注意要传入那啥#开头的)

```xml {11}
    <TextView
            android:id="@+id/myText"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/app_name"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            android:textSize="24sp"
            android:textColor="#2C12C5"
    />
```

> 当然，也可以在资源文件中设置

首先打开values中的colors.xml文件

![image-20220603210354861](/images/Android/04-初探Android/image-20220603210354861.png)

然后额外输入如下内容

```xml {11}
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="purple_200">#FFBB86FC</color>
    <color name="purple_500">#FF6200EE</color>
    <color name="purple_700">#FF3700B3</color>
    <color name="teal_200">#FF03DAC5</color>
    <color name="teal_700">#FF018786</color>
    <color name="black">#FF000000</color>
    <color name="white">#FFFFFFFF</color>
<!--    上方都是默认自带的-->
    <color name="primary_color">#03A9F4</color>
</resources>
```

接着返回页面中调用`primary_color`

```xml {11}
<TextView
        android:id="@+id/myText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/app_name"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:textSize="24sp"
        android:textColor="@color/primary_color"
/>
```

>  接下来使用Java代码设置，Java设置相对来说更灵活些

```java {20-29}
package com.project.simplecontrols;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TextView textView = findViewById(R.id.myText);
        textView.setText("Hello World");
        textView.setTextSize(50);
        
        
        
//        设置成自带的颜色
        textView.setTextColor(Color.BLUE);
//        设置成自定义的颜色，例如#FF0000
        textView.setTextColor(Color.parseColor("#F0F0F0"));
//        或者rgb(255,0,0)
        textView.setTextColor(Color.rgb(255, 0, 0));
//        或者rgba(255,0,0,0.5)
        textView.setTextColor(Color.argb(255, 255, 0, 0));
//        也可以设置在xml中定义的颜色 注意 必须得是这种语法 不能直接传入id
        textView.setTextColor(getColor(R.color.primary_color));
        
        
    }
}
```

### 设置背景颜色

emm和设置文本颜色差不多

Java代码中

```java
textView.setBackground(getDrawable(R.drawable.ic_launcher_background));
//        当然官方还封装了直接传入id的方式
textView.setBackgroundResource(R.color.primary_color);
```

当然，也可以直接在xml中设置

```xml {11}
<TextView
          android:id="@+id/myText"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="@string/app_name"
          app:layout_constraintBottom_toBottomOf="parent"
          app:layout_constraintLeft_toLeftOf="parent"
          app:layout_constraintRight_toRightOf="parent"
          app:layout_constraintTop_toTopOf="parent"
          android:textSize="24sp"
          android:background="@color/primary_color"
          />
```

## 视图基础

### 设置视图的宽高

首先，在Android中我们看到的所有控件都可以称之为View

View的宽度可以通过属性android:layout_width来进行控制

View的高度可以通过属性android:layout_height来进行控制

他们都可以传入三种类型的属性

- match_parent:表示和上级视图保持一致（父节点的尺寸咋样，它就咋样）
- wrap_context:表示和自身内容自适应
- 传入**以dp为单位**的具体尺寸（也可以传入其他的，不过通常只建议用dp）

![image-20220603212012938](/images/Android/04-初探Android/image-20220603212012938.png)

当然，我们可以在Java中获取其的布局参数（包含宽高），并且动态修改其值

先总结下方代码的公式

```text
获取到的宽高转换成dp
int px = (int) width  / getApplicationContext().getResources().getDisplayMetrics().density + 0.5;

dp的宽高转换成px
int dp = (int) width * getApplicationContext().getResources().getDisplayMetrics().density + 0.5;


```

再上代码

```java
package com.project.simplecontrols;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TextView textView = findViewById(R.id.myText);
        ViewGroup.LayoutParams layoutParams = textView.getLayoutParams();
//        这里获取到的宽高是像素值（px）
        Log.d("MyApplication", "layoutParams.width = " + layoutParams.width);
        Log.d("MyApplication", "layoutParams.height = " + layoutParams.height);

//        想转换成dp,需要先获取当前手机的密度
//        首先获取上下文对象
        Context context = getApplicationContext();

//        获取当前手机的像素密度（1个dp对应几个px） 这里一般获取到的是例如1.5，1.0，0.75，2.5等等
        float density = context.getResources().getDisplayMetrics().density;

//        所以直接相乘然后四舍五入就可以了
        int w = (int) (layoutParams.width / density + 0.5f);
        Log.d("MyApplication", "width dp = " + w);
        int h = (int) (layoutParams.height / density + 0.5f);
        Log.d("MyApplication", "height dp = " + h);

//        当然，我们要给其设置的话同理，它只能接收px，所以需要先将自己的dp转换成px
//        例如 我想设置宽为100dp,高为50dp
        int myWidth = (int) (100 * density + 0.5f);
        int myHeight = (int) (50 * density + 0.5f);
        ViewGroup.LayoutParams myLayoutParams = textView.getLayoutParams();
        myLayoutParams.width = myWidth;
        myLayoutParams.height = myHeight;
//        设置回去（这里可以省略，因为上一步获取的myLayoutParams实际上是跟其绑定的，无需重新set，如果是新new的ViewGroup.LayoutParams，才需要set）
        textView.setLayoutParams(myLayoutParams);
//        打印
        Log.d("MyApplication", "myLayoutParams.width = " + myLayoutParams.width);
        Log.d("MyApplication", "myLayoutParams.height = " + myLayoutParams.height);
//        打印手机像素比
        Log.d("MyApplication", "density = " + density);

    }
}
```

### 获取和设置内外边距

这个和Html差不多的设置意思（内外边距）

> XML设置

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--    最外层：背景：蓝色，orientation：垂直-->
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity"
        android:background="#2196F3"
        android:orientation="vertical"
>

    <!--    中层的背景为黄色 外边距为20dp 内边距为40dp -->
    <LinearLayout
            android:id="@+id/centerLayout"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="#FFEB3B"
            android:layout_margin="20dp"
            android:padding="40dp"
    >

<!--        最里面的红色-->
        <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:background="#FF0000"

        >
        </LinearLayout>

    </LinearLayout>


</LinearLayout>
```

效果如下

![image-20220603215830849](/images/Android/04-初探Android/image-20220603215830849.png)

接着Java获取，Java的设置这里就不说明了，把除号换成乘号就能把dp转换为px

```java
package com.project.simplecontrols;

import android.os.Bundle;
import android.util.Log;
import android.widget.LinearLayout;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private static String LogTag = "MyApplication";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        get view
        LinearLayout textView = findViewById(R.id.centerLayout);
//        获取layout
        LinearLayout.LayoutParams layoutParams = (LinearLayout.LayoutParams) textView.getLayoutParams();
//        获取margin 这里和之前获取width之类的是一样的，获取到的都是px单位的尺寸
        float density = getApplicationContext().getResources().getDisplayMetrics().density;
        Log.d(LogTag, "marginLeft(px):" + layoutParams.leftMargin + "; marginLeft(dp):" + (layoutParams.leftMargin / density));
        Log.d(LogTag, "marginRight(px):" + layoutParams.rightMargin + "; marginRight(dp):" + (layoutParams.rightMargin / density));
        Log.d(LogTag, "marginTop(px):" + layoutParams.topMargin + "; marginTop(dp):" + (layoutParams.topMargin / density));
        Log.d(LogTag, "marginBottom(px):" + layoutParams.bottomMargin + "; marginBottom(dp):" + (layoutParams.bottomMargin / density));

        Log.d(LogTag,"分割线==========================================================");

//        获取padding 同理
        Log.d(LogTag, "paddingLeft(px):" + textView.getPaddingLeft() + "; paddingLeft(dp):" + (textView.getPaddingLeft() / density));
        Log.d(LogTag, "paddingRight(px):" + textView.getPaddingRight() + "; paddingRight(dp):" + (textView.getPaddingRight() / density));
        Log.d(LogTag, "paddingTop(px):" + textView.getPaddingTop() + "; paddingTop(dp):" + (textView.getPaddingTop() / density));
        Log.d(LogTag, "paddingBottom(px):" + textView.getPaddingBottom() + "; paddingBottom(dp):" + (textView.getPaddingBottom() / density));


    }
}
```

获取结果

```text
 D/MyApplication: marginLeft(px):55; marginLeft(dp):20.0
 D/MyApplication: marginRight(px):55; marginRight(dp):20.0
 D/MyApplication: marginTop(px):55; marginTop(dp):20.0
 D/MyApplication: marginBottom(px):55; marginBottom(dp):20.0
 D/MyApplication: 分割线==========================================================
 D/MyApplication: paddingLeft(px):110; paddingLeft(dp):40.0
 D/MyApplication: paddingRight(px):110; paddingRight(dp):40.0
 D/MyApplication: paddingTop(px):110; paddingTop(dp):40.0
 D/MyApplication: paddingBottom(px):110; paddingBottom(dp):40.0
```

### 视图的对其方式

有两种途径

- 采用`layout_gravity`属性，它指定了当前视图相对于上级视图的对其方式
  - 也就是在父级的那个方向，例如父级的中间
- 采用`gravity`，它指定了下级视图对于当前视图的对其方式
  - 也就是让子级来对自己进行居中对其之类的

他们两的取值范围

- left
- top
- right
- bottom
- center 

当然，还可以通过`|`符来级联取值，例如`layout_gravity="left|top"`表示靠在父级的左上

设置话比较简单，例如

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--    最外层：背景：蓝色，orientation：垂直-->
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity"
        android:background="#2196F3"
        android:orientation="horizontal"
>

    <LinearLayout
            android:id="@+id/centerLayout"
            android:layout_width="300dp"
            android:layout_height="245dp"
            android:background="#FFEB3B"
            android:layout_margin="20dp"
            android:orientation="vertical"
            android:layout_gravity="bottom"
            android:gravity="right"
    >
        <LinearLayout
                android:id="@+id/aaa"
                android:layout_width="60dp"
                android:layout_height="40dp"
                android:background="#FF5722"
                android:layout_margin="10dp"
                android:orientation="horizontal"/>

    </LinearLayout>



</LinearLayout>
```

效果

![image-20220603221326552](/images/Android/04-初探Android/image-20220603221326552.png)

这玩意一般都不会在java中设置（貌似也设置不明白）

```java
package com.project.simplecontrols;

import android.os.Bundle;
import android.util.Log;
import android.widget.LinearLayout;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private static String LogTag = "MyApplication";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        get view
        LinearLayout textView = findViewById(R.id.centerLayout);
//        获取layout
        LinearLayout.LayoutParams layoutParams = (LinearLayout.LayoutParams) textView.getLayoutParams();
//        获取gravity
        int gravity = layoutParams.gravity;
//        打印
        Log.d(LogTag, "gravity = " + gravity);
        layoutParams.gravity = 0;
    }
}
```

我这里获取到的是80（黄色），然后设置成0~70之后它就跑上面去了，设置为80+才会跑回下面，有点怪

## 常用布局

### 线性布局-LineLayout

这个平常应该是用的最多的，然后它主要是有个`orientation`属性可以指定布局的方向

不设置的话默认是`horizontal`横向排列，也可以换成`vertical`竖向排列

因为用的比较多，这里就不演示了

![image-20220603223058766](/images/Android/04-初探Android/image-20220603223058766.png)

### 相对布局-RelativeLayout 

据说这个在实际开发中用的比较多

![image-20220603223920625](/images/Android/04-初探Android/image-20220603223920625.png)

然后其属性有如下这么多

![image-20220603224015993](/images/Android/04-初探Android/image-20220603224015993.png)

先上代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".RelativeLayoutActivity">

<!--    下方演示相对于父控件的对其，使用带Parent的即可 如果不带的话则是指顶对其某个控件的某个位置-->

    <TextView
            android:id="@+id/textCenter"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="我应该在父级的正中间"
            android:layout_centerInParent="true"
            android:layout_margin="10dp"
    />
    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="左上对其"
            android:layout_alignParentLeft="true"
    />
    <!--    右下的话 用两个 一个bottom， 一个 right  即可，左下同理-->
    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="右下对其"
            android:layout_alignParentBottom="true"
            android:layout_alignParentEnd="true"
    />

<!--    对其特定的view-->

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="应该在中间的下面"
            android:layout_centerHorizontal="true"
            android:layout_below="@+id/textCenter"
    />

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="中间的左一点点"
            android:layout_toStartOf="@+id/textCenter"
            android:layout_alignTop="@+id/textCenter"
    />

</RelativeLayout>
```

效果

![image-20220603230158203](/images/Android/04-初探Android/image-20220603230158203.png)

### 网格布局-GridLayout

和html中的grid差不多（虽然我从来没在html中用过grid布局…）

![image-20220603230425167](/images/Android/04-初探Android/image-20220603230425167.png)



### 滚动视图ScrollView

这个在实际的开发中非常常用，比如说做无限滚动的效果（bilibili 手机端的视频页面，动态页面等）

![image-20220604121610713](/images/Android/04-初探Android/image-20220604121610713.png)

先看代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".ScrollViewActivity"
        android:orientation="vertical"
        >

    <HorizontalScrollView
            android:layout_width="wrap_content" android:layout_height="200dp"
            >

        <LinearLayout
                android:layout_width="wrap_content" android:layout_height="match_parent"
                android:orientation="horizontal">

            <View
                    android:layout_width="300dp" android:layout_height="match_parent"
                    android:background="@color/primary_color"
                    />

            <View
                    android:layout_width="300dp" android:layout_height="match_parent"
                    android:background="@color/black"
                    />

        </LinearLayout>

    </HorizontalScrollView>


</LinearLayout>
```

效果

![image-20220604123124525](/images/Android/04-初探Android/image-20220604123124525.png)

可以看到，有一个边边上的东西是可以滚动的

当然，竖向同理

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".ScrollViewActivity"
        android:orientation="vertical"
        >

    <ScrollView
            android:layout_width="match_parent" android:layout_height="match_parent"
            >

        <LinearLayout
                android:layout_width="match_parent" android:layout_height="wrap_content"
                android:orientation="vertical">

            <View
                    android:layout_width="match_parent" android:layout_height="600dp"
                    android:background="@color/primary_color"
                    />

            <View
                    android:layout_width="match_parent" android:layout_height="600dp"
                    android:background="@color/black"
                    />

        </LinearLayout>

    </ScrollView>


</LinearLayout>
```

效果

![image-20220604123524855](/images/Android/04-初探Android/image-20220604123524855.png)

## 按钮触控

### 按钮控件-Button

这玩意是由TextView派生而来，他们之间的区别有

- Button拥有默认的按钮背景，而Text View没有
- Button内部文本默认居中对齐，而TextView的内部文本默认内部居左对齐
- Button会默认将字母转换为大写，TextView则不会这样做

和TextView相比，Button新增了两个属性

- textAllCaps属性，调整是否需要转换全大写（默认true）
- onClick属性，指定点击的时候要调用哪个方法（现在不太推荐）

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".ButtonStyleActivity"
        android:padding="10dp"
        android:orientation="vertical"
        >

    <TextView
            android:id="@+id/textView1"
            android:layout_width="match_parent" android:layout_height="wrap_content"
            android:textColor="@color/black" android:text="hello world"
            android:gravity="center"
            />

    <Button
            android:id="@+id/button1"
            android:layout_width="match_parent" android:layout_height="wrap_content"
            android:textColor="@color/black" android:text="hello world"
            android:textAllCaps="false"
            android:onClick="myClick"
            />


</LinearLayout>
```

然后点击函数的书写（卧槽 这里用kotlin贼舒服）

```kotlin
package com.project.simplecontrols

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import android.widget.Toast
import com.project.simplecontrols.util.PublicConst

class ButtonStyleActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_button_style)
//        通常情况下监听click事件的callback
        findViewById<TextView>(R.id.textView1).setOnClickListener {
            Toast.makeText(this, "TextView1", Toast.LENGTH_SHORT).show()
        }
    }

    //    直接在xml中定义的callback
//    这里效率更低
//    每点击一次按钮，就会findViewById一次，并重复绑定同一个函数
    fun myClick(view: View) {
        Log.d(PublicConst.TAG, "Button clicked")
        Toast.makeText(this, "Button clicked", Toast.LENGTH_SHORT).show()
    }
}

```

或者点击按钮的时候，让文本内容变成其他的

工具类，获取时间

```kotlin
package com.project.simplecontrols.util

import android.annotation.SuppressLint
import java.text.SimpleDateFormat
import java.util.*

class PublicConst {
    companion object {
        const val TAG = "MyApplication"

        @SuppressLint("SimpleDateFormat")
        fun getNowDateTime(format: String?): String {
            val date = Date()
            val sdf: SimpleDateFormat = if (format == null) {
                SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
            } else {
                SimpleDateFormat(format)
            }
            return sdf.format(date)
        }
    }


}
```

然后调用类

```kotlin
package com.project.simplecontrols

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import android.widget.Toast
import com.project.simplecontrols.util.PublicConst

class ButtonStyleActivity : AppCompatActivity() {


    lateinit var textView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_button_style)
//        通常情况下监听click事件的callback
        textView = findViewById(R.id.textView1)
        textView.setOnClickListener {
            Toast.makeText(this, "TextView1", Toast.LENGTH_SHORT).show()
        }
    }

    //    直接在xml中定义的callback
//    这里效率更低
//    每点击一次按钮，就会findViewById一次，并重复绑定同一个函数
    fun myClick(view: View) {
        Log.d(PublicConst.TAG, "Button clicked")
        Toast.makeText(this, "Button clicked", Toast.LENGTH_SHORT).show()
        // textView会在onCreate的时候赋值，所以这里是一定有内容的
        textView.text = PublicConst.getNowDateTime(null)
    }
}

```

### 点击和长按事件

有两种常用的，分别是点击和长按，统一推荐是用代码的方式来添加，而不是在XML中指定方法

- 点击监听：setOnClickListener，返回值void，按住时间少于500ms触发
- 长按监听：setOnLongClickListener，返回值boolean，按住时间大于500ms触发

之前已经看过点击了，这里来个长按

```kotlin
package com.project.simplecontrols

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast

class ButtonStyleActivity : AppCompatActivity() {


    lateinit var textView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_button_style)
        textView = findViewById(R.id.textView1)

//        需要返回一个boolean值，true代表点击事件被消费，false代表点击事件未被消费
        textView.setOnLongClickListener {
            Toast.makeText(this, "文本长按", Toast.LENGTH_SHORT).show()
            true
        }

        findViewById<Button>(R.id.button1).setOnLongClickListener {
            Toast.makeText(this, "按钮长按", Toast.LENGTH_SHORT).show()
            false
        }
    }
}
```

> 关于消费与否，实际上就是一个冒泡的传递
>
> 如果说父控件也有一个长按事件，这里返回false的时候，父控件的长按也会被触发
>
> 如果返回true，则父控件的长按事件不会被触发

### 禁用和恢复按钮

按钮通常有可用和不可用状态

- 不可用状态下，点击按钮无反应，同时按钮变成灰色

要切换状态的话，只需要控制enabled属性即可，属性为true的时候，表示允许点击，为false的时候表示不允许点击

![image-20220604150558497](/images/Android/04-初探Android/image-20220604150558497.png)

或者代码控制isEnabled属性即可

```kotlin
package com.project.simplecontrols

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.Toast

class ButtonStyleActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_button_style)


        findViewById<Button>(R.id.button1).setOnLongClickListener {
            Toast.makeText(this, "按钮长按", Toast.LENGTH_SHORT).show()
            it.isEnabled = false
            true
        }
    }

}
```

## 图像显示

### ImageView

图像视图的图片通常位于`res/drawable`目录下，设置图像显示图片有两种方式

- 在XML文件中，通过属性`android:src`设置图片资源，属性格式`@drawable/不包含扩展名的图片名称`
- 在Java/Kt代码中，调用setImageResource方法设置图片资源，参数格式`R.drawable.不包含扩展名的图片名称`

首先把图片丢进来

![image-20220604151440069](/images/Android/04-初探Android/image-20220604151440069.png)

然后记得给图片重命名，重命名方式为下划线命名，最好不要包含数值，例如重命名成`my_image.jpg`之类的

然后调用

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".ImageViewActivity"
        android:orientation="vertical"
        >
    <ImageView
            android:layout_width="match_parent"
            android:layout_height="220dp"
            android:src="@drawable/my_image"
/>

</LinearLayout>
```

效果

![image-20220604151843452](/images/Android/04-初探Android/image-20220604151843452.png)

### 图像视图的缩放类型

图片默认是居中显示的，若要改变图片的显示方式，则可以通过`scaleType`属性设置，取值如下

![image-20220604152055809](/images/Android/04-初探Android/image-20220604152055809.png)

例如

![image-20220604152129557](/images/Android/04-初探Android/image-20220604152129557.png)

或者代码修改

```kotlin
package com.project.simplecontrols

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageView

class ImageViewActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_image_view)
        val image = findViewById<ImageView>(R.id.myimageView)
        image.setImageResource(R.drawable.my_image)
        image.scaleType = ImageView.ScaleType.CENTER_CROP
    }
}
```

### 图像按钮ImageButton

- ImageButton是显示图片的图片按钮，继承自ImageView
- ImageButton和Button的区别如下
  - Button既可以显示文本也可以显示图片（background属性），ImageButton只能显示图片不能输出文本
  - ImageButton上的图像可以按照比例缩放，而Button通过背景设置的图像会拉升变形
  - Buttong只能靠背景显示一张图片，而ImageButton可以分别在前景和背景显示图片，从而实现两张图片叠加的效果
  - ImageButton有默认的按钮背景（灰色），ImageView没有默认背景
  - ImageButton的默认缩放类型为center，而ImageView的默认缩放类型为fitCenter

常见的场景例如Bilibili、Youtube、等软件的视频封面

例子：

默认背景

![image-20220604154220781](/images/Android/04-初探Android/image-20220604154220781.png)

使用自定义背景

![image-20220604154212409](/images/Android/04-初探Android/image-20220604154212409.png)

::: tip

注意 即使你的background设定为白色之类的和背景契合的颜色，点击背景的时候依旧会触发点击事件

:::

代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".ImageViewActivity"
        android:orientation="vertical"
        >

    <ImageButton
            android:id="@+id/my_image_view"
            android:layout_width="match_parent"
            android:layout_height="220dp"
            android:src="@drawable/my_image"
            android:scaleType="fitCenter"
            android:background="#ff0000"
            />

</LinearLayout>
```

### 同时展示文本和图像

![image-20220604154416771](/images/Android/04-初探Android/image-20220604154416771.png)

首先我们使用Button来进行设置下

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".ImageViewActivity"
        android:orientation="vertical"
        android:gravity="center"
        >

    <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="图标在左边"
            android:drawableLeft="@drawable/abc_vector_test"
            android:layout_gravity="center"

            />
</LinearLayout>
```

效果

![image-20220604154917066](/images/Android/04-初探Android/image-20220604154917066.png)

可以发现按钮背景是紫色的，同时我们还无法通过background来修改颜色

![image-20220604154949519](/images/Android/04-初探Android/image-20220604154949519.png)

这是因为项目整体主题的缘故，接下来说说如何解决这个问题

### 无法修改按钮的背景颜色解决方案

首先进入到这个文件内

![image-20220604155525124](/images/Android/04-初探Android/image-20220604155525124.png)

原先是这样的

```xml
<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base application theme. -->
    <style name="Theme.HelloWorld" parent="Theme.MaterialComponents.DayNight.DarkActionBar">
        <!-- Primary brand color. -->
        <item name="colorPrimary">@color/purple_500</item>
        <item name="colorPrimaryVariant">@color/purple_700</item>
        <item name="colorOnPrimary">@color/white</item>
        <!-- Secondary brand color. -->
        <item name="colorSecondary">@color/teal_200</item>
        <item name="colorSecondaryVariant">@color/teal_700</item>
        <item name="colorOnSecondary">@color/black</item>
        <!-- Status bar color. -->
        <item name="android:statusBarColor" tools:targetApi="l">?attr/colorPrimaryVariant</item>
        <!-- Customize your theme here. -->
    </style>
</resources>
```

它是继承自一个主题`Theme.MaterialComponents.DayNight.DarkActionBar`

我们只需要修改下继承的主题即可解决那个问题

`Theme.MaterialComponents.DayNight.DarkActionBar.Bridge`

```xml
<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base application theme. -->
    <style name="Theme.HelloWorld" parent="Theme.MaterialComponents.DayNight.DarkActionBar.Bridge">
        <!-- Primary brand color. -->
        <item name="colorPrimary">@color/purple_500</item>
        <item name="colorPrimaryVariant">@color/purple_700</item>
        <item name="colorOnPrimary">@color/white</item>
        <!-- Secondary brand color. -->
        <item name="colorSecondary">@color/teal_200</item>
        <item name="colorSecondaryVariant">@color/teal_700</item>
        <item name="colorOnSecondary">@color/black</item>
        <!-- Status bar color. -->
        <item name="android:statusBarColor" tools:targetApi="l">?attr/colorPrimaryVariant</item>
        <!-- Customize your theme here. -->
    </style>
</resources>
```

回到按钮，发现背景色被正确的更改了

![image-20220604155702523](/images/Android/04-初探Android/image-20220604155702523.png)

当然，如何自定义描边这个之后会说明

