$(function () {
    // 获取到表单
        var $form = $('form');
             $form.bootstrapValidator({
                // 配置校验时的小图标
                feedbackIcons: { /*input状态样式图片*/
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                // 规则
                fields: {
                    // 对应了表单中的name属性
                    username: {
                        // 写userName所有的校验规则
                        validators: {
                            notEmpty: {
                                message: "用户名不能为空"
                            },
                            //自定义的失败属性
                            callback: {
                                message: "用户名错误"
                            }
                        }
                    },
                
                    password: {
                        validators:{
                            notEmpty:{
                              message:"密码不能为空"
                            },
                            stringLength:{
                              min:6,
                              max:12,
                              message:"密码长度是6-12位"
                            },
                            callback:{
                              message:"密码错误"
                            }
                          }
                    }
                }
            })
                // 表单注册一个成功校验事件
            $form.on('success.form.bv',function(e){
                    // 阻止表单的默认行为
                    e.preventDefault();
                    //使用ajax发送登录请求
                    $.ajax({
                        type:"post",
                        url:"/employee/employeeLogin",
                        data:$form.serialize(),
                        success:function (data) {
                            console.log(data);
                            if(data.success){
                                //跳转到首页
                                location.href = "index.html";
                              }
                            if(data.error === 1000){
                                // alert ('用户名不存在');
                                $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                            }
                            if(data.error === 1001){
                                // alert ('密码错误');
                                $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                            }
                        }
  
                })
        })
            $("[type='reset']").on('click',function(){
                //获取到validator对象，调用resetForm方法
                $form.data("bootstrapValidator").resetForm();
            })
    });