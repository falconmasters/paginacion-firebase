const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: ""
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();