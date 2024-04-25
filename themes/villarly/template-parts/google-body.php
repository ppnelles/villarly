<?php 
	if(get_field('gtm_code','option') && ENV_STATUS != 'dev'):
		$gtmcode = get_field('gtm_code','option');
?>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo $gtmcode ?>"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
<?php endif; ?>