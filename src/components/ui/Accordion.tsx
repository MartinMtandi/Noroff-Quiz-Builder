import { AccordionProps } from '@/types/Index';
import React, { useState } from 'react';

function cx(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(' ');
}

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
            {items.map(({ id, header, content }, idx) => {
                const isOpen = openIds.includes(id);
                return (
                    <div
            key={id}
            className={`${containerBase} opacity-0 animate-fadeIn`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
                        <button
                            id={`accordion-header-${id}`}
                            type="button"
                            onClick={() => toggle(id)}
                            className={cx(
                                buttonBase,
                                isOpen ? 'text-blue-600' : 'hover:text-blue-600'
                            )}
                            aria-expanded={isOpen}
                            aria-controls={`accordion-panel-${id}`}
                        >
                            <span>{header}</span>
                            <svg
                                className={cx(iconBase, isOpen && 'rotate-180')}
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
                            className={cx(panelBase, isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0')}
                        >
                            <div className={panelContent}>{content}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Common Tailwind class groups
const containerBase = 'border-b border-gray-200 last:border-none';
const buttonBase =
    'flex w-full items-center justify-between py-4 text-left font-medium text-gray-900 ' +
    'focus:outline-none focus-visible:ring focus-visible:ring-offset-2';
const iconBase = 'h-5 w-5 transition-transform duration-200';
const panelBase = 'overflow-hidden transition-all duration-300';
const panelContent = 'pb-4 pt-1 text-gray-700';

export default Accordion;

