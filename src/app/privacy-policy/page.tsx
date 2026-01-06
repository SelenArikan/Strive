import Link from "next/link";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Gizlilik Politikası</h1>
                <p className="text-gray-400 mb-12">Son güncellenme: {new Date().toLocaleDateString('tr-TR')}</p>

                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Giriş</h2>
                        <p className="leading-relaxed">
                            Strive olarak, gizliliğinize değer veriyoruz. Bu Gizlilik Politikası, kişisel bilgilerinizi nasıl
                            topladığımızı, kullandığımızı, paylaştığımızı ve koruduğumuzu açıklamaktadır. Web sitemizi veya
                            hizmetlerimizi kullanarak, bu politikada açıklanan uygulamaları kabul etmiş olursunuz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Topladığımız Bilgiler</h2>
                        <p className="leading-relaxed mb-4">
                            Aşağıdaki türde bilgileri toplayabiliriz:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>İsim, e-posta adresi ve iletişim bilgileri gibi kişisel tanımlama bilgileri</li>
                            <li>Sipariş geçmişi ve ödeme bilgileri</li>
                            <li>IP adresi, tarayıcı türü ve cihaz bilgileri gibi teknik veriler</li>
                            <li>Web sitemizle etkileşiminizle ilgili kullanım verileri</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Bilgilerin Kullanımı</h2>
                        <p className="leading-relaxed mb-4">
                            Topladığımız bilgileri şu amaçlarla kullanırız:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Siparişlerinizi işlemek ve teslimat yapmak</li>
                            <li>Müşteri desteği sağlamak ve sorularınızı yanıtlamak</li>
                            <li>Hizmetlerimizi geliştirmek ve kişiselleştirmek</li>
                            <li>Pazarlama iletişimleri göndermek (onay vermeniz halinde)</li>
                            <li>Web sitesi güvenliğini sağlamak ve dolandırıcılığı önlemek</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Bilgi Paylaşımı</h2>
                        <p className="leading-relaxed">
                            Kişisel bilgilerinizi üçüncü taraflarla paylaşmayız, satmayız veya kiralamayız. Ancak, siparişleri
                            yerine getirmek için gerekli olduğunda (örneğin, kargo şirketleri) veya yasal olarak gerekli olduğunda
                            bilgilerinizi paylaşabiliriz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Veri Güvenliği</h2>
                        <p className="leading-relaxed">
                            Kişisel bilgilerinizi korumak için endüstri standardı güvenlik önlemleri kullanıyoruz. Buna şifreleme,
                            güvenli sunucular ve erişim kontrolleri dahildir. Ancak, internet üzerinden hiçbir veri iletiminin
                            %100 güvenli olmadığını unutmayın.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Çerezler</h2>
                        <p className="leading-relaxed">
                            Web sitemiz, deneyiminizi geliştirmek için çerezler kullanır. Çerezler, cihazınıza yerleştirilen
                            küçük metin dosyalarıdır. Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz,
                            ancak bu, web sitesi işlevselliğini etkileyebilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Haklarınız</h2>
                        <p className="leading-relaxed mb-4">
                            Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Verilerinize erişim talep etme</li>
                            <li>Verilerin düzeltilmesini talep etme</li>
                            <li>Verilerin silinmesini talep etme</li>
                            <li>Veri işlemeye itiraz etme</li>
                            <li>Pazarlama iletişimlerinden vazgeçme</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Üçüncü Taraf Bağlantıları</h2>
                        <p className="leading-relaxed">
                            Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik uygulamalarından
                            sorumlu değiliz. Başka bir web sitesini ziyaret ettiğinizde gizlilik politikalarını incelemenizi öneririz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Çocukların Gizliliği</h2>
                        <p className="leading-relaxed">
                            Hizmetlerimiz 18 yaşın altındaki bireyler için tasarlanmamıştır. Bilerek 18 yaşın altındaki bireylerden
                            kişisel bilgi toplamıyoruz. Yanlışlıkla bir çocuktan veri topladığımızı fark ederseniz, lütfen bize bildirin.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. Politika Değişiklikleri</h2>
                        <p className="leading-relaxed">
                            Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlanacak ve
                            önemli değişiklikler için size bildirimde bulunulacaktır. En son güncellemelerden haberdar olmak için
                            bu politikayı düzenli olarak gözden geçirmenizi öneririz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. İletişim</h2>
                        <p className="leading-relaxed">
                            Bu Gizlilik Politikası hakkında sorularınız veya endişeleriniz varsa, lütfen bizimle iletişime geçin:
                        </p>
                        <div className="mt-4 p-6 bg-surface-dark rounded-lg border border-white/10">
                            <p className="font-semibold text-white">Strive</p>
                            <p className="text-gray-400 mt-2">E-posta: privacy@strive.com</p>
                            <p className="text-gray-400">Telefon: +90 XXX XXX XX XX</p>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
