<?
define('__XE__',   TRUE);
/**
 * @brief Include the necessary configuration files
 **/
require dirname(__FILE__) . '/config/config.inc.php';

$oContext = Context::getInstance();
$oContext->init();

$document_srl = Context::get('document_srl');

$oDB = &DB::getInstance();
$query = $oDB->_query("SELECT content FROM payboomxe.payboom_documents where document_srl='$document_srl'");
$result = $oDB->_fetch($query);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
<!-- META -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="PAYBOOM">
<!-- TITLE -->
<title>payboom</title>
<!-- CSS -->
<link rel="stylesheet" href="/boom/common/css/xe.min.css?20150414075731" />
<link rel="stylesheet" href="/boom/modules/editor/styles/default/style.css?20150414075738" />
<link rel="stylesheet" href="/boom/widgets/content/skins/main_bbs/css/widget.css?20150527041626" />
<link rel="stylesheet" href="/boom/files/faceOff/259/layout.css?20150528090339" />
<!-- JS -->
<!--[if lt IE 9]><script src="/boom/common/js/jquery-1.x.min.js?20150414075731"></script>
<![endif]--><!--[if gte IE 9]><!--><script src="/boom/common/js/jquery.min.js?20150414075731"></script>
<![endif]--><script src="/boom/common/js/x.min.js?20150414075734"></script>
<script src="/boom/common/js/xe.min.js?20150414075734"></script>
<script src="/boom/modules/page/tpl/js/page_admin.js?20150414075741"></script>
<script src="/boom/widgets/content/skins/main_bbs/js/content_widget.js?20150527041626"></script>
<!-- RSS -->
<link rel="alternate" type="application/rss+xml" title="Site RSS" href="http://www.payboom.co.kr/boom/rss" /><link rel="alternate" type="application/atom+xml" title="Site Atom" href="http://www.payboom.co.kr/boom/atom" /><!-- ICON -->


<style> .xe_content { font-size:13px; }</style>
<link rel="stylesheet" href="/boom/layouts/user_layout/css/vendor/bootstrap-theme.css">
<link rel="stylesheet" href="/boom/layouts/user_layout/css/vendor/bootstrap.css">
<link rel="stylesheet" href="/boom/layouts/user_layout/css/vendor/royalslider.css">
<link rel="stylesheet" href="/boom/layouts/user_layout/css/bootstrap-override.css">
<link rel="stylesheet" href="/boom/layouts/user_layout/css/main.css">
<link href="/boom/layouts/user_layout/css/jquery.selectbox.css" media="screen" rel="stylesheet" type="text/css" />
</head>
<body>
<?
echo $result->content;
?>

<script src="/boom/layouts/user_layout/js/facebook/fb.login.js"></script>
<script src="/boom/layouts/user_layout/js/vendor/webfont.min.js"></script>
<script src="/boom/layouts/user_layout/js/jquery.selectbox.js"></script>
<script src="/boom/layouts/user_layout/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
<script src="/boom/layouts/user_layout/js/vendor/selector.min.js"></script>
<script type="text/javascript" src="/boom/layouts/user_layout/js/common.js"></script>


<!--<script src="/boom/layouts/user_layout/js/vendor/jquery-1.11.1.min.js"></script>-->
<script src="/boom/layouts/user_layout/js/vendor/bootstrap.min.js"></script>
<script type="text/javascript" src="/boom/layouts/user_layout/js/plugins.js"></script>
<script type="text/javascript" src="/boom/layouts/user_layout/js/main.js"></script><!-- ETC -->
<div class="wfsr"></div>
<script src="/boom/addons/autolink/autolink.js?20150414075728"></script>
<script src="/boom/files/cache/js_filter_compiled/d61d47e1f13a9593bd3c4f0d8cf804a9.ko.compiled.js?20150527041936"></script>
<script src="/boom/files/cache/js_filter_compiled/f1e413be229c3b20f14dbbf88d47e5ab.ko.compiled.js?20150527041936"></script>
</body>
</html>