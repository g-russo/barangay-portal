import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, UserPlus, FileText, Calendar, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface QuickAction {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

const quickActions: QuickAction[] = [
    {
        title: 'Add Resident',
        href: '/residents/create',
        icon: UserPlus,
        color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
        title: 'New Document',
        href: '/documents/create', 
        icon: FileText,
        color: 'bg-green-500 hover:bg-green-600',
    },
    {
        title: 'Create Event',
        href: '/events/create',
        icon: Calendar,
        color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
        title: 'Report Issue',
        href: '/complaints/create',
        icon: AlertTriangle,
        color: 'bg-orange-500 hover:bg-orange-600',
    },
];

export function FloatingActionButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {/* Quick Actions Menu */}
            {isOpen && (
                <div className="mb-6 space-y-3">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <div
                                key={action.title}
                                className="transform transition-all duration-300 ease-out"
                                style={{
                                    transform: `translateY(${isOpen ? 0 : 20}px)`,
                                    opacity: isOpen ? 1 : 0,
                                    transitionDelay: `${index * 75}ms`,
                                }}
                            >
                                <Card className="shadow-xl border-0 bg-white dark:bg-gray-800">
                                    <CardContent className="p-0">
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className="w-full justify-start p-5 h-auto hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Link href={action.href}>
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center mr-4 shadow-sm",
                                                    action.color
                                                )}>
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{action.title}</span>
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Main FAB Button */}
            <Button
                size="lg"
                className={cn(
                    "h-16 w-16 rounded-full shadow-2xl transition-all duration-300",
                    "bg-primary hover:bg-primary/90 text-primary-foreground",
                    "hover:shadow-3xl hover:scale-110 border-4 border-white dark:border-gray-800",
                    isOpen && "rotate-45 scale-105"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <X className="h-7 w-7" />
                ) : (
                    <Plus className="h-7 w-7" />
                )}
            </Button>
        </div>
    );
}
