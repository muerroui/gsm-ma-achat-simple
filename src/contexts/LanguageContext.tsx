
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'ar';

interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
  };
}

const translations: Translations = {
  // Header
  'header.title': {
    fr: 'GSM.ma',
    ar: 'GSM.ma'
  },
  'header.wholesale': {
    fr: 'Grossiste',
    ar: 'تاجر جملة'
  },
  'header.home': {
    fr: 'Accueil',
    ar: 'الرئيسية'
  },
  'header.catalog': {
    fr: 'Catalogue',
    ar: 'الكتالوج'
  },
  'header.orders': {
    fr: 'Commandes',
    ar: 'الطلبات'
  },
  'header.cart': {
    fr: 'Panier',
    ar: 'السلة'
  },
  'header.login': {
    fr: 'Se connecter',
    ar: 'تسجيل الدخول'
  },
  
  // Auth Modal
  'auth.title': {
    fr: 'Connexion Grossiste',
    ar: 'تسجيل دخول تاجر الجملة'
  },
  'auth.subtitle': {
    fr: 'Accès Espace B2B',
    ar: 'الوصول إلى مساحة B2B'
  },
  'auth.description': {
    fr: 'Connectez-vous avec vos identifiants grossiste',
    ar: 'سجل الدخول باستخدام بيانات تاجر الجملة'
  },
  'auth.email': {
    fr: 'Email',
    ar: 'البريد الإلكتروني'
  },
  'auth.password': {
    fr: 'Mot de passe',
    ar: 'كلمة المرور'
  },
  'auth.connecting': {
    fr: 'Connexion...',
    ar: 'جاري الاتصال...'
  },
  'auth.connect': {
    fr: 'Se connecter',
    ar: 'تسجيل الدخول'
  },
  'auth.cancel': {
    fr: 'Annuler',
    ar: 'إلغاء'
  },
  'auth.noAccount': {
    fr: 'Pas encore de compte grossiste ?',
    ar: 'ليس لديك حساب تاجر جملة؟'
  },
  'auth.requestAccess': {
    fr: 'Demander un accès B2B',
    ar: 'طلب وصول B2B'
  },
  
  // Home page
  'home.title': {
    fr: 'Espace Grossiste GSM.ma',
    ar: 'مساحة تاجر الجملة GSM.ma'
  },
  'home.subtitle': {
    fr: 'Votre plateforme B2B pour l\'achat en gros de produits GSM',
    ar: 'منصة B2B الخاصة بك لشراء منتجات GSM بالجملة'
  },
  'home.easyOrders': {
    fr: 'Commandes Faciles',
    ar: 'طلبات سهلة'
  },
  'home.easyOrdersDesc': {
    fr: 'Interface simple pour passer vos commandes rapidement',
    ar: 'واجهة بسيطة لتقديم طلباتك بسرعة'
  },
  'home.realTimeTracking': {
    fr: 'Suivi en Temps Réel',
    ar: 'تتبع في الوقت الفعلي'
  },
  'home.realTimeTrackingDesc': {
    fr: 'Suivez vos commandes de la validation à la livraison',
    ar: 'تتبع طلباتك من التأكيد إلى التسليم'
  },
  'home.wholesalePrices': {
    fr: 'Tarifs Grossiste',
    ar: 'أسعار الجملة'
  },
  'home.wholesalePricesDesc': {
    fr: 'Bénéficiez de prix préférentiels selon vos volumes',
    ar: 'استفد من أسعار تفضيلية حسب كمياتك'
  },
  'home.dedicatedSupport': {
    fr: 'Support Dédié',
    ar: 'دعم مخصص'
  },
  'home.dedicatedSupportDesc': {
    fr: 'Un accompagnement personnalisé pour vos besoins',
    ar: 'مرافقة شخصية لاحتياجاتك'
  },
  'home.dashboard': {
    fr: 'Tableau de Bord Grossiste',
    ar: 'لوحة تحكم تاجر الجملة'
  },
  'home.welcome': {
    fr: 'Bienvenue dans votre espace B2B GSM.ma',
    ar: 'مرحباً بك في مساحة B2B الخاصة بك GSM.ma'
  },
  'home.productCatalog': {
    fr: 'Catalogue Produits',
    ar: 'كتالوج المنتجات'
  },
  'home.productCatalogDesc': {
    fr: 'Parcourez nos produits GSM avec tarifs grossiste',
    ar: 'تصفح منتجات GSM الخاصة بنا بأسعار الجملة'
  },
  'home.myOrders': {
    fr: 'Mes Commandes',
    ar: 'طلباتي'
  },
  'home.myOrdersDesc': {
    fr: 'Suivez l\'état de vos commandes en cours',
    ar: 'تتبع حالة طلباتك الجارية'
  },
  'home.myCart': {
    fr: 'Mon Panier',
    ar: 'سلتي'
  },
  'home.cartItems': {
    fr: 'article(s) dans votre panier',
    ar: 'منتج في سلتك'
  },
  
  // Product Catalog
  'catalog.title': {
    fr: 'Catalogue Produits',
    ar: 'كتالوج المنتجات'
  },
  'catalog.subtitle': {
    fr: 'Découvrez nos produits GSM avec tarifs préférentiels grossiste',
    ar: 'اكتشف منتجات GSM الخاصة بنا بأسعار تفضيلية للجملة'
  },
  'catalog.search': {
    fr: 'Rechercher un produit...',
    ar: 'البحث عن منتج...'
  },
  'catalog.category': {
    fr: 'Catégorie',
    ar: 'الفئة'
  },
  'catalog.allCategories': {
    fr: 'Toutes catégories',
    ar: 'جميع الفئات'
  },
  'catalog.smartphones': {
    fr: 'Smartphones',
    ar: 'الهواتف الذكية'
  },
  'catalog.accessories': {
    fr: 'Accessoires',
    ar: 'الاكسسوارات'
  },
  'catalog.tablets': {
    fr: 'Tablettes',
    ar: 'الأجهزة اللوحية'
  },
  'catalog.publicPrice': {
    fr: 'Prix public:',
    ar: 'السعر العام:'
  },
  'catalog.stock': {
    fr: 'Stock:',
    ar: 'المخزون:'
  },
  'catalog.units': {
    fr: 'unités',
    ar: 'وحدة'
  },
  'catalog.minQuantity': {
    fr: 'Quantité min:',
    ar: 'الكمية الدنيا:'
  },
  'catalog.pieces': {
    fr: 'pcs',
    ar: 'قطعة'
  },
  'catalog.addToCart': {
    fr: 'Ajouter au panier',
    ar: 'أضف إلى السلة'
  },
  'catalog.outOfStock': {
    fr: 'Rupture de stock',
    ar: 'نفدت الكمية'
  },
  'catalog.noProducts': {
    fr: 'Aucun produit trouvé pour votre recherche',
    ar: 'لم يتم العثور على منتجات لبحثك'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translation[language] || translation.fr || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
