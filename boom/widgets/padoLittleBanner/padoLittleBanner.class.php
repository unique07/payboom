<?php

class padoLittleBanner extends WidgetHandler
{
    function proc($args)
    {
        $context = new stdClass();
        $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin); // 위젯 주소

        $context->title   = $args->title;                 //제목
        $context->content = $args->content;               //내용
        $context->src     = $args->image;                 //이미지 주소
        $context->margin  = "margin-top:".$args->margin;  //위 여백
        $context->urls    = $args->urls;                  //버튼 주소
        $context->button  = $args->button;                //버튼 내용

        if(!$args->image) $context->src = $tpl_path."/img/logo.png";
        if(!$args->button) $context->button = "자세히 보기";
        if(!$args->jquery) $context->jquery = false;

        Context::set("context", $context);
        Context::set('colorset', $args->colorset);

        $tpl_file = 'padoLittleBanner';

        $oTemplate = &TemplateHandler::getInstance();
        return $oTemplate->compile($tpl_path, $tpl_file);
    }
}
?>