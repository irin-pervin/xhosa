console.log('all Js here')

/*
** With Slick Slider Plugin : https://github.com/marvinhuebner/slick-animation
** And Slick Animation Plugin : https://github.com/marvinhuebner/slick-animation
*/

// Init slick slider + animation
// $('.slider').slick({
//     autoplay: true,
//     speed: 800,
//     lazyLoad: 'progressive',
//     arrows: true,
//     dots: true,
//       prevArrow: '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
//       nextArrow: '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
//   }).slickAnimation();
  
  
  
//   $('.slick-nav').on('click touch', function(e) {
  
//       e.preventDefault();
  
//       let arrow = $(this);
  
//       if(!arrow.hasClass('animate')) {
//           arrow.addClass('animate');
//           setTimeout(() => {
//               arrow.removeClass('animate');
//           }, 1600);
//       }
  
//   });


// swiper 
const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
  
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  
    // Navigation arrows
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev"
    // },
  
    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar"
    }
  });
  