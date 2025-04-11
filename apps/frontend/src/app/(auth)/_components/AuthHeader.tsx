interface AuthHeaderProps {
  header: string;
  subHeader: string;
}

export default function AuthHeader({ header, subHeader }: AuthHeaderProps) {
  return (
    <div className="flex h-full w-[45%] justify-center bg-gray-100">
      <div className="flex h-full w-offset_width flex-col">
        <div className="flex h-header_height w-full items-center">
          <h1 className="text-[35px] font-[800]">HiJack</h1>
        </div>

        <div className="flex w-full flex-grow flex-col justify-center">
          <h1 className="text-[60px] font-[900] leading-[70px]">{header}</h1>
          <p className="text-[18px] font-[400] text-gray-600">{subHeader}</p>
        </div>
      </div>
    </div>
  );
}
