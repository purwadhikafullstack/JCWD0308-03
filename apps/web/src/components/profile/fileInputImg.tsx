"use client"
import Wrapper from "@/components/wrapper";
import { useRef, useState } from "react";
import Cookies from "js-cookie";

export default function ProfilePage() {
    const imageRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const handleChange = () => {
        if (imageRef.current && imageRef.current.files) {
            const file = imageRef.current.files[0];

            // Validation: Check file size (max 1MB) and type
            if (file.size > 1048576) {
                setError("File size must be less than 1MB");
                setImage(null);
                return;
            }
            if (!["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)) {
                setError("File type must be .jpg, .jpeg, .png, or .gif");
                setImage(null);
                return;
            }

            setImage(file);
            setError(null);
        }
    };

    const handleUpload = async () => {
        try {
            const token = Cookies.get("token");
            const formData = new FormData();
            if (image) {
                formData.append("file", image);
            }

            const res = await fetch('http://localhost:8000/api/authors/image', {
                method: "PATCH",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            });
            const response = await res.json();

            if (response.status === 'ok') {
                alert('Image successfully uploaded');
            } else {
                throw new Error(response.message || "Unknown error occurred");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to upload image");
        }
    };

    return (
        <Wrapper>
            <div className="flex flex-col items-center">
                <input 
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    onChange={handleChange}
                    type="file"
                    ref={imageRef}
                    className="w-20 h-8 rounded-full bg-gray-200"
                />
                {/* {error && <p className="text-red-500">{error}</p>}
                <button 
                    onClick={handleUpload}
                    className="bg-orange-400 p-1.5"
                    disabled={!image}
                >
                    Upload
                </button> */}
            </div>
        </Wrapper>
    );
}
