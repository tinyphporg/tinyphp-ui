<?php if(!defined('IN_ZEROAI_VIEW_TEMPLATE')) exit('Access Denied');?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AdminLTE 3 | Dashboard</title>
<link href="/static/css/tinyphp.lib.min.css" rel="stylesheet">
<link href="/static/css/tinyphp.app.min.css" rel="stylesheet">
<link href="/static/css/admin/index.min.css" rel="stylesheet">
<!-- plugin style start -->
<link rel="stylesheet" href="/static/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
<link rel="stylesheet" href="/static/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
<link rel="stylesheet" href="/static/plugins/jqvmap/jqvmap.min.css">
<link rel="stylesheet" href="/static/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
<link rel="stylesheet" href="/static/plugins/daterangepicker/daterangepicker.css">
<link rel="stylesheet" href="/static/plugins/summernote/summernote-bs4.min.css">
<!-- plugin style end -->
<link rel="icon" href="/static/favicon.ico">
<script defer="defer" src="/static/js/tinyphp.lib.min.js"></script>
<script defer="defer" src="/static/js/tinyphp.app.min.js"></script>
<script defer="defer" src="/static/js/admin/index.min.js"></script>
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<!-- warpper start -->>
	<div class="wrapper">


		<div
			class="preloader flex-column justify-content-center align-items-center">
			<img class="animation__shake" src="/static//img/AdminLTELogo.png"
				alt="AdminLTELogo" height="60" width="60">
		</div>

		<!-- nav start -->
		<?php include $this->_getCompilePath("admin/pub/nav.htm"); ?> 
		<!-- nav end -->
		<!-- left menu start -->
		<?php include $this->_getCompilePath("admin/pub/left.htm"); ?>
        <!-- left menu end -->

<!-- conent start -->
		<div class="content-wrapper">
		
			<div class="content-header">
				<div class="container-fluid">
					<div class="row mb-2">
						<div class="col-sm-6">
							<h1 class="m-0">Dashboard</h1>
						</div>
						<div class="col-sm-6">
							<ol class="breadcrumb float-sm-right">
								<li class="breadcrumb-item"><a href="#">Home</a></li>
								<li class="breadcrumb-item active">Dashboard v1</li>
							</ol>
						</div>
					</div>
				</div>
			</div>


			<!-- content main start -->
			<section class="content">
				<div class="container-fluid">