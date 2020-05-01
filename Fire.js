import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }
    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyAeBde3IZnxnsQ3Tgqb6uopNjGzywL7XFM",
                authDomain: "chatapp-ba3e7.firebaseapp.com",
                databaseURL: "https://chatapp-ba3e7.firebaseio.com",
                projectId: "chatapp-ba3e7",
                storageBucket: "chatapp-ba3e7.appspot.com",
                messagingSenderId: "425161920818",
                appId: "1:425161920818:web:e4ca19196255199434c72b",
                measurementId: "G-TS351F8BPX"
            });
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = message => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message)
        })
    };

    parse = messaeg => {
        const {user, text, timestamp} = message.val();
        const {key: _id} = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
            user
        }
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)))
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref('messages');
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();