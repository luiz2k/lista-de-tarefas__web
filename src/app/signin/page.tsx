import SignIn from '@/components/SignIn/SignIn';
import Image from 'next/image';

import SignInImage from '../../../public/signin-img.svg';

export default function SignInPage() {
  return (
    <>
      <Image src={SignInImage} alt="Logo" className="mx-auto" priority />
      <SignIn />
    </>
  );
}
