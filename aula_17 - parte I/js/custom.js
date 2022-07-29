// instancia jquery e evita conflitos
// jQuery( function($){

$(document).ready(function(){

   console.log('rrr')
   $(".nav-modal-open").click(function(e){
      console.log('clicado')
      e.preventDefault(); // controla o que será realizado na ação do botão

      let element = $(this).attr('rel');

      $('.modal-body').html($('#'+element).html());


   })






    $('.owl-carousel').owlCarousel();

   //  let titulos = $('h4') // tag
   
   //  let itens = $('.featured-item') // class
    
   //  let destaques = $('#featured') // id

   //  console.log(titulos.first());

   //  // Configuração de produtos

    $('.featured-item a').addClass('btn btn-dark stretch-link');

   //  $('.featured-item:first h4').append('<span class="badge bg-secondary">Novo</span>')
   //  // $('.featured-item:first h4').start('<span class="badge bg-secondary">Novo</span>')
   //  // $('.featured-item:first h4').html('<span class="badge bg-secondary">Novo</span>')
   //  // $('.featured-item:first h4').addClass('active')
   //  // $('.featured-item:first h4').removeClass('active')
   //  // $('.featured-item:first h4').toggleClass('active')
   //  // $('.featured-item:first h4').hide()
   //  // $('.featured-item:first h4').show()
   //  // $('.featured-item:first h4').fadeIn(2000)
   //  // $('.featured-item:first h4').fadeOut()
   //  //  $('.featured-item:first h4').css('color', '#f00')
     
   //   $('.featured-item h4').dblclick( function(){

   //      $(this).css({
   //          'color': '#f00',
   //          'background': '#ff0',
   //          'font-weight': '100',
   //      });

   //   });

   //   /*
   //    * Manipulação de eventos
   //    */
   //   $('.featured-item a').on('blur', function(event){

   //      event.preventDefault();

   //      alert('Produto esgotado');

   //   })
     









     

   })

//    $('.nav-link').on('click', function(e){console.log('jidjoa')
//       e.preventDefault();

//       let element = $(this).att('rel');
//       $('.modal-body').html($('#'+element).html());
//       let myModal = new bootstrap.Modal($('#myModal'));
//       myModal.show();
//   })


