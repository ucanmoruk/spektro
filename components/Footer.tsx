export default function Footer() {
  return (
    <footer className="bg-slate-950 pb-10 pt-20 text-slate-300">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-12 lg:px-10">
        <div className="min-w-0">
          <h3 className="break-words text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
            SPEKTROTEK
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Analitik laboratuvar teknolojileri, validasyon ve metod geliştirme süreçlerinde uçtan uca mühendislik çözümleri sunuyoruz.
          </p>
        </div>
        <div className="min-w-0">
          <h4 className="break-words text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
            Kurumsal
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Hakkımızda</li>
            <li>Vizyon</li>
            <li>Markalarımız</li>
            <li>Referanslar</li>
          </ul>
        </div>
        <div className="min-w-0">
          <h4 className="break-words text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
            Çözümler
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Modüler Sistemler</li>
            <li>Metot Geliştirme</li>
            <li>Validasyon</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="min-w-0">
          <h4 className="break-words text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
            İletişim
          </h4>
          <p className="mt-4 break-words text-sm">info@spektrotek.com</p>
          <p className="break-words text-sm">+90 212 000 00 00</p>
          <p className="mt-6 text-xs text-slate-500">© 2026 Spektrotek. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
