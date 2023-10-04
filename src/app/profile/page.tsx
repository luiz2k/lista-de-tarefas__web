'use client';

import ChangeUsername from '@/components/ChangeUsername/ChangeUsername';
import ChangeEmail from '@/components/ChangeEmail/ChangeEmail';
import ChangePassword from '@/components/ChangePassword/ChangePassword';
import DeleteAccount from '@/components/DeleteAccount/DeleteAccount';

export default function ProfilePage() {
  return (
    <section>
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-md flex-col gap-1">
          <div>
            <div className="h-16">
              <h2 className="text-center text-2xl font-bold">SEU PERFIL</h2>
            </div>
          </div>

          <ChangeUsername />

          <hr className="my-3 border-color2" />

          <ChangeEmail />

          <hr className="my-3 border-color2" />

          <ChangePassword />

          <hr className="my-3 border-color2" />

          <DeleteAccount />
        </div>
      </div>
    </section>
  );
}
