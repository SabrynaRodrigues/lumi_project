// URL base da API
const apiBaseUrl = "https://localhost:7044/api/Role";

//  Botão e painel de criação de vaga
const btnCreate = document.querySelector(".btn-create");
const panel = document.getElementById("role-form-panel");

// abre/fecha o painel
btnCreate.addEventListener("click", (e) => {
  e.stopPropagation();
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});

// fecha painel se clicar fora
document.addEventListener("click", (e) => {
  if (
    panel.style.display === "block" &&
    !panel.contains(e.target) &&
    !btnCreate.contains(e.target)
  ) {
    panel.style.display = "none";
  }
});

// evita fechar clicando dentro
panel.addEventListener("click", (e) => e.stopPropagation());

// Envio do formulário de nova vaga
const form = document.getElementById("roleForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // pega valores dos campos
  const roleName = document.getElementById("roleTitle").value.trim();
  const roleDescription = document.getElementById("roleDesc").value.trim();

  // pega dados salvos no localStorage
  const cvId = parseInt(localStorage.getItem("cvId")) || 1;
  const ownerId = parseInt(localStorage.getItem("cadastroId"));

  // impede se o usuário não estiver logado
  if (!ownerId) {
    showToast("Você precisa estar logado para criar uma vaga!", "error");
    return;
  }

  // estrutura que a API espera
  const roleData = {
    roleName,
    roleDescription,
    cvId,
    cv: { cvId },
    ownerId,
    owner: { userId: ownerId }
  };

  try {
    const response = await fetch(`${apiBaseUrl}/adicionar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roleData)
    });

    const result = await response.text();

    if (response.ok) {
      showToast("Vaga criada com sucesso!", "success");
      form.reset();
      panel.style.display = "none";
      await renderRolesTable();
    } else {
      console.error("Erro na API:", result);
      showToast("Erro ao criar vaga. Verifique os dados.", "error");
    }

  } catch (error) {
    console.error("Erro ao conectar com a API:", error);
    showToast("Não foi possível conectar com o servidor.", "error");
  }
});

//  Busca todas as vagas
async function fetchRoles() {
  try {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) throw new Error("Erro ao carregar vagas");
    return await response.json();
  } catch (error) {
    console.error(error);
    showToast("Erro ao buscar vagas.", "error");
    return [];
  }
}

// Mostra vagas na tabela
async function renderRolesTable() {
  const tbody = document.querySelector(".table-container tbody");
  tbody.innerHTML = "";

  const roles = await fetchRoles();

  if (!roles || roles.length === 0) {
    tbody.innerHTML = "<tr><td colspan='3'>Nenhuma vaga cadastrada ainda.</td></tr>";
    return;
  }

  roles.forEach((role) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${role.roleName}</td>
      <td>${role.roleDescription}</td>
      <td>
        <a href="RoleResults.html">
          <button class="results-btn"><i class="bi bi-three-dots"></i></button>
        </a>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Toast de feedback
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");
  const toastBar = toast.querySelector(".toast-bar");

  toastMsg.textContent = message;
  toast.className = `toast show ${type}`;

  toastBar.style.animation = "none";
  void toastBar.offsetWidth; // reseta a animação
  toastBar.style.animation = null;

  setTimeout(() => toast.classList.remove("show"), 3000);
}

// fecha o toast clicando
document.getElementById("toast").addEventListener("click", () => {
  document.getElementById("toast").classList.remove("show");
});

// envia form ao apertar Enter
document.getElementById("roleDesc").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});

// carrega a tabela quando a página abre
document.addEventListener("DOMContentLoaded", renderRolesTable);
