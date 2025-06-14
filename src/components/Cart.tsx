
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  wholesalePrice: number;
  quantity: number;
  minQuantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const Cart = ({ items, onUpdateQuantity }: CartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.wholesalePrice * item.quantity), 0);
  };

  const calculateTotalDiscount = () => {
    return items.reduce((sum, item) => {
      const publicTotal = item.price * item.quantity;
      const wholesaleTotal = item.wholesalePrice * item.quantity;
      return sum + (publicTotal - wholesaleTotal);
    }, 0);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulation d'envoi à l'API WooCommerce
    setTimeout(() => {
      console.log('Commande envoyée:', items);
      alert('Commande confirmée ! Vous recevrez un email de confirmation.');
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-6">
            Ajoutez des produits depuis le catalogue pour commencer votre commande
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Voir le catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Mon Panier</h2>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                    <img 
                      src="/placeholder.svg" 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-green-600 font-bold">
                        {item.wholesalePrice}€
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {item.price}€
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Grossiste
                      </Badge>
                    </div>
                    {item.quantity < item.minQuantity && (
                      <p className="text-sm text-orange-600 mt-1">
                        Quantité minimale: {item.minQuantity} pièces
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-20 text-center"
                      min="1"
                    />
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, 0)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {(item.wholesalePrice * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Récapitulatif de commande</CardTitle>
              <CardDescription>
                {items.length} article(s) dans votre panier
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{calculateSubtotal().toFixed(2)}€</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>Remise grossiste:</span>
                  <span>-{calculateTotalDiscount().toFixed(2)}€</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total TTC:</span>
                  <span>{calculateSubtotal().toFixed(2)}€</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                <p className="font-medium text-blue-800 mb-1">
                  Avantages grossiste:
                </p>
                <ul className="space-y-1">
                  <li>• Livraison gratuite dès 500€</li>
                  <li>• Paiement à 30 jours</li>
                  <li>• Support dédié</li>
                </ul>
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Traitement..." : "Valider la commande"}
              </Button>
              
              <Button variant="outline" className="w-full">
                Continuer les achats
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
