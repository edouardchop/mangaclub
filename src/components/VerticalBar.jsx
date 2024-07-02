import Link from "next/link";
import { FaWindowClose } from "react-icons/fa";

export default function VerticalBar({ onClick, user, isAuthenticated }) {
  return (
    <aside className="flex-col w-full md:w-80 fixed right-0 top-0 h-screen" style={{ backgroundColor: '#D7C412' }}>
      <div className="flex">
        <button onClick={onClick} className="pb-7 md:ps-4 ps-12 pt-3">
          <FaWindowClose size={70} />
        </button>
      </div>
      <div className="flex flex-col">
        {isAuthenticated ? (
          <>
            <Link href="/mySpace" className="border-2 p-7 text-center">Vos créations</Link>
            {user?.role === 'admin' && (
              <>
                <Link href="/backOffice/manga" className="border-2 p-7 text-center">BackOffice manga</Link>
                <Link href="/backOffice/category" className="border-2 p-7 text-center">BackOffice category</Link>
                <Link href="/backOffice/user" className="border-2 p-7 text-center">BackOffice user</Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link href="/signin" className="border-2 p-7 text-center">Connexion</Link>
            <Link href="/signup" className="border-2 p-7 text-center">Inscription</Link>
          </>
        )}
      </div>
    </aside>
  );
}
