import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { StatsCard } from '@/components/ui/stats-card';
import { DateTimeWidget } from '@/components/ui/date-time-widget';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, FileText, AlertTriangle, CheckCircle2, Calendar, TrendingUp, Home, UserCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Sample data for charts
const populationData = [
    { month: 'Jan', population: 1200 },
    { month: 'Feb', population: 1250 },
    { month: 'Mar', population: 1300 },
    { month: 'Apr', population: 1280 },
    { month: 'May', population: 1350 },
    { month: 'Jun', population: 1400 },
];

const servicesData = [
    { name: 'Barangay Clearance', value: 45, color: '#8884d8' },
    { name: 'Business Permit', value: 25, color: '#82ca9d' },
    { name: 'Residency Certificate', value: 20, color: '#ffc658' },
    { name: 'Others', value: 10, color: '#ff7c7c' },
];

const recentActivities = [
    { id: 1, action: 'New resident registration', user: 'Juan Dela Cruz', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Business permit application', user: 'Maria Santos', time: '4 hours ago', type: 'pending' },
    { id: 3, action: 'Complaint filed', user: 'Pedro Rodriguez', time: '6 hours ago', type: 'warning' },
    { id: 4, action: 'Event approved', user: 'Ana Garcia', time: '1 day ago', type: 'success' },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col p-8 space-y-8">
                {/* Welcome Header */}
                <PageHeader
                    title="Welcome to Barangay Portal"
                    description="Manage your barangay services, residents, and community programs efficiently."
                >
                    <DateTimeWidget />
                </PageHeader>

                {/* Stats Cards Section */}
                <Section>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <StatsCard
                            title="Total Residents"
                            value="1,400"
                            icon={Users}
                            trend={{ value: "12%", isPositive: true }}
                            description="from last month"
                        />

                        <StatsCard
                            title="Active Services"
                            value="24"
                            icon={FileText}
                            trend={{ value: "3", isPositive: true }}
                            description="new this week"
                        />

                        <StatsCard
                            title="Pending Requests"
                            value="18"
                            icon={AlertTriangle}
                            trend={{ value: "2", isPositive: false }}
                            description="from yesterday"
                        />

                        <StatsCard
                            title="Completed Today"
                            value="47"
                            icon={CheckCircle2}
                            trend={{ value: "8", isPositive: true }}
                            description="from yesterday"
                        />
                    </div>
                </Section>

                {/* Analytics Section */}
                <Section title="Analytics & Insights" description="Visual representation of key metrics and trends">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Population Growth Chart */}
                        <Card className="shadow-sm border-0 bg-card">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-semibold mb-2">Population Growth</CardTitle>
                                <CardDescription className="text-sm">Monthly population growth over the last 6 months</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <ChartContainer
                                    config={{
                                        population: {
                                            label: "Population",
                                            color: "#8884d8",
                                        },
                                    }}
                                    className="h-[250px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={populationData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line type="monotone" dataKey="population" stroke="#8884d8" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Services Distribution Chart */}
                        <Card className="shadow-sm border-0 bg-card">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-semibold mb-2">Service Requests Distribution</CardTitle>
                                <CardDescription className="text-sm">Breakdown of service requests this month</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <ChartContainer
                                    config={{
                                        "Barangay Clearance": { color: "#8884d8" },
                                        "Business Permit": { color: "#82ca9d" },
                                        "Residency Certificate": { color: "#ffc658" },
                                        "Others": { color: "#ff7c7c" },
                                    }}
                                    className="h-[200px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={servicesData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={60}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {servicesData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </Section>

                {/* Activity & Status Section */}
                <Section title="Recent Activity & System Status" description="Live updates and performance metrics">
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Recent Activities */}
                        <Card className="md:col-span-2 shadow-sm border-0 bg-card">
                            <CardHeader className="pb-6">
                                <CardTitle className="text-xl font-semibold mb-2">Recent Activities</CardTitle>
                                <CardDescription className="text-sm">Latest activities in the barangay system</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <div className="space-y-6">
                                    {recentActivities.map((activity) => (
                                        <div key={activity.id} className="flex items-center space-x-6 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <div className="flex-shrink-0">
                                                <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                                                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                                        {activity.user.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="flex-1 min-w-0 space-y-1">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                                                    {activity.action}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    by {activity.user} • {activity.time}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0 ml-4">
                                                <Badge
                                                    variant={activity.type === 'success' ? 'default' :
                                                        activity.type === 'warning' ? 'destructive' : 'secondary'}
                                                    className="px-3 py-1"
                                                >
                                                    {activity.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="shadow-sm border-0 bg-card">
                            <CardHeader className="pb-6">
                                <CardTitle className="text-xl font-semibold mb-2">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-2">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm font-medium">
                                        <span className="text-gray-700 dark:text-gray-300">Document Processing</span>
                                        <span className="text-primary font-semibold">78%</span>
                                    </div>
                                    <Progress value={78} className="h-3" />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm font-medium">
                                        <span className="text-gray-700 dark:text-gray-300">System Utilization</span>
                                        <span className="text-primary font-semibold">92%</span>
                                    </div>
                                    <Progress value={92} className="h-3" />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm font-medium">
                                        <span className="text-gray-700 dark:text-gray-300">Resident Satisfaction</span>
                                        <span className="text-primary font-semibold">85%</span>
                                    </div>
                                    <Progress value={85} className="h-3" />
                                </div>

                                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className="p-2 bg-primary/10 rounded-full">
                                            <Calendar className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">Next Event: Town Fiesta</span>
                                            <p className="text-xs text-muted-foreground mt-1">December 15, 2024</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Section>
            </div>

            {/* Floating Action Button */}
            <FloatingActionButton />
        </AppLayout>
    );
}
