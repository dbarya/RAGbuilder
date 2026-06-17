import { 
  Layout as LayoutIcon,
  Type
} from 'lucide-react';

export function SlideContent({ slide, isEditing, onUpdate }) {
  const { type, content } = slide;

  const handleEdit = (field, e) => {
    if (!isEditing) return;
    onUpdate(field, e.target.innerText);
  };

  const editProps = (field) => ({
    contentEditable: isEditing,
    onBlur: (e) => handleEdit(field, e),
    suppressContentEditableWarning: true,
    className: "outline-none focus:ring-2 focus:ring-blue-100 rounded transition-all px-1"
  });

  switch (type) {
    case 'title':
      return (
        <div className="h-full flex flex-col items-center justify-center p-24 text-center">
          <div className="w-20 h-2 bg-blue-600 mb-12 rounded-full" style={{ backgroundColor: slide.theme.accentColor }} />
          <h1 
            {...editProps('title')}
            className={editProps('title').className + " text-7xl font-black mb-6 leading-tight tracking-tight"}
          >
            {content.title}
          </h1>
          <p 
            {...editProps('subtitle')}
            className={editProps('subtitle').className + " text-3xl opacity-60 font-medium"}
          >
            {content.subtitle}
          </p>
        </div>
      );
    case 'content':
      return (
        <div className="h-full p-20 flex flex-col">
          <h2 
            {...editProps('title')}
            className={editProps('title').className + " text-5xl font-black mb-12 border-l-8 pl-6 leading-none"}
            style={{ borderLeftColor: slide.theme.accentColor }}
          >
            {content.title}
          </h2>
          <div 
            {...editProps('body')}
            className={editProps('body').className + " text-2xl leading-relaxed whitespace-pre-wrap flex-1 opacity-80"}
          >
            {content.body}
          </div>
        </div>
      );
    case 'two-column':
      return (
        <div className="h-full p-20 flex flex-col">
          <h2 
            {...editProps('title')}
            className={editProps('title').className + " text-5xl font-black mb-16"}
          >
            {content.title}
          </h2>
          <div className="flex-1 grid grid-cols-2 gap-16">
            <div 
              {...editProps('leftColumn')}
              className={editProps('leftColumn').className + " text-xl leading-relaxed whitespace-pre-wrap opacity-80 border-r pr-8"}
            >
              {content.leftColumn}
            </div>
            <div 
              {...editProps('rightColumn')}
              className={editProps('rightColumn').className + " text-xl leading-relaxed whitespace-pre-wrap opacity-80"}
            >
              {content.rightColumn}
            </div>
          </div>
        </div>
      );
    case 'image':
      return (
        <div className="h-full flex">
          <div className="w-1/2 p-20 flex flex-col justify-center">
            <h2 
              {...editProps('title')}
              className={editProps('title').className + " text-5xl font-black mb-8"}
            >
              {content.title}
            </h2>
            <div 
              {...editProps('body')}
              className={editProps('body').className + " text-xl opacity-70"}
            >
              {content.body || 'Add description for this image...'}
            </div>
          </div>
          <div className="w-1/2 relative overflow-hidden">
             <img src={content.image} className="w-full h-full object-cover" alt="Slide" />
             <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
        </div>
      );
    case 'section':
      return (
        <div className="h-full flex flex-col items-center justify-center p-24" style={{ backgroundColor: slide.theme.accentColor, color: '#fff' }}>
           <h2 
             {...editProps('title')}
             className={editProps('title').className + " text-6xl font-black tracking-tighter text-white"}
           >
             {content.title}
           </h2>
           <div className="w-32 h-1 bg-white/30 mt-8 rounded-full" />
        </div>
      );
    case 'closing':
      return (
        <div className="h-full flex flex-col items-center justify-center p-24 text-center">
          <h1 
            {...editProps('title')}
            className={editProps('title').className + " text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500"}
            style={{ backgroundImage: `linear-gradient(to bottom right, ${slide.theme.textColor}, ${slide.theme.accentColor})` }}
          >
            {content.title}
          </h1>
          <p 
            {...editProps('subtitle')}
            className={editProps('subtitle').className + " text-3xl opacity-60 font-bold tracking-widest uppercase"}
          >
            {content.subtitle}
          </p>
        </div>
      );
    default:
      return (
        <div className="h-full flex items-center justify-center p-24">
          <div className="text-center p-12 border-4 border-dashed rounded-3xl border-gray-100">
             <LayoutIcon size={48} className="mx-auto mb-4 text-gray-200" />
             <p className="text-gray-400 font-bold uppercase tracking-widest">Unsupported Layout</p>
          </div>
        </div>
      );
  }
}
