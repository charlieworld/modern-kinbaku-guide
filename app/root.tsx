import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import MainLayout from "~/components/MainLayout";

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <RecoilRoot>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.png" type="image/png" />
          <Meta />
          <Links />
        </head>
        <body className="text-primary-text bg-bg">
          <MainLayout>

            {children}
          </MainLayout>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </RecoilRoot>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
