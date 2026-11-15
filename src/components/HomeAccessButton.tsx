'use client';

import { KeyRound } from 'lucide-react';
import WholesaleAccess from '@/src/components/WholesaleAccess';
import { OPEN_CLIENT_LOGIN } from '@/src/components/SignInNotice';
import { useClient } from '@/src/context/ClientContext';

/**
 * Centered "Acceso mayorista" button of the homepage top nav (key icon + text inside the button). It opens the client
 * login dialog; once signed in, the usual account pill (name, favorites, sign out) takes its place.
 * `noModal`: another copy on the page owns the login dialog.
 */
export default function HomeAccessButton({ onDark, noModal }: { onDark?: boolean; noModal?: boolean }) {
  const { client, level } = useClient();
  if (client && level) return <WholesaleAccess noModal={noModal} glass={onDark} />;
  return (
    <>
      {/* Not shown: it only owns the login dialog (rendered in a portal) that the button opens. */}
      {!noModal && <div className="hidden"><WholesaleAccess /></div>}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_CLIENT_LOGIN))}
        className={`inline-flex items-center gap-2 rounded-full px-5 h-10 text-sm font-semibold shadow-lg hover:scale-[1.03] active:scale-95 transition ${
          onDark ? 'bg-white text-[#450a0a]' : 'bg-[#450a0a] text-white hover:bg-[#5a1212]'
        }`}
      >
        <KeyRound className="w-4 h-4" aria-hidden="true" />
        <span>Acceso mayorista</span>
      </button>
    </>
  );
}
