import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUser from "@/store/userStore";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type updateUserInfoProps = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  avatar: string | null | File;
};

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState<File | null | string>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setEmail(user.email);
    }
  }, [user]);

  async function uploadProfilePicture() {
    if (!profileImage) {
      setImageError("profile image is required");
      return null;
    }
    const formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", "antooo");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhetijarg/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }

      return data.secure_url;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setImageError("Failed to upload image");
      return null;
    }
  }

  async function updateUserInfo(userInfo: updateUserInfoProps) {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.updatededUser;
    } catch (error) {
      console.error("error updating user information", error);
      throw error;
    }
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-user-info"],
    mutationFn: updateUserInfo,
    onSuccess: () => {
      toast.success("you successfully updated your profile");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setMessage(error.message || "Something went wrong");
      toast.error("error can't update profile");
    },
  });

  async function handleUpdatingUserInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setImageError("");

    setIsUploading(true);
    const imageUrl = await uploadProfilePicture();
    setIsUploading(false);
    if (!imageUrl) return;

    const userInfo = {
      firstName,
      lastName,
      email,
      userName,
      avatar: imageUrl,
    };
    mutate(userInfo);
  }

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
        <Card className="w-full border-none shadow-md">
          <CardHeader>
            <CardTitle className="md:text-xl text-base font-semibold work-sans tracking-wide">
              Account Management
            </CardTitle>
            <CardDescription className="text-[#374151] text-sm md:text-base">
              You can update your profile information here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="update-user" onSubmit={handleUpdatingUserInfo}>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    id="firstname"
                    type="text"
                    className="focus:ring-blue-200"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    type="text"
                    className="focus:ring-blue-200"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    className="focus:ring-blue-200"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    className="focus:ring-blue-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="profileImage">Profile Image</Label>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="/image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfileImage(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          {imageError && (
            <p className="text-red-500 font-medium text-center">{imageError}</p>
          )}
          <CardFooter>
            <Button
              className="w-full bg-blue-700 text-white hover:bg-blue-500"
              variant="outline"
              form="update-user"
              disabled={isPending || isUploading}
            >
              {isUploading
                ? "Uploading Image..."
                : isPending
                ? "Updating Information..."
                : "Update Info"}
            </Button>
            {message && <p>{message}</p>}
          </CardFooter>
        </Card>

        <Card className="w-full border-none shadow-md">
          <CardHeader>
            <CardTitle className="md:text-xl text-base font-semibold work-sans tracking-wide">
              Update Password
            </CardTitle>
            <CardDescription className="text-[#374151] text-sm md:text-base">
              You can change your password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="focus:ring-blue-200"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              className="w-full bg-blue-700 text-white hover:bg-blue-500"
              variant="outline"
            >
              Update Password
            </Button>
            <Button
              className="w-full bg-red-600 text-white hover:bg-red-500"
              variant="outline"
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
