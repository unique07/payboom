<?php
    /**
     * @class  detail_search
     * @author Xiso (jeokcho@naver.com)
     **/

    class detail_search extends ModuleObject {

        /**
         * @brief Implement if additional tasks are necessary when installing
         **/
        function moduleInstall() {
            return new Object();
        }

        /**
         * @brief a method to check if successfully installed
         **/
        function checkUpdate() {
			$oModuleModel = &getModel('module');
			$checkActionForward = $oModuleModel->getActionForward('DS');
			
			if(count($checkActionForward)){
				return false;
			}else{
				return true;
			}
        }

        /**
         * @brief Execute update
         **/
        function moduleUpdate() {
			// Registered in action forward
            $oModuleController = &getController('module');
            $oModuleController->insertActionForward('detail_search', 'view', 'DS');
			
            return new Object(0, 'success_updated');
        }

        /**
         * @brief Re-generate the cache file
         **/
        function recompileCache() {
        }
    }
?>