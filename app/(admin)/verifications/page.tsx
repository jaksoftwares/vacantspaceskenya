'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ShieldCheck, Search, Filter, CheckCircle, XCircle, Clock, FileText, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface VerificationRequest {
  id: string;
  user_id: string;
  status: string;
  document_type: string;
  document_url?: string;
  notes?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewer_notes?: string;
  profiles?: {
    full_name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function AdminVerificationsPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (profile && profile.role !== 'admin') {
      router.push('/dashboard');
    } else if (user && profile?.role === 'admin') {
      fetchVerifications();
    }
  }, [user, profile, authLoading, router]);

  const fetchVerifications = async () => {
    try {
      const { data, error } = await supabase
        .from('verification_requests')
        .select(`
          *,
          profiles!verification_requests_user_id_fkey(
            full_name,
            email,
            avatar_url
          )
        `)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setVerifications(data || []);
    } catch (error) {
      console.error('Error fetching verifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = verification.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         verification.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || verification.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'pending': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleReview = async (verificationId: string, action: 'approve' | 'reject') => {
    try {
      const { error } = await supabase
        .from('verification_requests')
        .update({
          status: action === 'approve' ? 'approved' : 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewer_notes: reviewNotes
        })
        .eq('id', verificationId);

      if (error) throw error;

      // Update user verification status if approved
      if (action === 'approve') {
        const verification = verifications.find(v => v.id === verificationId);
        if (verification) {
          await supabase
            .from('profiles')
            .update({ is_verified: true })
            .eq('id', verification.user_id);
        }
      }

      fetchVerifications(); // Refresh data
      setSelectedVerification(null);
      setReviewNotes('');
    } catch (error) {
      console.error('Error updating verification:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading verifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Verification Requests</h1>
          <p className="text-muted-foreground">Review and manage user verification requests</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Verifications List */}
      <div className="space-y-4">
        {filteredVerifications.map((verification) => (
          <Card key={verification.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={verification.profiles?.avatar_url} alt={verification.profiles?.full_name} />
                    <AvatarFallback>
                      {verification.profiles?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{verification.profiles?.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{verification.profiles?.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted {new Date(verification.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={getStatusColor(verification.status)} className="flex items-center gap-1 mb-2">
                      {getStatusIcon(verification.status)}
                      {verification.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground capitalize">
                      {verification.document_type}
                    </p>
                  </div>

                  {verification.status === 'pending' && (
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedVerification(verification)}
                          >
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Review Verification Request</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">User Details</h4>
                              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                                <Avatar>
                                  <AvatarImage src={selectedVerification?.profiles?.avatar_url} />
                                  <AvatarFallback>
                                    {selectedVerification?.profiles?.full_name?.charAt(0)?.toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{selectedVerification?.profiles?.full_name}</p>
                                  <p className="text-sm text-muted-foreground">{selectedVerification?.profiles?.email}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Document Type</h4>
                              <p className="text-sm text-muted-foreground capitalize">
                                {selectedVerification?.document_type}
                              </p>
                            </div>

                            {selectedVerification?.notes && (
                              <div>
                                <h4 className="font-medium mb-2">User Notes</h4>
                                <p className="text-sm text-muted-foreground">{selectedVerification.notes}</p>
                              </div>
                            )}

                            <div>
                              <h4 className="font-medium mb-2">Review Notes</h4>
                              <Textarea
                                placeholder="Add notes about your decision..."
                                value={reviewNotes}
                                onChange={(e) => setReviewNotes(e.target.value)}
                              />
                            </div>

                            <div className="flex gap-2">
                              <Button
                                onClick={() => selectedVerification && handleReview(selectedVerification.id, 'approve')}
                                className="flex-1"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => selectedVerification && handleReview(selectedVerification.id, 'reject')}
                                className="flex-1"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVerifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No verification requests found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'pending'
                ? 'Try adjusting your search or filter criteria.'
                : 'No pending verification requests at this time.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}