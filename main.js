function getGljxbData(zJxbid) {
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
        createGljxbList(ysbObj);
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
            ctMsg = getConflictMsg(ysbObj);
        if (ctMsg != null && ctMsg != "") {
            glJxbXkctList[ysbObj.jxbid] = ctMsg;
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
