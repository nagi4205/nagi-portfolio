"use client";

import React from "react";
import TopNavigation from "@/components/top/TopNavigation";

export default function Dashboard() {
	return (
		<div className="h-screen overflow-y-auto snap-y snap-mandatory">
			<TopNavigation />

			<section className="w-screen h-screen snap-start flex flex-col items-center justify-center p-24">
				<div className="text-2xl font-bold">Nagi</div>
				<p className="mt-4 text-gray-600">↓ Scroll Down ↓</p>
			</section>
			<section className="w-screen h-screen snap-start flex flex-col items-center justify-center p-24">
				<div className="text-2xl">Loading next page...</div>
			</section>
		</div>
	);
}
