"use client";

import { useFormState } from "react-dom";
import { submitForm } from "./actions";

function ErrorMessage({ messages }: { messages?: string[] }) {
	if (!messages) return null;

	return (
		<div className="text-red-500 text-sm mt-1">
			{messages.map((message, i) => (
				<p key={i}>{message}</p>
			))}
		</div>
	);
}

export default function ContactForm() {
	const [state, formAction] = useFormState(submitForm, {});

	return (
		<form action={formAction} className="space-y-6">
			{state.message && (
				<div
					className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
					role="alert"
				>
					{state.message}
				</div>
			)}

			<div>
				<label htmlFor="name" className="block text-sm font-medium mb-2">
					お名前
				</label>
				<input
					type="text"
					id="name"
					name="name"
					className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					required
				/>
				<ErrorMessage messages={state.errors?.name} />
			</div>

			<div>
				<label htmlFor="email" className="block text-sm font-medium mb-2">
					メールアドレス
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					required
				/>
				<ErrorMessage messages={state.errors?.email} />
			</div>

			<div>
				<label htmlFor="message" className="block text-sm font-medium mb-2">
					メッセージ
				</label>
				<textarea
					id="message"
					name="message"
					rows={5}
					className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					required
				/>
				<ErrorMessage messages={state.errors?.message} />
			</div>

			<button
				type="submit"
				className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
			>
				送信
			</button>
		</form>
	);
}
