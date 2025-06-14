
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, TrendingUp, Users } from "lucide-react";
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";
import ProductCatalog from "@/components/ProductCatalog";
import Cart from "@/components/Cart";
import OrderTracking from "@/components/OrderTracking";

const Index = () => {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === productId 
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleLogin = (credentials) => {
    // Ici on connecterait à l'API WooCommerce
    console.log('Connexion:', credentials);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header 
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setShowAuthModal(true)}
          cartItemsCount={0}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Espace Grossiste GSM.ma
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Votre plateforme B2B pour l'achat en gros de produits GSM
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Se connecter
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle>Commandes Faciles</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interface simple pour passer vos commandes rapidement
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Package className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Suivi en Temps Réel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Suivez vos commandes de la validation à la livraison
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <CardTitle>Tarifs Grossiste</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bénéficiez de prix préférentiels selon vos volumes
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-2" />
                <CardTitle>Support Dédié</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Un accompagnement personnalisé pour vos besoins
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'catalogue':
        return <ProductCatalog onAddToCart={addToCart} />;
      case 'panier':
        return <Cart items={cartItems} onUpdateQuantity={updateCartQuantity} />;
      case 'commandes':
        return <OrderTracking />;
      default:
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tableau de Bord Grossiste
              </h2>
              <p className="text-gray-600">
                Bienvenue dans votre espace B2B GSM.ma
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('catalogue')}>
                <CardHeader>
                  <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Catalogue Produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Parcourez nos produits GSM avec tarifs grossiste
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('commandes')}>
                <CardHeader>
                  <Package className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Mes Commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Suivez l'état de vos commandes en cours
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('panier')}>
                <CardHeader>
                  <ShoppingCart className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Mon Panier</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {cartItems.length} article(s) dans votre panier
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setShowAuthModal(true)}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      {renderPage()}
    </div>
  );
};

export default Index;
