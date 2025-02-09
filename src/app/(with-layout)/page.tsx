"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import TopNavigation from "@/components/top/TopNavigation";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const ContactForm = dynamic(() => import("@/components/top/ContactForm"), {
	ssr: false,
});

type SectionId = 0 | 1 | 2;

type Section = {
	id: SectionId;
	title: string;
	backgroundColor: string;
	content: React.ReactNode;
};

/**
 * 画面に表示するセクションの定義
 * - id: セクションの一意の識別子（0, 1, 2）
 * - title: セクションのタイトル
 * - backgroundColor: 背景色のTailwindクラス
 * - content: 表示するコンテンツ
 */
const sections: Section[] = [
	{
		id: 0,
		title: "Section 1",
		backgroundColor: "bg-red-500",
		content: (
			<div className="flex items-end justify-end h-full p-4 md:p-8">
				{/* <div className="p-8"> */}
				<h1 className="text-4xl">Section 1</h1>
				{/* </div> */}
			</div>
		),
	},
	{
		id: 1,
		title: "Section 2",
		backgroundColor: "bg-blue-500",
		content: (
			<div className="flex items-end justify-end h-full p-4 md:p-8">
				{/* <div className="p-8"> */}

				<h1 className="text-4xl">Section 2</h1>
				{/* </div> */}
			</div>
		),
	},
	{
		id: 2,
		title: "Section 3",
		backgroundColor: "bg-white",
		content: (
			<div className="flex items-end justify-end h-full p-4 md:p-8">
				{/* <div className="p-8"> */}
				<ContactForm />
				{/* </div> */}
			</div>
		),
	},
];

const ScrollSection = () => {
	/**
	 * State管理
	 * - activeSection: 現在表示中のセクションのインデックス
	 * - scrollDirection: スクロールの方向（"up" または "down"）
	 * - containerRef: スクロールを検知するコンテナのref
	 * - isScrollingRef: スクロールアニメーション中かどうかのフラグ
	 */
	const [activeSection, setActiveSection] = useState<number>(0);
	const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
	const containerRef = React.useRef<HTMLDivElement>(null);
	const isScrollingRef = React.useRef<boolean>(false);

	/**
	 * セクション切り替え処理
	 * @param newIndex 切り替え先のセクションインデックス
	 * @param direction スクロール方向（"up" または "down"）
	 *
	 * 1. バリデーション（範囲外のインデックスやスクロール中は処理しない）
	 * 2. スクロール中フラグを立てる
	 * 3. 新しいセクションとスクロール方向を設定
	 * 4. アニメーション完了後（2000ms）にスクロール中フラグを解除
	 */
	const handleSectionChange = (newIndex: number, direction: "up" | "down") => {
		console.log("handleSectionChange", newIndex, direction);
		const container = containerRef.current;
		if (!container || isScrollingRef.current) return;
		if (newIndex < 0 || newIndex >= sections.length) return;

		isScrollingRef.current = true;
		setActiveSection(newIndex);
		setScrollDirection(direction);

		setTimeout(() => {
			isScrollingRef.current = false;
		}, 2000);
	};

	/**
	 * マウスホイールイベントの制御
	 *
	 * 1. スクロールイベントの発火頻度を制限（50ms間隔）
	 * 2. スクロール方向を検出
	 * 3. 方向に応じて次のセクションまたは前のセクションに切り替え
	 * 4. コンポーネントのアンマウント時にイベントリスナーを解除
	 */
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let lastScrollTime = 0;
		const SCROLL_COOLDOWN = 50; // スクロール間隔（ミリ秒）

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();
			const now = Date.now();
			if (isScrollingRef.current || now - lastScrollTime < SCROLL_COOLDOWN)
				return;

			lastScrollTime = now;
			const isScrollingDown = e.deltaY > 0;
			console.log("isScrollingDown", isScrollingDown);

			if (isScrollingDown && activeSection < sections.length - 1) {
				handleSectionChange(activeSection + 1, "down");
			} else if (!isScrollingDown && activeSection > 0) {
				handleSectionChange(activeSection - 1, "up");
			}
		};

		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => container.removeEventListener("wheel", handleWheel);
	}, [activeSection]);

	/**
	 * レンダリング
	 *
	 * 1. TopNavigationを表示
	 * 2. AnimatePresenceで現在のセクションのみを表示
	 * 3. アクティブなセクションのみをAnimatedSectionでラップしてアニメーション
	 */
	return (
		<div className="overflow-x-hidden">
			<TopNavigation />
			<div ref={containerRef} className="h-screen overflow-hidden">
				<AnimatePresence mode="wait" initial={false}>
					{sections.map(
						(section) =>
							activeSection === section.id && (
								<AnimatedSection
									key={section.id}
									direction={scrollDirection}
									className={`h-screen ${section.backgroundColor} opacity-80`}
								>
									{section.content}
								</AnimatedSection>
							),
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default dynamic(() => Promise.resolve(ScrollSection), {
	ssr: false,
});
