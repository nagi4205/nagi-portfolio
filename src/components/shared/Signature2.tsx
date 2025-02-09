import React from "react";
import Link from "next/link";

function Signature2() {
	return (
		<div className="fixed top-8 left-8 z-50">
		<Link href="/">
			<h2 className="text-2xl text-white hover:opacity-50 transition-opacity">NAGI SOMEYA</h2>
		</Link>
				<p className="py-4 text-xs text-white mb-16">
        three.jsを勉強しています。こちらのページでは、three.jsのアウトプットをご覧いただけます。
				</p>
		</div>

	);
}

export default Signature2;
