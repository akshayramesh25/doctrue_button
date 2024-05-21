import React from "react";

interface ProfilePictureProps {
  username: string;
  className?: string;
  textStyle?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  username,
  className,
  textStyle,
}) => {
  const getRandomColor = (): string => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-red-500",
    ];
    const randomIndex = Math.floor(username.length % colors.length);
    return colors[randomIndex];
  };

  // Function to get the first letter of the first name and last name
  const getInitials = (name: string): string => {
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (
        parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase()
      );
    } else {
      return parts[0].charAt(0).toUpperCase();
    }
  };

  const initials = getInitials(username);
  const randomBackgroundColor = getRandomColor();

  return (
    <div
      className={`w-10 h-10 relative rounded-full flex items-center justify-center text-white ${randomBackgroundColor} ${
        className ? className : ""
      }`}
    >
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold pt-[2px] ${
          textStyle ? textStyle : ""
        }`}
      >
        {initials}
      </span>
    </div>
  );
};

export default ProfilePicture;
