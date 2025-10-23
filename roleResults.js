const apiBaseUrl = "https://localhost:7044/api";

document.querySelector(".btn-create").addEventListener("click", (e) => {
    e.stopPropagation();
    const panel = document.getElementById("role-form-panel");
    panel.style.display = panel.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", (e) => {
    const panel = document.getElementById("role-form-panel");
    const btn = document.querySelector(".btn-create");
    if (
        panel.style.display === "block" &&
        !panel.contains(e.target) &&
        !btn.contains(e.target)
    ) {
        panel.style.display = "none";
    }
});

document.getElementById("role-form-panel").addEventListener("click", (e) => {
    e.stopPropagation();
});

document.getElementById("roleForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const roleData = {
        titulo: document.getElementById("roleTitle").value.trim(),
        percentualMinimo: parseFloat(document.getElementById("minPercent").value),
        descricao: document.getElementById("roleDesc").value.trim()
    };

    try {
        const response = await fetch(`${apiBaseUrl}/role/adicionar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(roleData)
        });

        if (response.ok) {
            showToast("Role criada com sucesso!", "success");
            document.getElementById("roleForm").reset();
            document.getElementById("role-form-panel").style.display = "none";
            await renderRolesTable();
        } else {
            const errorText = await response.text();
            showToast(`Erro ao criar role: ${errorText}`, "error");
        }
    } catch (error) {
        console.error(error);
        showToast("Erro ao conectar com a API.", "error");
    }
});

// GET - busca as roles
async function fetchRoles() {
    try {
        const response = await fetch(`${apiBaseUrl}/role`);
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        const roles = await response.json();
        return roles;
    } catch (error) {
        console.error(error);
        showToast("Erro ao carregar roles.", "error");
        return [];
    }
}

async function renderRolesTable() {
    const tbody = document.querySelector(".table-container tbody");
    tbody.innerHTML = "";

    const rolesList = await fetchRoles();

    if (!rolesList || rolesList.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3'>Nenhuma Role Cadastrada.</td></tr>";
        return;
    }

    rolesList.forEach((role, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>#${String(rolesList.length - idx).padStart(3, "0")} - ${role.titulo}</td>
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

function showToast(message, type = "info") {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");
    const toastBar = toast.querySelector(".toast-bar");

    toastMsg.textContent = message;
    toast.className = `toast show ${type}`;

    toastBar.style.animation = "none";
    void toastBar.offsetWidth;
    toastBar.style.animation = null;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

document.getElementById("toast").addEventListener("click", function () {
    this.classList.remove("show");
});

document.getElementById("roleDesc").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        document.getElementById("roleForm").requestSubmit();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    renderRolesTable();
});
