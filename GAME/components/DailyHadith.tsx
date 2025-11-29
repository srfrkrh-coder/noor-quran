import React, { useMemo } from 'react';
import { Hadith } from '../types';

// A small database of Hadiths to simulate the "Daily" effect without CORS issues
const hadithDatabase: Hadith[] = [
  { id: 1, source: "پیامبر اکرم (ص)", arabic: "إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ", persian: "من تنها برای تکمیل فضایل اخلاقی برانگیخته شده‌ام." },
  { id: 2, source: "امام علی (ع)", arabic: "عَلَيْكَ بِالصِّدْقِ فَمَنْ صَدَقَ فِي أَقْوَالِهِ جَلَّ قَدْرُهُ", persian: "بر تو باد به راستگویی؛ زیرا کسی که در گفتارش راستگو باشد، مقامش والا می‌شود." },
  { id: 3, source: "امام صادق (ع)", arabic: "مَنْ حَسُنَ خُلُقُهُ طَابَ عَيْشُهُ", persian: "هر کس خوش‌اخلاق باشد، زندگی‌اش پاکیزه و گوارا می‌شود." },
  { id: 4, source: "پیامبر اکرم (ص)", arabic: "أَفْضَلُ الْأَعْمَالِ الْحُبُّ فِي اللَّهِ وَ الْبُغْضُ فِي اللَّهِ", persian: "برترین اعمال، دوستی برای خدا و دشمنی برای خداست." },
  { id: 5, source: "امام رضا (ع)", arabic: "لَا يَكُونُ الْمُؤْمِنُ مُؤْمِناً حَتَّى تَكُونَ فِيهِ ثَلَاثُ خِصَالٍ", persian: "مؤمن، مؤمن واقعی نیست، مگر آن که سه خصلت در او باشد: سنتی از پروردگارش، سنتی از پیامبرش و سنتی از امامش." },
];

const DailyHadith: React.FC = () => {
  // Select a hadith based on the day of the year
  const todayHadith = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return hadithDatabase[dayOfYear % hadithDatabase.length];
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div className="glass rounded-2xl p-6 shadow-lg border-t-4 border-islamic-gold relative overflow-hidden">
        
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" />
            </svg>
        </div>

        <div className="relative z-10 text-center">
            <div className="inline-block bg-islamic-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                حدیث روز
            </div>
            <h3 className="text-xl font-bold text-islamic-green mb-2">{todayHadith.source}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-serif mb-3 leading-relaxed dir-rtl font-arabic text-center px-4" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                «{todayHadith.arabic}»
            </p>
            <p className="text-md text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
                {todayHadith.persian}
            </p>
            <div className="mt-4 text-xs text-gray-400">
                منبع: HadithLib.com (منتخب)
            </div>
        </div>
      </div>
    </div>
  );
};

export default DailyHadith;
