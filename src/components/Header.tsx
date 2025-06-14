
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Home, LayoutGrid } from "lucide-react";

interface HeaderProps {
  isAuthenticated: boolean;
  onLoginClick: () => void;
  cartItemsCount: number;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header = ({ isAuthenticated, onLoginClick, cartItemsCount, currentPage, onPageChange }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">GSM.ma</h1>
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Grossiste
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
                  <span>Accueil</span>
                </Button>
                
                <Button
                  variant={currentPage === 'catalogue' ? 'default' : 'ghost'}
                  onClick={() => onPageChange('catalogue')}
                  className="flex items-center space-x-2"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>Catalogue</span>
                </Button>
                
                <Button
                  variant={currentPage === 'commandes' ? 'default' : 'ghost'}
                  onClick={() => onPageChange('commandes')}
                  className="flex items-center space-x-2"
                >
                  <Package className="h-4 w-4" />
                  <span>Commandes</span>
                </Button>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button
                variant={currentPage === 'panier' ? 'default' : 'outline'}
                onClick={() => onPageChange('panier')}
                className="relative flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Panier</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            ) : (
              <Button onClick={onLoginClick}>
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
