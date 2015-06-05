<?php
    /**
     * @class  detail_searchAdminView
     * @author Xiso (jeokcho@naver.com
     * @brief admin view class of the detail_search module
     *
     * Search Management
     *
     **/

    class detail_searchAdminView extends detail_search {

        var $config = null;

        /**
         * @brief Initialization
         **/
        function init() {
            // Get configurations (using module model object)
            $oModuleModel = &getModel('module');
            $this->config = $oModuleModel->getModuleConfig('detail_search');
			$this->config->view_result = unserialize($this->config->view_result);
            Context::set('config',$this->config);
			
            $this->setTemplatePath($this->module_path."/tpl/");
        }

        /**
         * @brief Module selection and skin set
         **/
        function dispDetail_searchAdminContent() {
            // Get a list of skins(themes)
            $oModuleModel = &getModel('module');
            $skin_list = $oModuleModel->getSkins($this->module_path);
            Context::set('skin_list',$skin_list);
            // Get a list of module categories
            $module_categories = $oModuleModel->getModuleCategories();
            // Generated mid Wanted list
            $obj->site_srl = 0;

			$security = new Security();
			$security->encodeHTML('skin_list..title');
			
			//getMenus
			$oMenuAdminModel = &getAdminModel('menu');
			$menu_list = $oMenuAdminModel->getMenus();
			Context::set('menu_list', $menu_list);
			
            // Sample Code
            Context::set('sample_code', htmlspecialchars('<form action="{getUrl()}" method="get"><input type="hidden" name="vid" value="{$vid}" /><input type="hidden" name="mid" value="{$mid}" /><input type="hidden" name="act" value="DS" /><input type="text" name="is_keyword"  value="{$is_keyword}" /><span class="btn"><input type="submit" value="{$lang->cmd_search}" /></span></form>') );

            $this->setTemplateFile("index");
        }

        /**
         * @brief Skin Settings
         **/
        function dispDetail_searchAdminSkinInfo() {
            $oModuleModel = &getModel('module');
            $skin_info = $oModuleModel->loadSkinInfo($this->module_path, $this->config->skin);
            $skin_vars = unserialize($this->config->skin_vars);
            // value for skin_info extra_vars
            if(count($skin_info->extra_vars)) {
                foreach($skin_info->extra_vars as $key => $val) {
                    $name = $val->name;
                    $type = $val->type;
                    $value = $skin_vars->{$name};
                    if($type=="checkbox"&&!$value) $value = array();
                    $skin_info->extra_vars[$key]->value= $value;
                }
            }
            Context::set('skin_info', $skin_info);
            Context::set('skin_vars', $skin_vars); //maybe not used

            $config = $oModuleModel->getModuleConfig('detail_search');
            Context::set('module_info', unserialize($config->skin_vars));
			
			$security = new Security();
			$security->encodeHTML('skin_info...');			
			
            $this->setTemplateFile("skin_info");
        }
    }
?>
