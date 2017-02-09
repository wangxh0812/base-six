/**
 * @authors AnSen
 * @date 2014-05-09 16:18:05
 */
//验证码
var  kaptchaImg={
	returnSrc:function(){
		return StaticSetting.absUrl + "/kaptcha.svl?d="+ Math.random();
	},
	loadImg:function(){
		var _this = this;
		$("#kaptchaImg").attr("src",_this.returnSrc());
	}
};
/*登陆页*/
$(document).ready(function(){
    var win_heigth = $(window).height();
    var marTop = (win_heigth-387)/2;
    if (marTop<0) {marTop=0;};
    $('#login').css('margin-top',marTop);
    //验证码
    kaptchaImg.loadImg();
    $("#kaptchaImg").bind("click",function(){
    	kaptchaImg.loadImg();
    });
    //form
    $("#submitButt").bind("click",function(event){
    	event.preventDefault();//阻止submit自动提交
    	submitForm();
    });
    $("input")[0].focus();
});
//提交表单
function submitForm(){
	if(verifyForm()==false){
		$(".errormsgSpan").html("用户名、密码、验证码皆不能为空！");
	}else{
		
		//$("form").submit();
		login();
	}
}

function login(){
	var username = $("#username").val();
	var password = $("#password").val();
	var vertifyCode = $("#vertifyCode").val();
	$.ajax({
		type: "POST",
		url: StaticSetting.absUrl + "login?t="+ Math.random(),
		async: false,
		data:"username="+username+"&password="+password+"&vertifyCode="+vertifyCode,
		contentType:"application/x-www-form-urlencoded",
		success: function(result, textStatus){
			if(result.success){
				window.location.href='/index';
			}else{
				$(".errormsgSpan").html(result.msg);
			}
		},
		error: function(){
		}
	});
	kaptchaImg.loadImg();
}


//验证表单
function verifyForm(){
	var flag = true;
	$.each($("input"),function(index, domEle){
		var _val = $(this).val();
		if(!_val||_val==""){
			flag=false;
		}
	});
	return flag;
}


