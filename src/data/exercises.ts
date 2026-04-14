import imgAgachamento from "@/assets/exercises/agachamento.jpg";
import imgFlexoes from "@/assets/exercises/flexoes-joelhos.jpg";
import imgPrancha from "@/assets/exercises/prancha.jpg";
import imgPernas from "@/assets/exercises/levantamento-pernas.jpg";
import imgCaminhada from "@/assets/exercises/caminhada.jpg";
import imgPolichinelo from "@/assets/exercises/polichinelo.jpg";
import imgBurpee from "@/assets/exercises/burpee.jpg";
import imgAgachamentoSalto from "@/assets/exercises/agachamento-salto.jpg";

export interface Exercise {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  levelLabel: string;
  muscles: string[];
  muscleGroup: string;
  sets: string;
  reps: string;
  description: string;
  commonMistakes: string[];
  safetyNotes: string[];
  image: string;
}

export const exercises: Exercise[] = [
  { id: "ex-1", name: "Agachamento com Peso Corporal", level: "beginner", levelLabel: "Iniciante", muscles: ["Quadríceps", "Glúteos", "Posterior da coxa"], muscleGroup: "legs", sets: "3", reps: "12-15", description: "Em pé, pés na largura dos ombros. Desça flexionando quadril e joelhos como se fosse sentar. Mantenha coluna reta. Volte à posição inicial.", commonMistakes: ["Joelhos passando dos pés", "Coluna curvada", "Calcanhar saindo do chão"], safetyNotes: ["Se sentir dor nos joelhos, diminua a amplitude", "Mantenha o core ativado"], image: imgAgachamento },
  { id: "ex-2", name: "Flexões de Joelhos", level: "beginner", levelLabel: "Iniciante", muscles: ["Peitoral", "Tríceps", "Deltóide anterior"], muscleGroup: "arms", sets: "3", reps: "8-12", description: "Apoie mãos e joelhos no chão. Desça o corpo flexionando os cotovelos. Empurre de volta para cima.", commonMistakes: ["Quadril muito alto", "Cotovelos abertos demais", "Descida incompleta"], safetyNotes: ["Use um tapete para proteger os joelhos"], image: imgFlexoes },
  { id: "ex-3", name: "Prancha", level: "beginner", levelLabel: "Iniciante", muscles: ["Core", "Abdômen", "Lombar", "Ombros"], muscleGroup: "abs", sets: "3", reps: "20-30 seg", description: "Apoie antebraços e pontas dos pés no chão. Mantenha o corpo reto como uma tábua. Segure a posição.", commonMistakes: ["Quadril caindo", "Quadril muito elevado", "Prender a respiração"], safetyNotes: ["Comece com tempo menor e aumente gradualmente"], image: imgPrancha },
  { id: "ex-4", name: "Levantamento de Pernas Alternado", level: "beginner", levelLabel: "Iniciante", muscles: ["Abdômen inferior", "Quadríceps", "Flexores do quadril"], muscleGroup: "abs", sets: "3", reps: "10 cada perna", description: "Deitado de costas, mãos ao lado do corpo. Levante uma perna estendida até 90°. Desça devagar e alterne.", commonMistakes: ["Lombar saindo do chão", "Movimento rápido demais"], safetyNotes: ["Mantenha a lombar pressionada contra o chão"], image: imgPernas },
  { id: "ex-5", name: "Caminhada Rápida", level: "beginner", levelLabel: "Iniciante", muscles: ["Cardiovascular", "Pernas", "Core"], muscleGroup: "full", sets: "1", reps: "20-30 min", description: "Caminhe em ritmo acelerado mantendo a postura ereta. Braços balançando naturalmente.", commonMistakes: ["Postura curvada", "Passos muito curtos"], safetyNotes: ["Use calçado adequado", "Hidrate-se antes e depois"], image: imgCaminhada },
  { id: "ex-6", name: "Polichinelo", level: "intermediate", levelLabel: "Intermediário", muscles: ["Cardiovascular", "Pernas", "Ombros"], muscleGroup: "full", sets: "3", reps: "20", description: "Em pé, pernas juntas. Salte abrindo pernas e braços. Volte à posição inicial.", commonMistakes: ["Joelhos travados ao aterrissar"], safetyNotes: ["Aterrisse suavemente com joelhos levemente flexionados"], image: imgPolichinelo },
  { id: "ex-7", name: "Burpee Modificado", level: "intermediate", levelLabel: "Intermediário", muscles: ["Corpo inteiro"], muscleGroup: "full", sets: "3", reps: "8-10", description: "Agache, coloque as mãos no chão, leve os pés para trás, volte e levante.", commonMistakes: ["Movimento descontrolado", "Lombar arqueada na prancha"], safetyNotes: ["Faça em ritmo controlado", "Pule a fase de salto se necessário"], image: imgBurpee },
  { id: "ex-8", name: "Agachamento com Salto", level: "advanced", levelLabel: "Avançado", muscles: ["Quadríceps", "Glúteos", "Panturrilha"], muscleGroup: "legs", sets: "3", reps: "10-12", description: "Faça um agachamento e na subida, salte explosivamente. Aterrisse suavemente.", commonMistakes: ["Aterrissagem com joelhos travados", "Inclinação do tronco"], safetyNotes: ["Domine o agachamento normal antes", "Use tênis com amortecimento"], image: imgAgachamentoSalto },
];

export const exerciseBenefits = [
  "Melhora da força muscular e resistência",
  "Aumento de estabilidade e equilíbrio",
  "Aperfeiçoamento da coordenação motora",
  "Potencialização da queima de gordura",
  "Redução do risco de lesões"
];

export const exerciseSafetyWarnings = [
  "Os exercícios não substituem orientação profissional",
  "Consultar médico/profissional de saúde antes de começar",
  "Atenção especial se houver problemas nos joelhos ou outras regiões",
  "Começar devagar e respeitar o ritmo",
  "Usar roupas confortáveis",
  "Fazer alongamento antes do circuito"
];
