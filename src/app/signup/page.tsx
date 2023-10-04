import SignUp from '@/components/SignUp/SignUp';
import Image from 'next/image';
import SignUpImage from '../../../public/signup-img.svg';
export default function SignUpPage() {
  return (
    <>
      <Image src={SignUpImage} alt="Logo" className="mx-auto" priority />
      <SignUp />
    </>
  );
}
