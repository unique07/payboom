<?php
    /**
     * @class login_sunoo
     * @author sunoo (sunooky@hanmail.net)
     * @version 1.0
     * @brief 로그인 폼을 출력하는 위젯
     **/

    class login_sunoo extends WidgetHandler {

        /**
         * @brief 위젯의 실행 부분
         * ./widgets/위젯/conf/info.xml에 선언한 extra_vars를 args로 받는다
         * 결과를 만든후 print가 아니라 return 해주어야 한다
         **/
        function proc($args) {
            // 템플릿의 스킨 경로를 지정 (skin, colorset에 따른 값을 설정)
            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
            Context::set('colorset', $args->colorset);
            
            // 언어 파일 로딩
		        $lang_type = context::getLangType();
		        require('lang/'.$lang_type.'.lang.php');
		        $slang = Context::get('lang');
		        $slang->login = $lang->login;
            Context::set('lang', $slang);
            
            // 템플릿 파일을 지정
            if(Context::get('is_logged')) $tpl_file = 'sunoo_login_info';
            else $tpl_file = 'sunoo_login_form';
            
            // 로그인 위젯의 가로 크기
            $widget_info->box_width = $args->box_width;
            $widget_info->line_width = $args->line_width;
            if(!$args->box_width) $args->box_width = 170;
            if(!$args->line_width) $args->line_width = 970;
            Context::set('widget_info', $widget_info);
            
            // 테두리 유형 선택
            $widget_info->line_type = $args->line_type;
            if(!$args->line_type) $args->line_type = 'no';
            
            // 배경색 설정
            $widget_info->bg_color = $args->bg_color;
            if(!$args->bg_color) $args->bg_color = '#f9fafc';
            
            // 검색창 표시 여부
            $widget_info->search_use = $args->search_use;
            if(!$args->search_use) $args->search_use='N';
            
            // 로그인 유지 표시 여부
            $widget_info->keep_signed = $args->keep_signed;
            if(!$args->keep_signed) $args->keep_signed='N';
                        
            // 레벨 표시 여부
            $widget_info->level_use = $args->level_use;
            if(!$args->level_use) $args->level_use='N';
            
            // 포인트 표시 여부
            $widget_info->point_use = $args->point_use;
            if(!$args->point_use) $args->point_use='N';
            
            // 최근 로그인 표시 여부
            $widget_info->latest_login = $args->latest_login;
            if(!$args->latest_login) $args->latest_login='N';
            
            // 회원 관리 정보를 받음
            $oModuleModel = &getModel('module');
            $this->member_config = $oModuleModel->getModuleConfig('member');
            Context::set('member_config', $this->member_config);
            
            // ssl 사용시 현재 https접속상태인지에 대한 flag및 https url 생성
            $ssl_mode = false;
            if($this->member_config->enable_ssl == 'Y') {
                if(preg_match('/^https:\/\//i',Context::getRequestUri())) $ssl_mode = true;
            }
            Context::set('ssl_mode',$ssl_mode);

            /* 새 쪽지 */
            $oCommunicationModel = getModel('communication');
            $newMessage = $oCommunicationModel->_getNewMessage();
            
            Context::set('newMessage',$newMessage);
            
            // 템플릿 컴파일
            $oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, $tpl_file);
            
        }
        
    }
?>
