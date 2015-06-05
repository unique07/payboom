<?php
    /**
     * @class  detail_searchAdminController
     * @author Xiso (jeokcho@naver.com)
     * @brief admin view class of the detail_search module
     *
     * Search Management
     *
     **/

    class detail_searchAdminController extends detail_search {
        /**
         * @brief Initialization
         **/
        function init() {}

        /**
         * @brief Save Settings
         **/
        function procDetail_searchAdminInsertConfig() {
            // Get configurations (using module model object)
            $oModuleModel = &getModel('module');
            $config = $oModuleModel->getModuleConfig('detail_search');

            $args->skin = Context::get('skin');
            $args->target = Context::get('target');
            $args->target_module_srl = Context::get('target_module_srl');
			$args->search_target_menu = Context::get('search_target_menu');
			$args->show_detail_box = Context::get('show_detail_box') ? Context::get('show_detail_box') : "N";
			
			$view_result = array();
			$view_result['document'] = Context::get('view_result_document') ? Context::get('view_result_document') : "N";
			$view_result['comment'] = Context::get('view_result_comment') ? Context::get('view_result_comment') : "N";
			$view_result['trackback'] = Context::get('view_result_trackback') ? Context::get('view_result_trackback') : "N";
			$view_result['multimedia'] = Context::get('view_result_multimedia') ? Context::get('view_result_multimedia') : "N";
			$view_result['file'] = Context::get('view_result_file') ? Context::get('view_result_file') : "N";	
			
			$args->view_result = serialize($view_result);
			
            if(!$args->target_module_srl) $args->target_module_srl = '';
            $args->skin_vars = $config->skin_vars;

            $oModuleController = &getController('module');
            $output = $oModuleController->insertModuleConfig('detail_search',$args);

			if(!in_array(Context::getRequestMethod(),array('XMLRPC','JSON'))) {
				$returnUrl = Context::get('success_return_url') ? Context::get('success_return_url') : getNotEncodedUrl('', 'module', 'admin', 'act', 'dispDetail_searchAdminContent');
				header('location:'.$returnUrl);
				return;
			}
			else return $output;
        }

        /**
         * @brief Save the skin information
         **/
        function procDetail_searchAdminInsertSkin() {
            // Get configurations (using module model object)
            $oModuleModel = &getModel('module');
            $config = $oModuleModel->getModuleConfig('detail_search');

            $args->skin = $config->skin;
            $args->target_module_srl = $config->target_module_srl;
            // Get skin information (to check extra_vars)
            $skin_info = $oModuleModel->loadSkinInfo($this->module_path, $config->skin);
            // Check received variables (delete the basic variables such as mo, act, module_srl, page)
            $obj = Context::getRequestVars();
            unset($obj->act);
            unset($obj->module_srl);
            unset($obj->page);
            // Separately handle if the extra_vars is an image type in the original skin_info
            if($skin_info->extra_vars) {
                foreach($skin_info->extra_vars as $vars) {
                    if($vars->type!='image') continue;

                    $image_obj = $obj->{$vars->name};
                    // Get a variable on a request to delete
                    $del_var = $obj->{"del_".$vars->name};
                    unset($obj->{"del_".$vars->name});
                    if($del_var == 'Y') {
                        FileHandler::removeFile($module_info->{$vars->name});
                        continue;
                    }
                    // Use the previous data if not uploaded
                    if(!$image_obj['tmp_name']) {
                        $obj->{$vars->name} = $module_info->{$vars->name};
                        continue;
                    }
                    // Ignore if the file is not successfully uploaded
                    if(!is_uploaded_file($image_obj['tmp_name'])) {
                        unset($obj->{$vars->name});
                        continue;
                    }
                    // Ignore if the file is not an image
                    if(!preg_match("/\.(jpg|jpeg|gif|png)$/i", $image_obj['name'])) {
                        unset($obj->{$vars->name});
                        continue;
                    }
                    // Upload the file to a path
                    $path = sprintf("./files/attach/images/%s/", $module_srl);
                    // Create a directory
                    if(!FileHandler::makeDir($path)) return false;

                    $filename = $path.$image_obj['name'];
                    // Move the file
                    if(!move_uploaded_file($image_obj['tmp_name'], $filename)) {
                        unset($obj->{$vars->name});
                        continue;
                    }
                    // Change a variable
                    unset($obj->{$vars->name});
                    $obj->{$vars->name} = $filename;
                }
            }
            // Serialize and save 
            $args->skin_vars = serialize($obj);

            $oModuleController = &getController('module');
			$output = $oModuleController->insertModuleConfig('detail_search',$args);

            $this->setMessage('success_updated', 'info');
			if(!in_array(Context::getRequestMethod(),array('XMLRPC','JSON'))) {
				$returnUrl = Context::get('success_return_url') ? Context::get('success_return_url') : getNotEncodedUrl('', 'module', 'admin', 'act', 'dispDetail_searchAdminSkinInfo');
				$this->setRedirectUrl($returnUrl);
				return;
			}
			else $output;
        }
    }
?>
