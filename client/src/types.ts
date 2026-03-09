export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  studentName: string;
  items: OrderItem[];
  pickupCode?: string;
  plateNumber?: number;
  assignedStaff?: number | null;
  status: "pending" | "preparing" | "ready" | "picked-up";
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalOrders: number;
  papersSaved: number;
  treesEquivalent: string;
  activeOrders: number;
}
