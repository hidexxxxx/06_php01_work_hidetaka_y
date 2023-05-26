//firebase使ったログイン機能

let firebaseConfig = {
    apiKey: "",
    authDomain: "jschampionship-f5265.firebaseapp.com",
    projectId: "jschampionship-f5265",
    storageBucket: "jschampionship-f5265.appspot.com",
    messagingSenderId: "171502542751",
    appId: "1:171502542751:web:0e4129428f53af19ce67aa"
};

firebase.initializeApp(firebaseConfig);

let uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function () {
            console.log("ログイン成功");
            location.href = "archive.html";
            return true;
        },
    },
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

let ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);