import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

export function DateTimeWidget() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <div className="p-3 bg-blue-500 rounded-full">
                            <Calendar className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                            {formatDate(currentTime)}
                        </h3>
                        <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-200">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-mono">
                                {formatTime(currentTime)}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
