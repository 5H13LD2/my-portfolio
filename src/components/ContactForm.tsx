import { Send } from "lucide-react";
import type { CreateContactInput } from "../types/contact";

type ContactFormProps = {
  error: string | null;
  form: CreateContactInput;
  submitting: boolean;
  success: boolean;
  onSubmit: () => void;
  onUpdateField: <Field extends keyof CreateContactInput>(
    field: Field,
    value: CreateContactInput[Field],
  ) => void;
};

export default function ContactForm({
  error,
  form,
  submitting,
  success,
  onSubmit,
  onUpdateField,
}: ContactFormProps) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#e0e0e0] mb-2">Name</label>
          <input
            value={form.name}
            onChange={(event) => onUpdateField("name", event.target.value)}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#555] transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs text-[#e0e0e0] mb-2">Email</label>
          <input
            value={form.gmail}
            onChange={(event) => onUpdateField("gmail", event.target.value)}
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#555] transition-colors"
            placeholder="your@email.com"
            type="email"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#e0e0e0] mb-2">Subject</label>
        <input
          value={form.subject}
          onChange={(event) => onUpdateField("subject", event.target.value)}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#555] transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label className="block text-xs text-[#e0e0e0] mb-2">Message</label>
        <textarea
          value={form.message}
          onChange={(event) => onUpdateField("message", event.target.value)}
          className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#555] transition-colors resize-y min-h-[136px]"
          placeholder="Tell me about your project..."
          maxLength={1200}
        />
      </div>

      <div className="space-y-3">
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#e5e5e5] hover:bg-white rounded-lg text-sm text-[#0a0a0a] font-medium transition-colors disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send Message"}
          <Send size={15} />
        </button>
        {success && <p className="text-xs text-[#4ade80] text-center">Message sent. I will get back to you soon.</p>}
        {error && <p className="text-xs text-red-400 text-center">{error}</p>}
      </div>
    </div>
  );
}
