<?php
  /**
   * @class googlesearch
   * @author 소자네 (brz7942@nate.com)
   * @brief 구글 검색 위젯
   * @version 1.0.1
  **/
  
  class googlesearch extends WidgetHandler{
    function proc($args){

              Context::set('widget_info', $widget_info);

            // 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            Context::set('colorset', $args->colorset);

            // 템플릿 파일을 지정
            $tpl_file = 'googlesearch';

            // 템플릿 컴파일
            $oTemplate = &TemplateHandler::getInstance();
            $output = $oTemplate->compile($tpl_path, $tpl_file);
            return $output;

    }
}
?>