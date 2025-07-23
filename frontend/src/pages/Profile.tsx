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
import React, { useState, useEffect } from "react";
import { BASE_URL } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useUserQuery } from "@/hooks/useUserQuery";

type updateUserInfoProps = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  avatar: string | null | File;
};

type updatePasswordProps = {
  currentPassword: string;
  newPassword: string;
};

async function updatePassword(password: updatePasswordProps) {
  try {
    const response = await fetch(`${BASE_URL}/user/password`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.log("failed to update password", error);
    throw error;
  }
}

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState<File | null | string>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { data: user } = useUserQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setEmail(user.email);
      setProfileImage(user.avatar ?? null);
    }
  }, [user]);

  async function uploadProfilePicture() {
    if (!(profileImage instanceof File)) {
      return typeof profileImage === "string" ? profileImage : null;
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
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("you successfully updated your profile");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setMessage(error.message || "Something went wrong");
      toast.error("error can't update profile");
    },
  });

  const { mutate: mutateUpdatePassword, isPending: isPendingPassword } =
    useMutation({
      mutationKey: ["update-user-password"],
      mutationFn: updatePassword,
      onSuccess: () => {
        setCurrentPassword("");
        setNewPassword("");
        toast.success("you have successfully updated your password");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        setPasswordError(error.message);
        toast.error("error, can't update your password");
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

  function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordError("");
    const password = { currentPassword, newPassword };
    mutateUpdatePassword(password);
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
              className="w-full bg-blue-700 text-white hover:bg-blue-500 cursor-pointer"
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
            {message && (
              <p className="text-red-500 font-medium text-center">{message}</p>
            )}
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
            <form id="update-password" onSubmit={handleUpdatePassword}>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="focus:ring-blue-200"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="focus:ring-blue-200"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          {passwordError && (
            <p className="text-red-500 font-medium text-center">
              {passwordError}
            </p>
          )}
          <CardFooter className="flex flex-col gap-3">
            <Button
              className="w-full bg-blue-700 text-white hover:bg-blue-500"
              variant="outline"
              form="update-password"
              disabled={isPendingPassword}
            >
              {isPendingPassword ? "Updating password..." : "Update Password"}
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
