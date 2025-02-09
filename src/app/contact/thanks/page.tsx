import Link from "next/link";

export default function Thanks() {
	return (
		<main className="min-h-screen p-8">
			<div className="max-w-2xl mx-auto text-center">
				<h1 className="text-4xl font-bold mb-4">送信完了</h1>
				<p className="mb-8">
					お問い合わせありがとうございます。
					<br />
					内容を確認次第、ご連絡させていただきます。
				</p>
				<Link
					href="/"
					className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
				>
					トップページへ戻る
				</Link>
			</div>
		</main>
	);
}
