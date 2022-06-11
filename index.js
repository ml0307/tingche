$(function (){
    template.defaults.imports.a = function(value){
        return value.car_img
    }
    template.defaults.imports.timestamp = function(value){
        var setdet= new Date(value)
        let h = '0'+setdet.getHours()
        let min = '0'+setdet.getMinutes()
        let s ='0'+setdet.getSeconds()
        if(s.length==3){
            s=s.slice(1,3)
        }else if (s.length==2){
            s=s.slice(0,2)
        }
        if(min.length==3){
            min=min.slice(1,3)
        }else if (min.length==2){
            min=min.slice(0,2)
        }
        if(h.length==3){
            h=h.slice(1,3)
        }else if (h.length==2){
            h=h.slice(0,2)
        }
        let newData =setdet.getFullYear()+'-'+(1+setdet.getMonth())+'-'+setdet.getDate()+' '+h+':'+min+':'+s
        return newData
    };
    template.defaults.imports.updatetime = function(value){
        var seetdet= new Date(value)
        let h = '0'+seetdet.getHours()
        let min1 = '0'+seetdet.getMinutes()
        let s1 ='0'+seetdet.getSeconds()
        if(s1.length==3){
            s1=s1.slice(1,3)
        }else if (s1.length==2){
            s1=s1.slice(0,2)
        }
        if(h.length==3){
            h=h.slice(1,3)
        }else if (h.length==2){
            h=h.slice(0,2)
        }
        if(min1.length==3){
            min1=min1.slice(1,3)
        }else if (min1.length==2){
            min1=min1.slice(0,2)
        }

        let newData =seetdet.getFullYear()+'-'+(1+seetdet.getMonth())+'-'+seetdet.getDate()+' '+h+':'+min1+':'+s1
        return newData
    }
    $.get("http://1.14.68.137:8000/api/v0/owner/",function (res){
        var allpage = Math.ceil(res.count / 10)
        var page = 1
        $('.dqy').html(page)
        $('.zy').html(allpage)
        $('.black_').click(function () {
            if (page == 1) {
                page = 1
            } else {
                page--;
            }
            $('.dqy').html(page)
            $.get("http://1.14.68.137:8000/api/v0/owner/?page=" + page, function (res) {
                let result = template("tpl-owner", res.results)
                $('tbody').html(result)
                allpage = Math.ceil(res.count / 10)
                $('.zy').html(allpage)
                for (var i = 0; i < res.results.length + 1; i++) {
                    $('tr').eq(i).find('td').eq(12).html(i).css({ paddingTop: '19px' })
                    $('tbody').find('tr').eq(i).append('<td></td>')
                }
                man()
                console.log('这是张世继改的');
            })
        })
        $('.next_').click(function () {
            if (page == allpage) {
                page = allpage
            } else {
                console.log('这是张世继改的');
                page++;
            }
            $('.dqy').html(page)
            $.get("http://1.14.68.137:8000/api/v0/owner/?page=" + page, function (res) {
                let result = template("tpl-owner", res.results)
                $('tbody').html(result)
                allpage = Math.ceil(res.count / 10)
                $('.zy').html(allpage)
                for (var i = 0; i < res.results.length + 1; i++) {
                    $('tr').eq(i).find('td').eq(12).html(i).css({paddingTop: '19px'})
                    $('tbody').find('tr').eq(i).append('<td></td>')
                }
                man()
            })
        })
        
        
        
        let result =template("tpl-owner",res.results)
        $('tbody').html(result)
        for (var i =0 ; i<res.results.length+1; i++){
            // $('tbody').html(result).find('tr').eq(vl).append('<td>1</td>')
            $('tr').eq(i).find('td').eq(12).html(i).css({paddingTop:'19px'})
            $('tbody').find('tr').eq(i).append('<td></td>')
        }
        man()
        
        
    })
    
    
    function man(){
        $.get("http://1.14.68.137:8000/api/v0/owner/",function (res) {
            
            $('.btn-danger').each(function (index, item) {
                item.dataset.index = res.results[index].id
                $(item).click(function () {
                    let ownerId = this.dataset.index
                    $.ajax({
                        type: 'DELETE',
                    url: "http://1.14.68.137:8000/api/v0/owner/" + ownerId + "/",
                    success(res) {
                        console.log(res, '删除成功')
                        location.reload()
                    }
                })
                
            })
        })
        
        $('.Addto').click(function () {
            let park_state1 = ''
            $('.plk').eq(0).val()
            console.log($('.plk').eq(2).val())
            if ($('.plk').eq(4).val() == '有车') {
                park_state1 = '1'
            } else if ($('.plk').eq(4).val() == '无车') {
                park_state1 = '0'
            }
            $.post("http://1.14.68.137:8000/api/v0/owner/", {
                name: $('.plk').eq(0).val(),
                home_number: $('.plk').eq(1).val(),
                phone_number: $('.plk').eq(2).val(),
                park_lot:$('.plk').eq(3).val(),
                park_state: park_state1
            }, function (res) {
                console.log(res)
                location.reload()
            })
        })

        $(".btn-Update").each(function (index, item) {
            item.dataset.index = res.results[index].id;
            
            $(item).click(function () {
                let UpdateID = this.dataset.index
                console.log(1111)
                
                $($(".Update_Div")).eq(index).show()
                $(".btn_Uexit").eq(index).click(function () {
                    $($(".Update_Div")).eq(index).hide()
                    
                })
                $('.btn_Uptitle').eq(index).click(function () {
                    if ($(".post_Parkstate").val() == "已停") {
                        console.log('这是张世继改的');
                        $(".post_Parkstate").val(1)
                    } else if ($(".post_Parkstate").val() == "未停") {
                        $(".post_Parkstate").val(0)
                    }
                    
                    $.ajax({
                        type: "PUT",
                        url: "http://1.14.68.137:8000/api/v0/owner/" + UpdateID + '/',
                        
                        data: {
                            name: $(".update_name").eq(index).val(),
                            home_number: $(".update_Homenumber").eq(index).val(),
                            phone_number: $(".update_Phonenumber").eq(index).val(),
                            park_lot: $(".update_Parklot").eq(index).val(),
                            park_state: $(".post_Parkstate").val()
                        },
                        success(res) {
                            alert("更新成功")
                            location.reload(true)
                        },
                        error(res) {
                            console.log("更新失败" + res)
                        }
                        
                        
                    })
                    
                    
                })
                
            })
        })
    })
    
    console.log('这是张世继改的');
    
    
    
    
    $.get("http://1.14.68.137:8000/api/v0/owner/",function (res){
        
        $(".gd").click(function (){
            let id_=$(this).parent().siblings().eq(1).html()
            let npl= []
            res.results.forEach(function (item,index){
                $('.more_background').show()
                if(id_==item.id){
                    $('.che_img').html(' ')
                    $('.call_che_').html(' ')
                    $('#alche').html('0')
                    item.carlist.forEach(function (item,index){
                        let chebox = $('<div></div>').css({width:"200px",height:'40px',position:'relative',margin:"0 auto",paddingTop:'20px'})
                        chebox.html(item.license)
                        // console.log(item.id)
                        npl.push(item.id)
                        let ml= $('.call_che_').append(chebox)
                        $('#alche').html(ml[0].children.length)
                        if(item.car_img!=null){
                            let a = new String(item.car_img)
                            let img_box =$('<div></div>').css({width:"50px",height:'40px',position:'relative',margin:"0 auto",paddingTop:'15px'})
                            let img__=$('<img>').attr('src',a).css({width: '100%'})
                            console.log(img__)
                            img_box.html(img__)
                            $('.che_img').append(img_box)
                        }else {
                            let a=null
                            return;
                        }
                        console.log('这是张世继改的');
                    })
                    
                    let iup_=$('<input type="checkbox">').addClass("ln")
                    $('.call_che_').find('div').append(iup_)
                    let loopp=document.querySelectorAll('.ln')
                    for(let i= 0;i<loopp.length;i++){
                        loopp[i].dataset.index=npl[i]
                        console.log(npl[i])
                        $('.delete_che').click(function (){
                            if(loopp[i].checked){
                                let id = loopp[i].dataset.index
                                console.log(id)
                                $.ajax({
                                    type: 'DELETE',
                                    url: "http://1.14.68.137:8000/api/v0/license/" + id + "/",
                                    success(res) {
                                        console.log(res, '删除成功11')
                                        location.reload()
                                    }
                                })
                            }
                        })
                        
                    }
                    
                    console.log(loopp)
                    // if(loopp.is(':checked')){
                        
                        // }
                        
                        
                        console.log('这是张世继改的');
                        console.log('这是张世继改的');
                        
                        
                        $('.guanbi').click(function (){
                            $('.more_background').hide()
                            $('.iupt').val('')
                            $('.cl_img').css({zIndex:"5"})
                            
                            
                        })
                        
                    }
                    
                    
                    $('.cl_img').html('')
                    $('.iunpi').change(function (){
                        console.log(iunpi1.files[0])
                        let reader = new FileReader()
                        reader.onload=function (e){
                            let img1 =new Image()
                            img1.src=e.target.result
                            $('.cl_img').append(img1).css({zIndex:"9999"})
                            
                        }
                        reader.readAsDataURL(iunpi1.files[0])
                        
                        
                        
                        
                    })
                    
                    
                    
                    
                    
                    
                    $('.guanbi').click(function (){
                        $('.more_background').hide()
                        $('.iupt').val('')
                        var kl =$('.sc_call').find('input')
                        for(var i =0;i<kl.length;i++){
                            $(kl[0]).focus()
                        }
                    })
                    
                })
                
                
                
                
                
                
                
                console.log(id_)
                let id_1=$(this).parent().siblings().eq(1).html()
                $('.post_che').click(function () {
                    console.log(111)
                    let lince = []
                    let license = ""
                    console.log('这是张世继改的');
                    $('.iupt').each(function (index, item) {
                        lince.push(item.value)
                    })
                    $(lince).each(function (index, item) {
                        license += item
                    })
                    console.log(license)
                    console.log(iunpi1.files[0])
                    console.log(id_1)
                    let owner = id_1
                    let car_img = iunpi1.files[0]
                    
                    let formData = new FormData();
                    
                    formData.append('car_img', car_img)
                    formData.append('license', license)
                    formData.append('owner', owner)
                    
                    $.ajax({
                        url: "http://1.14.68.137:8000/api/v0/license/",
                        type: 'POST',
                        contentType: false,
                        processData: false,
                        data: formData,
                        success(res) {
                            location.reload(true)
                            
                            alert('添加成功，请刷新页面')
                            console.log(res)
                        }
                        
                    })
                    
                    
                })
                
            })
            console.log('这是张世继改的');
            console.log('这是张世继改的');
            
        })
    }
    $('.allcheck').click(function () {
        $('.allcheck,.checkmin').prop("checked", $(this).prop('checked'))
        
    })
    $('.checkmin').click(function () {
        // 如果选中的长度等于复选框所有的长度
        if ($('.checkmin:checked').length === $('.checkmin').length) {
            $('.allcheck').prop('checked', true)
        } else {
            $('.allcheck').prop('checked', false)
        }
        
    })
    
    
    
    $('.keyBoard').html(' ')
    let columns=[
        '京','沪','鄂','湘','川','渝','粤','闽','晋','⿊',
        '津','浙','豫','赣','贵','青','琼','宁','吉','蒙',
        '冀','苏','皖','桂','云','陕','⽢','藏','新','辽',
        '鲁']
        columns.forEach(function (item,index){
            let gkl =$('<div class="gkl"></div>')
            gkl.html(item)
            $('.keyBoard').append(gkl)
        })
        $('.iupt').each(function (index,item){
            item.dataset.index=index
            
            
            $(item).focus(function (){
               console.log('这是张世继改的');
               console.log('这是张世继改的');
               
               if(item.dataset.index==0){
                   $('.keyBoard').html(' ')
                   let columns=[
                       '京','沪','鄂','湘','川','渝','粤','闽','晋','⿊',
                       '津','浙','豫','赣','贵','青','琼','宁','吉','蒙',
                       '冀','苏','皖','桂','云','陕','⽢','藏','新','辽',
                       '鲁']
                       columns.forEach(function (item,index){
                           let gkl =$('<div class="gkl"></div>')
                           gkl.html(item)
                           $('.keyBoard').append(gkl)
                        })
                    }else {
                        $('.keyBoard').html(' ')
                        let numberColumns=[//输⼊车牌号
                        ['1','2','3','4','5','6','7','8','9','0'],
                        ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','Del']]
                        numberColumns.forEach(function (item,index){
                            let mkl =$('<div class="mkl"></div>')
                            item.forEach(function (item,index){
                                let gkl =$('<div class="gkl"></div>')
                                gkl.html(item)
                                $('.keyBoard').append(mkl)
                                
                                mkl.append(gkl)
                                //
                            })
                            
                        })
                    }
                    
                    
                    if(!item.value){
                        $('.gkl').each(function (i,e){
                            let  opt = $('.sc_call').find('input')
                            
                            $(e).click(function (){
                                if ($(e).html()!='Del'){
                                    $(item).val($(e).html())
                                    $(item).next().focus()
                                }else {
                                    for (var i = 0; i<opt.length;i++){
                                        if(opt[opt.length-1].value){
                                            opt[opt.length-1].value=''
                                            $(opt[opt.length-1]).focus()
                                            if(opt[i].value){
                                                $(opt[i]).focus()
                                            }
                                            return;
                                        }else if(!opt[opt.length-1].value){
                                            $(item).prev().val('').focus()
                                        }
                                    }
                                    
                                }
                                
                            })
                            
                            
                            
                        })
                        
                        console.log('这是张世继改的');
               }else {
                   $(item).next().focus()

               }




           })
        })
    $('.dkl').click(function(){
        let  opt1 = $('.sc_call').find('input')
        let malei = 'this is big sad bee'
        for (var i = 0; i<opt1.length;i++){
            if(0){
                console.log(malie);
                console.log(0000000);
            }else{
                console.log(malie);
                console.log(111111);
            }
        }
    })





    // $('.btn-danger').each(function (index,item){
    //     item.dataset.index=res.results[index].id
    //     $(item).click(function (){
    //         let ownerId = this.dataset.index
    //         $.ajax({
    //             type:'DELETE',
    //             url:"http://1.14.68.137:8000/api/v0/owner/"+ ownerId +"/",
    //             success(res){
    //                 console.log(res,'删除成功')
    //               location.reload()
    //             }
    //         })
    //
    //     })
    // })
    //
    //     $('.Addto').click(function (){
    //         let  park_state1=''
    //         $('.plk').eq(0).val()
    //         console.log($('.plk').eq(2).val())
    //         if ($('.plk').eq(3).val()=='有车'){
    //                  park_state1='1'
    //         }else if($('.plk').eq(3).val()=='无车'){
    //                  park_state1='0'
    //         }
    //         $.post("http://1.14.68.137:8000/api/v0/owner/",{
    //             name:$('.plk').eq(0).val(),
    //             home_number:$('.plk').eq(1).val(),
    //             phone_number:$('.plk').eq(2).val(),
    //             park_state:park_state1
    //         },function (res){
    //             console.log(res)
    //             location.reload()
    //         })
    //     })
    // console.log(res)
    // // let td = res.next
    // // td = td.substring(td.indexOf('?')+1)
    // // console.log(td)
    // $(".btn-Update").each(function (index, item) {
    //     item.dataset.index = res.results[index].id;
    //
    //
    //     $(item).click(function () {
    //         let UpdateID = this.dataset.index
    //         console.log(1111)
    //
    //         $($(".Update_Div")).eq(index).show()
    //         $(".btn_Uexit").eq(index).click(function () {
    //             $($(".Update_Div")).eq(index).hide()
    //
    //         })
    //         $('.btn_Uptitle').eq(index).click(function () {
    //             if ($(".post_Parkstate").val() == "已停") {
    //                 $(".post_Parkstate").val(1)
    //             } else if ($(".post_Parkstate").val() == "未停") {
    //                 $(".post_Parkstate").val(0)
    //             }
    //
    //             $.ajax({
    //                 type: "PUT",
    //                 url: "http://1.14.68.137:8000/api/v0/owner/" + UpdateID + '/',
    //
    //                 data: {
    //                     name: $(".update_name").eq(index).val(),
    //                     home_number: $(".update_Homenumber").eq(index).val(),
    //                     phone_number: $(".update_Phonenumber").eq(index).val(),
    //                     park_lot: $(".update_Parklot").eq(index).val(),
    //                     park_state: $(".post_Parkstate").val()
    //                 },
    //                 success(res) {
    //                     alert("更新成功")
    //                     location.reload(true)
    //                 },
    //                 error(res) {
    //                     console.log("更新失败" + res)
    //                 }
    //
    //
    //             })
    //
    //
    //         })
    //
    //     })
    // })
    //
    //
    //
    //
    //
    //
    // $.get("http://1.14.68.137:8000/api/v0/owner/",function (res){
    //
    //         $(".gd").click(function (){
    //             let id_=$(this).parent().siblings().eq(1).html()
    //                 res.results.forEach(function (item,index){
    //                 $('.more_background').show()
    //                 if(id_==item.id){
    //                     $('.che_img').html(' ')
    //                     $('.call_che_').html(' ')
    //                     $('#alche').html('0')
    //
    //                     item.carlist.forEach(function (item,index){
    //
    //                         let iup_=$('<input type="checkbox">').addClass("ln")
    //                         let chebox = $('<div></div>').css({width:"200px",height:'40px',position:'relative',margin:"0 auto",paddingTop:'20px'})
    //                         chebox.html(item.license)
    //                         let ml= $('.call_che_').append(chebox)
    //                         ml.find('div').append(iup_)
    //                         $('#alche').html(ml[0].children.length)
    //
    //                         if(item.car_img!=null){
    //                             let a = new String(item.car_img)
    //                             let img_box =$('<div></div>').css({width:"50px",height:'40px',position:'relative',margin:"0 auto",paddingTop:'15px'})
    //                             console.log(a)
    //                             let img__=$('<img>').attr('src',a).css({width: '100%'})
    //                             console.log(img__)
    //                             img_box.html(img__)
    //                             $('.che_img').append(img_box)
    //
    //                         }else {
    //
    //                             let a=null
    //                             return;
    //
    //                         }
    //
    //
    //                     })
    //
    //                     $('.guanbi').click(function (){
    //                         $('.more_background').hide()
    //                         $('.iupt').val('')
    //                         $('.cl_img').css({zIndex:"5"})
    //
    //
    //                     })
    //
    //                 }
    //
    //
    //             $('.cl_img').html('')
    //             $('.iunpi').change(function (){
    //                 console.log(iunpi1.files[0])
    //                 let reader = new FileReader()
    //                 reader.onload=function (e){
    //                     let img1 =new Image()
    //                     img1.src=e.target.result
    //                     $('.cl_img').append(img1).css({zIndex:"9999"})
    //
    //                 }
    //                 reader.readAsDataURL(iunpi1.files[0])
    //
    //
    //
    //
    //             })
    //
    //
    //
    //
    //
    //
    //                 $('.guanbi').click(function (){
    //                     $('.more_background').hide()
    //                     $('.iupt').val('')
    //                     var kl =$('.sc_call').find('input')
    //                     for(var i =0;i<kl.length;i++){
    //                         $(kl[0]).focus()
    //                     }
    //                 })
    //
    //         })
    //
    //             console.log(id_)
    //             let id_1=$(this).parent().siblings().eq(1).html()
    //             $('.post_che').click(function () {
    //                 console.log(111)
    //                 let lince = []
    //                 let license = ""
    //                 $('.iupt').each(function (index, item) {
    //                     lince.push(item.value)
    //                 })
    //                 $(lince).each(function (index, item) {
    //                     license += item
    //                 })
    //                 console.log(license)
    //                 console.log(iunpi1.files[0])
    //                 console.log(id_1)
    //                 let owner = id_1
    //                 let car_img = iunpi1.files[0]
    //
    //                 let formData = new FormData();
    //
    //                 formData.append('car_img', car_img)
    //                 formData.append('license', license)
    //                 formData.append('owner', owner)
    //
    //                 $.ajax({
    //                     url: "http://1.14.68.137:8000/api/v0/license/",
    //                     type: 'POST',
    //                     contentType: false,
    //                     processData: false,
    //                     data: formData,
    //                     success(res) {
    //                         location.reload(true)
    //
    //                         alert('添加成功，请刷新页面')
    //                         console.log(res)
    //                     }
    //
    //                 })
    //
    //
    //             })
    //
    //     })
    //
    // })






















    // $('.cl_img').html('')
    // $('.iunpi').change(function (){
    //     console.log(iunpi1.files[0])
    //         console.log(iunpi1.files[0])
    //         let reader = new FileReader()
    //         reader.onload=function (e){
    //             let img1 =new Image()
    //             img1.src=e.target.result
    //             $('.cl_img').append(img1).css({zIndex:"9999"})
    //
    //         }
    //         reader.readAsDataURL(iunpi1.files[0])
    //
    //
    //     $('.post_che').click(function (){
    //         console.log(111)
    //         $.post()
    //     })
    //
    // })





})
