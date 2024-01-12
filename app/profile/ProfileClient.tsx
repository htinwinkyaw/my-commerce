"use client";

import React, { useState } from "react";

import AddressList from "./AddressList";
import Button from "../_components/Button";
import { CurrentUserDetail } from "@/types/user";
import NullData from "../_components/NullData";
import PasswordChangeForm from "./PasswordChangeForm";
import ProfileInfo from "./ProfileInfo";

interface Props {
  user: CurrentUserDetail | null;
}

const ProfileClient: React.FC<Props> = ({ user }) => {
  const [changingPassword, setChangingPassword] = useState(false);

  if (!user) {
    return <NullData title="Oops! Something went wrong." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 text-slate-600">
      <div className="flex flex-col gap-4 p-4 border-r-[1.5px] border-slate-200">
        <ProfileInfo user={user} />

        <hr className="my-2" />

        {changingPassword ? (
          <PasswordChangeForm user={user} onChange={setChangingPassword} />
        ) : (
          <div>
            <Button
              label="Change Password"
              onClick={() => {
                setChangingPassword(true);
              }}
              outline
              small
            />
          </div>
        )}
      </div>

      <AddressList addresses={user.address} />
    </div>
  );
};

export default ProfileClient;
