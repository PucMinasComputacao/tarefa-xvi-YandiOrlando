const API_URL = "http://localhost:3000";

function idsIguais(a, b) {
  return String(a) === String(b);
}

function mostrarToast(msg) {
  const toast = document.getElementById("toast-notif");
  if (!toast) return;
  toast.innerHTML = msg;
  toast.style.display = "block";
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => { toast.style.display = "none"; }, 400);
  }, 2500);
}

function getFavoritosKey() {
  const usuario = getUsuarioCorrente();
  return usuario ? `favoritos_${usuario.id}` : null;
}

function getFavoritos() {
  const key = getFavoritosKey();
  if (!key) return [];
  const dados = localStorage.getItem(key);
  return dados ? JSON.parse(dados) : [];
}

function salvarFavoritos(lista) {
  const key = getFavoritosKey();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(lista));
}

function isFavorito(id) {
  return getFavoritos().some(item => idsIguais(item, id));
}

function toggleFavorito(id) {
  const usuario = getUsuarioCorrente();
  if (!usuario) {
    mostrarToast("🔒 Você precisa estar logado para favoritar!");
    setTimeout(() => { window.location.href = "login.html"; }, 1500);
    return null;
  }
  let lista = getFavoritos();
  if (lista.some(item => idsIguais(item, id))) {
    lista = lista.filter(item => !idsIguais(item, id));
    salvarFavoritos(lista);
    return false;
  } else {
    lista.push(id);
    salvarFavoritos(lista);
    return true;
  }
}

async function carregarCarousel() {
  const carousel = document.getElementById("carousel-content");
  if (!carousel) return;
  const response = await fetch(`${API_URL}/desenvolvedores`);
  const desenvolvedores = await response.json();
  const destaques = desenvolvedores.filter(dev => dev.destaque);
  destaques.forEach((dev, index) => {
    carousel.innerHTML += `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <div class="carousel-bg" style="background-image:url('${dev.imagem}')">
          <div class="carousel-overlay">
            <div class="carousel-content">
              <h2>${dev.nome}</h2>
              <p>${dev.descricao}</p>
              <a href="detalhes.html?id=${dev.id}" class="btn-custom">Ver detalhes</a>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

async function carregarCards() {
  const container = document.getElementById("cards-container");
  if (!container) return;
  const response = await fetch(`${API_URL}/desenvolvedores`);
  const desenvolvedores = await response.json();
  container.innerHTML = "";

  desenvolvedores.forEach(dev => {
    const favoritado = isFavorito(dev.id);
    const usuario = getUsuarioCorrente();

    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6 mb-4";
    col.innerHTML = `
      <div class="card-custom ${favoritado ? 'card-favoritado' : ''}" id="card-${dev.id}">
        <div class="card-img-bg" style="background-image:url('${dev.imagem}')">
          <button
            class="btn-favorito ${favoritado ? 'ativo' : ''}"
            data-id="${dev.id}"
            title="${favoritado ? 'Remover dos favoritos' : 'Favoritar'}"
            aria-label="Favoritar ${dev.nome}"
          >${favoritado ? '★' : '☆'}</button>
        </div>
        <div class="card-content">
          <h5>${dev.nome}</h5>
          <p>${dev.descricao}</p>
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:12px;">
            <a href="detalhes.html?id=${dev.id}" class="btn-custom">Saiba mais</a>
            ${usuario ? `<button class="btn-deletar-card" data-id="${dev.id}" data-nome="${dev.nome}" style="background:#e84040;color:#fff;border:none;padding:8px 14px;border-radius:6px;font-weight:bold;cursor:pointer;">✕ Excluir</button>` : ''}
          </div>
        </div>
      </div>
    `;

    col.querySelector(".btn-favorito").addEventListener("click", (e) => {
      const resultado = toggleFavorito(dev.id);
      if (resultado === null) return;
      const btn = e.currentTarget;
      const card = document.getElementById(`card-${dev.id}`);
      if (resultado) {
        btn.innerHTML = "★"; btn.classList.add("ativo"); btn.title = "Remover dos favoritos";
        card.classList.add("card-favoritado");
        mostrarToast(`★ ${dev.nome} adicionado aos favoritos!`);
      } else {
        btn.innerHTML = "☆"; btn.classList.remove("ativo"); btn.title = "Favoritar";
        card.classList.remove("card-favoritado");
        mostrarToast(`☆ ${dev.nome} removido dos favoritos.`);
      }
    });

    const btnDel = col.querySelector(".btn-deletar-card");
    if (btnDel) {
      btnDel.addEventListener("click", () => {
        abrirConfirmDelete(dev.id, dev.nome, () => carregarCards());
      });
    }

    container.appendChild(col);
  });
}

async function carregarDetalhes() {
  const detalhes = document.getElementById("detalhes-container");
  if (!detalhes) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) { detalhes.innerHTML = "<p>ID não informado. Volte para a página inicial.</p>"; return; }

  const response = await fetch(`${API_URL}/desenvolvedores/${id}`);
  if (response.status === 404) { detalhes.innerHTML = "<p>Desenvolvedor não encontrado.</p>"; return; }

  const dev = await response.json();
  const usuario = getUsuarioCorrente();

  detalhes.innerHTML = `
    <div class="details-wrapper">
      <div class="row g-0">
        <div class="col-lg-6">
          <div class="details-img" style="background-image:url('${dev.imagem}')"></div>
        </div>
        <div class="col-lg-6">
          <div class="details-content">
            <h2>${dev.nome}</h2>
            <p>${dev.conteudo}</p>
            <p><strong>País:</strong> ${dev.pais}</p>
            <p><strong>Categoria:</strong> Desenvolvedor de Jogos</p>
            <p><strong>Status:</strong> Figura Influente da Indústria</p>
            ${usuario ? `
              <div class="crud-actions">
                <button class="btn-editar" id="btn-abrir-editar">✏️ Editar</button>
                <button class="btn-deletar" id="btn-abrir-deletar">🗑️ Excluir</button>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  const obrasContainer = document.getElementById("atracoes-container");
  dev.obras.forEach(obra => {
    obrasContainer.innerHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="atracao-card">
          <div class="atracao-img" style="background-image:url('${obra.imagem}')"></div>
          <div class="atracao-content">
            <h5>${obra.nome}</h5>
            <p>${obra.descricao}</p>
          </div>
        </div>
      </div>
    `;
  });

  if (usuario) {
    document.getElementById("btn-abrir-editar").addEventListener("click", () => abrirModalEditar(dev));
    document.getElementById("btn-abrir-deletar").addEventListener("click", () => {
      abrirConfirmDelete(dev.id, dev.nome, () => { window.location.href = "index.html"; });
    });
  }
}

async function criarDesenvolvedor(dados) {
  const response = await fetch(`${API_URL}/desenvolvedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
  return response.json();
}

async function editarDesenvolvedor(id, dados) {
  const response = await fetch(`${API_URL}/desenvolvedores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
  return response.json();
}

async function deletarDesenvolvedor(id) {
  await fetch(`${API_URL}/desenvolvedores/${id}`, { method: "DELETE" });
}

function abrirModalEditar(dev) {
  document.getElementById("edit-nome").value = dev.nome;
  document.getElementById("edit-descricao").value = dev.descricao;
  document.getElementById("edit-conteudo").value = dev.conteudo;
  document.getElementById("edit-pais").value = dev.pais;
  document.getElementById("edit-imagem").value = dev.imagem;
  document.getElementById("edit-destaque").checked = dev.destaque;
  document.getElementById("modal-editar").classList.add("show");

  document.getElementById("btn-salvar-editar").onclick = async () => {
    const dadosAtualizados = {
      ...dev,
      nome: document.getElementById("edit-nome").value.trim(),
      descricao: document.getElementById("edit-descricao").value.trim(),
      conteudo: document.getElementById("edit-conteudo").value.trim(),
      pais: document.getElementById("edit-pais").value.trim(),
      imagem: document.getElementById("edit-imagem").value.trim(),
      destaque: document.getElementById("edit-destaque").checked,
    };
    await editarDesenvolvedor(dev.id, dadosAtualizados);
    document.getElementById("modal-editar").classList.remove("show");
    mostrarToast("✅ Desenvolvedor atualizado com sucesso!");
    setTimeout(() => location.reload(), 1200);
  };

  document.getElementById("btn-cancelar-editar").onclick = () => {
    document.getElementById("modal-editar").classList.remove("show");
  };
}

function abrirConfirmDelete(id, nome, onConfirm) {
  document.getElementById("confirm-delete-msg").textContent = `Tem certeza que deseja excluir "${nome}"? Essa ação não pode ser desfeita.`;
  document.getElementById("modal-deletar").classList.add("show");

  document.getElementById("btn-confirmar-deletar").onclick = async () => {
    await deletarDesenvolvedor(id);
    document.getElementById("modal-deletar").classList.remove("show");
    mostrarToast(`🗑️ ${nome} excluído com sucesso.`);
    setTimeout(onConfirm, 900);
  };

  document.getElementById("btn-cancelar-deletar").onclick = () => {
    document.getElementById("modal-deletar").classList.remove("show");
  };
}

function abrirModalCriar() {
  document.getElementById("criar-nome").value = "";
  document.getElementById("criar-descricao").value = "";
  document.getElementById("criar-conteudo").value = "";
  document.getElementById("criar-pais").value = "";
  document.getElementById("criar-imagem").value = "";
  document.getElementById("criar-destaque").checked = false;
  document.getElementById("modal-criar").classList.add("show");

  document.getElementById("btn-salvar-criar").onclick = async () => {
    const nome = document.getElementById("criar-nome").value.trim();
    const descricao = document.getElementById("criar-descricao").value.trim();
    const conteudo = document.getElementById("criar-conteudo").value.trim();
    const pais = document.getElementById("criar-pais").value.trim();
    const imagem = document.getElementById("criar-imagem").value.trim() || "assets/img/default.png";
    const destaque = document.getElementById("criar-destaque").checked;

    if (!nome || !descricao || !conteudo || !pais) {
      mostrarToast("⚠️ Preencha todos os campos obrigatórios.");
      return;
    }

    await criarDesenvolvedor({ nome, descricao, conteudo, pais, imagem, destaque, obras: [] });
    document.getElementById("modal-criar").classList.remove("show");
    mostrarToast(`✅ ${nome} adicionado com sucesso!`);
    carregarCards();
    carregarCarousel();
  };

  document.getElementById("btn-cancelar-criar").onclick = () => {
    document.getElementById("modal-criar").classList.remove("show");
  };
}

async function carregarFavoritos() {
  const container = document.getElementById("favoritos-container");
  const msgVazio = document.getElementById("msg-vazio");
  if (!container) return;

  const usuario = getUsuarioCorrente();
  if (!usuario) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <p style="color:#c7d5e0; font-size:18px;">Você precisa estar logado para ver seus favoritos.</p>
        <a href="login.html" class="btn-custom mt-3 d-inline-block">Entrar</a>
      </div>
    `;
    return;
  }

  const ids = getFavoritos();
  if (ids.length === 0) { if (msgVazio) msgVazio.style.display = "block"; return; }

  const response = await fetch(`${API_URL}/desenvolvedores`);
  const todos = await response.json();
  const favoritos = todos.filter(dev => ids.some(id => idsIguais(id, dev.id)));

  if (favoritos.length === 0) { if (msgVazio) msgVazio.style.display = "block"; return; }

  favoritos.forEach(dev => {
    container.innerHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card-custom card-favoritado" id="fav-card-${dev.id}">
          <div class="card-img-bg" style="background-image:url('${dev.imagem}')">
            <button class="btn-favorito ativo" data-id="${dev.id}" title="Remover dos favoritos">★</button>
          </div>
          <div class="card-content">
            <h5>${dev.nome}</h5>
            <p>${dev.descricao}</p>
            <a href="detalhes.html?id=${dev.id}" class="btn-custom">Saiba mais</a>
          </div>
        </div>
      </div>
    `;
  });

  container.querySelectorAll(".btn-favorito").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      toggleFavorito(id);
      document.getElementById(`fav-card-${id}`).closest(".col-lg-4").remove();
      if (container.querySelectorAll(".col-lg-4").length === 0 && msgVazio) {
        msgVazio.style.display = "block";
      }
    });
  });
}


carregarCarousel();
carregarCards();
carregarDetalhes();
carregarFavoritos();