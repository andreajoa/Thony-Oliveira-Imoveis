import React from 'react';
import ScrollFilm from './ScrollFilm.jsx';
import { tourMedia } from '../experience.js';

// 7 quadros-chave → capítulo i "descansa" em p = i/6 e entra um pouco antes
const N = 7;
const STOPS = tourMedia.sequence?.stops?.length === N ? tourMedia.sequence.stops : Array.from({ length: N }, (_, i) => i / (N - 1));
const at = (i) => (i === 0 ? 0 : STOPS[i] - 0.38 * (STOPS[i] - STOPS[i - 1]));
const rest = (i) => (i === N - 1 ? 1 : STOPS[i]);

const chapters = [
  { eyebrow: 'CHEGADA', room: 'Fachada', detail: 'Porta pivotante, espelho d’água e a primeira impressão.',
    title: ['Entre.', 'Sinta.', 'Imagine viver.'],
    text: 'Role para atravessar a porta e conhecer cada cômodo. Volte o scroll para fazer o caminho inverso.' },
  { eyebrow: 'RECEBER', room: 'Hall de entrada', detail: 'Pé-direito duplo e a primeira vista do jardim.',
    title: ['A luz chega', 'antes de você.'],
    text: 'Um hall que já anuncia a casa: amplitude, madeira e luz natural.' },
  { eyebrow: 'VIVER', room: 'Sala de estar', detail: 'Integração total com o jardim.',
    title: ['Onde as melhores', 'histórias começam.'],
    text: 'Parede de vidro, lareira e espaço para reunir quem importa.' },
  { eyebrow: 'CONVIVER', room: 'Cozinha gourmet', detail: 'Ilha de pedra e jantar integrado.',
    title: ['Os pequenos rituais', 'fazem uma casa.'],
    text: 'Café da manhã, almoço de domingo, conversa até tarde.' },
  { eyebrow: 'DESCANSAR', room: 'Suíte principal', detail: 'Silêncio, madeira e saída para o deck.',
    title: ['Seu refúgio,', 'no seu ritmo.'],
    text: 'O fim do dia tem um endereço.' },
  { eyebrow: 'SAIR', room: 'Área externa', detail: 'Deck, piscina e paisagismo do cerrado.',
    title: ['Lá fora,', 'a casa continua.'],
    text: 'Você acabou de sair pela suíte. O jardim, a piscina e o céu de Goiânia fazem parte do lar.' },
  { eyebrow: 'PERTENCER', room: 'Vista do condomínio', detail: 'Do alto, o bairro e a vizinhança.',
    title: ['Agora, encontre', 'a sua.'],
    text: 'Esta foi uma visita ilustrativa. Continue rolando para explorar Goiânia ou fale com Thony.',
    cta: { label: 'EXPLORAR IMÓVEIS', href: '#imoveis' } },
].map((c, i) => ({ ...c, at: at(i), rest: rest(i), eyebrow: `${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')} · ${c.eyebrow}` }));

const ROOMS = [null, 'hall', 'sala', 'cozinha', 'suite', 'deck', null];

function MiniPlan(chapter) {
  const on = (r) => (ROOMS[chapter] === r ? 'room on' : 'room');
  return (
    <div className="sf-plan" aria-hidden="true">
      <div className="label"><span>PLANTA ILUSTRATIVA</span><span>VOCÊ ESTÁ AQUI</span></div>
      <svg viewBox="0 0 260 158">
        <rect className={on('deck')} x="14" y="6" width="232" height="36" rx="2" />
        <rect x="120" y="14" width="96" height="20" fill="#7fb3ad55" stroke="#e9dcc3" strokeWidth="1" />
        <rect className={on('sala')} x="14" y="46" width="112" height="58" />
        <rect className={on('cozinha')} x="126" y="46" width="66" height="58" />
        <rect className={on('suite')} x="192" y="46" width="54" height="94" />
        <rect className={on('hall')} x="96" y="104" width="64" height="36" />
        <text x="22" y="30">DECK · PISCINA</text>
        <text x="22" y="62">SALA</text>
        <text x="134" y="62">COZINHA</text>
        <text x="198" y="62">SUÍTE</text>
        <text x="104" y="120">HALL</text>
        <path className="path" pathLength="1000" d="M128 156 L128 124 L70 76 L158 76 L219 96 L219 24" />
      </svg>
    </div>
  );
}

export default function HouseTour() {
  return (
    <ScrollFilm
      id="visita-imersiva" variant="tour" label="Visita imersiva ilustrativa: entre na casa, conheça os cômodos e saia pelo jardim"
      heightVh={720} mobileHeightVh={560}
      stills={tourMedia.stills} sequence={tourMedia.sequence} transition="push"
      chapters={chapters}
      topline={['UMA EXPERIÊNCIA THONY OLIVEIRA', 'VISITA IMERSIVA · ROLE PARA CAMINHAR']}
      intro="ROLE PARA ENTRAR NA CASA"
      demoNote="Imagens geradas por IA · visita ilustrativa, não representa imóvel anunciado"
      cardExtra={MiniPlan}
    />
  );
}
