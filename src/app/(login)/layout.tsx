import "@/styles/globals.scss";

import { BackgroundWrapper } from "@/components/background-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import * as Tooltip from "@radix-ui/react-tooltip";
import { GeistSans } from "geist/font/sans";
import { ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return { title: t("title") };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className={`${GeistSans.variable} font-sans`}>
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <BackgroundWrapper
                  className={`relative flex min-h-screen flex-col justify-center bg-background-light-600 dark:bg-background-dark-600`}
                >
                  <div className="relative mx-auto w-full max-w-[440px] py-8">
                    <Skeleton>
                      <div className="h-40"></div>
                    </Skeleton>
                    <div className="py-2"></div>
                  </div>
                </BackgroundWrapper>
              }
            >
              <LanguageProvider>
                <BackgroundWrapper
                  className={`relative flex min-h-screen flex-col justify-center bg-background-light-600 dark:bg-background-dark-600`}
                >
                  <div className="relative mx-auto w-full max-w-[1100px] py-8">
                    <div>{children}</div>
                    <div className="py-2"></div>
                  </div>
                </BackgroundWrapper>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
