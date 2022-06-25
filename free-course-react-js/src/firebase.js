import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDfXsharAApHIwBsWAGzdmchl5Zx3LfuBg",
  authDomain: "dacntt-6b524.firebaseapp.com",
  projectId: "dacntt-6b524",
  storageBucket: "dacntt-6b524.appspot.com",
  messagingSenderId: "13971978512",
  appId: "1:13971978512:web:f13381905de28cbb528d95",
  measurementId: "G-60Y9R6VMWJ",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;

// Note upload files
// item = {file: file, label: label}
// docs: https://firebase.google.com/docs/storage/web/upload-files
// function upload(items) {
//     items.foreach(item => {
//         const fileName = "filename muon lưu"
//         const uploadTask = storage.ref(`/thư mục muốn lưu(avt hoặc video bài học hay hình )/${fileName}`).put(item.file);
//         uploadTask.on("state_changed", (snapshot) => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
//             console.log('Upload is ' + progress + '% done');
//         },
//         (err) => {
//             console.log(err)
//         },
//         () => {
//             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                 console.log(downloadURL) (url trả về)
//             });
//         })
//     })
// }
