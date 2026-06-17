export const mockPresentation = {
  id: 'pres-1',
  title: 'Future of AI in Deck Building',
  slides: [
    {
      id: 'slide-1',
      type: 'title',
      content: {
        title: 'DeckForge: AI Presentations',
        subtitle: 'The future of rapid deck creation',
      },
      theme: {
        backgroundColor: '#ffffff',
        textColor: '#1a1a1a',
        accentColor: '#3b82f6',
      }
    },
    {
      id: 'slide-2',
      type: 'content',
      content: {
        title: 'Key Features',
        body: '• Rapid Generation\n• Multiple LLM Providers\n• Export to PDF and PPTX\n• Custom Branding',
      },
      theme: {
        backgroundColor: '#ffffff',
        textColor: '#1a1a1a',
        accentColor: '#3b82f6',
      }
    },
    {
      id: 'slide-3',
      type: 'two-column',
      content: {
        title: 'Free vs Pro',
        leftColumn: 'Free Tier:\n• Basic Templates\n• PDF Export\n• Watermarked',
        rightColumn: 'Pro Tier:\n• Premium Templates\n• PPTX Export\n• No Watermark\n• Team Collab',
      },
      theme: {
        backgroundColor: '#f8fafc',
        textColor: '#1a1a1a',
        accentColor: '#3b82f6',
      }
    }
  ]
};
