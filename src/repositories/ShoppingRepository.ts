import { GroceryModel, ShoppingModel, InventoryModel } from '../types/calendar';

const initialGroceries: GroceryModel[] = [
  {
    id: 'gro-1',
    itemName: 'Daging Ayam Kampung',
    category: 'Daging',
    quantity: 1,
    unit: 'kg',
    priority: 'High',
    status: 'Belum Dibeli',
  },
  {
    id: 'gro-2',
    itemName: 'Wortel Organik & Kentang',
    category: 'Sayur',
    quantity: 2,
    unit: 'kg',
    priority: 'High',
    status: 'Belum Dibeli',
  },
  {
    id: 'gro-3',
    itemName: 'Susu UHT Cokelat Anak',
    category: 'Minuman',
    quantity: 1,
    unit: 'Karton (12 pcs)',
    priority: 'Medium',
    status: 'Sudah Dibeli',
  },
  {
    id: 'gro-4',
    itemName: 'Bawang Merah & Bawang Putih',
    category: 'Bumbu',
    quantity: 500,
    unit: 'gram',
    priority: 'High',
    status: 'Belum Dibeli',
  },
];

const initialShoppingPlans: ShoppingModel[] = [
  {
    id: 'shp-1',
    title: 'Belanja Mingguan Supermarket & Pasar Segar',
    scheduleDate: '2026-08-08',
    estimatedBudget: 450000,
    actualSpent: 0,
    status: 'Rencana',
    itemIds: ['gro-1', 'gro-2', 'gro-4'],
  },
];

const initialInventory: InventoryModel[] = [
  {
    id: 'inv-1',
    itemName: 'Minyak Goreng Sawit',
    category: 'Kebutuhan Rumah',
    quantity: 2,
    unit: 'Liter',
    purchaseDate: '2026-08-01',
    expiredDate: '2027-08-01',
    lowStockThreshold: 1,
  },
  {
    id: 'inv-2',
    itemName: 'Telor Ayam Negeri',
    category: 'Daging',
    quantity: 8,
    unit: 'Butir',
    purchaseDate: '2026-08-02',
    expiredDate: '2026-08-16',
    lowStockThreshold: 10, // Stock alert!
  },
  {
    id: 'inv-3',
    itemName: 'Beras Pandan Wangi',
    category: 'Kebutuhan Rumah',
    quantity: 10,
    unit: 'kg',
    purchaseDate: '2026-07-25',
    expiredDate: '2027-01-25',
    lowStockThreshold: 3,
  },
];

export class ShoppingRepository {
  private groceries: GroceryModel[] = [...initialGroceries];
  private shoppingPlans: ShoppingModel[] = [...initialShoppingPlans];
  private inventory: InventoryModel[] = [...initialInventory];

  async getGroceries(): Promise<GroceryModel[]> {
    return this.groceries;
  }

  async addGrocery(item: Omit<GroceryModel, 'id'>): Promise<GroceryModel> {
    const newItem: GroceryModel = { ...item, id: `gro-${Date.now()}` };
    this.groceries.unshift(newItem);
    return newItem;
  }

  async toggleGroceryStatus(id: string): Promise<GroceryModel | undefined> {
    const item = this.groceries.find((g) => g.id === id);
    if (item) {
      item.status = item.status === 'Belum Dibeli' ? 'Sudah Dibeli' : 'Belum Dibeli';
    }
    return item;
  }

  async getShoppingPlans(): Promise<ShoppingModel[]> {
    return this.shoppingPlans;
  }

  async addShoppingPlan(plan: Omit<ShoppingModel, 'id'>): Promise<ShoppingModel> {
    const newPlan: ShoppingModel = { ...plan, id: `shp-${Date.now()}` };
    this.shoppingPlans.unshift(newPlan);
    return newPlan;
  }

  async getInventory(): Promise<InventoryModel[]> {
    return this.inventory;
  }

  async addInventoryItem(item: Omit<InventoryModel, 'id'>): Promise<InventoryModel> {
    const newItem: InventoryModel = { ...item, id: `inv-${Date.now()}` };
    this.inventory.unshift(newItem);
    return newItem;
  }
}
