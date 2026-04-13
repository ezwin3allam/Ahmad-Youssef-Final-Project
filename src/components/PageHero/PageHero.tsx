import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const gradients: Record<string, string> = {
  green: "from-green-600 via-green-500 to-green-400",
  purple: "from-violet-600 via-violet-500 to-purple-400",
};

export default function PageHero({
  breadcrumb,
  title,
  subtitle,
  icon: Icon,
  iconClass,
  variant = "green",
}: {
  breadcrumb: string;
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  iconClass?: string;
  variant?: "green" | "purple";
}) {
  return (
    <div className={cn("bg-gradient-to-br min-h-[240px] flex items-center", gradients[variant])}>
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{breadcrumb}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-white/30 flex items-center justify-center">
            {iconClass ? (
              <i className={`${iconClass} text-white text-3xl`} />
            ) : Icon ? (
              <Icon className="size-8 text-white" />
            ) : null}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-white/80 mt-1 text-sm">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
