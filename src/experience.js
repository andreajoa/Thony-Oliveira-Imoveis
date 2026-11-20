// Mídia das duas experiências de rolagem.
// stills   = quadros-chave fotográficos (sempre presentes; também servem de reserva)
// sequence = quadros extraídos dos vídeos (Flow · Omni 1.2 Flash 720p), quando publicados
import tourSeq from './experience/tour.json';
import buildSeq from './experience/build.json';

const pad = (i) => String(i).padStart(4, '0');
// manifesto gerado por montar_seq.py: { count, sizes, stops (posição de cada quadro-chave), focus }
const seq = (dir, m, focus) => (m && m.count > 0 ? {
  count: m.count, sizes: m.sizes, focus: focus || m.focus, stops: m.stops,
  per: m.per || 1, cols: m.cols || 1, atlases: m.atlases || m.count, // mosaicos 2×2 (4 quadros por arquivo)
  src: (i, size) => `/experience/${dir}/seq/${size}/${pad(i)}.webp`,
} : null);

export const tourMedia = {
  stills: {
    sizes: [960, 1344],
    src: (file, size) => `/experience/tour/stills/${file}-${size}.webp`,
    items: [
      { file: 't0', focus: [0.47, 0.47] }, // porta pivotante
      { file: 't1', focus: [0.5, 0.52] },  // abertura para a sala
      { file: 't2', focus: [0.72, 0.58] }, // virando para a cozinha
      { file: 't3', focus: [0.5, 0.44] },  // corredor para a suíte
      { file: 't4', focus: [0.5, 0.52] },  // porta de vidro para o deck
      { file: 't5', focus: [0.45, 0.35] }, // sobe para a vista aérea
      { file: 't6', focus: [0.5, 0.55] },
    ],
  },
  sequence: seq('tour', tourSeq),
};

export const buildMedia = {
  stills: {
    sizes: [960, 1344],
    focus: [0.48, 0.55],
    src: (file, size) => `/experience/build/stills/${file}-${size}.webp`,
    items: [{ file: 'b0' }, { file: 'b1' }, { file: 'b2' }, { file: 'b3' }, { file: 'b4' }, { file: 'b5' }],
  },
  sequence: seq('build', buildSeq, [0.48, 0.55]),
};
