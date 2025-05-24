
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { fetchCompanyUsers, inviteUser } from '@/services/mockData';
import { User, UserRole } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDate } from '@/lib/formatters';

const UserManagement = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [isInviting, setIsInviting] = useState(false);

  const { data: users, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchCompanyUsers('1'),
  });

  const handleInviteUser = async () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    setIsInviting(true);
    try {
      await inviteUser(email, role);
      toast.success(`Invitation sent to ${email}`);
      setEmail('');
      refetch();
    } catch (error) {
      toast.error('Failed to send invitation');
      console.error(error);
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-wealth-primary">User Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invite New User</CardTitle>
          <CardDescription>Send an invitation email to add a new user to your company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select
                value={role}
                onValueChange={(value: UserRole) => setRole(value)}
              >
                <SelectTrigger id="role" className="w-[180px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleInviteUser}
              disabled={isInviting}
              className="mt-4 md:mt-0"
            >
              {isInviting ? 'Sending...' : 'Invite User'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium">Joined Date</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: User) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-wealth-accent text-white flex items-center justify-center mr-3">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`capitalize ${user.role === 'admin' ? 'font-medium text-wealth-accent' : ''}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="ml-2 text-destructive hover:bg-destructive/10">
                        Revoke
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
