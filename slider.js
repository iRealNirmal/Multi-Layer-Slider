var triggers,images,elm,imagesString,element,lastElem,mask,imgWidth,target,tween,timingRun,imgHeight;
var sliderSetting ={
  slideTime : 5000,
  defaultDelay:0,
  height:500
}
// var valid =   (function (iv,dv){
//   return{
//     init:function(e){
//       alert('a')
//     }
//     }
//   }());
var slider = (function() {
            return {
              sliderResponse: function (target) {
                
                slider.animate(target+1);
                //tween.restart(true);
                $(imagesString+':nth-child('+target+') > .el').each(function(index, element) {
                  $(this).attr('style',$(this).data('from'));
                });
                mask.stop(true,false).animate({'left':'-'+ imgWidth*target +'px'},300);
                triggers.removeClass('selected').eq(target).addClass('selected');
              },
              animate:function(target){
                //$(imagesString+':nth-child('+target+') > .el').attr('style','');
                $(imagesString+':nth-child('+target+') > .el').each(function(index, element) {
                  var froms = $(this).attr('data-from');
                  $(this).attr('style',froms);
                  var e = $(this).attr('data-to');
                  
                  tween = new TimelineMax();
                  var pd = e.split(";");
                  var pd1 = froms.split(";");
                  var arEnd = [];
                  var arStart = [];
                   var i =0;
                   while(i!=pd.length-1){
                     var tmp = pd[i].split(":");
                     arEnd[tmp[0]] = tmp[1];
                     i++;
                   }
                   var fi =0;
                   while(fi!=pd1.length-1){
                     var tmp = pd1[fi].split(":");
                     arStart[tmp[0]] = tmp[1];
                     fi++;
                   }
                   tween.fromTo($(this), 1,{css:arStart}, {css:
                   arEnd,
                   delay:(parseInt(($(this).hasData('delay'))?$(this).data('delay'):sliderSetting.defaultDelay)/1000),
                   onComplete:slider.completeHandler($(this),tween),
                   ease:Linear.easeNone
                 });
                  }); 
              },
              completeHandler:function(a,b){
              //  console.log($(this).attr('data-from'))
            //    a.attr('style','');
          //  var prop = 
       //   console.log(a.data('from'))
        //        b.kill()
         //       a.attr('style',a.data('from'));
              //  console.log(a.attr('style'))
              },
              
              sliderTiming :function () {
                  target = $('ul.triggers li.selected').index();
                  target === lastElem ? target = 0 : target = target+1;
                  slider.sliderResponse(target);

              },
              resetTiming:function () {
                            
                  clearInterval(timingRun);
                //  console.log(sliderSetting['slideTime'])
                  timingRun = setInterval(function() { slider.sliderTiming(); },sliderSetting['slideTime']);
              },
              fire:function(e){
                triggers.first().addClass('selected');//add slected class
                mask.width(imgWidth*(lastElem+1)); //slider container
                images.width(imgWidth);
                images.height(imgHeight);
                element.each(function(e){//apply data from properies
                  $(this).attr('style',$(this).attr('data-from'));
                })
                target = $('ul.triggers li.selected'); //selecting first element
                slider.animate(1);//begin animation with first slider
                $(window).resize(function(e){
                  slider.resize();
                })
              },
              resize:function(){
                imgWidth = (elm.data('width')=="full")?$(window).width():elm.data('width') //image width
                imgHeight = (elm.data('height')=="full")?$(window).height():elm.data('height'); //image width
                $('.anim-slider .controllers').width(imgWidth);
                images.width(imgWidth);
                images.height(imgHeight);
                images.children('img').css('minHeight','');
                $('.anim-slider').height(imgHeight);
                slider.sliderResponse($('.controllers ul li.selected').index());
              },
              ready:function(){
                $(document).ready(function(e){
                  elm=$('.anim-slider');
                  triggers = $('ul.triggers li'); // numbering buttons in bottom
                  images = $('div.slide-container > div'); // background images
                  imagesString = 'div.slide-container > div';
                  element = $('div.slide-container .el'); //animating elemenets
                  lastElem = triggers.length-1; //length of element
                  mask = $('.anim-slider div.slide-container'); //container
                  imgWidth = (elm.data('width')=="full")?$(window).width():elm.data('width') //image width
                  imgHeight = (elm.data('height')=="full")?$(window).height():elm.data('height'); //image width
                  $('.anim-slider .controllers').width(imgWidth);
                  $('.anim-slider').height($(window).height());
                  images.children('img').css('minHeight',sliderSetting['height']);
                  triggers.click(function() {
                      if ( !$(this).hasClass('selected') ) {
                          tween.kill()
                          target = $(this).index();
                          slider.sliderResponse(target);
                          slider.resetTiming();

                      }
                  });
                  $('.next').click(function() {
                      target = $('ul.triggers li.selected').index();
                      target === lastElem ? target = 0 : target = target+1;
                      slider.sliderResponse(target);
                      slider.resetTiming();
                  });
                  $('.prev').click(function() {
                      target = $('ul.triggers li.selected').index();
                      lastElem = triggers.length-1;
                      target === 0 ? target = lastElem : target = target-1;
                      slider.sliderResponse(target);
                      slider.resetTiming();
                  });
                  timingRun = setInterval(function() { slider.sliderTiming(); },sliderSetting['slideTime']);
                  slider.fire();
                })
              }
          }
    }());
     