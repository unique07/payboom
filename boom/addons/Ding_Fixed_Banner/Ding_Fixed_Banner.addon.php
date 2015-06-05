<?php

if(!defined('__XE__')) exit();
if($called_position == 'before_display_content' && Context::getResponseMethod()=='HTML') {
    Context::set('addon_info',$addon_info);

    // 애니메이션 기본 값.
    if(!$addon_info->animation_speed) $addon_info->animation_speed = 0x3E8;

    // z-index 기본 값.
    if(!$addon_info->z_index) $addon_info->z_index = 9999;

    // 기본 제공 버튼 사용여부.
    if(!$addon_info->default) $addon_info->default = "disabled";

    // 클래스 기본 값.
    if(!$addon_info->delete_class_name) $addon_info->delete_class_name = null;

    // 배너 기본 색.
    if(!$addon_info->default_color) $addon_info->default_color = "rgb(255,255,255)";

    // 쿠키를 사용하지 않음.
    if(!$addon_info->cookie_time) $addon_info->cookie_time = "none";

    // 위 여백 기본 값.
    if(!$addon_info->bottom_position) $addon_info->bottom_position = 0;

    // 버튼의 4방면 위치
    if($addon_info->button_multi_position){
        $addon_info->button_multi_position = explode(",", $addon_info->button_multi_position);
        $addon_info->button_multi_position = "top:".$addon_info->button_multi_position[0].
                                             ";right:".$addon_info->button_multi_position[1].
                                             ";left:".$addon_info->button_multi_position[2].
                                             ";bottom:".$addon_info->button_multi_position[3];
    }

    // 선택할 타겟.
    if(!$addon_info->target_css) $addon_info->target_css = "";

    // 선택된 타겟에 대한 css top 기본 값.
    if(!$addon_info->target_css_top) $addon_info->target_css_top = "";

    // 선택할 타겟의 기본 값.
    if(!$addon_info->inner_html) $addon_info->inner_html = "body";

    // 애니메이션 실행 여부
    if(!$addon_info->animation_dicision) $addon_info->animation_dicision = "enable";

    $tpl_file = 'Ding_Fixed_Banner';
    $oTemplate = &TemplateHandler::getInstance();
    $output = $output.$oTemplate->compile('./addons/Ding_Fixed_Banner/tpl', $tpl_file);
}

