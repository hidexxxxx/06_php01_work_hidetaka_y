//form内画像をstorageへアップロード
// firebaseのverが9.xxなら以下の書き方、8.xxなら以前の書き方。firebaseのドキュメント要参照


import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDADUT7tlyvD8G-WfBpVQoUaY6fRxvvug8",
    authDomain: "jschampionship-f5265.firebaseapp.com",
    projectId: "jschampionship-f5265",
    storageBucket: "jschampionship-f5265.appspot.com",
    messagingSenderId: "171502542751",
    appId: "1:171502542751:web:0e4129428f53af19ce67aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);



$("#save").on("click", function () {

    const file = document.getElementById('upload-photo-input').files[0];
    // console.log(file);
    const storageRef = ref(storage, file.name);
    //uploadBytes関数を使ってstorageにfileをアップロードする
    uploadBytes(storageRef, file).then((snapshot) => {

        // アップロードが完了したときの処理
        console.log('Upload complete');
        alert('Upload complete!!');
    });

    //▼以下画像の読み出し

    const downloadedURLs = {};
    const downloadPromises = [];

    //firebaseからstorageRefに対して参照される
    getDownloadURL(storageRef)
        //getDownloadURL(storageRef)が完了した後に実行される
        .then((url) => {

            // 選択したファイルの名前を取得
            const fileName = file.name
            // console.log(fileName);
            // fileNameをキーとして取得したダウンロードURLをオブジェクトに追加する
            downloadedURLs[fileName] = url;
            // console.log(downloadedURLs);
            // ダウンロード済みの画像URLを表示
            displayImages();
            // console.log(displayImages);
        })
        .catch((error) => {
        });

    // ダウンロード済みの画像URLを表示する関数
    function displayImages() {
        // 表示する要素を取得
        const outputPhoto = document.getElementById("output-photo");
        //これは画像を表示する前にoutput-photo内にあるコンテンツを空にしている
        // outputPhoto.innerHTML = "";


        // ダウンロード済みの画像URLをループして表示
        for (const fileName in downloadedURLs) {
            // 画像要素を作成
            const imageElement = document.createElement("img");
            // console.log(imageElement);
            imageElement.src = downloadedURLs[fileName];
            // 画像の幅を0.2倍で表示させる
            imageElement.width = window.innerHeight * 0.2;

            // 画像要素を表示
            // outputContainer.appendChild(imageElement);
            outputPhoto.appendChild(imageElement);
        }
    }
});