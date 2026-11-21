import React from 'react';
import ScrollFilm from './ScrollFilm.jsx';
import { buildMedia } from '../experience.js';

// 6 etapas da mesma câmera: terreno vazio → casa de dois andares pronta.
// Com vídeo (3 clipes: B0→B1, B1→B3, B3→B5) as etapas caem em 0, 1/3, 1/2, 2/3, 5/6, 1; só com fotos, a cada 1/5.
const N = 6;
const STOPS = buildMedia.sequence?.stops?.length === 6 ? buildMedia.sequence.stops : [0, 0.2, 0.4, 0.6, 0.8, 1];
const at = (i) => (i === 0 ? 0 : STOPS[i] - 0.38 * (STOPS[i] - STOPS[i - 1]));
const rest = (i) => (i === N - 1 ? 1 : STOPS[i]);

const chapters = [
  { eyebrow: 'O TERRENO', room: 'Terreno vazio', detail: 'Terra vermelha do cerrado, piquetes e linhas de marcação.', statement: true,
    title: ['Você batalhou.'],
    text: 'Cada hora extra, cada sonho adiado virou este terreno. Role e veja o que ele pode se tornar.' },
  { eyebrow: 'FUNDAÇÃO', room: 'Fundação', detail: 'A base que sustenta o futuro.',
    title: ['A base', 'de tudo.'],
    text: 'O primeiro compromisso com o futuro começa abaixo do chão.' },
  { eyebrow: 'ESTRUTURA', room: 'Estrutura', detail: 'Pilares, vigas e lajes de dois pavimentos.',
    title: ['Dois andares', 'ganham forma.'],
    text: 'Pilares, vigas e lajes desenham o que antes era só vontade.' },
  { eyebrow: 'PAREDES E COBERTURA', room: 'Paredes e cobertura', detail: 'Os ambientes encontram seu lugar.',
    title: ['Paredes', 'que acolhem.'],
    text: 'Cada parede define um cômodo. Cada abertura, uma vista.' },
  { eyebrow: 'ACABAMENTO', room: 'Acabamento', detail: 'Vidro, madeira e pedra.',
    title: ['Os detalhes', 'importam.'],
    text: 'Vidro, madeira e pedra dão personalidade à casa.' },
  { eyebrow: 'CASA PRONTA', room: 'Casa pronta', detail: 'Dois andares, piscina e jardim onde antes era terra.', statement: true,
    title: ['Você conquistou.', 'Agora é só morar.'],
    text: 'Tudo começa com o terreno certo. Fale com Thony e encontre o seu em Goiânia e região.',
    cta: { label: 'CONHECER OS 4 EMPREENDIMENTOS', href: '#imoveis' } },
].map((c, i) => ({ ...c, at: at(i), rest: rest(i), eyebrow: `ETAPA ${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')} · ${c.eyebrow}` }));

function Blueprint() {
  return (
    <div className="sf-blueprint" aria-hidden="true">
      <div className="label"><span>PROJETO ILUSTRATIVO</span><span>2 PAVIMENTOS</span></div>
      <svg viewBox="0 0 260 112">
        <path className="ln" pathLength="1000" d="M4 104 L4 18 L120 18 L120 104 Z M4 62 L70 62 L70 104 M70 18 L70 46 M92 62 L120 62 M30 104 L30 92 M56 18 L56 30" />
        <path className="ln l2" pathLength="1000" d="M140 104 L140 8 L256 8 L256 104 Z M140 56 L200 56 L200 104 M200 8 L200 40 M228 56 L256 56 M226 104 L226 82 M170 8 L170 22" />
        <text x="4" y="12" fontSize="7" fontWeight="700" letterSpacing="1.2" fill="#6d786e">TÉRREO</text>
        <text x="140" y="5" fontSize="7" fontWeight="700" letterSpacing="1.2" fill="#6d786e">SUPERIOR</text>
      </svg>
      <div className="pct"><span>OBRA</span><b data-sf-pct>0</b></div>
    </div>
  );
}

export default function HouseBuild() {
  return (
    <ScrollFilm
      id="terreno-ganha-vida" variant="build" label="Do terreno vazio à casa de dois andares, controlado pela rolagem"
      heightVh={640} mobileHeightVh={520}
      stills={buildMedia.stills} sequence={buildMedia.sequence} transition="grow"
      chapters={chapters}
      topline={['UMA VISÃO DO FUTURO', 'DO TERRENO AO LAR · ROLE PARA CONSTRUIR']}
      intro="ROLE PARA CONSTRUIR"
      demoNote="Imagens geradas por IA · obra ilustrativa"
      aside={<Blueprint />}
    />
  );
}
