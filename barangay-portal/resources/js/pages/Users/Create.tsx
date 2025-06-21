import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';

export default function UsersCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }; return (
        <AppLayout
            breadcrumbs={[
                { title: 'Dashboard', href: route('dashboard') },
                { title: 'Users', href: route('users.index') },
                { title: 'Create User', href: route('users.create') },
            ]}
        >
            <Head title="Create User" />

            <div className="flex h-full flex-1 flex-col p-8 space-y-8">
                <PageHeader
                    title="Create User"
                    description="Add a new user to the system"
                >
                    <Link href={route('users.index')}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Users
                        </Button>
                    </Link>
                </PageHeader>

                <Section>
                    <Card className="max-w-2xl shadow-sm border-0 bg-card">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-semibold mb-2">User Information</CardTitle>
                            <CardDescription className="text-sm">
                                Enter the details for the new user account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        autoFocus
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create User'}
                                    </Button>
                                    <Link href={route('users.index')}>
                                        <Button type="button" variant="outline">
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>                        </form>
                        </CardContent>
                    </Card>
                </Section>
            </div>
        </AppLayout>
    );
}
