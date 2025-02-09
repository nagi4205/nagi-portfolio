"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface State {
	errors?: {
		name?: string[];
		email?: string[];
		message?: string[];
	};
	message?: string | null;
}

export async function submitForm(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const errors: State["errors"] = {};

	const name = formData.get("name");
	const email = formData.get("email");
	const message = formData.get("message");

	if (!name || name.toString().length < 2) {
		errors.name = ["お名前は2文字以上で入力してください"];
	}

	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString())) {
		errors.email = ["有効なメールアドレスを入力してください"];
	}

	if (!message || message.toString().length < 10) {
		errors.message = ["メッセージは10文字以上で入力してください"];
	}

	if (Object.keys(errors).length > 0) {
		return { errors };
	}

	try {
		// ここで実際のメール送信処理を実装
		await new Promise((resolve) => setTimeout(resolve, 1000));

		revalidatePath("/contact");
		redirect("/contact/thanks");
	} catch (e) {
		console.error(e);
		return {
			message: "エラーが発生しました。しばらく待ってから再度お試しください。",
		};
	}
}
