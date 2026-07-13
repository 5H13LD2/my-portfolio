import { CalendarDays, Star } from "lucide-react";
import type { Feedback } from "../types/feedback";
import UserAvatar from "./UserAvatar";

type FeedbackCardProps = {
  feedback: Feedback;
};

const formatFeedbackDate = (date: Date) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <article className="border border-[#1e1e1e] bg-[#0d0d0d] rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar name={feedback.name} photoURL={feedback.photoURL} />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[#f0f0f0] truncate">{feedback.name}</h3>
            <p className="text-[11px] text-[#888]">{feedback.userType}</p>
            <p className="text-[11px] text-[#aaa] truncate">{feedback.email}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="inline-flex items-center gap-1 text-[11px] text-[#555] mb-1.5">
            <CalendarDays size={12} />
            {formatFeedbackDate(feedback.date)}
          </div>
          <div className="flex gap-0.5 justify-end text-[#facc15]" aria-label={`${feedback.star} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} size={15} fill={index < feedback.star ? "currentColor" : "none"} className={index < feedback.star ? "text-[#facc15]" : "text-[#333]"} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-[#cfcfcf] leading-[1.75]">{feedback.message}</p>
    </article>
  );
}
