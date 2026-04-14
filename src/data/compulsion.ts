export interface CompulsionTip {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export const compulsionTips: CompulsionTip[] = [
  { id: "ct-1", title: "Fome Física vs Fome Emocional", content: "A fome física aparece gradualmente, pode esperar, e qualquer alimento satisfaz. A fome emocional surge de repente, é urgente e pede alimentos específicos (geralmente doces ou gordurosos). Identificar qual das duas você sente é o primeiro passo.", icon: "🧠" },
  { id: "ct-2", title: "Gatilhos Emocionais", content: "Estresse, tédio, tristeza, ansiedade e solidão são os gatilhos mais comuns da compulsão alimentar. Anote quando sente vontade intensa de comer e o que estava sentindo. Reconhecer padrões é fundamental.", icon: "🎯" },
  { id: "ct-3", title: "Dicas Rápidas para Evitar Exageros", content: "Beba um copo de água antes de comer. Espere 15 minutos antes de ceder à vontade. Coma devagar, mastigando bem. Use pratos menores. Não faça refeições na frente da TV.", icon: "💡" },
  { id: "ct-4", title: "Pausar Antes de Comer por Impulso", content: "Quando sentir o impulso, pare e respire fundo 3 vezes. Pergunte-se: 'Estou com fome ou com outra emoção?' Se não for fome, busque outra forma de lidar com o sentimento: caminhar, ligar para alguém, escrever.", icon: "⏸️" },
  { id: "ct-5", title: "Práticas de Respiração e Autocontrole", content: "Respire profundamente: inspire por 4 segundos, segure por 4 segundos, expire por 6 segundos. Repita 5 vezes. Essa técnica ativa o sistema nervoso parassimpático e reduz a ansiedade.", icon: "🌬️" },
  { id: "ct-6", title: "Alternativas Alimentares Mais Leves", content: "Quando a vontade apertar, substitua: chocolate → cacau com banana; sorvete → iogurte congelado com frutas; chips → chips de abobrinha assada; biscoito → castanhas e frutas secas.", icon: "🔄" }
];
