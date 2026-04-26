import { useState } from "react";

type UserAvatarProps = {
  name?: string | null;
  photoURL?: string | null;
};

const getInitial = (name?: string | null) => name?.trim().charAt(0).toUpperCase() || "?";

export default function UserAvatar({ name, photoURL }: UserAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(photoURL) && !imageFailed;

  return (
    <div className="w-10 h-10 rounded-full bg-[#1a2a40] border border-[#263a5c] overflow-hidden flex-shrink-0 flex items-center justify-center text-sm font-semibold text-[#7aadff]">
      {showImage ? (
        <img
          src={photoURL ?? undefined}
          alt={name ? `${name} avatar` : "User avatar"}
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
          className="block w-full h-full object-cover rounded-full"
        />
      ) : (
        <span>{getInitial(name)}</span>
      )}
    </div>
  );
}
