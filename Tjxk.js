function xkViewLoad_exe() {
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
            jxbXkctList[jxbid] = jgObj.ctMsg;
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
    createXkView("mainBody", arr, false)
}
xkViewLoad_exe()
