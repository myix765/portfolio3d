import type { ReactNode } from 'react';

interface AppSectionProps {
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

const AppSection = ({ children, colSpan = 1, rowSpan = 1 }: AppSectionProps) => {
  const isVert = rowSpan > colSpan;
  return (
    <section
      style={{ gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }}
      className={`border border-neutral-300 rounded-xl p-[1vw] min-h-0
                  flex ${isVert && 'flex-col'} gap-[1vw]`}
    >
      {children}
    </section>
  );
};

export default AppSection;
