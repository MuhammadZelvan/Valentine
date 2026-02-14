import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const paragraphs = [
  "Untuk Velove, mantanku,",
  "Aku menulis ini di Hari Valentine — hari kita, atau setidaknya dulu begitu. Jalanan penuh dengan mawar dan pasangan yang bergandengan tangan, dan di sini aku, sendirian dengan pikiranku dan hati yang penuh dengan kata-kata yang tak pernah kuucapkan.",
  "Hari ini adalah Valentine kedua kita yang tak akan pernah bisa dirayakan. Bahkan yang pertama pun tidak benar-benar kita rayakan — karena kebodohanku yang menganggap Valentine hanya tentang cokelat, bukan tentang kasih sayang yang seharusnya diungkapkan. Untuk itu, forgive me.",
  "Aku berterima kasih atas segala kasih sayang yang pernah kamu berikan kepadaku. Meskipun itu sudah lama berlalu, aku masih mengingatnya sampai sekarang. Setiap perhatian kecilmu, setiap usaha yang kamu lakukan, semuanya masih tersimpan rapi di ingatanku.",
  "Aku ingin kamu tahu bahwa aku tidak menyesali satu pun momen yang kita lalui. Tidak percakapan larut malam yang berlanjut hingga fajar, tidak perdebatan konyol tentang hal random, bahkan tidak air mata di akhir cerita. Setiap momen bersamamu mengajarkanku sesuatu tentang cinta, tentang diriku sendiri, tentang apa artinya benar-benar peduli pada seseorang.",
  "Kamu datang dalam hidupku seperti badai yang lembut — tak terduga, luar biasa, dan begitu indah. Kamu menunjukkan warna-warna yang tak pernah aku tahu sebelumnya. Kamu mengajarkanku bahwa kerentanan bukanlah kelemahan, bahwa mencintai seseorang berarti berani menunjukkan sisi rapuh dan percaya bahwa orang itu akan menjaganya dengan lembut.",
  "Mungkin terlihat aneh dengan keadaan kita yang seperti ini, tapi aku tetap memaksa menulis ini. Bukan untuk mengganggu hidupmu, bukan untuk membuka luka lama, tapi karena aku sungguh-sungguh ingin mengucapkan ini.",
  "Happy Valentine, my ex.",
  "Aku senang rasanya masih bisa mengucapkannya, meskipun tidak secara langsung. Kalau boleh jujur, aku ingin mengucapkannya di depanmu — dengan membawa bunga dan cokelat untukmu. Tapi keadaan tidak memungkinkan, dan mungkin memang tidak seharusnya begitu.",
  "Kita tidak sempurna. Kita membuat kesalahan. Kita mengatakan hal-hal yang tidak kita maksud. Ego kita kadang membangun dinding di antara kita. Dan aku sadar, ada banyak kesalahan dariku yang melukai hatimu.",
  "Aku benar-benar minta maaf atas hal-hal yang sudah aku lakukan, atas perlakuanku yang menyakitimu, termasuk saat itu… ketika aku memilih diam dan tidak menjawab pesanmu dengan jelas. Bukan karena aku tidak peduli. Justru karena aku takut perdebatan itu semakin menyakiti kita berdua. Ada hal yang tidak bisa aku jelaskan waktu itu. Dan mungkin suatu hari nanti aku akan mampu mengatakannya. Atau mungkin, jika memang tidak ada kesempatan, biarlah itu menjadi sesuatu yang kupendam sendiri.",
  "Setiap pertemuan memang selalu memiliki kemungkinan perpisahan. Aku membenci kenyataan itu. Tapi aku juga belajar bahwa tidak semua yang indah harus bertahan selamanya untuk menjadi berarti.",
  "Terima kasih untuk setiap tawa, setiap cerita, setiap perdebatan kecil yang kini terasa manis untuk diingat. Terima kasih telah menjadi bagian penting dalam hidupku. Kamu adalah salah satu bab terbaik & terakhir dalam ceritaku — bukan karena bagaimana itu berakhir, tapi karena semua yang ada di antaranya.",
  "Velove, aku berharap dengan kepergianku hidupmu kembali lebih tenang dan bahagia. Aku berdoa semoga kamu tidak pernah lagi mendapatkan seseorang sepertiku — tapi seseorang yang jauh lebih baik, lebih dewasa, dan lebih mampu menjagamu.",
  "Di mana pun kamu berada malam ini, aku harap kamu tersenyum.",
  "I always pray for you.",
  "Selamat Hari Valentine. Bukan sebagai kekasihmu, tapi sebagai seseorang yang akan selalu peduli.",
  "Forever grateful,\n Me"
];

const LetterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="font-handwritten text-warm-gold text-lg mb-3">Dari hatiku untuk hatimu</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Sebuah Surat
          </h2>
          <div className="w-24 h-px bg-primary/30 mx-auto" />
        </motion.div>

        <div className="relative bg-card/50 border border-warm rounded-sm p-8 md:p-12 shadow-warm">
          {/* Decorative corner flourishes */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-warm-gold/40" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-warm-gold/40" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-warm-gold/40" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-warm-gold/40" />

          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              className={`font-body text-lg md:text-xl leading-relaxed text-foreground/85 mb-6 last:mb-0 whitespace-pre-line ${index === 0 ? "font-handwritten text-2xl md:text-3xl text-primary" : ""
                } ${index === paragraphs.length - 1 ? "font-handwritten text-xl md:text-2xl text-primary mt-10" : ""}`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LetterSection;
