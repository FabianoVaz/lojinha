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
    data.forEach(element => {
        if(element.quantity.current > 0){
            count++;
            if(element.subscriberOnly)
              updateCards(element);
        }
    });
    /* if(count != Number(localStorage.getItem("total")) ){
        localStorage.setItem("total", count);
        //notifyMe();
    } */
    }));

  function updateCards(element){
    let card = document.createElement("div");
    card.classList.add('card');
    let img = document.createElement("img");
    img.classList.add('thumb');
    img.src = element.thumbnail;
    let title = document.createElement("span");
    title.classList.add('title');
    const options = { minimumFractionDigits: 0 }
    title.innerText = `${element.name}`;
    let subtitle = document.createElement("span");
    subtitle.classList.add('qtd');
    subtitle.innerText = `Total: ${element.quantity.total} | Disponível: ${element.quantity.current} | $ ${new Intl.NumberFormat('pt-BR', options).format(parseFloat(element.cost))}`;
    let desc = document.createElement("span");
    desc.innerText = `${element.description.split(":")[1]}`
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(desc);
    lista.appendChild(card);
    const h1 = document.getElementById("totais");
    if(element.quantity.current > 0){
      //card.classList.add('star');
      currents++;
    }
    h1.innerText = `Itens: ${Number(localStorage.getItem("total"))} | Disponível: ${currents}`;
  }

  function notifyMe() {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      var notification = new Notification('Novos itens na lojinha', {body: 'Abrir StreamElements'});
      notification.onclick = function () {window.open("https://streamelements.com/ale_apoka/store");};
    }
  }