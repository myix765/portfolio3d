import type { ReactNode } from 'react';

interface AppSectionProps {
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

const AppSection = ({ children, colSpan = 1, rowSpan = 1 }: AppSectionProps) => {
  const isVert = rowSpan > colSpan;
  const colClass =
    { 1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4', 5: 'col-span-5' }[colSpan] ?? 'col-span-1';
  const rowClass = { 1: 'row-span-1', 2: 'row-span-2', 3: 'row-span-3' }[rowSpan] ?? 'row-span-1';
  return (
    <section
      className={`border border-neutral-300 rounded-xl p-[1vw] min-h-0
              flex ${isVert ? 'flex-col' : 'flex-row'} @max-3xl:flex-col gap-[1vw]
              ${colClass} ${rowClass}
              @max-3xl:col-span-full @max-3xl:row-span-1`}
    >
      {children}
    </section>
  );
};

export default AppSection;
