<!DOCTYPE html>
<html lang="en">
<!-- @Author Waqar Alamgir <waqarcs@yahoo.com> -->
<head>
	<meta charset="utf-8">
	<title>Picture Editor - HTML5</title>
	<link rel="stylesheet" href="assets/css/plugins/bootstrap.css">
	<link rel="stylesheet" href="assets/css/master-wa.css">
	<!--[if lt IE 9]>
	<script type="text/javascript" src="assets/js/plugins/excanvas.js"></script>
	<![endif]-->
	<?php
	if(isset($_GET['load']))
	{
		@session_start();
		if(isset($_SESSION['file_data']))
		{
			?>
			<script type="text/javascript">
			var jsonData = eval('(' +  "<?php echo str_replace("\n" , '' , addslashes($_SESSION['file_data']));?>" + ')' );
			</script>
			<?php
		}
	}
	?>
</head>
<body>

<script type="text/javascript">
var SITE_URL = '';
var SITE_URL_APPLICATION = '';
</script>

<div class="mainWindow">
	
	<h2><img src="assets/images/pe.gif" alt="Picture Editor" /></h2>
	
	<div class="canvasWindow">
		<canvas id="canvas" width="500" height="300"></canvas>
		<div class="buttons-positions">
			<button class="btn btn-success" id="load-draft">Load Draft</button> <button id="clear" class="btn btn-danger clear">Clear</button> <div id="loader"><img src="assets/images/ajax-loader.gif" alt="loading"/> <span>Loading</span></div>
		</div>
	</div>
	
	<div class="controlsWindow">
		<div class="controlsWindowChild">
			<ul class="nav nav-tabs">
				<li class="active"><a href="#object-compose" data-toggle="tab" id="_1">Compose</a></li>
				<li><a href="#object-controls" data-toggle="tab" id="_2">Controls</a></li>
				<li><a href="#object-export" data-toggle="tab" id="_3">Export</a></li>
				<li><a href="#canvas-settings" data-toggle="tab" id="_4">Settings</a></li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane active" id="object-compose">
					<p>
						<strong>Add image</strong>
					</p>
					<p class="image_url_p">
						<input type="text" id="image_url" class="last" placeholder="Enter image url" />
						<br/>
						<i>Paste an http url here.</i>
						<button class="btn add_image_btn" type="button">Add Image</button>
					</p>
					<br/>
					<p>
						<strong>Add text</strong>
					</p>
					<p>
						<input type="text" id="text-color" placeholder="Enter color i.e. #000" value="#000" />
						<br/>
						<select id="font-family">
							<option value="">Select font family</option>
							<option value="arial">Arial</option>
							<option value="helvetica">Helvetica</option>
							<option value="verdana">Verdana</option>
							<option value="georgia">Georgia</option>
							<option value="courier">Courier</option>
							<option value="comic sans ms">Comic Sans MS</option>
							<option value="impact">Impact</option>
							<option value="monaco">Monaco</option>
							<option value="optima">Optima</option>
						</select>
						<br/>
						<textarea id="text" placeholder="Enter text here"></textarea>
						<br/>
						<button class="btn add_text_btn" type="button" id="add-text">Add Text</button>
					</p>
				</div>
				
				<div class="tab-pane" id="object-controls">
					<p>
						<strong>Actions</strong>
					</p>
					<p>
						<button class="btn" id="remove-selected">Remove selected object/group</button>
					</p>
					<br/>
					<p>
						<strong>Z-axis</strong>
					</p>
					<p>
						<button id="send-backwards" class="btn">Send backwards</button>
						<button id="send-to-back" class="btn">Send to back</button>
						<button id="bring-forward" class="btn">Bring forwards</button>
						<button id="bring-to-front" class="btn">Bring to front</button>
					</p>
					<br/>
					<p>
						<strong>Effects</strong>
					</p>
					<p>
						<button id="shadowify" class="btn">Shadowify</button>
					</p>
					<br/>
					
					<div id="text-wrapper">
						<p>
							<strong>Edit Text</strong>
						</p>
						<p>
							<label for="text-edit">Text:</label>
							<textarea id="text-edit"></textarea>
						</p>
						<p>
							<label for="font-family-edit">Font family:</label>
							<select id="font-family-edit">
								<option value="">Select font family</option>
								<option value="arial">Arial</option>
								<option value="helvetica">Helvetica</option>
								<option value="verdana">Verdana</option>
								<option value="georgia">Georgia</option>
								<option value="courier">Courier</option>
								<option value="comic sans ms">Comic Sans MS</option>
								<option value="impact">Impact</option>
								<option value="monaco">Monaco</option>
								<option value="optima">Optima</option>
							</select>
						</p>
						<p>
							<label for="text-align-edit">Text alignment:</label>
							<select id="text-align-edit">
								<option value="">Select alignment</option>
								<option value="left">Left</option>
								<option value="center">Center</option>
								<option value="right">Right</option>
								<option value="justify">Justify</option>
							</select>
						</p>
						<p>
							<label for="text-bg-color">Background color:</label>
							<input type="text" id="text-bg-color" size="10" />
						</p>
						<p>
							<label for="text-lines-bg-color">Background text color:</label>
							<input type="text" id="text-lines-bg-color" size="10" />
						</p>
						<p>
							<label for="text-stroke-color">Stroke color:</label>
							<input type="text" id="text-stroke-color" />
						</p>
						<p>
							<label for="text-stroke-width">Stroke width:</label>
							<select id="text-stroke-width">
								<option value="">Select width</option>
								`<?php
								for($i=1; $i<=5 ; $i++)
								{
									?>
									<option value="<?php echo $i;?>"><?php echo $i;?>px</option>
									<?php
								}
								?>
							</select>
						</p>
						<p>
							<label for="text-font-size">Font size:</label>
							<select id="text-font-size">
								<option value="">Select font</option>
								<?php
								for($i=1; $i<=120 ; $i++)
								{
									?>
									<option value="<?php echo $i;?>"><?php echo $i;?>px</option>
									<?php
								}
								?>
							</select>
						</p>
						<p>
							<label for="text-line-height">Line height:</label>
							<select id="text-line-height">
								<option value="">Select height</option>
								<?php
								for($i=1; $i<=10 ; $i++)
								{
									?>
									<option value="<?php echo $i;?>"><?php echo $i;?></option>
									<?php
								}
								?>
							</select>
						</p>
						<p>
							<button type="button" class="btn" id="text-cmd-bold">Bold</button>
							<button type="button" class="btn" id="text-cmd-italic">Italic</button>
							<button type="button" class="btn" id="text-cmd-underline">Underline</button>
							<button type="button" class="btn" id="text-cmd-linethrough">Linethrough</button>
							<button type="button" class="btn" id="text-cmd-overline">Overline</button>
						</p>
					</div>
				</div>
				
				<div class="tab-pane" id="object-export">
					<p>
						<strong>Save</strong>
					</p>
					<p>
						<button class="btn btn-success" id="rasterize">PNG</button>
						<button class="btn btn-success" id="rasterize-jpeg">JPEG</button><br/>
						<i>JPEG format does not support transparency, so set background to #fff before exporting it.</i>
					</p>
					<br/>
					<p>
						<strong>Actions</strong>
					</p>
					<p>
						<button class="btn btn-success" id="rasterize-draft">Save as Draft</button>
					</p>
				</div>
				
				<div class="tab-pane" id="canvas-settings">
					<p>
						<strong>Image size</strong>
					</p>
					<p class="image_url_p">
						<input type="text" id="image_size_w" placeholder="Enter image width" value="500" />
						<br/>
						<input type="text" id="image_size_h" class="last" placeholder="Enter image height" value="300" />
						<br/>
						<i>Maximum image size can be set to 600x400.</i>
					</p>
					<br/>
					<p>
						<strong>Select Background</strong>
					</p>
					<p>
						<input type="text" id="canvas-background-picker" placeholder="Enter color i.e. #000" />
					</p>
				</div>
				
			</div>
		</div>
	</div>
	
	<form id="downloadFileForm" method="POST" action="upload.php">
		<input type="hidden" id="file_data" name="file_data" />
		<input type="hidden" id="file_type" name="file_type" />
	</form>
	
	<div class="about">
		Built using fabric.js, jquery and bootstrap by <a target="_blank" href="http://twitter.com/wajrcs">@wajrcs</a> &nbsp;.&nbsp; <a href="https://github.com/waqar-alamgir/html5-picture-editor/fork">Fork</a> &nbsp;.&nbsp; <iframe width="95px" scrolling="0" height="21px" frameborder="0" allowtransparency="true" style="margin-bottom:-6px;" src="http://ghbtns.com/github-btn.html?user=waqar-alamgir&amp;repo=html5-picture-editor&amp;type=watch&amp;count=true"></iframe>
	</div>
	
</div>
<script type="text/javascript" src="assets/js/plugins/jquery.js"></script>
<script type="text/javascript" src="assets/js/plugins/fabric.js"></script>
<script type="text/javascript" src="assets/js/pet.js"></script>
<script type="text/javascript" src="assets/js/master-wa.js"></script>
</body>
</html>