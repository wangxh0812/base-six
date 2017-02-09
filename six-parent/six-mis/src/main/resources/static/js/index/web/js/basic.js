	// JavaScript Document
var menuJson = null;
$(function() {
  var timer = null; //设置一个空的时间
  // 右侧系统 和 工具栏 下拉列表
  $(".erp-dropdown,.toolbar>.tool-item").hover(function() {
    $(this).addClass("open");
  }, function() {
    $(this).removeClass("open");
  });

  //用户头像展开
  $(".user-box").hover(function() {
    var _this = $(this);
    timer = setTimeout(function() {
      _this.addClass("open");
    }, 300)
  }, function() {
    clearTimeout(timer);
    $(this).removeClass("open");
  });
  //触发主导航上的nav-item-more 的mouseenter 和 mouseleave事件
  $("#J_mainNav").on("mouseenter", ".nav-item-more", function() {
    $(this).addClass("open");
  })
  $("#J_mainNav").on("mouseleave", ".nav-item-more", function() {
    $(this).removeClass("open");
  });

  //设置高度
  resizeHeight();

  //调整屏幕时执行方法
  $(window).resize(function() {
    resizeHeight();
    sideScroll();
    navChange("#J_mainNav", 1000);
  });

  //获取json数据
  getMenu(function(json) {
    //获取主导航json数据
    getMainNav(json, "#J_mainNav");
    $("#J_mainNav").on("click", ".nav-item, .nav-item-drop", function() {
      $("#J_mainNav .nav-item-drop,#J_mainNav .nav-item").removeClass("active");
      for (var i = 0; i < json.data.length; i++) {
        $(this).addClass("active");
        $("#menu_" + $(this).attr("id") + "").show().siblings("div").hide();
      }
      resizeHeight();
      sideScroll();
    });
    //获取前台网站json数据
    //getSite(json, "#J_site");
	
    //获取工具栏添加项数据
    //getAddMenu(json,"#J_addMenu");
    $("#J_addMenu>li>a").on("click", function(){
      var menuid = $(this).attr("moduleId");
      openWin(menuid, $(this).attr("moduleName"), "new=1");
    });
	
	//获取前台信息条数方法
//	var notify = json.notify.total;
//	$('#notify').show();
//  $('#notify').text(notify);

    //获取侧栏导航数据
    getSideNav(json, "#J_sideNav");

    window.menuJson = json;

    //数据加载完成后再初始化方法
    resizeHeight();
    sideScroll();
    navChange("#J_mainNav", 1000);

    //数据加载完成时候打开控制台首页
    $(".icon-home").parents(".nav-item").addClass("active");
    //用户退出
    $("#btn_logout, #btn_logout_x").on("click", function() {
      var from = $(this).attr("data-from");
      $.post("logexit", function(r) {
        layer.msg('退出成功！', {
          time: 500
        });
        window.location.href = "./" + (from=='pc' ? "?from=" + from : "");
      });
    });
  });

  //定时刷新信息条数
  //setInterval(function(){
  //  getMenu(function(json) {
  //    var notify = json.notify.total;
  //      $('#notify').text(notify);
  //    });
  //},30000);

  /***
  ** 侧栏导航交互 **
  ***/
  var $bar = $("#J_sideNav"),
    $workspace = $("#J_workspace"),
    $menu_btn = $bar.find(".menu-btn"),
    $item = $bar.find(".nav-item,.nav-item-box"),
    $link = $item.find(".nav-link"),
    $subnav = $item.find(".side-subnav");


  //侧栏正常状态时点击无子导航菜单列表项
  $("#J_sideNav").on("click", ".nav-item .nav-link", function() {

    var _this = $(this);
    linkClick(_this);
    var id = $(this).attr("link-id"),
      name = $(this).attr("link-name") || $(this).text();
    if (id) openWin(id, name);
  });
  //侧栏正常状态时点击有子导航菜单列表项
  $("#J_sideNav").on("click", ".nav-item-box .nav-link", function() {

    var _this = $(this);
    linkMoreClick(_this);

    //初始化方法
    resizeHeight();
    sideScroll();
  });

  $("#J_sideNav").on("click", ".side-subnav a", function() {

    //清除侧栏导航所有激活状态
    $("#J_sideNav").find(".nav-item,.nav-item-box").removeClass("active");
    $("#J_sideNav").find(".nav-item-box").find(".side-subnav").find("li").removeClass("active");

    $(this).parent().addClass("active");
    $(this).parents(".nav-item-box").addClass("active");
    var id = $(this).attr("link-id"),
      name = $(this).attr("link-name") || $(this).text();
    if (id) openWin(id, name);
  });

  //侧栏收缩状态时，获取#J_sideNav下动态添加的.nav-item 的mouseenter事件
  $("#J_sideNav").on("mouseenter", ".nav-item,.nav-item-box", function() {
    if ($bar.hasClass("side-shrink")) {

      if ($(this).hasClass("hasSubnav")) {

        $(this).addClass("open");
        $(this).find(".side-subnav").show().stop().animate({
          left: 36,
          opacity: 1
        }, 200);

      }

      $(this).find(".text").show().stop().animate({
        left: 36,
        opacity: 1
      }, 200);

    }
  });
  //侧栏收缩状态时，获取#J_sideNav下动态添加的.nav-item 的mouseleave事件
  $("#J_sideNav").on("mouseleave", ".nav-item,.nav-item-box", function() {
    if ($bar.hasClass("side-shrink")) {

      if ($(this).hasClass("hasSubnav")) {

        $(this).find(".side-subnav").stop().animate({
          left: 60,
          opacity: 0
        }, 200, function() {
          $(this).parent().removeClass("open");
          $(this).hide();
        });
      }

      $(this).find(".text").stop().animate({
        left: 60,
        opacity: 0
      }, 200, function() {
        $(this).hide();
      });

    }
  });
  //点击收缩伸展
  $("#J_sideNav").on("click", ".menu-btn", function() {

    if ($bar.hasClass("side-shrink")) {

      $(this).attr("title", "收缩导航");
      sideExtend();
    } else {
      $(this).attr("title", "展开导航");
      sideShrink();
    }
  });

  //动态获取我的订单数据
/*  $.post('main?xwl=33Y9D46QAXCT',function(data){
    var row = data.rows.length>0 ? data.rows[0]: null;
    if (!row) return;
    //$("#cropper-input").val(row.img);
    $("#userName").val(row.userName);   
    $("#trueName").val(row.trueName);   
    $("#sex").val(row.sex);   
    $("#phoneNum").val(row.mobile); 
    $("#shortNum").val(row.mobile1); 
    $("#telNum").val(row.tel); 
    $("#telNum2").val(row.tel1); 
    $("#qqNum").val(row.qq); 
    $("#wechatNum").val(row.weixin); 
    $("#email").val(row.email); 
    $("#fax").val(row.fax);                                     
  },'json');*/

  //提交用户表单
  $("#J_userFormBtn").click(function(){
    $("#J_userForm").submit();
  });
  $("#J_userForm").submit(formValidation);
});

function formValidation(){
  var oldpass= $("#oldPassword"),
      newpass= $("#newPassword"),
      confirmpass= $("#confirmPassword"),
      nickname = $("#nickName"),
      truename = $("#trueName");

      if(oldpass.val()!="" && newpass.val()==""){

        layer.msg('请设置新密码！', {shift:6});  
        newpass.focus();

      }else if(oldpass.val()!="" && confirmpass.val()==""){

        layer.msg('请确认新密码！', {shift:6});  
        confirmpass.focus();

      }else if(oldpass.val()!="" && newpass.val()!=confirmpass.val()){

        layer.msg('新密码两次输入不一致，请重新输入', {shift:6});  
        confirmpass.focus();

      }else if(oldpass.val()=="" && (newpass.val()!="" || confirmpass.val()!="" )){

        layer.msg('请先填写原密码', {shift:6});  
        oldpass.focus(); 

      }/*else if(truename.val()==""){

        layer.msg('请填写真实姓名！', {shift:6});
        truename.focus();  

      }*/else{
        $.post('/user/updatepass',
          {"oldPass":oldpass.val(),"password":newpass.val()},
          function(data){
        	  	  data=JSON.parse(data)
    			  if(data.success===true){
    				  layer.msg('保存成功',{time:1500});
    				  oldpass.val('');
    				  newpass.val('');
    				  confirmpass.val('');
    			  }else{
    				  layer.msg(data.msg,{shift:6});
    				  oldpass.focus(); 
    			  }
        }, 'json');

      }

      return false;
}

//设置窗口height 方法
function resizeHeight() {
  var h = document.documentElement.clientHeight || document.body.clientHeight;
  var h1 = h - 70;
  $(".container").height(h1);
  $(".side-navbar").height(h1);
  $(".side-nav").height(h1 - 59);
  $("#J_workspace").height(h1 - 20);
}

//添加滚动条方法
function sideScroll() {

  var _h = $("#J_sideNav").height() - 59;
  $(".slimScrollDiv").height(_h);
  $(".side-nav").slimScroll({
    height: _h
  });
}

//主导航自适应方法
function navChange(id, limitWidth) {
  var body_width = document.documentElement.clientWidth || document.body.clientWidth,
    nav_width = 0,
    lw = $(".user-box").width(),
    rw = $(".toolbar").width() + 10,
    $li = $(id).find(".nav-item"),
    li_size = $li.size(),
    $more = $(id).find(".nav-item-more"),
    more_width = $more.width(),
    $more_list = $more.find(".dropdown-list"),
    j = 0,
    arr = [];

  for (var i = 0; i < li_size; i++) {

    nav_width += $li.eq(i).width();

    if (limitWidth < body_width) {
      if (nav_width < body_width - lw - rw - more_width) {
        $li.eq(i).show();
        $more.hide();
        j++;
      } else {
        $li.eq(i).hide();
        $more.show();
      }
    }
    if (limitWidth > body_width) {
      if (nav_width > limitWidth - lw - rw - more_width) {
        $li.eq(i).hide();
        $more.show();
      } else {
        $li.eq(i).show();
        $more.hide();
        j++;
      }
    }
  }
  for (var i = j; i < li_size; i++) {
    if (limitWidth > body_width) {
      $li.eq(i).hide();
    }
    arr.push([$li.eq(i).html(), $li.eq(i).attr("id")]);
  }
  $more_list.empty();
  for (var i = 0; i < arr.length; i++) {
    $more_list.append("<li class='nav-item-drop' id='" + arr[i][1] + "'>" + arr[i][0] + "</li>");
    $more_list.children().show()
  }
}

//json获取主导航数据方法
function getMainNav(json, id) {
  $main_nav = $(id);
  var main_nav_html = '',
    more_html = "<li class='nav-item-more'><a class='nav-link' href='javascript:void(0)'>更多<i class='caret'></i></a><ul class='dropdown-list'></ul></li>";
  var menu = json.data[0].children;
  for (var i = 0; i < menu.length; i++) {
    var li = menu[i];
    main_nav_html += "<li class='nav-item " + (i === 0 ? 'active' : '') + "' id='" + li.id + "'><a class='nav-link' href='javascript:void(0)'><i class='icon icon-" + li.link + "'></i> <span>" + li.text + "</span></a></li>";
  }

  $main_nav.html(main_nav_html + more_html);
}
//获取前台网站列表方法
function getSite(json, id) {
  var $site = $(id),
    site_html = '',
    site = json.menu_site;
  if (site.length === 1) {
    $site.removeClass("dropdown-box-more");
  }
  for (var i = 0; i < site.length; i++) {
    var site_num = site[i];
    site_html += '<div class="dropdown-item dropdown-item' + (i + 1) + '"><h3 class="ellipsis">' + site_num.name + '</h3><p class="visit"><a class="user-btn" href="' + site_num.url + '" target="_blank">立即访问</a></p><div class="qr"><p><img src="' + site_num.qr + '" width="100" height="100" alt="' + site_num.name + '微网站二维码"></p><p class="qr-text">扫一扫访问' + site_num.name + '微网站</p></div></div>';
  }
  $site.html(site_html);
}

//获取工具栏添加项方法
function getAddMenu(json, id) {
  var $menu_add = $(id),
    menu_add_html = '',
    menu_add = json.menu_add;
  for (var i = 0; i < menu_add.length; i++) {
    var menu_add_li = menu_add[i];
    menu_add_html += '<li><a href="' + menu_add_li.id + '">' + menu_add_li.name + '</a></li>';
  }
  $menu_add.html(menu_add_html);
}

//获取侧栏导航数据方法
function getSideNav(json, id) {
  var $side_nav = $(id),
    side_html = '';
  var menu = json.data[0].children;
  for (var i = 0; i < menu.length; i++) {
    var side = menu[i];
    side_html += "<div id='menu_" + side.id + "' class='" + (i === 0 ? 'show' : 'hide') + "'><h3 class='hd'><span class='text'>" + side.text + "中心</span><a class='menu-btn' href='javascript:void(0)' title='收缩导航'><i class='icon icon-menu'></i></a></h3><ul class='side-nav'>";
    for (var j = 0; j < side.children.length; j++) {
      var side_nav = side.children[j];
      if (!side_nav.leaf ) {

        side_html += "<li class='nav-item-box hasSubnav'><a class='nav-link' href='javascript:void(0)'><i class='icon icon-" + side_nav.link + "'></i><span class='text'>" + side_nav.text + "</span><i class='caret'></i></a><ul class='side-subnav'>";

        for (var k = 0; k < side_nav.children.length; k++) {
          var side_subnav = side_nav.children[k];
//          if (typeof side_subnav.alias == 'string' && side_subnav.alias == 'needpro') {
//            side_html += "<li><a href='javascript:void(0)' link-id='" + side_subnav.moduleId + "' link-name='升级到企业版' style='color:#777;'>" + side_subnav.moduleName + "</a></li>";
//          } else {
            side_html += "<li><a href='javascript:void(0)' link-id='" + side_subnav.id + "'>" + side_subnav.text + "</a></li>";
//          }
        }
        side_html += "</ul></li>";

      } else {
//        if (typeof side_nav.alias == 'string' && side_nav.alias.length>7 && side_nav.alias.substring(0,7)=='http://'){
//          side_html += "<li class='nav-item'><a class='nav-link' href='javascript:void(0)' onclick='openWin(\"" + side_nav.alias + "\", \"帮助中心\", null, true)'><i class='icon icon-" + side_nav.icon + "'></i><span class='text'>" + side_nav.moduleName + "</span><i class='caret'></i></a></li>";
//        } else if (typeof side_nav.alias == 'string' && side_nav.alias == 'needpro') {
//          side_html += "<li class='nav-item'><a class='nav-link' href='javascript:void(0)' link-id='" + side_nav.moduleId + "' link-name='升级到企业版'><i class='icon icon-" + side_nav.icon + "'></i><span class='text' style='color:#777;'>" + side_nav.moduleName + "</span><i class='caret'></i></a></li>";
//        } else {
          side_html += "<li class='nav-item'><a class='nav-link' href='javascript:void(0)' link-id='" + side_nav.id + "'><i class='icon icon-" + side_nav.link + "'></i><span class='text'>" + side_nav.text + "</span><i class='caret'></i></a></li>";
//        }
      }
    }
    side_html += "</ul></div>";

  }
  side_html += "<p class='ft'>Powered by <strong>TONTISA</strong>&#8482;</p>";
  $side_nav.html(side_html);
}

//延伸时侧栏导航点击无子导航菜单列表项
function linkClick(_this) {
  $("#J_sideNav").find(".nav-item,.nav-item-box").removeClass("active");
  $("#J_sideNav").find(".nav-item-box").find(".side-subnav").find("li").removeClass("active");
  _this.parent().siblings().find(".side-subnav").slideUp();
  _this.parent().addClass("active");
  _this.parent().siblings().removeClass("active");
}
//延伸时侧栏导航点击带子导航菜单列表项
function linkMoreClick(_this) {
  $("#J_sideNav").find(".nav-item,.nav-item-box").removeClass("active");
  $("#J_sideNav").find(".nav-item-box").find(".side-subnav").slideUp();
  if (_this.siblings(".side-subnav").is(":visible")) {
    _this.siblings(".side-subnav").slideUp();
    _this.parent().removeClass("active");
  } else {
    _this.parent().siblings().find(".side-subnav").slideUp();
    _this.siblings(".side-subnav").slideDown();
    _this.parent().addClass("active");
    _this.parent().siblings().removeClass("active");
  }
}

//侧栏收缩
function sideShrink() {
  var $bar = $("#J_sideNav"),
    $workspace = $("#J_workspace"),
    $menu_btn = $bar.find(".menu-btn"),
    $item = $bar.find(".nav-item,.nav-item-box"),
    $link = $item.find(".nav-link");

  //$link解绑click事件
  $("#J_sideNav").off("click", ".nav-item-box .nav-link");
  $workspace.css({
    marginLeft: 36
  });
  $bar.animate({
    width: 36
  }, 300, function() {
    $bar.addClass("side-shrink");
  })
  $link.find(".text").stop().animate({
    left: 60,
    opacity: 0
  }, 300, function() {
    $(this).hide();
    $bar.find(".ft").html("");
  });
  //收缩时重置side-subnav的left值 和 opacity值
  if ($item.hasClass("hasSubnav")) {
    $item.find(".side-subnav").css({
      left: 60,
      opacity: 0
    });
  }
}

//侧栏展开
function sideExtend() {
  var $bar = $("#J_sideNav"),
    $workspace = $("#J_workspace"),
    $menu_btn = $bar.find(".menu-btn"),
    $item = $bar.find(".nav-item,.nav-item-box"),
    $link = $item.find(".nav-link");

  $bar.removeClass("side-shrink").animate({
    width: 180
  }, 300);

  $link.find(".text").show().animate({
    left: 36,
    opacity: 1
  }, 300, function() {
    $workspace.css({
      marginLeft: 180
    });
    $bar.find(".ft").html("Powered by <strong>TONTISA</strong>&#8482;");
  });
  for (var i = 0; i < $("#J_sideNav div:visible .side-nav >li").length; i++) {
    if ($("#J_sideNav div:visible .side-nav >li").eq(i).hasClass("active")) {
      $("#J_sideNav div:visible .side-nav >li").eq(i).find(".side-subnav").show();
    }
  }
  //重新绑定有子导航菜单列表项的点击事件
  $("#J_sideNav").on("click", ".nav-item-box .nav-link", function() {
    var _this = $(this);
    linkMoreClick(_this);
  })

  //伸展时重置side-subnav的left值 和 opacity值
  if ($item.hasClass("hasSubnav")) {
    $item.find(".side-subnav").css({
      left: 36,
      opacity: 1
    });
  }
}

/***
 * get the hole path of a module by moduleId
 * @param json [json] the menu json object.
 * @param id [string] moduleId of the module to be found
 * @return [array] [item][0]:moduleId , [item][1]:moduleName
**/
function getMenuPath(json, id) {
  var path = null;
  //getMenu(function(json){
  //loop main menu
  for (var i = 0; i < json.length; i++) {
    var menu_1 = json[i];
    //clear the array before a new loop of main menu
    path = [
      [],
      [],
      []
    ];
    path[0] = [menu_1.moduleId, menu_1.moduleName];
    //loop the sub menu
    for (var j = 0; j < menu_1.children.length; j++) {
      var menu_2 = menu_1.children[j];
      //delete the last menus
      path.splice(1, 2);
      path[1] = [menu_2.moduleId, menu_2.moduleName];
      //if found, end loop and return the current id path
      if (path[1][0] == id) {
        return path;
      }
      //if the sub menu has children, loop them
      if (menu_2.isFolder) {
        for (var k = 0; k < menu_2.children.length; k++) {
          var menu_3 = menu_2.children[k];
          path[2] = [menu_3.moduleId, menu_3.moduleName];
          //if found, end loop and return the current path
          if (path[2][0] == id) return path;
        }
      }
    }
  }
  //if not found, return an empty array.
  return [];
  //});
}

//清除所有的元素的active
function clearActive() {
  $("#J_mainNav").find(".nav-item").removeClass("active");
  $("#J_sideNav").find(".nav-item,.nav-item-box").removeClass("active");
  $("#J_sideNav").find(".nav-item-box").find(".side-subnav").find("li").removeClass("active");
}

//切换tab时激活导航状态
function activeMenu(id) {
  if (menuJson == null) return;
  var menu = menuJson.menu,
    path = getMenuPath(menu, id);
  clearActive();

  var main_nav_id = path[0][0];
  $("#" + main_nav_id).click();

  var side_nav_id = path[1][0];
  $("a[link-id=" + side_nav_id + "]").parent(".nav-item").addClass("active");
  $("a[link-id=" + side_nav_id + "]").parent(".nav-item-box").find(".nav-link").click();

  if (path.length > 2) {
    var side_subnav_id = path[2][0];
    $("a[link-id=" + side_subnav_id + "]").parent("li").addClass("active");
    $("a[link-id=" + side_subnav_id + "]").parents(".nav-item-box").addClass("active");
    $("a[link-id=" + side_subnav_id + "]").parents(".side-subnav").slideDown();
    $("a[link-id=" + side_subnav_id + "]").parents(".nav-item-box").siblings(".nav-item-box").find(".side-subnav").slideUp();
  } else {
    $("#J_sideNav").find(".nav-item-box").find(".side-subnav").slideUp();
  }
}

//获取框架页iframe
function openWin(id, name, params, inBrowser) {
  var openedInBrowser = false;
  var url;
  if (id.indexOf("http://")===0 || id.indexOf("https://")===0 || id.indexOf("/")===0){
	url = id;
  } else {
	url = 'main?xwl=' + id + (params?'&'+params:'');
  }
  if (inBrowser){
	try {
	  var gui = require('nw.gui');
	  var shell = gui.Shell;
	  shell.openExternal(url);
	  openedInBrowser = true;
	} catch (e){
	  window.open(url);
	  return false;
	}
	if (openedInBrowser){
	  return false;
	}
  }
  var wwin = $(window.document).contents().find("#iframe_frames")[0].contentWindow;
  wwin.Pt.openTab(url, name);
  if (id!='my'){
    wwin.Pt.load(wwin.moduleTab.getActiveTab(), true);
  } else {
    wwin.index_iframe_getData();
  }
  return false;
}

//获取所有json数据方法
function getMenu(fn) {
  $.get('menu/getMenuTree?' + Math.floor(Math.random() * 100000), function(data) {
    menu = data;
    fn(JSON.parse(data));
  }, 'json');
}

//
