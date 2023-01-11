
export enum Categories{
  ELECTRONICS= "Electronics",
  REAL_ESTATE = "Real Estate",
  PETS = "Pets",
  APPLIANCES = "Appliances",
  AUTO_MOBILE = "Auto Mobiles",
  JOBS= "Jobs",
  SERVICES = "Services",
}
export type Category = {
  title: string;
  icon: string;
}
export const CategoriesList = [
  {title: Categories.ELECTRONICS, icon: "/assets/categories/electronics.svg"},
  {title: Categories.REAL_ESTATE, icon: "/assets/categories/real_estate.svg"},
  {title: Categories.PETS, icon: "/assets/categories/pets.svg"},
  {title: Categories.APPLIANCES, icon: "/assets/categories/appliances.svg"},
  {title: Categories.AUTO_MOBILE, icon: "/assets/categories/automobile.svg"},
  {title: Categories.JOBS, icon: "/assets/categories/jobs.svg"},
  {title: Categories.SERVICES, icon: "/assets/categories/services.svg"},
]
