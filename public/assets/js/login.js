const LOGIN_API = "http://localhost:3000";

function getUsuarioCorrente() {
  const dados = sessionStorage.getItem("usuarioCorrente");
  return dados ? JSON.parse(dados) : null;
}

function salvarUsuarioCorrente(usuario) {
  sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuario));
}

async function loginUser(login, senha) {
  try {
    const response = await fetch(`${LOGIN_API}/usuarios`);
    const usuarios = await response.json();
    const usuario = usuarios.find(u => u.login === login && u.senha === senha);
    if (!usuario) return null;
    const usuarioCorrente = {
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      senha: usuario.senha,
      email: usuario.email
    };
    salvarUsuarioCorrente(usuarioCorrente);
    return usuarioCorrente;
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    return null;
  }
}

function logoutUser() {
  sessionStorage.removeItem("usuarioCorrente");
  window.location.href = "login.html";
}

function renderLoginStatus() {
  const area = document.getElementById("login-status");
  if (!area) return;
  const usuario = getUsuarioCorrente();
  if (usuario) {
    area.innerHTML = `
      <span class="login-info">
        Olá, <strong>${usuario.nome}</strong>
        <a href="#" onclick="logoutUser(); return false;">| Sair</a>
      </span>
    `;
  } else {
    area.innerHTML = `
      <a href="login.html" class="login-link">Entrar</a>
    `;
  }
}