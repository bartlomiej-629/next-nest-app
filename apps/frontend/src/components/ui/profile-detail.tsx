"use client";
import {
    IconDotsVertical,
    IconPhone,
    IconMail,
    IconCamera,
    IconMessageCircleBolt,
    IconMessageCircleCog,
    IconChevronDown,
    IconPlayerPause
} from "@tabler/icons-react";
import Image from "next/image";

export default function ProfileDetail() {
  return (
    <div className="p-2 max-w-md mx-auto">
      <div className="border-b border-gray-200 h-[50px] flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Miles</span>
        </div>
        <div className="flex items-center space-x-2">
          <IconDotsVertical size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-3">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <img
            src="/assets/user.png"
            alt="Avatar"
            className="w24 h-24 rounded-sm"
          />
        </div>
        <div className="flex items-center justify-center space-x-2 mb-3">
            <IconPhone size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
            <IconMail size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
            <IconCamera size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
            <IconMessageCircleBolt size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
            <IconMessageCircleCog size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-3">
        <div className="flex items-center space-x-2 justify-center mb-3">
          <div className="border border-slate-400 rounded p-1 flex items-center">
            <IconPlayerPause size={18} className="text-gray-500 pr-1" />
            <p>Pause Automation</p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">Notes</span>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex flex-col items-end">
            <div className="bg-yellow-200 rounded-lg p-2">
              I think it’s the wrong store he is visiting.
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 h-[50px] bg-gray-100 flex items-center justify-between mb-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Profile</span>
        </div>
        <div className="flex items-center space-x-2">
          <IconChevronDown size={20} className="text-gray-500 text-sm border border-slate-400 rounded p-1" />
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">Name</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span>Miles Han</span>
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">First Name</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span>Miles</span>
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">Last Name</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span>Han</span>
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">Last Name</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span>Han</span>
        </div>
      </div><div className="border-b border-gray-200 flex-row items-center justify-center mb-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">Phone Number</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="border rounded-full border-blue-300 text-blue-300">+49 178 111 222 9</span>
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">Email</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span  className="border rounded-full border-blue-300 text-blue-300">m.han@gmail.com</span>
        </div>
      </div>

      <div className="border-b border-gray-200 flex-row items-center justify-center mb-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">Owner</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <span>Jain</span>
        </div>
      </div>
    </div>
  );
}
