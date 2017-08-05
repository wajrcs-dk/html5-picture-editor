(function()
{
  if (document.location.hostname === 'localhost') {
	var links = document.getElementById('header').getElementsByTagName('a');
	for (var i = 0, len = links.length; i < len; i++) {
	  // very retarted fix but fuck it
	  links[i].href = links[i].href.replace('fabricjs.com', 'localhost:4000');
	}
  }
  else {
	var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
	s.async = true;
	s.src = 'http://api.flattr.com/js/0.6/load.js?mode=auto';
	t.parentNode.insertBefore(s, t);

	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
  }
})();

function clickTabs(panels , buttons , button)
{
	for(var i=0; i<panels.length ; i++)
	{
		if( button.attr('href') == '#'+panels[i].attr('id') )
		{
			panels[i].show();
		}
		else
		{
			panels[i].hide();
		}
	}
	
	for(var i=0; i<buttons.length ; i++)
	{
		if(button.attr('id') == buttons[i].attr('id'))
		{
			button.parent().addClass('active');
		}
		else
		{
			buttons[i].parent().removeClass('active');
		}
	}
}

function tabs(buttons , panels)
{
	for(var i=0; i<buttons.length ; i++)
	{
		buttons[i].bind('click' , function()
		{
			clickTabs(panels , buttons , $(this));
			return false;
		});
	}
}

$(document).ready(function()
{
	var petObj = new Pet();
	petObj.bootstrap();
	
	tabs(
		[$('#_1') , $('#_2') , $('#_3') , $('#_4')],
		[$('#object-compose') , $('#object-controls') , $('#object-export') , $('#canvas-settings')]
	);
    
    // Removes my hosting provider div
    $("body div").last().remove();
});

(function(){
  var mainScriptEl = document.getElementById('main');
  if (!mainScriptEl) return;
  var preEl = document.createElement('pre');
  var codeEl = document.createElement('code');
  codeEl.innerHTML = mainScriptEl.innerHTML;
  codeEl.className = 'language-javascript';
  preEl.appendChild(codeEl);
  document.getElementById('bd-wrapper').appendChild(preEl);
})();