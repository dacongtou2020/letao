//关闭进度环
NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  }, 500);
});

// 判断用户有没有登录,如果没有登录,则打回登录页
if(location.href.indexOf('login.html')==-1){
    $.ajax({
        type: 'get',
        url: '/employee/checkRootLogin',
        success:function(data){
            console.log(data);
            if(data.error===400){
                location.href ='login.html';
            }
            
        }
    })
}

// 点击分类管理出现二级目录
$('.toggle').on('click',function(){
    $(this).next().slideToggle();
});

$('#nav .pull-left').on('click',function(){
    $('.aside_left').toggleClass('now');
    $('.main').toggleClass('now');
    $('#nav').toggleClass('now');
    

})

