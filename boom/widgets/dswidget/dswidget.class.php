<?php
    /**
     * @class dswidget
     * @author xiso (jeokcho@naver.com)
     * @version 0.1
     **/

    class dswidget extends WidgetHandler {
	
		function proc($args) {
            $oModuleModel = &getModel('module');
            $config = $oModuleModel->getModuleConfig('detail_search');
			$target = $config->target;
            if(!$target) $target = 'include';
			
			if (empty($config->target_module_srl)) {
				$module_srl_list = array();
			} else {
	            $module_srl_list = explode(',',$config->target_module_srl);
			}
			
			// Set search target menus
			$oMenuAdminModel = &getAdminModel('menu');
			$oModuleModel = &getModel('module');
			
			$menu_list = $oMenuAdminModel->getMenuItems($config->search_target_menu,0)->data;
			//print_r($menu_list);
			if(is_array($menu_list)){
				foreach($menu_list as $key => $val){
					$item_mid = $oMenuAdminModel->getMenuItemInfo($val->menu_item_srl)->url;
					$module_srl = $oModuleModel->getModuleInfoByMid($item_mid)->module_srl;
					
					$condition = false;
					if($config->target_module_srl && $target == 'exclude' && !in_array($module_srl,$module_srl_list)) $condition = true;
					if($config->target_module_srl && $target == 'include' && in_array($module_srl,$module_srl_list)) $condition = true;
					if(empty($config->target_module_srl)) $condition = true;
					if($condition){
						//insert Menusrls
						$menu_srls[] = $val->menu_item_srl;
						
						//second menus
						$second_menus = $oMenuAdminModel->getMenuItems($config->search_target_menu,$val->menu_item_srl)->data;
						if(count($second_menus)){
							$menu_list[$key]->list = $second_menus;
							foreach($second_menus as $k => $v) $menu_srls[] = $v->menu_item_srl;
						}
						
						unset($second_menus);
						
					}else{
						unset($menu_list[$key]);
					}
				}
			}
			$widget_info->menu_list = $menu_list;
			$widget_info->config = $config;
			//searchtarget
			
			if(Context::get('menu_item_srls')){			
				$menu_srls = explode(",",Context::get('menu_item_srls'));
				$widget_info->menu_srls = $menu_srls;
			}

            Context::set('colorset', $args->colorset);
            Context::set('widget_info', $widget_info);

            $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);
			$oTemplate = &TemplateHandler::getInstance();
            return $oTemplate->compile($tpl_path, "content");
		}
	}
?>