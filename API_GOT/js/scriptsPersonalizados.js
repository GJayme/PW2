// Global
let listaLivrosInfo;
let listaPersonagensGlobal = [];
let qtdePaginasPaginacao;

$.ajax({
  url: "https://www.anapioficeandfire.com/api/books",
  type: "GET",
  dataType: "html",
})
  .done(function (resposta) {
    listaLivrosInfo = JSON.parse(resposta);
    escreveLivrosComoLista();
  })
  .fail(function (jqXHR, textStatus) {
    console.log("Request failed: " + textStatus);
  });

function escreveLivrosComoLista() {
  for (var i = 0; i < listaLivrosInfo.length; i++) {
    let nome = listaLivrosInfo[i].name;
    let numPersonagens = listaLivrosInfo[i].characters.length;

    $("#listaLivros").append(
      `
        <div class="col-md-6 col-lg-4 mb-5">
            <h1 class="centralizado">${nome}</h1>
            <div
            class="portfolio-item mx-auto"
            onclick="chamaModal(${i})"
            >
            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white">
                <i class="fas fa-plus fa-3x"></i>
                </div>
            </div>
            <img  style="width: 332px" class="img-fluid" src="assets/img/${nome}.jpg" alt="" />
            </div>
        </div>
        `
    );
  }
}

function ordenacao(a, b) {
  // if (a < b) {
  //   return -1;
  // } else if (a > b) {
  //   return 1;
  // } else {
  //   return 0;
  // }
  return a - b;
}

function ordenaNome(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
}

function chamaModal(idDoLivroNalista) {
  $("#portfolioModal1Label").html(listaLivrosInfo[idDoLivroNalista].name);
  $("#portfolioModal1").modal();

  getPersonagensFromAPI(listaLivrosInfo[idDoLivroNalista].characters);
}

function paginacao() {
  qtdeLinhas = 10;
  tbody = $("#tboodyTabelaPersonagens");
  qtdePaginas = Math.ceil(tbody.children().length / qtdeLinhas);

  //botões da paginação
  for (let i = 0; i < qtdePaginas; i++) {
    $("#paginacao").append(
      `<button onclick='trocaPagina(${qtdeLinhas},${i + 1})'> ${
        i + 1
      } </button>`
    );
  }
}

function trocaPagina(qtdeLinhas, pagAtual) {
  for (let i = 0; i < tbody.children().length; i++) {
    if (
      i + 1 < qtdeLinhas * pagAtual - qtdeLinhas ||
      i + 1 > qtdeLinhas * pagAtual
    ) {
      $(tbody.children()[i]).hide();
    } else {
      $(tbody.children()[i]).show();
    }
  }
}

function getPersonagensFromAPI(listaLinkPersonagens) {
  for (let i = 0; i < listaLinkPersonagens.length; i++) {
    $.ajax({
      url: listaLinkPersonagens[i],
      type: "GET",
      dataType: "html",
    })
      .done(function (resposta) {
        let personagensAtual = JSON.parse(resposta);
        listaPersonagensGlobal.push(personagensAtual);

        $("#tboodyTabelaPersonagens").append(
          `
            <tr>
              <td>${i + 1}</td>
              <td>${personagensAtual.name}</td>
              <td>${personagensAtual.aliases}</td>
              <td>${personagensAtual.titles}</td>
              <td>${personagensAtual.gender}</td>
              <td>${personagensAtual.culture}</td>
            </tr>
          `
        );
      })
      .fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });
  }
}
