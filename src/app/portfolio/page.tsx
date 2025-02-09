"use client";

import React from "react";
import { EmblaCarousel } from "@/components/shared/EmblaCarousel";

function page() {
	return (
		<>
			<div>page</div>
			<div className="flex gap-4 items-center flex-col sm:flex-row bg-black/5 w-full h-[360px]">
				<EmblaCarousel />
			</div>
		</>
	);
}

export default page;
