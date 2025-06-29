import { getElements } from '@/lib/elements';
import ElementBlock from '@/components/ElementBlock';

export default function PeriodicTable() {
  const elements = getElements();

  return (
    <div 
      className="grid gap-1.5 transform-style-3d" 
      style={{ 
        gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
        gridAutoFlow: 'dense',
      }}
    >
      {elements.map((element) => (
        <div
          key={element.symbol}
          style={{ 
            gridColumn: `${element.xpos} / span 1`, 
            gridRow: `${element.ypos} / span 1` 
          }}
        >
          <ElementBlock element={element} />
        </div>
      ))}
    </div>
  );
}
