const baseApiUrl = "http://localhost:5000";

const pacientesCountEl = document.getElementById("pacientes-count");
const atendimentosCountEl = document.getElementById("atendimentos-count");
const alertasCountEl = document.getElementById("alertas-count");
const pacientesListEl = document.getElementById("pacientes-list");
const pacientesStatusEl = document.getElementById("pacientes-status");
const refreshButton = document.getElementById("refresh-pacientes");
const formEl = document.getElementById("paciente-form");
const formModeEl = document.getElementById("form-mode");
const formStatusEl = document.getElementById("form-status");
const pacienteIdEl = document.getElementById("paciente-id");
const pacienteNomeEl = document.getElementById("paciente-nome");
const pacienteIdadeEl = document.getElementById("paciente-idade");
const pacienteCondicaoEl = document.getElementById("paciente-condicao");
const pacienteObservacoesEl = document.getElementById("paciente-observacoes");
const pacienteSubmitEl = document.getElementById("paciente-submit");
const pacienteCancelEl = document.getElementById("paciente-cancel");
const rotinasListEl = document.getElementById("rotinas-list");
const rotinasStatusEl = document.getElementById("rotinas-status");
const rotinaFormEl = document.getElementById("rotina-form");
const rotinaFormModeEl = document.getElementById("rotina-form-mode");
const rotinaFormStatusEl = document.getElementById("rotina-form-status");
const rotinaIdEl = document.getElementById("rotina-id");
const rotinaPacienteIdEl = document.getElementById("rotina-paciente-id");
const rotinaPeriodoEl = document.getElementById("rotina-periodo");
const rotinaDescricaoEl = document.getElementById("rotina-descricao");
const rotinaSubmitEl = document.getElementById("rotina-submit");
const rotinaCancelEl = document.getElementById("rotina-cancel");

let pacientesCache = [];
let rotinasCache = [];

function buildUrl(path) {
  return `${baseApiUrl}${path}`;
}

function showStatus(element, message, tone) {
  element.textContent = message;
  element.className = "text-xs";
  if (tone === "error") {
    element.classList.add("text-red-600");
    return;
  }
  if (tone === "success") {
    element.classList.add("text-emerald-600");
    return;
  }
  element.classList.add("text-slate-500");
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!response.ok) {
    let errorMessage = `Falha ao acessar ${url}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }
  return response.json();
}

function findById(items, id) {
  return items.find((item) => String(item.id) === String(id));
}

function renderPacientes(pacientes) {
  pacientesCache = pacientes;
  pacientesListEl.innerHTML = "";

  if (!pacientes.length) {
    showStatus(pacientesStatusEl, "Nenhum paciente cadastrado ainda.", "info");
    return;
  }

  showStatus(pacientesStatusEl, `${pacientes.length} pacientes encontrados.`, "info");

  pacientes.slice(0, 6).forEach((paciente) => {
    const card = document.createElement("div");
    card.className = "rounded-2xl border border-slate-200 bg-white/80 p-4";
    card.innerHTML = `
      <p class="text-sm font-semibold">${paciente.nome}</p>
      <p class="text-xs text-slate-500">Idade: ${paciente.idade ?? "--"}</p>
      <p class="text-xs text-slate-500">Condicao: ${paciente.condicao ?? "--"}</p>
      <p class="text-xs text-slate-500">Observacoes: ${paciente.observacoes ?? "--"}</p>
      <div class="mt-3 flex gap-2">
        <button
          class="rounded-lg border border-[#1a1f2b] px-3 py-1 text-xs font-semibold"
          data-action="editar"
          data-id="${paciente.id}"
        >
          Editar
        </button>
        <button
          class="rounded-lg border border-red-500 px-3 py-1 text-xs font-semibold text-red-500"
          data-action="deletar"
          data-id="${paciente.id}"
        >
          Excluir
        </button>
      </div>
    `;
    pacientesListEl.appendChild(card);
  });
}

async function buscarPacientes() {
  showStatus(pacientesStatusEl, "Carregando pacientes...", "info");
  try {
    const pacientesData = await fetchJson(buildUrl("/pacientes"));
    const pacientes = pacientesData.data || [];
    pacientesCountEl.textContent = pacientes.length;
    renderPacientes(pacientes);
    return pacientes;
  } catch (err) {
    showStatus(pacientesStatusEl, "Nao foi possivel carregar os pacientes.", "error");
    return [];
  }
}

async function criarPaciente(payload) {
  showStatus(formStatusEl, "Salvando paciente...", "info");
  const response = await fetchJson(buildUrl("/pacientes"), {
    method: "POST",
    body: JSON.stringify(payload),
  });
  showStatus(formStatusEl, response.message || "Paciente criado com sucesso.", "success");
  return response.data;
}

async function atualizarPaciente(id, payload) {
  showStatus(formStatusEl, "Atualizando paciente...", "info");
  const response = await fetchJson(buildUrl(`/pacientes/${id}`), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  showStatus(formStatusEl, response.message || "Paciente atualizado.", "success");
  return response.data;
}

async function deletarPaciente(id) {
  showStatus(formStatusEl, "Removendo paciente...", "info");
  const response = await fetchJson(buildUrl(`/pacientes/${id}`), {
    method: "DELETE",
  });
  showStatus(formStatusEl, response.message || "Paciente removido.", "success");
  return response.data;
}

function formatPeriodo(periodo) {
  if (periodo === "manha") return "Manha";
  if (periodo === "tarde") return "Tarde";
  if (periodo === "noite") return "Noite";
  return "Sem periodo";
}

function findPacienteNome(pacienteId) {
  const paciente = findById(pacientesCache, pacienteId);
  return paciente ? paciente.nome : `Paciente #${pacienteId}`;
}

function renderRotinas(rotinas) {
  rotinasCache = rotinas;
  rotinasListEl.innerHTML = "";

  if (!rotinas.length) {
    showStatus(rotinasStatusEl, "Nenhuma rotina cadastrada ainda.", "info");
    return;
  }

  showStatus(rotinasStatusEl, `${rotinas.length} rotinas encontradas.`, "info");

  rotinas.slice(0, 6).forEach((rotina) => {
    const card = document.createElement("div");
    card.className = "rounded-2xl bg-white/80 px-4 py-3";
    card.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold">${formatPeriodo(rotina.periodo)}</p>
          <p class="mt-1 text-xs uppercase text-[#2f6f5e]">${rotina.descricao ?? "--"}</p>
          <p class="mt-1 text-xs text-slate-500">${findPacienteNome(rotina.paciente_id)}</p>
        </div>
        <div class="flex gap-2">
          <button
            class="rounded-lg border border-[#1a1f2b] px-3 py-1 text-xs font-semibold"
            data-action="editar-rotina"
            data-id="${rotina.id}"
          >
            Editar
          </button>
          <button
            class="rounded-lg border border-red-500 px-3 py-1 text-xs font-semibold text-red-500"
            data-action="deletar-rotina"
            data-id="${rotina.id}"
          >
            Excluir
          </button>
        </div>
      </div>
    `;
    rotinasListEl.appendChild(card);
  });
}

async function buscarRotinas() {
  showStatus(rotinasStatusEl, "Carregando rotinas...", "info");
  try {
    const rotinasData = await fetchJson(buildUrl("/rotinas"));
    const rotinas = rotinasData.data || [];
    renderRotinas(rotinas);
    return rotinas;
  } catch (err) {
    showStatus(rotinasStatusEl, "Nao foi possivel carregar as rotinas.", "error");
    return [];
  }
}

async function criarRotina(payload) {
  showStatus(rotinaFormStatusEl, "Salvando rotina...", "info");
  const response = await fetchJson(buildUrl("/rotinas"), {
    method: "POST",
    body: JSON.stringify(payload),
  });
  showStatus(rotinaFormStatusEl, response.message || "Rotina criada com sucesso.", "success");
  return response.data;
}

async function atualizarRotina(id, payload) {
  showStatus(rotinaFormStatusEl, "Atualizando rotina...", "info");
  const response = await fetchJson(buildUrl(`/rotinas/${id}`), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  showStatus(rotinaFormStatusEl, response.message || "Rotina atualizada.", "success");
  return response.data;
}

async function deletarRotina(id) {
  showStatus(rotinaFormStatusEl, "Removendo rotina...", "info");
  const response = await fetchJson(buildUrl(`/rotinas/${id}`), {
    method: "DELETE",
  });
  showStatus(rotinaFormStatusEl, response.message || "Rotina removida.", "success");
  return response.data;
}

async function loadDashboard() {
  try {
    const [pacientes, atendimentosData, rotinas] = await Promise.all([
      buscarPacientes(),
      fetchJson(buildUrl("/atendimentos")),
      buscarRotinas(),
    ]);
    const atendimentos = atendimentosData.data || [];
    pacientesCountEl.textContent = pacientes.length;
    atendimentosCountEl.textContent = atendimentos.length;
    alertasCountEl.textContent = String(rotinas.length);
  } catch (err) {
    showStatus(pacientesStatusEl, "Nao foi possivel carregar os dados da API.", "error");
  }
}

function resetForm() {
  pacienteIdEl.value = "";
  formModeEl.textContent = "Criar";
  pacienteSubmitEl.textContent = "Salvar paciente";
  formEl.reset();
}

function resetRotinaForm() {
  rotinaIdEl.value = "";
  rotinaFormModeEl.textContent = "Criar";
  rotinaSubmitEl.textContent = "Salvar rotina";
  rotinaFormEl.reset();
}

function fillForm(paciente) {
  pacienteIdEl.value = paciente.id;
  pacienteNomeEl.value = paciente.nome || "";
  pacienteIdadeEl.value = paciente.idade ?? "";
  pacienteCondicaoEl.value = paciente.condicao || "";
  pacienteObservacoesEl.value = paciente.observacoes || "";
  formModeEl.textContent = "Editar";
  pacienteSubmitEl.textContent = "Atualizar paciente";
}

function fillRotinaForm(rotina) {
  rotinaIdEl.value = rotina.id;
  rotinaPacienteIdEl.value = rotina.paciente_id ?? "";
  rotinaPeriodoEl.value = rotina.periodo || "";
  rotinaDescricaoEl.value = rotina.descricao || "";
  rotinaFormModeEl.textContent = "Editar";
  rotinaSubmitEl.textContent = "Atualizar rotina";
}

function collectFormData() {
  return {
    nome: pacienteNomeEl.value.trim(),
    idade: pacienteIdadeEl.value ? Number(pacienteIdadeEl.value) : null,
    condicao: pacienteCondicaoEl.value.trim() || null,
    observacoes: pacienteObservacoesEl.value.trim() || null,
  };
}

function collectRotinaFormData() {
  return {
    paciente_id: rotinaPacienteIdEl.value ? Number(rotinaPacienteIdEl.value) : null,
    periodo: rotinaPeriodoEl.value,
    descricao: rotinaDescricaoEl.value.trim(),
  };
}

async function refreshPacientes() {
  await buscarPacientes();
}

async function refreshRotinas() {
  await buscarRotinas();
}

async function refreshDashboard() {
  await loadDashboard();
}

refreshButton.addEventListener("click", () => {
  refreshDashboard();
});

pacienteCancelEl.addEventListener("click", () => {
  resetForm();
  showStatus(formStatusEl, "Edicao cancelada.", "info");
});

pacientesListEl.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id;
  if (!action || !id) return;

  if (action === "editar") {
    const paciente = findById(pacientesCache, id);
    if (paciente) {
      fillForm(paciente);
      showStatus(formStatusEl, "Edite os campos e salve.", "info");
    }
    return;
  }

  if (action === "deletar") {
    const confirmed = window.confirm("Deseja remover este paciente?");
    if (!confirmed) return;
    try {
      await deletarPaciente(id);
      await refreshPacientes();
    } catch (err) {
      showStatus(formStatusEl, err.message || "Erro ao deletar.", "error");
    }
  }
});

rotinaCancelEl.addEventListener("click", () => {
  resetRotinaForm();
  showStatus(rotinaFormStatusEl, "Edicao de rotina cancelada.", "info");
});

rotinasListEl.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;
  if (!action || !id) return;

  if (action === "editar-rotina") {
    const rotina = findById(rotinasCache, id);
    if (rotina) {
      fillRotinaForm(rotina);
      showStatus(rotinaFormStatusEl, "Edite a rotina e salve as alteracoes.", "info");
    }
    return;
  }

  if (action === "deletar-rotina") {
    const confirmed = window.confirm("Deseja remover esta rotina?");
    if (!confirmed) return;
    try {
      await deletarRotina(id);
      await refreshRotinas();
      resetRotinaForm();
    } catch (err) {
      showStatus(rotinaFormStatusEl, err.message || "Erro ao deletar rotina.", "error");
    }
  }
});

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = collectFormData();
  if (!payload.nome) {
    showStatus(formStatusEl, "Nome e obrigatorio.", "error");
    return;
  }
  try {
    if (pacienteIdEl.value) {
      await atualizarPaciente(pacienteIdEl.value, payload);
    } else {
      await criarPaciente(payload);
    }
    resetForm();
    await refreshPacientes();
  } catch (err) {
    showStatus(formStatusEl, err.message || "Erro ao salvar.", "error");
  }
});

rotinaFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = collectRotinaFormData();

  if (!payload.paciente_id || !payload.periodo || !payload.descricao) {
    showStatus(rotinaFormStatusEl, "Paciente, periodo e descricao sao obrigatorios.", "error");
    return;
  }

  try {
    if (rotinaIdEl.value) {
      await atualizarRotina(rotinaIdEl.value, payload);
    } else {
      await criarRotina(payload);
    }
    resetRotinaForm();
    await refreshDashboard();
  } catch (err) {
    showStatus(rotinaFormStatusEl, err.message || "Erro ao salvar rotina.", "error");
  }
});

loadDashboard();
