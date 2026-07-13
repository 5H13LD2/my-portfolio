import type { User } from "firebase/auth";
import { LogOut, Send, Star } from "lucide-react";
import UserAvatar from "./UserAvatar";

type FeedbackFormProps = {
  authLoading: boolean;
  customOrganization: string;
  customUserType: string;
  error: string | null;
  message: string;
  organization: string;
  star: number;
  submitting: boolean;
  success: boolean;
  userType: string;
  user: User | null;
  onCustomOrganizationChange: (customOrganization: string) => void;
  onCustomUserTypeChange: (customUserType: string) => void;
  onMessageChange: (message: string) => void;
  onOrganizationChange: (organization: string) => void;
  onSignIn: () => void;
  onSignOut: () => void;
  onStarChange: (star: number) => void;
  onUserTypeChange: (userType: string) => void;
  onSubmit: () => void;
};

export default function FeedbackForm({
  authLoading,
  customOrganization,
  customUserType,
  error,
  message,
  organization,
  star,
  submitting,
  success,
  userType,
  user,
  onCustomOrganizationChange,
  onCustomUserTypeChange,
  onMessageChange,
  onOrganizationChange,
  onSignIn,
  onSignOut,
  onStarChange,
  onUserTypeChange,
  onSubmit,
}: FeedbackFormProps) {
  if (!user) {
    return (
      <div className="border border-[#1e1e1e] bg-[#0d0d0d] rounded-2xl p-8 sm:p-10 text-center">
        <p className="text-sm text-[#999] mb-5">Sign in with your Google account to leave your feedback.</p>
        <button
          onClick={onSignIn}
          disabled={authLoading}
          className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#f5f5f5] text-[#111] rounded-lg text-sm font-medium hover:bg-white disabled:opacity-60 transition-colors"
        >
          <span className="text-lg font-semibold">G</span>
          {authLoading ? "Checking account..." : "Sign in with Google"}
        </button>
        {error && <p className="text-xs text-red-400 mt-4">{error}</p>}
      </div>
    );
  }

  return (
    <div className="border border-[#1e1e1e] bg-[#0d0d0d] rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar name={user.displayName ?? user.email} photoURL={user.photoURL} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#f0f0f0] truncate">{user.displayName ?? "Google user"}</p>
            <p className="text-xs text-[#777] truncate">{user.email}</p>
          </div>
        </div>
        <button onClick={onSignOut} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#2a2a2a] rounded-md text-xs text-[#888] hover:border-[#444] hover:text-[#e5e5e5] transition-colors w-fit">
          <LogOut size={12} />
          Sign out
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-xs text-[#888] mb-2">Rating</label>
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            return (
              <button key={value} onClick={() => onStarChange(value)} className="text-[#facc15] hover:scale-110 transition-transform" aria-label={`${value} stars`}>
                <Star size={22} fill={value <= star ? "currentColor" : "none"} className={value <= star ? "text-[#facc15]" : "text-[#333]"} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="feedback-user-type" className="block text-xs text-[#888] mb-2">Your role / relationship</label>
        <select
          id="feedback-user-type"
          value={userType}
          onChange={(event) => onUserTypeChange(event.target.value)}
          className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#444] transition-colors"
        >
          <option value="">Choose your relationship</option>
          <option value="Client">Client</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Coworker">Coworker</option>
          <option value="Classmate">Classmate</option>
          <option value="Co-intern">Co-intern</option>
          <option value="Others">Others</option>
        </select>
        {userType === "Others" && (
          <input
            type="text"
            value={customUserType}
            onChange={(event) => onCustomUserTypeChange(event.target.value)}
            className="mt-2 w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#444] transition-colors"
            placeholder="Type your relationship (optional)"
            maxLength={50}
          />
        )}
        <p className="mt-1.5 text-[11px] text-[#666]">No selection or blank custom value will use Others.</p>
      </div>

      <div className="mb-4">
        <label htmlFor="feedback-organization" className="block text-xs text-[#888] mb-2">I am from</label>
        <select
          id="feedback-organization"
          value={organization}
          onChange={(event) => onOrganizationChange(event.target.value)}
          className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#444] transition-colors"
        >
          <option value="">Choose your organization or school</option>
          <option value="LICA Group of Companies - Gulong.ph">LICA Group of Companies - Gulong.ph</option>
          <option value="Simplevia Technologies Inc.">Simplevia Technologies Inc.</option>
          <option value="Nephila Web Technology Inc.">Nephila Web Technology Inc.</option>
          <option value="New Era University">New Era University</option>
          <option value="Others">Others</option>
        </select>
        {organization === "Others" && (
          <input
            type="text"
            value={customOrganization}
            onChange={(event) => onCustomOrganizationChange(event.target.value)}
            className="mt-2 w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#444] transition-colors"
            placeholder="Type your organization or school (optional)"
            maxLength={100}
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-xs text-[#888] mb-2">Feedback</label>
        <textarea
          value={message}
          onChange={(event) => onMessageChange(event.target.value)}
          className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e5e5e5] focus:outline-none focus:border-[#444] transition-colors resize-y min-h-[110px]"
          placeholder="Share your experience..."
          maxLength={800}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          {success && <p className="text-xs text-[#4ade80]">Feedback submitted. Thank you!</p>}
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white font-medium transition-colors disabled:opacity-60"
        >
          <Send size={14} />
          {submitting ? "Submitting..." : "Submit feedback"}
        </button>
      </div>
    </div>
  );
}
