import { Header } from './Header';


export function PageWrapper({ children, showHeader = true, className = '' }) {
  return (
    <div className="w-full flex-1">
      {showHeader && <Header />}
      <main className={`section-padding ${className}`}>
        {children}
      </main>
    </div>
  );
}