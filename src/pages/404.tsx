import Image from "next/image";
import Image_404 from './../assets/Error/Error_404.png';
import { useRouter } from "next/router";

export default function Errorpage() {

    const router=useRouter();

    const pageRedirect = () =>{
        router.push('/dashboard')
    }

  return (
    <div className="flex flex-col space-y-8 justify-center items-center h-screen bg-gray-100">
    <div className="text-blue-500 font-bold text-[3.0rem] italic">Error! You've landed on an error page.</div>
    <div>
      <Image src={Image_404} alt="Error Image" />
    </div>
    <div className="text-blue-500 font-bold text-[1.5rem] italic flex flex-row space-x-4">You can return to the <div className="ml-3 underline cursor-pointer text-blue-800" onClick={pageRedirect}> home page.</div></div>
  </div>
  
  );
}
