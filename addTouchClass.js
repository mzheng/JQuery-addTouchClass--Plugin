(function( $ ){

  $.fn.addTouchClass = function( className ) {  
	var ref = this;
     
    function onTouchLeftElement(element) {
	$(element).unbind("touchmove", onTouchMove);
	$(element).unbind("touchend", onTouchEnd);
	$(element).removeClass(className);
    }
    function onTouchCancel(e) {
      e.preventDefault();
      onTouchLeftElement(this);	
    }
    
    function onTouchStart(e) {
      e.preventDefault();
      $(this).addClass(className);
      $(this).bind('touchmove', onTouchMove);
      $(this).bind('touchend', onTouchEnd);
      $(this).bind('touchcancel', onTouchCancel);
    }
   

    function onTouchMove(e) {
       e.preventDefault();
       var originalEvent = e.originalEvent;
       var targetTouch = originalEvent.targetTouches[0];
       var theTarget = document.elementFromPoint(targetTouch.clientX, targetTouch.clientY);
       if (theTarget !== this) {
          onTouchLeftElement(this);	
       }
    }

    function onTouchEnd(e) {
      e.preventDefault();
      onTouchLeftElement(this);
    }
    
    return ref.each(function() {        
      var $this = $(this);
      $this.bind('touchstart', onTouchStart);

    });

  };
})( jQuery );
