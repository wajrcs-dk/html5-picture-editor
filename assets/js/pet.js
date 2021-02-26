
/**
 * Class for all kind for event binding for Pet's commands and controls
 * 
 * @Author Waqar Alamgir <waqarcs@yahoo.com>
 * @Created 23 Sep 2013
 * @Modified 25 Sep 2013
 *
 */

var MESSAGES = [
	'Fabric library is missing.',
	'Are you sure?',
	'This browser doesn\'t provide this feature',
	'Saved',
	'Post data is missing',
	'Saving draft',
	'Exporting as JPEG',
	'Exporting as PNG',
	'Loading from draft',
	'Maximum width of the image can be set to ',
	'Maximum height of the image can be set to ',
	'Value is invalid'
];

var PAGES = [
	'draft.php',
	'view.php'
];

PetUtil = function()
{
	var that = this;
	var _timer = 0;
	
	that.getRandomNum = function(min, max)
	{
		return Math.random() * (max - min) + min;
	};
	
	that.getImage = function(image)
	{
		return SITE_URL_APPLICATION + PAGES[1] + '?v=' + encodeURIComponent(image);
	};
	
	that.hideLoader = function()
	{
		$('#loader img').show();
		$('#loader').removeClass('show').find('span').text('Loading');
	};
	
	that.showLoader = function(text)
	{
		$('#loader img').show();
		$('#loader').addClass('show').find('span').text(text);
	};
	
	that.fadeOutLoader = function(text)
	{
		if(_timer)
		{
			clearTimeout(_timer);
		}
		
		$('#loader').addClass('show').find('span').text(text);
		$('#loader img').hide();
		
		_timer = setTimeout(function()
		{
			that.hideLoader();
		} , 4000);
	};
};

petUtil = new PetUtil();

Pet = function()
{
	var that = this;
	
	var _objectCompose = $('#object-compose');
	var _clear = $('#clear');
	var _rasterize = $('#rasterize');
	var _rasterizeJpeg = $('#rasterize-jpeg');
	var _rasterizeSvg = $('#rasterize-svg');
	var _rasterizeJson = $('#rasterize-json');
	var _rasterizeDraft = $('#rasterize-draft');
	var _removeSelected = $('#remove-selected');
	var _sendBackwards = $('#send-backwards');
	var _sendToBack = $('#send-to-back');
	var _bringForward = $('#bring-forward');
	var _bringToFront = $('#bring-to-front');
	var _shadowify = $('#shadowify');
	var _canvasBackgroundPicker = $('#canvas-background-picker');
	var _fontFamily = $('#font-family');
	var _imageUrl = $('#image_url');
	var _text = $('#text');
	var _canvasWindow = $('.canvasWindow');
	var _canvasDom = $('#canvas');
	var _originX = $('.origin-x');
	var _originY = $('.origin-y');
	var _complexity = $('#complexity strong');
	var _loadDraft = $('#load-draft');
	var _uploadImagePreview = $('#upload_image_preview');
	var _uploadImage = $("#upload_image");
	var _addImageBtn = 'add_image_btn';
	var _uploadImageBtn = 'upload_image_btn';
	var _addTextBtn = 'add_text_btn';
	var _downloadFileForm = $('#downloadFileForm');
	var _fileData = $('#file_data');
	var _fileType = $('#file_type');
	var _textColor = $('#text-color');
	var _imageSizeW = $('#image_size_w');
	var _imageSizeH = $('#image_size_h');
	var _textWrapper = $('#text-wrapper');
	var _canvasEle = 'canvas';
	var _textEditor = $('#text-wrapper #text-edit');
	var _cmdBoldBtn = $('#text-cmd-bold');
	var _cmdItalicBtn = $('#text-cmd-italic');
	var _cmdUnderlineBtn = $('#text-cmd-underline');
	var _cmdLinethroughBtn = $('#text-cmd-linethrough');
	var _cmdOverlineBtn = $('#text-cmd-overline');
	var _fontFamilyEdit = $('#font-family-edit');
	var _textAlignEdit = $('#text-align-edit');
	var _texBgColor = $('#text-bg-color');
	var _textLinesBgColor = $('#text-lines-bg-color');
	var _textStrokeColor = $('#text-stroke-color');
	var _textStrokeWidth = $('#text-stroke-width');
	var _textFontSize = $('#text-font-size');
	var _textLineHeight = $('#text-line-height');
	
	var _event = 'click';
	var _blur = 'blur';
	var _change = 'change';
	var _focus = 'focus';
	var _keyup = 'keyup';
	_canvasDom.attr('width', parseInt(_canvasWindow.css('width'))-2);
	_canvasDom.attr('height', parseInt($(window).height())-188);
	var _canvas = new fabric.Canvas(_canvasEle);
	var _getRandomInt = fabric.util.getRandomInt;
	
	var _canvasWidth = 500;
	var _canvasHeight = 300;
	var _canvasMaxWidth = 600;
	var _canvasMaxHeight = 400;
	
	
	that.bootstrap = function(config)
	{
		if(!fabric)
		{
			alert(MESSAGES[0]);
			return;
		}

		if(config && config.canvasWidth)
		{
			_canvasWidth = config.canvasWidth;
		}
		
		if(config && config.canvasHeight)
		{
			_canvasHeight = config.canvasHeight;
		}
		
		_leEventBinding();
		
		if(window.jsonData)
		{
			petUtil.showLoader(MESSAGES[8]);
		}
		
		setTimeout(function()
		{
			_canvas.calcOffset();
			
			if(window.jsonData)
			{
				_canvas.clear();
				_canvas.loadFromDatalessJSON(window.jsonData);
				setTimeout(function() {
					_canvasBackgroundPicker.trigger('blur');
					petUtil.hideLoader();
				} , 1000);
			}
		}, 100);
		
		_imageUrl.focus();
	};
	
	function _reAdjustCanvas()
	{
		_canvas.calcOffset();
	}
	
	function _leEventBindingMain()
	{
		_clear.bind(_event , function(event)
		{
			if( confirm(MESSAGES[1]) )
			{
				_canvas.clear();
			}
		});
		
		_loadDraft.bind(_event , function(event)
		{
			var url = SITE_URL_APPLICATION + '?load';
			window.location.href = url;
		});
	}

	function _leEventBindingCompose()
	{
		_uploadImage.change(function() {
			input = this;
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = function(e) {
					_uploadImagePreview.attr('src', e.target.result);
					var img = new Image();
					img.src = e.target.result;
					img.onload = function () {
						// var imgElement = document.getElementById('upload_image_preview');
						var imgInstance = new fabric.Image(img, {
							left: 100,
							top: 100,
							angle: 0,
							opacity: 1
						});
						_canvas.add(imgInstance);
					}

				}
				reader.readAsDataURL(input.files[0]); // convert to base64 string
			}
		});

		_objectCompose.bind(_event , function(event)
		{
			var element = event.target;
			if (element.nodeName.toLowerCase() === 'strong')
			{
		  		element = element.parentNode;
			}
			
			var className = 
			element.className,
			offset = 50,
			left = fabric.util.getRandomInt(0 + offset, _canvasWidth - offset),
			top = fabric.util.getRandomInt(0 + offset, _canvasHeight - offset),
			scale = 1;
			angle = 0;
			opacity = 1;

			if( $(element).hasClass(_addImageBtn) )
			{
				var imageUrl = _imageUrl.val();
				
				if(imageUrl != '')
				{
					imageUrl = petUtil.getImage(imageUrl);
					fabric.Image.fromURL(imageUrl , function(image)
					{
						image.set({ left:left , top:top , angle:angle , cornersize:10 });
						image.scale(scale).setCoords();
						_canvas.add(image);
					});
				}
				
				_imageUrl.val('').focus();
			}
			
			if( $(element).hasClass(_addTextBtn) )
			{
				var text = _text.val();
				var font = _fontFamily.val();
				var color = _textColor.val();
				
				if(text!='' && font !='' && color!='')
				{
					var textObject = new fabric.Text(
					text,
					{
						left: 0,
						top: 0,
						fontSize:20,
						lineHeight:1,
						fontFamily: font,
						angle: angle,
						fill: color,
						scaleX: 1,
						scaleY: 1,
						fontWeight: '',
						originX: 'left',
						hasRotatingPoint:true
					});
					_canvas.add(textObject);
					_text.val('').focus();
				}
				else if(color == '')
				{
					_textColor.focus();
				}
				else if(font == '')
				{
					_fontFamily.focus();
				}
				else if(text == '')
				{
					_text.focus();
				}
			}
			
			_reAdjustCanvas();
		});
	}
	
	function _leEventBindingExport()
	{
		_rasterize.bind(_event , function(event)
		{
			petUtil.showLoader(MESSAGES[7]);
			if (!fabric.Canvas.supports('toDataURL'))
			{
				petUtil.fadeOutLoader(MESSAGES[2]);
			}
			else
			{
				_fileData.val(_canvas.toDataURL('png'));
				_fileType.val('png');
				_downloadFileForm.submit();
				petUtil.fadeOutLoader(MESSAGES[3]);
			}
		});
		
		_rasterizeJpeg.bind(_event , function(event)
		{
			petUtil.showLoader(MESSAGES[6]);
			if (!fabric.Canvas.supports('toDataURL'))
			{
				petUtil.fadeOutLoader(MESSAGES[2]);
			}
			else
			{
				_fileData.val($('#' + _canvasEle).get(0).toDataURL('image/jpeg' , 100));
				_fileType.val('jpeg');
				_downloadFileForm.submit();
				petUtil.fadeOutLoader(MESSAGES[3]);
			}
		});
		
		_rasterizeDraft.bind(_event , function(event)
		{
			petUtil.showLoader(MESSAGES[5]);
			$.post(SITE_URL_APPLICATION + PAGES[0] , { file_data:JSON.stringify( _canvas.toDatalessJSON() ) } , function(r)
			{
				if(r == '1')
				{
					petUtil.fadeOutLoader(MESSAGES[3]);
				}
				else
				{
					petUtil.fadeOutLoader(MESSAGES[4]);
				}
			});
		});
	}
	
	function _leEventBindingControls()
	{
		_removeSelected.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			var activeGroup = _canvas.getActiveGroup();
			if (activeGroup)
			{
				var objectsInGroup = activeGroup.getObjects();
				_canvas.discardActiveGroup();
				objectsInGroup.forEach(function(object)
				{
					_canvas.remove(object);
				});
			}
			else if (activeObject)
			{
				_canvas.remove(activeObject);
			}
		});
		
		_sendBackwards.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				_canvas.sendBackwards(activeObject);
			}
		});
		
		_sendToBack.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				_canvas.sendToBack(activeObject);
			}
		});
		
		_bringForward.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				_canvas.bringForward(activeObject);
			}
		});
		
		_bringToFront.bind(_event , function(event)
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				_canvas.bringToFront(activeObject);
			}
		});
		
		_shadowify.bind(_event , function(event)
		{
			var obj = _canvas.getActiveObject();
			if (!obj) return;
			if (obj.shadow)
			{
				obj.shadow = null;
			}
			else
			{
				obj.setShadow({
					color: 'rgba(0,0,0,0.15)',
					blur: 10,
					offsetX: 6,
					offsetY: 6
				});
			}
			_canvas.renderAll();
		});
	}
	
	function _leEventBindingSettings()
	{
		_canvasBackgroundPicker.bind(_blur , function()
		{
			_canvas.backgroundColor = _canvasBackgroundPicker.val();
			_canvas.renderAll();
		});
		
		_imageSizeW.bind(_blur , function()
		{
			var w = _imageSizeW.val();
			if(!isNaN(w) && w<=_canvasMaxWidth)
			{
				_canvas.setWidth(w);
				_canvas.renderAll();
			}
			else if(!isNaN(w) && w>_canvasMaxWidth)
			{
				petUtil.fadeOutLoader(MESSAGES[9] + _canvasMaxWidth);
			}
			else
			{
				petUtil.fadeOutLoader(MESSAGES[11]);
			}
		});
		
		_imageSizeH.bind(_blur , function()
		{
			var h = _imageSizeH.val();
			if(!isNaN(h) && h<=_canvasMaxHeight)
			{
				_canvas.setHeight(h);
				_canvas.renderAll();
			}
			else if(!isNaN(h) && h>_canvasMaxHeight)
			{
				petUtil.fadeOutLoader(MESSAGES[10] + _canvasMaxHeight);
			}
			else
			{
				petUtil.fadeOutLoader(MESSAGES[11]);
			}
		});
	}
	
	function _leEventBindingSectionText()
	{
		_canvas.on('object:selected' , _onObjectSelected);
		_canvas.on('group:selected' , _onObjectSelected);
		_canvas.on('selection:cleared', function(e)
		{
			_textWrapper.hide();
		});
		
		_cmdBoldBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');
				activeObject.fontWeight ? _cmdBoldBtn.addClass('selected') : _cmdBoldBtn.removeClass('selected');
				_canvas.renderAll();
			}
		});
		
		_cmdItalicBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');
				activeObject.fontStyle ? _cmdItalicBtn.addClass('selected') : _cmdItalicBtn.removeClass('selected');
				_canvas.renderAll();
			}
		});
		
		_textEditor.bind(_focus , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				_textEditor.val(activeObject.text);
			}
		});
		
		_textEditor.bind(_keyup , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject)
			{
				if (!_textEditor.val())
				{
					_canvas.discardActiveObject();
				}
				else
				{
					activeObject.setText(_textEditor.val());
				}
				_canvas.renderAll();
			}
		});
		
		_textAlignEdit.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				var value = _textAlignEdit.val().toLowerCase();
				activeObject.textAlign = value;
				_canvas._adjustPosition && _canvas._adjustPosition(activeObject, value === 'justify' ? 'left' : value);
				_canvas.renderAll();
			}
		});
		
		_fontFamilyEdit.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.fontFamily = _fontFamilyEdit.val().toLowerCase();
				_canvas.renderAll();
			}
		});
		
		_texBgColor.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.backgroundColor = _texBgColor.val().toLowerCase();
				_canvas.renderAll();
			}
		});
		
		_textLinesBgColor.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.textBackgroundColor = _textLinesBgColor.val();
				_canvas.renderAll();
			}
		});
		
		_textFontSize.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.setFontSize(parseInt(_textFontSize.val(), 10));
				_canvas.renderAll();
			}
		});
		
		_textStrokeColor.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.stroke = _textStrokeColor.val();
				_canvas.renderAll();
			}
		});
		
		_textStrokeWidth.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.strokeWidth = parseInt(_textStrokeWidth.val(), 10);
				_canvas.renderAll();
			}
		});
		
		_textLineHeight.change(function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.setLineHeight(parseInt(_textLineHeight.val(), 10));
				_canvas.renderAll();
			}
		});
		
		_cmdUnderlineBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
				if (activeObject.textDecoration === 'underline')
				{
					_cmdUnderlineBtn.addClass('selected');
					_cmdLinethroughBtn.removeClass('selected');
					_cmdOverlineBtn.removeClass('selected');
				}
				else
				{
					_cmdUnderlineBtn.removeClass('selected');
				}
				_canvas.renderAll();
			}
		});
		
		_cmdLinethroughBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
				if (activeObject.textDecoration === 'line-through')
				{
					_cmdLinethroughBtn.addClass('selected');
					_cmdUnderlineBtn.removeClass('selected');
					_cmdOverlineBtn.removeClass('selected');
				}
				else
				{
					_cmdLinethroughBtn.removeClass('selected');
				}
				_canvas.renderAll();
			}
		});
		
		_cmdOverlineBtn.bind(_event , function()
		{
			var activeObject = _canvas.getActiveObject();
			if (activeObject && /text/.test(activeObject.type))
			{
				activeObject.textDecoration = (activeObject.textDecoration == 'overline' ? '' : 'overline');
				if (activeObject.textDecoration === 'overline')
				{
					_cmdOverlineBtn.addClass('selected');
					_cmdUnderlineBtn.removeClass('selected');
					_cmdLinethroughBtn.removeClass('selected');
				}
				else
				{
					_cmdOverlineBtn.removeClass('selected');
				}
				_canvas.renderAll();
			}
		});
	}
	
	function _onObjectSelected(e)
	{
		var selectedObject = e.target;
		if (/text/.test(selectedObject.type))
		{
			_textWrapper.show();
			_textEditor.val(selectedObject.getText());
			
			var buttons = [_textEditor , _cmdBoldBtn , _cmdItalicBtn , _cmdUnderlineBtn , _cmdLinethroughBtn , _cmdOverlineBtn];
			for(var i=0; i<buttons.length ; i++)
			{
				buttons[i].attr('class' , 'btn');
			}
			
			if(selectedObject.fontWeight === 'bold')
			{
				_cmdBoldBtn.addClass('selected');
			}
			if(selectedObject.textDecoration === 'underline')
			{
				_cmdUnderlineBtn.addClass('selected');
			}
			if(selectedObject.textDecoration === 'line-through')
			{
				_cmdLinethroughBtn.addClass('selected');
			}
			if(selectedObject.textDecoration === 'overline')
			{
				_cmdOverlineBtn.addClass('selected');
			}
			if(selectedObject.fontStyle === 'italic')
			{
				_cmdItalicBtn.addClass('selected');
			}
			if(selectedObject.fontStyle === 'italic')
			{
				_cmdItalicBtn.addClass('selected');
			}
			
			_fontFamilyEdit.val(selectedObject.get('fontFamily').toLowerCase());
			_textAlignEdit.val(fabric.util.string.capitalize(selectedObject.get('textAlign')));
			_texBgColor.val( selectedObject.get('backgroundColor') );
			_textLinesBgColor.val(selectedObject.get('textBackgroundColor'));
			_textStrokeColor.val(selectedObject.get('stroke'));
			_textStrokeWidth.val(selectedObject.get('strokeWidth'));
			_textFontSize.val(selectedObject.get('fontSize'));
			_textLineHeight.val(selectedObject.get('lineHeight'));
		}
		else
		{
			_textWrapper.hide();
		}
	}
	
	function _leEventBinding()
	{
		_leEventBindingMain();
		_leEventBindingCompose();
		_leEventBindingControls();
		_leEventBindingExport();
		_leEventBindingSectionText();
		_leEventBindingSettings();
	}
};