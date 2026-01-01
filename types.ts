
export type ItemType = 'doc' | 'payment' | 'voice' | 'noise' | 'media';

export interface RecallItem {
  id: string;
  type: ItemType;
  sender: string;
  senderAvatar: string;
  text?: string;
  file?: string;
  context?: string;
  duration?: string;
  amount?: string;
  date: string;
  isGroup: boolean;
  screenshotUrl?: string;
}

export interface FilterState {
  last7Days: boolean;
  clients: boolean;
  docs: boolean;
  payments: boolean;
  longVoice: boolean;
  excludeGroups: boolean;
}

export type ViewMode = 'list' | 'grid';
