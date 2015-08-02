// Copyright (c) 2015 Matthieu Harbich

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// VERSION : 0.0.1
function Klik(selecteur, width, height, position){
	var _this = this;
	_this.config = {
		'selecteur': selecteur,
		'width':width,
		'height':height,
		'position':position
	};
	_this.templates = {
    	'paper' : function (paperID) {
    		return '<div id="'+paperID+'"></div>';
    	},
    	'container': function(){
    		return "<div class='"+_this.config.selecteur.substring(1)+"'></div>";
    	},
    	'controls': function(controlsID, template){
    		if(typeof template === 'undefined'){
    			return '<div id="'+controlsID+'"><button type="button" class="play-pause">Play</button><input type="range" class="seek-bar" value="0"><button type="button" class="mute">Mute</button><input type="range" class="volume-bar" min="0" max="1" step="0.1" value="1"><button type="button" class="full-screen">Full-Screen</button></div>';
    		}else{
    			return template;
    		}
    	}
    };
    _this.css = {
    	'svg': {
    		'position': 'absolute'       		
    	},
    	'paper': {
    		'position': 'absolute',
    		'width': '100%',
    		'height':'100%',
    		'top':'0',
    		'left': '0'
    	},
    	'controls': {
    		'position':'absolute',
    		'width':'100%',
    		'height': '30px',
    		'bottom': '0'
    	},
    	'rangeBar':{
    		'width':'60%'
    	},
    	'video':{
    		'width':'100%',
    		'height':'100%',
    		'background-color':'black'
    	},
    	'zIndex':{
    		'z-index':'2147483647'
    	},
    	'center':{
    		'margin-left':'auto',
    		'margin-right':'auto'
    	},
    	'left':{
    		'margin-right':'auto'
    	},
    	'right':{
    		'margin-left':'auto'
    	}
    };	
    var element = $(_this.config.selecteur);
    _this.videoDom = element[0];
    this.createVideo();


    
};

Klik.prototype.createVideo = function(){			
	var videoDom = this.videoDom;
	var config = this.config;
	var css = this.css;
	var selecteur = this.config.selecteur;
	var zIndex = this.css.zIndex;
	var videoTemplate = this.element;					
	var container = this.templates.container();
	$(config.selecteur).attr('class', '');
	$(container).insertAfter(videoDom);
	var wrapper = $(config.selecteur);
	$(wrapper).append(videoDom);
	var autoplay = $(videoDom).attr('autoplay');
	var mute = $(videoDom).attr('mute');
	if(autoplay === 'autoplay'){
		videoDom.play();
	};
	if(mute === 'mute' || videoDom.hasAttribute('mute')){
		$(videoDom).prop('muted', true);
	};
	switch (config.position) { 
    case 'center': 
        wrapper.css(css.center);
        break;
    case 'left': 
        wrapper.css(css.left);
        break;
    case 'right': 
        wrapper.css(css.right);
        break;      
    default:
        wrapper.css(css.center);
	}
	wrapper.css('position','relative');
	$(videoDom).css(css.video);

	if(config.width === '' && $(videoDom).attr('width') === ''){
		wrapper.css('width', '100%');
	}else if(config.width){
		wrapper.css('width', config.width);
	}else{
		wrapper.css('width', $(videoDom).attr('width'));
	};

	if (config.height === '' && $(videoDom).attr('height') === '') {
		wrapper.css('height','100%');
	}else if(config.height){
		wrapper.css('height', config.height);
	}else{
		wrapper.css('height', $(videoDom).attr('height'));
	};	
	$(window).bind('mozfullscreenchange', function(e){
		var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
	    var event = state ? 'FullscreenOn' : 'FullscreenOff'; 
	    console.log(event)
	    if (event === 'FullscreenOff') {
	    	$(selecteur).children().css('z-index','');
	    }else{
	    	console.log('zindexxxxxx')
	    	$(selecteur).children().css(zIndex);
	    };  
	})
	$(videoDom).bind('webkitfullscreenchange  fullscreenchange', function(e) {
	    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
	    var event = state ? 'FullscreenOn' : 'FullscreenOff'; 
	    console.log(event)
	    if (event === 'FullscreenOff') {
	    	$(selecteur).children().css('z-index','');
	    }else{
	    	console.log('zindexxxxxx')
	    	$(selecteur).children().css(zIndex);
	    };  
	});
}

Klik.prototype.addLayer = function(){	
	return new KlikLayer(this.videoDom, this, this.config, this.css, this.templates, 'div','','');
}

Klik.prototype.addGraphicLayer = function(polyColor, polyOpacity){
	if (polyColor) {
		var color = polyColor;
	}else{
		var color = '';
	};
	if (polyOpacity) {
		var opacity = polyOpacity;
	}else{
		var opacity = 0.5;
	};
	return new KlikLayer(this.videoDom, this, this.config, this.css, this.templates, 'graphic', color, opacity);
}

Klik.prototype.setControlsTemplate = function(template){
	this.templates.controls = function(){
		return template;
	}
}


Klik.prototype.getVideoCurrentTime = function(){
	return this.videoDom.currentTime;
}

Klik.prototype.getVideoDuration = function(){
	return this.videoDom.duration;
}

Klik.prototype.getVideoElement = function(){
	return this.videoDom;
}


Klik.prototype.getVideoDimensions = function(){
	var video = $(this.videoDom).get(0);
			var dimensions = {
	        	'x':video.videoWidth,
	        	'y':video.videoHeight
	        };
	        var ratio = dimensions.x / dimensions.y;       
			var videoElementWidth = $(video).innerWidth();
			var videoElementHeight = $(video).innerHeight();

			var videoElementRatio = videoElementWidth/videoElementHeight;
			if (videoElementRatio <= ratio) {				
				var widthInPx = videoElementHeight * ratio;			
				var heightInPx = videoElementWidth/ratio;
				_this.heightInPx = heightInPx;
				_this.widthInPx = videoElementWidth;
				var dim = {
					width: videoElementWidth,
					height: heightInPx
				}
			} else{				
				var widthInPx = videoElementHeight * ratio;			
				var heightInPx = videoElementWidth/ratio;
				_this.heightInPx = videoElementHeight;
				_this.widthInPx = widthInPx;
				var dim = {
					width: widthInPx,
					height: videoElementHeight
				}
				
			};

			return dim;
}

Klik.prototype.togglePlayPause = function(){
	var video = this.videoDom;
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
	
	return false;
}

Klik.prototype.toggleMute = function(){
	var video = this.videoDom;
	if ($(video).prop('muted') === false) {
		$(video).prop('muted', true);
	} else{
		$(video).prop('muted', false);
	};	
}

Klik.prototype.toggleFullscreen = function(){
	var video = this.videoDom;
	if (!document.fullscreenElement &&    
	    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  
	    if (video.requestFullscreen) {
	        video.requestFullscreen();
	     } else if (video.msRequestFullscreen) {
	      	video.msRequestFullscreen();
	     } else if (video.mozRequestFullScreen) {
	      	video.mozRequestFullScreen();
	     } else if (video.webkitRequestFullscreen) {
	      	video.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	     }
	    } else {
	     	if (document.exitFullscreen) {
	      		document.exitFullscreen();
	     } else if (document.msExitFullscreen) {
	      		document.msExitFullscreen();
	     } else if (document.mozCancelFullScreen) {
	      		document.mozCancelFullScreen();
	     } else if (document.webkitExitFullscreen) {
	      		document.webkitExitFullscreen();
	     }
    }
}

Klik.prototype.seekBar = function(inputId){

	var video = this.videoDom;
	$(video).on('timeupdate', function(){
		var value = (100 / video.duration) * video.currentTime;
    	$(inputId).val(value);
	})

	$(inputId).on('change',function(){
		var value = $(this).val();
		var newTime = (value/100)*video.duration;
		video.currentTime = newTime;
	})
    
}

Klik.prototype.seekVolume = function(inputId){
	var video = this.videoDom;
	var position = $(inputId).val();
	var vol = position
	video.volume = vol;

	$(inputId).on('change',function(){
		var position = $(this).val();
		var vol = position
		video.volume = vol;
		
	})
}

Klik.prototype.nextFrame = function(){
	var video = this.videoDom;
	var time = video.currentTime;
	var nextTime = time + 0.25;
	video.currentTime = nextTime;
}

Klik.prototype.previousFrame = function(){
	var video = this.videoDom;
	var time = video.currentTime;
	var nextTime = time - 0.25;
	video.currentTime = nextTime;
}


Klik.prototype.setControls = function(template, callback){
	if(typeof template === 'undefined'){
		
		do {
		var controlsId =  Math.random().toString(36).substr(2, 9);
		} while ($('#' + controlsId).length != 0);
		var controls = this.templates.controls(controlsId);
		this.controlsId = controlsId;
		var video = this.videoDom;	
		$(this.config.selecteur).append(controls);
		$('#'+controlsId).css(this.css.controls);
	}else{
		var video = this.videoDom;	
		var controls = this.templates.controls('.',template);
		$(this.config.selecteur).append(controls);
		
	}
	
	
	video.ontimeupdate = function(){
		var time = video.currentTime;
		var duration = video.duration;
		var position = (time/duration)*100;
		$('#'+ controlsId + " .seek-bar").val(position);
	};
	$('#'+ controlsId + ' .volume-bar').on('change', function(){
		var position = $(this).val();
		var vol = position
		video.volume = vol; 
	});

	callback();
}


function KlikLayer(video, klik, config, css, templates, layerStyle, polyColor, polyOpacity){
	_this = this;
	this.video = video;
	this.klik = klik;
	this.config = config;
	this.css = css;
	this.templates = templates;
	this.layerEventInit = []
	this.polycolor = polyColor;
	this.opacity = polyOpacity;


	
	do {
	var paperId =  Math.random().toString(36).substr(2, 9);
	} while ($('#' + paperId).length != 0);
	this.id = paperId;
	var paper = this.templates.paper(paperId);
	this.paper = paper;
	$(this.config.selecteur).append(paper);
	if (layerStyle === 'graphic') {
		this.R = Raphael(paperId,'100%', '100%');

	};	
	$('#'+this.id).css(this.css.paper);
}

KlikLayer.prototype.stylise = function(css){
	$('#'+ this.id ).css(css);
}

KlikLayer.prototype.dynamise = function(data){
	var R = this.R;
	_this.R = this.R;
	var data = data;
	var tabIds = [];
	_this.paths = R.set();
	_this.polyPath = {};
	var video = $(this.video).get(0);


	var sortedData = data.sort(function (a, b) {
	    if (a.duration > b.duration)
	      return 1;
	    if (a.duration < b.duration)
	      return -1;
	    return 0;
	});
	for (var i = 0;  i <= sortedData[i].length - 1; i++) {
		sortedData[i].duration = Math.floor(sortedData[i].duration * 4) / 4;
		
	};



	video.onloadeddata = function(){

		var polyTimeById = {};
		var polyDataByTime = {};
		$.each(data, function (i, info) {
		    var hKey = (Math.round(info.duration * 4) / 4) * 4;
		    polyDataByTime[hKey] = {};
		    $.each(info.polygon, function (i, poly) {
		        if (!polyTimeById[poly._id]) {
		            polyTimeById[poly._id] = [];
		        }
		        polyTimeById[poly._id].push(hKey);

		        polyDataByTime[hKey][poly._id] = poly;
		        
		    });
		});

		var polyFunctXY = {};
		$.each(polyTimeById, function (id, times) {
		    polyFunctXY[id] = {
		        id: id,
		        times: times,
		        element: function(id, time){
		        	var element = {};
		        	$.each(polyDataByTime, function(t, poly){		        		
		        		if (typeof poly[id] != 'undefined') {        		
		        				element = poly[id].element;	
							};        	  	
		        })
		        	return element;	
		    	},
		        pointsAt: function (time) {

		            //time = (Math.round(time * 4) / 4) * 4;
		            // si le temps n'est pas dans l'intervalle d'apparition du poly
		            // on fixe x = undefined pour indiquer qu'il n'est pas à l'écran
		            if (time < this.times[0] || time > this.times[this.times.length -1]) {
		                return undefined;
		            }
		            // Récup le temps précédent et le temps suivant ou on a de l'info
		            var prevInd = 0;
		            while (this.times[prevInd] && time >= this.times[prevInd]) {
		                prevInd++;
		            }
		            var prevTime = this.times[prevInd - 1];
		            var nextInd = this.times.length - 1;
		            while (this.times[nextInd] && time <= this.times[nextInd]) {
		                nextInd--;
		            }
		            var nextTime = this.times[nextInd + 1];
		            var intervalTime = nextTime - prevTime;
		            // cas particulier du meme temps pour le prev et le next
		            if (intervalTime == 0) {
		                return polyDataByTime[prevTime][this.id].points;
		            }
		            // Pour chaque points du départ, calcul la pos actuelle
		            var points = [];
		            var nextPoints = polyDataByTime[nextTime][this.id].points;

		            $.each(polyDataByTime[prevTime][this.id].points, function (i, point) {
		                // Cas particulier du point qui disparaitrait au points suivant
		                if (!nextPoints[i]) {
		                    points.push({
		                       id: point.id,
		                       x: point.x,
		                       y: point.y
		                    });
		                // Calcul du "tweening"
		                } else {
		                    points.push({
		                        id: point.id,
		         
		                        x: point.x + ((nextPoints[i].x - point.x) / intervalTime) * (time - prevTime),
		                        y: point.y + ((nextPoints[i].y - point.y) / intervalTime) * (time - prevTime)
		                    });
		                }
		            })
		            return points;
		        }
		    }
		});
		// Insertion des données des polygones au format "klik.js" contenues dans data
		// 0 -> 0 seconde de la vidéo
		// 1 -> 0.25 de seconde de la vidéo
		// 2 -> 0.5 seconde de la vidéo
		// ...
		// 5 -> 1,25 seconde de la vidéo
		// ...

		var hTime = [];
		for (var time = 0;  time <= video.duration * 4; time++) {
		    hTime[time] = [];
		    $.each(polyTimeById, function (id, times) {
		    
		        var points = polyFunctXY[id].pointsAt(time);
		        var element = polyFunctXY[id].element(id, time);
		        
		        if (points) {

		            hTime[time].push({
		                id: id,
		                element: element,
		                points: points
		            });
		        }
		    });
		}
		console.log(hTime)
		_this.hTime = hTime;	
		var lastTime = -1;
		$(video).on('timeupdate', function () {
			var videoTime = Math.floor(this.currentTime * 4) / 4;
			_this.videoTime = videoTime;
		    if (lastTime === videoTime) {return};
		 	lastTime = videoTime;
		 	KlikLayer.prototype.drawPolygones(hTime[videoTime*4]);
		});
	}	

	this.video.onplay = function(){
		_this.paths.resume();
	}

	function isInArray(value, array) {
	  return array.indexOf(value) > -1;
	}
	function containsObject(obj, list) {
	    var i;
	    for (i = 0; i < list.length; i++) {
	        if (list[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	}
	return _this.polyPath;
}

KlikLayer.prototype.drawPolygones = function(polys){
	_this.R.clear();
	$.each(polys, function(i, poly){
			var pointsPercentage = [];
			$.each(poly.points, function(j, point){
				pointsPercentage.push(point);
			});
			var pointsInPx = KlikLayer.prototype.pointsInPxConverter(pointsPercentage);
			var coordinatesString = '';
			$.each(pointsInPx, function(k, point){
				var ptn = point.x + ','+point.y+' ';
				coordinatesString += ptn;
			});
			var path = getPath(coordinatesString);		
			_this.polyPath = new KlikPath(_this.R, poly, _this.video, _this.layerEventInit);
			console.log(_this)
			_this.polyPath.attr('path',path).attr('fill','red').attr('fill-opacity',0).attr('stroke-width', 0);
				

	})

	function getPath(points){
		_this.convertedPath = points.replace(/([0-9.]+),([0-9.]+)/g, function($0, x, y) {
		    return 'L ' + Math.floor(x) + ' ' + Math.floor(y);
		}).replace(/^L/, 'M');
		return _this.convertedPath;
	}; 
}

KlikLayer.prototype.drawAndAnimatePolygone = function(R, object, polygon, polyPath, nextObject, nextPolygon){
	var polyPath = polyPath;
	var pointsPercentage = [];
	var nextPointsPercentage = [];
	var nextObject = nextObject;
	var nextPolygon = nextPolygon;

	for (var k = 0; k <= polygon.points.length - 1; k++) {
		pointsPercentage.push(polygon.points[k]);
	};
	for (var i = 0; i <= nextPolygon.points.length - 1; i++) {
		nextPointsPercentage.push(nextPolygon.points[i]);
	};
	var pointsInPx = this.pointsInPxConverter(pointsPercentage);
	var nextPointsInPx = this.pointsInPxConverter(nextPointsPercentage);
	var coordinatesString = '';
	var nextCoordinatesString = '';
	for (var l = 0; l <= pointsInPx.length - 1; l++) {
		var ptn = pointsInPx[l].x + ','+pointsInPx[l].y+' ';
		coordinatesString += ptn;
	};
	for (var l = 0; l <= nextPointsInPx.length - 1; l++) {
		var ptn = nextPointsInPx[l].x + ','+nextPointsInPx[l].y+' ';
		nextCoordinatesString += ptn;
	};
	var path = getPath(coordinatesString);
	var nextPath = getPath(nextCoordinatesString);

	var animDuration = (nextObject.duration - object.duration)*1000;
	polyPath.attr('path',path).attr('fill','black').attr('fill-opacity',0.6).attr('stroke-width', 0);


	function getPath(points){
		_this.convertedPath = points.replace(/([0-9.]+),([0-9.]+)/g, function($0, x, y) {
		    return 'L ' + Math.floor(x) + ' ' + Math.floor(y);
		}).replace(/^L/, 'M');
		return _this.convertedPath;
	}; 
}

KlikLayer.prototype.pointsInPxConverter = function(pointsPercentage){			
	_this.points = [];
	for (var i = 0;  i <= pointsPercentage.length - 1; i++) {
		var xPx = (pointsPercentage[i].x/100)*_this.widthInPx;
		var yPx = (pointsPercentage[i].y/100)*_this.heightInPx;
		_this.points.push({'x':xPx, 'y': yPx})
	};
	return _this.points;			
};

KlikLayer.prototype.updateToScreen = function(){
	KlikLayer.prototype.drawPolygones(_this.hTime[_this.videoTime*4]);
}



KlikLayer.prototype.adaptToVideo = function(){
	var video = $(this.video).get(0);
	var paper = $(this.paper);
	if(video.readyState === 4){
			var dimensions = {
	        	'x':video.videoWidth,
	        	'y':video.videoHeight
	        };
	        var ratio = dimensions.x / dimensions.y;       
			var videoElementWidth = $(video).innerWidth();
			var videoElementHeight = $(video).innerHeight();

			var videoElementRatio = videoElementWidth/videoElementHeight;
			if (videoElementRatio <= ratio) {				
				var widthInPx = videoElementHeight * ratio;			
				var heightInPx = videoElementWidth/ratio;
				_this.heightInPx = heightInPx;
				_this.widthInPx = videoElementWidth;
				var heightInPercent = (heightInPx/videoElementHeight)*100;
				var marginTop = (100 - heightInPercent)/2;
				var selectorDiv = $('#'+paper.attr('id'));
				selectorDiv.css('width', '100%');
				selectorDiv.css('height', heightInPercent +'%');
				selectorDiv.css('left', '0%');
				selectorDiv.css('top', marginTop + '%'); 
			} else{				
				var widthInPx = videoElementHeight * ratio;			
				var heightInPx = videoElementWidth/ratio;
				_this.heightInPx = videoElementHeight;
				_this.widthInPx = widthInPx;
				var widthInPercent = (widthInPx/videoElementWidth)*100;
				var marginLeft = (100 - widthInPercent)/2;
				var selectorDiv = $('#'+paper.attr('id'));
				selectorDiv.css('height','100%');
				selectorDiv.css('width', widthInPercent + '%');
				selectorDiv.css('left', marginLeft + '%');
				selectorDiv.css('top', '0');
			};
		}else{
		video.onloadedmetadata = function(){
	        var dimensions = {
	        	'x':video.videoWidth,
	        	'y':video.videoHeight
	        };
	        var ratio = dimensions.x / dimensions.y; 
			var videoElementWidth = $(video).innerWidth();			
			var videoElementHeight = $(video).innerHeight();			
			var videoElementRatio = videoElementWidth/videoElementHeight;
			if (videoElementRatio <= ratio) {	
				var widthInPx = videoElementHeight * ratio;			
				var heightInPx = videoElementWidth/ratio;
				_this.heightInPx = heightInPx;
				_this.widthInPx = videoElementWidth;
				var heightInPercent = (heightInPx/videoElementHeight)*100;
				var marginTop = (100 - heightInPercent)/2;
				var selectorDiv = $('#'+paper.attr('id'));
				selectorDiv.css('width', '100%');
				selectorDiv.css('height', heightInPercent +'%');
				selectorDiv.css('left', '0%');
				selectorDiv.css('top', marginTop + '%'); 
			} else{
				var widthInPx = videoElementHeight * ratio;
				var heightInPx = videoElementWidth/ratio;
				_this.widthInPx = widthInPx;
				_this.heightInPx = videoElementHeight;
				var widthInPercent = (widthInPx/videoElementWidth)*100;
				var marginLeft = (100 - widthInPercent)/2;
				var selectorDiv = $('#'+paper.attr('id'));
				selectorDiv.css('height','100%');
				selectorDiv.css('width',widthInPercent + '%');				
				selectorDiv.css('left', marginLeft + '%');
				selectorDiv.css('top', '0');
			};
		}
	}	
}

function KlikPath(R, polygon, video, layersId){
	var _that = this;
	this.video = video;
	_that.polygon = polygon;
	this.R = R;
	this.layersId = layersId;

	var polyPath = R.path('');
	var layerId = 'ivarqt2sa';
	polyPath.node.id = polygon.id+'poly';
	var triggerEvent = polygon.element.triggerEvent;
	var dataAction = polygon.element.dataAction;
	
	$('#'+polygon.id+'poly').on(triggerEvent, function(){
		_that[dataAction]();
	})

	return polyPath;
	
}






