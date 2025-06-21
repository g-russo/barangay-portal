import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
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
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    user: User;
}

export default function UsersShow({ user }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(route('users.destroy', user.id), {
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }; return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Users', href: route('users.index') },
                { title: user.name, href: route('users.show', user.id) },
            ]}
        >
            <Head title={`User - ${user.name}`} />

            <div className="flex h-full flex-1 flex-col p-8 space-y-8">
                <PageHeader
                    title={user.name}
                    description="User details and information"
                >
                    <div className="flex items-center gap-2">
                        <Link href={route('users.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Users
                            </Button>
                        </Link>
                        <Link href={route('users.edit', user.id)}>
                            <Button>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </Button>
                    </div>
                </PageHeader>

                <Section>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="shadow-sm border-0 bg-card">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-semibold mb-2">Basic Information</CardTitle>
                                <CardDescription className="text-sm">
                                    Core user account details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                                    <dd className="text-sm">{user.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                                    <dd className="text-sm">{user.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                                    <dd className="text-sm">
                                        <Badge
                                            variant={
                                                user.email_verified_at ? 'default' : 'secondary'
                                            }
                                        >
                                            {user.email_verified_at ? 'Verified' : 'Unverified'}
                                        </Badge>
                                    </dd>
                                </div>                        </CardContent>
                        </Card>

                        <Card className="shadow-sm border-0 bg-card">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-semibold mb-2">Account Timestamps</CardTitle>
                                <CardDescription className="text-sm">
                                    When this account was created and last updated
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-2">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Created At</dt>
                                    <dd className="text-sm">{formatDate(user.created_at)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Updated At</dt>
                                    <dd className="text-sm">{formatDate(user.updated_at)}</dd>
                                </div>
                                {user.email_verified_at && (
                                    <div>
                                        <dt className="text-sm font-medium text-muted-foreground">
                                            Email Verified At
                                        </dt>
                                        <dd className="text-sm">{formatDate(user.email_verified_at)}</dd>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </Section>
            </div>
        </AppLayout>
    );
}
