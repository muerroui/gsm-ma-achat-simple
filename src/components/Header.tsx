
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Package, Home, LayoutGrid, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  cartItemsCount: number;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header = ({ isAuthenticated, onLoginClick, cartItemsCount, currentPage, onPageChange }: HeaderProps) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">{t('header.title')}</h1>
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {t('header.wholesale')}
              </span>
            </div>
            
            {isAuthenticated && (
              <nav className="flex space-x-6">
                <Button
                  variant={currentPage === 'accueil' ? 'default' : 'ghost'}
                  onClick={() => onPageChange('accueil')}
                  className="flex items-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>{t('header.home')}</span>
                </Button>
                
                <Button
                  variant={currentPage === 'catalogue' ? 'default' : 'ghost'}
                  onClick={() => onPageChange('catalogue')}
                  className="flex items-center space-x-2"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>{t('header.catalog')}</span>
                </Button>
                
                <Button
                  variant={currentPage === 'commandes' ? 'default' : 'ghost'}
                  onClick={() => onPageChange('commandes')}
                  className="flex items-center space-x-2"
                >
                  <Package className="h-4 w-4" />
                  <span>{t('header.orders')}</span>
                </Button>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Languages className="h-4 w-4 text-gray-600" />
              <Select value={language} onValueChange={(value: 'fr' | 'ar') => setLanguage(value)}>
                <SelectTrigger className="w-[80px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="fr">FR</SelectItem>
                  <SelectItem value="ar">AR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isAuthenticated ? (
              <Button
                variant={currentPage === 'panier' ? 'default' : 'outline'}
                onClick={() => onPageChange('panier')}
                className="relative flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{t('header.cart')}</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            ) : (
              <Button onClick={onLoginClick}>
                {t('header.login')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
