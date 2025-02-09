import ContactForm from "./ContactForm";
// import { submitForm } from './actions'

export type State = {
	errors?: {
		name?: string[];
		email?: string[];
		message?: string[];
	};
	message?: string | null;
};

export default function Contact() {
	return (
		<main className="min-h-screen p-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold mb-8">Contact</h1>
				<ContactForm />
			</div>
		</main>
	);
}
