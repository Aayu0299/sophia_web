"use client";

import React, { useRef } from "react";
import { Icons } from "@/app/utils/Icons";
import { TEXT } from "@/app/utils/Text";
import { images } from "@/app/utils/Images";
import Image from "next/image";

export const CommonIDPhotoUpload = ({ label, image, setImage, sublabel }) => {
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
          {sublabel && (
            <sub className="text-(--darkgray) text-[11px]">({sublabel})</sub>
          )}
        </label>
      )}

      {/* Upload Box */}
      <div
        className={`relative  bg-white rounded-xl [box-shadow:var(--boxshadow-input)] flex justify-center flex-col h-auto min-h-[206px]
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
          <div className="flex flex-col items-center justify-center w-full px-3 mt-10">
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
            className="relative aspect-[3/1] m-5 [box-shadow:var(--boxshadow-input)] rounded-xl overflow-hidden cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={image.preview}
              alt="Preview"
              fill
              className="object-cover object-center"
            />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-white rounded-xl p-1 shadow hover:bg-gray-100 transition"
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
