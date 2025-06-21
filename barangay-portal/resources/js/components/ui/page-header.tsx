import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
    return (
        <div className={cn("space-y-6 mb-8", className)}>
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
                {children && (
                    <div className="flex items-center space-x-4">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
