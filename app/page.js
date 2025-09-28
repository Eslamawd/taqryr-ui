import { Categories } from "@/components/Categories";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import UsersCounterSection from "@/components/UsersCounterSection";
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <UsersCounterSection />
      <TestimonialsCarousel />
      <SubscriptionPlans />
      <Categories />
    </>
  );
}
