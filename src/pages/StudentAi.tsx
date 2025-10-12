import React, { useEffect, useState, useRef, useCallback } from "react";
import logo from "../assets/images/afri-ai.png";


const LoadingScreen: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
  // Show welcome for 8 seconds, then start fade out
  const welcomeTimer = setTimeout(() => {
    setFadeOut(true);
  }, 8000); // Increased from 3000ms to 8000ms

  // Completely hide after fade out completes
  const hideTimer = setTimeout(() => {
    setShowWelcome(false);
  }, 5000); 

  return () => {
    clearTimeout(welcomeTimer);
    clearTimeout(hideTimer);
  };
}, []);

  if (!showWelcome) {
    return null;
  }

return (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0a2613",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      fontFamily: "system-ui, -apple-system, sans-serif",
      overflow: "hidden",
    }}
  >
    {/* Subtle background gradient */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`,
      }}
    />
    
    {/* Minimal floating particles */}
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          width: `${Math.random() * 3 + 2}px`,
          height: `${Math.random() * 3 + 2}px`,
          backgroundColor: `rgba(16, 185, 129, ${Math.random() * 0.15 + 0.1})`,
          borderRadius: "50%",
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `floatParticle ${Math.random() * 20 + 20}s linear infinite`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      />
    ))}

    {/* Main content container */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: fadeOut ? "translateY(-8px)" : "translateY(0)",
        opacity: fadeOut ? 0 : 1,
        transition: "all 1.2s ease-out",
      }}
    >
      {/* Logo with smooth, professional animation */}
      <div
        style={{
          position: "relative",
          marginBottom: "3rem",
        }}
      >
        <img 
          src={logo} 
          alt="Afri AI Logo" 
          style={{
            width: "200px",
            height: "200px",
            transform: fadeOut ? "scale(0.95)" : "scale(1)",
            opacity: fadeOut ? 0 : 1,
            transition: "all 1.2s ease-out",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
            animation: "logoEntrance 1.8s ease-out, logoFloat 8s ease-in-out infinite 1.8s",
          }}
        />
        
        {/* Subtle glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            animation: "pulseGlow 6s ease-in-out infinite",
            zIndex: -1,
          }}
        />
      </div>

      {/* Main title with clean reveal */}
      <h1
        style={{
          color: "white",
          fontSize: "4.5rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
          marginTop: 0,
          textAlign: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: fadeOut ? "translateY(-6px)" : "translateY(0)",
          opacity: fadeOut ? 0 : 1,
          transition: "all 1.2s ease-out 0.1s",
          textShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
          letterSpacing: "2px",
          animation: "titleReveal 1.5s ease-out 0.8s both",
          lineHeight: "1.1",
        }}
      >
        Afri AI
      </h1>
      
      {/* Subtitle with elegant fade-in */}
      <p
        style={{
          color: "rgba(255,255,255,0.85)",
          fontSize: "1.5rem",
          marginBottom: "0",
          marginTop: 0,
          textAlign: "center",
          transform: fadeOut ? "translateY(-4px)" : "translateY(0)",
          opacity: fadeOut ? 0 : 1,
          transition: "all 1.2s ease-out 0.2s",
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          fontWeight: "300",
          letterSpacing: "1px",
          animation: "subtitleReveal 1.8s ease-out 1.5s both",
          maxWidth: "400px",
          lineHeight: "1.4",
        }}
      >
        Your Intelligent Study Companion
      </p>

      {/* Minimal decorative line */}
      <div
        style={{
          width: "80px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent)",
          marginTop: "2.5rem",
          opacity: fadeOut ? 0 : 0.5,
          transition: "opacity 0.8s ease-out 0.4s",
          animation: "lineReveal 1.2s ease-out 2.2s both",
        }}
      />
    </div>

    <style>
      {`
        @keyframes logoEntrance {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
        
        @keyframes titleReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes subtitleReveal {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes floatParticle {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px);
            opacity: 0;
          }
        }
        
        @keyframes lineReveal {
          0% {
            width: 0px;
            opacity: 0;
          }
          100% {
            width: 80px;
            opacity: 0.5;
          }
        }
      `}
    </style>
  </div>
);

};

// Simple responsive hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

// Custom hook for dynamic height
const useDynamicHeight = () => {
  const [height, setHeight] = useState<string>('100vh');

  useEffect(() => {
    const updateHeight = () => {
      setHeight(`${window.innerHeight}px`);
    };

    // Set initial height
    updateHeight();

    // Update on resize
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return height;
};

type MLCEngineInterface = any; // fallback type
type InitProgressReport = any; // fallback type

const StudentAI: React.FC = () => {
   const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("Loading available models...");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [engine, setEngine] = useState<MLCEngineInterface | null>(null);
  const [isModelReady, setIsModelReady] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(false);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [showSessions, setShowSessions] = useState<boolean>(false);
  const [studyMode, setStudyMode] = useState<StudyMode>("general");
  const [fontSize, setFontSize] = useState<number>(16);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [autoScroll] = useState<boolean>(true);
  const [showPromptSuggestions, setShowPromptSuggestions] =
    useState<boolean>(true);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const dynamicHeight = useDynamicHeight();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  type StudyMode =
    | "general"
    | "math"
    | "science"
    | "english"
    | "history"
    | "coding"
    | "essay"
    | "exam";

  const studyModes: Record<StudyMode, string> = {
    general: "General Help",
    math: "Mathematics",
    science: "Science",
    english: "English/Literature",
    history: "History",
    coding: "Programming",
    essay: "Essay Writing",
    exam: "Exam Prep",
  };

  interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    isTruncated?: boolean;
    finishReason?: string;
    subject?: string;
  }

  interface StudySession {
    id: string;
    name: string;
    messages: Message[];
    timestamp: Date;
    subject: StudyMode;
  }

  const promptSuggestions: { general: string[] } & Partial<
    Record<StudyMode, string[]>
  > = {
    general: [
      "Explain this concept",
      "Help with homework",
      "Break down step by step",
      "Simple explanation",
    ],
    math: [
      "Solve equation",
      "Math concept examples",
      "Help with word problems",
      "Different approaches",
    ],
    science: [
      "Explain scientific process",
      "Experiment help",
      "Real-world examples",
      "Concept relationships",
    ],
    english: [
      "Analyze text",
      "Improve essay",
      "Literary devices",
      "Grammar help",
    ],
    essay: [
      "Brainstorm ideas",
      "Create outline",
      "Thesis statement",
      "Conclusion help",
    ],
  };

  const scrollToBottom = useCallback(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoScroll]);

 useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [inputMessage]);

  // Handle window resize to ensure proper layout
  useEffect(() => {
    const handleResize = () => {
      // Force re-render on resize to update dynamic height
      if (containerRef.current) {
        // This will trigger the dynamic height hook to update
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const getSystemPrompt = (mode: string) => {
    const prompts: Record<string, string> = {
      general:
        "You are a helpful AI tutor for students. Provide clear, educational explanations.",
      math: "You are a math tutor. Break down problems step-by-step, show your work, and explain mathematical concepts clearly.",
      science:
        "You are a science tutor. Explain scientific concepts with examples, use analogies, and connect theory to real-world applications.",
      english:
        "You are an English/Literature tutor. Help with reading comprehension, writing skills, grammar, and literary analysis.",
      history:
        "You are a history tutor. Provide context, explain cause-and-effect relationships, and help students understand historical significance.",
      coding:
        "You are a programming tutor. Explain code concepts clearly, provide examples, and help debug problems step by step.",
      essay:
        "You are a writing tutor specializing in essays. Help with structure, argumentation, evidence, and clear expression of ideas.",
      exam: "You are an exam prep tutor. Create practice questions, explain test-taking strategies, and help review key concepts.",
    };
    return prompts[mode] || prompts.general;
  };

  // Load available models on component mount
  useEffect(() => {
    const loadAvailableModels = async () => {
      try {
        console.log("Loading available models...");
        setStatus("Checking available models...");

        const { prebuiltAppConfig } = await import("@mlc-ai/web-llm");
        const modelList = prebuiltAppConfig.model_list;
        const modelIds = modelList.map(
          (model: any) => model.model_id || model.model
        );

        // Prioritize smaller, faster models for better student experience
        const preferredPatterns = [
                    /qwen.*0\.5b/i,

          /tiny.*llama.*1b/i,
          /qwen.*1\.8b/i,
          /llama.*3\.2.*1b/i,
          /phi.*3.*mini/i,
          /gemma.*2b/i,
        ];

        // Filter and sort models based on preferences
        const preferredModels: string[] = [];
        const otherModels: string[] = [];

        modelIds.forEach((modelId: string) => {
          const isPreferred = preferredPatterns.some((pattern) =>
            pattern.test(modelId)
          );
          if (isPreferred) {
            preferredModels.push(modelId);
          } else {
            otherModels.push(modelId);
          }
        });

        // Sort preferred models by the order of patterns
        preferredModels.sort((a, b) => {
          const aIndex = preferredPatterns.findIndex((pattern) =>
            pattern.test(a)
          );
          const bIndex = preferredPatterns.findIndex((pattern) =>
            pattern.test(b)
          );
          return aIndex - bIndex;
        });

        const sortedModels = [...preferredModels, ...otherModels];
        setAvailableModels(sortedModels);

        if (sortedModels.length > 0) {
          setSelectedModel(sortedModels[0] ?? "");
          setStatus(`Select a model to begin. Recommended: ${sortedModels[0]}`);
        } else {
          setStatus("No models available in WebLLM configuration");
        }
      } catch (err) {
        console.error("Failed to load models:", err);
        setStatus(
          `Error loading models: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      }
    };

    loadAvailableModels();
  }, []);

  const loadSelectedModel = async (modelId: string) => {
    if (!modelId || isLoadingModel) return;

    try {
      setIsLoadingModel(true);
      setIsModelReady(false);
      setEngine(null);
      setMessages([]);
      setProgressPercent(0);

      console.log(`Loading model: ${modelId}`);
      setStatus(`Initializing ${modelId}...`);

      const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

      const engine = await CreateMLCEngine(modelId, {
        initProgressCallback: (progress: InitProgressReport) => {
          if (progress.progress !== undefined) {
            const percent = progress.progress * 100;
            setProgressPercent(percent);
            setStatus(`Loading ${modelId}... ${percent.toFixed(1)}%`);
          } else if (progress.text) {
            setStatus(`${modelId}: ${progress.text}`);
          }
        },
      });

      setEngine(engine);
      setIsModelReady(true);
      setProgressPercent(100);

      // Create initial session
      const initialSession = createNewSession("Welcome Session", "general");

      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Hello! I'm your Afri Intelligence AI study assistant!

🎓 **Study Modes Available:**
• General Help - For any subject
• Mathematics - Step-by-step problem solving  
• Science - Concepts with examples
• English/Literature - Writing and analysis
• History - Context and connections
• Programming - Code explanations
• Essay Writing - Structure and improvement
• Exam Prep - Practice questions and strategies

📚 **Features:**
• Multiple study sessions - Keep different topics organized
• Smart suggestions - Click the lightbulb for topic-specific prompts
• Customizable interface - Adjust font size and theme
• Continue responses - Get more detailed explanations when needed

💡 **Tip:** Try saying "Explain [topic] like I'm 12" for simpler explanations!

What would you like to study today?`,
        timestamp: new Date(),
      };

      initialSession.messages = [welcomeMessage];
      setStudySessions([initialSession]);
      setMessages([welcomeMessage]);
      setCurrentSessionId(initialSession.id);
      setStatus(`✅ Ready with ${modelId}`);
    } catch (err) {
      console.error("Model loading failed:", err);
      setStatus(
        `Error loading ${modelId}: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
      setIsModelReady(false);
    } finally {
      setIsLoadingModel(false);
    }
  };

  const createNewSession = (
    name?: string,
    subject?: StudyMode
  ): StudySession => {
    const timestamp = new Date();
    const sessionName =
      name || `Study Session ${timestamp.toLocaleTimeString()}`;
    const sessionSubject: StudyMode = subject || studyMode;

    return {
      id: timestamp.getTime().toString(),
      name: sessionName,
      messages: [],
      timestamp,
      subject: sessionSubject,
    };
  };

  const startNewSession = () => {
    const newSession = createNewSession();
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: `New ${studyModes[studyMode]} session started! What would you like to work on?`,
      timestamp: new Date(),
    };

    newSession.messages = [welcomeMessage];
    setStudySessions((prev) => [newSession, ...prev]);
    setMessages([welcomeMessage]);
    setCurrentSessionId(newSession.id);
    setShowSessions(false);
  };

  const loadSession = (sessionId: string) => {
    const session = studySessions.find((s) => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(sessionId);
      setStudyMode(session.subject as StudyMode);
      setShowSessions(false);
    }
  };

  const saveCurrentSession = () => {
    if (currentSessionId) {
      setStudySessions((prev) =>
        prev.map((session) =>
          session.id === currentSessionId ? { ...session, messages } : session
        )
      );
    }
  };

  useEffect(() => {
    saveCurrentSession();
  }, [messages, currentSessionId]);

  const deleteSession = (sessionId: string) => {
    setStudySessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      const remaining = studySessions.filter((s) => s.id !== sessionId);
      const next = remaining[0];
      if (next) {
        loadSession(next.id);
      } else {
        startNewSession();
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !engine || isGenerating) return;

    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
      subject: studyMode,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);

    try {
      // Determine appropriate response length
      const isLongRequest =
        userMessage.content.toLowerCase().includes("essay") ||
        userMessage.content.toLowerCase().includes("explain in detail") ||
        userMessage.content.toLowerCase().includes("write about") ||
        userMessage.content.length > 100;

      const tokenLimit = isLongRequest ? 1500 : 600;

      const systemMessage = {
        role: "system" as const,
        content: getSystemPrompt(studyMode),
      };

      const conversationHistory = messages.slice(-12).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await engine.chat.completions.create({
        messages: [
          systemMessage,
          ...conversationHistory,
          { role: "user", content: userMessage.content },
        ],
        temperature: 0.7,
        max_tokens: tokenLimit,
        top_p: 0.9,
      });

      const fullResponse = response.choices[0]?.message?.content || "";
      const cleanText = fullResponse.normalize("NFC"); // ensure proper Unicode

      const finishReason = response.choices[0]?.finish_reason || "";
      const isTruncated = finishReason === "length";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: cleanText,
        timestamp: new Date(),
        isTruncated,
        finishReason,
        subject: studyMode,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I encountered an error while generating the response. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const continueGeneration = async (messageId: string) => {
    if (!engine || isGenerating) return;
    setIsGenerating(true);

    try {
      const messageIndex = messages.findIndex((m) => m.id === messageId);
      const conversationHistory = messages
        .slice(0, messageIndex + 1)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const systemMessage = {
        role: "system" as const,
        content: getSystemPrompt(studyMode),
      };
      const continuePrompt =
        "Please continue your previous response with more details and examples.";

      const response = await engine.chat.completions.create({
        messages: [
          systemMessage,
          ...conversationHistory,
          { role: "user", content: continuePrompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
        top_p: 0.9,
      });

      const continuation = response.choices[0]?.message?.content || "";
      const finishReason = response.choices[0]?.finish_reason || "";
      const stillTruncated = finishReason === "length";

      setMessages((prev) => {
        const updated = [...prev];
        const targetIndex = updated.findIndex((m) => m.id === messageId);
        if (targetIndex !== -1) {
          const target = updated[targetIndex];
          if (target) {
            updated[targetIndex] = {
              id: target.id,
              role: target.role,
              timestamp: target.timestamp,
              content: target.content + "\n\n" + continuation,
              isTruncated: stillTruncated,
              finishReason,
              ...(target.subject ? { subject: target.subject } : {}),
            };
          }
        }

        return updated;
      });
    } catch (err) {
      console.error("Error continuing generation:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const insertSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
    textareaRef.current?.focus();
  };

  const themeStyles = {
    backgroundColor: darkMode ? "#1e293b" : "#133A1F",
    color: darkMode ? "#f1f5f9" : "black",
    chatBg: darkMode ? "#0f172a" : "#236738",
    userBg: darkMode ? "#2563eb" : "#3b82f6",
    assistantBg: darkMode ? "#374151" : "#f1f5f9",
    border: darkMode ? "#374151" : "#e2e8f0",
    inputBg: darkMode ? "#374151" : "#f9fafb",
  };

  // Responsive spacing
  const getSpacing = () => {
    if (isMobile) return "0.2rem";
    if (isTablet) return "0.5rem";
    return "0.75rem";
  };

  const getChatMargins = () => {
    if (isMobile) return "0.25rem";
    if (isTablet) return "0.75rem";
    return "1rem";
  };

  const getHeaderFontSize = () => {
    if (isMobile) return "1.5em";
    if (isTablet) return "2.5em";
    return "3em";
  };

  const getLogoSize = () => {
    if (isMobile) return "40px";
    if (isTablet) return "60px";
    return "80px";
  };

   if (isLoading) {
    return <LoadingScreen />;
  }
     return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: dynamicHeight,
        maxHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        backgroundColor: themeStyles.backgroundColor,
        color: themeStyles.color,
        fontSize: `${fontSize}px`,
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Ultra Compact Header */}
      <div
        style={{
          borderBottom: `1px solid ${themeStyles.border}`,
          padding: getSpacing(),
          flexShrink: 0,
          backgroundColor: themeStyles.backgroundColor,
        }}
      >
        {/* Top Row - Logo, Title, and Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: isMobile ? "0.25rem" : "0.5rem",
          }}
        >
          {/* Logo and Title - Much Smaller */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <img 
              style={{ 
                width: getLogoSize(), 
                height: getLogoSize(),
                objectFit: "contain"
              }} 
              className="app-icon" 
              src={logo} 
              alt="Logo" 
            />
            <h1
              style={{
                margin: 0,
                fontSize: getHeaderFontSize(),
                fontWeight: "700",
                color: "white",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              Afri AI
            </h1>
          </div>

          {/* Control Buttons - Compact */}
          <div 
            style={{ 
              display: "flex", 
              gap: "0.5rem", 
              alignItems: "center",
              flexShrink: 0,
              width: "max-content",

            }}
          >
            <button
              onClick={() => setShowSessions(!showSessions)}
              style={{
                padding: isMobile ? "0.3rem 0.5rem" : "0.4rem 0.6rem",
                backgroundColor: showSessions ? "#10b981" : themeStyles.border,
                color: showSessions ? "white" : themeStyles.color,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8em",
                whiteSpace: "nowrap",
                fontWeight: "500",
                minWidth: isMobile ? "60px" : "max-content",
                textAlign: "center",
                overflow: "hidden",

              }}
            >
              📁 {isMobile ? studySessions.length : `Sessions (${studySessions.length})`}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: isMobile ? "0.3rem" : "0.4rem",
                backgroundColor: themeStyles.border,
                color: themeStyles.color,
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9em",
                minWidth: isMobile ? "32px" : "36px",
                height: isMobile ? "32px" : "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{
                padding: isMobile ? "0.3rem" : "0.4rem",
                backgroundColor: themeStyles.inputBg,
                color: themeStyles.color,
                border: `1px solid ${themeStyles.border}`,
                borderRadius: "4px",
                fontSize: "0.8em",
                minWidth: isMobile ? "70px" : "80px",
                fontWeight: "500",
              }}
            >
              <option value={14}>Small</option>
              <option value={16}>Medium</option>
              <option value={18}>Large</option>
              <option value={20}>XL</option>
            </select>
          </div>
        </div>

        {/* Model Selection - Single Row - WIDER DROPDOWN */}
        {availableModels.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              flexWrap: "nowrap",
              marginTop: "0.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
              <label
                style={{
                  fontSize: "0.8em",
                  fontWeight: "500",
                  color: "white",
                  whiteSpace: "nowrap",
                }}
              >
                🤖 Model:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={isLoadingModel}
                style={{
                  padding: isMobile ? "0.25rem 0.4rem" : "0.3rem 0.5rem",
                  backgroundColor: themeStyles.inputBg,
                  color: themeStyles.color,
                  border: `1px solid ${themeStyles.border}`,
                  borderRadius: "4px",
                  fontSize: "0.8em",
                  minWidth: isMobile ? "150px" : "300px",
                  maxWidth: isMobile ? "200px" : "400px",
                  fontWeight: "500",
                }}
              >
                {availableModels.map((model) => (
                  <option key={model} value={model} title={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => loadSelectedModel(selectedModel)}
              disabled={!selectedModel || isLoadingModel || isModelReady}
              style={{
                padding: isMobile ? "0.25rem 0.4rem" : "0.3rem 0.5rem",
                backgroundColor: isModelReady
                  ? "#10b981"
                  : isLoadingModel
                  ? "#9ca3af"
                  : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor:
                  !selectedModel || isLoadingModel || isModelReady
                    ? "not-allowed"
                    : "pointer",
                fontSize: "0.8em",
                fontWeight: "500",
                whiteSpace: "nowrap",
                minWidth: isMobile ? "70px" : "80px",
                textAlign: "center",
              }}
            >
              {isLoadingModel
                ? "Loading..."
                : isModelReady
                ? "✅ Ready"
                : "Load"}
            </button>

            {isModelReady && (
              <button
                onClick={() => {
                  setIsModelReady(false);
                  setEngine(null);
                  setMessages([]);
                  setStudySessions([]);
                  setProgressPercent(0);
                  setStatus("Select a model to begin");
                }}
                style={{
                  padding: isMobile ? "0.25rem 0.4rem" : "0.3rem 0.5rem",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.8em",
                  whiteSpace: "nowrap",
                  minWidth: isMobile ? "60px" : "70px",
                  textAlign: "center",
                }}
              >
                Switch
              </button>
            )}
          </div>
        )}

        {/* Progress Bar - Ultra Compact */}
        {progressPercent > 0 && progressPercent < 100 && (
          <div style={{ marginTop: "0.25rem", maxWidth: "300px" }}>
            <div
              style={{
                width: "100%",
                backgroundColor: themeStyles.border,
                borderRadius: "6px",
                overflow: "hidden",
                height: "12px",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: "#10b981",
                  height: "100%",
                  borderRadius: "6px",
                  transition: "width 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6em",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {progressPercent.toFixed(0)}%
              </div>
            </div>
            <div
              style={{
                fontSize: "0.7em",
                marginTop: "0.1rem",
                color: "white",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {status}
            </div>
          </div>
        )}

        {/* Status Display - Ultra Compact */}
        {!isModelReady && progressPercent === 0 && (
          <div
            style={{
              padding: "0.3rem",
              marginTop: "0.25rem",
              backgroundColor: "#fef3c7",
              color: "#92400e",
              borderRadius: "4px",
              fontSize: "0.7em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {status}
          </div>
        )}

        {/* Study Mode Selection - Single Row */}
        {isModelReady && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              flexWrap: "nowrap",
              marginTop: "0.25rem",
            }}
          >
            <select
              value={studyMode}
              onChange={(e) => setStudyMode(e.target.value as StudyMode)}
              style={{
                padding: isMobile ? "0.25rem 0.4rem" : "0.3rem 0.5rem",
                backgroundColor: themeStyles.inputBg,
                color: themeStyles.color,
                border: `1px solid ${themeStyles.border}`,
                borderRadius: "4px",
                fontSize: "0.8em",
                minWidth: isMobile ? "120px" : "140px",
                fontWeight: "500",
              }}
            >
              {Object.entries(studyModes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowPromptSuggestions(!showPromptSuggestions)}
              style={{
                padding: isMobile ? "0.25rem 0.4rem" : "0.3rem 0.5rem",
                backgroundColor: showPromptSuggestions ? "#fbbf24" : "#6b7280",
                color: showPromptSuggestions ? "#92400e" : "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8em",
                whiteSpace: "nowrap",
                fontWeight: "500",
                minWidth: isMobile ? "90px" : "100px",
                textAlign: "center",
              }}
            >
              💡 {showPromptSuggestions ? "Hide" : "Show"}
            </button>
          </div>
        )}
      </div>

      {/* Sessions Panel - Ultra Compact */}
      {showSessions && (
        <div
          style={{
            backgroundColor: themeStyles.chatBg,
            border: `1px solid ${themeStyles.border}`,
            borderRadius: "6px",
            padding: "0.4rem",
            margin: getSpacing(),
            maxHeight: isMobile ? "120px" : "150px",
            overflowY: "auto",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <h3 style={{ margin: "0", fontSize: "1em", fontWeight: "600" }}>
              Study Sessions
            </h3>
            <button
              onClick={startNewSession}
              style={{
                padding: "0.3rem 0.5rem",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8em",
                fontWeight: "500",
              }}
            >
              + New
            </button>
          </div>

          <div style={{ display: "grid", gap: "0.3rem" }}>
            {studySessions.map((session) => (
              <div
                key={session.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.4rem",
                  backgroundColor:
                    currentSessionId === session.id
                      ? "#3b82f6"
                      : themeStyles.assistantBg,
                  color:
                    currentSessionId === session.id
                      ? "white"
                      : themeStyles.color,
                  borderRadius: "4px",
                  cursor: "pointer",
                  border: `1px solid ${themeStyles.border}`,
                }}
                onClick={() => loadSession(session.id)}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div 
                    style={{ 
                      fontWeight: "500", 
                      fontSize: "0.85em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {session.name}
                  </div>
                  <div style={{ fontSize: "0.75em", opacity: 0.7 }}>
                    {studyModes[session.subject] || session.subject} • {session.messages.length} msgs
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                  style={{
                    padding: "0.2rem",
                    backgroundColor: "transparent",
                    color: "inherit",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "3px",
                    fontSize: "0.8em",
                    flexShrink: 0,
                    minWidth: "24px",
                    minHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Suggestions - Ultra Compact */}
      {showPromptSuggestions && isModelReady && promptSuggestions[studyMode] && (
        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #f59e0b",
            borderRadius: "6px",
            padding: "0.4rem",
            margin: `0 ${getChatMargins()} 0.25rem ${getChatMargins()}`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: "0.9em",
              fontWeight: "500",
              marginBottom: "0.3rem",
              color: "#92400e",
            }}
          >
            💡 Try these prompts:
          </div>
          <div 
            style={{ 
              display: "flex", 
              gap: isMobile ? "0" : "0.75rem", 
              flexWrap: "wrap",
              overflowX: isMobile ? "auto" : "visible",
              paddingBottom: isMobile ? "0" : "0.3rem",
            }}
          >
            {promptSuggestions[studyMode].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => insertSuggestion(suggestion)}
                style={{
                  padding: "0.3rem 0.5rem",
                  backgroundColor: "white",
                  color: "#92400e",
                  border: "1px solid #f59e0b",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.8em",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  fontWeight: "500",
                  minHeight: "28px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area - Maximum Space with Better Height Management */}
      {isModelReady && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            marginTop: isMobile ? "0.1rem" : "0.25rem",
            overflow: "hidden",
          }}
        >
          {/* Enhanced Chat Area - Takes maximum space */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              border: `1px solid ${themeStyles.border}`,
              borderRadius: "8px",
              padding: isMobile ? "0.75rem" : "1rem",
              marginLeft: getChatMargins(),
              marginRight: getChatMargins(),
              marginBottom: "0.25rem",
              backgroundColor: themeStyles.chatBg,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              minHeight: 0,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {messages.map((message, index) => (
              <div key={message.id}>
                <div
                  style={{
                    marginBottom: "0.75rem",
                    padding: isMobile ? "0.6rem" : "0.8rem",
                    borderRadius: "8px",
                    backgroundColor:
                      message.role === "user"
                        ? themeStyles.userBg
                        : themeStyles.assistantBg,
                    color:
                      message.role === "user" ? "white" : themeStyles.color,
                    marginLeft: message.role === "user" ? 
                      (isMobile ? "15%" : isTablet ? "25%" : "30%") : "0",
                    marginRight: message.role === "assistant" ? 
                      (isMobile ? "5%" : isTablet ? "15%" : "20%") : "0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    border: `1px solid ${themeStyles.border}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.85em",
                      opacity: 0.9,
                      marginBottom: "0.4rem",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {message.role === "user" ? "👨‍🎓 You" : "🤖 AI"}
                    <span style={{ fontSize: "0.75em", opacity: 0.7 }}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {message.subject && (
                      <span
                        style={{
                          fontSize: "0.75em",
                          backgroundColor: "#10b981",
                          color: "white",
                          padding: "1px 4px",
                          borderRadius: "3px",
                          fontWeight: "500",
                        }}
                      >
                        {studyModes[message.subject as StudyMode]}
                      </span>
                    )}

                    {message.isTruncated && (
                      <span
                        style={{
                          fontSize: "0.75em",
                          backgroundColor: "#fbbf24",
                          color: "#92400e",
                          padding: "1px 4px",
                          borderRadius: "3px",
                          fontWeight: "500",
                        }}
                      >
                        Truncated
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.5",
                      fontSize: "1em",
                    }}
                  >
                    {message.content}
                  </div>
                </div>

                {/* Continue Button */}
                {message.role === "assistant" &&
                  message.isTruncated &&
                  !isGenerating &&
                  index === messages.length - 1 && (
                    <div
                      style={{
                        marginBottom: "0.75rem",
                        marginRight: isMobile ? "5%" : "10%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        onClick={() => continueGeneration(message.id)}
                        style={{
                          padding: "0.4rem 0.8rem",
                          backgroundColor: "#10b981",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.9em",
                          fontWeight: "600",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          transition: "all 0.2s",
                          whiteSpace: "nowrap",
                          minHeight: "32px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        ➕ Continue
                      </button>
                    </div>
                  )}
              </div>
            ))}

            {isGenerating && (
              <div
                style={{
                  padding: isMobile ? "0.6rem" : "0.8rem",
                  marginRight: isMobile ? "5%" : "10%",
                  backgroundColor: "#fef3c7",
                  border: "1px dashed #f59e0b",
                  borderRadius: "8px",
                  color: "#92400e",
                  textAlign: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <div 
                  style={{ 
                    fontWeight: "600", 
                    marginBottom: "0.4rem",
                    fontSize: "1em"
                  }}
                >
                  🧠 Thinking...
                </div>
                <button
                  onClick={() => {
                    if (abortControllerRef.current) {
                      abortControllerRef.current.abort();
                      setIsGenerating(false);
                    }
                  }}
                  style={{
                    padding: "0.3rem 0.6rem",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.9em",
                    fontWeight: "500",
                    minHeight: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  ⏹️ Stop
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area - Better Bottom Spacing */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? "0.75rem" : "1rem",
              alignItems: "center",
              padding: isMobile ? "0.25rem" : "0.5rem",
              paddingTop: "0.25rem",
              paddingBottom: "0",
              backgroundColor: themeStyles.chatBg,
              borderRadius: "8px",
              border: `1px solid ${themeStyles.border}`,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              marginLeft: getChatMargins(),
              marginRight: getChatMargins(),
              marginBottom: getChatMargins(),
              flexShrink: 0,
              minHeight: isMobile ? "max-content" : "max-content",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask about ${studyModes[studyMode].toLowerCase()}...`}
                disabled={isGenerating}
                style={{
                  width: "100%",
                  padding: isMobile ? "0.6rem" : "0.75rem",
                  border: `1px solid ${themeStyles.border}`,
                  borderRadius: "6px",
                  fontSize: "1em",
                  resize: "none",
                  minHeight: "50px",
                  maxHeight: "100px",
                  fontFamily: "inherit",
                  backgroundColor: themeStyles.inputBg,
                  color: themeStyles.color,
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box",
                  fontWeight: "500",
                }}
                rows={1}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
                gap: "0.4rem",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isGenerating}
                style={{
                  padding: isMobile ? "0.5rem 0.7rem" : "0.6rem 0.8rem",
                  backgroundColor:
                    inputMessage.trim() && !isGenerating
                      ? "#10b981"
                      : "#9ca3af",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor:
                    inputMessage.trim() && !isGenerating
                      ? "pointer"
                      : "not-allowed",
                  fontSize: "0.9em",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  justifyContent: "center",
                  minWidth: isMobile ? "60px" : "70px",
                  minHeight: isMobile ? "40px" : "45px",
                }}
              >
                {isGenerating ? (
                  <>
                    <span>🤔</span>
                    {!isMobile && <span>Thinking</span>}
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    {!isMobile && <span>Send</span>}
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  const currentSession = studySessions.find(
                    (s) => s.id === currentSessionId
                  );

                  if (currentSession && currentSession.messages.length > 0) {
                    const firstMessage = currentSession.messages[0];
                    if (firstMessage) {
                      setMessages([
                        {
                          id: firstMessage.id,
                          role: firstMessage.role,
                          content: firstMessage.content,
                          timestamp: firstMessage.timestamp,
                          subject: firstMessage.subject ?? studyMode,
                          isTruncated: firstMessage.isTruncated ?? false,
                        },
                      ]);
                    } else {
                      startNewSession();
                    }
                  } else {
                    setMessages([
                      {
                        id: Date.now().toString(),
                        role: "assistant",
                        content: `Chat cleared! I'm ready to help you with ${studyModes[studyMode].toLowerCase()}. What would you like to work on?`,
                        timestamp: new Date(),
                        subject: studyMode,
                        isTruncated: false,
                      },
                    ]);
                  }
                }}
                style={{
                  padding: isMobile ? "0.5rem 0.7rem" : "0.6rem 0.8rem",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9em",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  minWidth: isMobile ? "60px" : "70px",
                  minHeight: isMobile ? "40px" : "45px",
                }}
              >
                <span>🧹</span>
                {!isMobile && <span>Clear</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAI;