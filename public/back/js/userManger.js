$(function () {
    function render() {
        var page = 1;
        var pageSize = 5;
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (data) {
                console.log(data);
                var html = template('tp1', data);
                $("tbody").html(html);
                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small", //设置控件的大小
                    onPageClicked: function (a, b, c, page) {
                        //page指的是点击的页码,修改了当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                })

            }

        })
    }
    render();

    // 点击禁用按钮显示模态框
    $('tbody').on('click','.btn',function(){
        // console.log('hah');
       $('#myModal').modal('show'); 
       // 获取每个tr的id
       var id = $(this).parent().data('id');
       var isDelete = $(this).hasClass('btn-danger')?0:1;
       $('.btn-primary').off().on('click',function(){
        
        
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(data){
                console.log(data);
                if(data.success){
                    $('#myModal').modal('hide');
                    render();
                }
            }
        })
    })
    });
    
    
})