const firebaseConfig = {
    apiKey: "AIzaSyBjoG4W4ZeKfv9mXY8d3se94SY8aWiIx4U",
    authDomain: "whatsapp-29183.firebaseapp.com",
    databaseURL: "https://whatsapp-29183-default-rtdb.firebaseio.com",
    projectId: "whatsapp-29183",
    storageBucket: "whatsapp-29183.appspot.com",
    messagingSenderId: "192046628506",
    appId: "1:192046628506:web:2960eab254b9e93f16a923"
  };
  firebase.initializeApp(firebaseConfig);
  //ADICIONE SEUS LINKS FIREBASE

userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            name: userName,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + roomName).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebaseMessageId = childKey;
                        messageData = childData;
                        //Início do código
                        console.log(firebaseMessageId);
                        console.log(messageData);
                        name = messageData['name'];
                        message = messageData['message'];
                        like = messageData['like'];
                        nameWithTag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
                        spanWithTag = "<span class= 'glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                        row = nameWithTag + messageWithTag + like_button + spanWithTag;
                        document.getElementById("output").innerHTML += row;

                        //Fim do código
                  }

            });
      });
}
getData();

function updateLike(messageId) {
      console.log("botão de like pressionado - " + messageId);
      buttonId = messageId;
      likes = document.getElementById(buttonId).value;
      updatedLikes = Number(likes) + 1;
      console.log(updatedLikes);

      firebase.database().ref(roomName).child(messageId).update({
            like: updatedLikes
      });
}

function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location.replace("whatsapp.html");
}
