import { cn } from '@/lib/utils';

interface SectionProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    headerClassName?: string;
}

export function Section({ title, description, children, className, headerClassName }: SectionProps) {
    return (
        <section className={cn("space-y-6", className)}>
            {(title || description) && (
                <div className={cn("space-y-2", headerClassName)}>
                    {title && (
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-gray-600 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div className="space-y-6">
                {children}
            </div>
        </section>
    );
}
