var video = document.getElementById("myVideo");
function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');
    var btnFacebook = document.getElementById('btnfacebook');


    var provider = new firebase.auth.FacebookAuthProvider(); 
    //所需授權的Scope  
    //查閱 https://developers.facebook.com/docs/facebook-login/permissions 
    provider.setCustomParameters({ 
      'display': 'popup' 
    }); 

    btnFacebook.addEventListener("click",function(){ 
        firebase.auth().signInWithPopup(provider).then(function(result) { 
          // 取得FB Token，可以使用於FB API中 
          var token = result.credential.accessToken; 
          // 使用者資料 
          var FBUser = result.user; 
          window.location.replace('index.html'); 
          console.log(FBUser); 
        }).catch(function(error) { 
          //處理 帳號已經存在於其他登入方式時 
          if (error.code === 'auth/account-exists-with-different-credential') { 
            //取得credential 
            var pendingCred = error.credential; 
            // The provider account's email address. 
            var email = error.email; 
            console.log("FB登入錯誤-使用者信箱：",email); 
            // 取得當初此Email的登入方式 
            firebase.auth().fetchProvidersForEmail(email).then(function(providers) { 
              // 如果使用者有多個登入方式的話 
              console.log("FB登入錯誤-其他登入方式：",providers); 
              if (providers[0] === 'password') { 
                // 如果使用者用密碼登入，要求使用者輸入密碼 
                var password = promptUserForPassword(); // TODO: 實作 promptUserForPassword. 
                firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) { 
                  return user.link(pendingCred); 
                }).then(function() { 
                  // 成功連結 
                  goToApp(); 
                }); 
                return; 
              } 
              // 如果是其他登入方式，必須取得該登入方式,同時提供相對應的Provider 
              // TODO: implement getProviderForProviderId. 
              var provider = getProviderForProviderId(providers[0]); 
              // 此時你必須讓使用者了解到 他曾經用其他方式登入過 
              // Note: 瀏覽器通常會擋住跳出頁面，所以在現實狀況下，最好有個"請繼續"按鈕觸發新的註冊頁面 
              // 可以參考 https://fir-ui-demo-84a6c.firebaseapp.com/ 
              auth.signInWithPopup(provider).then(function(result) { 
                // 如果使用者用不同Email登入同一個帳號，這樣Firebase是無法擋住的 
                // Step 4b. 
                // 連結回原本的credential 
                result.user.link(pendingCred).then(function() { 
                  // 成功連結 
                  goToApp(); 
                }); 
              }); 
            }); 
          } 
        }); 
      },false);
    function promptUserForPassword(){ 
        var pwd = prompt("Please enter your password"); 
        if (pwd != null) { 
            return pwd; 
        } 
    } 
     
    function goToApp(){ 
        window.location.replace('index.html'); 
    }


    btnLogin.addEventListener('click', function () {
        /// TODO 2: Add email login button event
        ///         1. Get user input email and password to login
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert" and clean input field
        var email = txtEmail.value;
        var password = txtPassword.value;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            window.location='index.html';
        })
        .catch(function(error) {
            create_alert("error", error.message);
            txtEmail.value = "";
            txtPassword.value = "";
        });
        
    });

    btnGoogle.addEventListener('click', function () {
        /// TODO 3: Add google login button event
        ///         1. Use popup function to login google
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert"
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log('signInWithPopup');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            window.location = 'index.html';
        }).catch(function (error) {
            create('error: ' + error.message);
        });
    });

    btnSignUp.addEventListener('click', function () {        
        /// TODO 4: Add signup button event
        ///         1. Get user input email and password to signup
        ///         2. Show success message by "create_alert" and clean input field
        ///         3. Show error message by "create_alert" and clean input field
        var email = txtEmail.value;
        var password = txtPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(e => console.log(e.message));
    });
}

// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

window.onload = function () {
    initApp();
    video.play();
};