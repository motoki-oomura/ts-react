/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAP_KEY: string;
    readonly VITE_GA_TRACKING_ID: string;
    readonly VITE_API_URL: string;
    readonly VITE_COMMUNITY_ID: string;
    readonly VITE_OFFICIAL_ACCOUNT_ID: string[];
    readonly VITE_WEB_SOCKET_API_URL: string;
    readonly VITE_PROFESSION_NO_NATIONAL_CERTIFICATION: string[]
    readonly VITE_PROFESSION_NO_SUBJECT: string[]
    readonly VITE_STUDENT_AD_COMMUNITY_ID: string[]

    readonly VITE_SENTRY_DSN: string;
    readonly VITE_SENTRY_ENVIRONMENT: 'development' | 'production' | 'local'
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }