import { useEffect, useState } from 'react';
import { cn } from '@lib/cn';

export interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

const TypingText = ({
  text,
  speed = 50,
  delay = 0,
  className,
  cursor = true,
  onComplete,
}: TypingTextProps)=> {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [isTyping, text, speed, onComplete]);

  return (
    <span className={cn('font-mono', className)}>
      {displayText}
      {cursor && <span className="animate-pulse text-neural-glow">|</span>}
    </span>
  );
};

export default TypingText;
