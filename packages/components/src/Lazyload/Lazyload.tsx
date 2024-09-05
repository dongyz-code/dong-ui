import React, { useState, useEffect, useRef } from 'react';
import type { LazyloadProps } from './interface';

const Lazyload: React.FC<LazyloadProps> = ({
  children,
  placeholder,
  className,
  style,
  width,
  height,
  offset,
  onContentVisible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementObserver = useRef<IntersectionObserver>();
  const [visible, setVisible] = useState(false);

  const styles = { ...style, width, height };

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    const { isIntersecting } = entry;

    if (isIntersecting) {
      setVisible(true);
      onContentVisible?.();

      const node = containerRef.current;

      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  }

  useEffect(() => {
    const newOffset = parseInt((offset || '0') + '');
    const options = {
      rootMargin: `${newOffset}px`,
      threshold: 0,
    };

    elementObserver.current = new IntersectionObserver(handleIntersection, options);

    const node = containerRef.current;

    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }

    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={styles}>
      {visible ? children : placeholder}
    </div>
  );
};

export default Lazyload;
