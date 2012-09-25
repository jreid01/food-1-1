(function($) {
	var methods = {
		init: function(options) {

			var defaults = {
				foo: "bar"
			}
			var opts = $.extend(defaults, options);
			
			return this.each(function() {
				// Stuff goes here.
				var $this = $(this);
				
				// etc.
				
			})
		}
	};
	
	$.fn.newPluginName = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
	    } else {
			alert( 'Method ' +  method + ' does not exist on jQuery.newPluginName' );
	    } 
	}
})(jQuery);