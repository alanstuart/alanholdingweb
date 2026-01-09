import React, { useEffect, useState, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: 'fadeSlide' | 'wave' | 'glitch' | 'bounce' | 'gradient';
  staggerDelay?: number;
  duration?: number;
  startDelay?: number;
  triggerOnView?: boolean;
  highlightWords?: string[];
  highlightClassName?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  animationType = 'fadeSlide',
  staggerDelay = 30,
  duration = 600,
  startDelay = 0,
  triggerOnView = true,
  highlightWords = [],
  highlightClassName = 'text-blue-500'
}) => {
  const [isVisible, setIsVisible] = useState(!triggerOnView);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!triggerOnView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasAnimated(true);
      }, startDelay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, startDelay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView, startDelay, hasAnimated]);

  const words = text.split(' ');
  let charIndex = 0;

  const getAnimationStyle = (index: number): React.CSSProperties => {
    const delay = index * staggerDelay;

    const baseStyle: React.CSSProperties = {
      display: 'inline-block',
      animationDuration: `${duration}ms`,
      animationDelay: `${delay}ms`,
      animationFillMode: 'both',
      animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };

    if (!isVisible) {
      return {
        ...baseStyle,
        opacity: 0,
        transform: animationType === 'wave' ? 'translateY(20px)' :
                   animationType === 'bounce' ? 'scale(0) translateY(30px)' :
                   animationType === 'glitch' ? 'translateX(-10px)' :
                   'translateY(40px) rotateX(-90deg)'
      };
    }

    return baseStyle;
  };

  const getAnimationClass = (): string => {
    if (!isVisible) return '';

    switch (animationType) {
      case 'wave':
        return 'animate-wave-letter';
      case 'bounce':
        return 'animate-bounce-letter';
      case 'glitch':
        return 'animate-glitch-letter';
      case 'gradient':
        return 'animate-gradient-letter';
      default:
        return 'animate-fade-slide-letter';
    }
  };

  const isHighlightWord = (word: string): boolean => {
    return highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
  };

  return (
    <span ref={containerRef} className={`inline ${className}`}>
      {words.map((word, wordIndex) => {
        const wordStartIndex = charIndex;
        const isHighlighted = isHighlightWord(word);

        const renderedWord = (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split('').map((char, letterIndex) => {
              const currentCharIndex = charIndex++;
              return (
                <span
                  key={`${wordIndex}-${letterIndex}`}
                  className={`${getAnimationClass()} ${isHighlighted ? highlightClassName : ''}`}
                  style={getAnimationStyle(currentCharIndex)}
                >
                  {char}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span
                className={getAnimationClass()}
                style={getAnimationStyle(charIndex++)}
              >
                &nbsp;
              </span>
            )}
          </span>
        );

        return renderedWord;
      })}
    </span>
  );
};

export default AnimatedText;
