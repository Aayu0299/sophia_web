"use client";

import React, { useRef } from "react";
import { Icons } from "@/app/utils/Icons";
import { TEXT } from "@/app/utils/Text";
import { images } from "@/app/utils/Images";
import Image from "next/image";

export const CommonIDPhotoUpload = ({ label, image, setImage }) => {
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage({
        file,
        preview: imageUrl,
      });
    }
  };

  // Remove image preview
  const handleRemove = (e) => {
    if (e && e.stopPropagation) e.stopPropagation(); // safe check
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      {label && (
        <label className="font-medium text-[20px] text-(--black)">
          {label}
        </label>
      )}

      {/* Upload Box */}
      <div
        className={`relative flex items-center justify-center bg-white rounded-xl [box-shadow:var(--boxshadow-input)] h-[206px]
  [box-shadow:var(--boxshadow-input)] cursor-pointer overflow-hidden`}
        onClick={() => !image && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {!image ? (
          <div className="flex flex-col items-center justify-center w-full px-3">
            <Image
              src={images.uploadIcon}
              alt="Upload icon"
              width={60}
              height={60}
              priority
              className="w-[60px] h-[60px] cursor-pointer mx-auto"
            />
            <span className="font-medium text-[16px] text-(--darkgray) text-center mt-2">
              {TEXT.SELECT_ID}
            </span>
          </div>
        ) : (
          <div
            className="relative w-[120px] h-[120px] [box-shadow:var(--boxshadow-input)] rounded-xl"
            onClick={() => fileInputRef.current?.click()} // image click se input open
          >
            <Image
              src={image.preview}
              alt="Preview"
              fill
              className="rounded-md object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
            >
              <Icons.ImCross
                size={14}
                className="text-(--redshade) cursor-pointer"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
