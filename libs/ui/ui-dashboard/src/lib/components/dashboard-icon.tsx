import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHeart,
  faUtensils,
  faUsers,
  faShoppingCart,
  faBicycle,
  faWeightScale,
  faChartBar,
  faChartLine,
  faChartArea,
  faPlus,
  faReceipt,
  faCartArrowDown,
  faShoppingBag,
  faCheck,
  faBarcode
} from '@fortawesome/free-solid-svg-icons';

const iconMap: Record<string, any> = {
  'user-profile': faUser,
  heart: faHeart,
  cutlery: faUtensils,
  group: faUsers,
  'shopping-cart': faShoppingCart,
  bicycle: faBicycle,
  scale: faWeightScale,
  'bar-chart': faChartBar,
  'line-chart': faChartLine,
  'trend-up': faChartArea,
  'add': faPlus,
  'receipt': faReceipt,
  'cart-arrow-down': faCartArrowDown,
  'shopping-bag': faShoppingBag,
  'check': faCheck,
  'barcode': faBarcode
};

interface DashboardIconProps {
  iconName: string;
  className?: string;
}

export function DashboardIcon({ iconName, className }: DashboardIconProps) {
  const faIcon = iconMap[iconName] || faUser;
  return <FontAwesomeIcon icon={faIcon} className={className} />;
}
