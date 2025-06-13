import Menu from '../components/Menu';

const Dashboard = () => (
  <div style={{ minHeight: '100vh', minWidth: '100vw', background: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
    <Menu />
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Dashboard</h1>
    </div>
  </div>
);

export default Dashboard;
