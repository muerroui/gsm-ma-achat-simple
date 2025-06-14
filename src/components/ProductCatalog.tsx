
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number;
  image: string;
  category: string;
  stock: number;
  minQuantity: number;
}

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
}

const ProductCatalog = ({ onAddToCart }: ProductCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { t } = useLanguage();

  // Données simulées - à remplacer par l'API WooCommerce
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      description: "Smartphone Apple dernière génération",
      price: 1299,
      wholesalePrice: 1150,
      image: "/placeholder.svg",
      category: "smartphones",
      stock: 50,
      minQuantity: 5
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      description: "Smartphone Samsung haut de gamme",
      price: 1199,
      wholesalePrice: 1050,
      image: "/placeholder.svg",
      category: "smartphones",
      stock: 30,
      minQuantity: 3
    },
    {
      id: 3,
      name: "Coque iPhone 15 Pro",
      description: "Protection transparente renforcée",
      price: 25,
      wholesalePrice: 15,
      image: "/placeholder.svg",
      category: "accessoires",
      stock: 200,
      minQuantity: 10
    },
    {
      id: 4,
      name: "Chargeur USB-C 65W",
      description: "Chargeur rapide universel",
      price: 35,
      wholesalePrice: 22,
      image: "/placeholder.svg",
      category: "accessoires",
      stock: 150,
      minQuantity: 5
    }
  ];

  const categories = [
    { value: "all", label: t('catalog.allCategories') },
    { value: "smartphones", label: t('catalog.smartphones') },
    { value: "accessoires", label: t('catalog.accessories') },
    { value: "tablettes", label: t('catalog.tablets') }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateDiscount = (price: number, wholesalePrice: number) => {
    return Math.round(((price - wholesalePrice) / price) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('catalog.title')}</h2>
        <p className="text-gray-600 mb-6">
          {t('catalog.subtitle')}
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('catalog.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder={t('catalog.category')} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="text-sm">
                {product.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">
                      {product.wholesalePrice}€
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      -{calculateDiscount(product.price, product.wholesalePrice)}%
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500 line-through">
                    {t('catalog.publicPrice')} {product.price}€
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-600">
                <p>{t('catalog.stock')} {product.stock} {t('catalog.units')}</p>
                <p>{t('catalog.minQuantity')} {product.minQuantity} {t('catalog.pieces')}</p>
              </div>

              <Button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? t('catalog.outOfStock') : t('catalog.addToCart')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {t('catalog.noProducts')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
