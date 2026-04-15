import { useState, useRef, useEffect } from "react";
import { X, Trash2, Volume2, VolumeX, Mic, MicOff, Send, Play, RefreshCw, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isVoice?: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Olá! 😊 Sou sua Assistente IA do Fórmula Emagrecer. Posso te ajudar com o app, alimentação, chás, exercícios e também com compulsão e ansiedade alimentar. Como posso te ajudar?"
};

const getAIResponse = (q: string): string => {
  const lower = q.toLowerCase();
  if (lower.includes("chá")) return "Temos 7 chás funcionais incríveis! 🍵 O ideal é consumir até 17h, cerca de 1 litro por dia. Para ver as receitas, toque na aba Chá no menu inferior. Cada chá tem ingredientes, modo de preparo e benefícios detalhados.";
  if (lower.includes("água")) return "A hidratação é essencial! 💧 Sua meta diária aparece no Início. Use os botões +200ml, +300ml ou +500ml para registrar. Tente distribuir ao longo do dia. Uma dica: tenha sempre uma garrafa por perto!";
  if (lower.includes("caloria") || lower.includes("scanner") || lower.includes("câmera")) return "Você pode usar o Scanner (câmera no menu inferior) para estimar calorias de uma refeição por foto! 📸 Também pode lançar calorias manualmente. Tudo aparece no resumo do dia na tela Início.";
  if (lower.includes("exercício") || lower.includes("treino")) return "Na aba Exercícios você encontra circuitos para todos os níveis! 💪 Temos filtros por nível (iniciante, intermediário, avançado) e por grupo muscular. Comece devagar, sempre faça alongamento antes!";
  if (lower.includes("ansiedade") || lower.includes("compulsão") || lower.includes("vontade de comer")) return "Respire fundo comigo 🌬️ Inspire por 4 segundos, segure 4 segundos, expire por 6 segundos. Agora pergunte-se: é fome real ou emocional? Se for emocional, beba água e espere 15 minutos. Você pode acessar as Dicas de Compulsão no botão Mais. Estou aqui com você! 💚";
  if (lower.includes("receita") || lower.includes("refeição") || lower.includes("comida")) return "Na aba Refeições você encontra receitas low carb, marmitas fit, saladas e mais! 🍽️ Use os filtros para encontrar receitas por categoria. Cada receita mostra ingredientes, modo de preparo e calorias.";
  if (lower.includes("peso") || lower.includes("progresso")) return "Registre seu peso diariamente na tela Início! ⚖️ Na aba Progresso você acompanha sua evolução com gráficos de peso, calorias e hábitos ao longo do tempo.";
  if (lower.includes("favorit")) return "Para favoritar qualquer item, toque no ❤️ nos cards de chás, receitas, exercícios e saladas. Acesse seus favoritos pelo ícone de coração no cabeçalho do app!";
  if (lower.includes("planejamento") || lower.includes("plano")) return "O Planejamento de 14 Dias tem cardápio completo! 📋 Acesse pela aba Refeições > Planejamento. Lá você pode também definir sua meta de calorias com o calculador.";
  if (lower.includes("doce")) return "Temos Doces Fitness no módulo de Upsells! 🍰 São opções leves como iogurte com frutas, gelatina diet, pudim de chia e mais. Acesse pelo botão Mais > Upsells.";
  if (lower.includes("triste") || lower.includes("desânimo") || lower.includes("frustrad")) return "Ei, está tudo bem sentir isso. 💚 Cada dia é uma nova chance. Não se cobre tanto. Pequenos passos importam mais do que passos perfeitos. Que tal começar bebendo um copo de água agora? Estou aqui com você.";
  if (lower.includes("como us") || lower.includes("como funciona")) return "O app tem: Início (resumo do dia), Chá (7 chás funcionais), Refeições (receitas + planejamento), Exercícios, Câmera (scanner de calorias) e Progresso. Use o menu inferior para navegar. O botão Mais tem atalhos extras! 📱";
  return "Entendi! Posso te ajudar com mais detalhes sobre alimentação, chás, exercícios, uso do app ou apoio emocional. O que gostaria de saber? 💚";
};

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
    try { return localStorage.getItem("fe-audio") === "true"; } catch { return false; }
  });
  const [selectedVoice, setSelectedVoice] = useState<"female" | "male">(() => {
    try { return (localStorage.getItem("fe-voice") as "female" | "male") || "female"; } catch { return "female"; }
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try { localStorage.setItem("fe-audio", String(isAudioEnabled)); } catch {}
  }, [isAudioEnabled]);

  useEffect(() => {
    try { localStorage.setItem("fe-voice", selectedVoice); } catch {}
  }, [selectedVoice]);

  const send = () => {
    if (!input.trim() || isGenerating) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setIsGenerating(true);
    setTimeout(() => {
      const reply = getAIResponse(userMsg.content);
      setMessages(m => [...m, { id: (Date.now() + 1).toString(), role: "assistant", content: reply }]);
      setIsGenerating(false);
    }, 600 + Math.random() * 800);
  };

  const toggleVoice = () => {
    const next = selectedVoice === "female" ? "male" : "female";
    setSelectedVoice(next);
    setVoiceFeedback(next === "female" ? "Voz feminina selecionada" : "Voz masculina selecionada");
    setTimeout(() => setVoiceFeedback(""), 2000);
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Mock transcription
      setTimeout(() => {
        setInput("Como posso controlar minha ansiedade alimentar?");
      }, 500);
    } else {
      setIsRecording(true);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-foreground/20 z-50" onClick={onClose} />
      
      {/* Chat Window */}
      <div className="fixed z-50 inset-x-3 bottom-24 top-auto max-h-[70vh] sm:inset-auto sm:bottom-28 sm:right-4 sm:left-auto sm:w-[380px] sm:max-h-[520px] flex flex-col rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in bg-card">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-dark to-primary px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary-foreground">Assistente IA</p>
              <p className="text-[10px] text-primary-foreground/70">Fórmula Emagrecer</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsAudioEnabled(!isAudioEnabled)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary-foreground/10" title={isAudioEnabled ? "Desativar áudio" : "Ativar áudio"}>
              {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5 text-primary-foreground" /> : <VolumeX className="w-3.5 h-3.5 text-primary-foreground/60" />}
            </button>
            <button onClick={toggleVoice} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary-foreground/10 text-[10px] font-bold text-primary-foreground" title="Trocar voz">
              {selectedVoice === "female" ? "♀" : "♂"}
            </button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary-foreground/10" title="Reproduzir última resposta">
              <Play className="w-3.5 h-3.5 text-primary-foreground" />
            </button>
            <button onClick={clearChat} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary-foreground/10" title="Limpar conversa">
              <Trash2 className="w-3.5 h-3.5 text-primary-foreground" />
            </button>
            <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary-foreground/10" title="Fechar">
              <X className="w-3.5 h-3.5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Voice feedback */}
        {voiceFeedback && (
          <div className="bg-primary/10 text-center py-1.5 text-xs text-primary font-medium animate-fade-in">
            {voiceFeedback}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-0">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
              {m.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}>
                {m.isVoice && <p className="text-[10px] opacity-60 mb-1">🎙️ Comando de voz</p>}
                {m.content}
                {m.role === "assistant" && isAudioEnabled && (
                  <button className="mt-1.5 flex items-center gap-1 text-[10px] text-primary opacity-70 hover:opacity-100">
                    <Play className="w-2.5 h-2.5" /> Ouvir
                  </button>
                )}
              </div>
              {m.role === "user" && (
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-3 h-3 text-accent" />
                </div>
              )}
            </div>
          ))}
          {isGenerating && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-3 h-3 text-primary" />
              </div>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <div className="bg-red-50 text-center py-2 text-xs text-red-500 font-medium flex items-center justify-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Ouvindo... Toque para parar
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-border flex gap-2 shrink-0">
          <button onClick={toggleRecording} className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isRecording ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"}`}>
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Como posso ajudar?"
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-muted text-foreground outline-none text-sm"
          />
          <button onClick={send} disabled={!input.trim() || isGenerating} className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-50">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
