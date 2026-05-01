// Exercícios para apoiar a firmeza visual da pele.
// Tom honesto: não substitui educador físico nem dermatologista.

import imgAgachamento from "@/assets/skin/exercises/agachamento.jpg";
import imgAfundo from "@/assets/skin/exercises/afundo.jpg";
import imgPonte from "@/assets/skin/exercises/ponte-gluteos.jpg";
import imgStiff from "@/assets/skin/exercises/stiff.jpg";
import imgPrancha from "@/assets/skin/exercises/prancha.jpg";
import imgDeadBug from "@/assets/skin/exercises/dead-bug.jpg";
import imgElevPernas from "@/assets/skin/exercises/elevacao-pernas.jpg";
import imgAbCurto from "@/assets/skin/exercises/abdominal-curto.jpg";
import imgFlexao from "@/assets/skin/exercises/flexao.jpg";
import imgTriceps from "@/assets/skin/exercises/triceps-banco.jpg";
import imgRemada from "@/assets/skin/exercises/remada.jpg";
import imgRosca from "@/assets/skin/exercises/rosca-biceps.jpg";
import imgMarcha from "@/assets/skin/exercises/marcha.jpg";
import imgAgachBracos from "@/assets/skin/exercises/agachamento-bracos.jpg";

export interface SkinExercise {
  code: string;
  name: string;
  image: string;
  area: string;
  level: "Iniciante" | "Intermediário";
  duration: string;
  equipment: string;
  benefits: string[];
  steps: string[];
  commonMistakes: string[];
  cautions: string[];
  suggestedSets: string;
}

export const skinExercises: SkinExercise[] = [
  {
    code: "skin_ex_agachamento",
    name: "Agachamento",
    image: imgAgachamento,
    area: "Glúteos e pernas",
    level: "Iniciante",
    duration: "5 a 8 min",
    equipment: "Sem equipamento",
    benefits: [
      "Fortalece glúteos, quadríceps e posterior de coxa",
      "Melhora postura e contorno do quadril",
      "Estimula musculatura que sustenta a pele da região",
    ],
    steps: [
      "Fique em pé com os pés na largura dos ombros.",
      "Empurre o quadril para trás como se fosse sentar em uma cadeira.",
      "Desça até onde for confortável, mantendo as costas retas.",
      "Mantenha os joelhos alinhados com a ponta dos pés.",
      "Suba apoiando o peso nos calcanhares.",
    ],
    commonMistakes: [
      "Joelhos caindo para dentro",
      "Curvar muito as costas",
      "Levantar os calcanhares do chão",
    ],
    cautions: [
      "Se sentir dor no joelho, reduza a amplitude.",
      "Em caso de lesão prévia, consulte um educador físico.",
    ],
    suggestedSets: "3 séries de 12 a 15 repetições",
  },
  {
    code: "skin_ex_afundo",
    name: "Afundo",
    image: imgAfundo,
    area: "Glúteos e pernas",
    level: "Iniciante",
    duration: "6 a 8 min",
    equipment: "Sem equipamento",
    benefits: [
      "Trabalha glúteos e coxas de forma unilateral",
      "Melhora equilíbrio e estabilidade",
      "Ajuda a definir o contorno das pernas",
    ],
    steps: [
      "Fique em pé com os pés na largura do quadril.",
      "Dê um passo grande à frente com uma das pernas.",
      "Desça o quadril dobrando os dois joelhos a 90 graus.",
      "O joelho da frente deve ficar alinhado ao tornozelo.",
      "Empurre o calcanhar da frente para voltar à posição inicial.",
    ],
    commonMistakes: [
      "Joelho da frente passando muito da ponta do pé",
      "Tronco inclinado para frente",
      "Passo curto demais",
    ],
    cautions: [
      "Se tiver dor no joelho, reduza a profundidade.",
      "Apoie em uma cadeira se o equilíbrio estiver difícil.",
    ],
    suggestedSets: "3 séries de 10 repetições para cada perna",
  },
  {
    code: "skin_ex_ponte",
    name: "Ponte de Glúteos",
    image: imgPonte,
    area: "Glúteos e core",
    level: "Iniciante",
    duration: "4 a 6 min",
    equipment: "Colchonete",
    benefits: [
      "Ativa fortemente os glúteos",
      "Ajuda na postura e no contorno do quadril",
      "Excelente para iniciantes",
    ],
    steps: [
      "Deite de costas com os joelhos dobrados.",
      "Apoie os pés no chão na largura do quadril.",
      "Contraia o glúteo e levante o quadril.",
      "Forme uma linha reta entre joelhos, quadril e ombros.",
      "Desça com controle.",
    ],
    commonMistakes: [
      "Empurrar com a lombar em vez do glúteo",
      "Subir demais e arquear as costas",
      "Pés muito longe do corpo",
    ],
    cautions: ["Em caso de dor lombar, reduza a altura."],
    suggestedSets: "3 séries de 15 repetições",
  },
  {
    code: "skin_ex_stiff",
    name: "Stiff",
    image: imgStiff,
    area: "Posterior de coxa e glúteos",
    level: "Intermediário",
    duration: "5 a 8 min",
    equipment: "Garrafas, halteres ou peso corporal",
    benefits: [
      "Fortalece posterior de coxa e glúteos",
      "Melhora flexibilidade da cadeia posterior",
      "Apoia a postura",
    ],
    steps: [
      "Fique em pé segurando garrafas ou halteres leves à frente.",
      "Mantenha os joelhos levemente flexionados.",
      "Empurre o quadril para trás descendo o tronco.",
      "Mantenha as costas retas e os pesos próximos das pernas.",
      "Suba contraindo glúteos e posterior.",
    ],
    commonMistakes: [
      "Curvar as costas",
      "Dobrar muito os joelhos (vira agachamento)",
      "Descer além do limite confortável",
    ],
    cautions: [
      "Quem tem hérnia de disco ou dor lombar deve consultar um profissional antes.",
      "Comece sem peso para aprender o movimento.",
    ],
    suggestedSets: "3 séries de 12 repetições",
  },
  {
    code: "skin_ex_prancha",
    name: "Prancha",
    image: imgPrancha,
    area: "Abdômen e core",
    level: "Iniciante",
    duration: "3 a 5 min",
    equipment: "Colchonete",
    benefits: [
      "Fortalece todo o core, ombros e glúteos",
      "Melhora postura",
      "Apoia a firmeza visual da região abdominal",
    ],
    steps: [
      "Apoie os antebraços no chão, cotovelos abaixo dos ombros.",
      "Estenda as pernas para trás, apoiando nas pontas dos pés.",
      "Mantenha o corpo em linha reta da cabeça aos calcanhares.",
      "Contraia abdômen e glúteos.",
      "Respire normalmente durante o tempo.",
    ],
    commonMistakes: [
      "Quadril muito alto ou muito baixo",
      "Prender a respiração",
      "Curvar a lombar",
    ],
    cautions: [
      "Comece com 20 segundos e vá aumentando.",
      "Em caso de dor lombar ou no ombro, pare.",
    ],
    suggestedSets: "3 séries de 20 a 40 segundos",
  },
  {
    code: "skin_ex_dead_bug",
    name: "Dead Bug",
    image: imgDeadBug,
    area: "Core profundo",
    level: "Iniciante",
    duration: "4 a 6 min",
    equipment: "Colchonete",
    benefits: [
      "Trabalha o core profundo de forma segura",
      "Ajuda na coordenação e estabilidade",
      "Excelente para quem tem dor lombar leve",
    ],
    steps: [
      "Deite de barriga para cima, braços estendidos para o teto.",
      "Joelhos dobrados em 90 graus.",
      "Estenda um braço para trás e a perna oposta para frente.",
      "Mantenha a lombar pressionada no chão.",
      "Volte e alterne os lados.",
    ],
    commonMistakes: [
      "Arquear a lombar (perde estabilidade)",
      "Movimento muito rápido",
      "Não controlar a respiração",
    ],
    cautions: ["Movimento sempre lento e controlado."],
    suggestedSets: "3 séries de 8 a 10 repetições por lado",
  },
  {
    code: "skin_ex_elev_pernas",
    name: "Elevação de Pernas",
    image: imgElevPernas,
    area: "Abdômen inferior",
    level: "Intermediário",
    duration: "4 a 6 min",
    equipment: "Colchonete",
    benefits: [
      "Trabalha abdômen inferior",
      "Ajuda a fortalecer o core",
      "Apoia a firmeza visual da região",
    ],
    steps: [
      "Deite de barriga para cima, mãos ao lado do corpo.",
      "Pressione a lombar contra o chão.",
      "Eleve as pernas estendidas até cerca de 90 graus.",
      "Desça com controle, sem encostar os pés no chão.",
      "Mantenha o abdômen contraído durante todo o movimento.",
    ],
    commonMistakes: [
      "Arquear a lombar",
      "Descer rápido demais",
      "Tensionar o pescoço",
    ],
    cautions: [
      "Se sentir desconforto na lombar, dobre os joelhos.",
      "Não recomendado em casos de dor lombar aguda.",
    ],
    suggestedSets: "3 séries de 10 a 12 repetições",
  },
  {
    code: "skin_ex_ab_curto",
    name: "Abdominal Curto Controlado",
    image: imgAbCurto,
    area: "Abdômen",
    level: "Iniciante",
    duration: "3 a 5 min",
    equipment: "Colchonete",
    benefits: [
      "Fortalece a parte superior do abdômen",
      "Movimento simples e seguro",
      "Bom para iniciantes",
    ],
    steps: [
      "Deite com os joelhos dobrados, pés no chão.",
      "Mãos próximas ao peito ou apoiadas atrás da cabeça (sem puxar).",
      "Eleve apenas o tronco (cabeça e ombros) alguns centímetros.",
      "Contraia o abdômen no topo do movimento.",
      "Desça com controle.",
    ],
    commonMistakes: [
      "Puxar o pescoço com as mãos",
      "Subir demais (vira flexão de quadril)",
      "Movimento com impulso",
    ],
    cautions: ["Em dor cervical, mantenha as mãos cruzadas no peito."],
    suggestedSets: "3 séries de 12 a 15 repetições",
  },
  {
    code: "skin_ex_flexao",
    name: "Flexão de Braços Adaptada",
    image: imgFlexao,
    area: "Peito, ombros e tríceps",
    level: "Iniciante",
    duration: "4 a 6 min",
    equipment: "Colchonete",
    benefits: [
      "Fortalece peito, ombros e braços",
      "Melhora o contorno da parte superior",
      "Versão adaptada é segura para iniciantes",
    ],
    steps: [
      "Apoie joelhos e mãos no chão, mãos alinhadas aos ombros.",
      "Mantenha o corpo em linha reta dos joelhos à cabeça.",
      "Desça o peito em direção ao chão dobrando os cotovelos.",
      "Empurre de volta à posição inicial.",
      "Mantenha o abdômen contraído.",
    ],
    commonMistakes: [
      "Cotovelos abertos demais",
      "Quadril caindo ou subindo demais",
      "Não desce o suficiente",
    ],
    cautions: ["Em caso de dor no punho, use halteres como apoio."],
    suggestedSets: "3 séries de 8 a 12 repetições",
  },
  {
    code: "skin_ex_triceps",
    name: "Tríceps no Banco ou Cadeira",
    image: imgTriceps,
    area: "Tríceps e ombros",
    level: "Iniciante",
    duration: "4 a 6 min",
    equipment: "Cadeira ou banco firme",
    benefits: [
      "Trabalha tríceps (parte de trás do braço)",
      "Ajuda a definir a região com flacidez comum",
      "Pode ser feito em casa",
    ],
    steps: [
      "Sente na borda de uma cadeira firme com as mãos apoiadas ao lado.",
      "Deslize o quadril para fora do assento, sustentando com os braços.",
      "Dobre os cotovelos descendo o quadril em direção ao chão.",
      "Empurre de volta à posição inicial.",
      "Mantenha os cotovelos próximos ao corpo.",
    ],
    commonMistakes: [
      "Cotovelos abrindo para os lados",
      "Cadeira instável (perigoso)",
      "Descer demais e forçar o ombro",
    ],
    cautions: [
      "Use sempre uma cadeira firme e sem rodinhas.",
      "Pare se sentir dor no ombro.",
    ],
    suggestedSets: "3 séries de 10 a 12 repetições",
  },
  {
    code: "skin_ex_remada",
    name: "Remada com Garrafa ou Elástico",
    image: imgRemada,
    area: "Costas e bíceps",
    level: "Iniciante",
    duration: "5 a 7 min",
    equipment: "Garrafas com água ou elástico",
    benefits: [
      "Fortalece as costas",
      "Melhora postura",
      "Ajuda no contorno da parte superior",
    ],
    steps: [
      "Em pé, incline o tronco levemente à frente.",
      "Mantenha a coluna reta e os joelhos um pouco dobrados.",
      "Segure as garrafas com os braços estendidos.",
      "Puxe as garrafas em direção ao quadril, contraindo as costas.",
      "Desça com controle.",
    ],
    commonMistakes: [
      "Curvar a lombar",
      "Usar impulso em vez da musculatura",
      "Cotovelos muito abertos",
    ],
    cautions: ["Em dor lombar, faça apoiando uma das mãos em uma cadeira."],
    suggestedSets: "3 séries de 12 repetições",
  },
  {
    code: "skin_ex_rosca",
    name: "Rosca Bíceps com Garrafa",
    image: imgRosca,
    area: "Bíceps",
    level: "Iniciante",
    duration: "3 a 5 min",
    equipment: "Garrafas ou halteres leves",
    benefits: [
      "Fortalece o bíceps",
      "Ajuda no contorno do braço",
      "Movimento simples para iniciantes",
    ],
    steps: [
      "Em pé, segure as garrafas com as palmas das mãos para cima.",
      "Mantenha os cotovelos próximos ao corpo.",
      "Eleve as garrafas em direção aos ombros.",
      "Contraia o bíceps no topo.",
      "Desça com controle.",
    ],
    commonMistakes: [
      "Mover os cotovelos para frente",
      "Usar impulso do corpo",
      "Soltar o peso na descida",
    ],
    cautions: ["Comece com pesos leves para aprender o movimento."],
    suggestedSets: "3 séries de 12 a 15 repetições",
  },
  {
    code: "skin_ex_marcha",
    name: "Marcha Ativa",
    image: imgMarcha,
    area: "Corpo todo (cardio leve)",
    level: "Iniciante",
    duration: "5 a 10 min",
    equipment: "Sem equipamento",
    benefits: [
      "Aquece o corpo",
      "Melhora circulação",
      "Boa para iniciar a sessão de treino",
    ],
    steps: [
      "Em pé, marche no lugar elevando alternadamente os joelhos.",
      "Movimente os braços em oposição às pernas.",
      "Mantenha postura ereta e abdômen contraído.",
      "Respire de forma constante.",
    ],
    commonMistakes: ["Postura curvada", "Movimento muito lento ou parado"],
    cautions: ["Pare se sentir falta de ar exagerada ou tontura."],
    suggestedSets: "1 série de 5 a 10 minutos",
  },
  {
    code: "skin_ex_agach_bracos",
    name: "Agachamento com Elevação de Braços",
    image: imgAgachBracos,
    area: "Corpo todo",
    level: "Intermediário",
    duration: "5 a 8 min",
    equipment: "Sem equipamento",
    benefits: [
      "Trabalha pernas, glúteos, ombros e core",
      "Movimento de corpo inteiro",
      "Aumenta gasto calórico",
    ],
    steps: [
      "Comece em pé com pés na largura dos ombros, braços ao lado do corpo.",
      "Desça em agachamento com as costas retas.",
      "Ao subir, eleve os braços acima da cabeça.",
      "Volte a posição inicial e repita.",
    ],
    commonMistakes: [
      "Joelhos caindo para dentro",
      "Subir os braços antes de chegar em pé",
      "Curvar a lombar",
    ],
    cautions: ["Em caso de dor no ombro, eleve apenas até a altura do peito."],
    suggestedSets: "3 séries de 10 a 12 repetições",
  },
];
