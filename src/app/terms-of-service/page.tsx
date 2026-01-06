import Link from "next/link";
import Footer from "@/components/Footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black">
                            <span className="material-symbols-outlined text-sm">sports_basketball</span>
                        </div>
                        <span className="font-body font-bold text-xl tracking-wide">Strive</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-white transition"
                    >
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Hizmet Şartları</h1>
                <p className="text-gray-400 mb-12">Son güncellenme: {new Date().toLocaleDateString('tr-TR')}</p>

                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Şartların Kabulü</h2>
                        <p className="leading-relaxed">
                            Strive web sitesini veya hizmetlerini kullanarak, bu Hizmet Şartlarını kabul etmiş olursunuz.
                            Bu şartları kabul etmiyorsanız, lütfen web sitemizi kullanmayın. Hizmetlerimizi kullanmaya
                            devam ederek, bu şartlara uymayı kabul edersiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Ürün Bilgileri ve Fiyatlandırma</h2>
                        <p className="leading-relaxed mb-4">
                            Ürünlerimiz hakkında doğru bilgi sağlamak için her türlü çabayı gösteriyoruz, ancak:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Ürün renkleri, ekran ayarlarınıza bağlı olarak farklılık gösterebilir</li>
                            <li>Ürün özellikleri ve fiyatlar önceden haber verilmeksizin değiştirilebilir</li>
                            <li>Ürün stok durumu değişebilir ve sipariş sonrası stok tükenebilir</li>
                            <li>Açık hatalar veya yanlış fiyatlandırmalar durumunda siparişleri iptal etme hakkımız saklıdır</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Sipariş ve Ödeme</h2>
                        <p className="leading-relaxed mb-4">
                            Sipariş verirken aşağıdaki koşulları kabul edersiniz:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Verdiğiniz tüm bilgilerin doğru, güncel ve eksiksiz olduğunu garanti edersiniz</li>
                            <li>Siparişinizi işleme koyduğumuzda, satın alma taahhüdünde bulunmuş olursunuz</li>
                            <li>Ödeme bilgilerinizi güvenli şekilde işliyoruz ve saklamıyoruz</li>
                            <li>Sipariş onayı, ödeme işleminizin başarılı olmasından sonra gönderilir</li>
                            <li>Hatalı veya dolandırıcılık şüphesi olan siparişleri reddetme hakkımız saklıdır</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Teslimat</h2>
                        <p className="leading-relaxed">
                            Siparişlerinizi mümkün olan en kısa sürede teslim etmeye çalışıyoruz. Teslimat süreleri
                            tahminidir ve garanti edilmez. Teslimat gecikmeleri için sorumluluk kabul etmiyoruz, ancak
                            sizi bilgilendirmek için elimizden geleni yaparız. Kargo ücretleri sipariş sırasında belirtilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. İade ve Değişim</h2>
                        <p className="leading-relaxed mb-4">
                            İade ve değişim politikamız:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Ürünler teslimattan itibaren 14 gün içinde iade edilebilir</li>
                            <li>İade edilen ürünler kullanılmamış, hasarsız ve orijinal ambalajında olmalıdır</li>
                            <li>İade kargo ücretleri müşteriye aittir (kusurlu ürün durumları hariç)</li>
                            <li>Para iadesi, ürünü aldıktan sonra 7-10 iş günü içinde yapılır</li>
                            <li>Özel sipariş veya indirimli ürünler iade edilemez</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Kullanıcı Hesapları</h2>
                        <p className="leading-relaxed">
                            Hesap oluşturursanız, şifrenizin gizliliğini korumaktan ve hesabınızdaki tüm faaliyetlerden
                            sorumlusunuz. Hesabınızın yetkisiz kullanımından bizi derhal haberdar etmelisiniz. Yanıltıcı
                            bilgiler kullanarak hesap oluşturmamalısınız.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Fikri Mülkiyet Hakları</h2>
                        <p className="leading-relaxed">
                            Web sitemizdeki tüm içerik (metin, grafik, logo, resim, video) Strive'ın mülkiyetindedir ve
                            telif hakkı yasaları ile korunmaktadır. İçeriği kopyalayamaz, çoğaltamaz, dağıtamaz veya
                            ticari amaçlarla kullanamazsınız. Strive markası ve logoları tescilli markalardır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Yasak Kullanımlar</h2>
                        <p className="leading-relaxed mb-4">
                            Web sitemizi aşağıdaki amaçlarla kullanamazsınız:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Yasa dışı veya yetkisiz herhangi bir amaç için</li>
                            <li>Başkalarını yasaları ihlal etmeye teşvik etmek veya katılmak için</li>
                            <li>Virüs, truva atı veya zararlı kod iletmek için</li>
                            <li>Web sitesinin güvenliğini veya bütünlüğünü tehlikeye atmak için</li>
                            <li>Spam göndermek veya istenmeyen içerik paylaşmak için</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Sorumluluk Sınırlaması</h2>
                        <p className="leading-relaxed">
                            Strive, web sitesinin kullanımından veya kullanılamamasından kaynaklanan doğrudan, dolaylı,
                            tesadüfi, özel veya sonuç olarak ortaya çıkan zararlardan sorumlu değildir. Bu, veri kaybı,
                            kar kaybı veya iş kesintisi dahil olmak üzere sınırlı değildir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Tazminat</h2>
                        <p className="leading-relaxed">
                            Bu Hizmet Şartlarını ihlal etmeniz veya web sitesini uygunsuz kullanmanız durumunda,
                            Strive'ı ve bağlı kuruluşlarını, yöneticilerini, çalışanlarını ve temsilcilerini ortaya
                            çıkan tüm iddia, zarar ve masraflardan tazmin etmeyi kabul edersiniz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Uyuşmazlık Çözümü</h2>
                        <p className="leading-relaxed">
                            Bu Hizmet Şartlarından kaynaklanan veya bunlarla ilgili herhangi bir uyuşmazlık, öncelikle
                            dostane görüşmelerle çözülmeye çalışılacaktır. Çözüm sağlanamazsa, uyuşmazlık Türkiye
                            mahkemelerinin yargı yetkisine tabi olacaktır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Değişiklikler</h2>
                        <p className="leading-relaxed">
                            Bu Hizmet Şartlarını istediğimiz zaman değiştirme hakkımız saklıdır. Önemli değişiklikler
                            web sitemizde yayınlanacaktır. Değişikliklerden sonra hizmetlerimizi kullanmaya devam
                            ederseniz, yeni şartları kabul etmiş sayılırsınız.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">13. Geçerli Yasa</h2>
                        <p className="leading-relaxed">
                            Bu Hizmet Şartları, Türkiye Cumhuriyeti yasalarına göre yönetilir ve yorumlanır.
                            Yasaların çatışması hükümlerine bakılmaksızın, Türkiye yasaları uygulanacaktır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">14. Bölünebilirlik</h2>
                        <p className="leading-relaxed">
                            Bu Hizmet Şartlarındaki herhangi bir hüküm geçersiz veya uygulanamaz bulunursa,
                            kalan hükümler tam olarak yürürlükte ve geçerli kalacaktır. Geçersiz hüküm,
                            tarafların asıl amacına en yakın şekilde geçerli bir hükümle değiştirilecektir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">15. İletişim Bilgileri</h2>
                        <p className="leading-relaxed">
                            Bu Hizmet Şartları hakkında sorularınız varsa, lütfen bizimle iletişime geçin:
                        </p>
                        <div className="mt-4 p-6 bg-surface-dark rounded-lg border border-white/10">
                            <p className="font-semibold text-white">Strive</p>
                            <p className="text-gray-400 mt-2">E-posta: info@strive.com</p>
                            <p className="text-gray-400">Telefon: +90 XXX XXX XX XX</p>
                            <p className="text-gray-400">Adres: [Adres bilgisi eklenecek]</p>
                        </div>
                    </section>

                    <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-sm text-gray-400">
                            Bu Hizmet Şartlarını dikkatlice okuyun. Web sitemizi kullanarak, bu şartlara uygun
                            hareket edeceğinizi kabul etmiş olursunuz. Herhangi bir sorunuz veya endişeniz varsa,
                            lütfen hizmetlerimizi kullanmadan önce bizimle iletişime geçin.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
