import { WebContainer } from '@webcontainer/api';
import { files } from '../config';

// import {test, expect, createVitest} from "vitest"

// test('lel', () => {
//   expect('a').to.equal('a')
// })

// let webCInstance = null;

export async function getWebCInstance() {
  const webCInstance = await WebContainer.boot();

  return webCInstance;
}

export async function initWebContainer(webCInstance: WebContainer, iframeElement: HTMLIFrameElement) {
  await webCInstance.mount(files);

  const exitCode = await installDependencies(webCInstance);
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  }

  startDevServer(webCInstance, iframeElement);
}

async function startDevServer(webCInstance: WebContainer, iframeElement: HTMLIFrameElement) {
  await webCInstance.spawn('npm', ['run', 'start']);

  webCInstance.on('server-ready', (port, url) => {
    iframeElement.src = url;
  });
}

async function installDependencies(webCInstance: WebContainer) {
  // Install dependencies
  const installProcess = await webCInstance.spawn('npm', ['install']);
  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    }),
  );

  // Wait for install command to exit
  return installProcess.exit;
}
