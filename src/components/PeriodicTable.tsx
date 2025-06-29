import { getElements } from '@/lib/elements';
import ElementBlock from '@/components/ElementBlock';

export default function PeriodicTable() {
  const elements = getElements();

  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div 
        className="grid gap-1 transform-style-3d" 
        style={{ 
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          gridAutoFlow: 'dense',
          minWidth: '900px'
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
    </div>
  );
}
