const API_URL = "https://localhost:7044/api/Result";

//  busca os resultados
document.addEventListener("DOMContentLoaded", carregarResultados);

// função que busca os dados da API
async function carregarResultados() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error("Erro HTTP: " + resposta.status);

    const dados = await resposta.json();
    preencherTabela(dados);
    atualizarEstatisticas(dados);
  } catch (erro) {
    console.error("Erro ao buscar dados:", erro);
    document.querySelector("#resultTableBody").innerHTML =
      "<tr><td colspan='3'>Erro ao carregar resultados 😢</td></tr>";
  }
}

// função pra preencher a tabela com os dados
function preencherTabela(resultados) {
  const tbody = document.getElementById("resultTableBody");

  if (!tbody) {
    console.error("Tabela não encontrada!");
    return;
  }

  tbody.innerHTML = "";
  resultados.forEach((item) => {
    const linha = document.createElement("tr");

    //  e-mail do candidato
    const colEmail = document.createElement("td");
    colEmail.textContent = item.emailCandidato || item.candidatoEmail || "E-mail não informado";

    // botão de download do currículo : rever com a sabryna nao fuciona pois nao tem dados para baixar
    const colDownload = document.createElement("td");
    const botao = document.createElement("button");
    botao.classList.add("download-btn");
    botao.innerHTML = `<i class="bi bi-download"></i>`;
    botao.addEventListener("click", () => baixarArquivo(item.file));
    colDownload.appendChild(botao);

    // resultado percentual
    const colResultado = document.createElement("td");
    const badge = document.createElement("span");
    badge.classList.add("result-badge");

    if (item.percentual >= 70) {
      badge.classList.add("green"); 
    }

    badge.textContent = `${item.percentual}%`;
    colResultado.appendChild(badge);

    // adiciona tudo na linha
    linha.appendChild(colEmail);
    linha.appendChild(colDownload);
    linha.appendChild(colResultado);

    tbody.appendChild(linha);
  });
}

// função pra atualizar os cards de estatísticas
function atualizarEstatisticas(resultados) {
  const total = resultados.length;
  const aprovados = resultados.filter((r) => r.status?.toLowerCase() === "aprovado").length;
  const reprovados = total - aprovados;

  document.getElementById("totalAplicacoes").textContent = total;
  document.getElementById("totalAprovados").textContent = aprovados;
  document.getElementById("totalReprovados").textContent = reprovados;
}

// função pra baixar o arquivo do currículo
function baixarArquivo(nomeArquivo) {
  if (!nomeArquivo) {
    alert("Esse candidato não tem arquivo disponível 😕");
    return;
  }

  const base = API_URL.replace("/Result", "");
  const link = document.createElement("a");
  link.href = `${base}/uploads/${nomeArquivo}`;
  link.download = nomeArquivo;

  document.body.appendChild(link);
  link.click();
  link.remove();
}
