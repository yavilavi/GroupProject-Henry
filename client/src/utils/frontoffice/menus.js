export const FRONT_OFFICE_MENU = [
  {
    title: 'Account PRO',
    icon: 'chess-knight text-warning',
    tree: false,
    nameSpace: 'client',
    path: 'pro',
    promoLabel: 'New',
    PromoLabelVariant: 'warning',
  },
  {
    title: 'Wallet',
    icon: 'wallet',
    tree: false,
    nameSpace: 'client',
    path: 'wallet',
  },
  {
    title: 'Budget',
    icon: 'file-contract',
    tree: false,
    nameSpace: 'client',
    path: 'budget',
  },
  {
    title: 'Movements',
    icon: 'hand-holding-usd',
    nameSpace: 'client',
    activeStateName: 'movmActive',
    tree: [
      { title: 'Incomes', icon: 'file-invoice', path: 'income' },
      { title: 'Expenses', icon: 'file-invoice', path: 'expense' },
      { title: 'Transfers', icon: 'file-alt', path: 'transfer' },
    ],
  },
  {
    title: 'Reports',
    icon: 'chart-line',
    tree: false,
    nameSpace: 'client',
    path: 'reports',
  },
  {
    title: 'Shop',
    icon: 'shopping-cart',
    nameSpace: 'client',
    activeStateName: 'shopmActive',
    tree: [
      { title: 'Invoices', icon: 'file-invoice', path: 'invoices' },
      { title: 'Services', icon: 'box', path: 'services' },
    ],
  },
  {
    title: 'Order',
    icon: 'file-invoice-dollar',
    tree: false,
    nameSpace: 'client',
    path: 'orders',
  },
  {
    title: 'Profile',
    icon: 'user-tie',
    tree: false,
    nameSpace: 'client',
    path: 'profile',
  },
];

export const BACK_OFFICE_MENU = [
  {
    title: 'Orders',
    tree: false,
    icon: 'file-invoice-dollar',
    requiredPermission: 'MENU_ORDERS',
    nameSpace: 'admin',
    path: 'orders',
  },
  {
    title: 'Customers',
    tree: false,
    icon: 'users',
    requiredPermission: 'MENU_CUSTOMERS',
    nameSpace: 'admin',
    path: 'customers',
  },
  {
    title: 'Profile',
    icon: 'user-tie',
    requiredPermission: '*',
    tree: false,
    nameSpace: 'admin',
    path: 'profile',
  },
];