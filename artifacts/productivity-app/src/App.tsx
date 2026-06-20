import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk, useUser } from "@clerk/react";
// @ts-ignore
import { publishableKeyFromHost } from "@clerk/react/internal";
// @ts-ignore
import { shadcn } from "@clerk/themes";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Welcome from "@/pages/Welcome";
import Home from "@/pages/Home";
import Habits from "@/pages/Habits";
import Tasks from "@/pages/Tasks";
import TaskProjects from "@/pages/TaskProjects";
import Goals from "@/pages/Goals";
import AppLayout from "@/components/layout/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsPlacement: "bottom" as const,
  },
  variables: {
    colorPrimary: "#C5D86D",
    colorForeground: "#1a1a1a",
    colorMutedForeground: "#6b7280",
    colorDanger: "#ef4444",
    colorBackground: "#ffffff",
    colorInput: "#f3f4f6",
    colorInputForeground: "#1a1a1a",
    colorNeutral: "#d1d5db",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    borderRadius: "1rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-white rounded-3xl w-[440px] max-w-full overflow-hidden shadow-xl",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-[#1a1a1a] font-black",
    headerSubtitle: "text-gray-500",
    socialButtonsBlockButtonText: "text-[#1a1a1a] font-semibold",
    formFieldLabel: "text-[#1a1a1a] font-medium",
    footerActionLink: "text-[#C5D86D] font-semibold hover:text-[#a8c24a]",
    footerActionText: "text-gray-500",
    dividerText: "text-gray-400",
    identityPreviewEditButton: "text-[#C5D86D]",
    formFieldSuccessText: "text-green-600",
    alertText: "text-[#1a1a1a]",
    logoBox: "flex justify-center",
    logoImage: "w-12 h-12",
    socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50 rounded-2xl",
    formButtonPrimary: "bg-[#1a1a1a] hover:bg-[#333] rounded-2xl font-bold",
    formFieldInput: "rounded-2xl border-gray-200 bg-gray-50 text-[#1a1a1a] focus:ring-[#C5D86D]",
    footerAction: "border-t border-gray-100",
    dividerLine: "bg-gray-200",
    alert: "rounded-2xl",
    otpCodeFieldInput: "border-gray-300 rounded-xl",
    formFieldRow: "",
    main: "",
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#C5D86D] px-4">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#C5D86D] px-4">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/home" />
      </Show>
      <Show when="signed-out">
        <Welcome />
      </Show>
    </>
  );
}

function ProtectedLayout() {
  return (
    <>
      <Show when="signed-in">
        <AppLayout />
      </Show>
      <Show when="signed-out">
        <Redirect to="/" />
      </Show>
    </>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }: any) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to your productivity hub",
          },
        },
        signUp: {
          start: {
            title: "Join TODU",
            subtitle: "Start tracking habits, tasks & goals",
          },
        },
      }}
      routerPush={(to: string) => setLocation(stripBase(to))}
      routerReplace={(to: string) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <Switch>
          <Route path="/" component={HomeRedirect} />
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route path="/home" component={() => (
            <>
              <Show when="signed-in">
                <AppLayout><Home /></AppLayout>
              </Show>
              <Show when="signed-out"><Redirect to="/" /></Show>
            </>
          )} />
          <Route path="/habits" component={() => (
            <>
              <Show when="signed-in">
                <AppLayout><Habits /></AppLayout>
              </Show>
              <Show when="signed-out"><Redirect to="/" /></Show>
            </>
          )} />
          <Route path="/tasks" component={() => (
            <>
              <Show when="signed-in">
                <AppLayout><Tasks /></AppLayout>
              </Show>
              <Show when="signed-out"><Redirect to="/" /></Show>
            </>
          )} />
          <Route path="/task-projects" component={() => (
            <>
              <Show when="signed-in">
                <AppLayout><TaskProjects /></AppLayout>
              </Show>
              <Show when="signed-out"><Redirect to="/" /></Show>
            </>
          )} />
          <Route path="/goals" component={() => (
            <>
              <Show when="signed-in">
                <AppLayout><Goals /></AppLayout>
              </Show>
              <Show when="signed-out"><Redirect to="/" /></Show>
            </>
          )} />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
        <Toaster />
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
