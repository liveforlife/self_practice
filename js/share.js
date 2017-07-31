function setWeixin(data) {
    var _gticket = data.msg;
    var _gUrl = window.location.href
    var _arr1 = _gticket.split('=')
    var _arr2 = [];
    for (var i = 0; i < _arr1.length; i++) {
        var s = _arr1[i].split('&')
        _arr2.push(s);
    };
    var _newticket = "jsapi_ticket=" + _arr2[1][0] + "&noncestr=" + _arr2[2][0] + "&timestamp=" + _arr2[3][0] + "&url=" + _gUrl
    var sig = hex_sha1(_newticket)
    wx.config({
        debug: false,
        appId: 'wx919042e7c14a7704',
        timestamp: _arr2[3][0],
        nonceStr: _arr2[2][0],
        signature: sig,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems'
        ]
    });

    wx.ready(function() {
        var wxData = {
            title:'农夫山泉',
            desc:'恩，有点甜',
            link: 'http://special.zhaopin.com/test/h5/2017/shz/szsq071921/',
            imgUrl:'http://special.zhaopin.com/test/h5/2017/shz/szsq071921/images/icon.jpg'
        }
        wx.checkJsApi({
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems'
            ],
            success: function(res) {
                console.log(JSON.stringify(res));
            }
        });
        wx.onMenuShareAppMessage({
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            trigger: function(res) {
            },
            success: function(res) {
                $('.sharepic').hide();
            },
            fail: function(res) {
                console.log(JSON.stringify(res));
            }
        });
        wx.onMenuShareTimeline({
            title: wxData.title,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            success: function() {
                $('.sharepic').hide();
            }
        });
        wx.onMenuShareQQ({
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            success: function() {
                $('.sharepic').hide();
            },
            cancel: function() {
            }
        });
        wx.onMenuShareWeibo({
            title: wxData.title,
            desc: wxData.desc,
            link: wxData.link,
            imgUrl: wxData.imgUrl,
            success: function() {
                $('.sharepic').hide();
            },
            cancel: function() {
            }
        });
    });
}
$.ajax({
    url: 'http://zhida.minisite.zhaopin.com/TokenHandler.ashx?cmd=GetTicket',
    type: 'get',
    dataType: "jsonp",
    jsonpCallback: "jsonp_success",
    success: function(data) {
        setWeixin(data)
    }
})