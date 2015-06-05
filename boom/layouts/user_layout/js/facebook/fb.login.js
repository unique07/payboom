/**
 * Created by jjapsang on 1/21/15.
 */

// facebook sdk init
//window.fbAsyncInit = function() {
//	FB.init({
//		appId      : '558210794318366',

//		cookie     : true,  // enable cookies to allow the server to access
							// the session
//		xfbml      : true,  // parse social plugins on this page
//		version    : 'v2.0' // use version 2.0
//	});
//};

// Load the SDK asynchronously
//(function(d){
//	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
//	if (d.getElementById(id)) {return;}
//	js = d.createElement('script'); js.id = id; js.async = true;
//	js.src = "//connect.facebook.net/en_US/all.js";
//	ref.parentNode.insertBefore(js, ref);
//}(document));

window.fbAsyncInit = function() {
    FB.init({
      appId      : '558210794318366',
      cookie     : true, 
      xfbml      : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {

	if (response.status === 'connected') {
		// Logged into your app and Facebook.

		successAPI(response);
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.

	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		//document.getElementById('status').innerHTML = 'Please log ' +
		//'into Facebook.';

	}
}

function facebooklogin(){
	//console.log(document.cookie);
	//if(document.cookie){
	//	alert("현재 페이스북 로그인 상태입니다.");
	//}else{
		FB.login(function(response) {
			statusChangeCallback(response);
		});
	//}
}

function successAPI(response) {
	var accessToken = response.authResponse.accessToken;

	FB.api('/me', function(user) {
		console.log(user.name);
		console.log(user.id);
		console.log(user.email);
		//console.log(accessToken);

		document.location.href = "../../user/facebook-login-check.php?u_name=" + user.name + "&u_id=" + user.id + "&u_email=" + user.email + "&type=2";

	});
}

//function totalLogout(){
//	FB.getLoginStatus(function(response) {
//		if (response && response.status === 'connected') {
//			FB.logout(function(response) {
//				//location.replace("/user/logout_process.php");
//			});
//		}
//	});
//}