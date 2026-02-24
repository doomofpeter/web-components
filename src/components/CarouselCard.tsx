interface CarouselCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export function CarouselCard({
  title,
  description,
  imageUrl,
}: CarouselCardProps) {
  return (
    <div className="embla__slide flex-[0_0_25%] min-w-0 px-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full border border-gray-200">
        {imageUrl && (
          <div className="h-32 bg-gray-100">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
