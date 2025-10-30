class CadastroService {
  constructor() {
    this.apiUrl = "https://localhost:7044/api/User/adicionar"; 
  }

  async cadastrarUsuario(usuario) {
    try {
      console.log("Enviando para API:", this.apiUrl, usuario); 

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
      });

      console.log("Status da resposta:", response.status);

      if (!response.ok) {
        const erro = await response.text();
        console.error("Detalhe do erro:", erro);
        throw new Error("Erro ao cadastrar usuário");
      }

      return await response.json();
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-form");
  const cadastroService = new CadastroService();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userName = form.elements["userName"].value;
    const email = form.elements["email"].value;
    const senha = form.elements["password"].value;
    const confirmarSenha = form.elements["confirm"].value;

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const usuario = {
      userId: 0, 
      userName: userName,
      email: email,
      passwordHash: senha,
      roleId: null
    };

    try {
      const result = await cadastroService.cadastrarUsuario(usuario);
      console.log("Usuário salvo:", result);
      window.location.href = "login.html"; 
    } catch (error) {
      alert("Erro ao cadastrar usuário. Verifique os dados.");
      console.error(error);
    }
  });
});
