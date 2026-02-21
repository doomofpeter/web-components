import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CarouselCard } from './CarouselCard';

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface ContentCarouselProps {
  title: string;
  items: CarouselItem[];
}

export const ContentCarousel: React.FC<ContentCarouselProps> = ({
  title,
  items,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header: Title + Buttons */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-sm"
            aria-label="Previous slide"
          >
            Prev
          </button>
          <button
            onClick={scrollNext}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-sm"
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
      </div>

      {/* Carousel Viewport - Always shows 4 cards */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <CarouselCard
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
