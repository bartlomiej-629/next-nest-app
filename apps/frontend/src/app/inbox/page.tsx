"use client";

import { useEffect, useState } from "react";
import { getUnassignedUsers } from "@/services/UserService";
import { User } from "@/mock-data/usersData";
import PageTitle from "@components/page-title";
import InboxSidebar from "@components/inbox-sidebar";
import UserList from "@components/user-list";
import ChatArea from "@components/chat-area";
import ProfileDetail from "@components/profile-detail";

export default function Inbox() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUnassignedUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleSelectUser = (selUser: User) => {
    setSelectedUser(selUser);
  };

  return (
    <>
      <PageTitle title="Inbox" />
      <div className="flex h-screen">
        <div className="w-1/6 border-r border-gray-200 pt-3">
          <InboxSidebar />
        </div>
        <div className="w-1/5 border-r border-gray-200 text-xs">
          <UserList users={users} handleSelectUser={handleSelectUser} />
        </div>

        <div className="flex h-screen w-2/5 flex-col text-xs">
          <ChatArea chatId={selectedUser ? selectedUser.chatId : 1} />
        </div>

        <div className="w-1/5 border-l border-gray-200 text-xs">
          <ProfileDetail />
        </div>
      </div>
    </>
  );
}
