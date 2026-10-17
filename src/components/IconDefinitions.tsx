export function IconDefinitions() {
  return (
    <svg className="icon-defs" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <symbol id="pin" viewBox="0 0 24 24">
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2" />
        </symbol>
        <symbol id="calendar" viewBox="0 0 24 24">
          <rect x="3" y="5" width={18} height={16} rx="2" />
          <path d="M7 2v6m10-6v6M3 11h18" />
        </symbol>
        <symbol id="search" viewBox="0 0 24 24">
          <circle cx="10" cy="10" r="6.5" />
          <path d="m15 15 6 6" />
        </symbol>
        <symbol id="phone" viewBox="0 0 24 24">
          <rect x="6" y="2" width={12} height={20} rx="2" />
          <path d="M10 5h4m-4 14h4" />
        </symbol>
        <symbol id="eye" viewBox="0 0 24 24">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </symbol>
        <symbol id="chat" viewBox="0 0 24 24">
          <path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4Z" />
          <path d="M7 10h10m-10 4h7" />
        </symbol>
      </defs>
    </svg>
  );
}
