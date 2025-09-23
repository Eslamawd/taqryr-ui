import { Categories } from "@/components/Categories";
import { Hero } from "@/components/Hero";
import SubscriptionPlans from "@/components/SubscriptionPlans";
export default function Home() {
  return (
    <>
      <Hero />
      <SubscriptionPlans />
      <Categories />
    </>
  );
}
