<?php
    /**
     * @class  detail_searchView
     * @author Xiso(jeokcho@naver.com)
     * @brief view class of the detail_search module
     *
     * Search Output
     *
     **/

    class detail_searchView extends detail_search {

        var $target_mid = array();
        var $skin = 'default';

        /**
         * @brief Initialization
         **/
        function init() {
        }

        /**
         * @brief Search Result
         **/
        function DS() {
            $oFile = &getClass('file');
            $oModuleModel = &getModel('module');
            // Check permissions
            if(!$this->grant->access) return new Object(-1,'msg_not_permitted');

            $config = $oModuleModel->getModuleConfig('detail_search');
			$config->view_result = unserialize($config->view_result);
			Context::set('config',$config);
			
            if(!$config->skin) $config->skin = 'default';
            Context::set('module_info', unserialize($config->skin_vars));
            $this->setTemplatePath($this->module_path."/skins/".$config->skin."/");

            $target = $config->target;
            if(!$target) $target = 'include';
			
			if (empty($config->target_module_srl))
				$module_srl_list = array();
			else
	            $module_srl_list = explode(',',$config->target_module_srl);
				
			// Set search target menus
			$oMenuAdminModel = &getAdminModel('menu');
			$oModuleModel = &getModel('module');
			
			$menu_list = $oMenuAdminModel->getMenuItems($config->search_target_menu,0)->data;
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
			Context::set('menu_list',$menu_list);
			
			//searchtarget
			
			if(Context::get('menu_item_srls')){			
				$menu_srls = explode(",",Context::get('menu_item_srls'));
				Context::set('menu_srls',$menu_srls);
			}
			
			foreach($menu_srls as $key => $val){
				//getMid
				$item_mid = $oMenuAdminModel->getMenuItemInfo($val)->url;
				//getModuleSrl
				$module_srl_list[] = $oModuleModel->getModuleInfoByMid($item_mid)->module_srl;
			}
			
			//changeTarget
			$target = 'include';
            // Set a variable for search keyword
            $is_keyword = Context::get('is_keyword');
            // Set page variables
            $page = (int)Context::get('page');
            if(!$page) $page = 1;
            // Search by search tab
            $where = Context::get('where');
            // Create integration search model object 
            if($is_keyword) {
                $oIS = &getModel('integration_search');
                switch($where) {
                    case 'document' :
                            $search_target = Context::get('search_target');
                            if(!in_array($search_target, array('title','content','title_content','tag'))) $search_target = 'title';
                            Context::set('search_target', $search_target);

                            $output = $oIS->getDocuments($target, $module_srl_list, $search_target, $is_keyword, $page, 10);
                            Context::set('output', $output);
                            $this->setTemplateFile("document", $page);
                        break;
                    case 'comment' :
                            $output = $oIS->getComments($target, $module_srl_list, $is_keyword, $page, 10);
                            Context::set('output', $output);
                            $this->setTemplateFile("comment", $page);
                        break;
                    case 'trackback' :
                            $search_target = Context::get('search_target');
                            if(!in_array($search_target, array('title','url','blog_name','excerpt'))) $search_target = 'title';
                            Context::set('search_target', $search_target);

                            $output = $oIS->getTrackbacks($target, $module_srl_list, $search_target, $is_keyword, $page, 10);
                            Context::set('output', $output);
                            $this->setTemplateFile("trackback", $page);
                        break;
                    case 'multimedia' :
                            $output = $oIS->getImages($target, $module_srl_list, $is_keyword, $page,20);
                            Context::set('output', $output);
                            $this->setTemplateFile("multimedia", $page);
                        break;
                    case 'file' :
                            $output = $oIS->getFiles($target, $module_srl_list, $is_keyword, $page, 20);
                            Context::set('output', $output);
                            $this->setTemplateFile("file", $page);
                        break;
                    default :
                            if($config->view_result['document'] != "N")
								$output['document'] = $oIS->getDocuments($target, $module_srl_list, 'title', $is_keyword, $page, 5);
                            if($config->view_result['comment'] != "N")
								$output['comment'] = $oIS->getComments($target, $module_srl_list, $is_keyword, $page, 5);
                            if($config->view_result['trackback'] != "N")
								$output['trackback'] = $oIS->getTrackbacks($target, $module_srl_list, 'title', $is_keyword, $page, 5);
                            if($config->view_result['multimedia'] != "N")
								$output['multimedia'] = $oIS->getImages($target, $module_srl_list, $is_keyword, $page, 5);
                            if($config->view_result['file'] != "N")
								$output['file'] = $oIS->getFiles($target, $module_srl_list, $is_keyword, $page, 5);
                            Context::set('search_result', $output);
							Context::set('search_target', 'title');
                            $this->setTemplateFile("index", $page);
                        break;
                }
            } else {
                $this->setTemplateFile("no_keywords");
            }
			
			$security = new Security();
			$security->encodeHTML('is_keyword', 'search_target', 'where', 'page');
        }
    }
?>
