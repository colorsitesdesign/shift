// canvas is the canvas obj, context is the content obj and data is the raw image data;
var shift = {
    // Global Variables
    canvas: "",
    context: "",
    image: new Image(),
    current: "",    
    // These are the basic functions of the plugin
    base: function(id,src){
        shift.canvas = document.getElementById(id);
        shift.context = shift.canvas.getContext("2d");
        shift.context.clearRect(0, 0, shift.canvas.width, shift.canvas.height);
        shift.image.src = src;
        shift.context.drawImage(shift.image,0,0);
    },
    getImageData: function(){
        shift.current = shift.context.getImageData(0, 0, shift.image.width, shift.image.height);
        return shift.current;
    },
    draw: function(data,x,y){
        shift.context.putImageData(data, 0, 0);
    },
    //These are the actual working filters that are used
    baw:function(){
		var tmp = shift.getImageData;
		for(var i = 0; i < tmp.length; i += 4) {
			var brightness = 0.34 * tmp[i] + 0.5 * tmp[i + 1] + 0.16 * tmp[i + 2];
			tmp[i] = brightness;
			tmp[i + 1] = brightness;
			tmp[i + 2] = brightness;
		}
		shift.draw(tmp,0,0);
	},
    dark:function(adjustment){
		var tmp = shift.getImageData;
		for (var i = 0; i < tmp.length; i += 4) {
			 var red = tmp[i+0] = tmp[i+0] - adjustment; // red
		     var green = tmp[i+1] = tmp[i+1] - adjustment; // green
		     var blue = tmp[i+2] = tmp[i+2] - adjustment; 
		}
		shift.draw(tmp,0,0);
	},
    neg:function(adjustment){
        var temp = shift.context.getImageData(0, 0, shift.image.width, shift.image.height);
        var data = temp.data;
		for (var i = 0; i < data.length; i += 4) {
			data[i] = adjustment - data[i];
			data[i + 1] = adjustment - data[i + 1];
			data[i + 2] = adjustment - data[i + 2];
		}
        temp.data = data;
        shift.draw(temp,0,0);
	},
    sep:function(){
        var temp = shift.context.getImageData(0, 0, shift.image.width, shift.image.height);
        var data = temp.data;
		for (var i = 0; i < data.length; i += 4) {
			var r = data[i + 0];
		    var g = data[i + 1];
		    var b = data[i + 2];
			data[i + 0] = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
		    data[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
		    data[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
		}
        temp.data = data;
		shift.draw(temp,0,0);
	},
    solarize: function(){
        var temp = shift.context.getImageData(0, 0, shift.image.width, shift.image.height);
        var data = temp.data;
		for (var i = 0; i < data.length; i += 4) {
			var r = data[i];
		    var g = data[i + 1];
		    var b = data[i + 2];
		    var a = data[i + 3];
		    if (r > 127) r = 255 - r;
			if (g > 127) g = 255 - g;
			if (b > 127) b = 255 - b;
			data[i]     = r; // red
		    data[i + 1] = g; // green
		    data[i + 2] = b; // blue
		}
		temp.data = data;
		shift.draw(temp,0,0);
	},
    convolute:function(weights){
		var tmp = shift.getImageData;
		// [ 0, -1, 0, -1, 5, -1, 0, -1, 0];
		var side = Math.round(Math.sqrt(weights.length));
		var halfSide = Math.floor(side/2);
		var src = tmp.data;
		var sw = tmp.width;
		var sh = tmp.height;
		var w = sw;
		var h = sh;
		var opaque = 127;
		var alphaFac = opaque ? 1 : 0;
		for (var y=0; y<h; y++) {
			for (var x=0; x<w; x++) {
				var sy = y;
				var sx = x;
				var r=0, g=0, b=0, a=0;
				for (var cy=0; cy<side; cy++) {
					for (var cx=0; cx<side; cx++) {
						var scy = sy + cy - halfSide;
						var scx = sx + cx - halfSide;
						if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
							var srcOff = (scy*sw+scx)*4;
							var wt = weights[cy*side+cx];
							r += src[srcOff] * wt;
							g += src[srcOff+1] * wt;
							b += src[srcOff+2] * wt;
							a += src[srcOff+3] * wt;
						}
					}
				}
				tmp[i]     = r; // red
			    tmp[i + 1] = g; // green
			    tmp[i + 2] = b; // blue
				tmp[i + 3] = a + alphaFac*(255-a);
			}
		}
		shift.draw(tmp,0,0);
	},
    
    

};