# 游览器控制台实现自动抢课
## 选课原理大概
<img src="https://github.com/9cats/robclass/blob/master/images/common.png?raw=true" width="100%">
## 上代码(示例代码)
```
//准备选的课程
myClass = [
    {
        "name": "英语",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=2020-2021-220W10000091313&glJxbid=",
        "request": new XMLHttpRequest()
    },
    {
        "name": "大数据",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221110001541802&glJxbid=202020212211100015418S01",
        "request": new XMLHttpRequest()
    },
    {
        "name": "工程电磁",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221110001161802&glJxbid=",
        "request": new XMLHttpRequest()
    },
    {
        "name": "数电",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221110001461804&glJxbid=",
        "request": new XMLHttpRequest()
    },
    {
        "name": "高频电子",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221110001581803&glJxbid=202020212211100015818S01",
        "request": new XMLHttpRequest()
    },
    {
        "name": "信号与系统",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221110200431304&glJxbid=202020212211102004313S01",
        "request": new XMLHttpRequest()
    },
    {
        "name": "数电实验",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221111001471805&glJxbid=",
        "request": new XMLHttpRequest()
    },
    {
        "name": "马原",
        "url": "http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221710001231820&glJxbid=",
        "request": new XMLHttpRequest()
    }
]


//这个函数表示定时解释某些代码
function Rob(oneClass) {
    setInterval(function () {
        {
            oneClass.request.open("GET", oneClass.url, true);
            oneClass.request.send();
            oneClass.request.onreadystatechange = function () {
                if (oneClass.request.readyState == 4 && oneClass.request.status == 200) {
                    console.log(oneClass.name + oneClass.request.responseText);
                }
            }
        }
    }, 4000)//4000可理解为4s执行一次（实际上是4s放入栈区）
}


//同时抢所有课程
function RobAll() {
    for (i in myClass) {
        Rob(myClass[i]);
    }
}
```
###在哪执行代码?
在选课系统的页面按下F12（Chrome 和 Microsoft Edge均可）
<img src="https://github.com/9cats/robclass/blob/master/images/console.png?raw=true" width="100%">
效果图如下
<img src="https://github.com/9cats/robclass/blob/master/images/result.png?raw=true" width="100%">

##请求地址如何获取？
先看一下普通选课的请求地址,例如：（不适与公选课和创新课）
http://xk.scuec.edu.cn/xsxk/xkOper.xk?method=handleTjxk&jxbid=20202021221110001461804&glJxbid=
<img src="https://github.com/9cats/robclass/blob/master/images/url1.png?raw=true" width="100%">
以下列出可能出现的参数
method-选课方式
jxbid-----课程号
glJxbid--关联课号
(xkzy----志愿等级)(公选课志愿等级)
##### jxbid 的获取
<img src="https://github.com/9cats/robclass/blob/master/images/jxbid1.png?raw=true" width="100%">
<img src="https://github.com/9cats/robclass/blob/master/images/jxbid2.png?raw=true" width="100%">
##### glJxbid 的获取
由于我把有关联课的课都选完了，目前不太好展示
以下为我在开始选课之前获取关联课列表的方案
1.用fidder全局代理游览器
2.
<img src="https://github.com/9cats/robclass/blob/master/images/gl1.png?raw=true" width="100%">
3.同获取jxbid的方法获取glJxbid(那个函数有两个参数，前面一个为jxbid,后面一个为glJxbid)
下图为我在选课开始之前打开的关联课界面(选课在12/8 13:00开始)
<img src="https://github.com/9cats/robclass/blob/master/images/gl2.png?raw=true" width="100%">
###注意
一般选课(推荐选课，方案内，方案外，体育)的method为:handleTjxk
公选课为:handleQxgxk   (注意后面还有一个xkzy(第几志愿)参数)
创新课为:handleCxcy

###检验自己写的请求地址是否正确的方法
