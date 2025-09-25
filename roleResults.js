// Array para armazenar os cargos
let roles = [
    { title: "Data Analyst" },
    { title: "Product Owner" },
    { title: "Data Engineer" }
];

// Renderiza a tabela usando fetchRoles
async function renderRolesTable() {
    const tbody = document.querySelector('.table-container tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const rolesList = await fetchRoles();
    rolesList.forEach((role, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${String(rolesList.length - idx).padStart(3, '0')} - ${role.title}</td>
            <td>
                <a href="roleResults.html">
                    <button class="results-btn" type="button">
                        <i class="bi bi-three-dots"></i>
                    </button>
                </a>
            </td>
            <td><span class="status in-progress">In Progress</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// Exibe/esconde o painel ao clicar no botão
document.querySelector('.btn-create').onclick = function (e) {
    e.stopPropagation(); // Impede que o clique feche o painel imediatamente
    const panel = document.getElementById('role-form-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
};

// Fecha o painel ao clicar fora dele
document.addEventListener('click', function (e) {
    const panel = document.getElementById('role-form-panel');
    const btn = document.querySelector('.btn-create');
    if (
        panel.style.display === 'block' &&
        !panel.contains(e.target) &&
        !btn.contains(e.target)
    ) {
        panel.style.display = 'none';
    }
});

// Impede que cliques dentro do painel fechem ele
document.getElementById('role-form-panel').onclick = function (e) {
    e.stopPropagation();
};
// Simula o envio do formulário
document.getElementById('roleForm').onsubmit = async function (e) {
    e.preventDefault();
    document.getElementById('role-form-panel').style.display = 'none';
    const title = document.getElementById('roleTitle').value;
    await addRole({ title });
    renderRolesTable();
    showToast('Role registered successfully!');
    this.reset();
};

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastBar = toast.querySelector('.toast-bar');
    toastMsg.textContent = message;
    toast.classList.add('show');
    // Reinicia a animação da barra
    toastBar.style.animation = 'none';
    void toastBar.offsetWidth; // trigger reflow
    toastBar.style.animation = null;
    // Esconde após 2.5s
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Fecha o toast ao clicar nele
document.getElementById('toast').onclick = function () {
    this.classList.remove('show');
};

// Inicializa a tabela ao carregar
document.addEventListener('DOMContentLoaded', function () {
    renderRolesTable();
});

// Simulação local (troque depois por fetch)
async function fetchRoles() {
    // Quando for bota o bagulho por: return fetch('/api/roles').then(r => r.json());
    return roles;
}

async function addRole(role) {
    // quando botar o treco lá esqueci o nome por: return fetch('/api/roles', { method: 'POST', ... });
    roles.unshift(role);
    return { success: true };
}
/* quando o backend tiver pronto, botar isso aqui

async function fetchRoles() {
    const res = await fetch('/api/roles');
    return res.json();
}

async function addRole(role) {
    const res = await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(role)
    });
    return res.json();
} */

document.getElementById('roleDesc').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('roleForm').requestSubmit();
    }
});
