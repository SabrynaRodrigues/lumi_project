document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const data = { email: email, senha: password };

    try {
      const response = await fetch("https://localhost:7044/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        const message =
          result.message ||
          (response.status === 401
            ? "E-mail ou senha incorretos."
            : response.status === 404
            ? "Usuário não encontrado."
            : "Erro ao fazer login.");
        alert(message);
        return;
      }

      console.log("Usuário logado:", result);

      // Salva dados 
      localStorage.setItem("cadastroId", result.cadastroId);
      localStorage.setItem("nome", result.nome);
      localStorage.setItem("email", result.email);

      alert(`Bem-vindo, ${result.nome || "usuário"}!`);

     
      setTimeout(() => {
        window.location.href = "registerRole.html";
      }, 400);

    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Erro de conexão com o servidor. Verifique se a API está rodando.");
    }
  });
});
