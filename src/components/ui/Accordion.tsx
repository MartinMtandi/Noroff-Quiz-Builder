import React, { useState } from 'react';

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface AccordionItem {
  /** Unique id for the item */
  id: string;
  /** Header element shown for the item */
  header: React.ReactNode;
  /** Content revealed when the item is open */
  content: React.ReactNode;
}

export interface AccordionProps {
  /** Items to render */
  items: AccordionItem[];
  /** Allow multiple items to stay open simultaneously */
  allowMultiple?: boolean;
  /** Optional additional utility classes */
  className?: string;
}

/**
 * Accessible, unstyled accordion component.
 * Utilises TailwindCSS utility classes for animation and styling.
 */
const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false, className }) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={className}>
      {items.map(({ id, header, content }) => {
        const isOpen = openIds.includes(id);
        return (
          <div key={id} className="border-b border-gray-200 last:border-none">
            <button
              type="button"
              onClick={() => toggle(id)}
              className={cx(
                'flex w-full items-center justify-between py-4 text-left font-medium text-gray-900',
                'focus:outline-none focus-visible:ring focus-visible:ring-offset-2',
                isOpen ? 'text-blue-600' : 'hover:text-blue-600'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${id}`}
            >
              <span>{header}</span>
              <svg
                className={cx('h-5 w-5 transition-transform duration-200', isOpen && 'rotate-180')}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              id={`accordion-panel-${id}`}
              role="region"
              aria-labelledby={`accordion-header-${id}`}
              className={cx(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="pb-4 pt-1 text-gray-700">{content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
