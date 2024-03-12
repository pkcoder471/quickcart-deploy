import Image from "next/image";


export default function Home() {
  return (
    <div className="">
      <div className="banner">
        <Image alt="banner" src='/banner.jpg' width={1600} height={328}/>
      </div>
    </div>
  );
}
