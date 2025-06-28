'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, UserCheck, UserX, Shield, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function UserManagement() {
  const users = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'user',
      status: 'active',
      instagramConnected: true,
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'user',
      status: 'active',
      instagramConnected: true,
      lastActive: new Date(Date.now() - 5 * 60 * 1000),
      joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      role: 'admin',
      status: 'active',
      instagramConnected: false,
      lastActive: new Date(Date.now() - 30 * 60 * 1000),
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david@example.com',
      role: 'user',
      status: 'suspended',
      instagramConnected: true,
      lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'suspended':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'user':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">User Management</h3>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button className="instagram-gradient text-white hover:opacity-90">
          Add User
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{user.name}</h4>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                      {user.role}
                    </Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                    <span>•</span>
                    <span>Joined {formatDistanceToNow(user.joinedAt, { addSuffix: true })}</span>
                    <span>•</span>
                    <span>Active {formatDistanceToNow(user.lastActive, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {user.instagramConnected ? (
                  <Badge variant="outline" className="text-green-500 border-green-500/30">
                    <UserCheck className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-500 border-red-500/30">
                    <UserX className="w-3 h-3 mr-1" />
                    Disconnected
                  </Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      {user.status === 'active' ? 'Suspend User' : 'Activate User'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}