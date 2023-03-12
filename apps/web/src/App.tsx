import './app.css';

/**
 * Handle internalGuard here and display appropriate modal
 * it doesn't make sense to try/catch internalGuard exceptions everywhere
 * catch it only in specific locations where you are certain that
 * desired functionality is not crucial for app
 */
export default function App() {
  return (
    <div
      id="App"
      className="text-color-default dark:text-color-dark bg-shade-light dark:bg-shade-dark h-screen w-screen font-sans text-base antialiased transition-colors"
    >
      <div>asda</div>
    </div>
  );
}
