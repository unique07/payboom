<?php
	if(!defined('__XE__')) exit();
	if(Context::get('module')=='admin' || Context::get('act')=='dispWidgetGenerateCodeInPage') return;

	if($called_position == 'before_display_content' && Context::getResponseMethod()=='HTML') {
		Context::set('addon_info',$addon_info);
		// 템플릿 파일 지정
		$tpl_file = 'login_2sisstore';
		$oTemplate = &TemplateHandler::getInstance();
		$output = $output.$oTemplate->compile('./addons/login_2sisstore/tpl', $tpl_file);
	}
?>