import Dashboard from '../../components/Dashboard';
import snapshot from '../../data/snapshot.json';

export default function DashboardPage() {
  return <Dashboard snapshot={snapshot} />;
}
