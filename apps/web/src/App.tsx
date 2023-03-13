import { Button, Tab, Tabs } from './components/atoms';
import { DefaultLayout } from './layouts';

/**
 * Handle internalGuard here and display appropriate modal
 * it doesn't make sense to try/catch internalGuard exceptions everywhere
 * catch it only in specific locations where you are certain that
 * desired functionality is not crucial for app
 */
export default function App() {
  return (
    <DefaultLayout>
      <main>
        <Tabs>
          <Tab title="xd">
            <div>
              <Button>click me</Button>
            </div>
          </Tab>
          <Tab title="123123123123123">123123123</Tab>
          <Tab title="123123123123123">123123123</Tab>
          <Tab title="123123123123123">123123123</Tab>
          <Tab title="123123123123123">123123123</Tab>
          <Tab title="123123123123123">123123</Tab>
          <Tab title="123123123123123">12312323</Tab>
        </Tabs>
      </main>
    </DefaultLayout>
  );
}
