
import { RecallItem } from './types';

export const MOCK_DATA: RecallItem[] = [
  {
    id: '1',
    type: 'doc',
    file: 'Invoice_Nov_Final.pdf',
    sender: 'Ramesh Electric',
    context: 'electricity bill for office',
    date: 'Today, 10:45 AM',
    isGroup: false,
    senderAvatar: 'https://picsum.photos/seed/ramesh/100/100'
  },
  {
    id: '2',
    type: 'payment',
    text: 'Sent ₹24,000 for venue booking',
    amount: '₹24,000',
    sender: 'Event Planner',
    date: 'Yesterday, 2:15 PM',
    isGroup: false,
    senderAvatar: 'https://picsum.photos/seed/planner/100/100',
    screenshotUrl: 'https://picsum.photos/seed/pay1/400/600'
  },
  {
    id: '3',
    type: 'voice',
    duration: '4:32',
    text: 'Briefing Note regarding Q4 targets',
    sender: 'Boss',
    date: 'Nov 12',
    isGroup: false,
    senderAvatar: 'https://picsum.photos/seed/boss/100/100'
  },
  {
    id: '4',
    type: 'noise',
    text: 'Good morning everyone! Have a great day.',
    sender: 'Family Group',
    date: 'Today, 8:00 AM',
    isGroup: true,
    senderAvatar: 'https://picsum.photos/seed/family/100/100'
  },
  {
    id: '5',
    type: 'payment',
    text: 'Received ₹5,000 from Rohan',
    amount: '₹5,000',
    sender: 'Rohan (Roommate)',
    date: 'Nov 10',
    isGroup: false,
    senderAvatar: 'https://picsum.photos/seed/rohan/100/100',
    screenshotUrl: 'https://picsum.photos/seed/pay2/400/600'
  },
  {
    id: '6',
    type: 'media',
    text: 'New project designs attached',
    sender: 'Creative Agency',
    date: 'Oct 30',
    isGroup: false,
    senderAvatar: 'https://picsum.photos/seed/agency/100/100',
    screenshotUrl: 'https://picsum.photos/seed/design1/400/400'
  },
  {
    id: '7',
    type: 'doc',
    file: 'Contract_Draft_V2.docx',
    sender: 'Legal Team',
    context: 'NDA agreement',
    date: 'Nov 8',
    isGroup: true,
    senderAvatar: 'https://picsum.photos/seed/legal/100/100'
  },
  {
    id: '8',
    type: 'voice',
    duration: '0:45',
    text: 'Quick update on the meeting',
    sender: 'Sarah',
    date: 'Yesterday',
    isGroup: false,
    senderAvatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: '9',
    type: 'payment',
    text: 'Paid ₹1,200 for Dinner',
    amount: '₹1,200',
    sender: 'Anjali',
    date: '2 days ago',
    isGroup: false,
    senderAvatar: 'https://picsum.photos/seed/anjali/100/100',
    screenshotUrl: 'https://picsum.photos/seed/pay3/400/600'
  },
  {
    id: '10',
    type: 'noise',
    text: 'Who is coming for football today?',
    sender: 'College Buddies',
    date: '3 days ago',
    isGroup: true,
    senderAvatar: 'https://picsum.photos/seed/sports/100/100'
  }
];
