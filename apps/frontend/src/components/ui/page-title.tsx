"use client";

export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="border-ink-200 h-[70px] border-b px-9 pb-[23px] pt-6">
      <span className="text-xl font-semibold">{title}</span>
    </div>
  );
}
