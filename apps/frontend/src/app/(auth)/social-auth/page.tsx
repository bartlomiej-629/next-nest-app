import AuthHeader from "../_components/AuthHeader";

export default function SocialAuth() {
  return (
    <div className="flex h-[100dvh] w-[100vw] ">
      <AuthHeader
        header="Sign Up to HiJack"
        subHeader="Sign Up to create an account."
      />

      <div className="flex h-full flex-grow justify-center">
        <div className="flex h-full w-offset_width flex-col items-center">
          <div className="flex w-[70%] flex-grow flex-col justify-center gap-[20px]"></div>
        </div>
      </div>
    </div>
  );
}
