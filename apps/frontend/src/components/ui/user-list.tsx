"use client";

import { User } from "@/mock-data/usersData";
import {
  IconChevronDown, 
  IconFilter, 
  IconArrowUp 
} from "@tabler/icons-react";
import Image from "next/image";

type BadgeProps = {
  count: number;
  className?: string;
};

function Badge({ count, className }: BadgeProps) {
  return (
    <span
      className={`bg-slate-200 flex h-5 w-5 items-center justify-center rounded-full text-xs text-black ${className}`}
    >
      {count}
    </span>
  );
}

interface UserListProps {
  users: User[],
  handleSelectUser: (selUser: User) => void,
}

export default function UserList(props: UserListProps) {
  
  const {users, handleSelectUser} = props;

  return (
    <div className="p-2 max-w-md mx-auto">
      <div className="flex items-center justify-between h-[50px] border-ink-200 border-b mb-3">
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <div>
            <div className="font-bold">Unassigned</div>
            <div className="flex items-center">
              <div>Open</div>
              <Badge count={users.length} />
              <IconChevronDown size={16} className="ml-2 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <IconFilter size={18} className="text-gray-500 border border-slate-400 rounded p-1" />
          <IconArrowUp size={18} className="text-gray-500 border border-slate-400 rounded p-1" />
        </div>
      </div>

      <div className="space-y-1">
        {users.map((user) => (
            <div className="flex items-center justify-betweenbg-gray-100 rounded-lg pb-2 hover:bg-gray-400" onClick={() => handleSelectUser(user)}>
            <input type="checkbox" className="mr-2" />
            <div className="flex h-[37px] items-center gap-3">
              <Image
                src={user.avatarUrl}
                width={32}
                height={32}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-nowrap text-xs font-bold">
                    {user.name}
                </p>
                <p className="line-clamp-1 text-[10px]">
                    {user.lastMessage}
                </p>
              </div>
            </div>
            <p className="text-[10px]">{user.lastMessageTime}</p>
          </div>
          )
        )}
      </div>
    </div>
  );
}
