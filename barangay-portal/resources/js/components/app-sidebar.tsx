import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Folder, 
    LayoutGrid, 
    Users, 
    Building2, 
    FileText, 
    Settings, 
    BarChart3,
    Calendar,
    MessageSquare,
    Shield,
    UserCheck,
    ClipboardList,
    MapPin,
    AlertTriangle,
    Megaphone,
    CreditCard,
    Archive,
    UserPlus,
    FileCheck,
    HeartHandshake
} from 'lucide-react';
import AppLogo from './app-logo';

const dashboardItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const managementItems: NavItem[] = [
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
    {
        title: 'Residents',
        href: '/residents',
        icon: Building2,
    },
    {
        title: 'Officials',
        href: '/officials',
        icon: Shield,
    },
];

const servicesItems: NavItem[] = [
    {
        title: 'Document Requests',
        href: '/documents',
        icon: FileText,
    },
    {
        title: 'Certificates',
        href: '/certificates',
        icon: FileCheck,
    },
    {
        title: 'Business Permits',
        href: '/business-permits',
        icon: CreditCard,
    },
    {
        title: 'Complaints',
        href: '/complaints',
        icon: AlertTriangle,
    },
];

const communityItems: NavItem[] = [
    {
        title: 'Events',
        href: '/events',
        icon: Calendar,
    },
    {
        title: 'Announcements',
        href: '/announcements',
        icon: Megaphone,
    },
    {
        title: 'Programs',
        href: '/programs',
        icon: HeartHandshake,
    },
    {
        title: 'Facilities',
        href: '/facilities',
        icon: MapPin,
    },
];

const reportsItems: NavItem[] = [
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart3,
    },
    {
        title: 'Archives',
        href: '/archives',
        icon: Archive,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={dashboardItems} />
                
                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <NavMain items={managementItems} />
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Services</SidebarGroupLabel>
                    <NavMain items={servicesItems} />
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Community</SidebarGroupLabel>
                    <NavMain items={communityItems} />
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Reports & Archives</SidebarGroupLabel>
                    <NavMain items={reportsItems} />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
