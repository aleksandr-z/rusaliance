$(function() {
    var current = 1;

    var iterate		= function(){
        var i = parseInt(current+1);
        var lis = $('#rotmenu').children('li').size();
        if(i>lis) i = 1;
        display($('#rotmenu li:nth-child('+i+')'));
        
    }
    display($('#rotmenu li:first'));
    var slidetime = setInterval(iterate,5000);
	
    $('#rotmenu li').bind('click',function(e){
       clearInterval(slidetime);
       display($(this));
       e.preventDefault();
       setInterval(iterate,15000);
    });
	
    function display(elem){
        var $this 	= elem;
        var repeat 	= false;
        if(current == parseInt($this.index() + 1))
            repeat = true;
		
        if(!repeat)
            $this.parent().find('li:nth-child('+current+') a').stop(true,true).animate({'marginRight':'40px'},300,function(){
                $(this).animate({'opacity':'0.7'},700);
            });
		
        current = parseInt($this.index() + 1);
		
        var elem = $('a',$this);
        
            elem.stop(true,true).animate({'marginRight':'20px','opacity':'1.0'},300);
		
        var info_elem = elem.next();
        $('#rot1 .heading').animate({'right':'-520px'}, 1200,'easeOutCirc',function(){
            $('h3',$(this)).html(info_elem.find('.info_heading').html());
            $(this).animate({'right':'0px'},900,'easeInOutQuad');
        });
		
        $('#rot1 .description').animate({'bottom':'-270px'},1200,'easeOutCirc',function(){
            $('p',$(this)).html(info_elem.find('.info_description').html());
            $(this).animate({'bottom':'0px'},900,'easeInOutQuad');
        })
        $('#rot1').prepend(
        $('<img/>',{
            style	:	'opacity:0',
            className : 'bg'
        }).load(
        function(){
            $(this).animate({'opacity':'1'},600);
            $('#rot1 img:first').next().animate({'opacity':'0'},700,function(){
                $(this).remove();
            });

        }
    ).attr('src','./../images/slider/'+info_elem.find('.info_image').html()).attr('width','auto').attr('height','auto')
    );
    }
});