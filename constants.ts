import { QuizQuestion, Tab } from "./types";
import { Shield, Send, Lock, Zap, FileJson, HelpCircle } from 'lucide-react';

export const TABS = [
  { id: Tab.BASICS, label: 'The Basics', icon: FileJson },
  { id: Tab.REQUEST_RESPONSE, label: 'Req & Res', icon: Send },
  { id: Tab.MITM, label: 'The Danger (MITM)', icon: Shield },
  { id: Tab.HANDSHAKE, label: 'TLS Handshake', icon: Lock },
  { id: Tab.EVOLUTION, label: 'Evolution', icon: Zap },
  { id: Tab.QUIZ, label: 'Quiz', icon: HelpCircle },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which port does HTTPS use by default?",
    options: ["80", "8080", "443", "21"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Is HTTPS a completely separate protocol from HTTP?",
    options: ["Yes, it's a different language", "No, it's HTTP tunneled over TLS/SSL", "Yes, created by Apple", "No, it just uses a different cable"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which version of HTTP introduced the use of UDP (QUIC)?",
    options: ["HTTP/1.1", "HTTP/2", "HTTP/3", "HTTPS"],
    correctAnswer: 2
  }
];
