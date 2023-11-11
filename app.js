var URL = "https://api.streamelements.com/kappa/v2/store/5d66c09f5191a2cd52a578b7/items"

const lista = document.getElementById("itens-list");
var currents = 0;
  let count = 0;
  currents = 0;
  lista.innerHTML = "";
  fetch(URL).then(response => 
    response.json().then(dados => ({
        data: dados,
        status: response.status
    })
    ).then(res => { 
    let data = res.data;
    console.log(data.length);
    data.sort( function (a, b) { return b.quantity.current - a.quantity.current} )
    let subSet = [];
    data.forEach(element => {
        if(element.enabled && element.subscriberOnly && element.quantity.current > 0){
            count++;
            updateCards(element);
        }
      });
    if(count != Number(localStorage.getItem("total")) ){
      localStorage.setItem("total", count);
      notifyMe();
    }
  }));

      
  function updateCards(element){
    let card = document.createElement("div");
    card.classList.add('card');
    
    let img = document.createElement("img");
    img.classList.add('thumb');
    img.src = element.thumbnail;
    
    let title = document.createElement("span");
    title.classList.add('title');
    title.innerText = `${element.name}`;
    
    let subtitle = document.createElement("span");
    subtitle.classList.add('qtd');
    const options = { minimumFractionDigits: 0 }
    subtitle.innerText = `Total: ${element.quantity.total} | Disponível: ${element.quantity.current} | $ ${new Intl.NumberFormat('pt-BR', options).format(parseFloat(element.cost))}`;
    
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(subtitle);
    lista.appendChild(card);
    
    const h1 = document.getElementById("totais");
    h1.innerText = `Itens: ${Number(localStorage.getItem("total"))} | Disponível: ${currents}`;
    
    if(element.quantity.current > 0){
      card.classList.add('star');
      currents++;
    }
  }
  
  function notifyMe() {
    document.querySelector("body").style.background = "red";
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      var notification = new Notification('Novos itens na lojinha', {body: 'Abrir StreamElements'});
      notification.onclick = function () {window.open("https://streamelements.com/ale_apoka/store");};
    }
  }
