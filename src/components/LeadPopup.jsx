import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, Play, ShieldCheck, Sparkles, X } from 'lucide-react';
import {
  EMAIL_API_BASE,
  EMPREENDIMENTOS,
  WHATSAPP_DEFAULT,
  WHATSAPP_SHOWN,
  getPopupFeaturedEmpreendimento,
  waLink,
} from '../data/empreendimentos.js';

const STORAGE_KEY = 'thony_lead_popup_state_v1';

export default function LeadPopup({ forceOpen = false }) {
  const featured = getPopupFeaturedEmpreendimento(EMPREENDIMENTOS);
  const [open, setOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [interest, setInterest] = useState(featured?.slug || 'todos');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wantsPopup =
      forceOpen ||
      params.get('popup') === '1' ||
      window.location.hash === '#popup' ||
      window.location.hash === '#receber-imoveis';

    if (wantsPopup) {
      setOpen(true);
      return;
    }

    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch {
      saved = null;
    }

    // REGRA DO IMÓVEL NOVO EM DESTAQUE:
    // Se um novo imóvel foi adicionado (featured.slug mudou em relação ao último visto),
    // mostra o pop-up novamente mesmo para visitantes recorrentes.
    if (saved && saved.subscribed && saved.featuredSlug === featured?.slug) {
      return;
    }
    if (
      saved &&
      saved.dismissedAt &&
      saved.featuredSlug === featured?.slug &&
      Date.now() - saved.dismissedAt < 1000 * 60 * 60 * 12
    ) {
      return;
    }

    const timer = setTimeout(() => setOpen(true), 2200);
    return () => clearTimeout(timer);
  }, [forceOpen, featured?.slug]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const handleClose = () => {
    setOpen(false);
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...prev,
          dismissedAt: Date.now(),
          featuredSlug: featured?.slug || '',
        })
      );
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMsg('Digite um endereço de e-mail válido.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${EMAIL_API_BASE}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: cleanEmail,
          whatsapp: whatsapp.trim(),
          interest,
          featuredSlug: featured?.slug || '',
          source: window.location.pathname,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || 'Não foi possível concluir sua inscrição agora.');
      }
      setStatus('success');
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            subscribed: true,
            email: cleanEmail,
            featuredSlug: featured?.slug || '',
            subscribedAt: Date.now(),
          })
        );
      } catch {}
    } catch (err) {
      setErrorMsg(err.message || 'Erro de conexão. Tente novamente.');
      setStatus('error');
    }
  };

  if (!featured) return null;

  return (
    <>
      <button
        type="button"
        className="popup-trigger-pill"
        onClick={() => setOpen(true)}
        aria-label="Receber imóveis e tabelas por e-mail"
      >
        <Mail size={15} />
        <span>Receber imóveis no e-mail</span>
      </button>

      {open && (
        <div
          className="lead-popup-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-popup-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="lead-popup-card">
            <button
              type="button"
              className="lead-popup-close"
              onClick={handleClose}
              aria-label="Fechar janela de inscrição"
            >
              <span>FECHAR</span>
              <X size={16} />
            </button>

            {/* COLUNA ESQUERDA: VÍDEO EM ALTA DEFINIÇÃO (COM FALLBACK AUTOMÁTICO PARA IMAGEM) + IMÓVEL EM DESTAQUE */}
            <div className="lead-popup-media">
              {!videoFailed && featured.popupVideo ? (
                <video
                  className="lead-popup-video"
                  src={featured.popupVideo}
                  poster={featured.cover}
                  preload="auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  onError={() => setVideoFailed(true)}
                />
              ) : (
                <img
                  className="lead-popup-video"
                  src={featured.cover}
                  alt={featured.coverAlt || featured.name}
                />
              )}

              <div className="lead-popup-media-overlay">
                <div className="lead-popup-top-badges">
                  <span className="lead-popup-badge-gold">
                    <Sparkles size={12} /> DESTAQUE DO PORTFÓLIO · {featured.city.toUpperCase()}
                  </span>
                </div>

                <div className="lead-popup-featured-box">
                  <small>{featured.region.toUpperCase()} · {featured.modality.toUpperCase()}</small>
                  <h3>{featured.name}</h3>
                  <p>{featured.popupHook || featured.shortDescription}</p>
                  <div className="lead-popup-featured-meta">
                    <strong>{featured.priceHighlight}</strong>
                    <a href={`/empreendimentos/${featured.slug}/`} onClick={handleClose}>
                      Ver imóvel <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: FORMULÁRIO DE CAPTURA + LINKS LEGAIS */}
            <div className="lead-popup-content">
              <span className="lead-popup-eyebrow">
                ● CURADORIA IMOBILIÁRIA NO SEU E-MAIL
              </span>
              <h2 id="lead-popup-title">
                Receba os melhores lotes de Goiânia e Goianira{' '}
                <em>com fotos, vídeos e tabela real.</em>
              </h2>
              <p className="lead-popup-sub">
                Cadastre seu e-mail para receber <strong>agora mesmo</strong> a apresentação
                completa do <strong>{featured.shortName}</strong>, além de novas oportunidades
                selecionadas, mapas de implantação e condições diretas com a urbanizadora.
              </p>

              {status === 'success' ? (
                <div className="lead-popup-success">
                  <CheckCircle2 size={32} />
                  <h3>Inscrição confirmada! Confira sua caixa de entrada.</h3>
                  <p>
                    Enviamos agora para o seu e-mail a apresentação completa do{' '}
                    <strong>{featured.name}</strong> e o comparativo oficial dos nossos 4
                    empreendimentos em Goiânia e Goianira.
                  </p>
                  <div className="lead-popup-success-actions">
                    <a
                      className="lead-popup-submit"
                      href={waLink(
                        `Olá, Thony! Acabei de me cadastrar no pop-up do site e quero receber a tabela atualizada do ${featured.name}.`,
                        WHATSAPP_DEFAULT
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RECEBER TABELA NO WHATSAPP AGORA <ArrowUpRight size={16} />
                    </a>
                    <button type="button" className="lead-popup-secondary" onClick={handleClose}>
                      Continuar navegando no site
                    </button>
                  </div>
                </div>
              ) : (
                <form className="lead-popup-form" onSubmit={handleSubmit}>
                  <div className="lead-popup-row-2">
                    <label>
                      <span>SEU NOME</span>
                      <input
                        type="text"
                        placeholder="Como podemos chamar você?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      <span>WHATSAPP (OPCIONAL)</span>
                      <input
                        type="tel"
                        placeholder="(62) 99999-9999"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                      />
                    </label>
                  </div>

                  <label>
                    <span>SEU MELHOR E-MAIL *</span>
                    <input
                      type="email"
                      placeholder="voce@exemplo.com.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>

                  <label>
                    <span>IMÓVEL DE MAIOR INTERESSE</span>
                    <select value={interest} onChange={(e) => setInterest(e.target.value)}>
                      <option value={featured.slug}>
                        ★ Em destaque: {featured.name} ({featured.priceHighlight})
                      </option>
                      {EMPREENDIMENTOS.filter((x) => x.slug !== featured.slug).map((e) => (
                        <option key={e.slug} value={e.slug}>
                          {e.name} — {e.city} ({e.priceHighlight})
                        </option>
                      ))}
                      <option value="todos">Quero receber todos os 4 empreendimentos</option>
                    </select>
                  </label>

                  {status === 'error' && <p className="lead-popup-error">{errorMsg}</p>}

                  <button
                    type="submit"
                    className="lead-popup-submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading'
                      ? 'ENVIANDO SEU 1º E-MAIL...'
                      : 'QUERO RECEBER OS IMÓVEIS NO MEU E-MAIL'}
                    <ArrowUpRight size={17} />
                  </button>
                </form>
              )}

              <div className="lead-popup-trust">
                <span>
                  <ShieldCheck size={14} /> Curadoria oficial · Zero spam · Cancelamento em 1
                  clique
                </span>
                <span>Atendimento direto: {WHATSAPP_SHOWN}</span>
              </div>

              <div className="lead-popup-legal">
                Ao se inscrever, você concorda em receber comunicações imobiliárias da Thony
                Oliveira Imóveis conforme nossa{' '}
                <a href="/privacidade/">Política de Privacidade (LGPD)</a>,{' '}
                <a href="/termos/">Termos de Uso</a>, <a href="/cookies/">Política de Cookies</a> e
                opção de <a href="/descadastrar/">Descadastrar</a> a qualquer momento.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
