$(function() {
    var init = function() {
        $.get('/showall', {}, function(e) {
            //console.log(e);
            var html = template('indexTpl', { allbook: e });
            $('#dataList').html(html);

        });
    };

    init();

    $('#addBook').on('click', function() {
        $('#addForm').fadeIn();
        $('#zhezao').fadeIn();
    });

    $('#addForm').find('input[type="button"]').on('click', function() { //增加和修改用一个窗口所以判断下，也可以单独弄个修改窗口
        if ($('#addForm').find('input[name="id"]').length == 0) {
            $.ajax({
                type: 'post',
                url: '/add',
                data: $('#addForm').serialize(),
                dataType: 'json',
                success: function(data) {
                    //console.log(data);
                    if (data.affectedRows > 0) {
                        $('#addForm').fadeOut();
                        $('#zhezao').fadeOut();

                        init();
                    }
                }
            });
        } else {
            $.ajax({
                type: 'post',
                url: '/updata',
                data: $('#addForm').serialize(),
                dataType: 'json',
                success: function(data) {
                    //console.log(data);
                    if (data.affectedRows > 0) {
                        $('#addForm').fadeOut();
                        $('#zhezao').fadeOut();

                        init();

                        //重置表单

                        $('#addForm')[0].reset();
                        $('#addForm').find('input[name="id"]').remove();
                        $('#addForm').find('h3').text('增加图书');
                    }
                }
            });
        }

    });

    $('#close').on('click', function() {
        $('#addForm').fadeOut();
        $('#zhezao').fadeOut();
        $('#addForm')[0].reset();
        $('#addForm').find('input[name="id"]').remove();
        $('#addForm').find('h3').text('增加图书');
    });


    $('#dataList').on('click', '.xg', function() {
        $('#addForm').fadeIn();
        $('#zhezao').fadeIn();
        var dataid = $(this).data('id');
        //console.log(dataid);
        $('#addForm').append('<input type="hidden" name="id" value= ' + dataid + ' >'); //这里的value在渲染时直接生成为属性就行，也可跟下面一样直接取兄弟的id，也可干脆不用input，直接在请求提里添加
        $('#addForm').find('h3').text('修改图书');

        $('#addForm').find('input[name="name"]').val($(this).parent().siblings().eq(1).text()); //直接在兄弟元素找
        $('#addForm').find('input[name="author"]').val($(this).parent().siblings().eq(2).text());
        $('#addForm').find('input[name="category"]').val($(this).parent().siblings().eq(3).text());
        $('#addForm').find('input[name="describe"]').val($(this).parent().siblings().eq(4).text());
    });


    $('#dataList').on('click', '.sc', function() {
        var delid = $(this).siblings('.xg').data('id');
        //console.log(delid);
        $.get('/del', { id: delid }, function(e) {
            if (e.affectedRows > 0) {
                init();
            }
        });

    });
















});