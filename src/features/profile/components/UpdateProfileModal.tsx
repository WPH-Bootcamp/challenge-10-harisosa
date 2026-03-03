"use client";

import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateProfile } from "@/features/profile/mutations/useUpdateProfile";

import { getInitial } from "@/utils";
import { useGetCurrentUser } from "@/hooks";


type Props = {
    open: boolean;
    onClose: () => void;
};

export const UpdateProfileModal: React.FC<Props> = ({
    open,
    onClose,
}) => {
    const updateProfile = useUpdateProfile();
    const fileRef = useRef<HTMLInputElement>(null);

    const { data: user } = useGetCurrentUser();
    const [name, setName] = useState(user?.name ?? '');
    const [headline, setHeadline] = useState(user?.headline ?? '');
    const [avatar, setAvatar] = useState<File | null>(null);

    const onSubmit = async () => {
        await updateProfile.mutateAsync({
            name,
            headline,
            avatar
        });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent
                className="w-112.75 max-w-none rounded-2xl px-6">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <div className="mt-4 flex justify-center">
                    <div className="relative">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.avatarUrl} />
                            <AvatarFallback>
                                {getInitial(user?.name ?? '')}
                            </AvatarFallback>
                        </Avatar>

                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-white shadow hover:bg-sky-700"
                        >
                            <Camera className="h-4 w-4" />
                        </button>

                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
                        />
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="space-y-1">
                        <Label>Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="space-y-1">
                        <Label>Profile Headline</Label>
                        <Input
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={onSubmit}
                        disabled={updateProfile.isPending}
                        className="mt-6 w-full rounded-full bg-sky-600 hover:bg-sky-700"
                    >
                        {updateProfile.isPending ? "Updating..." : "Update Profile"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
