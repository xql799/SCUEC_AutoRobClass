# 游览器控制台实现自动抢课
通过Chrome，Microsoft Edge游览器的DevTools实现SCUEC选课系统的自动抢课

为了减少错误，建议大家看看选课的大概原理
## 选课原理大概
![选课](https://img-blog.csdnimg.cn/20210228011934128.png)

## 自动抢课的实现原理
选课的最重要的一步是**向选课系统发送特定的请求**
每次点击"选课"按钮并确定后便会发送一次选课请求

发送特定的请求可以理解为访问**特定的地址**，如下图：
![选课成功](https://img-blog.csdnimg.cn/20210227225441989.png)
![选课失败](https://img-blog.csdnimg.cn/20210227225547523.png)
因此可通过下段JS代码实现自动抢课（courseList按照格式里更改为自己的课程）

```
//以下按照格式补充自己的课程
coursesList = [
    {
        "name": "英语国家社会与文化",     //自行填写课程
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=2020-2021-220W10000151805&glJxbid="   //下文有介绍地址如何获取
    },
    {
        "name": "学术英语阅读与写作",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=2020-2021-220W10000101803&glJxbid="
    }
]

//定义抢课函数
function rob() {
    //解析课程
    courses = new Array(coursesList.length)
    for (let index in coursesList) {
        courses[index] = {
            'name'    : coursesList[index].name,
            'url'     : coursesList[index].url,
            'request' : new XMLHttpRequest(),
            'robEvent': null
        }
    }

    //注册抢课事件
    for (let index in courses) {
        courses.robEvent = setInterval(
            function () {
                courses
                courses[index].request.open("GET", courses[index].url, true)
                courses[index].request.send()
                courses[index].request.onreadystatechange = function() {
                    if (courses[index].request.readyState == 4 && courses[index].request.status == 200) {
                        console.log(courses[index].name + courses[index].request.responseText)
                        if(courses[index].request.responseText.success = 'True') {
                            clearInterval(courses[index].robEvent); //取消抢课事件
                        }
                    }
                }
            },
            1000    //此处为每一门选课的选课周期 4000为4s
        )
    }
    return '开始执行抢课'
}
```

### 脚本的执行
**登陆选课之后**在任意的页面按下F12打开DevTools **（注意游览器关闭后需要重新登陆选课系统）**
![DevTools内执行代码](https://img-blog.csdnimg.cn/20210227231651418.png)

下图为效果图：

![效果图](https://img-blog.csdnimg.cn/20210227233712876.png)

## 请求地址的获取

先分析一下**推荐选课**的请求地址,例如

> http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221110001461804&glJxbid=

可拆解为以下几个部分

- *http:///xk.scuec.edu.cn/xsxk/xkOper.xk*
- *method=**handleTjxk***
- *jxbid=**20202021221110001461804***
- *glJxbid=*

改为自己需要的 **method** 和 **jxbid** 便可拼接出需要的请求地址

下图为可能出现的 **method(方法)** 和 **jxbid之类的参数**
|method|对应选课|所需参数|
|---|----|----|
|handleTjxk|推荐选课|jxbid glJxbid|
|handleBfakc|方案内选课|jxbid glJxbid|
|handleKzyxk|方案外选课|jxbid glJxbid|
|handleCxxk|重修选课|jxbid glJxbid|
|handleTyxk(暂未测试)|体育选择选课|jxbid(暂未测试)|
|handleQxgxk|通识课程选修|jxbid glJxbid xkzy (**注意：补选时不需要xkzy**)|
|handleCxcy|创新创业类选课|jxbid|
|getGljxb|获得关联班信息|jxbid (**可通过此method获得glJxbid的信息**)|

下图为出现的参数代表的意义
|参数名|意义|备注|
|---|----|----|
|jxbid|教学班ID|每个课程都有一个ID|
|glJxbid|关联教学班ID|若非关联班则值为'空'|
|xkzy|志愿等级|*这个应该用不上*|

### jxbid 的获取
![jxbid1](https://img-blog.csdnimg.cn/20210228004616359.png)
![jxbid2](https://img-blog.csdnimg.cn/20210228004616292.png)

### glJxbid 的获取

#### 方法①

**适用于在选课未开始时，提前查看关联课信息**

分析一下 **获取关联课表格** 时的请求
> http://xk.scuec.edu.cn/xsxk/loadData.xk?method=getGljxb&jxbid=20202021220610003861801

- *http:///xk.scuec.edu.cn/xsxk/loadData.xk*
- *method=**getGljxb***
- *jxbid=**20202021220610003861801***

将jxbid改换后，访问地址可以获取关联班信息，如图：

![glJxbid](https://img-blog.csdnimg.cn/20210228004616139.png)

**重要的数据：**

![glJxbid](https://img-blog.csdnimg.cn/20210228005816447.png)

**实际图关联课表对比**

![glJxbid](https://img-blog.csdnimg.cn/20210228005816358.png)

#### 方法②

**类似jxbid的获取，但一般用不上**

![glJxbid](https://img-blog.csdnimg.cn/20210228010844528.png)



### 检验自己写的请求地址是否正确的方法
![check](https://img-blog.csdnimg.cn/20210228011436953.png)

**PS：选课开始之前可以通过这个方法检验URL是否正确**


### 最后

希望大家能选上最想要的课

有问题欢迎来联系我

<img src="https://i.pinimg.com/originals/5c/10/6e/5c106e7f7095aef477091236a41d3d57.png" width = "30%">