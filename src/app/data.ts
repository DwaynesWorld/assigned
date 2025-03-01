import { Position, TeamConfig } from './models';

export const CONFIG: TeamConfig = {
  id: 1,
  startTime: '05:00',
  endTime: '15:00',
};

export const POSITIONS: Position[] = [
  {
    id: 1,
    title: 'Software Engineer',
    assignments: [
      {
        id: 1,
        startTime: '08:00',
        endTime: '08:20',
        description: 'Implement feature A',
      },
      {
        id: 2,
        startTime: '13:00',
        endTime: '15:00',
        description: 'Implement feature B',
      },
    ],
  },
  {
    id: 2,
    title: 'UX Designer',
    assignments: [
      {
        id: 3,
        startTime: '05:30',
        endTime: '07:15',
        description: 'Design feature A',
      },
    ],
  },
  {
    id: 3,
    title: 'Product Manager',
    assignments: [
      {
        id: 5,
        startTime: '10:00',
        endTime: '12:00',
        description: 'Plan feature A',
      },
    ],
  },
];
