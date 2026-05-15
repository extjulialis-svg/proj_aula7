const API = '';

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('nav-' + tab).classList.add('active');
  if (tab === 'estatisticas') carregarEstatisticas();
}

function showAlert(id, type, msg) {
  const el = document.getElementById(id);
  el.className = 'alert alert-' + type + ' show';
  el.innerHTML = (type === 'success' ? '✅ ' : '❌ ') + msg;
  setTimeout(() => el.classList.remove('show'), 5000);
}

const TIPOS = [
  'Uso de copo reutilizável',
  'Uso de garrafa reutilizável',
  'Separação de lixo reciclável',
  'Separação de lixo orgânico',
  'Compostagem doméstica',
  'Redução do uso de plástico descartável',
  'Uso de sacola reutilizável em compras',
  'Descarte correto de lixo eletrônico',
  'Descarte correto de óleo de cozinha',
  'Uso de transporte público',
  'Uso de bicicleta como meio de transporte',
  'Caminhada para deslocamentos curtos',
  'Carona compartilhada',
  'Uso de energia elétrica consciente',
  'Economia de água (banhos mais curtos)',
  'Reaproveitamento de água',
  'Compra de produtos de origem local',
  'Redução do desperdício de alimentos',
  'Uso de produtos de limpeza ecológicos',
  'Plantio de árvores ou hortas',
  'Participação em ações comunitárias ambientais',
  'Reutilização de embalagens',
  'Uso consciente de ar-condicionado',
  'Preferência por alimentos orgânicos',
  'Digitalização de documentos (redução de papel)',
];

function preencherTipos(selectId) {
  const sel = document.getElementById(selectId);
  TIPOS.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    sel.appendChild(opt);
  });
}

async function cadastrarPratica(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-cadastrar');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner" style="width:18px;height:18px;border-width:2px;display:inline-block;vertical-align:middle;margin-right:6px"></span> Enviando...';

  const tipoSel = document.getElementById('tipo-select').value;
  const tipoCustom = document.getElementById('tipo-custom').value.trim();
  const tipo = tipoSel === '__outro' ? tipoCustom : tipoSel;

  const body = {
    nomeUsuario: document.getElementById('nomeUsuario').value.trim(),
    tipo,
    data: document.getElementById('data').value,
    descricao: document.getElementById('descricao').value.trim() || undefined,
  };

  try {
    const res = await fetch(API + '/pratica', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (res.ok) {
      showAlert('alert-cadastro', 'success', 'Prática cadastrada com sucesso!');
      document.getElementById('form-cadastro').reset();
      document.getElementById('tipo-custom-row').style.display = 'none';
    } else {
      showAlert('alert-cadastro', 'error', json.message || 'Erro ao cadastrar prática.');
    }
  } catch {
    showAlert('alert-cadastro', 'error', 'Não foi possível conectar com a API.');
  }

  btn.disabled = false;
  btn.innerHTML = '🌱 Cadastrar Prática';
}

async function consultarHistorico() {
  const lista = document.getElementById('lista-historico');
  lista.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando...</div>';

  const params = new URLSearchParams();
  const nome = document.getElementById('filtro-nome').value.trim();
  const tipo = document.getElementById('filtro-tipo').value.trim();
  const di = document.getElementById('filtro-data-ini').value;
  const df = document.getElementById('filtro-data-fim').value;
  if (nome) params.append('nomeUsuario', nome);
  if (tipo) params.append('tipo', tipo);
  if (di) params.append('dataInicial', di);
  if (df) params.append('dataFinal', df);

  try {
    const res = await fetch(API + '/historico?' + params.toString());
    const dados = await res.json();

    if (!dados.length) {
      lista.innerHTML = '<div class="empty-state"><div class="empty-icon">🌿</div><p>Nenhuma prática encontrada.</p></div>';
      return;
    }

    lista.innerHTML = dados.map(p => `
      <div class="pratica-card">
        <div class="pratica-header">
          <span class="pratica-tipo">🌱 ${escHtml(p.tipo)}</span>
          <span class="pratica-data">📅 ${formatarData(p.data)}</span>
        </div>
        <div class="pratica-usuario">👤 ${escHtml(p.nomeUsuario)}</div>
        ${p.descricao ? `<div class="pratica-descricao">"${escHtml(p.descricao)}"</div>` : ''}
      </div>
    `).join('');
  } catch {
    lista.innerHTML = '<div class="empty-state"><div class="empty-icon">❌</div><p>Erro ao carregar histórico.</p></div>';
  }
}

function limparFiltros() {
  document.getElementById('filtro-nome').value = '';
  document.getElementById('filtro-tipo').value = '';
  document.getElementById('filtro-data-ini').value = '';
  document.getElementById('filtro-data-fim').value = '';
  document.getElementById('lista-historico').innerHTML = '<div class="empty-state"><div class="empty-icon">🌿</div><p>Use os filtros acima ou clique em Consultar.</p></div>';
}

async function carregarEstatisticas() {
  const container = document.getElementById('stats-container');
  container.innerHTML = '<div class="loading"><div class="spinner"></div>Carregando estatísticas...</div>';

  try {
    const res = await fetch(API + '/estatisticas');
    const d = await res.json();

    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card highlight">
          <div class="stat-icon">📊</div>
          <div class="stat-value">${d.totalGeral}</div>
          <div class="stat-label">Total de Práticas Registradas</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-value">${d.mediaDiariaUltimos30Dias}</div>
          <div class="stat-label">Média Diária (30 dias)</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-value" style="font-size:0.95rem">${escHtml(d.usuarioMaisAtivo || '—')}</div>
          <div class="stat-label">Usuário Mais Ativo</div>
        </div>
      </div>

      <div class="ranking-card">
        <div class="ranking-title">🌱 Prática Mais Registrada</div>
        <div style="font-size:1rem; font-weight:700; color:var(--green-dark); padding: 8px 0;">
          ${escHtml(d.tipoMaisRegistrado || '—')}
        </div>
      </div>

      <div class="ranking-card">
        <div class="ranking-title">♻️ Total por Tipo de Prática</div>
        ${d.totalPorTipo.map((item, i) => `
          <div class="ranking-item">
            <div class="ranking-pos ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">${i + 1}</div>
            <div class="ranking-nome">${escHtml(item.tipo)}</div>
            <div class="ranking-total">${item.total}</div>
          </div>
        `).join('')}
      </div>
    `;
  } catch {
    container.innerHTML = '<div class="empty-state"><div class="empty-icon">❌</div><p>Erro ao carregar estatísticas.</p></div>';
  }
}

function formatarData(dataStr) {
  if (!dataStr) return '';
  const [y, m, d] = dataStr.split('-');
  return `${d}/${m}/${y}`;
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
  preencherTipos('tipo-select');

  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById('data').value = hoje;

  document.getElementById('tipo-select').addEventListener('change', function () {
    const row = document.getElementById('tipo-custom-row');
    row.style.display = this.value === '__outro' ? 'block' : 'none';
    if (this.value !== '__outro') document.getElementById('tipo-custom').value = '';
  });

  document.getElementById('form-cadastro').addEventListener('submit', cadastrarPratica);
  showTab('cadastro');
});
