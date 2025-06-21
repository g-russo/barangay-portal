import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedUsers {
    data: User[];
    links: PaginationLink[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface Props {
    users: PaginatedUsers;
    flash?: {
        success?: string;
    };
}

export default function UsersIndex({ users, flash }: Props) {
    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', userId), {
                onSuccess: () => {
                    toast.success('User deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete user');
                },
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }; return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Users', href: route('users.index') },
            ]}
        >
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col p-8 space-y-8">
                <PageHeader
                    title="Users"
                    description="Manage user accounts and permissions"
                >
                    <Link href={route('users.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </Link>
                </PageHeader>

                <Section>
                    <Card className="shadow-sm border-0 bg-card">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-semibold mb-2">All Users</CardTitle>
                            <CardDescription className="text-sm">
                                A list of all users in the system ({users.total} total)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-8">
                                                    No users found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            users.data.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium">
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                user.email_verified_at
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                        >
                                                            {user.email_verified_at
                                                                ? 'Verified'
                                                                : 'Unverified'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatDate(user.created_at)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link href={route('users.show', user.id)}>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={route('users.edit', user.id)}>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDelete(user.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {users.last_page > 1 && (
                                <div className="flex items-center justify-between px-2 py-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {((users.current_page - 1) * users.per_page) + 1} to{' '}
                                        {Math.min(users.current_page * users.per_page, users.total)} of{' '}
                                        {users.total} results
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {users.links.map((link, index) => {
                                            if (!link.url) {
                                                return (
                                                    <Button
                                                        key={index}
                                                        variant="ghost"
                                                        size="sm"
                                                        disabled
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            }

                                            return (
                                                <Link key={index} href={link.url}>
                                                    <Button
                                                        variant={link.active ? 'default' : 'ghost'}
                                                        size="sm"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>)}
                        </CardContent>
                    </Card>
                </Section>
            </div>
        </AppLayout>
    );
}
