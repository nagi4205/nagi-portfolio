import "../globals.css";
import Signature2 from "@/components/shared/Signature2";
export default function MinimalLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-screen h-screen overflow-hidden bg-black">
			<Signature2 />
			{children}
		</div>
	);
}
