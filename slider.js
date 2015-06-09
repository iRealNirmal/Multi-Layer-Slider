var triggers,images,imagesString,element,lastElem,mask,imgWidth,target,tween,timingRun;
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
                mask.stop(true,false).animate({'left':'-'+ imgWidth*target +'px'},300);
                triggers.removeClass('selected').eq(target).addClass('selected');
              },
              animate:function(target){
                $(imagesString+':nth-child('+target+') > div').each(function(index, element) {
                  var e = ($(this).attr('data-to'));
                  var froms = ($(this).attr('data-from'));
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
                   console.log(parseInt(($(this).hasData('delay'))?$(this).data('delay'):defaultDelay)/1000)
                    TweenLite.from($(this), 2, arStart);
                    tween = TweenLite.to($(this), 1, {css:
                    arEnd,
                    delay:parseInt(($(this).hasData('delay'))?$(this).data('delay'):defaultDelay)/1000,
                    onComplete:slider.completeHandler($(this)),
                    onCompleteParams:console.log('gr'),
ease:Linear.easeNone
                  });
                  }); 
              },
              completeHandler:function(a){
                a.attr('style','');
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
                imgWidth = $(window).width(); //image width
                $('.anim-slider .controllers').width(imgWidth);
                images.width(imgWidth);
                images.children('img').css('minHeight','');
                $('.anim-slider').height(images.first().children('img').height());
                console.log($('.controllers ul li.selected').index());
                slider.sliderResponse($('.controllers ul li.selected').index());
              },
              ready:function(){
                $(document).ready(function(e){
                  triggers = $('ul.triggers li'); // numbering buttons in bottom
                  images = $('div.slide-container > div'); // background images
                  imagesString = 'div.slide-container > div';
                  element = $('div.slide-container .el'); //animating elemenets
                  lastElem = triggers.length-1; //length of element
                  mask = $('.anim-slider div.slide-container'); //container
                  imgWidth = $(window).width(); //image width
                  $('.anim-slider .controllers').width(imgWidth);
                  $('.anim-slider').height(sliderSetting['height']);
                  images.children('img').css('minHeight',sliderSetting['height']);
                  triggers.click(function() {
                      if ( !$(this).hasClass('selected') ) {
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
     