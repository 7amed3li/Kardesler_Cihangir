## Dinosoft Kurye Entegrasyonu — API Dokümanı

Teslim edilmeyi bekleyen aktif paket siparişlerin kurye firması tarafından otomatik olarak alınabilmesi ve

firmanın sipariş durumunu restorana geri bildirebilmesi için hazırlanmıştır.

## 1. Genel Bakış

- Kurye firması belirli aralıklarla (ör. 30–60 sn) GetPacketOrders uç noktasını çağırır; kuryeye verilmeye hazır paket siparişleri JSON olarak döner.

- Siparişin durumu her değiştiğinde firma UpdateOrderStatus uç noktasına bildirim gönderir.

- Erişim, restoran tarafından üretilen bir API anahtarı ile sağlanır.

- Müşteri adı, telefon ve konum gibi kişisel veriler döndüğünden API anahtarı gizli tutulmalıdır.

Akış:

```
GetPacketOrders → accepted → picked_up → delivered
(çekilir) (üstlenildi) (yolda) (teslim)
↓ herhangi bir anda
cancelled / failed → sipariş havuza döner
```

## 2. Kimlik Doğrulama

Her istekte API anahtarı gönderilmelidir. Önerilen yöntem HTTP başlığıdır.

| Yöntem Kullanım |
| --- |
| HTTP başlığı (önerilen) X-Api-Key: <anahtar> Sorgu parametresi ?apiKey=<anahtar> — kolay test için; anahtar log'lara düşebilir |

Anahtar geçersiz / pasif / süresi dolmuşsa HTTP 401 döner.

## 3. Uç Nokta — Aktif Paket Siparişleri

| Adres | http://SİTE_ADRESİNİZ/Courier/GetPacketOrders |   |   |
| --- | --- | --- | --- |
| Metot | GET | (veya | POST ) |
| Başlık | X-Api-Key: <anahtar> |   |   |

İsteğe bağlı parametre


| Parametre | Açıklama |
| --- | --- |
| branchCode Yalnız belirtilen şubenin siparişleri. Virgülle birden çok şube verilebilir ( M01,M02 ). Verilmezse tüm |   |
|   | şubeler döner. |

## Örnek istekler

```
curl -X GET "http://SİTE_ADRESİNİZ/Courier/GetPacketOrders" \
-H "X-Api-Key: ANAHTARINIZ"
# tek şube
curl -X GET "http://SİTE_ADRESİNİZ/Courier/GetPacketOrders?branchCode=M01" \
-H "X-Api-Key: ANAHTARINIZ"
```


## Yanıt (HTTP 200)

```
{
"Result": true,
"Count": 2,
"Orders": [
{
"Id": 128455,
"BranchCode": "M01",
"PacketDayNo": 37,
"PersonCode": "0000001234",
"PersonName": "Ahmet Yılmaz",
"PersonAddress": "Cumhuriyet Mah. 15. Sk. No:4/8 Kadıköy",
"CellPhone1": "05321112233",
"Latitude": "40.98765",
"Longitude": "29.02546",
"IsApproximateLocation": false,
"Total": 480.50,
"CreatedOn": "2026-08-07T12:00:00",
"ReadyAt": "2026-08-07T12:15:00",
"ReadyInMinutes": 11,
"GyId": null,
"TrendyolOrderId": null,
"YsOrderCode": null,
"MyOrderId": null,
"PacketPaymentType": "Kredi Kartı",
"PacketPaymentTypeCode": "5",
"PaymentMethod": "credit_card",
"IsOnlinePaid": false,
"CollectedTotal": 0,
"CollectAmount": 480.50,
"OrderNote": "Zili çalmayın, bebek uyuyor"
}
]
}
```


## Alan açıklamaları

| Alan | Tip | Açıklama |   |   |
| --- | --- | --- | --- | --- |
| Id | tamsayı | Siparişin (adisyonun) tekil numarası. Durum bildirirken | orderId | olarak |
|   |   | bunu gönderiniz |   |   |
| BranchCode | metin | Siparişin ait olduğu şube kodu |   |   |
| PacketDayNo | tamsayı | Paketin gün içindeki sıra numarası (günlük paket no). Boş olabilir |   |   |
| PersonCode | metin | Müşteri kodu |   |   |
| PersonName | metin | Müşteri adı soyadı |   |   |
| PersonAddress | metin | Teslimat adresi (açık adres) |   |   |
| CellPhone1 | metin | Müşteri cep telefonu |   |   |
| Latitude | metin | Adres enlemi (harita/navigasyon için). Boş olabilir |   |   |
| Longitude | metin | Adres boylamı. Boş olabilir |   |   |
| IsApproximateLocation | boolean | true |   | ise koordinat müşteri adresinden değil, mahallenin merkezinden |
|   |   | gelmiştir — kapıyı göstermez, doğru mahalleye götürür. Kurye bu durumda |   |   |
|   |   | adres metnine ve müşteri telefonuna güvenmelidir |   |   |
| Total | ondalık | Sipariş toplam tutarı (TL) |   |   |
| CreatedOn | tarih/saat Siparişin restorana girildiği an |   |   |   |
| ReadyAt | tarih/saat | Mutfağın tahmini hazır olma anı. Kuryeyi buna göre planlayınız |   |   |
| ReadyInMinutes | tamsayı | ReadyAt 'e kalan dakika. 0 ise sipariş hazır sayılır |   |   |
| PacketPaymentType | metin | Restoranın ödeme tipi etiketi (Nakit / Kredi Kartı / Online vb.). Serbest |   |   |
|   |   | metindir ve boş gelebilir |   |   |
| PacketPaymentTypeCode | metin | Ödeme tipinin ham kodu |   |   |
| PaymentMethod | metin | Normalize edilmiş ödeme yöntemi: cash , credit_card | , | meal_card , |
|   |   | online , unknown |   |   |
| IsOnlinePaid | boolean Ödeme online/pazaryerinde alınmış mı. | true | ise kapıda tahsilat yoktur |   |
| CollectedTotal | ondalık | Adisyonda daha önce tahsil edilmiş tutar |   |   |
| CollectAmount | ondalık | Kuryenin kapıda tahsil edeceği tutar. IsOnlinePaid |   | ise 0; aksi halde |
|   |   | Total - CollectedTotal |   |   |
| OrderNote | metin | Sipariş notu |   |   |
| GyId | metin | Getir sipariş numarası (varsa) |   |   |
| TrendyolOrderId | metin | Trendyol Yemek sipariş numarası (varsa) |   |   |
| YsOrderCode | metin | Yemeksepeti sipariş kodu (varsa) |   |   |
| MyOrderId | metin | Migros Yemek sipariş numarası (varsa) |   |   |


GyId / TrendyolOrderId / YsOrderCode / MyOrderId alanları siparişin geldiği kanala göre dolar; doğrudan

girilen paket siparişlerde hepsi boştur.

Kuryeyi ReadyAt 'e göre yola çıkarınız. Restoranda "sipariş hazır" işaretlemesi yoktur; sipariş girildiği

anda listeye düşer, yemek henüz hazırlanmamıştır. ReadyAt mutfağın tahmini hazır olma anıdır. Kuryeyi yol süresini hesaba katarak gönderirseniz ( ReadyAt eksi yol süresi) kurye de yemek de beklemez. ReadyInMinutes: 0 ise sipariş hazır sayılır. Süre restoran ayarıdır ve restorandan restorana değişir; sabit bir değer varsaymayınız, her siparişin kendi ReadyAt alanını kullanınız. Alan null gelirse özellik

kapalıdır.

Tahsilat için CollectAmount alanını kullanınız, Total 'ı değil. Total siparişin tutarıdır; online

ödenmiş bir siparişte kurye para tahsil etmez. PaymentMethod alanı unknown ise ödeme tipi restoranda seçilmemiştir — bu durumda CollectAmount güvenli tarafta kalmak için sipariş tutarına eşittir.

## 4. Uç Nokta — Durum Bildirimi

| Adres | http://SİTE_ADRESİNİZ/Courier/UpdateOrderStatus |
| --- | --- |
| Metot | POST |
| Başlık | X-Api-Key: <anahtar> |
| Gövde | application/json veya application/x-www-form-urlencoded |

## İstek alanları

| Alan | Tip | Zorunlu Açıklama |   |   |   |
| --- | --- | --- | --- | --- | --- |
| orderId | tamsayı | Evet | GetPacketOrders | yanıtındaki | Id |
| status | metin | Evet | Aşağıdaki listeden biri |   |   |
| courierName | metin | Hayır | Paketi taşıyan gerçek kuryenin adı |   |   |
| courierPhone | metin | Hayır | Kuryenin telefonu |   |   |
| note | metin | Hayır | Serbest açıklama (özellikle |   | failed için sebep) |
| occurredAt | tarih/saat Hayır |   | Olayın firmadaki gerçekleşme zamanı (ISO 8601). Boşsa isteğin geldiği an |   |   |
|   |   |   | kullanılır |   |   |


## Durumlar ( status )

| Değer | Anlamı | Sistemde etkisi |
| --- | --- | --- |
| accepted | Firma işi üstlendi, kurye atadı | Sipariş firmaya bağlanır, hâlâ restoranda bekler |
| picked_up | Kurye paketi restorandan aldı, yola çıktı | Sipariş Yolda durumuna geçer |
| delivered | Müşteriye teslim edildi | Yalnızca kayda geçer (aşağıdaki nota bakınız) |
| cancelled | Firma siparişi iptal etti | Sipariş havuza döner, restoran yeniden atayabilir |
| failed | Teslim edilemedi (müşteri yok, adres yanlış vb.) | Sipariş havuza döner; sebebi note alanına yazınız |

Değerler büyük/küçük harf duyarsızdır; Türkçe karşılıkları da kabul edilir ( kabul , yolda , teslim , iptal ,

teslim_edilemedi ).

Önemli — delivered siparişi kapatmaz. Tahsilat restoran kasasında yapıldığı için adisyonu yalnızca restoran kapatabilir. delivered bildirimi kaydedilir ve restoranda görünür; sipariş, kasiyer tahsilatı girene kadar açık kalır. Bu bilinçli bir tasarımdır, hata değildir.

## Örnek istekler

```
curl -X POST "http://SİTE_ADRESİNİZ/Courier/UpdateOrderStatus" \
-H "X-Api-Key: ANAHTARINIZ" \
-H "Content-Type: application/json" \
-d '{
"orderId": 128455,
"status": "picked_up",
"courierName": "Ahmet Yılmaz",
"courierPhone": "05321112233",
"occurredAt": "2026-08-07T14:22:00"
}'
```

Teslim edilemedi bildirimi:

```
{
"orderId": 128455,
"status": "failed",
"courierName": "Ahmet Yılmaz",
"note": "Müşteri adreste bulunamadı, 3 kez arandı.",
"occurredAt": "2026-08-07T14:55:00"
}
```

Form-urlencoded kullanmak isterseniz:


```
curl -X POST "http://SİTE_ADRESİNİZ/Courier/UpdateOrderStatus" \
-H "X-Api-Key: ANAHTARINIZ" \
-d "orderId=128455&status=delivered"
```

## Yanıt (HTTP 200)

```
{
"Result": true,
"Message": "Sipariş yolda olarak işaretlendi.",
"Status": "picked_up",
"PacketState": 4
}
```

| Alan Açıklama Result İşlem uygulandı mı Message Status |   | Türkçe açıklama (kullanıcıya gösterilebilir) Bildiriminizin karşılık geldiği standart durum |
| --- | --- | --- |
| PacketState |   | İşlem sonrası siparişin paket durumu — 2 bekliyor/havuzda, 4 yolda, 5 teslim edildi |

## 5. Hata Yanıtları

Tüm hatalarda gövde { "Result": false, "Message": "..." } biçimindedir.

| HTTP Anlamı 400 status 401 API anahtarı eksik / geçersiz / süresi dolmuş 403 alıyorsanız restoranla görüşünüz 404 orderId bulunamadı 409 | tanınmadı ya da sipariş bir paket siparişi değil Anahtar geçerli ama bu uç noktaya yetkisi yok. Anahtarlar yalnız kullanmanız gereken uçlara açılır; bu kodu Sipariş bu geçişe uygun değil (kapatılmış, başka kuryede, vb.) |
| --- | --- |
| 500 | Sunucu tarafı hata. Kısa süre sonra tekrar deneyiniz |

## 6. Kullanım / Polling Önerisi

- GetPacketOrders uç noktasını 30–60 saniyede bir çağırmanız yeterlidir.

- siparişleri döner; üstlendiğiniz sipariş bir daha listelenmez. (Restoranın kendi kuryesine atadığı siparişler de aynı sebeple listede görünmez.) accepted gönderdiğiniz sipariş listeden çıkar. Liste yalnızca henüz hiçbir kuryeye bağlanmamış


- Liste boşsa Count: 0 ve boş Orders döner (hata değildir).

- Durum sırası zorunlu değildir. accepted atlanıp doğrudan picked_up gönderilebilir; sipariş o anda firmaya bağlanır.

- Tekrar gönderim güvenlidir (idempotent). Aynı durum ikinci kez gönderilirse HTTP 200 ve "zaten ..." mesajı döner; mükerrer kayıt sorun çıkarmaz.

- 409 alırsanız yeniden denemeyiniz. Sipariş restoran tarafında başka bir duruma geçmiştir (ör. kasiyer siparişi kapatmış veya başka kuryeye atamıştır); bir sonraki GetPacketOrders çağrısında listede görünmeyecektir.

- Her bildirim kaydedilir, sipariş durumu değişmese bile. courierName / courierPhone / note alanlarını doldurmanız, restoranın müşteri sorularını yanıtlayabilmesi için önemlidir.

- listelenir. cancelled / failed sonrası sipariş havuza döner ve bir sonraki GetPacketOrders çağrısında tekrar

## 7. Kurye Firması İçin Kontrol Listesi

Entegrasyonu yazarken bu maddeleri tek tek doğrulayınız. Sahada en sık yaşanan sorunlar bunlardır.


| # | Konu | Yapılması gereken |   |   |
| --- | --- | --- | --- | --- |
| 1 | Tahsilat tutarı | Kuryeye | Total 'ı değil | CollectAmount 'u gösteriniz. Online ödenmiş siparişte |
|   |   | CollectAmount = 0 'dır; |   | Total gösterirseniz kurye ödenmiş siparişten ikinci kez para |
|   |   | ister |   |   |
| 2 | Hazırlanma süresi | Kuryeyi | ReadyAt | eksi yol süresi anında yola çıkarınız. Hemen gönderirseniz kurye |
|   |   | mutfağı bekler; geç gönderirseniz yemek soğur. Süre restoran ayarıdır — sabit |   |   |
|   |   | kodlamayınız, her siparişin |   | ReadyAt 'ini kullanınız |
| 3 | Yaklaşık konum |   | IsApproximateLocation: true | ise koordinat mahalle merkezidir. Kurye ekranında |
|   |   | adres metnini öne çıkarınız; yalnız haritadaki iğneye güvenen kurye kapıyı bulamaz |   |   |
| 4 | Koordinat boş |   | Latitude / Longitude null | gelebilir. Uygulamanız bu durumda çökmemeli, adres |
|   | olabilir | metni ve telefonla çalışmaya devam etmelidir |   |   |
| 5 | delivered siparişi | Teslim bildirimi kaydedilir ama sipariş restoranda tahsilat girilene kadar açık kalır. Bu |   |   |
|   | kapatmaz | beklenen davranıştır, tekrar göndermeyiniz |   |   |
| 6 | 409 alırsanız | Sipariş restoranda başka bir duruma geçmiştir (kapatılmış / başka kuryeye atanmış). |   |   |
|   | durunuz | Yeniden denemeyiniz; sipariş zaten listeden düşmüştür |   |   |
| 7 | accepted sonrası | Üstlendiğiniz sipariş |   | GetPacketOrders 'tan çıkar. "Sipariş kayboldu" diye tekrar |
|   | liste | sormayınız; takibi kendi tarafınızda |   | Id ile yapınız |
| 8 | occurredAt | Olayın sizdeki gerçek zamanı. İhtilafta "kurye saat kaçta aldı / teslim etti" sorusunun tek |   |   |
|   | gönderiniz | güvenilir kaynağı budur |   |   |
| 9 | courierName / | Her bildirimde doldurunuz. Müşteri restoranı aradığında "paketiniz kimde" sorusu ancak |   |   |
|   | courierPhone | bununla yanıtlanır |   |   |
| 10 | failed için sebep | Teslim edilemediğinde |   | note alanına sebebi yazınız (müşteri yok, adres yanlış vb.). |
|   |   | Sipariş havuza döner ve restoran ne olduğunu bilmelidir |   |   |
| 11 | Tekrar gönderim | Ağ hatasında aynı bildirimi tekrar gönderebilirsiniz; sistem idempotenttir, mükerrer kayıt |   |   |
|   | güvenlidir | sorun çıkarmaz |   |   |
| 12 | API anahtarı | Yalnız sunucu tarafında saklayınız. Kurye telefonlarına/uygulamaya gömmeyiniz — |   |   |
|   |   | anahtar tüm müşteri adres ve telefonlarına erişim verir |   |   |
| 13 | Polling sıklığı | 30–60 saniye yeterlidir. Daha sık çağırmak restoran sunucusunu yorar, yeni bilgi getirmez |   |   |

## 8. Güvenlik

- Anahtarınız yalnızca kullanmanız gereken uç noktalara açılır ( GetPacketOrders , UpdateOrderStatus ); diğerleri 403 döner.

- Anahtarı yalnızca güvenli kanaldan saklayınız, üçüncü kişilerle paylaşmayınız.

- Anahtar sızarsa restoran anahtarı anında pasifleştirip yenisini üretebilir.

- İstek başlığı ( X-Api-Key ) kullanımı, adres çubuğundaki ( ?apiKey= ) kullanıma göre daha güvenlidir.

- Ek güvenlik için kurye firmasının IP adresi beyaz listeye alınabilir.

- Çok şubeli kurulumlarda branchCode parametresini kullanarak yalnız ilgili şubenin siparişlerini çekiniz.


## 9. İletişim

Teknik sorular için restoran yetkilisi ile iletişime geçiniz.
