interface Window {
  gtag: (
    type: 'config' | 'event',
    googleTrackingId: string,
    options?: {
      page_path?: string;
      event_category?: string;
      event_label?: string;
      value?: number;
      [key: string]: any;
    }
  ) => void;
  dataLayer: any[];
}
