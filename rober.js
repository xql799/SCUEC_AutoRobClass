var timer = 500;
box = window.frames[0];
Tjxk = window.frames[0][0];
xkJxbList = Tjxk.xkJxbList;
var robConsole = $(`<div id='robConsole'></div>`);
$("body").append(robConsole);
$("#robConsole").css({
    "margin-top": "10px",
    "display": "flex",
    "flex-direction": "column",
    "font-size": "8px",
    "position": "fixed",
    "top": "0",
    "left": "0",
    "width": "560px"
});

function addRob(jxbid, glJxbid) {
    JxbObj = top.xkJxbList[jxbid];
    //判断是否有关联班
    if ("undefined" == typeof glJxbid) {
        //判断是否注册抢课事件
        if ("undefined" == typeof JxbObj.robEvent) {

            //robInfo——显示的信息
            JxbObj.robInfo = $("<div class='CC' id=CO" + jxbid + "></div>");
            JxbObj.robInfo.css({
                "margin": "10px",
                "color": "red",
                "border": "1px solid",
                "width": "560px",
                "background-color": "black"
            });
            JxbObj.robInfo.click(function () {
                clearInterval(JxbObj.robEvent);
                JxbObj.robEvent = undefined;
                JxbObj.robInfo.remove();
            })
            robConsole.append(JxbObj.robInfo);

            //robEvent——抢课事件
            JxbObj.robEvent = setInterval(() => {
                $.ajax({
                    type: "POST",
                    url: "http://xk.scuec.edu.cn/xsxk/xkOper.xk",
                    async: true, // 异步请求
                    data: {
                        method: 'handleTjxk',
                        jxbid: jxbid,
                        glJxbid: glJxbid
                    },
                    datatype: "json",
                    success: function (data) {
                        //TODO:更多信息
                        JxbObj.robInfo[0].innerText = "课程号:" + JxbObj.jxbid + "课程名:" + JxbObj.kcm + "抢课结果:" + data;
                    }
                })
            }, timer)
        }
        //没有关联班的情况
    } else {
        if ("undefined" == typeof JxbObj.robEvents) {
            JxbObj.robEvents = [];
            JxbObj.robInfos = [];
        }

        //未注册抢课则开始注册
        if ("undefined" == typeof JxbObj.robEvents[glJxbid]) {

            //robInfo——显示的信息
            JxbObj.robInfos[glJxbid] = $("<div class='CC' id=CO" + jxbid + "></div>");
            JxbObj.robInfos[glJxbid].css({
                "margin": "10px",
                "color": "red",
                "border": "1px solid",
                "width": "560px",
                "background-color": "black"
            });
            JxbObj.robInfos[glJxbid].click(function () {
                clearInterval(JxbObj.robEvent);
                JxbObj.robEvent = undefined;
                JxbObj.robInfo.remove();
            })
            robConsole.append(JxbObj.robInfos[glJxbid]);

            //robEvent——抢课事件
            JxbObj.robEvents[glJxbid] = setInterval(() => {
                $.ajax({
                    type: "POST",
                    url: "http://xk.scuec.edu.cn/xsxk/xkOper.xk",
                    async: true, // 异步请求
                    data: {
                        method: 'handleTjxk',
                        jxbid: jxbid,
                        glJxbid: glJxbid
                    },
                    datatype: "json",
                    success: function (data) {
                        //TODO:更多信息
                        JxbObj.robInfos[glJxbid][0].innerText = "课程号:" + JxbObj.jxbid + "课程名:" + JxbObj.kcm + "抢课结果:" + data;
                    }
                })
            }, timer)
        }
    }
}

box.getGljxbData = function (zJxbid) {
    var datas = eval("(" + $.ajax({
        url: "loadData.xk?method=getGljxb",
        data: {
            jxbid: zJxbid
        },
        async: false
    }).responseText + ")");
    if (datas == null || datas == "") return "";
    var xklcObj = top.xklcObjMap[top.xkLcbh],
        arr = new Array();
    for (var seq = 0; seq < datas.length; seq++) {
        var ysbObj = datas[seq];
        box.createGljxbList(ysbObj);
        var pkxxList = $.parseJSON(ysbObj.pkxx),
            sksjTxt = "",
            skddTxt = "";
        for (var yxIndex in pkxxList) {
            var pkxxObj = pkxxList[yxIndex];
            if (sksjTxt != "") sksjTxt += "<br>";
            if (pkxxObj.skxq != null && pkxxObj.skxq != "" && pkxxObj.ksjc != null && pkxxObj.ksjc != "" && pkxxObj.jsjc != null && pkxxObj.jsjc != "") sksjTxt += top.xqObjMap[pkxxObj.skxq] + " " + top.jcObjMap[pkxxObj.ksjc].jcmc + "-" + top.jcObjMap[pkxxObj.jsjc].jcmc + " " + " " + pkxxObj.zcmc + " ";
            if (skddTxt != "") skddTxt += "<br>";
            skddTxt += pkxxObj.jsmc
        }
        if (sksjTxt == "") sksjTxt = "&nbsp;";
        if (skddTxt == "") skddTxt = "&nbsp;";
        var vXkrs = ysbObj.krl + "/" + ysbObj.xkrs;
        if (xklcObj.xkmsdm != "01" && parseInt(ysbObj.xkrs) >= parseInt(ysbObj.krl)) vXkrs = "\u5df2\u6ee1";
        var vCtxx = "",
            ctMsg = box.getConflictMsg(ysbObj);
        if (ctMsg != null && ctMsg != "") {
            box.glJxbXkctList[ysbObj.jxbid] = ctMsg;
            vCtxx = "\u51b2\u7a81\uff1a" + "<a id=\"" + ysbObj.jxbid + "_ctMsg\" rel=\"power\" msg=\"" + ctMsg + "\" href=\"##\">\u67e5\u770b</a>"
        }
        var vXksm = vCtxx;
        if (ysbObj.sfxzxb == "1") {
            if (vXksm != "") vXksm += "<br>";
            vXksm += "\u9650\u5236\u9009\u8bfe\uff1a\u7537" + ysbObj.nsrs + "\u4eba\uff0c\u5973" + ysbObj.nvsrs + "\u4eba"
        }
        if (ysbObj.xxkc != null && ysbObj.xxkc != "") {
            if (vXksm != "") vXksm += "<br>";
            vXksm += "\u8981\u6c42\uff1a\u9700\u5148\u4fee\u8bfb[" + ysbObj.xxkc + "]\u8bfe\u7a0b"
        }
        if (ysbObj.xkwzsm != null && ysbObj.xkwzsm != "") {
            if (vXksm != "") vXksm += "<br>";
            vXksm += "\u8bf4\u660e\uff1a" + ysbObj.xkwzsm
        }
        var data = new Array();
        data[0] = ysbObj.jxbid;
        data[1] = ysbObj.kch;
        data[2] = ysbObj.kcm;
        data[3] = ysbObj.kxh;
        data[4] = ysbObj.xs;
        data[5] = ysbObj.xf;
        data[6] = ysbObj.xaqh;
        data[7] = ysbObj.kkdwdm;
        var kkdwmc = top.yxObjMap[ysbObj.kkdwdm];
        data[8] = (kkdwmc == null || kkdwmc == "") ? "&nbsp;" : kkdwmc;
        data[9] = (top.strTrim(sksjTxt) == "") ? "&nbsp;" : sksjTxt;
        data[10] = (top.strTrim(skddTxt) == "") ? "&nbsp;" : skddTxt;
        data[11] = ysbObj.skjs == null ? "&nbsp;" : ysbObj.skjs;
        data[12] = vXkrs;
        data[13] = (vXksm == "") ? "&nbsp;" : vXksm;
        //data[14] = "<img src='images/xkbut.png' onclick=\"javascript:glJxbXkOper('" + zJxbid + "','" + ysbObj.jxbid + "')\">";
        data[14] = xkView = "<div onclick=\"top.addRob('" + zJxbid + "','" + ysbObj.jxbid + "')\">添加抢课事件</div>"
        arr[arr.length] = data
    }
    return arr
}

Tjxk.xkViewLoad_exe = function () {
    var arr = new Array();
    xkrsMap = top.getJxbXkrs();
    var xklcObj = top.xklcObjMap[top.xkLcbh],
        sfzyxk = top.xkszObjMap["XKSZ_SFQYZYXK"];
    for (jxbid in xkJxbList) {
        var jxbObj = xkJxbList[jxbid],
            jgObj = top.xkJxbFilter(jxbObj),
            xkView = "<img src='images/xkbut.png' onclick=\"xkOper('" + jxbid + "')\">",
            vXkzy = "&nbsp;";

        //TODO:
        if (jxbObj.gljxbList.length == 0) {
            xkView = "<div onclick=\"top.addRob('" + jxbid + "'," + "  " + ")\">添加抢课事件</div>"
        } else {
            xkView = "<div onclick=\"parent.showGljxbXkView('" + jxbid + "')\">显示关联课表</div>"
        }
        // var xkView = "<img src='images/xkbut.png' onclick=\"xkOper('" + jxbid + "')\">",
        //TODO:

        if (sfzyxk == "1") vXkzy = top.getXkzyView(jxbObj.jxbid, jxbObj.kcxzdm);
        if (eval(jgObj.isYx)) continue;
        var tYxkrs = (xkrsMap[jxbid] != null && xkrsMap[jxbid] != "") ? xkrsMap[jxbid] : 0,
            vXkrs = jxbObj.krl + "/" + tYxkrs;
        if (xklcObj.xkmsdm != "01" && parseInt(tYxkrs) >= parseInt(jxbObj.krl)) vXkrs = "<b style='color:red;'>\u5df2\u6ee1</b>";
        var vCtxx = "";
        if (jgObj.ctMsg != null && jgObj.ctMsg != "") {
            this.jxbXkctList[jxbid] = jgObj.ctMsg;
            vCtxx = "<a id='ct_" + jxbid + "' href=\"javascript:jxbCtxxView('" + jxbid + "')\">\u51b2\u7a81</a>"
        }
        var vSksj = "",
            vSkdd = "";
        for (idx in jxbObj.pkxxList) {
            var pkxxObj = jxbObj.pkxxList[idx];
            if (vSksj != "") vSksj += "<br>";
            var jcxx = "";
            if (pkxxObj.ksjcmc != null && pkxxObj.ksjcmc != "" && pkxxObj.jsjcmc != null && pkxxObj.jsjcmc != "") jcxx = pkxxObj.ksjcmc + "-" + pkxxObj.jsjcmc;
            var skxq = "";
            if (pkxxObj.skxq != null && pkxxObj.skxq != "") skxq = top.xqObjMap[pkxxObj.skxq];
            vSksj += skxq + " " + jcxx + " " + pkxxObj.zcmc;
            if (vSkdd != "") vSkdd += "<br>";
            vSkdd += pkxxObj.jsmc
        }
        var data = new Array();
        data[0] = jxbObj.jxbid;
        data[1] = jxbObj.kch;
        data[2] = jxbObj.kcm;
        data[3] = "<a href=\"##\" class=\"dataTables\" jxbid=" + jxbObj.jxbid + ">" + jxbObj.kxh + "</a>";
        data[4] = (jxbObj.jxbmc == null || jxbObj.jxbmc == "") ? "&nbsp;" : jxbObj.jxbmc;
        data[5] = jxbObj.xs;
        data[6] = jxbObj.xf;
        data[7] = (jxbObj.jhxndm == null || jxbObj.jhxndm == "") ? "&nbsp;" : jxbObj.jhxndm;
        var jhxnmc = top.jhxnObjMap[jxbObj.jhxndm];
        data[8] = (jhxnmc == null || jhxnmc == "") ? "&nbsp;" : jhxnmc;
        data[9] = (jxbObj.jhxqdm == null || jxbObj.jhxqdm == "") ? "&nbsp;" : jxbObj.jhxqdm;
        var jhxqmc = top.jhxqObjMap[jxbObj.jhxqdm];
        data[10] = (jhxqmc == null || jhxqmc == "") ? "&nbsp;" : jhxqmc;
        data[11] = jxbObj.kclbdm;
        var kclbmc = top.kclbObjMap[jxbObj.kclbdm];
        data[12] = (kclbmc == null || kclbmc == "") ? "&nbsp;" : kclbmc;
        data[13] = jxbObj.kcxzdm;
        var kcxzmc = top.kcxzObjMap[jxbObj.kcxzdm];
        data[14] = (kcxzmc == null || kcxzmc == "") ? "&nbsp;" : kcxzmc;
        data[15] = jxbObj.kkdwdm;
        var kkdwmc = top.yxObjMap[jxbObj.kkdwdm];
        data[16] = (kkdwmc == null || kkdwmc == "") ? "&nbsp;" : kkdwmc;
        data[17] = jxbObj.xaqh;
        var xaqhmc = top.xaqObjMap[jxbObj.xaqh];
        data[18] = (xaqhmc == null || xaqhmc == "") ? "&nbsp;" : xaqhmc;
        data[19] = (top.strTrim(vSksj) == "") ? "&nbsp;" : vSksj;
        data[20] = (top.strTrim(vSkdd) == "") ? "&nbsp;" : vSkdd;
        var skjs = jxbObj.skjs;
        if (skjs != undefined) data[21] = skjs.length > 6 ? skjs.substring(0, 6) + "&nbsp;&nbsp;<a name=\"more\" msg=\"" + skjs + "\" href=\"##\">....</a>" : (skjs + "&nbsp;");
        else data[21] = "&nbsp;";
        data[22] = "&nbsp;";
        data[23] = vXkrs;
        data[24] = vXkzy;
        var vXksm = vCtxx;
        if (jxbObj.gljxbList != null && jxbObj.gljxbList != "" && (jxbObj.gljxbList).length > 0) {
            if (vXksm != "") vXksm += "<br>";
            vXksm += "\u542b\u5173\u8054\u73ed"
        }
        if (jxbObj.xkwzsm != null && jxbObj.xkwzsm != "") {
            if (vXksm != "") vXksm += "<br>";
            vXksm += "<a name=\"more\" msg=\"" + jxbObj.xkwzsm + "\" href=\"##\">\u9009\u8bfe\u8bf4\u660e</a>"
        }
        if (jxbObj.xxkc != null && jxbObj.xxkc != "") {
            if (vXksm != "") vXksm += "<br>";
            vXksm += "<a name=\"more\" msg=\"" + jxbObj.xxkc + "\" href=\"##\">\u5148\u4fee\u8bf4\u660e</a>"
        }
        data[25] = (vXksm == "") ? "&nbsp;" : vXksm;
        data[26] = xkView;
        arr[arr.length] = data
    }
    this.createXkView("mainBody", arr, false)
}

Tjxk.xkViewLoad_exe()