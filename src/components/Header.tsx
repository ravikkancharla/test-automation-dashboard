interface HeaderProps {
  onRun: () => void;
  onReset: () => void;
}

export default function Header({ onRun, onReset }: HeaderProps) {
  return (
    <header className="top">
      <div className="wrap">
        <div className="brand">
          <span className="dot" aria-hidden="true"></span>Test Automation Dashboard
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={onRun}>Simulate Test Run</button>
          <button className="btn btn-danger" onClick={onReset}>Reset Test History</button>
        </div>
      </div>
    </header>
  );
}
