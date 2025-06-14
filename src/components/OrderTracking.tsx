
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Search, Eye, Download, Truck } from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: 'en-attente' | 'confirmee' | 'preparee' | 'expediee' | 'livree';
  total: number;
  items: number;
  trackingNumber?: string;
}

const OrderTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Données simulées - à remplacer par l'API WooCommerce
  const mockOrders: Order[] = [
    {
      id: "CMD-2024-001",
      date: "2024-01-15",
      status: "expediee",
      total: 2340.50,
      items: 15,
      trackingNumber: "FR123456789"
    },
    {
      id: "CMD-2024-002",
      date: "2024-01-12",
      status: "livree",
      total: 890.00,
      items: 8,
      trackingNumber: "FR987654321"
    },
    {
      id: "CMD-2024-003",
      date: "2024-01-10",
      status: "preparee",
      total: 1560.75,
      items: 12
    },
    {
      id: "CMD-2024-004",
      date: "2024-01-08",
      status: "confirmee",
      total: 445.20,
      items: 6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-attente': return 'bg-yellow-100 text-yellow-800';
      case 'confirmee': return 'bg-blue-100 text-blue-800';
      case 'preparee': return 'bg-purple-100 text-purple-800';
      case 'expediee': return 'bg-orange-100 text-orange-800';
      case 'livree': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en-attente': return 'En attente';
      case 'confirmee': return 'Confirmée';
      case 'preparee': return 'Préparée';
      case 'expediee': return 'Expédiée';
      case 'livree': return 'Livrée';
      default: return status;
    }
  };

  const filteredOrders = mockOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentOrders = filteredOrders.slice(0, 5);
  const allOrders = filteredOrders;

  const OrderCard = ({ order }: { order: Order }) => (
    <Card key={order.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{order.id}</CardTitle>
          <Badge className={getStatusColor(order.status)}>
            {getStatusLabel(order.status)}
          </Badge>
        </div>
        <CardDescription>
          Commandé le {new Date(order.date).toLocaleDateString('fr-FR')}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {order.items} article(s)
            </span>
            <span className="font-bold text-lg">
              {order.total.toFixed(2)}€
            </span>
          </div>
          
          {order.trackingNumber && (
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">Suivi:</span>
              <span className="font-mono">{order.trackingNumber}</span>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              Facture
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Suivi des Commandes</h2>
        <p className="text-gray-600 mb-6">
          Consultez l'état de vos commandes en temps réel
        </p>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par n° commande ou suivi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="recent">Commandes récentes</TabsTrigger>
          <TabsTrigger value="all">Toutes les commandes</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {recentOrders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune commande trouvée
              </h3>
              <p className="text-gray-600">
                Aucune commande ne correspond à votre recherche
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {allOrders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune commande
              </h3>
              <p className="text-gray-600">
                Vous n'avez pas encore passé de commande
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">
          Informations de livraison
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Livraison gratuite dès 500€ d'achat</li>
          <li>• Délai de livraison : 2-3 jours ouvrés</li>
          <li>• Suivi en temps réel disponible</li>
          <li>• Livraison en point relais ou à domicile</li>
        </ul>
      </div>
    </div>
  );
};

export default OrderTracking;
