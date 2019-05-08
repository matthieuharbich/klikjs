# klikjs -  small JavaScript library to enable interactivity to your html5 videos

Klikjs is a library enabling interactivity in html5 videos

Demo: [http://klikjs.ch](http://klikjs.ch)

You can click on the white shirt whenever you want!. Sorry for the encoding and no css :). But it works!

Only tested on chrome, implemented in 10 minutes. 

## Get started
### your html5 video
This is your html5 video in your html file:
```html
<video class="klik" width="" height="">
	  <source src="yourVideo.mp4" type="video/mp4">
	   Your browser does not support the video tag.
</video>
```

And this is how easy it is to make it a klik video in your JavaScript file:
```js
var klikVideo = new Klik('.klik');
```

## Dependences
- Jquery.js
- Raphaël.js

## Documentation
### [Klik](#Klik\(selector,\ width,\ height,\ position\))
- addLayer() {: #addLayer}
- [addGraphicLayer()](#addGraphicLayer\(\))
- [setControls()](#setControls())
- [togglePlayPause()](#togglePlayPause())
- [toggleMute()](#toggleMute())
- [toggleFullscreen()](#toggleFullscreen())
- [seekBar()](#seekBar())
- [seekVolume()](#seekVolume())
- [getVideoElement()](#getVideoElement())
- [getVideoDuration()](#getVideoDuration())
- [getVideoCurrentTime()](#getVideoCurrentTime())
- [getVideoDimensions()](#getVideoDimensions())
### KlikLayer
- [stylise()](#stylise())
- [dynamise()](#dynamise())
- [adaptToVideo()](#adaptToVideo())


## Klik(selector, width, height, position)
### Parameters
- Selector: (required) String
  - Id or Class pointing to your HTML5 video element
- Width: (optional) String OR Number
  - Width of your video element if not defined in your element. (Default: 100%)
- Height: (optional) String OR Number
  - Height of your video element if not defined in yout element. (Default: 100%)
- Position: (optional) String
  - "left" or "center" (by default) or "right" - It defines the position of your video element in its container.
### Example
```js
// Include scripts in your code
	var klik = new Klik('.video');
//To set your video and its parameters
	klik.createVideo();
```
## addLayer() 

## addGraphicLayer()
## addLayer()
## addLayer()
## addLayer()
## addLayer()
produces:


and we can even [link](#head1234) to it so:

[Some text](#Documentation)