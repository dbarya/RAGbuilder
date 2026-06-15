import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Play, 
  Settings, 
  Layout as LayoutIcon, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Image as ImageIcon,
  Type,
  CheckCircle,
  Sparkles,
  Loader2,
  X
} from 'lucide-react';
import { mockPresentation } from './data/mockPresentation';
import { SlideContent } from './components/SlideContent';
import { generatePresentation, exportPresentation } from './services/api';

function App() {
  const [presentation, setPresentation] = useState(mockPresentation);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [showGenModal, setShowGenModal] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentSlide = presentation.slides[currentSlideIndex];

  const addSlide = (type = 'content') => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      theme: { ...currentSlide.theme }
    };
    const newSlides = [...presentation.slides];
    newSlides.splice(currentSlideIndex + 1, 0, newSlide);
    setPresentation({ ...presentation, slides: newSlides });
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'title': return { title: 'New Presentation', subtitle: 'Subtitle goes here' };
      case 'content': return { title: 'New Slide', body: 'Add your bullet points here' };
      case 'two-column': return { title: 'Two Columns', leftColumn: 'Left side', rightColumn: 'Right side' };
      case 'image': return { title: 'Image Slide', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' };
      case 'section': return { title: 'Section Title' };
      case 'closing': return { title: 'Thank You!', subtitle: 'Questions?' };
      default: return { title: 'New Slide' };
    }
  };

  const removeSlide = (index) => {
    if (presentation.slides.length <= 1) return;
    const newSlides = presentation.slides.filter((_, i) => i !== index);
    setPresentation({ ...presentation, slides: newSlides });
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
  };

  const moveSlide = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === presentation.slides.length - 1) return;
    
    const newSlides = [...presentation.slides];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
    
    setPresentation({ ...presentation, slides: newSlides });
    setCurrentSlideIndex(targetIndex);
  };

  const updateSlideContent = (field, value) => {
    const newSlides = [...presentation.slides];
    newSlides[currentSlideIndex] = {
      ...currentSlide,
      content: { ...currentSlide.content, [field]: value }
    };
    setPresentation({ ...presentation, slides: newSlides });
  };

  const changeTheme = (theme) => {
    const newSlides = presentation.slides.map(slide => ({
      ...slide,
      theme: { ...slide.theme, ...theme }
    }));
    setPresentation({ ...presentation, slides: newSlides });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const result = await generatePresentation(prompt);
      setPresentation(result);
      setCurrentSlideIndex(0);
      setShowGenModal(false);
      setPrompt('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const result = await exportPresentation(presentation, format);
      alert(`Exporting to ${format.toUpperCase()}...`);
    } catch (error) {
      console.error(error);
    }
  };

  if (isPreview) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div 
          className="w-full h-full flex items-center justify-center overflow-hidden"
          onClick={() => setCurrentSlideIndex(Math.min(presentation.slides.length - 1, currentSlideIndex + 1))}
        >
           <div 
            className="w-[90vw] aspect-video bg-white shadow-2xl relative overflow-hidden transition-all duration-500"
            style={{ 
              backgroundColor: currentSlide.theme.backgroundColor,
              color: currentSlide.theme.textColor
            }}
          >
            <SlideContent slide={currentSlide} />
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-gray-800/80 p-2 rounded-full backdrop-blur-md border border-gray-700 shadow-2xl">
          <button 
            onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1)); }}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronUp className="-rotate-90" />
          </button>
          <span className="text-white px-2 flex items-center font-mono">
            {currentSlideIndex + 1} / {presentation.slides.length}
          </span>
          <button 
            onClick={(e) => { e.stopPropagation(); setCurrentSlideIndex(Math.min(presentation.slides.length - 1, currentSlideIndex + 1)); }}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronDown className="-rotate-90" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPreview(false); }}
            className="px-4 text-white hover:bg-white/20 rounded-full transition-colors text-sm font-medium"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden font-sans text-gray-900">
      {/* Top Toolbar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">DF</div>
          <div className="flex flex-col">
            <input 
              type="text" 
              value={presentation.title}
              onChange={(e) => setPresentation({ ...presentation, title: e.target.value })}
              className="text-lg font-bold bg-transparent border-none focus:ring-2 focus:ring-blue-100 rounded px-1 outline-none transition-all"
            />
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold px-1">Auto-saved</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowGenModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all font-bold"
          >
            <Sparkles size={18} />
            Generate with AI
          </button>
          <div className="h-8 w-px bg-gray-200 mx-2" />
          <button 
            onClick={() => setIsPreview(true)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg transition-all text-gray-600 font-semibold"
          >
            <Play size={18} className="fill-current" />
            Preview
          </button>
          <div className="relative group">
            <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-bold shadow-md shadow-blue-100">
              <Download size={18} />
              Export
            </button>
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-xl shadow-xl hidden group-hover:block z-20 overflow-hidden">
               <button onClick={() => handleExport('pdf')} className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm font-semibold flex items-center justify-between border-b">
                 PDF 
                 <span className="text-[10px] bg-green-100 text-green-700 px-1.5 rounded">FREE</span>
               </button>
               <button onClick={() => handleExport('pptx')} className="w-full px-4 py-3 text-left hover:bg-gray-50 text-sm font-semibold flex items-center justify-between">
                 PPTX
                 <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 rounded">PRO</span>
               </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r flex flex-col shrink-0 overflow-hidden shadow-inner">
          <div className="p-4 border-b flex items-center justify-between bg-gray-50/50">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Slides</h2>
            <div className="flex gap-1">
              <button 
                onClick={() => addSlide('content')}
                className="p-1.5 hover:bg-blue-50 rounded-md transition-colors text-blue-600"
                title="Add content slide"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
            {presentation.slides.map((slide, index) => (
              <div key={slide.id} className="flex gap-3 items-center group">
                <span className="text-[10px] font-bold text-gray-300 w-4 text-right">{index + 1}</span>
                <div 
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`
                    flex-1 relative cursor-pointer rounded-xl border-2 transition-all overflow-hidden shadow-sm
                    ${currentSlideIndex === index ? 'border-blue-600 ring-4 ring-blue-50 translate-x-1' : 'border-white hover:border-blue-200 hover:shadow-md'}
                  `}
                >
                  <div className="aspect-video bg-white relative flex items-center justify-center p-3 overflow-hidden select-none pointer-events-none">
                     <div style={{ color: slide.theme.textColor }} className="w-full h-full flex flex-col">
                        <div className="h-1 w-1/2 bg-current opacity-20 rounded mb-1" />
                        <div className="h-[2px] w-full bg-current opacity-10 rounded mb-[1px]" />
                        <div className="h-[2px] w-full bg-current opacity-10 rounded mb-[1px]" />
                        <div className="h-[2px] w-2/3 bg-current opacity-10 rounded" />
                     </div>
                  </div>
                  
                  {/* Thumb controls */}
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex flex-col gap-1 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeSlide(index); }}
                      className="p-1.5 bg-white/90 backdrop-blur shadow-sm rounded-lg hover:text-red-600 text-gray-400 border"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addSlide('content')}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
            >
              <Plus size={24} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </aside>

        {/* Main Editor */}
        <main className="flex-1 flex flex-col bg-[#f0f2f5] overflow-hidden relative">
           <div className="flex-1 flex items-center justify-center p-12 overflow-auto">
              <div 
                className="w-full max-w-5xl aspect-video bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden transition-all duration-300 rounded-sm"
                style={{ 
                  backgroundColor: currentSlide.theme.backgroundColor,
                  color: currentSlide.theme.textColor
                }}
              >
                <SlideContent 
                  slide={currentSlide} 
                  isEditing={true} 
                  onUpdate={updateSlideContent}
                />
              </div>
           </div>

           {/* Editor Toolbar */}
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-xl p-2 rounded-2xl border shadow-2xl border-white">
              <div className="flex items-center gap-1 px-2 border-r pr-3 mr-2">
                 <button 
                   onClick={() => moveSlide(currentSlideIndex, 'up')}
                   disabled={currentSlideIndex === 0}
                   className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-30 transition-colors"
                 >
                   <ChevronUp size={20} />
                 </button>
                 <button 
                    onClick={() => moveSlide(currentSlideIndex, 'down')}
                    disabled={currentSlideIndex === presentation.slides.length - 1}
                    className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-30 transition-colors"
                 >
                   <ChevronDown size={20} />
                 </button>
              </div>

              <div className="flex items-center gap-1">
                 <button onClick={() => addSlide('content')} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all flex flex-col items-center gap-1 group">
                   <Type size={20} />
                   <span className="text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Text</span>
                 </button>
                 <button onClick={() => addSlide('image')} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all flex flex-col items-center gap-1 group">
                   <ImageIcon size={20} />
                   <span className="text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Image</span>
                 </button>
                 <button onClick={() => addSlide('two-column')} className="p-3 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all flex flex-col items-center gap-1 group">
                   <LayoutIcon size={20} />
                   <span className="text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Layout</span>
                 </button>
                 <button 
                   onClick={() => setActiveTab(activeTab === 'themes' ? 'editor' : 'themes')}
                   className={`p-3 rounded-xl transition-all flex flex-col items-center gap-1 group ${activeTab === 'themes' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-blue-50 hover:text-blue-600'}`}
                 >
                   <Settings size={20} />
                   <span className="text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Themes</span>
                 </button>
              </div>
           </div>

           {/* Theme Sidebar Overlay */}
           {activeTab === 'themes' && (
             <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-2xl border-l z-20 animate-in slide-in-from-right duration-300">
               <div className="p-6">
                 <div className="flex items-center justify-between mb-8">
                   <h3 className="font-bold text-lg">Appearance</h3>
                   <button onClick={() => setActiveTab('editor')} className="p-2 hover:bg-gray-100 rounded-full">
                     <Plus className="rotate-45" size={20} />
                   </button>
                 </div>

                 <div className="space-y-6">
                   <div>
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Color Palette</label>
                     <div className="grid grid-cols-2 gap-3">
                        {[
                          { bg: '#ffffff', text: '#1a1a1a', accent: '#3b82f6', label: 'Classic' },
                          { bg: '#1a1a1a', text: '#ffffff', accent: '#3b82f6', label: 'Dark' },
                          { bg: '#fdfcf0', text: '#433422', accent: '#d97706', label: 'Sepia' },
                          { bg: '#eff6ff', text: '#1e40af', accent: '#60a5fa', label: 'Ocean' },
                        ].map(theme => (
                          <button 
                            key={theme.label}
                            onClick={() => changeTheme({ backgroundColor: theme.bg, textColor: theme.text, accentColor: theme.accent })}
                            className="p-3 rounded-xl border-2 hover:border-blue-400 transition-all text-left flex flex-col gap-2 group"
                            style={{ backgroundColor: theme.bg }}
                          >
                            <div className="flex gap-1">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }} />
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.text }} />
                            </div>
                            <span className="text-xs font-bold" style={{ color: theme.text }}>{theme.label}</span>
                          </button>
                        ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}

           {/* Generate Modal */}
           {showGenModal && (
             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
               <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                 <div className="p-8">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                           <Sparkles size={20} />
                         </div>
                         <h2 className="text-2xl font-bold">Generate with AI</h2>
                      </div>
                      <button onClick={() => setShowGenModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} />
                      </button>
                   </div>
                   
                   <p className="text-gray-600 mb-6">Enter a topic or describe what you want to present, and our AI will build the deck for you.</p>
                   
                   <textarea 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     placeholder="e.g. A business pitch for a new AI-powered slide tool..."
                     className="w-full h-32 p-4 border-2 border-gray-100 rounded-2xl focus:border-indigo-600 outline-none transition-all resize-none text-lg"
                   />
                   
                   <div className="mt-8 flex gap-3">
                     <button 
                       onClick={() => setShowGenModal(false)}
                       className="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-all"
                     >
                       Cancel
                     </button>
                     <button 
                       onClick={handleGenerate}
                       disabled={!prompt.trim() || isGenerating}
                       className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
                     >
                       {isGenerating ? (
                         <>
                           <Loader2 className="animate-spin" />
                           Generating...
                         </>
                       ) : (
                         <>
                           <Sparkles size={18} />
                           Create Presentation
                         </>
                       )}
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           )}
        </main>
      </div>
    </div>
  );
}

export default App;
