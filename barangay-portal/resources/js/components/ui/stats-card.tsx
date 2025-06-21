import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: LucideIcon;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    className?: string;
}

export function StatsCard({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend, 
    className 
}: StatsCardProps) {
    return (
        <Card className={cn("transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer shadow-sm border-0 bg-card", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</CardTitle>
                {Icon && (
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                )}
            </CardHeader>
            <CardContent className="pt-2">
                <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{value}</div>
                {(description || trend) && (
                    <p className="text-sm text-muted-foreground">
                        {trend && (
                            <span className={cn(
                                "font-semibold",
                                trend.isPositive ? "text-green-600" : "text-red-600"
                            )}>
                                {trend.isPositive ? "+" : ""}{trend.value}
                            </span>
                        )}
                        {description && (
                            <>
                                {trend && " "}
                                {description}
                            </>
                        )}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
