import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, User, X, Heart, Search, ChevronRight, Plus, Minus, 
  Trash2, CheckCircle, Menu, ArrowRight, CreditCard, Home, Mail, 
  Lock, Building, Wallet, Info, Star, Globe, MapPin, Phone, Gem, 
  Watch, Briefcase, Shirt, Sparkles, CreditCard as VisaIcon
} from 'lucide-react';

const CATEGORIES = { FASHION: 'fashion', ACCESSORIES: 'accessories' };
const GENDERS = { WOMEN: 'women', MEN: 'men' };

const PRODUCTS_DATA = {
  [GENDERS.WOMEN]: {
    [CATEGORIES.FASHION]: [
      { id: 'w1', name: 'فستان ساتان وردي ناعم', price: 1200, colors: ['#FFB6C1', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', description: 'فستان سهرة من الساتان الوردي اللامع، يتميز بياقة منسدلة وأربطة رفيعة، مثالي للمناسبات الراقية.' },
      { id: 'w2', name: 'معطف كشمير جملي طويل', price: 2500, colors: ['#C19A6B', '#000000'], image: 'https://images.unsplash.com/photo-1539533113208-f6df818d5438?w=800', description: 'معطف كلاسيكي من الكشمير الفاخر بلون الجمل، تصميم طويل بياقة عريضة وحزام خصر لتحديد القوام.' },
      { id: 'w3', name: 'بدلة رسمية عاجية مودرن', price: 1800, colors: ['#FFFFF0', '#000000'], image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800', description: 'بليزر وبنطال بقصة مستقيمة بلون عاجي فاتح، قماش عالي الجودة مناسب للعمل والاجتماعات الرسمية.' },
      { id: 'w4', name: 'فستان صيفي منقط بليسيه', price: 950, colors: ['#FFFF00', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800', description: 'فستان ربيعي باللون الأصفر الساطع بنقاط بيضاء، يتميز بتصميم بليسيه وتنورة واسعة تمنح شعوراً بالخفة.' },
      { id: 'w5', name: 'فستان أزرق ملكي مطرز', price: 3200, colors: ['#000080', '#D4AF37'], image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800', description: 'فستان سهرة طويل بلون أزرق ملكي داكن مع تطريزات يدوية دقيقة عند الصدر والأكمام.' },
      { id: 'w6', name: 'سترة صوفية بياقة عالية', price: 600, colors: ['#FFFFFF', '#808080'], image: 'https://images.unsplash.com/photo-1581067723713-35a5d0d633d1?w=800', description: 'كنزة شتوية بيضاء من الصوف الناعم، بياقة عالية وأكمام طويلة توفر الدفء والأناقة في الشتاء.' },
      { id: 'w7', name: 'فستان أحمر كلاسيك بفتحة', price: 1400, colors: ['#FF0000', '#000000'], image: 'https://images.unsplash.com/photo-1518881920211-73602f3a8b41?w=800', description: 'فستان أحمر جريء بقصة ميدي ضيقة، يتميز بفتحة جانبية جذابة وفتحة ياقة مربعة كلاسيكية.' },
      { id: 'w8', name: 'قميص حرير أخضر زمردي', price: 750, colors: ['#004F2D', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800', description: 'قميص من الحرير الطبيعي بلون أخضر زمردي عميق، بأزرار لؤلؤية وأساور عريضة.' },
      { id: 'w9', name: 'بليزر أسود كلاسيكي', price: 1100, colors: ['#000000', '#2F4F4F'], image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800', description: 'جاكيت بليزر أسود بقصة محددة (Tailored)، قطعة أساسية في خزانة كل امرأة عصرية.' },
      { id: 'w10', name: 'فستان سهرة أبيض ملكي', price: 4500, colors: ['#FFFFFF', '#F5F5DC'], image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800', description: 'فستان طويل من الدانتيل والشيفون الأبيض، تصميم ساحر مستوحى من فساتين الملكات.' },
      { id: 'w11', name: 'كنزة صوفية رمادية ناعمة', price: 550, colors: ['#808080', '#000000'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', description: 'كنزة خفيفة بياقة V، مصنوعة من مزيج الصوف الناعم، مثالية للارتداء اليومي.' },
      { id: 'w12', name: 'جاكيت منتفخ شتوي أسود', price: 1300, colors: ['#000000', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1536766768598-e092d3fdcf22?w=800', description: 'جاكيت بافر (Puffer) أسود مقاوم للماء والرياح، يوفر أقصى درجات الدفء في الأجواء الباردة.' },
      { id: 'w13', name: 'تونيك كتان بيج مريح', price: 450, colors: ['#F5F5DC', '#D2B48C'], image: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b494b7?w=800', description: 'قميص تونيك طويل من الكتان الطبيعي، بلون بيج هادئ وقصة فضفاضة مريحة جداً.' },
      { id: 'w14', name: 'فستان أسود قصير (LBD)', price: 890, colors: ['#000000', '#1C1C1C'], image: 'https://images.unsplash.com/photo-1520006403909-8387bc9a4ca1?w=800', description: 'الفستان الأسود القصير الكلاسيكي، بياقة دائرية وبدون أكمام، يناسب كافة المناسبات المسائية.' },
      { id: 'w15', name: 'جاكيت جينز فاتح عصري', price: 650, colors: ['#ADD8E6', '#000080'], image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=800', description: 'سترة من الدينيم الفاتح بتصميم كاجوال وتفاصيل ممزقة بسيطة، مثالية للمظهر الشبابي.' },
      { id: 'w16', name: 'فستان شيفون بوهيمي مزهر', price: 1150, colors: ['#FADADD', '#FFC0CB'], image: 'https://images.unsplash.com/photo-1614676466624-997403a4f242?w=800', description: 'فستان ماكسي من الشيفون بنقشات الزهور الملونة، تصميم بوهيمي رقيق مع كشكشة عند الأطراف.' },
      { id: 'w17', name: 'سترة جلدية سوداء (Biker)', price: 1900, colors: ['#000000', '#8B4513'], image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800', description: 'جاكيت جلد طبيعي بتصميم "بايكر" كلاسيكي وسحابات فضية، يمنحك مظهراً قوياً وعصرياً.' },
      { id: 'w18', name: 'فستان مخملي نبيذي غامق', price: 2100, colors: ['#800020', '#000000'], image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800', description: 'فستان من المخمل (Velvet) الفاخر بلون نبيذي غني، بياقة عالية وأكمام طويلة للسهرات الراقية.' },
      { id: 'w19', name: 'طقم كاجوال كريب كحلي', price: 1050, colors: ['#000080', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800', description: 'طقم مكون من قطعتين قميص وبنطال واسع من قماش الكريب الناعم بلون كحلي أنيق.' },
      { id: 'w20', name: 'معطف فرو صناعي رمادي', price: 2800, colors: ['#D3D3D3', '#000000'], image: 'https://images.unsplash.com/photo-1622122441340-02c38827476a?w=800', description: 'معطف من الفرو الصناعي الناعم جداً بلون رمادي، يمنحك لمسة من الفخامة والدفء الاستثنائي.' }
    ],
    [CATEGORIES.ACCESSORIES]: [
      { id: 'wa1', name: 'حقيبة يد جلدية بحلية ذهبية', price: 2200, colors: ['#000000', '#D4AF37'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', description: 'حقيبة يد من الجلد الطبيعي الأسود، مزودة بمقبض علوي وحلية معدنية ذهبية فاخرة.' },
      { id: 'wa2', name: 'عقد لؤلؤ طبيعي بطبقات', price: 1500, colors: ['#FFFFFF', '#D4AF37'], image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800', description: 'قلادة مكونة من عدة طبقات من اللؤلؤ الأبيض النقي، تضفي لمسة أرستقراطية على إطلالتك.' },
      { id: 'wa3', name: 'ساعة ذهبية بميناء صدفي', price: 3500, colors: ['#D4AF37', '#C0C0C0'], image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800', description: 'ساعة نسائية فاخرة مطلية بالذهب عيار 18، مع ميناء من صدف اللؤلؤ الطبيعي.' },
      { id: 'wa4', name: 'نظارة شمسية كلاسيكية سوداء', price: 650, colors: ['#000000', '#8B4513'], image: 'https://images.unsplash.com/photo-1511499767090-a66bb3cd9551?w=800', description: 'نظارة شمسية بتصميم عيون القطة (Cat-eye) بإطار أسود داكن وعدسات واقية من الأشعة.' },
      { id: 'wa5', name: 'وشاح كشمير مطرز يدوياً', price: 400, colors: ['#E6E6FA', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800', description: 'وشاح ناعم جداً من أجود أنواع الكشمير بلون لافندر، مطرز يدوياً عند الأطراف.' }
    ]
  },
  [GENDERS.MEN]: {
    [CATEGORIES.FASHION]: [
      { id: 'm1', name: 'بدلة رسمية كحلية سليم', price: 2800, colors: ['#000080', '#000000'], image: 'https://images.unsplash.com/photo-1594932224030-94557199ecb0?w=800', description: 'بدلة كاملة بلون كحلي داكن بقصة ضيقة (Slim Fit)، مثالية لحفلات الزفاف والعمل الرسمي.' },
      { id: 'm2', name: 'جاكيت صوف زيتي بياقة فراء', price: 1650, colors: ['#556B2F', '#000000'], image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', description: 'سترة شتوية من الصوف السميك بلون أخضر زيتي، مزودة بياقة قابلة للفصل من الفراء الدافئ.' },
      { id: 'm3', name: 'قميص قطن أبيض أكسفورد', price: 450, colors: ['#FFFFFF', '#ADD8E6'], image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', description: 'قميص أبيض ناصع من قطن الأكسفورد المتين، تصميم كلاسيكي بياقة مثبتة بأزرار.' },
      { id: 'm4', name: 'بدلة توكسيدو سوداء فاخرة', price: 3500, colors: ['#000000', '#1C1C1C'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800', description: 'بدلة توكسيدو رسمية بياقة من الساتان اللامع، مصممة للمناسبات الرسمية الفاخرة جداً.' },
      { id: 'm5', name: 'معطف شتوي رمادي طويل', price: 2200, colors: ['#808080', '#000000'], image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800', description: 'معطف شتوي طويل مصنوع من مزيج الصوف الفاخر، يتميز بياقة مزدوجة وأزرار كبيرة.' },
      { id: 'm6', name: 'كنزة محبوكة كحلي كاجوال', price: 580, colors: ['#000080', '#8B0000'], image: 'https://images.unsplash.com/photo-1610384072758-0671f55470e8?w=800', description: 'بلوفر محبوك بتصميم ضفائر كلاسيكية بلون كحلي، ناعم ودافئ جداً.' },
      { id: 'm7', name: 'قميص كتان رمادي فاتح', price: 520, colors: ['#D3D3D3', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=800', description: 'قميص صيفي من الكتان المسامي، بلون رمادي فاتح وقصة واسعة قليلاً للراحة.' },
      { id: 'm8', name: 'بنطال تشينو بيج عصري', price: 480, colors: ['#F5F5DC', '#000000'], image: 'https://images.unsplash.com/photo-1473966968600-fa804b869556?w=800', description: 'بنطال تشينو قطني بلون البيج، قطعة مرنة تناسب الإطلالات الرسمية واليومية.' },
      { id: 'm9', name: 'جاكيت جينز كلاسيكي أزرق', price: 720, colors: ['#4682B4', '#000000'], image: 'https://images.unsplash.com/photo-1516257984-b1b4d7574124?w=800', description: 'سترة جينز زرقاء بتصميم عتيق (Vintage)، متينة وتدوم طويلاً.' },
      { id: 'm10', name: 'بليزر أزرق سماوي صيفي', price: 980, colors: ['#87CEEB', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800', description: 'جاكيت بليزر خفيف بلون أزرق سماوي، مصنوع من قماش الكتان الممزوج، مثالي للصيف.' },
      { id: 'm11', name: 'تيشيرت بولو أبيض أساسي', price: 350, colors: ['#FFFFFF', '#000000'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', description: 'تيشيرت بولو قطني بياقة وأزرار، بلون أبيض نقي مع شعار صغير مطرز.' },
      { id: 'm12', name: 'معطف واق من المطر (Trench)', price: 1850, colors: ['#D2B48C', '#2F4F4F'], image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc394?w=800', description: 'معطف ترنش كلاسيكي بلون بيج، بفتحة صدر مزدوجة وحزام خصر، مضاد للماء.' },
      { id: 'm13', name: 'بدلة رسمية مخططة بدقة', price: 3100, colors: ['#2F4F4F', '#000000'], image: 'https://images.unsplash.com/photo-1592582311352-0fb845f23340?w=800', description: 'بدلة فاخرة بنقشة خطوط رفيعة (Pinstripe)، تعطي مظهراً طويلاً ومهيباً.' },
      { id: 'm14', name: 'قميص صيفي بنقشة نخيل', price: 420, colors: ['#006400', '#FFFFFF'], image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800', description: 'قميص هاواي بأكمام قصيرة ونقشات أشجار النخيل، مثالي للعطلات البحرية.' },
      { id: 'm15', name: 'سترة جلدية بنية داكنة', price: 2300, colors: ['#4B2C20', '#000000'], image: 'https://images.unsplash.com/photo-1615214066060-f655c65f9730?w=800', description: 'جاكيت من جلد الغنم الطبيعي بلون بني داكن غني، يزداد جمالاً مع مرور الوقت.' },
      { id: 'm16', name: 'طقم رياضي رمادي راقٍ', price: 850, colors: ['#D3D3D3', '#000000'], image: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=800', description: 'طقم ملابس مريحة من القطن السميك، سترة بقلنسوة وبنطال رياضي بلون رمادي.' },
      { id: 'm17', name: 'بلوفر ياقة مدورة أسود', price: 620, colors: ['#000000', '#808080'], image: 'https://images.unsplash.com/photo-1611937663641-525119044ee0?w=800', description: 'كنزة ياقة عالية سوداء (Turtleneck)، مصنوعة من الصوف الناعم، تعطي مظهراً غامضاً وأنيقاً.' },
      { id: 'm18', name: 'سترة طيار بياقة صوف', price: 1450, colors: ['#4B2C20', '#556B2F'], image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', description: 'جاكيت بومبر بأسلوب سترات الطيارين، بياقة من صوف الحمل الصناعي وجيوب كبيرة.' },
      { id: 'm19', name: 'قميص جينز أزرق داكن', price: 490, colors: ['#000080', '#ADD8E6'], image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800', description: 'قميص من الدينيم الثقيل بلون أزرق داكن، متين وعملي جداً لطلعات الكاجوال.' },
      { id: 'm20', name: 'بليزر رمادي بتصميم مودرن', price: 1150, colors: ['#A9A9A9', '#000000'], image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?w=800', description: 'جاكيت بليزر رمادي خفيف بتصميم عصري وبدون بطانة، يمنحك راحة وسهولة في الحركة.' }
    ],
    [CATEGORIES.ACCESSORIES]: [
      { id: 'ma1', name: 'ساعة كرونوغراف فولاذية', price: 4200, colors: ['#C0C0C0', '#000000'], image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800', description: 'ساعة رجالية من الفولاذ المقاوم للصدأ، تتميز بميناء أزرق داكن وخاصية الكرونوغراف.' },
      { id: 'ma2', name: 'حذاء أكسفورد جلد يدوي', price: 1800, colors: ['#4B2C20', '#000000'], image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800', description: 'حذاء رسمي من الجلد الطبيعي بلون بني محروق، مصنوع يدوياً بخياطة دقيقة.' },
      { id: 'ma3', name: 'حقيبة سفر جلدية كبيرة', price: 3800, colors: ['#8B4513', '#000000'], image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800', description: 'حقيبة سفر (Duffel) من الجلد البني الفاخر، تتسع لجميع مستلزماتك بأسلوب راقٍ.' },
      { id: 'ma4', name: 'ربطة عنق حريرية مخططة', price: 350, colors: ['#800000', '#000080'], image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800', description: 'كرافتة من الحرير الطبيعي 100% بلون أحمر غامق وخطوط زرقاء مائلة.' },
      { id: 'ma5', name: 'محفظة جلدية كلاسيكية', price: 450, colors: ['#000000', '#4B2C20'], image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', description: 'محفظة صغيرة الحجم من الجلد الطبيعي الأسود، بجيوب متعددة للبطاقات والعملات.' }
    ]
  }
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeGender, setActiveGender] = useState(GENDERS.WOMEN);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.FASHION);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const currentProducts = useMemo(() => PRODUCTS_DATA[activeGender][activeCategory] || [], [activeGender, activeCategory]);
  const isAccessoriesMode = activeCategory === CATEGORIES.ACCESSORIES;

  const addToCart = (product, size, color) => {
    setCart([...cart, { ...product, cartId: Date.now(), selectedSize: size, selectedColor: color }]);
    setToast({ show: true, message: 'تمت الإضافة إلى الحقيبة' });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isAccessoriesMode ? 'bg-stone-950 text-white' : 'bg-[#FAF8FF] text-stone-900'} font-sans antialiased`}>
      
      {}
      <nav className={`fixed top-0 w-full z-[100] backdrop-blur-md border-b transition-colors duration-500 ${isAccessoriesMode ? 'bg-black/80 border-stone-800' : 'bg-white/80 border-violet-100'} px-6 py-5 flex items-center justify-between`}>
        <div className="flex items-center gap-10">
          <button onClick={() => setShowAuthModal(true)} className="flex flex-col items-center group cursor-pointer">
            <h1 className={`text-3xl font-serif tracking-tighter uppercase transition-colors ${isAccessoriesMode ? 'text-white' : 'text-violet-950'}`}>elyanora</h1>
            <span className={`text-[7px] tracking-[0.6em] font-black -mt-1 ${isAccessoriesMode ? 'text-stone-500' : 'text-violet-400'}`}>COUTURE</span>
          </button>
          
          <div className={`hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] ${isAccessoriesMode ? 'text-stone-500' : 'text-violet-300'}`}>
            <button onClick={() => { setActiveGender(GENDERS.WOMEN); setActiveCategory(CATEGORIES.FASHION); }} className={`hover:text-violet-600 transition-all ${activeGender === GENDERS.WOMEN && activeCategory === CATEGORIES.FASHION ? 'text-violet-950 border-b border-current' : ''}`}>Lady</button>
            <button onClick={() => { setActiveGender(GENDERS.MEN); setActiveCategory(CATEGORIES.FASHION); }} className={`hover:text-violet-600 transition-all ${activeGender === GENDERS.MEN && activeCategory === CATEGORIES.FASHION ? 'text-violet-950 border-b border-current' : ''}`}>Gentleman</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setActiveCategory(CATEGORIES.FASHION)} className={`p-3 rounded-full flex items-center gap-2 transition-all ${activeCategory === CATEGORIES.FASHION ? 'bg-violet-950 text-white' : 'text-stone-400 hover:bg-stone-100'}`}>
            <Shirt size={18} /><span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block">Style</span>
          </button>
          <button onClick={() => setActiveCategory(CATEGORIES.ACCESSORIES)} className={`p-3 rounded-full flex items-center gap-2 transition-all ${activeCategory === CATEGORIES.ACCESSORIES ? 'bg-white text-black' : 'text-stone-400 hover:bg-white/10'}`}>
            <Gem size={18} /><span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block">Accessories</span>
          </button>
          <div className="w-[1px] h-6 bg-stone-200 mx-2"></div>
          <button onClick={() => setShowCart(true)} className="relative p-2 hover:scale-110 transition-transform"><ShoppingBag size={20} />{cart.length > 0 && <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}</button>
          <button onClick={() => setShowAuthModal(true)} className={`hidden md:block px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${isAccessoriesMode ? 'bg-white text-black hover:bg-stone-200' : 'bg-violet-950 text-white hover:bg-black'}`}>Account</button>
        </div>
      </nav>

      {}
      <header className="pt-40 pb-10 px-6 container mx-auto">
        <div className={`border-b pb-10 ${isAccessoriesMode ? 'border-stone-800' : 'border-violet-200'}`}>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-400 mb-4 block">New Season 2024</span>
          <h2 className="text-6xl font-serif tracking-tighter leading-none mb-4">
            {activeCategory === CATEGORIES.FASHION ? 'EDITORIAL STYLE' : 'PURE LUXURY'}
          </h2>
          <p className={`text-[10px] uppercase tracking-widest ${isAccessoriesMode ? 'text-stone-500' : 'text-stone-400'}`}>
            تم اختيار كل قطعة بعناية لتعكس أرقى معايير الجودة والأناقة العالمية.
          </p>
        </div>
      </header>

      {}
      <main className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {currentProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
            <div className={`aspect-[3/4] overflow-hidden relative mb-6 ${isAccessoriesMode ? 'bg-stone-900' : 'bg-violet-50'} rounded-sm shadow-sm`}>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            </div>
            <div className="flex justify-between items-start" dir="rtl">
              <div className="text-right">
                <h3 className="text-lg font-serif mb-1 group-hover:text-violet-600 transition-colors">{product.name}</h3>
                <p className="text-[9px] font-bold text-violet-400 uppercase tracking-widest">Handcrafted Excellence</p>
              </div>
              <span className="text-lg font-light">${product.price}</span>
            </div>
          </div>
        ))}
      </main>

      {}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />}
      {showCart && <Cart items={cart} onRemove={(id) => setCart(cart.filter(i => i.cartId !== id))} onClose={() => setShowCart(false)} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      
      {toast.show && (
        <div className="fixed bottom-10 right-10 z-[2000] bg-black text-white px-6 py-4 rounded shadow-2xl flex items-center gap-3 animate-in slide-in-from-right">
          <CheckCircle size={16} className="text-green-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{toast.message}</span>
        </div>
      )}

      {}
      <footer className={`py-20 px-6 mt-20 ${isAccessoriesMode ? 'bg-black text-stone-600' : 'bg-violet-950 text-violet-300/60'}`}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
             <p className="text-[9px] font-bold uppercase tracking-widest">© 2024 ELYANORA COUTURE.</p>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <h1 className="text-4xl font-serif text-white tracking-tighter uppercase">elyanora</h1>
          </div>
          <div className="flex justify-center md:justify-end gap-10 text-[9px] font-bold uppercase tracking-[0.3em] order-3">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white transition-colors">Vogue</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Inter:wght@300;400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        .font-serif { font-family: 'Bodoni Moda', serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #5b21b6; }
      `}</style>
    </div>
  );
};

const ProductModal = ({ product, onClose, onAdd }) => {
  const [size, setSize] = useState('M');
  const [color, setColor] = useState(product.colors?.[0] || '');

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-5xl flex flex-col md:flex-row h-full max-h-[90vh] overflow-hidden rounded-sm animate-in zoom-in-95 duration-500" dir="rtl">
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-white/80 hover:bg-black hover:text-white rounded-full transition-all"><X size={20}/></button>
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-stone-100">
          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        </div>
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-right overflow-y-auto">
          <p className="text-[10px] font-black text-violet-400 uppercase tracking-[0.5em] mb-4">ELYANORA EXCLUSIVE</p>
          <h2 className="text-4xl font-serif text-stone-900 mb-6">{product.name}</h2>
          <p className="text-stone-600 text-sm leading-relaxed mb-8 border-r-2 border-violet-100 pr-4">{product.description}</p>
          
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4 italic">الألوان المتوفرة:</p>
            <div className="flex gap-4 justify-start">
              {product.colors?.map(c => (
                <button key={c} onClick={() => setColor(c)} className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 shadow-sm ${color === c ? 'border-violet-600 scale-110' : 'border-white'}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4 italic">المقاس:</p>
            <div className="flex gap-2">
              {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                <button key={s} onClick={() => setSize(s)} className={`w-14 h-14 flex items-center justify-center border text-[10px] font-bold transition-all ${size === s ? 'bg-stone-900 text-white' : 'border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-900'}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-serif text-stone-950">${product.price}</span>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">السعر شامل الضريبة</span>
          </div>

          <button onClick={() => { onAdd(product, size, color); onClose(); }} className="w-full py-5 bg-violet-950 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all shadow-xl">إضافة إلى الحقيبة</button>
        </div>
      </div>
    </div>
  );
};

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [payMethod, setPayMethod] = useState('visa');

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white p-8 md:p-14 text-right overflow-y-auto max-h-[95vh] rounded-sm animate-in fade-in slide-in-from-bottom-10" dir="rtl">
        <button onClick={onClose} className="absolute top-6 right-6 text-stone-300 hover:text-black transition-colors"><X size={24}/></button>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-violet-950 mb-2">{isLogin ? 'دخول الأعضاء' : 'انضمام لعالم إليانورا'}</h2>
          <p className="text-[9px] text-stone-400 uppercase tracking-widest">Luxury is a privilege, style is an identity.</p>
          <div className="flex justify-center gap-8 mt-10 border-b border-stone-100 pb-4 text-[10px] font-bold uppercase tracking-widest">
            <button onClick={() => setIsLogin(false)} className={`transition-all pb-2 ${!isLogin ? 'text-violet-950 border-b-2 border-violet-950' : 'text-stone-300'}`}>إنشاء حساب</button>
            <button onClick={() => setIsLogin(true)} className={`transition-all pb-2 ${isLogin ? 'text-violet-950 border-b-2 border-violet-950' : 'text-stone-300'}`}>تسجيل الدخول</button>
          </div>
        </div>

        <div className="space-y-6">
          {!isLogin && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-[9px] font-bold uppercase tracking-widest text-stone-500">الاسم الكامل</label><input className="w-full border-b border-stone-200 py-3 outline-none text-sm focus:border-violet-600 transition-colors bg-stone-50/30 px-2" placeholder="أدخل اسمك الثلاثي" /></div>
                <div className="space-y-2"><label className="text-[9px] font-bold uppercase tracking-widest text-stone-500">البريد الإلكتروني</label><input className="w-full border-b border-stone-200 py-3 outline-none text-sm focus:border-violet-600 transition-colors bg-stone-50/30 px-2" placeholder="example@mail.com" /></div>
              </div>
              
              <div className="space-y-2"><label className="text-[9px] font-bold uppercase tracking-widest text-stone-500">عنوان التوصيل (المدينة، الحي، الشارع)</label><input className="w-full border-b border-stone-200 py-3 outline-none text-sm focus:border-violet-600 transition-colors bg-stone-50/30 px-2" placeholder="اكتب العنوان بالتفصيل لضمان سرعة الوصول" /></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-[9px] font-bold uppercase tracking-widest text-stone-500">رقم الهاتف</label><input className="w-full border-b border-stone-200 py-3 outline-none text-sm focus:border-violet-600 transition-colors bg-stone-50/30 px-2" placeholder="+966 ..." /></div>
                <div className="space-y-2"><label className="text-[9px] font-bold uppercase tracking-widest text-stone-500">كلمة المرور</label><input className="w-full border-b border-stone-200 py-3 outline-none text-sm focus:border-violet-600 transition-colors bg-stone-50/30 px-2" type="password" placeholder="••••••••" /></div>
              </div>
              
              <div className="pt-8 border-t border-stone-100 mt-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-violet-950 flex items-center gap-2"><CreditCard size={14}/> تفاصيل الدفع المفضلة:</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['visa', 'bank', 'paypal'].map(m => (
                    <button key={m} onClick={() => setPayMethod(m)} className={`flex-1 min-w-[120px] py-4 border rounded-sm text-[9px] font-bold uppercase tracking-widest transition-all ${payMethod === m ? 'bg-violet-950 text-white border-violet-950 shadow-lg' : 'text-stone-400 hover:border-violet-200'}`}>
                      {m === 'visa' && <><VisaIcon size={14} className="inline ml-2"/> Visa / Mastercard</>}
                      {m === 'bank' && <><Building size={14} className="inline ml-2"/> Bank Transfer</>}
                      {m === 'paypal' && <><Wallet size={14} className="inline ml-2"/> PayPal Account</>}
                    </button>
                  ))}
                </div>

                <div className="bg-stone-50/80 p-8 rounded-sm border border-stone-100 animate-in fade-in zoom-in-95 duration-300">
                  {payMethod === 'visa' && (
                    <div className="space-y-4">
                      <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm outline-none focus:border-violet-600" placeholder="Card Number (0000 0000 0000 0000)"/>
                      <div className="flex gap-4">
                        <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm outline-none focus:border-violet-600" placeholder="MM/YY"/>
                        <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm outline-none focus:border-violet-600" placeholder="CVV"/>
                      </div>
                    </div>
                  )}
                  {payMethod === 'bank' && (
                    <div className="space-y-4">
                      <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm outline-none focus:border-violet-600" placeholder="اسم البنك الرسمي"/>
                      <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm outline-none focus:border-violet-600" placeholder="رقم الحساب أو الآيبان (IBAN)"/>
                    </div>
                  )}
                  {payMethod === 'paypal' && (
                    <div className="space-y-2">
                      <p className="text-[10px] text-stone-400 mb-2">سيتم تحويلك إلى بوابة PayPal الآمنة لإتمام العملية.</p>
                      <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm outline-none focus:border-violet-600" placeholder="البريد الإلكتروني المسجل في PayPal"/>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {isLogin && (
            <div className="space-y-8 py-10">
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone-500">البريد الإلكتروني</label>
                <input className="w-full border-b border-stone-200 py-3 outline-none text-sm focus:border-violet-600 bg-stone-50/30 px-2" placeholder="example@mail.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone-500">كلمة المرور</label>
                <input className="w-full border-b border-stone-200 py-3 outline-none text-sm focus:border-violet-600 bg-stone-50/30 px-2" type="password" placeholder="••••••••" />
              </div>
              <div className="text-left">
                <a href="#" className="text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-violet-600 transition-colors">هل نسيت كلمة المرور؟</a>
              </div>
            </div>
          )}

          <button className="w-full py-5 bg-violet-950 text-white text-[10px] font-bold uppercase tracking-[0.4em] mt-8 hover:bg-black transition-all shadow-2xl active:scale-[0.98]">
            {isLogin ? 'تسجيل الدخول' : 'تأكيد العضوية الفاخرة'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = ({ items, onRemove, onClose }) => {
  const total = items.reduce((a, b) => a + b.price, 0);
  return (
    <div className="fixed inset-0 z-[2000] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-10 animate-in slide-in-from-right duration-500" dir="rtl">
        <div className="flex justify-between items-center mb-10 border-b pb-6">
          <h3 className="text-2xl font-serif">حقيبة التسوق</h3>
          <button onClick={onClose} className="hover:rotate-90 transition-transform"><X/></button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-8 pr-2">
          {items.map(i => (
            <div key={i.cartId} className="flex gap-6 items-center animate-in slide-in-from-left">
              <img src={i.image} className="w-24 h-32 object-cover rounded-sm shadow-md" />
              <div className="flex-1 text-right">
                <h4 className="font-serif text-lg leading-tight mb-1">{i.name}</h4>
                <div className="flex gap-2 items-center mb-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: i.selectedColor}}></div>
                   <p className="text-[10px] text-stone-400 uppercase tracking-widest">{i.selectedSize}</p>
                </div>
                <p className="font-serif text-violet-900">${i.price}</p>
              </div>
              <button onClick={() => onRemove(i.cartId)} className="text-stone-300 hover:text-red-600 transition-colors p-2"><Trash2 size={18}/></button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-30 italic">
               <ShoppingBag size={48} className="mb-4" />
               <p className="text-[10px] font-bold uppercase tracking-widest">الحقيبة فارغة تماماً</p>
            </div>
          )}
        </div>
        <div className="border-t pt-10 mt-6">
          <div className="flex justify-between text-2xl font-serif mb-8">
            <span>الإجمالي التقريبي:</span>
            <span>${total}</span>
          </div>
          <button className="w-full py-5 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-violet-950 transition-all shadow-xl disabled:opacity-50" disabled={items.length === 0}>
            إتمام عملية الشراء
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;