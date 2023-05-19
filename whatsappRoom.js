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
  
  document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";
  
  function addRoom()
  {
    roomName = document.getElementById("roomName").value;
  
    firebase.database().ref("/").child(roomName).update({
      purpose : "adicionar nome de sala"
    });
  
      localStorage.setItem("roomName", roomName);
      
      window.location = "whatsappPage.html";
  }
  
  function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
         roomNames = childKey;
         console.log("Nome da Sala - " + roomNames);
        row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
  
  }
  
  getData();
  
  function redirectToRoomName(name)
  {
    console.log(name);
    localStorage.setItem("roomName", name);
      window.location = "whatsappPage.html";
  }
  
  function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
      window.location = "whatsapp.html";
  }
  