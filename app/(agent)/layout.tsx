import { ReactNode } from 'react';
import { AgentLayout } from '@/components/agent/agent-layout';

interface AgentLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AgentLayoutProps) {
  return <AgentLayout>{children}</AgentLayout>;
}