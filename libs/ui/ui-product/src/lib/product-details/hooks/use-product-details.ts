// hooks/useProductDetails.ts
import { useEffect, useState } from 'react';
import { getProductById, deleteProduct } from '../service/product-service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Product } from '@nextcart/models';
import { useNavigate } from 'react-router-dom';

export function useProductDetails(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  // Fetch prodotto
  useEffect(() => {
    setLoading(true);
    getProductById(productId)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [productId]);

  // Apertura/chiusura modale
  const confirmDelete = () => setShowDeleteModal(true);
  const cancelDelete = () => setShowDeleteModal(false);

  // Eliminazione prodotto
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(productId);
      navigate('/products');
    } catch (err) {
      console.error('Errore durante eliminazione:', err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return {
    product,
    loading,
    showDeleteModal,
    isDeleting,
    confirmDelete,
    cancelDelete,
    handleDelete,
  };
}
