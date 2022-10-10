/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */

function initFunc(){
  $(window).scroll(function() {
    if($('.Product__Info form').length){
      var top_of_element = $(".Product__Info form .ProductForm__AddToCart").offset().top;
      var bottom_of_element = $(".Product__Info form .ProductForm__AddToCart").offset().top + $(".Product__Info form .ProductForm__AddToCart").outerHeight();
      var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
      var top_of_screen = $(window).scrollTop();
      var bottom = $('.sticky-bottom');
      if ($(window).width() < 768) {
        if ((top_of_screen > bottom_of_element)){
          bottom.addClass('show');
        } else {
          bottom.removeClass('show');
        }
      }
    }
  });

  // scroll Left and right size chart
  if($('.size-chart-mbl-arrow-2').length){
    const rightBtn = document.querySelector('.size-chart-mbl-arrow-2');
    const leftBtn = document.querySelector('.size-chart-mbl-arrow-1');

    rightBtn.addEventListener("click", function(event) {
      const conent = document.querySelector('.size_chart_table.active');
      conent.scrollLeft += 300;
      event.preventDefault();
    });

    leftBtn.addEventListener("click", function(event) {
      const conent = document.querySelector('.size_chart_table.active');
      conent.scrollLeft -= 300;
      event.preventDefault();
    });
  }

  $('.close').on('click',function(){
    $('.modal').removeClass('show');
    if($('.quick_product_view').length > 0){
      $('.quick_product_view').removeClass('overflow-hidden');
    }
  });

  $('body').on('click',function(){
    $('.modal').removeClass('show');
    $('.size-chart').on('click',function(event){
      event.stopPropagation();
      if($('.quick_product_view').length > 0){
        $('.modal-size-trouser,.modal-size').attr("style", "top:"+$('.quick_product_view').scrollTop() + 'px');
        $('.quick_product_view').addClass('overflow-hidden');
      }
      if($(event.target).hasClass("trouser")){
        $('.modal-size-trouser:first').addClass('show');
      }else{
        $('.modal-size:first').addClass('show');
      }

    });
    $('.button-cm').on('click',function(event){
      event.preventDefault();
      event.stopPropagation()
      $('.button-in').removeClass('active');
      $(this).addClass('active');

      $('.size_chart_table').each(function(){
        $(this).removeClass('active');
        if($(this).hasClass('table_in_cm')){
          $(this).addClass('active');
        }
      });
      return false;
    });
    $('.button-in').on('click',function(event){
      event.preventDefault();
      event.preventDefault();
      event.stopPropagation()
      $('.button-cm').removeClass('active');
      $(this).addClass('active');

      $('.size_chart_table').each(function(){
        $(this).removeClass('active');
        if($(this).hasClass('table_in_inches')){
          $(this).addClass('active');
        }
      });
      return false;
    })
    $('.modal-inner').on('click',function(event){
      event.stopPropagation();
    });
  })

//   if(window.location.href == 'https://frenchcrown.in/'){
//     if(readCookie('f-country')){
//       if(readCookie('f-country') != 'IN'){
//         window.location.href = window.location.href.replace('frenchcrown.in', 'frenchcrown.com');
//       }
//     }else{
//       jQuery.ajax({
//         url: '/browsing_context_suggestions.json?source=locale_bar_app&currency[enabled]=true&language[enabled]=true',
//         type: 'get',
//         success: function(data){
//           var country_code = data.detected_values.country.handle;
//           writeCookie('f-country', country_code);
//           if(country_code != 'IN'){
//             window.location.href = window.location.href.replace('frenchcrown.in', 'frenchcrown.com');
//           }
//         }
//       });
//     }
//   }

  /* size popup start */
  $('[data-next-btn]').on('click', function(e){
    e.preventDefault();
    var is_size_selected = $(this).closest('.swatch').find('.swatch-lisitng .swatch-element .french-size:checked');
    if(is_size_selected.length > 0){
      $(this).closest('.swatch').addClass('hidden');
      if($(this).attr("data-ptype") == 'Shirt'){
        sleeve_array = {}
        if($(this).parents('form').length > 0){
          form = $(this).parents('form');
        }else{
          form = $(this).parents('.size-wrapper');
        }
        form.find('.product-single__variants option').each(function(el){
          if($(this).attr('data-available') == 'true'){

            var option1 = $(this).attr('data-option1');
            var option2 = "."+$(this).attr('data-option2').replace(' ', '-').toLowerCase();
            if(sleeve_array[option1]){
              sleeve_array[option1].push(option2);
            }else{
              sleeve_array[option1] = [option2];
            }
          }
        });
        form.find('.swatch:last .swatch-element').hide();
        $(sleeve_array[is_size_selected.val()].join(',')).show().removeClass('soldout');
        $(sleeve_array[is_size_selected.val()].join(',')).find('input').attr('disabled', false);
      }else if($(this).attr("data-ptype") == 'Suit' || $(this).attr("data-ptype") == 'Trenchcoat Suit'){
        pant_size_array = {}
        if($(this).parents('form').length > 0){
          form = $(this).parents('form');
        }else{
          form = $(this).parents('.size-wrapper');
        }
        form.find('.product-single__variants option').each(function(el){
          if($(this).attr('data-available') == 'true'){
            var option1 = $(this).attr('data-option1').replace(/ \/ /g, '-').toLowerCase();
            var option2 = "."+$(this).attr('data-option2').replace(/ \/ /g, '-').toLowerCase();
            if(pant_size_array[option1]){
              pant_size_array[option1].push(option2);
            }else{
              pant_size_array[option1] = [option2];
            }
          }
        });
        form.find('.swatch:last .swatch-element').hide();
        $(pant_size_array[is_size_selected.val().replace(/ \/ /g, '-').toLowerCase()].join(',')).show();
      }

      $(this).closest('form').find('[data-next]').addClass('show');
      if($('.template-product').length > 0){
        $(this).closest('.size-swatch-group').find('[data-next]').addClass('show');
      }
    }else{
      $(this).closest('.size-swatch-group').addClass('select-please');
    }
  });

  $('[data-back-btn]').on('click', function(e){
    e.preventDefault();
    var count = 0;
    $(this).closest('.swatch').find('.swatch-lisitng .swatch-element .french-size').each(function(){
      if($(this).prop( "checked") == true){
        count++;
      }
    });
    $(this).closest('.swatch').removeClass('show');
    $(this).closest('form').find('[data-firstOptoin]').removeClass('hidden');
    if($('.template-product').length > 0){
      $(this).closest('.size-swatch-group').find('[data-firstOptoin]').removeClass('hidden');
    }

  });

  /* size popup start end */
}

initFunc();

// $('body').on("click",".ProductListWrapper .quick_btn",function(){
//   var $product_url = $(this).data("url");
  
//   $('#popup-view').addClass('active-popup'); 
//   $('body').addClass("overflow-hidden");

//   $.ajax({
//     type:'GET',
//     url:$product_url,
//     beforeSend: function(){
//       $('#quick_loader').show();
//       $('#quick_view_Modal_id').hide();            
//     },
//     success:function(data){
//       $('#quick_loader').hide();
//       $('#quick_view_Modal_id').show();
//       $(".quick_product_view #quick_view_Modal_id").html($(data).find('.quick-details').html());
//       $(".quick_product_view #quick_view_Modal_id").find('.Product__SlideshowNavScroller a').removeAttr("href");
//       initFunc();
//       french__crown.ajaxAppliedJS();
//     }
//   });
// });

// $('body').on('click', '.close-popup',function() {
//   $('#popup-view').removeClass('active-popup');
//   $('body').removeClass("overflow-hidden");
//   $(".quick_product_view #quick_view_Modal_id").html("");
// });


/* blazer matching pair js start */

$(document).on('change', '.matching_pair', function(e){
  if($(this).prop('checked')){
    $('.matching-pair-section').show();
  }else{
    $('.matching-pair-section').hide();
  }
});

/* blazer matching pair js end */

/* set loader on checkout button click */
$(document).on('click', '[name=checkout]', function(event) {
  event.preventDefault();
  var checkout_btn = $(this);
  $.getJSON('/cart.js', function(cart) {
    if(cart.items.length == 1 && cart.items[0].product_id == 6724391206963){
      alert('Please add more items');
    }else{
      checkout_btn.css('padding','5px').html('<svg version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="" style="width: 50px;"><path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg>');
        window.location.href = '/checkout';
    }
  });
});

/* blog article scroll */
$(document).on('click', '.scroll-upto', function(event) {
  var scroll_upto_selector = $(this).attr('href');
  $('html, body').animate({
        scrollTop: $(scroll_upto_selector).offset().top - 200
    }, 1500);
});
/* blog article scroll end */

/* customer reviews */

if($('#shopify-section-template-all-customer-reviews').length > 0){
  $.ajax({
    url: "https://frenchcrownerp.com/api/internal/v1/customer_reviews?limit=50&page=1",
    method: "GET"
  }).done(function (response) {
    if(response['errors'] === undefined){
      $.each(response, function( index, value ) {
        if($('.reviews-api-'+value['id']).length == 0){
          review_block = '<div class="Grid__Cell 1/2--tablet 1/3--lap-and-up reviews-api-'+value['id']+'"><div class="Container" style="padding: 15px;"><img class="" src="'+value["image"]["url"]+'"></div></div>';
          $(review_block).insertBefore('.Grid__Cell[data-slide-index="3"]');
        }
      });
    }
  });
  var page = 2;
  deleteCookie("reviews-fetch")
  $(window).bind('scroll', () => {
    if(($(window).scrollTop() + $(window).height() > $(document).height() - 500) && !readCookie('reviews-fetch')) {
      writeCookie("reviews-fetch",'true');
      $.ajax({
        url: "https://frenchcrownerp.com/api/internal/v1/customer_reviews?limit=50&page="+page,
        method: "GET"
      }).done(function (response) {
        if(response['errors'] === undefined){
          $.each(response, function( index, value ) {
            if($('.reviews-api-'+value['id']).length == 0){
              review_block = '<div class="Grid__Cell 1/2--tablet 1/3--lap-and-up reviews-api-'+value['id']+'"><div class="Container" style="padding: 15px;"><img class="" src="'+value["image"]["url"]+'"></div></div>';
              $(review_block).insertAfter('#shopify-section-template-all-customer-reviews .Grid__Cell:last');
            }
          });
          page += 1;
          deleteCookie("reviews-fetch")
        }
      });
    }
  });
}

/* customer reviews end */

/* sort button popup js(This is not standard. because it should be managed from theme.js But can't figure out) */

$('[aria-controls="collection-sort-popover"]').on('click', function(){
    $('#collection-sort-popover').attr('aria-hidden', false);
});

$('#collection-sort-popover .Popover__Close, #collection-sort-popover .Popover__Value').on('click', function(){
    $('#collection-sort-popover').attr('aria-hidden', true);
});

/* sort button popup js */