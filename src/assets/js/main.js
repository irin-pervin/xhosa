

(function ($) {
  'use strict';

  var gmTm = {
      m: function (e) {
          gmTm.d();
          gmTm.methods();
      },
      d: function (e) {
          this._window = $(window),
          this._document = $(document),
          this._body = $('body'),
          this._html = $('html')
      },
      methods: function (e) {
          gmTm.swiperJs();
          gmTm.imageDrag();
          gmTm.odoMeter();
          gmTm.tickerWrapper();
      
          
       
      },


      // counter up
      swiperJs: function (e) {
        
        $(document).ready(function () {
          var mySwiper = new Swiper ('.mySwiper-banner', {
              // If we need pagination
              effect: 'fade',
              loop:true,
              pagination: {
                el: '.swiper-pagination',
                      clickable: true,
              },
              autoplay: {
                  delay: 5000,
              },
              speed:800,
              // Navigation arrows
              navigation: true,
          })
        });

        $(document).ready(function () {
            // swiper 
            const swiper = new Swiper(".swiper", {
              // Optional parameters
              direction: "horizontal",
              loop: true,
              autoplay: true,
              speed: 3000,

              // If we need pagination
              pagination: {
                el: ".swiper-pagination",
                clickable: true
              },
            });
        });

         // Start swiper card slider industry services
        $(document).ready(function () {
          const sectionsWithCarousel = document.querySelectorAll(
            ".section-with-carousel"
          );
          
          createOffsets();
          window.addEventListener("resize", createOffsets);
          
          function createOffsets() {
            const sectionWithLeftOffset = document.querySelector(
              ".section-with-left-offset"
            );
            const sectionWithLeftOffsetCarouselWrapper = sectionWithLeftOffset.querySelector(
              ".carousel-wrapper"
            );
           
            
            const offset = (window.innerWidth - 1100) / 2;
            const mqLarge = window.matchMedia("(min-width: 1200px)");
          
            if (sectionWithLeftOffset && mqLarge.matches) {
              sectionWithLeftOffsetCarouselWrapper.style.marginLeft = offset + "px";
            } else {
              sectionWithLeftOffsetCarouselWrapper.style.marginLeft = 0;
            }
          
          }
          
          for (const section of sectionsWithCarousel) {
            let slidesPerView = [1.5, 2.5, 3.5];
            if (section.classList.contains("section-with-left-offset")) {
              slidesPerView = [1.5, 1.5, 2.5];
            }
            const swiper = section.querySelector(".swiper");
            new Swiper(swiper, {
              slidesPerView: slidesPerView[2],
              spaceBetween: 15,
              loop: true,
              autoplay: false,
              speed: 3000,
              lazyLoading: false,
              keyboard: {
                enabled: true
              },
              navigation: {
                prevEl: section.querySelector(".carousel-control-left"),
                nextEl: section.querySelector(".carousel-control-right")
              },
              pagination: {
                el: section.querySelector(".oil-industry-pagination"),
                clickable: true,
                renderBullet: function (index, className) {
                  return `<div class=${className}>
                      <span class="number">${index + 1}</span>
                      <span class="line"></span>
                  </div>`;
                }
              },
              breakpoints: {
                768: {
                  slidesPerView: slidesPerView[1]
                },
                1200: {
                  slidesPerView: slidesPerView[2]
                }
              }
            });
          }
          
      });

        $(document).ready(function () {
          const swiper = new Swiper(".swiper-projects", {
            // Optional parameters
            direction: "horizontal",
            autoplay: {
              delay: 5000
            },
            loop: true,
          
            effect: "fade",
            fadeEffect: {
              crossFade: true
            },
          
            // If we need pagination
            pagination: {
              el: ".swiper-pagination",
              type: "bullets",
              clickable: true
            },
          
            // Navigation arrows
            navigation: {
              nextEl: ".kanan",
              prevEl: ".kiri"
            }
          });
          
      });

        $(document).ready(function () {
        
          var sliderThumbs = new Swiper(".mySwiper-projects-two", {
            spaceBetween: 10,
            slidesPerView: 2,
            // parallax: true,
            autoplay: true,
            speed: 1000,
            touchRatio: 0.2,
            slideToClickedSlide: true,
            loop: true,
            loopedSlides: 4,
            navigation: {
              nextEl: '.upk-button-next',
              prevEl: '.upk-button-prev',
              },
              breakpoints: {
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
              },
              // when window width is >= 480px
              768: {
                slidesPerView: 1.5,
              },
              // when window width is >= 640px
              1024: {
                slidesPerView: 2,
              }
              }
            });
            
            var mainSlider = new Swiper(".mySwiper-projects-three", {
            autoplay: true,
            parallax: true,
            effect: 'fade',
            speed: 1000,
            loop: true,
            loopedSlides: 4,
            pagination: {
              el: '.swiper-pagination',
                clickable: true,
              // dynamicBullets: true,
              renderBullet: function(index, className) {
                return '<span class="' + className + ' swiper-pagination-bullet--svg-animation"><svg width="26" height="26" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="12" fill="none" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="6" stroke-width="3"></circle></svg></span>';
              },
            },
            });

          mainSlider.controller.control = sliderThumbs;
          sliderThumbs.controller.control = mainSlider;
          
      });


          // Start swiper Gas Industry
      $(document).ready(function () {
        
            // HERO SLIDER
            var menu = [];
            jQuery('.swiper-slide').each( function(index){
                menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
            });
            var interleaveOffset = 0.5;
            var swiperOptions = {
                loop: true,
                speed: 1000,
                parallax: true,
                // autoplay: {
                //     delay: 6500,
                //     disableOnInteraction: false,
                // },
                watchSlidesProgress: true,
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: false,
                // },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                on: {
                    progress: function() {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slideProgress = swiper.slides[i].progress;
                            var innerOffset = swiper.width * interleaveOffset;
                            var innerTranslate = slideProgress * innerOffset;
                            swiper.slides[i].querySelector(".slide-inner").style.transform =
                            "translate3d(" + innerTranslate + "px, 0, 0)";
                        }      
                    },

                    touchStart: function() {
                      var swiper = this;
                      for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                      }
                    },

                    setTransition: function(speed) {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + "ms";
                            swiper.slides[i].querySelector(".slide-inner").style.transition =
                            speed + "ms";
                        }
                    }
                }
            };

            var swiper = new Swiper(".swiper-container", swiperOptions);

            // DATA BACKGROUND IMAGE
            var sliderBgSetting = $(".slide-bg-image");
            sliderBgSetting.each(function(indx){
                if ($(this).attr("data-background")){
                    $(this).css("background-image", "url(" + $(this).data("background") + ")");
                }
            });

      });

    
      },


      // counter up
      imageDrag: function (e) {
        // portfolio 
        $(window).on("load", function() {

          var $landingWrapper = $(".landing-wrapper"),
              $landingInnerContent = $(".landing-inner-content");
        
          // scroll left and right
          $landingInnerContent.on("mousemove touchmove", function(e) {
            if (e.clientX > $landingWrapper.width() / 2) {
              TweenMax.to($landingWrapper, 2, {
                scrollTo: {
                  x: "+=175"
                },
                ease: Power2.easeOut
              });
            } else {
              TweenMax.to($landingWrapper, 2, {
                scrollTo: {
                  x: "-=175"
                },
                ease: Power2.easeOut
              });
            }
          });
        
        });
      },

      odoMeter : function (e){
          // Options for first odometer
          let num1 = 2200;
          const od1 = new Odometer({
            el: document.getElementById("odometer1"),
            format: "(,ddd).dd",
            duration: 1000,
            theme: "default"
          });
          od1.render();

          // Options for second odometer
          let num2 = 240;
          const od2 = new Odometer({
            el: document.getElementById("odometer2"),
            format: "(,ddd).dd",
            duration: 1000,
            theme: "default"
          });
          od2.render();


          // Options for third odometer
          let num3 = 2330;
          const od3 = new Odometer({
            el: document.getElementById("odometer3"),
            format: "(,ddd).dd",
            duration: 1000,
            theme: "default"
          });
          od3.render();
          
          // Initial Animation for both odometers
          setTimeout(function () {
            od1.update(num1);
            od2.update(num2);
            od3.update(num3);
     
          }, 100);

      },



    tickerWrapper : function (e){

      // slider practise 
var $tickerWrapper = $(".tickerwrapper");
var $list = $tickerWrapper.find("ul.list");
var $clonedList = $list.clone();
var listWidth = 12;
    $list.find("li").each(function (i) {
      listWidth += $(this, i).outerWidth(true);
    });

var endPos = $tickerWrapper.width() - listWidth;

$list.add($clonedList).css({
  "width" : listWidth + "px"
});

$clonedList.addClass("cloned").appendTo($tickerWrapper);

//TimelineMax
var infinite = new TimelineMax({force3D:true, repeat: -1, paused: false});
var time = 20;

infinite.fromTo($list, time, {x:0}, {x: -listWidth, ease: Linear.easeNone}, 0);
infinite.fromTo($clonedList, time, {x:listWidth}, {x:0, ease: Linear.easeNone}, 0);
infinite.set($list, {x: listWidth});
infinite.to($clonedList, time, {x: -listWidth, ease: Linear.easeNone}, time);
infinite.to($list, time, {x: 0, ease: Linear.easeNone}, time);

//Pause/Play
        
$tickerWrapper.on("mouseenter", function(){
  infinite.pause();
}).on("mouseleave", function(){
  infinite.play();
});


    },


  }

  gmTm.m();
})(jQuery, window) 





