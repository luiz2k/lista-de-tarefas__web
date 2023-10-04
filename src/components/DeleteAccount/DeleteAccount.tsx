import { useState } from 'react';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';

export default function DeleteAccounte() {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <article className="flex items-center justify-end">
        <button
          onClick={() => setModal((prev) => !prev)}
          className="cursor-pointer text-lg text-red-500 hover:underline"
        >
          Apagar conta
        </button>
      </article>

      {modal && <DeleteAccountModal setModal={setModal} />}
    </>
  );
}
