
window.onload=function() {
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		$(".create-menu-type")[0].value=self.menu_type;
	})
	bind_confirm();
	bind_cancel();
	bind_upload_img();
}

function bind_confirm() {
	$(".confirm")[0].addEventListener("tap",function() {
		var mainPage = null;
		if(!mainPage){
			mainPage =  plus.webview.currentWebview().opener();
		}
		var menu_name=$('.create-menu-name')[0].value;
		var menu_price=$('.create-menu-price')[0].value;
		var menu_description=$('.create-menu-description')[0].value;
		var menu_type=$('.create-menu-type')[0].value;
        var images=new Image(); 
        images.src=$("#userImg")[0].src;
		var menu_picture=getBase64Image(images);
		mui.fire(mainPage,"confirm_create_menu",{
            "menu_name":menu_name,
            "menu_price":menu_price,
            "menu_description":menu_description,
            "menu_type":menu_type,
            "menu_picture":menu_picture
        });
        mui.back();
	})
}

function bind_cancel() {
	$(".cancel")[0].addEventListener("tap",function() {
		mui.back();
	})
}

function judge_input_validity() {
	var check=true;
	mui("input").each(function() {
	//若当前input为空，则alert提醒 
	if(!this.value || this.value.trim() == "") {
	    var label = this.previousElementSibling;
	    mui.alert(label.innerText + "不允许为空");
	    check = false;
	    return false;
	}
	}); //校验通过，继续执行业务逻辑 
	if(check){
	    mui.alert('验证通过!')
	    return true;
	} else {
		return false;
	}
}

function bind_upload_img() {
	document.getElementById('upload_img').addEventListener('tap',function(){ 
		galleryImages();
	}); 
}
 
//本地相册选择  
function galleryImages() {  
	plus.gallery.pick(function(file){
    plus.io.resolveLocalFileSystemURL(file,function(entry){
        $("#userImg").attr("src",entry.fullPath);
    });
},function(e){},{});
};  
 
        //上传图片 
       /* function uploadHeadImg(imgPath){ 
        	alert(imgPath)
            //选中图片之后，头像当前的照片变为选择的照片 
            var mainImg=document.getElementById('userImg'); 
            mainImg.src=imgPath; 
             
            var images=new Image(); 
            images.src=imgPath; 
            var imgData=getBase64Image(images); 
            mui.ajax('',{  //第一个参数是接口名 
                data:{ 
                    'imgDatas':imgData 
                }, 
                dataType:'json',//服务器返回json格式数据 
                type:'post',//HTTP请求类型 
                timeout:10000,//超时时间设置为10秒； 
                success:function(data){ 
                    if(data.status=='1'){ 
                        mui.alert('上传成功！'); 
                    } 
                }, 
                error:function(xhr,type,errorThrown){ 
                    if(type=='timeout'){ 
                        mui.alert('服务器连接超时，请稍后再试'); 
                    } 
                } 
            }); 
        } 
 */
 
        //压缩图片转成base64 
        function getBase64Image(img){ 
            var canvas=document.createElement("canvas"); 
            var width=img.width; 
            var height=img.height;
            if(width>height){ 
                if(width>100){ 
                    height=Math.round(height*=100/width); 
                    width=100; 
                } 
            }else{ 
                if(height>100){ 
                    width=Math.round(width*=100/height); 
                } 
                height=100; 
            } 
 
            canvas.width=width; 
            canvas.height=height; 
            var ctx=canvas.getContext('2d'); 
            ctx.drawImage(img,0,0,width,height); 
 
            var dataUrl=canvas.toDataURL('image/png',0.8); 
            return dataUrl.replace('data:image/png:base64,',''); 
        } 