import { contactData } from '@/data/contactData';

export default function Contact(): React.ReactNode {
  return (
    <section id="contact" className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">Contact</h2>
        <p className="mb-8 text-lg text-slate-600">
          Let&apos;s connect and build something great together!
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href={contactData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            GitHub
          </a>
          <a
            href={`mailto:${contactData.email}`}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
