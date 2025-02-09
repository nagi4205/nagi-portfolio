import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, active: true }, [
		Autoplay(),
	]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	useEffect(() => {
		if (emblaApi) {
			console.log(emblaApi.slideNodes()); // Access API
		}
	}, [emblaApi]);

	return (
		<div className="overflow-hidden w-full h-full" ref={emblaRef}>
			<div className="flex">
				<div className="flex-[0_0_33.3%]">Slide 1</div>
				<div className="flex-[0_0_33.3%]">Slide 2</div>
				<div className="flex-[0_0_33.3%]">Slide 3</div>
				<div className="flex-[0_0_33.3%]">Slide 4</div>
				<div className="flex-[0_0_33.3%]">Slide 5</div>
				<div className="flex-[0_0_33.3%]">Slide 6</div>
				<div className="flex-[0_0_33.3%]">Slide 7</div>
			</div>
			<button className="embla__prev" onClick={scrollPrev}>
        Prev
      </button>
			<button className="embla__next" onClick={scrollNext}>
				Next
			</button>
		</div>
	);
}
