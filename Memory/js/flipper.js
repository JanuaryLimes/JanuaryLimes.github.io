/* global ie */

(function( $ ) {
 
    $.fn.flipper = function() {
        this.filter( ".flip-container" ).each(function() {
            var jThis = $( this );
			var flipper = jThis.children(".flipper");
			var widthFront = flipper.children(".front").width();
			var widthBack = flipper.children(".back").width();
			var width = jThis.hasClass("flip") ? widthFront : widthBack;

			flipper.width(width);

            jThis.toggleClass("flip");

            /*if (jThis.hasClass("flip")) {
                var frontdiv=$($(this)[0].children[0].children[0]);
                //frontdiv.css("display","none");
                setTimeout(function(){
                    frontdiv.fadeOut(100);
                },200);
            }
            else{
                var frontdiv=$($(this)[0].children[0].children[0]);
                //frontdiv.css("display","block");
                setTimeout(function(){
                    frontdiv.fadeIn(100);
                },200);
            }*/

            if(ie){
                var frontdiv=$($(this)[0].children[0].children[0]);
                //var backdiv=$($(this)[0].children[0].children[1]);

                setTimeout(function(){
                    if (frontdiv.is(":visible")){
                        frontdiv.fadeOut(100);
                    }else{
                        frontdiv.fadeIn(100);
                    }
                    
                    //frontdiv.toggle(100);
                },200);
                //if (frontdiv.) {};
            }
        });
        return this;
    };
 
}( jQuery ));