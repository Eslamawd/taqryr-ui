"use client";

import { Users, Building2, Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Users",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
    value: "1200",
    desc: "200 new this month",
  },
  {
    id: 2,
    title: "Company",
    icon: <Building2 className="h-4 w-4 text-muted-foreground" />,
    value: "85",
    desc: "5 added this month",
  },
  {
    id: 3,
    title: "Jobs",
    icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
    value: "320",
    desc: "50 posted this month",
  },
];

function Page() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.3 } }, // يخليهم يدخلوا واحد ورا التاني
      }}
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          variants={{
            hidden: { opacity: 0, x: -50 }, // يبدأ من الشمال
            show: { opacity: 1, x: 0 }, // يدخل مكانه
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {card.icon}
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                className="text-2xl font-bold"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {card.value}
              </motion.div>
              <p className="text-xs text-gray-500">{card.desc}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Page;
