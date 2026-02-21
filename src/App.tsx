import { ContentCarousel, CarouselItem } from './components/ContentCarousel';

const sampleItems: CarouselItem[] = [
  {
    id: '1',
    title: 'Card One',
    description: 'This is the first card in the carousel.',
    imageUrl: 'https://picsum.photos/seed/1/400/300',
  },
  {
    id: '2',
    title: 'Card Two',
    description: 'This is the second card in the carousel.',
    imageUrl: 'https://picsum.photos/seed/2/400/300',
  },
  {
    id: '3',
    title: 'Card Three',
    description: 'This is the third card in the carousel.',
    imageUrl: 'https://picsum.photos/seed/3/400/300',
  },
  {
    id: '4',
    title: 'Card Four',
    description: 'This is the fourth card in the carousel.',
    imageUrl: 'https://picsum.photos/seed/4/400/300',
  },
  {
    id: '5',
    title: 'Card Five',
    description: 'This is the fifth card in the carousel.',
    imageUrl: 'https://picsum.photos/seed/5/400/300',
  },
  {
    id: '6',
    title: 'Card Six',
    description: 'This is the sixth card in the carousel.',
    imageUrl: 'https://picsum.photos/seed/6/400/300',
  },
  {
    id: '7',
    title: 'Card Seven',
    description: 'This is the seventh card in the carousel.',
    imageUrl: 'https://picsum.photos/seed/7/400/300',
  },
  {
    id: '8',
    title: 'Card Eight',
    description: 'This is the eighth card in the carousel.',
    imageUrl: 'https://picsum.photos/seed/8/400/300',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContentCarousel
        title="Featured Content"
        items={sampleItems}
      />
    </div>
  );
}

export default App;
