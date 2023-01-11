
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
  {title: Categories.ELECTRONICS, icon: "src/assets/categories/electronics.svg"},
  {title: Categories.REAL_ESTATE, icon: "src/assets/categories/real_estate.svg"},
  {title: Categories.PETS, icon: "src/assets/categories/pets.svg"},
  {title: Categories.APPLIANCES, icon: "src/assets/categories/appliances.svg"},
  {title: Categories.AUTO_MOBILE, icon: "src/assets/categories/automobile.svg"},
  {title: Categories.JOBS, icon: "src/assets/categories/jobs.svg"},
  {title: Categories.SERVICES, icon: "src/assets/categories/services.svg"},
]
