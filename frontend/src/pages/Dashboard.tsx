import React from 'react';
import Menu from '../components/Menu';

const Dashboard: React.FC = () => (
  <div className="dashboard-container bg-light min-vh-100 w-100" style={{ width: '100%' }}>
    <Menu />
    <main className="w-100 d-flex flex-column align-items-center justify-content-center px-2 py-4" style={{ width: '100%' }}>
      <div className="row w-100 justify-content-center g-4 mb-4" style={{ maxWidth: 1200 }}>
        {/* Summary Widgets */}
        <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
          <div className="card shadow-sm text-center w-100" style={{ maxWidth: 260 }}>
            <div className="card-body">
              <h6 className="card-title text-muted">Total Tasks</h6>
              <div className="display-6 fw-bold">--</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
          <div className="card shadow-sm text-center w-100" style={{ maxWidth: 260 }}>
            <div className="card-body">
              <h6 className="card-title text-muted">Completed</h6>
              <div className="display-6 fw-bold">--</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
          <div className="card shadow-sm text-center w-100" style={{ maxWidth: 260 }}>
            <div className="card-body">
              <h6 className="card-title text-muted">Overdue</h6>
              <div className="display-6 fw-bold">--</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
          <div className="card shadow-sm text-center w-100" style={{ maxWidth: 260 }}>
            <div className="card-body">
              <h6 className="card-title text-muted">Categories</h6>
              <div className="display-6 fw-bold">--</div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="d-flex gap-3 mb-4 justify-content-center w-100" style={{ maxWidth: 800 }}>
        <button className="btn btn-primary" type="button">
          + Add Task
        </button>
        <button className="btn btn-outline-secondary" type="button">
          + Add Category
        </button>
      </div>
      {/* Placeholder for future widgets/charts */}
      <div className="card p-4 shadow-sm text-center text-muted w-100" style={{ maxWidth: 800 }}>
        <span>More analytics and quick actions coming soon.</span>
      </div>
    </main>
  </div>
);

export default Dashboard;
